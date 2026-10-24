package com.recurrente.checkout

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.os.Message
import android.webkit.*
import android.widget.FrameLayout
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import java.util.UUID

/** Hosted checkout. Construct and use on the UI thread; dispose when leaving the screen. */
@SuppressLint("SetJavaScriptEnabled")
class RecurrenteCheckoutView(context: Context, url: String) : FrameLayout(context) {
    var onSuccess: ((CheckoutMessage) -> Unit)? = null
    var onFailure: ((CheckoutMessage) -> Unit)? = null
    var onPaymentInProgress: ((CheckoutMessage) -> Unit)? = null
    var onReturn: ((Uri) -> Unit)? = null
    var onExternalNavigation: ((Uri) -> Unit)? = null
    var onCancel: (() -> Unit)? = null
    var onError: ((String) -> Unit)? = null
    var returnUrls: List<String> = emptyList()
    /** Host launches an Activity Result file picker and completes the callback exactly once. */
    var onFileChooser: ((ValueCallback<Array<Uri>>, WebChromeClient.FileChooserParams) -> Boolean)? = null
    private val session = UUID.randomUUID().toString() + UUID.randomUUID().toString()
    private val webView = WebView(context)
    private var closed = false
    private var disposed = false
    private var fileCallback: ValueCallback<Array<Uri>>? = null
    private val popupViews = mutableSetOf<WebView>()

    init {
        val html = CheckoutProtocol.html(url, session)
        require(WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) { "Update Android System WebView: WEB_MESSAGE_LISTENER is required" }
        webView.settings.apply {
            javaScriptEnabled = true; domStorageEnabled = true
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            allowFileAccess = false; allowContentAccess = true
            setSupportMultipleWindows(true)
        }
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)
        WebViewCompat.addWebMessageListener(webView, "RecurrenteCheckoutBridge", setOf(CheckoutProtocol.shellOrigin)) { _, message, sourceOrigin, isMainFrame, _ ->
            if (!closed && isMainFrame && sourceOrigin.toString() == CheckoutProtocol.shellOrigin) {
                CheckoutProtocol.message(message.data ?: "", session)?.let { event ->
                    when (event.type) {
                        CheckoutProtocol.success -> { closed = true; onSuccess?.invoke(event) }
                        CheckoutProtocol.failure -> onFailure?.invoke(event)
                        CheckoutProtocol.pending -> onPaymentInProgress?.invoke(event)
                    }
                }
            }
        }
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                if (closed) return true
                val uri = request.url
                if (CheckoutProtocol.matchesReturn(uri.toString(), returnUrls)) { onReturn?.invoke(uri); return true }
                if (uri.toString() == "about:blank" || uri.toString() == CheckoutProtocol.shellOrigin + "/") return false
                if (!request.isForMainFrame && uri.scheme == "https") return false
                onExternalNavigation?.invoke(uri)
                return true
            }
            override fun onReceivedError(view: WebView, request: WebResourceRequest, error: WebResourceError) {
                if (request.isForMainFrame) onError?.invoke(error.description.toString())
            }
            override fun onReceivedHttpError(view: WebView, request: WebResourceRequest, response: WebResourceResponse) {
                if (request.isForMainFrame) onError?.invoke("HTTP ${response.statusCode}")
            }
            override fun onRenderProcessGone(view: WebView, detail: RenderProcessGoneDetail): Boolean {
                dispose(); onError?.invoke("WebView process terminated; verify checkout status before reopening")
                return true
            }
            // WebView's default SSL-error handler cancels; never call proceed().
        }
        webView.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(view: WebView, callback: ValueCallback<Array<Uri>>, params: FileChooserParams): Boolean {
                fileCallback?.onReceiveValue(null)
                fileCallback = callback
                val complete = ValueCallback<Array<Uri>> { result ->
                    if (fileCallback === callback) { fileCallback = null; callback.onReceiveValue(result) }
                }
                if (onFileChooser?.invoke(complete, params) == true) return true
                complete.onReceiveValue(null)
                onError?.invoke("Configure onFileChooser to upload bank-transfer receipts")
                return true
            }
            override fun onCreateWindow(view: WebView, isDialog: Boolean, isUserGesture: Boolean, resultMsg: Message): Boolean {
                // Resolve target=_blank without giving the popup a payment bridge.
                val popup = WebView(context)
                popupViews.add(popup)
                popup.webViewClient = object : WebViewClient() {
                    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                        onExternalNavigation?.invoke(request.url)
                        view.post { popupViews.remove(view); view.destroy() }
                        return true
                    }
                }
                (resultMsg.obj as WebView.WebViewTransport).webView = popup
                resultMsg.sendToTarget()
                return true
            }
        }
        webView.setDownloadListener { url, _, _, _, _ -> onExternalNavigation?.invoke(Uri.parse(url)) }
        addView(webView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
        webView.loadDataWithBaseURL(CheckoutProtocol.shellOrigin + "/", html, "text/html", "UTF-8", null)
    }

    /** UI cancellation only: an in-flight charge can still settle on the server. */
    fun cancel() { if (!closed) { closed = true; webView.stopLoading(); onCancel?.invoke() } }
    /** Does not emit cancellation during a normal host teardown. */
    fun dispose() {
        if (disposed) return
        disposed = true; closed = true
        fileCallback?.onReceiveValue(null); fileCallback = null
        popupViews.forEach { it.destroy() }; popupViews.clear()
        WebViewCompat.removeWebMessageListener(webView, "RecurrenteCheckoutBridge")
        webView.stopLoading(); removeView(webView); webView.destroy()
    }
}
