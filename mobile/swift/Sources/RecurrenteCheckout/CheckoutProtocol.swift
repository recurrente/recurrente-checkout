import Foundation

public struct CheckoutMessage {
    public enum Kind: String {
        case success = "recurrente-plugin:payment-success"
        case failure = "recurrente-plugin:payment-failed"
        case paymentInProgress = "recurrente-plugin:payment-in-progress"
    }
    public let kind: Kind
    public let checkoutId: String?
    public let error: String?
    public let notice: String?
}

public enum CheckoutConfigurationError: Error { case invalidURL }

enum CheckoutProtocol {
    static let origin = "https://app.recurrente.com"
    static let shellOrigin = "https://app.recurrente.com"

    static func embeddedURL(_ url: URL) throws -> URL {
        guard var parts = URLComponents(url: url, resolvingAgainstBaseURL: false),
              parts.scheme == "https", parts.host == "app.recurrente.com",
              parts.port == nil || parts.port == 443, parts.user == nil, parts.password == nil else {
            throw CheckoutConfigurationError.invalidURL
        }
        var query = (parts.queryItems ?? []).filter { $0.name != "embed" }
        query.append(URLQueryItem(name: "embed", value: "true"))
        parts.queryItems = query
        guard let result = parts.url else { throw CheckoutConfigurationError.invalidURL }
        return result
    }

    static func html(url: URL, session: String) throws -> String {
        let data = try JSONSerialization.data(withJSONObject: [
            "url": try embeddedURL(url).absoluteString, "origin": origin, "session": session
        ], options: [.sortedKeys])
        let config = String(decoding: data, as: UTF8.self).replacingOccurrences(of: "<", with: "\\u003c")
        return CheckoutShell.html.replacingOccurrences(of: "__RECURRENTE_CONFIG__", with: config)
    }

    static func decode(_ raw: String, session: String) -> CheckoutMessage? {
        guard raw.utf8.count <= 65536, let data = raw.data(using: .utf8),
              let envelope = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any],
              envelope["session"] as? String == session, let body = envelope["data"] as? [String: Any],
              let type = body["type"] as? String, let kind = CheckoutMessage.Kind(rawValue: type) else { return nil }
        let id = body["checkoutId"] as? String
        guard kind == .failure || !(id ?? "").isEmpty else { return nil }
        return CheckoutMessage(kind: kind, checkoutId: id, error: body["error"] as? String, notice: body["notice"] as? String)
    }

    static func matchesReturn(_ url: URL, routes: [URL]) -> Bool {
        guard let actual = URLComponents(url: url, resolvingAgainstBaseURL: false), actual.user == nil, actual.password == nil else { return false }
        return routes.contains { route in
            guard let expected = URLComponents(url: route, resolvingAgainstBaseURL: false) else { return false }
            return actual.scheme == expected.scheme && actual.host == expected.host && actual.port == expected.port && actual.path == expected.path &&
                (expected.queryItems ?? []).allSatisfy { (actual.queryItems ?? []).contains($0) }
        }
    }
}
