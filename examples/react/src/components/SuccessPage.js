import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const checkoutId = searchParams.get('checkoutId');

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          color: '#28a745',
          fontSize: '48px',
          marginBottom: '20px'
        }}>✅</div>
        <h1 style={{
          color: '#28a745',
          marginBottom: '20px'
        }}>Payment Successful!</h1>
        <p style={{
          color: '#666',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>Thank you for your purchase. Your payment has been processed successfully.</p>

        {checkoutId && (
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '5px',
            padding: '15px',
            margin: '20px 0',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#495057'
          }}>
            <strong>Checkout ID:</strong> {checkoutId}
          </div>
        )}

        <p style={{
          color: '#666',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>You will receive a confirmation email shortly with your order details.</p>

        <Link to="/" style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block',
          transition: 'background-color 0.3s'
        }}>Return to Home</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
