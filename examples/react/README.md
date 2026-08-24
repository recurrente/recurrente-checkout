# Ejemplo React

## Ejecutar

Requiere Node.js `^20.19.0` o `>=22.12.0`.

```bash
npm install
npm start
```

Accede a `http://localhost:3000`

## Estructura

- `src/App.jsx` - Aplicación principal con React Router
- `src/components/CheckoutPage.jsx` - Componente de checkout
- `src/components/SuccessPage.jsx` - Página de éxito
- `src/components/FailurePage.jsx` - Página de fallo
- `public/recurrente-checkout.js` - Biblioteca de Recurrente

## Características Específicas

- React Router para navegación
- React hooks (`useEffect`, `useNavigate`, `useSearchParams`)
- Hot reloading en desarrollo
- Vite para desarrollo y compilación
- Script de checkout incluido en `index.html`

## Pruebas con ngrok

```bash
ngrok http 3000
```
