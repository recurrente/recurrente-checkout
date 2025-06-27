# Checkout Recurrente - ASP Classic Integration Example

This directory contains a complete functional example of Recurrente embedded checkout integration using ASP Classic (VBScript).

## Quick Start

1. **Set up IIS:**
   - Install IIS with ASP support
   - Create a virtual directory pointing to this folder
   - Ensure ASP is enabled in IIS

2. **Access the checkout:**
   Open your browser at `http://localhost/your-virtual-directory/default.asp`

## What's Included

- **Main Page** (`default.asp`) - Main checkout interface
- **Success Page** (`success.asp`) - Payment success confirmation
- **Failure Page** (`failure.asp`) - Payment failure handling
- **Client Library** (`recurrente-checkout.js`) - JavaScript integration

## Features Demonstrated

- ✅ Embedded checkout iframe integration
- ✅ Direct checkout URL support
- ✅ Payment success/failure event handling
- ✅ Success page with friendly UI
- ✅ Failure page with error messages
- ✅ ASP Classic VBScript server-side processing
- ✅ Query string parameter handling

## Application Pages

### default.asp
Shows the main checkout page with the embedded Recurrente checkout interface.

### success.asp
Shows the success page after completing payment.

### failure.asp
Shows the failure page when payment processing fails.

## Server-Side Features

### VBScript Processing
- Query string parameter extraction
- HTML encoding for security
- Conditional rendering based on checkout ID

### Security Considerations
- Uses `Server.HTMLEncode()` to prevent XSS
- Proper parameter validation

## Configuration

### IIS Configuration
- ASP Classic must be enabled
- Virtual directory must be configured
- Proper file permissions set

### Development Configuration
- Runs on IIS with ASP Classic support
- Static files served from same directory
- No additional dependencies required

## Testing

### Local Development
1. Configure IIS virtual directory
2. Access: `http://localhost/your-virtual-directory/default.asp`
3. Monitor browser console for debugging information

### Testing with ngrok
To test webhook callbacks or external integrations:
```bash
ngrok http 80
```

## Troubleshooting

### Common Issues
1. **IIS Configuration**: Ensure ASP Classic is enabled
2. **File Permissions**: Check IIS user has read access
3. **Iframe Loading**: Make sure the checkout URL is accessible

### Debug Mode
The client library includes extensive console logging. Check the browser console for detailed information.

## Next Steps

This example demonstrates frontend integration. For production use:
1. Implement proper error handling and logging
2. Add input validation and sanitization
3. Configure appropriate CORS settings for your domain
4. Use HTTPS in production
5. Consider migrating to modern ASP.NET Core

## Support

For issues with this example, check the troubleshooting section above. For questions about the Recurrente API, consult their official documentation.
