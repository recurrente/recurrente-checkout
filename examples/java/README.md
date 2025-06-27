# Checkout Recurrente - Java Spring Boot Integration Example

This directory contains a complete functional example of Recurrente embedded checkout integration using Spring Boot and Thymeleaf.

## Quick Start

1. **Build the project:**
   ```bash
   mvn clean install
   ```

2. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

3. **Access the checkout:**
   Open your browser at `http://localhost:8080`

## What's Included

- **Spring Boot App** (`CheckoutApplication.java`) - Main application class
- **Home Controller** (`HomeController.java`) - MVC controller with actions
- **Checkout Template** (`templates/index.html`) - Main checkout interface
- **Success Template** (`templates/success.html`) - Payment success confirmation
- **Failure Template** (`templates/failure.html`) - Payment failure handling
- **Client Library** (`static/recurrente-checkout.js`) - JavaScript integration

## Features Demonstrated

- ✅ Embedded checkout iframe integration
- ✅ Direct checkout URL support
- ✅ Payment success/failure event handling
- ✅ Success page with friendly UI
- ✅ Failure page with error messages
- ✅ Spring Boot MVC architecture
- ✅ Thymeleaf templating engine
- ✅ Static resource serving

## Application Routes

### GET /
Shows the main checkout page with the embedded Recurrente checkout interface.

### GET /success
Shows the success page after completing payment.

### GET /failure
Shows the failure page when payment processing fails.

## Controller Structure

### HomeController
- `index()` - Returns the main checkout view
- `success(String checkoutId, Model model)` - Returns success view with checkout ID
- `failure()` - Returns failure view

## Configuration

### Development Configuration
- Runs on `localhost:8080` by default
- Thymeleaf templates in `src/main/resources/templates`
- Static resources in `src/main/resources/static`
- Spring Boot auto-configuration

## Testing

### Local Development
1. Start the application: `mvn spring-boot:run`
2. Access: `http://localhost:8080`
3. Monitor console logs for debugging information

### Testing with ngrok
To test webhook callbacks or external integrations:
```bash
ngrok http 8080
```

## Troubleshooting

### Common Issues
1. **Port Conflicts**: Check if port 8080 is available
2. **Java Version**: Ensure Java 17+ is installed
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
