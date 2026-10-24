# Mobile checkout release validation

Status at implementation: protocol tests cover bridge behavior. **Native device, real issuer 3DS and visual/design acceptance are not yet signed off.** A simulated event never counts as an issuer challenge.

Record device/OS/WebView version, wrapper commit, approved test checkout, server result and native screenshot/video evidence for every applicable row. Do not use real customer cards or real payments without explicit owner authorization. Do not put credentials, card data or authentication codes in evidence.

| Flow | Expected behavior | Automated coverage | Remaining native/real integration gate |
| --- | --- | --- | --- |
| One-time card payment; already-paid URL | Listener catches even parser-time success, one callback | Shell + protocol tests | Each platform, backend matches callback |
| Decline / validation error then retry | Failure does not close session; later success allowed | Shell tests | Real checkout validation / decline and retry |
| 3DS frictionless | Checkout validates and emits final event | Public bridge contract only | Authorized provider test; verify server status |
| 3DS challenge approval | Issuer stays nested; only checkout's verified result succeeds | Real Chromium, simulated nested challenge passed; not real issuer evidence | iOS/Android challenge, OTP UI, keyboard and return |
| 3DS rejection / cancel / timeout | No false success; checkout can show failure/retry | Failure/retry protocol | All three authorized provider cases |
| Device collection failure / timeout | Checkout's own fallback is unchanged | No provider integration assertion | Provider test; inspect resulting state |
| Bank transfer and receipt | Picker works; submit emits pending, never paid | Pending-then-success protocol | Picker cancel/select/upload; backend pending/reconciliation |
| Installments / recurring checkout / save card | Hosted options stay owned by checkout | Same URL/event transport only | Each merchant-enabled flow and server record |
| Balance/login / saved card / expired checkout | In-app auth and errors remain usable | No native auth proof | Session cookies, login, expired URL, no duplicate charge |
| Custom success/cancel redirect | Exact return route callback; no inferred payment | URL matcher tests | Both platforms, HTTPS/custom scheme, server fetch |
| External links / popups / downloads | Explicit host callback or documented fallback; no automatic untrusted intent | Navigation code review | Terms, bank links, app links; unsupported flows remain gated |
| React Native Android frame routing | Version-pinned native metadata patch; unknown frames fail closed | Patch identity/idempotency + navigation regression tests | Build the patched Android app; prove issuer frames stay nested and top links go to host, without remote JS debugging |
| Close/back / background/resume / rotate | No charge cancellation claim; same checkout reconciled | Session decoder + cancel guards | Android back, iOS dismissal, process death, rotation |
| Lost network / TLS / renderer crash | Error, no false success, no unsafe SSL bypass | Error handlers/code review | Offline/reconnect, invalid TLS test, renderer restart |
| Forged/stale/foreign messages | Rejected by frame, origin, event and session checks | Shell + all protocol suites | Native frame bridge behavior |
| Wallets / passkeys / external payment apps | No availability claim until app-specific verification | None | Entitlements, domain, WebView support and owner approval |
| Visual/accessibility | Hosted content fits safe area; error/keyboard/challenge usable | No native screenshots yet | Phone/tablet, text scaling, VoiceOver/TalkBack, design review |

CI compilation does not close these manual gates. Package publication is a separate release decision.
