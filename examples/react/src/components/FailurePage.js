import React from 'react';
import { Link } from 'react-router-dom';

const FailurePage = () => {
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
          color: '#dc3545',
          fontSize: '48px',
          marginBottom: '20px'
        }}>❌</div>
        <h1 style={{
          color: '#dc3545',
          marginBottom: '20px'
        }}>Payment Failed</h1>
        <p style={{
          color: '#666',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>We're sorry, but your payment could not be processed. Please try again or contact support if the problem persists.</p>

        <Link to="/" style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block',
          transition: 'background-color 0.3s'
        }}>Try Again</Link>
      </div>
    </div>
  );
};

export default FailurePage;
