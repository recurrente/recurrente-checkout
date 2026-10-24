const test = require('node:test');
const assert = require('node:assert/strict');
const { embeddedURL, checkoutHTML, decodeMessage, matchesReturnURL } = require('../lib/protocol');
test('URL preserves repeated query values, fragments and one embed flag', () => {
  const url = new URL(embeddedURL('https://app.recurrente.com/s/org/product?tag=a&tag=b&embed=false#details'));
  assert.deepEqual(url.searchParams.getAll('tag'), ['a','b']);
  assert.deepEqual(url.searchParams.getAll('embed'), ['true']);
  assert.equal(url.hash, '#details');
});
test('rejects unsafe checkout URLs', () => {
  for (const url of ['http://app.recurrente.com/s/x','https://app.recurrente.com.evil.test/s/x','https://user@app.recurrente.com/s/x','javascript:alert(1)','https://app.recurrente.com:8443/s/x']) assert.throws(() => embeddedURL(url));
});
test('decode validates session and payment schema', () => {
  const raw = JSON.stringify({session:'s', data:{type:'recurrente-plugin:payment-success', checkoutId:'ch_test'}});
  assert.equal(decodeMessage(raw,'s').checkoutId, 'ch_test');
  assert.equal(decodeMessage(raw,'old'), null);
  for (const raw of ['null','{', JSON.stringify({session:'s',data:{type:'recurrente-plugin:payment-success'}})]) assert.equal(decodeMessage(raw,'s'), null);
});
test('return routes cannot be spoofed with a prefix or changed query', () => {
  const routes = ['myapp://checkout/result?flow=pay'];
  assert.equal(matchesReturnURL('myapp://checkout/result?flow=pay&checkout_id=ch_test', routes), true);
  for (const url of ['myapp://checkout/result-evil?flow=pay','myapp://evil/result?flow=pay','myapp://checkout/result?flow=other']) assert.equal(matchesReturnURL(url,routes),false);
});
test('config substitution cannot inject closing script tags', () => {
  const html = checkoutHTML('https://app.recurrente.com/s/x/y?value=%3C%2Fscript%3E', 's</script>');
  assert.equal((html.match(/<\/script>/g)||[]).length, 1);
  assert.equal(html.includes('__RECURRENTE_CONFIG__'), false);
});

test('navigation keeps issuer subframes, delegates top links and blocks missing Android metadata', () => {
  const { navigationTarget } = require('../lib/protocol');
  assert.equal(navigationTarget('https://issuer.example/challenge', false, []), 'allow');
  assert.equal(navigationTarget('https://bank.example/terms', true, []), 'external');
  assert.equal(navigationTarget('https://bank.example/terms', undefined, []), 'unsupported');
  assert.equal(navigationTarget('https://issuer.example/challenge', undefined, []), 'unsupported');
  assert.equal(navigationTarget('myapp://checkout/result', false, ['myapp://checkout/result']), 'return');
  assert.equal(navigationTarget('https://app.recurrente.com/', undefined, []), 'allow');
});
