# Checkout Recurrente - Guía de Integración

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

**Antes de comenzar**: Para usar esta biblioteca, necesitas crear un checkout en Recurrente. Consulta la [documentación de creación de checkouts](https://docs.recurrente.com) para obtener tu URL de checkout.

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
  },
  onPaymentInProgress: function() {
    console.log('Pago con transferencia bancaria en proceso');
    // Este callback se ejecuta solo para transferencias bancarias
    // El pago puede tomar hasta 24 horas en procesarse
    // ej., mostrar mensaje informativo, enviar email de confirmación, etc.
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
  },
  onPaymentInProgress: function() {
    console.log('Pago con transferencia bancaria en proceso');
    // Solo para transferencias bancarias (puede tomar hasta 24h)
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
  },
  onPaymentInProgress: function() {
    console.log('Pago con transferencia bancaria en proceso');
    // Solo para transferencias bancarias (puede tomar hasta 24h)
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
    },
    onPaymentInProgress: function() {
      console.log('Pago con transferencia bancaria en proceso');
      // Solo para transferencias bancarias (puede tomar hasta 24h)
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
  url: "https://app.recurrente.com/checkout-session/ch_1234",
  onSuccess: function(paymentData) {
    console.log('Pago exitoso:', paymentData.checkoutId);
    // Manejar pago exitoso
    // ej., redirigir a página de éxito, actualizar UI, etc.
  },
  onFailure: function(data) {
    console.log('Pago fallido:', data.error);
    // Manejar pago fallido
    // ej., mostrar mensaje de error, opción de reintentar, etc.
  },
  onPaymentInProgress: function() {
    console.log('Pago con transferencia bancaria en proceso');
    // Este callback se ejecuta solo para transferencias bancarias
    // El pago puede tomar hasta 24 horas en procesarse
    // ej., mostrar mensaje informativo, enviar email de confirmación, etc.
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
  },
  onPaymentInProgress: function() {
    console.log('Pago con transferencia bancaria en proceso');
    // Este callback se ejecuta solo para transferencias bancarias
    // El pago puede tomar hasta 24 horas en procesarse
    // ej., mostrar mensaje informativo, enviar email de confirmación, etc.
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

Consulta el directorio `examples/` para ejemplos de implementaciones completas.

### Ejemplos Disponibles

#### 🌐 **PHP** (`examples/php/`)
- **Framework**: PHP vanilla con servidor integrado
- **Puerto**: 8000
- **Ejecutar**: `php -S localhost:8000`
- **Estructura**: Servidor web simple con soporte CORS, páginas de éxito/fallo

#### ⚛️ **React** (`examples/react/`)
- **Framework**: React 18 con React Router
- **Puerto**: 3000
- **Ejecutar**: `npm install && npm start`
- **Estructura**: Arquitectura basada en componentes, enrutamiento del lado del cliente

#### 🔷 **C#** (`examples/csharp/`)
- **Framework**: ASP.NET Core 7.0 MVC
- **Puerto**: 7001 (HTTPS) / 5001 (HTTP)
- **Ejecutar**: `dotnet run`
- **Estructura**: Patrón MVC, vistas Razor, servicio de archivos estáticos

#### ☕ **Java** (`examples/java/`)
- **Framework**: Spring Boot 3.1 con Thymeleaf
- **Puerto**: 8080
- **Ejecutar**: `mvn spring-boot:run`
- **Estructura**: Spring MVC, motor de plantillas Thymeleaf, auto-configuración

#### 🏛️ **ASP Classic** (`examples/asp/`)
- **Framework**: ASP Classic (VBScript) con IIS
- **Puerto**: 80 (IIS por defecto)
- **Ejecutar**: Configurar directorio virtual de IIS
- **Estructura**: Procesamiento del lado del servidor, manejo de parámetros de consulta

### Inicio Rápido con Ejemplos

1. Navega al directorio de tu tecnología preferida: `cd examples/[tecnología]`
2. Sigue las instrucciones específicas del README de cada ejemplo
3. Accede a la aplicación en el puerto correspondiente

### Consideraciones para Producción

- Usa HTTPS en producción
- Configura webhooks para transferencias bancarias

## Soporte

- Para crear checkouts: Consulta la [documentación de creación de checkouts](https://docs.recurrente.com)
- Para preguntas de integración: Revisa esta guía y las implementaciones de ejemplo
- Si te quedan más dudas o tienes problemas, únete a nuestro [Discord](https://discord.gg/QhKPEkSKp2)
