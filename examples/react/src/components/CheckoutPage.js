import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if RecurrenteCheckout is available
    if (typeof window.RecurrenteCheckout !== 'undefined') {
      window.RecurrenteCheckout.load({
        url: "https://f468-181-114-8-163.ngrok-free.app/s/neonet/pay_stkqh5jz",
        onSuccess: function(paymentData) {
          console.log('Payment completed successfully!', paymentData.checkoutId);
          alert(`Payment completed successfully! ${paymentData.checkoutId}`);
          // Add a delay before redirecting to success page
          setTimeout(function() {
            navigate(`/success?checkoutId=${paymentData.checkoutId}`);
          }, 2000); // 2 second delay
        },
        onFailure: function(data) {
          console.log('Payment failed with the following error:', data.error);
          alert(`Payment failed with the following error: ${data.error}`);
          navigate('/failure');
        },
        onPaymentInProgress: function(data) {
          console.log('Payment in progress:', data);
          alert(`Payment in progress: ${data.checkoutId}`);
        }
      });
    } else {
      console.error('RecurrenteCheckout library not loaded');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Embedded Checkout Test - React</h2>
      <div id="checkout-container"></div>
    </div>
  );
};

export default CheckoutPage;
