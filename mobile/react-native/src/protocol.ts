import { SHELL } from './shell';
export const SHELL_ORIGIN = 'https://app.recurrente.com';
export const CHECKOUT_ORIGIN = 'https://app.recurrente.com';
export type CheckoutMessage = {
  type: 'recurrente-plugin:payment-success' | 'recurrente-plugin:payment-failed' | 'recurrente-plugin:payment-in-progress';
  checkoutId?: string; error?: string; notice?: string;
};
export function embeddedURL(value: string): string {
  const url = new URL(value);
  if (url.origin !== CHECKOUT_ORIGIN || url.username || url.password) throw new Error('Use an HTTPS checkout URL from app.recurrente.com');
  url.searchParams.set('embed', 'true');
  return url.toString();
}
export function checkoutHTML(url: string, session: string): string {
  const config = JSON.stringify({ url: embeddedURL(url), origin: CHECKOUT_ORIGIN, session }).replace(/</g, '\\u003c');
  return SHELL.replace('__RECURRENTE_CONFIG__', () => config);
}
export function decodeMessage(raw: string, session: string): CheckoutMessage | null {
  if (raw.length > 65536) return null;
  try {
    const value = JSON.parse(raw);
    if (value.session !== session || !value.data || Array.isArray(value.data)) return null;
    const data = value.data;
    if (!['recurrente-plugin:payment-success', 'recurrente-plugin:payment-failed', 'recurrente-plugin:payment-in-progress'].includes(data.type)) return null;
    if (data.type !== 'recurrente-plugin:payment-failed' && (typeof data.checkoutId !== 'string' || !data.checkoutId)) return null;
    return data;
  } catch { return null; }
}
export function matchesReturnURL(value: string, configured: readonly string[]): boolean {
  try {
    const actual = new URL(value);
    return configured.some(candidate => {
      const expected = new URL(candidate);
      return actual.protocol === expected.protocol && actual.host === expected.host && actual.pathname === expected.pathname && !actual.username && !actual.password &&
        Array.from(expected.searchParams).every(([key, v]) => actual.searchParams.getAll(key).includes(v));
    });
  } catch { return false; }
}

/** Missing native frame metadata is not evidence of a subframe. */
export function navigationTarget(url: string, isTopFrame: boolean | undefined, returnURLs: readonly string[]): 'allow' | 'return' | 'external' | 'unsupported' {
  if (matchesReturnURL(url, returnURLs)) return 'return';
  if (url === 'about:blank' || url === SHELL_ORIGIN + '/') return 'allow';
  if (url.startsWith('https://')) {
    if (isTopFrame === false) return 'allow';
    if (isTopFrame === undefined) return 'unsupported';
  }
  return 'external';
}
