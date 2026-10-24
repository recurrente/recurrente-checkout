const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { patchSource } = require('../scripts/patch-webview.cjs');
const source = fs.readFileSync(path.join(path.dirname(require.resolve('react-native-webview/package.json')), 'android/src/main/java/com/reactnativecommunity/webview/RNCWebViewClient.java'), 'utf8');
test('supported Android WebView forwards main-frame metadata and patch is idempotent', () => {
  const patched = patchSource(source);
  assert.match(patched, /request.isForMainFrame\(\)/);
  assert.match(patched, /event.putBoolean\("isTopFrame", isTopFrame\)/);
  assert.equal(patchSource(patched), patched);
});
test('patch refuses unknown or locally modified native source', () => {
  assert.throws(() => patchSource(source + '\n// local change'), /refusing/);
});
