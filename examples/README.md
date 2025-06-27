# Ejemplos de Integración

Este directorio contiene ejemplos funcionales de integración de checkout embebido de Recurrente.

## Información Completa

Para información detallada sobre todos los ejemplos, consulta la sección **"Ejemplo Completo"** en el [README principal](../README.md).

## Ejemplos Disponibles

- [PHP](php/) - PHP vanilla con servidor integrado
- [React](react/) - React 18 con React Router
- [C#](csharp/) - ASP.NET Core 7.0 MVC
- [Java](java/) - Spring Boot 3.1 con Thymeleaf
- [ASP Classic](asp/) - ASP Classic con IIS

Cada ejemplo incluye su propio README con instrucciones específicas de configuración.

## Inicio Rápido

1. Navega al directorio de tu tecnología preferida: `cd examples/[tecnología]`
2. Sigue las instrucciones específicas del README de cada ejemplo
3. Accede a la aplicación en el puerto correspondiente

## Características Comunes

Todos los ejemplos implementan:
- Integración de iframe de checkout embebido
- Manejo de eventos `onSuccess`, `onFailure` y `onPaymentInProgress`
- Páginas de éxito y fallo
- UI responsiva y amigable

## Consideraciones para Producción

- Implementa autenticación y autorización apropiadas
- Usa HTTPS en producción
- Configura webhooks para transferencias bancarias
- Agrega logging y monitoreo de errores

## Soporte

- Para preguntas de integración: Revisa el README principal
- Para problemas específicos de cada tecnología: Consulta el README del ejemplo correspondiente
- Para dudas generales: Únete a nuestro [Discord](https://discord.gg/QhKPEkSKp2)
