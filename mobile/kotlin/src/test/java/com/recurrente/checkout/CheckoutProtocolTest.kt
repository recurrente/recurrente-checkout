package com.recurrente.checkout
import org.junit.Assert.*
import org.junit.Test

class CheckoutProtocolTest {
    @Test fun preservesQueryAndFragment() {
        assertEquals("https://app.recurrente.com/s/x/y?tag=a&tag=b&embed=true#form", CheckoutProtocol.embeddedUrl("https://app.recurrente.com/s/x/y?tag=a&tag=b&embed=false#form"))
    }
    @Test fun refusesUnsafeOrigins() {
        for (url in listOf("http://app.recurrente.com/s/x", "https://user@app.recurrente.com/s/x", "https://app.recurrente.com.evil.test/s/x", "https://app.recurrente.com:8443/s/x")) {
            assertThrows(IllegalArgumentException::class.java) { CheckoutProtocol.embeddedUrl(url) }
        }
    }
    @Test fun validatesCurrentSessionAndPaymentIdentity() {
        val raw = """{"session":"s","data":{"type":"recurrente-plugin:payment-success","checkoutId":"ch_test"}}"""
        assertEquals("ch_test", CheckoutProtocol.message(raw, "s")?.checkoutId)
        assertNull(CheckoutProtocol.message(raw, "old"))
        assertNull(CheckoutProtocol.message("""{"session":"s","data":{"type":"recurrente-plugin:payment-success"}}""", "s"))
        assertNotNull(CheckoutProtocol.message("""{"session":"s","data":{"type":"recurrente-plugin:payment-failed","notice":"Retry"}}""", "s"))
    }
    @Test fun returnRoutesMatchExactly() {
        val routes = listOf("myapp://checkout/result?flow=pay")
        assertTrue(CheckoutProtocol.matchesReturn("myapp://checkout/result?flow=pay&checkout_id=ch_test", routes))
        assertFalse(CheckoutProtocol.matchesReturn("myapp://checkout/result-evil?flow=pay", routes))
        assertFalse(CheckoutProtocol.matchesReturn("myapp://checkout/result?flow=other", routes))
    }
}
