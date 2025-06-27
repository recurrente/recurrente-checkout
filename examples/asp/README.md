# Checkout Recurrente - Ejemplo de Integración ASP Classic

Este directorio contiene un ejemplo funcional completo de integración de checkout embebido de Recurrente usando ASP Classic (VBScript).

## Inicio Rápido

1. **Configura IIS:**
   - Instala IIS con soporte ASP
   - Crea un directorio virtual apuntando a esta carpeta
   - Asegúrate de que ASP esté habilitado en IIS

2. **Accede al checkout:**
   Abre tu navegador en `http://localhost/tu-directorio-virtual/default.asp`

## Lo que Incluye

- **Página Principal** (`default.asp`) - Interfaz principal de checkout
- **Página de Éxito** (`success.asp`) - Confirmación de pago exitoso
- **Página de Fallo** (`failure.asp`) - Manejo de fallo de pago
- **Biblioteca del Cliente** (`recurrente-checkout.js`) - Integración JavaScript

## Características Demostradas

- ✅ Integración de iframe de checkout embebido
- ✅ Soporte para URL de checkout directa
- ✅ Manejo de eventos de éxito/fallo de pago
- ✅ Manejo de eventos de pago en progreso
- ✅ Página de éxito con UI amigable
- ✅ Página de fallo con mensajes de error
- ✅ Procesamiento del lado del servidor con VBScript
- ✅ Manejo de parámetros de consulta

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

## Páginas de la Aplicación

### default.asp
Muestra la página principal de checkout con la interfaz embebida de checkout de Recurrente.

### success.asp
Muestra la página de éxito después de completar el pago.

### failure.asp
Muestra la página de fallo cuando falla el procesamiento del pago.

## Características del Lado del Servidor

### Procesamiento VBScript
- Extracción de parámetros de consulta
- Codificación HTML para seguridad
- Renderizado condicional basado en ID de checkout

### Consideraciones de Seguridad
- Usa `Server.HTMLEncode()` para prevenir XSS
- Validación apropiada de parámetros

## Configuración

### Configuración de IIS
- ASP Classic debe estar habilitado
- El directorio virtual debe estar configurado
- Permisos de archivo apropiados establecidos

### Configuración de Desarrollo
- Se ejecuta en IIS con soporte ASP Classic
- Archivos estáticos servidos desde el mismo directorio
- No requiere dependencias adicionales

## Pruebas

### Desarrollo Local
1. Configura directorio virtual de IIS
2. Accede: `http://localhost/tu-directorio-virtual/default.asp`
3. Monitorea consola del navegador para información de debugging

### Pruebas con ngrok
Para probar callbacks de webhook o integraciones externas:
```bash
ngrok http 80
```

## Solución de Problemas

### Problemas Comunes
1. **Configuración de IIS**: Asegúrate de que ASP Classic esté habilitado
2. **Permisos de Archivo**: Verifica que el usuario de IIS tenga acceso de lectura
3. **Carga de Iframe**: Asegúrate de que la URL de checkout sea accesible

### Modo Debug
La biblioteca del cliente incluye logging extensivo en consola. Revisa la consola del navegador para información detallada.

## Próximos Pasos

Este ejemplo demuestra la integración frontend. Para uso en producción:
1. Implementa manejo apropiado de errores y logging
2. Agrega validación de entrada y sanitización
3. Configura ajustes CORS apropiados para tu dominio
4. Usa HTTPS en producción
5. Considera migrar a ASP.NET Core moderno
6. **Implementa webhooks para manejar confirmaciones de transferencias bancarias**

## Soporte

Para problemas con este ejemplo, revisa la sección de solución de problemas arriba. Para preguntas sobre la API de Recurrente, consulta su documentación oficial.
