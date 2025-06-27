# Ejemplo PHP

## Ejecutar

```bash
php -S localhost:8000
```

Accede a `http://localhost:8000`

## Estructura

- `index.php` - Servidor con CORS habilitado
- `views/` - Páginas de checkout, éxito y fallo
- `public/recurrente-checkout.js` - Biblioteca de Recurrente

## Configuración Específica

- HTTP en desarrollo (evita contenido mixto)
- CORS habilitado para todos los orígenes
- Política de Seguridad de Contenido comentada

## Pruebas con ngrok

```bash
ngrok http 8000
```
