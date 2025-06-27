# Checkout Recurrente - React Integration Example

This directory contains a complete functional example of Recurrente embedded checkout integration using React and React Router.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Access the checkout:**
   Open your browser at `http://localhost:3000`

## What's Included

- **React App** (`src/App.js`) - Main application with routing
- **Checkout Component** (`src/components/CheckoutPage.js`) - Main checkout interface
- **Success Component** (`src/components/SuccessPage.js`) - Payment success confirmation
- **Failure Component** (`src/components/FailurePage.js`) - Payment failure handling
- **Client Library** (`public/recurrente-checkout.js`) - JavaScript integration

## Features Demonstrated

- ✅ Embedded checkout iframe integration
- ✅ Direct checkout URL support
- ✅ Payment success/failure event handling
- ✅ Success page with friendly UI
- ✅ Failure page with error messages
- ✅ React Router for navigation
- ✅ React hooks for state management

## Application Routes

### GET /
Shows the main checkout page with the embedded Recurrente checkout interface.

### GET /success
Shows the success page after completing payment.

### GET /failure
Shows the failure page when payment processing fails.

## Component Structure

### CheckoutPage
- Uses `useEffect` to initialize Recurrente checkout
- Handles success/failure callbacks
- Uses React Router's `useNavigate` for navigation

### SuccessPage
- Displays payment success message
- Shows checkout ID from URL parameters
- Uses React Router's `useSearchParams` for query parsing

### FailurePage
- Displays payment failure message
- Provides retry option

## Configuration

### Development Configuration
- Runs on `localhost:3000` by default
- Hot reloading enabled for development
- Includes Recurrente checkout script in public/index.html

## Testing

### Local Development
1. Start the application: `npm start`
2. Access: `http://localhost:3000`
3. Monitor console logs for debugging information

### Testing with ngrok
To test webhook callbacks or external integrations:
```bash
ngrok http 3000
```

## Troubleshooting

### Common Issues
1. **Mixed Content Errors**: The app runs on HTTP by default for development
2. **CORS Issues**: CORS is handled by the Recurrente checkout library
3. **Iframe Loading**: Make sure the checkout URL is accessible

### Debug Mode
The client library includes extensive console logging. Check the browser console for detailed information.

## Next Steps

This example demonstrates frontend integration. For production use:
1. Implement proper error handling and logging
2. Add input validation and sanitization
3. Configure appropriate CORS settings for your domain
4. Use HTTPS in production
5. Add proper TypeScript types if using TypeScript

## Support

For issues with this example, check the troubleshooting section above. For questions about the Recurrente API, consult their official documentation.
