# Checkout Recurrente - Ejemplo de Integración C# ASP.NET Core

Este directorio contiene un ejemplo funcional completo de integración de checkout embebido de Recurrente usando ASP.NET Core MVC.

## Inicio Rápido

1. **Restaura las dependencias:**
   ```bash
   dotnet restore
   ```

2. **Ejecuta la aplicación:**
   ```bash
   dotnet run
   ```

3. **Accede al checkout:**
   Abre tu navegador en `https://localhost:7001` o `http://localhost:5001`

## Lo que Incluye

- **Aplicación ASP.NET Core** (`Program.cs`) - Configuración principal de la aplicación
- **Controlador Home** (`Controllers/HomeController.cs`) - Controlador MVC con acciones
- **Vista de Checkout** (`Views/Home/Index.cshtml`) - Interfaz principal de checkout
- **Vista de Éxito** (`Views/Home/Success.cshtml`) - Confirmación de pago exitoso
- **Vista de Fallo** (`Views/Home/Failure.cshtml`) - Manejo de fallo de pago
- **Biblioteca del Cliente** (`wwwroot/recurrente-checkout.js`) - Integración JavaScript

## Características Demostradas

- ✅ Integración de iframe de checkout embebido
- ✅ Soporte para URL de checkout directa
- ✅ Manejo de eventos de éxito/fallo de pago
- ✅ Manejo de eventos de pago en progreso
- ✅ Página de éxito con UI amigable
- ✅ Página de fallo con mensajes de error
- ✅ Arquitectura ASP.NET Core MVC
- ✅ Servicio de archivos estáticos

## Manejo de Eventos

El ejemplo implementa tres eventos principales de pago:

### `onSuccess`
Se activa cuando el pago se completa exitosamente (tarjetas de crédito/débito):
```javascript
onSuccess: function(paymentData) {
    console.log('¡Pago completado exitosamente!', paymentData.checkoutId);
    // Manejar pago exitoso
}
```

### `onFailure`
Se activa cuando el pago falla:
```javascript
onFailure: function(data) {
    console.log('El pago falló con el siguiente error:', data.error);
    // Manejar fallo de pago
}
```

### `onPaymentInProgress`
Se activa cuando el usuario selecciona pago por transferencia bancaria:
```javascript
onPaymentInProgress: function(data) {
    console.log('Pago por transferencia bancaria iniciado:', data);
    // Mostrar instrucciones de transferencia bancaria
    // El pago puede tardar hasta 24 horas en ser acreditado
}
```

**⚠️ Importante**: Para pagos por transferencia bancaria, el evento `onPaymentInProgress` solo indica que el usuario inició el proceso. La confirmación final del pago debe manejarse mediante **webhooks**, ya que la acreditación puede tardar hasta 24 horas.

## Rutas de la Aplicación

### GET /
Muestra la página principal de checkout con la interfaz embebida de checkout de Recurrente.

### GET /Home/Success
Muestra la página de éxito después de completar el pago.

### GET /Home/Failure
Muestra la página de fallo cuando falla el procesamiento del pago.

## Estructura del Controlador

### HomeController
- `Index()` - Retorna la vista principal de checkout
- `Success(string checkoutId)` - Retorna vista de éxito con ID de checkout
- `Failure()` - Retorna vista de fallo

## Configuración

### Configuración de Desarrollo
- Se ejecuta en HTTPS por defecto (localhost:7001)
- Fallback HTTP disponible (localhost:5001)
- Archivos estáticos servidos desde directorio wwwroot
- Enrutamiento MVC configurado

## Pruebas

### Desarrollo Local
1. Inicia la aplicación: `dotnet run`
2. Accede: `https://localhost:7001`
3. Monitorea logs de consola para información de debugging

### Pruebas con ngrok
Para probar callbacks de webhook o integraciones externas:
```bash
ngrok http 5001
```

## Solución de Problemas

### Problemas Comunes
1. **Certificado HTTPS**: El certificado de desarrollo puede necesitar ser confiado
2. **Conflictos de Puerto**: Verifica si los puertos 5001/7001 están disponibles
3. **Carga de Iframe**: Asegúrate de que la URL de checkout sea accesible

### Modo Debug
La biblioteca del cliente incluye logging extensivo en consola. Revisa la consola del navegador para información detallada.

## Próximos Pasos

Este ejemplo demuestra la integración frontend. Para uso en producción:
1. Implementa manejo apropiado de errores y logging
2. Agrega validación de entrada y sanitización
3. Configura ajustes CORS apropiados para tu dominio
4. Usa HTTPS en producción
5. Agrega autenticación y autorización apropiadas
6. **Implementa webhooks para manejar confirmaciones de transferencias bancarias**

## Soporte

Para problemas con este ejemplo, revisa la sección de solución de problemas arriba. Para preguntas sobre la API de Recurrente, consulta su documentación oficial.
