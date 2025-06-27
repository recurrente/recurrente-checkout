<?php
// Simple PHP server for Recurrente Checkout example
// Run with: php -S localhost:8000

// Set CORS headers for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple routing
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Remove trailing slash
$path = rtrim($path, '/');

// Route handling
switch ($path) {
    case '':
    case '/':
        include 'views/index.php';
        break;
    case '/success':
        include 'views/success.php';
        break;
    case '/failure':
        include 'views/failure.php';
        break;
    default:
        http_response_code(404);
        echo '404 Not Found';
        break;
}
?>
