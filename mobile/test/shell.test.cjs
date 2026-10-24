const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const shell = fs.readFileSync(__dirname + '/../shared/checkout-shell.html', 'utf8');
function harness({ bridge = 'android', early = false } = {}) {
  const events = [], listeners = {};
  const frame = { contentWindow: {}, setAttribute() {} };
  const config = { origin: 'https://app.recurrente.com', url: 'https://app.recurrente.com/checkout-session/ch_test?embed=true', session: 'test-session' };
  const window = { addEventListener: (name, fn) => { listeners[name] = fn; } };
  const receiver = { postMessage: raw => events.push(JSON.parse(raw)) };
  if (bridge === 'android') window.RecurrenteCheckoutBridge = receiver;
  if (bridge === 'react-native') window.ReactNativeWebView = receiver;
  if (bridge === 'swift') window.webkit = { messageHandlers: { recurrenteCheckout: receiver } };
  const post = (data, origin = config.origin, source = frame.contentWindow) => listeners.message({ data, origin, source });
  const document = { createElement: () => frame, body: { appendChild: () => { if (early) post({ type: 'recurrente-plugin:payment-success', checkoutId: 'ch_test' }); } } };
  const script = shell.match(/<script>([\s\S]*)<\/script>/)[1].replace('__RECURRENTE_CONFIG__', JSON.stringify(config));
  vm.runInNewContext(script, { window, document });
  return { events, post, frame };
}
for (const bridge of ['android', 'react-native', 'swift']) test('initial parse success is delivered through ' + bridge, () => {
  const h = harness({ bridge, early: true });
  assert.equal(h.events[0].data.checkoutId, 'ch_test');
  assert.equal(h.events[0].session, 'test-session');
});
test('rejects foreign origins, sibling/issuer frames, string/malformed/unknown payloads', () => {
  const h = harness(), event = { type: 'recurrente-plugin:payment-success', checkoutId: 'ch_test' };
  h.post(event, 'https://issuer.test'); h.post(event, 'https://app.recurrente.com', {});
  for (const value of [null, 'json', [], {}, {type: 'payer_authentication_validation_complete'}, {type: event.type}]) h.post(value);
  assert.deepEqual(h.events, []);
});
test('failure leaves retry alive, pending is not paid, success is once', () => {
  const h = harness();
  h.post({type: 'recurrente-plugin:payment-failed', error: '3DS failed', notice: 'Try again'});
  h.post({type: 'recurrente-plugin:payment-in-progress', checkoutId: 'ch_test'});
  h.post({type: 'recurrente-plugin:payment-success', checkoutId: 'ch_test'});
  h.post({type: 'recurrente-plugin:payment-success', checkoutId: 'ch_test'});
  h.post({type: 'recurrente-plugin:payment-failed'});
  assert.deepEqual(h.events.map(e => e.data.type), ['recurrente-plugin:payment-failed','recurrente-plugin:payment-in-progress','recurrente-plugin:payment-success']);
});
test('forwards only the public contract, not arbitrary nested message data', () => {
  const h = harness();
  h.post({type:'recurrente-plugin:payment-failed', notice:'Declined', card:{number:'not-a-card'}, extra:'discard'});
  assert.deepEqual(h.events[0].data, {type:'recurrente-plugin:payment-failed', notice:'Declined'});
});
