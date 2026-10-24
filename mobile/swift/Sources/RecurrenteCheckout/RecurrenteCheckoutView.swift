#if canImport(UIKit) && canImport(WebKit)
import UIKit
import WebKit

/// A hosted checkout, not a native card collection API. Retain it while paying.
@MainActor
public final class RecurrenteCheckoutView: UIView, WKScriptMessageHandler, WKNavigationDelegate, WKUIDelegate {
    public var onSuccess: ((CheckoutMessage) -> Void)?
    public var onFailure: ((CheckoutMessage) -> Void)?
    public var onPaymentInProgress: ((CheckoutMessage) -> Void)?
    public var onReturn: ((URL) -> Void)?
    public var onExternalNavigation: ((URL) -> Void)?
    public var onCancel: (() -> Void)?
    public var onError: ((Error) -> Void)?
    public var returnURLs: [URL] = []
    private let webView: WKWebView
    private let session: String
    private var closed = false

    public init(url: URL) throws {
        session = UUID().uuidString + UUID().uuidString
        let html = try CheckoutProtocol.html(url: url, session: session)
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        webView = WKWebView(frame: .zero, configuration: configuration)
        super.init(frame: .zero)
        // WKUserContentController retains its handler; the proxy breaks the cycle.
        webView.configuration.userContentController.add(WeakMessageHandler(self), name: "recurrenteCheckout")
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(webView)
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: topAnchor), webView.bottomAnchor.constraint(equalTo: bottomAnchor),
            webView.leadingAnchor.constraint(equalTo: leadingAnchor), webView.trailingAnchor.constraint(equalTo: trailingAnchor)
        ])
        webView.loadHTMLString(html, baseURL: URL(string: CheckoutProtocol.shellOrigin + "/"))
    }

    @available(*, unavailable)
    public required init?(coder: NSCoder) { fatalError("Use init(url:)") }

    /// Closing the UI does not cancel an already submitted payment on the server.
    public func cancel() {
        guard !closed else { return }
        closed = true
        webView.stopLoading()
        onCancel?()
    }

    public func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard !closed, message.frameInfo.isMainFrame,
              let raw = message.body as? String,
              let event = CheckoutProtocol.decode(raw, session: session) else { return }
        switch event.kind {
        case .success: closed = true; onSuccess?(event)
        case .failure: onFailure?(event)
        case .paymentInProgress: onPaymentInProgress?(event)
        }
    }

    public func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = action.request.url, !closed else { decisionHandler(.cancel); return }
        if CheckoutProtocol.matchesReturn(url, routes: returnURLs) {
            decisionHandler(.cancel); onReturn?(url); return
        }
        if url.absoluteString == "about:blank" || url.absoluteString == CheckoutProtocol.shellOrigin + "/" {
            decisionHandler(.allow); return
        }
        if action.targetFrame?.isMainFrame == false && url.scheme == "https" {
            decisionHandler(.allow); return // Includes issuer challenge frames and POST navigation.
        }
        decisionHandler(.cancel)
        onExternalNavigation?(url)
    }

    public func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = action.request.url { onExternalNavigation?(url) }
        return nil
    }

    public func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { onError?(error) }
    public func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { onError?(error) }
    public func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        onError?(NSError(domain: "RecurrenteCheckout", code: 1, userInfo: [NSLocalizedDescriptionKey: "WebView terminated; verify checkout status before reopening"]))
    }
}

@MainActor
private final class WeakMessageHandler: NSObject, WKScriptMessageHandler {
    weak var target: WKScriptMessageHandler?
    init(_ target: WKScriptMessageHandler) { self.target = target }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        target?.userContentController(userContentController, didReceive: message)
    }
}
#endif
