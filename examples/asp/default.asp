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
            url: "https://app.recurrente.com/s/recurrente-gym/prod_g4pnrrya",
            onSuccess: function(paymentData) {
                console.log('Payment completed successfully!', paymentData.checkoutId);
                alert('Payment completed successfully! ' + paymentData.checkoutId);
                // Add a delay before redirecting to success page
                setTimeout(function() {
                    window.location.href = 'success.asp?checkoutId=' + paymentData.checkoutId;
                }, 2000); // 2 second delay
            },
            onFailure: function(data) {
                console.log('Payment failed with the following error:', data.error);
                alert('Payment failed with the following error: ' + data.error);
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
