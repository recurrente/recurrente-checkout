# Checkout Recurrente - C# ASP.NET Core Integration Example

This directory contains a complete functional example of Recurrente embedded checkout integration using ASP.NET Core MVC.

## Quick Start

1. **Restore dependencies:**
   ```bash
   dotnet restore
   ```

2. **Run the application:**
   ```bash
   dotnet run
   ```

3. **Access the checkout:**
   Open your browser at `https://localhost:7001` or `http://localhost:5001`

## What's Included

- **ASP.NET Core App** (`Program.cs`) - Main application configuration
- **Home Controller** (`Controllers/HomeController.cs`) - MVC controller with actions
- **Checkout View** (`Views/Home/Index.cshtml`) - Main checkout interface
- **Success View** (`Views/Home/Success.cshtml`) - Payment success confirmation
- **Failure View** (`Views/Home/Failure.cshtml`) - Payment failure handling
- **Client Library** (`wwwroot/recurrente-checkout.js`) - JavaScript integration

## Features Demonstrated

- ✅ Embedded checkout iframe integration
- ✅ Direct checkout URL support
- ✅ Payment success/failure event handling
- ✅ Success page with friendly UI
- ✅ Failure page with error messages
- ✅ ASP.NET Core MVC architecture
- ✅ Static file serving

## Application Routes

### GET /
Shows the main checkout page with the embedded Recurrente checkout interface.

### GET /Home/Success
Shows the success page after completing payment.

### GET /Home/Failure
Shows the failure page when payment processing fails.

## Controller Structure

### HomeController
- `Index()` - Returns the main checkout view
- `Success(string checkoutId)` - Returns success view with checkout ID
- `Failure()` - Returns failure view

## Configuration

### Development Configuration
- Runs on HTTPS by default (localhost:7001)
- HTTP fallback available (localhost:5001)
- Static files served from wwwroot directory
- MVC routing configured

## Testing

### Local Development
1. Start the application: `dotnet run`
2. Access: `https://localhost:7001`
3. Monitor console logs for debugging information

### Testing with ngrok
To test webhook callbacks or external integrations:
```bash
ngrok http 5001
```

## Troubleshooting

### Common Issues
1. **HTTPS Certificate**: Development certificate may need to be trusted
2. **Port Conflicts**: Check if ports 5001/7001 are available
3. **Iframe Loading**: Make sure the checkout URL is accessible

### Debug Mode
The client library includes extensive console logging. Check the browser console for detailed information.

## Next Steps

This example demonstrates frontend integration. For production use:
1. Implement proper error handling and logging
2. Add input validation and sanitization
3. Configure appropriate CORS settings for your domain
4. Use HTTPS in production
5. Add proper authentication and authorization

## Support

For issues with this example, check the troubleshooting section above. For questions about the Recurrente API, consult their official documentation.
