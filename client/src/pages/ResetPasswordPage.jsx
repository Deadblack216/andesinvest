import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  if (!email) {
    return <p>No se proporcionó ningún correo electrónico.</p>;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        alert('Contraseña cambiada con éxito');
        navigate('/login'); // Redirige a la página de inicio de sesión
      } else if (response.status === 404) {
        setError('Usuario no encontrado');
      } else {
        setError('Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cambiar la contraseña');
    }
  };

  return (
    <div style={{ backgroundColor: '#1a202c', color: 'white', height: '100vh' }} className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Restablecer contraseña</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nueva contraseña:</label>
            <input 
              type="password" 
              id="newPassword" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar nueva contraseña:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
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
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
