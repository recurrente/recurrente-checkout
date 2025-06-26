# Recurrente Checkout Plugin - Integration Guide

This guide explains how to integrate the Recurrente checkout library into your own projects.

## Quick Integration

### 1. Include the JavaScript Library

Copy the `example/public/recurrente-checkout.js` file to your project and include it in your HTML:

```html
<script src="/path/to/recurrente-checkout.js"></script>
```

### 2. Initialize the Checkout

Choose one of the two integration methods:

#### Method A: Direct Checkout URL

```javascript
RecurrenteCheckout.load({
  url: "https://app.recurrente.com/s/your-checkout-url?iframe=true",
  onSuccess: function(paymentData) {
    console.log('Payment successful:', paymentData);
    // Handle successful payment
    // e.g., redirect to success page, update UI, etc.
  },
  onFailure: function(error) {
    console.log('Payment failed:', error);
    // Handle failed payment
    // e.g., show error message, retry option, etc.
  }
});
```


## Troubleshooting

### Common Issues

1. **Iframe not loading**: Check that the checkout URL is accessible and includes `?iframe=true`
2. **CORS errors**: Ensure your backend allows requests from your frontend domain
3. **API errors**: Verify your Recurrente API keys and permissions
4. **Mixed content**: Use HTTPS for both frontend and backend in production

### Debug Mode

The library includes console logging. Check browser console for detailed information about the checkout process.

## Complete Example

See the `example/` directory for a complete working implementation using Sinatra (Ruby).

## Support

- For integration questions: Check this guide and the example implementation
- For Recurrente API issues: Contact Recurrente support
- For general questions: Refer to Recurrente's official documentation 