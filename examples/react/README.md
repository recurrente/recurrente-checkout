# Checkout Recurrente - Ejemplo de Integración React

Este directorio contiene un ejemplo funcional completo de integración de checkout embebido de Recurrente usando React y React Router.

## Inicio Rápido

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Inicia el servidor de desarrollo:**
   ```bash
   npm start
   ```

3. **Accede al checkout:**
   Abre tu navegador en `http://localhost:3000`

## Lo que Incluye

- **Aplicación React** (`src/App.js`) - Aplicación principal con enrutamiento
- **Componente de Checkout** (`src/components/CheckoutPage.js`) - Interfaz principal de checkout
- **Componente de Éxito** (`src/components/SuccessPage.js`) - Confirmación de pago exitoso
- **Componente de Fallo** (`src/components/FailurePage.js`) - Manejo de fallo de pago
- **Biblioteca del Cliente** (`public/recurrente-checkout.js`) - Integración JavaScript

## Características Demostradas

- ✅ Integración de iframe de checkout embebido
- ✅ Soporte para URL de checkout directa
- ✅ Manejo de eventos de éxito/fallo de pago
- ✅ Manejo de eventos de pago en progreso
- ✅ Página de éxito con UI amigable
- ✅ Página de fallo con mensajes de error
- ✅ React Router para navegación
- ✅ React hooks para manejo de estado

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

## Estructura de Componentes

### CheckoutPage
- Usa `useEffect` para inicializar el checkout de Recurrente
- Maneja callbacks de éxito/fallo
- Usa `useNavigate` de React Router para navegación

### SuccessPage
- Muestra mensaje de éxito de pago
- Muestra ID de checkout desde parámetros de URL
- Usa `useSearchParams` de React Router para parsing de consultas

### FailurePage
- Muestra mensaje de fallo de pago
- Proporciona opción de reintentar

## Configuración

### Configuración de Desarrollo
- Se ejecuta en `localhost:3000` por defecto
- Hot reloading habilitado para desarrollo
- Incluye script de checkout de Recurrente en public/index.html

## Pruebas

### Desarrollo Local
1. Inicia la aplicación: `npm start`
2. Accede: `http://localhost:3000`
3. Monitorea logs de consola para información de debugging

### Pruebas con ngrok
Para probar callbacks de webhook o integraciones externas:
```bash
ngrok http 3000
```

## Solución de Problemas

### Problemas Comunes
1. **Errores de Contenido Mixto**: La app se ejecuta en HTTP por defecto para desarrollo
2. **Problemas CORS**: CORS es manejado por la biblioteca de checkout de Recurrente
3. **Carga de Iframe**: Asegúrate de que la URL de checkout sea accesible

### Modo Debug
La biblioteca del cliente incluye logging extensivo en consola. Revisa la consola del navegador para información detallada.

## Próximos Pasos

Este ejemplo demuestra la integración frontend. Para uso en producción:
1. Implementa manejo apropiado de errores y logging
2. Agrega validación de entrada y sanitización
3. Configura ajustes CORS apropiados para tu dominio
4. Usa HTTPS en producción
5. Agrega tipos TypeScript apropiados si usas TypeScript
6. **Implementa webhooks para manejar confirmaciones de transferencias bancarias**

## Soporte

Para problemas con este ejemplo, revisa la sección de solución de problemas arriba. Para preguntas sobre la API de Recurrente, consulta su documentación oficial.
