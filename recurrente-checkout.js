/**
 * Recurrente Checkout Library
 * JavaScript library for integrating Recurrente checkout into web applications
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.RecurrenteCheckout = factory());
}(this, function () {
  'use strict';

  // Global flag to track if an instance is already active
  let isActive = false;

  function loadRecurrenteCheckout({ url, onSuccess, onFailure, onPaymentInProgress, development = false }) {
    if (!url) {
      console.error("Missing required parameter: url must be provided");
      return;
    }

    // Check if another instance is already active
    if (isActive) {
      console.error("Recurrente checkout is already active. Only one instance can be active at a time.");
      return;
    }

    // Set the active flag
    isActive = true;

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

    // Set up event listener for messages from iframe
    const handleMessage = (event) => {
      if (!development && event.origin !== 'https://app.recurrente.com') return

      if (event.data && event.data.type === 'recurrente-plugin:payment-success') {
        console.log('Payment successful:', event.data);
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(event.data);
        }

        // Remove the event listener after successful payment
        window.removeEventListener('message', handleMessage);
        // Reset the active flag
        isActive = false;

      } else if (event.data && event.data.type === 'recurrente-plugin:payment-failed') {
        console.log('Payment failed:', event.data);
        if (onFailure && typeof onFailure === 'function') {
          onFailure(event.data);
        }

        // Remove the event listener after failed payment
        window.removeEventListener('message', handleMessage);
        // Reset the active flag
        isActive = false;
      } else if (event.data && event.data.type === 'recurrente-plugin:payment-in-progress') {
        console.log('Payment in progress:', event.data);
        if (onPaymentInProgress && typeof onPaymentInProgress === 'function') {
          onPaymentInProgress(event.data);
        }
      }
    };

    // Add event listener for iframe messages
    window.addEventListener('message', handleMessage);

    // If we have a direct checkout URL, use it immediately
    if (checkoutUrl) {
      const iframe = document.createElement("iframe");
      iframe.id = "recurrente-checkout-iframe";
      iframe.src = checkoutUrl;
      iframe.style.cssText = "width: 100%; height: 850px; border: none; overflow: hidden;";
      iframe.allow = "payment";
      container.innerHTML = "";
      container.appendChild(iframe);
      return;
    }
  }

  return { load: loadRecurrenteCheckout };
}));
