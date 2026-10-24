package com.recurrente.checkout

import java.net.URI
import java.net.URLDecoder
import org.json.JSONObject

data class CheckoutMessage(val type: String, val checkoutId: String?, val error: String?, val notice: String?)

internal object CheckoutProtocol {
    const val origin = "https://app.recurrente.com"
    const val shellOrigin = "https://app.recurrente.com"
    const val success = "recurrente-plugin:payment-success"
    const val failure = "recurrente-plugin:payment-failed"
    const val pending = "recurrente-plugin:payment-in-progress"

    fun embeddedUrl(value: String): String {
        val uri = URI(value)
        require(uri.scheme == "https" && uri.host == "app.recurrente.com" && uri.rawUserInfo == null && uri.port in listOf(-1, 443)) {
            "Use an HTTPS checkout URL from app.recurrente.com"
        }
        val query = uri.rawQuery.orEmpty().split('&').filter { it.isNotEmpty() && decode(it.substringBefore('=')) != "embed" } + "embed=true"
        return value.substringBefore('#').substringBefore('?') + "?" + query.joinToString("&") + (uri.rawFragment?.let { "#$it" } ?: "")
    }

    fun html(url: String, session: String): String {
        val config = JSONObject().put("url", embeddedUrl(url)).put("origin", origin).put("session", session).toString().replace("<", "\\u003c")
        return CheckoutShell.html.replace("__RECURRENTE_CONFIG__", config)
    }

    fun message(raw: String, session: String): CheckoutMessage? {
        if (raw.length > 65536) return null
        return try {
            val envelope = JSONObject(raw)
            if (envelope.optString("session") != session) return null
            val data = envelope.optJSONObject("data") ?: return null
            val type = data.opt("type") as? String ?: return null
            if (type !in listOf(success, failure, pending)) return null
            val id = data.opt("checkoutId") as? String
            if (type != failure && id.isNullOrEmpty()) return null
            CheckoutMessage(type, id, data.opt("error") as? String, data.opt("notice") as? String)
        } catch (_: Exception) { null }
    }

    fun matchesReturn(value: String, routes: List<String>): Boolean = try {
        val actual = URI(value)
        actual.rawUserInfo == null && routes.any { route ->
            val expected = URI(route)
            actual.scheme == expected.scheme && actual.host == expected.host && actual.port == expected.port && actual.path == expected.path &&
                query(expected).all { it in query(actual) }
        }
    } catch (_: Exception) { false }

    private fun query(uri: URI): List<Pair<String, String>> = uri.rawQuery?.split('&')?.map {
        decode(it.substringBefore('=')) to decode(it.substringAfter('=', ""))
    } ?: emptyList()
    private fun decode(value: String) = URLDecoder.decode(value, "UTF-8")
}
