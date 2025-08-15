import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if RecurrenteCheckout is available
    if (typeof window.RecurrenteCheckout !== 'undefined') {
      window.RecurrenteCheckout.load({
        url: "https://app.recurrente.com/checkout-session/ch_sample123",
        onSuccess: function(paymentData) {
          console.log('Payment completed successfully!', paymentData);
          // Handle successful payment
          // e.g., redirect to success page, update UI, etc.
          setTimeout(function() {
            navigate(`/success?checkoutId=${paymentData.checkoutId}`);
          }, 2000);
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
          navigate('/failure');
        },
        onPaymentInProgress: function(paymentData) {
          console.log('Payment with bank transfer in progress:', paymentData);
          // This callback only executes for bank transfers
          // Payment can take up to 24 hours to process
          // e.g., show informational message, send confirmation email, etc.
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
