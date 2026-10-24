#!/usr/bin/env node
// Explicit build-time compatibility patch. Never runs as an install hook.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const ORIGINAL = "0d8f2bb82ad7bcdb9dd54223f6d5e0355e8bafb12a79d6797f79299b114bab35";
const PATCHED = "efc2bd1d7de180cdb37cd6777efd9ad044676485d2649f69ff5607b73a989ce8";
const changes = [
  [
    "public boolean shouldOverrideUrlLoading(WebView view, String url) {",
    "public boolean shouldOverrideUrlLoading(WebView view, String url) {\n        return shouldOverrideUrlLoading(view, url, null);\n    }\n\n    private boolean shouldOverrideUrlLoading(WebView view, String url, Boolean isTopFrame) {"
  ],
  [
    "event.putDouble(\"lockIdentifier\", lockIdentifier);",
    "event.putDouble(\"lockIdentifier\", lockIdentifier);\n            if (isTopFrame != null) event.putBoolean(\"isTopFrame\", isTopFrame);"
  ],
  [
    "return this.shouldOverrideUrlLoading(view, url);",
    "return this.shouldOverrideUrlLoading(view, url, request.isForMainFrame());"
  ]
];
const digest = text => createHash('sha256').update(text).digest('hex');
function patchSource(source) {
  if (digest(source) === PATCHED) return source;
  if (digest(source) !== ORIGINAL) throw new Error('Unexpected WebView source; refusing to modify it. Use the supported unmodified react-native-webview 14.0.1.');
  let result = source;
  for (const [before, after] of changes) result = result.replace(before, after);
  if (digest(result) !== PATCHED) throw new Error('Patch verification failed');
  return result;
}
if (require.main === module) {
  try {
    const manifest = require.resolve('react-native-webview/package.json', { paths: [process.cwd()] });
    if (JSON.parse(fs.readFileSync(manifest, 'utf8')).version !== '14.0.1') throw new Error('Only react-native-webview 14.0.1 is supported');
    const target = path.join(path.dirname(manifest), 'android/src/main/java/com/reactnativecommunity/webview/RNCWebViewClient.java');
    const source = fs.readFileSync(target, 'utf8');
    const patched = patchSource(source);
    if (process.argv.includes('--check')) {
      if (source !== patched) throw new Error('Android frame metadata patch is not applied');
    } else if (source !== patched) fs.writeFileSync(target, patched);
    console.log('Android WebView frame metadata patch verified. Rebuild the native app.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { patchSource, ORIGINAL, PATCHED };
