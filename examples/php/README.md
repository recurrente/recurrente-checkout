# Checkout Recurrente - Ejemplo de Integración PHP

Este directorio contiene un ejemplo funcional completo de integración de checkout embebido de Recurrente usando PHP y JavaScript vanilla.

## Inicio Rápido

1. **Inicia el servidor PHP:**
   ```bash
   php -S localhost:8000
   ```

2. **Accede al checkout:**
   Abre tu navegador en `http://localhost:8000`

## Lo que Incluye

- **Servidor PHP** (`index.php`) - Servidor web simple con soporte CORS
- **Biblioteca del Cliente** (`public/recurrente-checkout.js`) - Integración JavaScript
- **Página de Checkout** (`views/index.php`) - Interfaz principal de checkout
- **Página de Éxito** (`views/success.php`) - Confirmación de pago exitoso
- **Página de Fallo** (`views/failure.php`) - Manejo de fallo de pago

## Características Demostradas

- ✅ Integración de iframe de checkout embebido
- ✅ Soporte para URL de checkout directa
- ✅ Manejo de eventos de éxito/fallo de pago
- ✅ Manejo de eventos de pago en progreso
- ✅ Página de éxito con UI amigable
- ✅ Página de fallo con mensajes de error
- ✅ Soporte CORS para solicitudes cross-origin

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

## Configuración

### Soporte CORS
La aplicación incluye soporte cross-origin para desarrollo:
- Permite todos los orígenes (`*`) para desarrollo
- Soporta métodos GET, POST y OPTIONS
- Incluye headers necesarios para integración con Recurrente

### Configuración de Desarrollo
- Se ejecuta en HTTP por defecto para evitar problemas de contenido mixto
- Se vincula a `localhost:8000` para acceso externo
- Incluye Política de Seguridad de Contenido comentada para uso en producción

## Pruebas

### Desarrollo Local
1. Inicia la aplicación: `php -S localhost:8000`
2. Accede: `http://localhost:8000`
3. Monitorea logs de consola para información de debugging

### Pruebas con ngrok
Para probar callbacks de webhook o integraciones externas:
```bash
ngrok http 8000
```

## Solución de Problemas

### Problemas Comunes
1. **Errores de Contenido Mixto**: La app se ejecuta en HTTP por defecto para desarrollo
2. **Problemas CORS**: CORS está habilitado para todos los orígenes en desarrollo
3. **Carga de Iframe**: Asegúrate de que la URL de checkout sea accesible

### Modo Debug
La biblioteca del cliente incluye logging extensivo en consola. Revisa la consola del navegador para información detallada.

## Próximos Pasos

Este ejemplo demuestra la integración frontend. Para uso en producción:
1. Implementa manejo apropiado de errores y logging
2. Agrega validación de entrada y sanitización
3. Configura ajustes CORS apropiados para tu dominio
4. Usa HTTPS en producción
5. Descomenta y configura la Política de Seguridad de Contenido
6. **Implementa webhooks para manejar confirmaciones de transferencias bancarias**

## Soporte

Para problemas con este ejemplo, revisa la sección de solución de problemas arriba. Para preguntas sobre la API de Recurrente, consulta su documentación oficial.
