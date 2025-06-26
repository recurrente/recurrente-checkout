# Recurrente Checkout - Complete Integration Example

This directory contains a complete working example of Recurrente's embedded checkout integration using Sinatra (Ruby) and vanilla JavaScript.

## Quick Start

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Run the application:**
   ```bash
   ruby app.rb
   ```

3. **Access the checkout:**
   Open your browser to `http://localhost:4567`

## What's Included

- **Sinatra Application** (`app.rb`) - Simple web server with CORS support
- **Client-Side Library** (`public/recurrente-checkout.js`) - JavaScript integration
- **Checkout Page** (`views/index.erb`) - Main checkout interface
- **Success Page** (`views/success.erb`) - Payment success confirmation
- **Failure Page** (`views/failure.erb`) - Payment failure handling

## Features Demonstrated

- ✅ Embedded checkout iframe integration
- ✅ Direct checkout URL support
- ✅ Payment success/failure event handling
- ✅ Success page with user-friendly UI
- ✅ Failure page with error messaging
- ✅ CORS support for cross-origin requests

## Application Routes

### GET /
Displays the main checkout page with the embedded Recurrente checkout interface.

### GET /success
Displays the success page after payment completion.

### GET /failure
Displays the failure page when payment processing fails.

### OPTIONS *
Handles CORS preflight requests for cross-origin access.

## Configuration

### Environment Variables
The application loads dotenv but doesn't require any specific environment variables for basic functionality.

### CORS Settings
The application includes cross-origin support for development:
- Allows all origins (`*`) for development
- Supports GET, POST, and OPTIONS methods
- Includes necessary headers for Recurrente integration

### Development Settings
- Runs on HTTP by default to avoid mixed content issues
- Binds to `0.0.0.0:4567` for external access
- Includes commented Content Security Policy for production use

## Testing

### Local Development
1. Start the application: `ruby app.rb`
2. Access: `http://localhost:4567`
3. Monitor console logs for debugging information

### Testing with ngrok
For testing webhook callbacks or external integrations:
```bash
ngrok http 4567
```

## Troubleshooting

### Common Issues
1. **Mixed Content Errors**: The app runs on HTTP by default for development
2. **CORS Issues**: CORS is enabled for all origins in development
3. **Iframe Loading**: Ensure checkout URL is accessible

### Debug Mode
The client-side library includes extensive console logging. Check browser console for detailed information.

## Next Steps

This example demonstrates the frontend integration. For production use:
1. Implement proper error handling and logging
2. Add input validation and sanitization
3. Configure proper CORS settings for your domain
4. Use HTTPS in production
5. Uncomment and configure Content Security Policy

## Support

For issues with this example, check the troubleshooting section above. For Recurrente API questions, refer to their official documentation.
