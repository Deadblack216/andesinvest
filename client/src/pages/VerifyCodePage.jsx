import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyCodePage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email, userData, isRegister } = location.state;

  if (!email) {
    return <p>No se proporcionó ningún correo electrónico.</p>;
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode, userData }),
      });

      if (response.ok) {
        if (isRegister) {
          navigate('/register-success'); // Redirige a la página de éxito de registro
        } else {
          navigate('/reset-password', { state: { email } }); // Redirige a la página de cambio de contraseña
        }
      } else if (response.status === 400) {
        setError('Código de verificación incorrecto o expirado');
      } else if (response.status === 404) {
        setError('Usuario no encontrado');
      } else {
        setError('Error al verificar el código');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al verificar el código');
    }
  };

  return (
    <div style={{ backgroundColor: '#1a202c', color: 'white', height: '100vh' }} className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Verificar código</h2>
        <p style={{ color: 'black' }}>Se ha enviado un código de verificación al correo electrónico {email}</p>
        <br /> {/* Salto de línea agregado */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleVerifyCode}>
          <div className="mb-4">
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">Código de verificación:</label>
            <input 
              type="text" 
              id="verificationCode" 
              value={verificationCode} 
              onChange={(e) => setVerificationCode(e.target.value)} 
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
            Verificar código
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCodePage;
