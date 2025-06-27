# Ejemplo React

## Ejecutar

```bash
npm install
npm start
```

Accede a `http://localhost:3000`

## Estructura

- `src/App.js` - Aplicación principal con React Router
- `src/components/CheckoutPage.js` - Componente de checkout
- `src/components/SuccessPage.js` - Página de éxito
- `src/components/FailurePage.js` - Página de fallo
- `public/recurrente-checkout.js` - Biblioteca de Recurrente

## Características Específicas

- React Router para navegación
- React hooks (`useEffect`, `useNavigate`, `useSearchParams`)
- Hot reloading en desarrollo
- Script de checkout incluido en `public/index.html`

## Pruebas con ngrok

```bash
ngrok http 3000
```
