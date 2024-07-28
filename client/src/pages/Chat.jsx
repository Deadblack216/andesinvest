import React from 'react';

const Chat = () => {
    return (
        <div className="flex flex-col items-center p-8 font-sans bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-bounce">¡Contáctanos!</h1>
            <div className="flex flex-col md:flex-row justify-around w-full max-w-6xl mt-8 space-y-8 md:space-y-0 md:space-x-8">
                <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Link del Chat en WhatsApp</h2>
                    <p className="mt-2 text-gray-600 text-center">Puedes chatear con nosotros en WhatsApp usando el siguiente enlace:</p>
                    <div className="flex justify-center mt-4">
                        <a href="https://wa.link/mwqp5y" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                            Ir al Chat de WhatsApp
                        </a>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Código QR del Chat en WhatsApp</h2>
                    <p className="mt-2 text-gray-600 text-center">Escanea el código QR para iniciar un chat en vivo con nuestro equipo de soporte:</p>
                    <div className="flex justify-center mt-4">
                        <div className="p-2 border-4 border-transparent rounded-lg hover:border-green-500 transition duration-300">
                            <img src="/QR.png" alt="Código QR para chat en vivo" className="w-48 h-48" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">¿Por qué contactarnos?</h2>
                <p className="text-gray-600 mb-8">Estamos aquí para ayudarte con cualquier consulta o problema que puedas tener. Nuestro equipo de soporte está disponible 24/7 para ofrecerte la mejor asistencia.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                        <h3 className="text-xl font-semibold text-white text-center transition-transform transform hover:scale-110">Soporte Rápido</h3>
                        <p className="mt-2 text-white text-center">Nuestro equipo de soporte responderá a tus consultas en el menor tiempo posible.</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                        <h3 className="text-xl font-semibold text-white text-center transition-transform transform hover:scale-110">Asistencia 24/7</h3>
                        <p className="mt-2 text-white text-center">Estamos disponibles a cualquier hora del día para asistirte con tus necesidades.</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                        <h3 className="text-xl font-semibold text-white text-center transition-transform transform hover:scale-110">Soporte Personalizado</h3>
                        <p className="mt-2 text-white text-center">Ofrecemos soluciones personalizadas para cada uno de nuestros clientes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
