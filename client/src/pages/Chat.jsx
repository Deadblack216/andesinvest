import React from 'react';

const Chat = () => {
    return (
        <div className="flex flex-col items-center p-8 font-sans bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-bounce">¡Contáctanos!</h1>
            <div className="flex flex-col md:flex-row justify-around w-full max-w-6xl mt-8 space-y-8 md:space-y-0 md:space-x-8">
                <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-gray-700">Chat en WhatsApp</h2>
                    <p className="mt-2 text-gray-600">Puedes chatear con nosotros en WhatsApp usando el siguiente enlace:</p>
                    <a href="https://wa.link/mwqp5y" target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                        Ir al Chat de WhatsApp
                    </a>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-gray-700">Chat en Vivo</h2>
                    <p className="mt-2 text-gray-600">Escanea el código QR para iniciar un chat en vivo con nuestro equipo de soporte:</p>
                    <img src="/QR.png" alt="Código QR para chat en vivo" className="mt-4 w-48 h-48 mx-auto" />
                </div>
            </div>
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">¿Por qué contactarnos?</h2>
                <p className="text-gray-600 mb-8">Estamos aquí para ayudarte con cualquier consulta o problema que puedas tener. Nuestro equipo de soporte está disponible 24/7 para ofrecerte la mejor asistencia.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                        <h3 className="text-xl font-semibold text-gray-700">Soporte Rápido</h3>
                        <p className="mt-2 text-gray-600">Nuestro equipo de soporte responderá a tus consultas en el menor tiempo posible.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                        <h3 className="text-xl font-semibold text-gray-700">Asistencia 24/7</h3>
                        <p className="mt-2 text-gray-600">Estamos disponibles a cualquier hora del día para asistirte con tus necesidades.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
                        <h3 className="text-xl font-semibold text-gray-700">Soporte Personalizado</h3>
                        <p className="mt-2 text-gray-600">Ofrecemos soluciones personalizadas para cada uno de nuestros clientes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
