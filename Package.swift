// swift-tools-version: 5.9
import PackageDescription
let package = Package(
    name: "RecurrenteCheckout",
    platforms: [.iOS(.v14)],
    products: [.library(name: "RecurrenteCheckout", targets: ["RecurrenteCheckout"])],
    targets: [
        .target(name: "RecurrenteCheckout", path: "mobile/swift/Sources/RecurrenteCheckout"),
        .testTarget(name: "RecurrenteCheckoutTests", dependencies: ["RecurrenteCheckout"], path: "mobile/swift/Tests/RecurrenteCheckoutTests")
    ]
)
