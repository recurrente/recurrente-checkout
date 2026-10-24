// Generated; edit mobile/shared/checkout-shell.html.
import Foundation
enum CheckoutShell {
    static let html = #"""
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; frame-src https:; base-uri 'none'; form-action 'none'">
<title>Recurrente Checkout</title>
<style>html,body,iframe{width:100%;height:100%;margin:0;border:0}body{overflow:hidden}iframe{display:block}</style>
</head>
<body>
<script>
(function () {
  'use strict';
  const config = __RECURRENTE_CONFIG__;
  const frame = document.createElement('iframe');
  let succeeded = false;
  function send(data) {
    const message = JSON.stringify({ session: config.session, data: data });
    if (window.RecurrenteCheckoutBridge) window.RecurrenteCheckoutBridge.postMessage(message);
    else if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(message);
    else if (window.webkit && window.webkit.messageHandlers.recurrenteCheckout) {
      window.webkit.messageHandlers.recurrenteCheckout.postMessage(message);
    }
  }
  // Register before loading the checkout: success pages can post while parsing.
  window.addEventListener('message', function (event) {
    if (succeeded || event.source !== frame.contentWindow || event.origin !== config.origin) return;
    const data = event.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;
    if (!['recurrente-plugin:payment-success', 'recurrente-plugin:payment-failed',
      'recurrente-plugin:payment-in-progress'].includes(data.type)) return;
    if (data.type !== 'recurrente-plugin:payment-failed' &&
      (typeof data.checkoutId !== 'string' || !data.checkoutId || data.checkoutId.length > 4096)) return;
    const payload = { type: data.type };
    ['checkoutId', 'error', 'notice'].forEach(function (key) {
      if (typeof data[key] === 'string' && data[key].length <= 4096) payload[key] = data[key];
    });
    if (data.type === 'recurrente-plugin:payment-success') succeeded = true;
    send(payload);
  });
  frame.title = 'Recurrente Checkout';
  frame.allow = 'payment; clipboard-write; publickey-credentials-get';
  frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads');
  frame.src = config.url;
  document.body.appendChild(frame);
})();
</script>
</body>
</html>
"""#
}
