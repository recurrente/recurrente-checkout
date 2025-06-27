# Ejemplos de Integración de Checkout Recurrente

Este directorio contiene ejemplos funcionales completos de integración de checkout embebido de Recurrente en múltiples lenguajes de programación y frameworks.

## Ejemplos Disponibles

### 🌐 **PHP** (`php/`)
- **Framework**: PHP vanilla con servidor integrado
- **Puerto**: 8000
- **Ejecutar**: `php -S localhost:8000`
- **Características**: Enrutamiento simple, soporte CORS, servicio de archivos estáticos

### ⚛️ **React** (`react/`)
- **Framework**: React 18 con React Router
- **Puerto**: 3000
- **Ejecutar**: `npm install && npm start`
- **Características**: Arquitectura basada en componentes, enrutamiento del lado del cliente, hooks

### 🔷 **C#** (`csharp/`)
- **Framework**: ASP.NET Core 7.0 MVC
- **Puerto**: 7001 (HTTPS) / 5001 (HTTP)
- **Ejecutar**: `dotnet run`
- **Características**: Patrón MVC, vistas Razor, servicio de archivos estáticos

### ☕ **Java** (`java/`)
- **Framework**: Spring Boot 3.1 con Thymeleaf
- **Puerto**: 8080
- **Ejecutar**: `mvn spring-boot:run`
- **Características**: Spring MVC, motor de plantillas Thymeleaf, auto-configuración

### 🏛️ **ASP Classic** (`asp/`)
- **Framework**: ASP Classic (VBScript) con IIS
- **Puerto**: 80 (IIS por defecto)
- **Ejecutar**: Configurar directorio virtual de IIS
- **Características**: Procesamiento del lado del servidor, manejo de parámetros de consulta

## Inicio Rápido

Elige tu tecnología preferida y sigue estos pasos:

### 1. Selecciona un Ejemplo
Navega al directorio de tu tecnología preferida:
```bash
cd examples/[tecnología]
```

### 2. Sigue las Instrucciones Específicas de la Tecnología
Cada ejemplo tiene su propio README con instrucciones detalladas de configuración.

### 3. Accede al Checkout
Todos los ejemplos proporcionan la misma funcionalidad:
- Interfaz de checkout embebido de Recurrente
- Manejo de páginas de éxito/fallo
- Visualización del ID de checkout
- Manejo de errores

## Características Comunes en Todos los Ejemplos

### ✅ **Funcionalidad Principal**
- Integración de iframe de checkout embebido
- Soporte para URL de checkout directa
- Manejo de eventos de éxito/fallo de pago
- Página de éxito con UI amigable
- Página de fallo con mensajes de error

### ✅ **Manejo de Eventos**
Todos los ejemplos implementan tres eventos principales de pago:

#### `onSuccess`
Se activa cuando el pago se completa exitosamente (tarjetas de crédito/débito):
```javascript
onSuccess: function(paymentData) {
    console.log('¡Pago completado exitosamente!', paymentData.checkoutId);
    // Manejar pago exitoso
}
```

#### `onFailure`
Se activa cuando el pago falla:
```javascript
onFailure: function(data) {
    console.log('El pago falló con el siguiente error:', data.error);
    // Manejar fallo de pago
}
```

#### `onPaymentInProgress`
Se activa cuando el usuario selecciona pago por transferencia bancaria:
```javascript
onPaymentInProgress: function(data) {
    console.log('Pago por transferencia bancaria iniciado:', data);
    // Mostrar instrucciones de transferencia bancaria
    // El pago puede tardar hasta 24 horas en ser acreditado
}
```

**⚠️ Importante**: Para pagos por transferencia bancaria, el evento `onPaymentInProgress` solo indica que el usuario inició el proceso. La confirmación final del pago debe manejarse mediante **webhooks**, ya que la acreditación puede tardar hasta 24 horas.

### ✅ **Características de Seguridad**
- Soporte CORS para solicitudes cross-origin
- Validación y sanitización de entrada
- Medidas de prevención XSS
- Manejo adecuado de errores

### ✅ **Experiencia de Usuario**
- Diseño de UI consistente en todos los ejemplos
- Diseños responsivos
- Mensajería clara de éxito/fallo
- Navegación fácil entre páginas

## Comparación de Tecnologías

| Tecnología | Complejidad de Configuración | Rendimiento | Características Modernas | Listo para Producción |
|------------|-------------------------------|-------------|--------------------------|----------------------|
| PHP        | ⭐⭐☆☆☆                       | ⭐⭐⭐☆☆     | ⭐⭐☆☆☆                  | ⭐⭐⭐☆☆              |
| React      | ⭐⭐⭐⭐☆                      | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐                 | ⭐⭐⭐⭐⭐              |
| C#         | ⭐⭐⭐⭐☆                      | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐                 | ⭐⭐⭐⭐⭐              |
| Java       | ⭐⭐⭐⭐☆                      | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐☆                 | ⭐⭐⭐⭐⭐              |
| ASP Classic| ⭐⭐☆☆☆                       | ⭐⭐☆☆☆     | ⭐☆☆☆☆                  | ⭐⭐☆☆☆              |

## Flujo de Desarrollo

### 1. **Desarrollo Local**
Todos los ejemplos están configurados para desarrollo local con recarga automática donde sea aplicable.

### 2. **Pruebas con ngrok**
Para probar callbacks de webhook o integraciones externas:
```bash
# Para la tecnología que estés usando
ngrok http [puerto]
```

### 3. **Depuración**
- Revisa la consola del navegador para logs del lado del cliente
- Monitorea logs del servidor para problemas del backend
- Usa las herramientas de desarrollador del navegador para inspección de red

## Consideraciones para Producción

### 🔒 **Seguridad**
- Implementa autenticación y autorización apropiadas
- Usa HTTPS en producción
- Configura ajustes CORS apropiados para tu dominio
- Agrega validación y sanitización de entrada

### 📊 **Monitoreo**
- Agrega logging y seguimiento de errores apropiados
- Implementa verificaciones de salud
- Monitorea tasas de éxito/fallo de pagos

### 🚀 **Rendimiento**
- Optimiza la entrega de activos estáticos
- Implementa estrategias de caché
- Considera CDN para distribución global

### 🔄 **Webhooks para Transferencias Bancarias**
Para pagos por transferencia bancaria, implementa webhooks para recibir notificaciones cuando el pago sea acreditado:
- Configura endpoints para recibir webhooks de Recurrente
- Maneja el estado de pagos pendientes
- Actualiza tu base de datos cuando se confirme el pago

## Soporte y Documentación

### 📚 **Documentación Específica de Tecnología**
Cada ejemplo incluye:
- README detallado con instrucciones de configuración
- Guías de solución de problemas
- Opciones de configuración
- Próximos pasos para producción

### 🔗 **Recursos Externos**
- [Documentación de la API de Recurrente](https://docs.recurrente.com)
- [Documentación específica de tecnología](#)

### 🐛 **Solución de Problemas**
Problemas comunes en todos los ejemplos:
1. **Errores de Contenido Mixto**: Usa HTTPS en producción
2. **Problemas CORS**: Configura orígenes apropiados
3. **Carga de Iframe**: Asegúrate de que la URL de checkout sea accesible

## Contribución

Para agregar un nuevo ejemplo de tecnología:
1. Crea un nuevo directorio con el nombre de la tecnología
2. Implementa la funcionalidad principal de checkout
3. Incluye manejo de páginas de éxito/fallo
4. Agrega README completo
5. Prueba con la URL de checkout proporcionada

## Licencia

Estos ejemplos se proporcionan tal como están para fines educativos y de integración. Por favor consulta los términos de servicio de Recurrente para uso en producción.
