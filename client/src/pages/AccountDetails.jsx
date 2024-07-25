// /src/pages/AccountDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount } from '../context/accountContext';
import { useTransfer } from '../context/transferContext';
import { Button } from "../components/ui";

const AccountDetails = () => {
  const { id } = useParams();
  const { getAccount } = useAccount();
  const { fetchAccountTransactions } = useTransfer();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const accountData = await getAccount(id);
        setAccount(accountData);
        const transactionsData = await fetchAccountTransactions(id);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, [id, getAccount, fetchAccountTransactions]);

  if (!account) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-4">
        <h1 className="text-3xl font-bold mb-4">Detalles de la Cuenta</h1>
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
        <h2 className="text-2xl font-bold mb-4">Movimientos</h2>
        {transactions.length === 0 ? (
          <p>No hay movimientos disponibles.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction._id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-900">{transaction.description}</p>
                  <p className="text-gray-500">{transaction.date}</p>
                </div>
                <div className={`text-${transaction.amount > 0 ? 'green' : 'red'}-600`}>
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
        <Button onClick={() => window.history.back()}>Volver</Button>
      </div>
    </div>
  );
};

export default AccountDetails;
