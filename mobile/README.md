# Recurrente Checkout for mobile (release candidate)

Four thin adapters render the **existing hosted checkout inside the app**, rather than collecting card details in native controls. This is not a native PaymentSheet or a native 3DS2 SDK. No registry release is part of this change.

| Platform | Package | Integration |
| --- | --- | --- |
| React Native (iOS / Android) | `recurrente-checkout-react-native` | [README](react-native/README.md) |
| Swift (iOS 14+) | `RecurrenteCheckout` (Swift Package Manager) | [README](swift/README.md) |
| Kotlin (Android 7 / API 24+) | `com.recurrente:recurrente-checkout` (local AAR/Maven) | [README](kotlin/README.md) |
| Flutter (iOS / Android) | existing `recurrente_checkout_flutter` repo | [Repository](https://github.com/recurrente/recurrente-checkout-flutter) |

## Contract

1. Your **server** creates a checkout using its Recurrente credentials, then gives the mobile app its HTTPS checkout URL. Never embed API keys in an app.
2. The adapter appends `embed=true`, preserves other query parameters, and mounts the checkout in a full-size WebView iframe. It registers the event listener **before** loading the checkout, including already-paid checkouts that emit an event during parsing.
3. The hosted checkout owns card entry, installments, subscriptions, saved cards, account login, payment processing and its issuer-authentication frames. The wrapper neither changes these flows nor enables methods unavailable to the merchant.
4. The app handles events and always confirms the actual order/payment state through **its backend**. A client callback, return URL, close action, timeout, pending bank transfer or app resume is not authorization to fulfill an order.

| Event | Meaning and host behavior |
| --- | --- |
| `recurrente-plugin:payment-success` | Checkout reports success with `checkoutId`. Delivered at most once per mounted session. Fetch server status before fulfillment. |
| `recurrente-plugin:payment-failed` | Validation or payment failure; may lack a checkout ID. Keep the checkout open so the payer can retry. |
| `recurrente-plugin:payment-in-progress` | Transfer submitted / processing, **not paid**. Keep the order pending; use server-side status/webhooks. May be followed by success. |
| Return navigation | Explicitly configured route matched by scheme, host, path and required query parameters. Intercepted, never converted to a success event. |
| Cancel | The host closes the UI. This does **not** cancel or refund an in-flight charge. Verify server state before starting another attempt. |
| WebView error | Network / process error, distinct from a payment decline. Some nested-frame failures are visible only in the checkout. Do not blindly retry a charge. |

Each WebView receives a fresh random session. The HTML bridge checks the exact `app.recurrente.com` origin **and** the direct checkout frame, rejects unknown events, forwards only documented fields, and ignores duplicate success. Native decoders reject stale sessions. Navigation to issuer HTTPS frames remains within the checkout. Main-frame / custom-scheme / popup links are handed to the host; no arbitrary intent is launched automatically. Keep an explicit application allowlist for external links.

## Flows and release gates

See [validation matrix](VALIDATION.md). Automated protocol tests and simulated nested-frame tests are not proof of a bank challenge or native WebView compatibility. Before a production release, run the matrix in **each wrapper on iOS and Android where applicable**; retain native screenshots and design review. Until then these packages are release candidates, not a claim of production readiness.

- Create and resume the **same** checkout after interruption; query your backend first. Do not persist card data or generate a new order on every render.
- For `custom_success_url` / cancellation routes, configure the corresponding `returnURLs` / `returnUrls`. A configured success redirect can replace the hosted success page and its postMessage event. Your `onReturn` handler must fetch server state.
- Do not close on failure or reload during a 3DS challenge. A nested issuer event is not a payment event; the checkout must validate it server-side and emit its final event.
- Bank-transfer receipts use the platform file picker. Kotlin / Flutter Android require a host-supplied picker callback. React Native uses WebView's picker; WKWebView uses the system picker. Configure any platform permission descriptions your picker needs, and test cancellation and large files.
- Wallets, passkeys, popup-based authentication and payment apps have platform/domain/entitlement requirements. These adapters do **not** add entitlements or promise Apple Pay / Google Pay support. Keep them gated until verified in the target app and approved checkout configuration. If a required method cannot work in the WebView, the host must offer an explicitly designed external-browser fallback and reconcile state on return; these packages do not automatically implement that fallback.
- The host owns safe-area layout, close/back controls, accessibility focus, keyboard resizing, background/resume reconciliation, and whether to open allowed external links. See each integration example.

## Development

```sh
node mobile/scripts/generate-shell.mjs
node mobile/scripts/generate-shell.mjs --check
node --test mobile/test/*.test.cjs
cd mobile/react-native && npm ci --ignore-scripts && npm run build && npm test
```

`mobile/shared/checkout-shell.html` is canonical. Generated Swift, Kotlin and TypeScript copies are checked in for independent distribution. Export the exact same shell to the existing Flutter repository with:

```sh
node mobile/scripts/generate-shell.mjs --flutter /path/to/recurrente-checkout-flutter/lib/src/checkout_shell.dart
```

CI includes separate Swift/iOS, Android/Kotlin and React Native gates. It does not replace device-based 3DS, file-picker, navigation, accessibility and design checks.

## Source notes (2026-10-23)

- [Recurrente sandbox guide](https://docs.recurrente.com/guias-espanol/comenzar/primer-pago-de-prueba): create checkouts server-side; no keys in mobile clients.
- Existing contract: root `recurrente-checkout.js`; `recurrente-app` checkout controller, `_plugin_success.html.erb`, `payer_authentication_controller.js`, `checkout_controller.js` and `checkoutable.rb` inspected for pending, parser-time events, issuer validation and custom redirects.
- [Stripe mobile payments](https://docs.stripe.com/payments/mobile) is a benchmark for lifecycle and server confirmation, not an assertion that Recurrente provides Stripe's native payment methods or SDK.
- [React Native WebView](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md), [Android WebViewCompat](https://developer.android.com/reference/androidx/webkit/WebViewCompat), [WKScriptMessage frame information](https://developer.apple.com/documentation/webkit/wkscriptmessage/frameinfo).
