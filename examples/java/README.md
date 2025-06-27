# Ejemplo Java Spring Boot

## Ejecutar

```bash
mvn spring-boot:run
```

Accede a `http://localhost:8080`

## Estructura

- `CheckoutApplication.java` - Clase principal de Spring Boot
- `controller/HomeController.java` - Controlador MVC
- `templates/index.html` - Vista principal de checkout
- `templates/success.html` - Vista de éxito
- `templates/failure.html` - Vista de fallo
- `static/recurrente-checkout.js` - Biblioteca de Recurrente

## Características Específicas

- Spring Boot 3.1 con Thymeleaf
- Motor de plantillas Thymeleaf
- Auto-configuración de Spring Boot
- Servicio de archivos estáticos desde `static/`

## Pruebas con ngrok

```bash
ngrok http 8080
```
