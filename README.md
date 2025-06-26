# Plugin de Checkout Recurrente - Guía de Integración

Esta guía explica cómo integrar la biblioteca de checkout de Recurrente en tus propios proyectos.

## Instalación

### NPM (Recomendado)

```bash
npm install recurrente-checkout
```

### CDN

#### Unpkg
```html
<script src="https://unpkg.com/recurrente-checkout@latest/recurrente-checkout.js"></script>
```

#### jsDelivr
```html
<script src="https://cdn.jsdelivr.net/npm/recurrente-checkout@latest/recurrente-checkout.js"></script>
```

## Uso

### ES6 Modules (Recomendado)

```javascript
import RecurrenteCheckout from 'recurrente-checkout';

RecurrenteCheckout.load({
  url: "https://app.recurrente.com/checkout-session/ch_1234",
  onSuccess: function(paymentData) {
    console.log('Pago exitoso:', paymentData);
    // Manejar pago exitoso
    // ej., redirigir a página de éxito, actualizar UI, etc.
  },
  onFailure: function(error) {
    console.log('Pago fallido:', error);
    // Manejar pago fallido
    // ej., mostrar mensaje de error, opción de reintentar, etc.
  }
});
```

### Importación Nominal

```javascript
import { loadRecurrenteCheckout } from 'recurrente-checkout';

loadRecurrenteCheckout({
  url: "https://app.recurrente.com/checkout-session/ch_1234",
  onSuccess: function(paymentData) {
    console.log('Pago exitoso:', paymentData);
  },
  onFailure: function(error) {
    console.log('Pago fallido:', error);
  }
});
```

### CommonJS

```javascript
const RecurrenteCheckout = require('recurrente-checkout');

RecurrenteCheckout.load({
  url: "https://app.recurrente.com/checkout-session/ch_1234",
  onSuccess: function(paymentData) {
    console.log('Pago exitoso:', paymentData);
  },
  onFailure: function(error) {
    console.log('Pago fallido:', error);
  }
});
```

### Navegador (Global)

```html
<script src="https://unpkg.com/recurrente-checkout@latest/recurrente-checkout.js"></script>
<script>
  RecurrenteCheckout.load({
    url: "https://app.recurrente.com/s/your-checkout-url",
    onSuccess: function(paymentData) {
      console.log('Pago exitoso:', paymentData);
    },
    onFailure: function(error) {
      console.log('Pago fallido:', error);
    }
  });
</script>
```

## Integración Rápida

### 1. Incluir la Biblioteca JavaScript

Elige uno de los métodos de instalación anteriores.

### 2. Inicializar el Checkout

Elige uno de los dos métodos de integración:

#### Método A: URL de Checkout Directa

```javascript
RecurrenteCheckout.load({
  url: "https://app.recurrente.com/s/your-checkout-url",
  onSuccess: function(paymentData) {
    console.log('Pago exitoso:', paymentData);
    // Manejar pago exitoso
    // ej., redirigir a página de éxito, actualizar UI, etc.
  },
  onFailure: function(error) {
    console.log('Pago fallido:', error);
    // Manejar pago fallido
    // ej., mostrar mensaje de error, opción de reintentar, etc.
  }
});
```

#### Método B: URL de Producto

También puedes usar una URL de producto con el formato `https://app.recurrente.com/s/{organization}/{product-slug}`:

```javascript
RecurrenteCheckout.load({
  url: "https://app.recurrente.com/s/mi-cuenta/mi-producto",
  onSuccess: function(paymentData) {
    console.log('Pago exitoso:', paymentData);
    // Manejar pago exitoso
    // ej., redirigir a página de éxito, actualizar UI, etc.
  },
  onFailure: function(error) {
    console.log('Pago fallido:', error);
    // Manejar pago fallido
    // ej., mostrar mensaje de error, opción de reintentar, etc.
  }
});
```

**Nota**: Reemplaza `mi-cuenta` con tu slug de organización y `mi-producto` con tu slug de producto.

## Solución de Problemas

### Problemas Comunes

1. **Iframe no carga**: Verifica que la URL de checkout sea accesible
2. **Errores CORS**: Asegúrate de que tu backend permita solicitudes desde tu dominio frontend
3. **Errores de API**: Verifica tus claves de API de Recurrente y permisos
4. **Contenido mixto**: Usa HTTPS tanto para frontend como backend en producción

### Modo Debug

La biblioteca incluye logging en consola. Revisa la consola del navegador para información detallada sobre el proceso de checkout.

## Ejemplo Completo

Consulta el directorio `example/` para una implementación completa funcional usando Sinatra (Ruby).

## Soporte

- Para preguntas de integración: Revisa esta guía y la implementación de ejemplo
- Para problemas de API de Recurrente: Contacta al soporte de Recurrente
- Para preguntas generales: Consulta la documentación oficial de Recurrente
