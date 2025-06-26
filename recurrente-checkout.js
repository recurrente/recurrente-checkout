(function (global) {
  function loadRecurrenteCheckout({ url, onSuccess, onFailure }) {
    if (!url) {
      console.error("Missing required parameter: url must be provided");
      return;
    }

    // Automatically append embed=true parameter if not present
    let checkoutUrl = url;
    if (!checkoutUrl.includes('embed=true')) {
      const separator = checkoutUrl.includes('?') ? '&' : '?';
      checkoutUrl = `${checkoutUrl}${separator}embed=true`;
    }

    const container = document.createElement("div");
    container.id = "recurrente-checkout-container";
    container.style.cssText = "width: 100%; max-width: 600px; margin: 0 auto;";
    document.body.appendChild(container);
    console.log("Container created and added to DOM:", container); // Debug log

    // Set up event listener for messages from iframe
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'recurrente-payment-success') {
        console.log('Payment successful:', event.data);
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(event.data);
        }
        
        // Remove the event listener after successful payment
        window.removeEventListener('message', handleMessage);

      } else if (event.data && event.data.type === 'recurrente-payment-failure') {
        console.log('Payment failed:', event.data);
        if (onFailure && typeof onFailure === 'function') {
          onFailure(event.data);
        }
        
        // Remove the event listener after failed payment
        window.removeEventListener('message', handleMessage);
      }
    };

    // Add event listener for iframe messages
    window.addEventListener('message', handleMessage);
    console.log("Event listener added"); // Debug log

    // If we have a direct checkout URL, use it immediately
    if (checkoutUrl) {
      const iframe = document.createElement("iframe");
      iframe.id = "recurrente-checkout-iframe";
      iframe.src = checkoutUrl;
      iframe.style.cssText = "width: 100%; height: 2000px; border: none; overflow: hidden;";
      iframe.allow = "payment";
      container.innerHTML = "";
      container.appendChild(iframe);
      return;
    }
  }

  global.RecurrenteCheckout = { load: loadRecurrenteCheckout };
})(window);
