import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import { checkoutHTML, decodeMessage, navigationTarget, SHELL_ORIGIN } from './protocol';
import type { CheckoutMessage } from './protocol';
export type { CheckoutMessage } from './protocol';
export type RecurrenteCheckoutHandle = { cancel(): void };
export type RecurrenteCheckoutProps = {
  url: string;
  /** Routes only; a return is NOT proof of payment. Verify with your backend. */
  returnURLs?: readonly string[];
  onSuccess?: (message: CheckoutMessage) => void;
  onFailure?: (message: CheckoutMessage) => void;
  onPaymentInProgress?: (message: CheckoutMessage) => void;
  onReturn?: (url: string) => void;
  /** Host chooses whether to open this external URL. Never auto-launch intents. */
  onExternalNavigation?: (url: string) => void;
  onCancel?: () => void;
  onError?: (description: string) => void;
  style?: StyleProp<ViewStyle>;
};
function newSession(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}
export const RecurrenteCheckout = forwardRef<RecurrenteCheckoutHandle, RecurrenteCheckoutProps>(function RecurrenteCheckout(props, ref) {
  const webView = useRef<WebView<{}>>(null);
  // A new URL creates a fresh, isolated WebView; rerenders don't restart payment.
  const session = useMemo(() => ({ token: newSession(), closed: false }), [props.url]);
  const source = useMemo(() => ({ html: checkoutHTML(props.url, session.token), baseUrl: SHELL_ORIGIN + '/' }), [props.url, session]);
  useImperativeHandle(ref, () => ({ cancel() {
    if (session.closed) return;
    session.closed = true;
    webView.current?.stopLoading();
    props.onCancel?.();
  } }), [session, props.onCancel]);
  return <WebView<{}> key={session.token} ref={webView} source={source} style={props.style}
    originWhitelist={['*']} javaScriptEnabled domStorageEnabled thirdPartyCookiesEnabled
    mixedContentMode="never" allowFileAccess={false} allowFileAccessFromFileURLs={false}
    allowUniversalAccessFromFileURLs={false} setSupportMultipleWindows
    onMessage={({ nativeEvent }) => {
      if (session.closed) return;
      const message = decodeMessage(nativeEvent.data, session.token);
      if (!message) return;
      if (message.type === 'recurrente-plugin:payment-success') { session.closed = true; props.onSuccess?.(message); }
      else if (message.type === 'recurrente-plugin:payment-failed') props.onFailure?.(message);
      else props.onPaymentInProgress?.(message);
    }}
    onShouldStartLoadWithRequest={request => {
      if (session.closed) return false;
      const target = navigationTarget(request.url, request.isTopFrame, props.returnURLs ?? []);
      if (target === 'allow') return true;
      if (target === 'return') props.onReturn?.(request.url);
      else if (target === 'unsupported') props.onError?.('Native frame metadata unavailable. Apply the documented Android WebView patch and rebuild; remote JS debugging is unsupported.');
      else props.onExternalNavigation?.(request.url);
      return false;
    }}
    onOpenWindow={({ nativeEvent }) => props.onExternalNavigation?.(nativeEvent.targetUrl)}
    onError={({ nativeEvent }) => props.onError?.(nativeEvent.description)}
    onHttpError={({ nativeEvent }) => props.onError?.('HTTP ' + nativeEvent.statusCode)}
    onRenderProcessGone={() => props.onError?.('WebView process terminated; verify checkout status before reopening')}
    onContentProcessDidTerminate={() => props.onError?.('WebView process terminated; verify checkout status before reopening')}
  />;
});
