# Recurrente Checkout Integration Examples

This directory contains complete functional examples of Recurrente embedded checkout integration across multiple programming languages and frameworks.

## Available Examples

### 🌐 **PHP** (`php/`)
- **Framework**: Vanilla PHP with built-in server
- **Port**: 8000
- **Run**: `php -S localhost:8000`
- **Features**: Simple routing, CORS support, static file serving

### ⚛️ **React** (`react/`)
- **Framework**: React 18 with React Router
- **Port**: 3000
- **Run**: `npm install && npm start`
- **Features**: Component-based architecture, client-side routing, hooks

### 🔷 **C#** (`csharp/`)
- **Framework**: ASP.NET Core 7.0 MVC
- **Port**: 7001 (HTTPS) / 5001 (HTTP)
- **Run**: `dotnet run`
- **Features**: MVC pattern, Razor views, static file serving

### ☕ **Java** (`java/`)
- **Framework**: Spring Boot 3.1 with Thymeleaf
- **Port**: 8080
- **Run**: `mvn spring-boot:run`
- **Features**: Spring MVC, Thymeleaf templating, auto-configuration

### 🏛️ **ASP Classic** (`asp/`)
- **Framework**: ASP Classic (VBScript) with IIS
- **Port**: 80 (IIS default)
- **Run**: Configure IIS virtual directory
- **Features**: Server-side processing, query string handling

## Quick Start

Choose your preferred technology and follow these steps:

### 1. Select an Example
Navigate to the directory of your preferred technology:
```bash
cd examples/[technology]
```

### 2. Follow Technology-Specific Instructions
Each example has its own README with detailed setup instructions.

### 3. Access the Checkout
All examples provide the same functionality:
- Embedded Recurrente checkout interface
- Success/failure page handling
- Checkout ID display
- Error handling

## Common Features Across All Examples

### ✅ **Core Functionality**
- Embedded checkout iframe integration
- Direct checkout URL support
- Payment success/failure event handling
- Success page with friendly UI
- Failure page with error messages

### ✅ **Security Features**
- CORS support for cross-origin requests
- Input validation and sanitization
- XSS prevention measures
- Proper error handling

### ✅ **User Experience**
- Consistent UI design across all examples
- Responsive layouts
- Clear success/failure messaging
- Easy navigation between pages

## Technology Comparison

| Technology | Setup Complexity | Performance | Modern Features | Production Ready |
|------------|------------------|-------------|-----------------|------------------|
| PHP        | ⭐⭐☆☆☆         | ⭐⭐⭐☆☆     | ⭐⭐☆☆☆         | ⭐⭐⭐☆☆         |
| React      | ⭐⭐⭐⭐☆        | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐        | ⭐⭐⭐⭐⭐         |
| C#         | ⭐⭐⭐⭐☆        | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐        | ⭐⭐⭐⭐⭐         |
| Java       | ⭐⭐⭐⭐☆        | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐☆        | ⭐⭐⭐⭐⭐         |
| ASP Classic| ⭐⭐☆☆☆         | ⭐⭐☆☆☆     | ⭐☆☆☆☆         | ⭐⭐☆☆☆         |

## Development Workflow

### 1. **Local Development**
All examples are configured for local development with hot reloading where applicable.

### 2. **Testing with ngrok**
For testing webhook callbacks or external integrations:
```bash
# For the technology you're using
ngrok http [port]
```

### 3. **Debugging**
- Check browser console for client-side logs
- Monitor server logs for backend issues
- Use browser developer tools for network inspection

## Production Considerations

### 🔒 **Security**
- Implement proper authentication and authorization
- Use HTTPS in production
- Configure appropriate CORS settings
- Add input validation and sanitization

### 📊 **Monitoring**
- Add proper logging and error tracking
- Implement health checks
- Monitor payment success/failure rates

### 🚀 **Performance**
- Optimize static asset delivery
- Implement caching strategies
- Consider CDN for global distribution

## Support and Documentation

### 📚 **Technology-Specific Docs**
Each example includes:
- Detailed README with setup instructions
- Troubleshooting guides
- Configuration options
- Next steps for production

### 🔗 **External Resources**
- [Recurrente API Documentation](https://docs.recurrente.com)
- [Technology-specific documentation](#)

### 🐛 **Troubleshooting**
Common issues across all examples:
1. **Mixed Content Errors**: Use HTTPS in production
2. **CORS Issues**: Configure appropriate origins
3. **Iframe Loading**: Ensure checkout URL accessibility

## Contributing

To add a new technology example:
1. Create a new directory with the technology name
2. Implement the core checkout functionality
3. Include success/failure page handling
4. Add comprehensive README
5. Test with the provided checkout URL

## License

These examples are provided as-is for educational and integration purposes. Please refer to the Recurrente terms of service for production use.
