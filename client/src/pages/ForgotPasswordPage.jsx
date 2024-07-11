import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/forgot-password', { // Cambiar a 4000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        navigate('/verify-code', { state: { email } });
      } else if (response.status === 404) {
        setError('Correo no encontrado');
      } else {
        setError('Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al enviar el correo');
    }
  };

  return (
    <div style={{ backgroundColor: '#1a202c', color: 'white', height: '100vh' }} className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Recuperar contraseña</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmitEmail}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{
                color: 'black',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.375rem',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '1rem'
              }}
            />
          </div>
          <button type="submit" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            width: '100%',
            border: 'none',
            cursor: 'pointer'
          }}>
            Enviar código de verificación
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
