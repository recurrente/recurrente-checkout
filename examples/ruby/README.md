# Ejemplo Ruby

## Ejecutar

```bash
bundle install
ruby app.rb
```

Accede a `http://localhost:4567`

## Estructura

- `app.rb` - Aplicación Sinatra
- `views/index.erb` - Vista principal de checkout
- `views/success.erb` - Vista de éxito
- `public/recurrente-checkout.js` - Biblioteca de Recurrente

## Características Específicas

- Sinatra framework
- Motor de plantillas ERB
- Servicio de archivos estáticos desde `public/`
- Puerto 4567 por defecto

## Pruebas con ngrok

```bash
ngrok http 4567
```
