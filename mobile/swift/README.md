# Recurrente Checkout — Swift

Unpublished release candidate, iOS 14+, Swift 5.9, UIKit/WKWebView. [Contract and validation](../README.md).

Add the root repository as a **local Swift package**, or select the review branch in Xcode's Add Package Dependencies dialog. A stable semver release/tag is not available from this change. The product is `RecurrenteCheckout`.

```swift
import UIKit
import RecurrenteCheckout

@MainActor
final class CheckoutScreen: UIViewController {
    private let checkout: RecurrenteCheckoutView
    private let refreshOrder: () -> Void

    init(checkoutURL: URL, refreshOrder: @escaping () -> Void) throws {
        checkout = try RecurrenteCheckoutView(url: checkoutURL)
        self.refreshOrder = refreshOrder
        super.init(nibName: nil, bundle: nil)
    }
    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError() }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        view.addSubview(checkout)
        checkout.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            checkout.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            checkout.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
            checkout.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            checkout.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor)
        ])
        checkout.returnURLs = [URL(string: "myapp://checkout/result")!]
        checkout.onSuccess = { [weak self] _ in self?.refreshOrder() }
        checkout.onPaymentInProgress = { [weak self] _ in self?.refreshOrder() }
        checkout.onReturn = { [weak self] _ in self?.refreshOrder() }
        checkout.onFailure = { _ in /* Let the payer retry in the same checkout. */ }
        checkout.onError = { _ in /* Recovery UI; don't automatically create another charge. */ }
        checkout.onExternalNavigation = { _ in /* Apply your app's allowlist before opening. */ }
        checkout.onCancel = { [weak self] in
            self?.refreshOrder()
            self?.dismiss(animated: true)
        }
        navigationItem.leftBarButtonItem = UIBarButtonItem(
            title: "Cerrar", style: .plain, target: self, action: #selector(closeCheckout))
    }
    @objc private func closeCheckout() { checkout.cancel() }
}
```

Present inside your app's navigation controller; wire interactive dismissal/back to the same cancellation/reconciliation policy. For SwiftUI, host this view controller with `UIViewControllerRepresentable`, retain one checkout per URL, and use the same callbacks. Avoid recreating it during body updates.

WKWebView keeps its website data store, permits issuer HTTPS subframes and uses the system file picker. The weak message handler prevents a retain cycle. No ATS exceptions or JavaScript SSL bypass are needed. Configure privacy usage descriptions for any camera/photo features your picker offers. Wallets and passkeys remain unverified, not enabled by this wrapper.

```sh
swift test
xcodebuild -scheme RecurrenteCheckout -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
```

The first command checks Foundation protocol logic; the second is required to compile UIKit/WebKit code. Neither proves a real issuer challenge or supplies the mandatory native screenshots/design review.
