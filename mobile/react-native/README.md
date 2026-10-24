# Recurrente Checkout — React Native

Unpublished release candidate. Hosted checkout in `react-native-webview`, not native card controls. Read the [contract and release gates](../README.md) before integrating.

## Install from a checkout of this branch

```sh
cd mobile/react-native
npm ci --ignore-scripts
npm run build
npm pack
# In your React Native app:
npm install /path/to/recurrente-checkout-react-native-0.1.0-rc.0.tgz react-native-webview@14.0.1 react-native-get-random-values
# Android: explicit compatibility patch, then rebuild the native application:
npx recurrente-checkout-patch-webview
npx recurrente-checkout-patch-webview --check
# iOS: install pods using your application's normal bundle/pod workflow.
```

The adapter is typechecked with React Native 0.88 / WebView 14.0.1; other React Native versions still need device verification. Use a native build (or Expo development build) that includes both native dependencies, not an unsupported JS-only runtime.

```tsx
import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import { RecurrenteCheckout, RecurrenteCheckoutHandle } from 'recurrente-checkout-react-native';

export function CheckoutScreen({ checkoutURL, refreshOrder, close }: {
  checkoutURL: string; // Supplied by YOUR authenticated backend; no API keys here.
  refreshOrder: () => void;
  close: () => void;
}) {
  const checkout = useRef<RecurrenteCheckoutHandle>(null);
  return <View style={{ flex: 1 }}>
    <Button title="Cerrar" onPress={() => checkout.current?.cancel()} />
    <RecurrenteCheckout ref={checkout} url={checkoutURL} style={{ flex: 1 }}
      returnURLs={['myapp://checkout/result']}
      onSuccess={refreshOrder}
      onFailure={() => { /* Keep the checkout mounted; show retryable status. */ }}
      onPaymentInProgress={refreshOrder}
      onReturn={refreshOrder}
      onCancel={() => { refreshOrder(); close(); }}
      onError={() => { /* Show recovery UI; query the order before retrying. */ }}
      onExternalNavigation={url => { /* Open only host-approved URLs, optionally after a prompt. */ }}
    />
  </View>;
}
```

Use your application's safe-area component around this screen. Connect Android back / iOS dismissal to `cancel()`, unmount after closing, and reconcile the order after app resume. `onFailure` must **not** navigate away by default; a failed attempt can succeed on retry. Pending is not paid. Keep `checkoutURL` stable through rerenders.

The WebView dependency supplies native file selection. Configure the app's file/photo/camera usage descriptions only for features your picker uses; verify receipt upload and cancellation on both platforms. External popups are delegated to `onExternalNavigation` and may require an explicit external-browser flow. The adapter never launches arbitrary URLs itself.

`originWhitelist=['*']` allows the navigation delegate to inspect custom return schemes; it does **not** trust arbitrary payment messages. The bridge independently checks origin, frame, event and session. iOS exposes top-frame information. Android requires the included version-pinned compatibility patch to forward `WebResourceRequest.isForMainFrame()` into the synchronous navigation event. The command only modifies the exact known WebView 14.0.1 Java source; it is idempotent, rejects unknown/locally modified sources, and never runs automatically. Run it after each dependency reinstall and before native builds (including CI). To undo, reinstall the pinned dependency. Remote JS debugging/the asynchronous fallback does not preserve nested-frame navigation and is unsupported: missing metadata blocks navigation with `onError`, never guesses that the request is nested. Android nested 3DS and main-frame link handling still require a native build/device test with this patch; TypeScript and patch tests do not prove that behavior.
