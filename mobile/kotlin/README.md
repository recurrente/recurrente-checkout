# Recurrente Checkout — Kotlin / Android

Unpublished Android library, API 24+, current Android System WebView with `WEB_MESSAGE_LISTENER`, Java 17. [Contract and validation](../README.md).

Build using Gradle 8.11.1 and Android SDK 35:

```sh
cd mobile/kotlin
gradle --no-daemon testDebugUnitTest lintDebug assembleRelease
gradle --no-daemon publishToMavenLocal
```

For local evaluation add `mavenLocal()` to the host's repositories and `implementation("com.recurrente:recurrente-checkout:0.1.0-rc.0")`. This is **not** a Maven Central release. The library manifest includes INTERNET permission. The application owns its Activity, safe areas, close controls and background/resume reconciliation.

```kotlin
// In an Activity on the UI thread; checkoutUrl comes from YOUR backend.
val checkout = RecurrenteCheckoutView(this, checkoutUrl)
checkout.returnUrls = listOf("myapp://checkout/result")
checkout.onSuccess = { refreshOrderFromYourBackend() }
checkout.onPaymentInProgress = { refreshOrderFromYourBackend() } // Still pending!
checkout.onReturn = { refreshOrderFromYourBackend() }
checkout.onFailure = { /* Leave the same checkout open for retry. */ }
checkout.onError = { /* Show recovery UI; check server state before another attempt. */ }
checkout.onExternalNavigation = { uri -> /* Explicit application allowlist before opening. */ }
checkout.onCancel = { refreshOrderFromYourBackend(); finish() }
checkoutContainer.addView(checkout)
// Your close button / OnBackPressedDispatcher callback: checkout.cancel()
// onDestroy: checkout.dispose() (also when replacing this checkout instance)
```

## Required receipt picker integration

Use your Activity Result API so selection survives the picker round trip. Keep and complete each pending `ValueCallback` once; cancellation sends null. For example, in an Activity using `androidx.activity`:

```kotlin
private var pendingFiles: ValueCallback<Array<Uri>>? = null
private val pickFiles = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
    pendingFiles?.onReceiveValue(
        WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data))
    pendingFiles = null
}
// After constructing checkout:
checkout.onFileChooser = { callback, params ->
    pendingFiles?.onReceiveValue(null)
    pendingFiles = callback
    try {
        pickFiles.launch(params.createIntent())
        true
    } catch (_: ActivityNotFoundException) {
        pendingFiles = null
        false // The library cancels the callback and reports the picker error.
    }
}
```

Imports: `android.net.Uri`, `android.webkit.ValueCallback`, `android.webkit.WebChromeClient`, `android.content.ActivityNotFoundException`, and `androidx.activity.result.contract.ActivityResultContracts`. In `onDestroy`, cancel the host's pending selection and dispose the view. The wrapper guards against duplicate completions and cancels an outstanding picker on disposal.

No raw `addJavascriptInterface` is exposed to issuer frames: the bridge is origin-limited and main-frame-only, with a session nonce. SSL errors keep Android's default cancellation behavior. Do not override that with `proceed()`. File/content access is only for the system picker, not a local checkout URL. `dispose()` is idempotent. Restore the checkout URL/order identifier after configuration/process changes and verify server state before showing payment UI again.
