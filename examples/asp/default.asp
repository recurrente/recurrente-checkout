<%@ Language="VBScript" %>
<!DOCTYPE html>
<html>
<head>
    <title>Recurrente Checkout Test - ASP Classic</title>
    <script src="recurrente-checkout.js"></script>
</head>
<body>
    <h2>Embedded Checkout Test - ASP Classic</h2>
    <div id="checkout-container"></div>

    <script>
        RecurrenteCheckout.load({
            url: "https://app.recurrente.com/checkout-session/ch_sample123",
            onSuccess: function(paymentData) {
                console.log('Payment completed successfully!', paymentData.checkoutId);
                alert('Payment completed successfully! ' + paymentData.checkoutId);
                // Add a delay before redirecting to success page
                setTimeout(function() {
                    window.location.href = 'success.asp?checkoutId=' + paymentData.checkoutId;
                }, 2000); // 2 second delay
            },
            onFailure: function(data) {
                console.log('Payment failed:', data);

                // Check message type to determine how to handle it
                if (data.type === 'notice') {
                    console.log('Notice message:', data.message);
                    // Handle notice type message
                    // e.g., "Card declined", "Insufficient funds", etc.
                } else if (data.type === 'error') {
                    console.log('Error message:', data.message);
                    // Handle error type message
                }

                // Handle payment failure based on type
                // e.g., show error message, redirect to error page, etc.
                window.location.href = 'failure.asp';
            },
            onPaymentInProgress: function(data) {
                console.log('Payment in progress:', data);
                alert(`Payment in progress: ${data.checkoutId}`);
            }
        });
    </script>
</body>
</html>
