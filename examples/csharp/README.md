# Ejemplo C# ASP.NET Core

## Ejecutar

```bash
dotnet restore
dotnet run
```

Accede a `https://localhost:7001` o `http://localhost:5001`

## Estructura

- `Program.cs` - Configuración principal de la aplicación
- `Controllers/HomeController.cs` - Controlador MVC con acciones
- `Views/Home/Index.cshtml` - Vista principal de checkout
- `Views/Home/Success.cshtml` - Vista de éxito
- `Views/Home/Failure.cshtml` - Vista de fallo
- `wwwroot/recurrente-checkout.js` - Biblioteca de Recurrente

## Características Específicas

- Arquitectura ASP.NET Core MVC
- Servicio de archivos estáticos desde `wwwroot`
- HTTPS por defecto (localhost:7001)
- Fallback HTTP disponible (localhost:5001)

## Pruebas con ngrok

```bash
ngrok http 5001
```
