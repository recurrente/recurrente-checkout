# Checkout Recurrente - Ejemplo de Integración Completa

Este directorio contiene un ejemplo completo funcional de la integración de checkout embebido de Recurrente usando Sinatra (Ruby) y JavaScript vanilla.

## Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   bundle install
   ```

2. **Ejecutar la aplicación:**
   ```bash
   ruby app.rb
   ```

3. **Acceder al checkout:**
   Abre tu navegador en `http://localhost:4567`

## Lo que Incluye

- **Aplicación Sinatra** (`app.rb`) - Servidor web simple con soporte CORS
- **Biblioteca del Cliente** (`public/recurrente-checkout.js`) - Integración JavaScript
- **Página de Checkout** (`views/index.erb`) - Interfaz principal de checkout
- **Página de Éxito** (`views/success.erb`) - Confirmación de pago exitoso
- **Página de Fallo** (`views/failure.erb`) - Manejo de fallo de pago

## Características Demostradas

- ✅ Integración de iframe de checkout embebido
- ✅ Soporte para URL de checkout directa
- ✅ Manejo de eventos de éxito/fallo de pago
- ✅ Página de éxito con UI amigable
- ✅ Página de fallo con mensajes de error
- ✅ Soporte CORS para solicitudes cross-origin

## Rutas de la Aplicación

### GET /
Muestra la página principal de checkout con la interfaz embebida de checkout de Recurrente.

### GET /success
Muestra la página de éxito después de completar el pago.

### GET /failure
Muestra la página de fallo cuando falla el procesamiento del pago.

### OPTIONS *
Maneja solicitudes preflight CORS para acceso cross-origin.

## Configuración

### Variables de Entorno
La aplicación carga dotenv pero no requiere variables de entorno específicas para funcionalidad básica.

### Configuración CORS
La aplicación incluye soporte cross-origin para desarrollo:
- Permite todos los orígenes (`*`) para desarrollo
- Soporta métodos GET, POST y OPTIONS
- Incluye headers necesarios para integración con Recurrente

### Configuración de Desarrollo
- Se ejecuta en HTTP por defecto para evitar problemas de contenido mixto
- Se vincula a `0.0.0.0:4567` para acceso externo
- Incluye Política de Seguridad de Contenido comentada para uso en producción

## Pruebas

### Desarrollo Local
1. Inicia la aplicación: `ruby app.rb`
2. Accede: `http://localhost:4567`
3. Monitorea logs de consola para información de debugging

### Pruebas con ngrok
Para probar callbacks de webhook o integraciones externas:
```bash
ngrok http 4567
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

## Soporte

Para problemas con este ejemplo, revisa la sección de solución de problemas arriba. Para preguntas sobre la API de Recurrente, consulta su documentación oficial.
