import XCTest
@testable import RecurrenteCheckout

final class CheckoutProtocolTests: XCTestCase {
    func testEmbeddedURLPreservesRepeatedParametersAndFragment() throws {
        let url = URL(string: "https://app.recurrente.com/checkout-session/ch_test?tag=a&tag=b&embed=false#form")!
        let result = try CheckoutProtocol.embeddedURL(url)
        let parts = URLComponents(url: result, resolvingAgainstBaseURL: false)!
        XCTAssertEqual(parts.queryItems?.filter { $0.name == "tag" }.count, 2)
        XCTAssertEqual(parts.queryItems?.filter { $0.name == "embed" }.map(\.value), ["true"])
        XCTAssertEqual(parts.fragment, "form")
    }
    func testRejectsUnsafeURLs() {
        for value in ["http://app.recurrente.com/s/x", "https://app.recurrente.com.evil.test/s/x", "https://user@app.recurrente.com/s/x", "https://app.recurrente.com:8443/s/x"] {
            XCTAssertThrowsError(try CheckoutProtocol.embeddedURL(URL(string: value)!))
        }
    }
    func testAuthenticatesSessionAndRequiresPaidCheckoutID() {
        let raw = #"{"session":"test-session","data":{"type":"recurrente-plugin:payment-success","checkoutId":"ch_test"}}"#
        XCTAssertEqual(CheckoutProtocol.decode(raw, session: "test-session")?.kind, .success)
        XCTAssertNil(CheckoutProtocol.decode(raw, session: "another-session"))
        XCTAssertNil(CheckoutProtocol.decode(#"{"session":"s","data":{"type":"recurrente-plugin:payment-success"}}"#, session: "s"))
        XCTAssertNotNil(CheckoutProtocol.decode(#"{"session":"s","data":{"type":"recurrente-plugin:payment-failed","notice":"Try again"}}"#, session: "s"))
    }
    func testReturnURLIsExactRouteNotPrefixOrPaymentProof() {
        let routes = [URL(string: "myapp://checkout/result?flow=pay")!]
        XCTAssertTrue(CheckoutProtocol.matchesReturn(URL(string: "myapp://checkout/result?flow=pay&checkout_id=ch_test")!, routes: routes))
        XCTAssertFalse(CheckoutProtocol.matchesReturn(URL(string: "myapp://checkout/result-evil?flow=pay")!, routes: routes))
        XCTAssertFalse(CheckoutProtocol.matchesReturn(URL(string: "myapp://checkout/result?flow=other")!, routes: routes))
    }
    func testHTMLIncludesEarlyListener() throws {
        let html = try CheckoutProtocol.html(url: URL(string: "https://app.recurrente.com/s/x/y")!, session: "test")
        XCTAssertFalse(html.contains("__RECURRENTE_CONFIG__"))
        XCTAssertTrue(html.contains("event.source !== frame.contentWindow"))
    }
}
