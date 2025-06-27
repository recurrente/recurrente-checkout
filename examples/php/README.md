# Checkout Recurrente - PHP Integration Example

This directory contains a complete functional example of Recurrente embedded checkout integration using PHP and vanilla JavaScript.

## Quick Start

1. **Start the PHP server:**
   ```bash
   php -S localhost:8000
   ```

2. **Access the checkout:**
   Open your browser at `http://localhost:8000`

## What's Included

- **PHP Server** (`index.php`) - Simple web server with CORS support
- **Client Library** (`public/recurrente-checkout.js`) - JavaScript integration
- **Checkout Page** (`views/index.php`) - Main checkout interface
- **Success Page** (`views/success.php`) - Payment success confirmation
- **Failure Page** (`views/failure.php`) - Payment failure handling

## Features Demonstrated

- ✅ Embedded checkout iframe integration
- ✅ Direct checkout URL support
- ✅ Payment success/failure event handling
- ✅ Success page with friendly UI
- ✅ Failure page with error messages
- ✅ CORS support for cross-origin requests

## Application Routes

### GET /
Shows the main checkout page with the embedded Recurrente checkout interface.

### GET /success
Shows the success page after completing payment.

### GET /failure
Shows the failure page when payment processing fails.

## Configuration

### CORS Support
The application includes cross-origin support for development:
- Allows all origins (`*`) for development
- Supports GET, POST and OPTIONS methods
- Includes necessary headers for Recurrente integration

### Development Configuration
- Runs on HTTP by default to avoid mixed content issues
- Binds to `localhost:8000` for external access
- Includes Content Security Policy commented out for production use

## Testing

### Local Development
1. Start the application: `php -S localhost:8000`
2. Access: `http://localhost:8000`
3. Monitor console logs for debugging information

### Testing with ngrok
To test webhook callbacks or external integrations:
```bash
ngrok http 8000
```

## Troubleshooting

### Common Issues
1. **Mixed Content Errors**: The app runs on HTTP by default for development
2. **CORS Issues**: CORS is enabled for all origins in development
3. **Iframe Loading**: Make sure the checkout URL is accessible

### Debug Mode
The client library includes extensive console logging. Check the browser console for detailed information.

## Next Steps

This example demonstrates frontend integration. For production use:
1. Implement proper error handling and logging
2. Add input validation and sanitization
3. Configure appropriate CORS settings for your domain
4. Use HTTPS in production
5. Uncomment and configure the Content Security Policy

## Support

For issues with this example, check the troubleshooting section above. For questions about the Recurrente API, consult their official documentation.
