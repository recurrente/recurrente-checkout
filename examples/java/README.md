# Checkout Recurrente - Ejemplo de Integración Java Spring Boot

Este directorio contiene un ejemplo funcional completo de integración de checkout embebido de Recurrente usando Spring Boot y Thymeleaf.

## Inicio Rápido

1. **Construye el proyecto:**
   ```bash
   mvn clean install
   ```

2. **Ejecuta la aplicación:**
   ```bash
   mvn spring-boot:run
   ```

3. **Accede al checkout:**
   Abre tu navegador en `http://localhost:8080`

## Lo que Incluye

- **Aplicación Spring Boot** (`CheckoutApplication.java`) - Clase principal de la aplicación
- **Controlador Home** (`HomeController.java`) - Controlador MVC con acciones
- **Plantilla de Checkout** (`templates/index.html`) - Interfaz principal de checkout
- **Plantilla de Éxito** (`templates/success.html`) - Confirmación de pago exitoso
- **Plantilla de Fallo** (`templates/failure.html`) - Manejo de fallo de pago
- **Biblioteca del Cliente** (`static/recurrente-checkout.js`) - Integración JavaScript

## Características Demostradas

- ✅ Integración de iframe de checkout embebido
- ✅ Soporte para URL de checkout directa
- ✅ Manejo de eventos de éxito/fallo de pago
- ✅ Manejo de eventos de pago en progreso
- ✅ Página de éxito con UI amigable
- ✅ Página de fallo con mensajes de error
- ✅ Arquitectura Spring Boot MVC
- ✅ Motor de plantillas Thymeleaf
- ✅ Servicio de recursos estáticos

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

### GET /success
Muestra la página de éxito después de completar el pago.

### GET /failure
Muestra la página de fallo cuando falla el procesamiento del pago.

## Estructura del Controlador

### HomeController
- `index()` - Retorna la vista principal de checkout
- `success(String checkoutId, Model model)` - Retorna vista de éxito con ID de checkout
- `failure()` - Retorna vista de fallo

## Configuración

### Configuración de Desarrollo
- Se ejecuta en `localhost:8080` por defecto
- Plantillas Thymeleaf en `src/main/resources/templates`
- Recursos estáticos en `src/main/resources/static`
- Auto-configuración de Spring Boot

## Pruebas

### Desarrollo Local
1. Inicia la aplicación: `mvn spring-boot:run`
2. Accede: `http://localhost:8080`
3. Monitorea logs de consola para información de debugging

### Pruebas con ngrok
Para probar callbacks de webhook o integraciones externas:
```bash
ngrok http 8080
```

## Solución de Problemas

### Problemas Comunes
1. **Conflictos de Puerto**: Verifica si el puerto 8080 está disponible
2. **Versión de Java**: Asegúrate de que Java 17+ esté instalado
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
