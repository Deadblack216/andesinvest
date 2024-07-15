// /src/pages/Saldos.jsx
import React, { useEffect } from 'react';
import { useAccount } from '../context/accountContext';
import { Button } from "../components/ui";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Saldos = () => {
  const { accounts, fetchAccounts, deleteAccount } = useAccount();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  if (accounts.length === 0) {
    return <p>No accounts available.</p>;
  }

  const handleDelete = async (id) => {
    try {
      await deleteAccount(id);
      fetchAccounts(); // Actualizar la lista de cuentas después de eliminar
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-custom-darkgray p-6">
      <header className="page-header mb-6">
        <h1 className="text-3xl font-bold text-white">Detalles de la Cuentas</h1>
      </header>
      <Carousel>
        {accounts.map((account) => (
          <div key={account._id} className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="mb-4 border-l-4 border-blue-600 pl-4">
              <label className="block text-blue-700 font-bold mb-2">Nombre del propietario</label>
              <p className="text-gray-900">{account.userId.fullName}</p>
            </div>
            <div className="mb-4 border-l-4 border-red-600 pl-4">
              <label className="block text-red-700 font-bold mb-2">Número de cuenta</label>
              <p className="text-gray-900">{account.accountNumber}</p>
            </div>
            <div className="mb-4 border-l-4 border-lightblue-600 pl-4">
              <label className="block text-lightblue-700 font-bold mb-2">Saldo de la cuenta</label>
              <p className="text-gray-900">${account.balance.toFixed(2)}</p>
            </div>
            <div className="mb-4 border-l-4 border-blue-600 pl-4">
              <label className="block text-blue-700 font-bold mb-2">Tipo de cuenta</label>
              <p className="text-gray-900">{account.accountType === 'savings' ? 'Cuenta de Ahorros' : 'Cuenta Corriente'}</p>
            </div>
            <Button onClick={() => handleDelete(account._id)}>Eliminar Cuenta</Button>
          </div>
        ))}
      </Carousel>
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

