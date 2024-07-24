import React from 'react';

const RegisterSuccessPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">¡Bienvenido a nuestra comunidad! 🌟</h2>
        <p className="text-lg text-gray-700 mb-4">
          Nos complace informarte que tu cuenta ha sido registrada y verificada exitosamente. Ahora estás a un paso de descubrir todas las ventajas que ofrecemos. Inicia sesión para comenzar a disfrutar de nuestros servicios bancarios, diseñados para facilitar y mejorar tu experiencia financiera.
        </p>
        <p className="text-lg text-gray-700">¡Gracias por confiar en nosotros! 😊</p>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
