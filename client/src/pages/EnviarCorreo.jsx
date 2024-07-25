import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext'; // Asegúrate de importar tu contexto de autenticación

const EnviarCorreo = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [subject, setSubject] = useState('Errores en cuentas'); // Valor por defecto
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [complaintsCount, setComplaintsCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const storedDate = localStorage.getItem('complaintDate');
    const storedCount = localStorage.getItem('complaintsCount');
    const storedTimeLeft = localStorage.getItem('timeLeft');

    if (storedDate === today && storedCount) {
      setComplaintsCount(parseInt(storedCount));
      if (storedTimeLeft) {
        const remainingTime = parseInt(storedTimeLeft) - (Date.now() - parseInt(localStorage.getItem('startTime')));
        if (remainingTime > 0) {
          setIsDisabled(true);
          setTimeLeft(Math.ceil(remainingTime / 1000));
        }
      }
    } else {
      localStorage.setItem('complaintDate', today);
      localStorage.setItem('complaintsCount', 0);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isDisabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsDisabled(false);
            localStorage.removeItem('timeLeft');
            localStorage.removeItem('startTime');
            return 0;
          }
          localStorage.setItem('timeLeft', prevTime - 1);
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isDisabled, timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (complaintsCount >= 3) {
      setError('Has alcanzado el máximo de 3 quejas por hoy.');
      return;
    }

    setIsLoading(true);
    setIsDisabled(true);
    const startTime = Date.now();
    localStorage.setItem('startTime', startTime);
    localStorage.setItem('timeLeft', 60);

    try {
      const response = await fetch('http://localhost:4000/send-support-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, subject, message }), // Usar el correo del usuario autenticado
      });

      const data = await response.json();

      if (response.ok) {
        setResponse(data.message);
        setError('');
        setSubject('Errores en cuentas'); // Resetear el asunto al valor por defecto
        setMessage(''); // Limpiar el mensaje

        const newCount = complaintsCount + 1;
        setComplaintsCount(newCount);
        localStorage.setItem('complaintsCount', newCount);

        setTimeLeft(60); // 1 minuto de espera
      } else {
        setError(data.message || 'Error al enviar el correo');
        setResponse('');
        setIsDisabled(false);
        localStorage.removeItem('timeLeft');
        localStorage.removeItem('startTime');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al enviar el correo');
      setResponse('');
      setIsDisabled(false);
      localStorage.removeItem('timeLeft');
      localStorage.removeItem('startTime');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', color: '#333', height: '100vh' }} className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Asistencia Técnica</h2>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        {response && <p style={{ color: 'green', marginBottom: '1rem' }}>{response}</p>}
        <p style={{ marginBottom: '1rem' }}>
          Puede enviar hasta 3 quejas por día. Ha enviado {complaintsCount} quejas hoy.
        </p>
        {isDisabled && (
          <p style={{ color: 'red', marginBottom: '1rem' }}>
            Debe esperar {timeLeft} segundos antes de enviar otra queja.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Asunto:</label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              disabled={isDisabled}
              style={{
                color: 'black',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.375rem',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '1rem'
              }}
            >
              <option value="Cuentas">Cuentas</option>
              <option value="Transacciones">Transacciones</option>
              <option value="Paypal">Paypal</option>
              <option value="Datos personales">Datos personales</option>
              <option value="Pago de servicios básicos">Pago de servicios básicos</option>
              <option value="Recargas">Recargas</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Descripción:</label>
            <textarea 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required 
              placeholder="Describe tu problema o consulta aquí..."
              disabled={isDisabled}
              style={{
                color: 'black',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.375rem',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '1rem',
                height: '150px',
                resize: 'vertical'
              }}
            ></textarea>
          </div>
          <button type="submit" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            width: '100%',
            border: 'none',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }} disabled={isDisabled}>
            {isLoading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnviarCorreo;
