import React from 'react';

const Saldos = () => {
    // Simulación de datos de la cuenta. Estos datos se deberían obtener de un contexto o API.
    const accountDetails = {
        ownerName: 'Juan Pérez',
        accountNumber: '1234567890',
        balance: '$10,000.00',
        accountType: 'Cuenta de Ahorros',
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-custom-darkgray p-6">
            <header className="page-header mb-6">
                <h1 className="text-3xl font-bold text-white">Detalles de la Cuentas</h1>
            </header>
            <main className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <div className="mb-4 border-l-4 border-blue-600 pl-4">
                    <label className="block text-blue-700 font-bold mb-2">Nombre del propietario</label>
                    <p className="text-gray-900">{accountDetails.ownerName}</p>
                </div>
                <div className="mb-4 border-l-4 border-red-600 pl-4">
                    <label className="block text-red-700 font-bold mb-2">Número de cuenta</label>
                    <p className="text-gray-900">{accountDetails.accountNumber}</p>
                </div>
                <div className="mb-4 border-l-4 border-lightblue-600 pl-4">
                    <label className="block text-lightblue-700 font-bold mb-2">Saldo de la cuenta</label>
                    <p className="text-gray-900">{accountDetails.balance}</p>
                </div>
                <div className="mb-4 border-l-4 border-blue-600 pl-4">
                    <label className="block text-blue-700 font-bold mb-2">Tipo de cuenta</label>
                    <p className="text-gray-900">{accountDetails.accountType}</p>
                </div>
            </main>
            <footer className="mt-6 text-white">
                <p>&copy; 2024 AndesInvest</p>
            </footer>

            <style jsx>{`
                .bg-custom-darkgray {
                    background-color: #2d2d2d;
                }
                .border-lightblue-600 {
                    border-color: #63B3ED;
                }
                .text-lightblue-700 {
                    color: #3182CE;
                }
            `}</style>
        </div>
    );
};

export default Saldos;
