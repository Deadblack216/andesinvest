// /src/pages/Transacciones.jsx
import React, { useEffect, useState } from 'react';
import { useAccount } from '../context/accountContext';

const Transacciones = () => {
  const { accounts, fetchAccounts } = useAccount();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (selectedAccount) {
      fetchTransactions(selectedAccount);
    }
  }, [selectedAccount]);

  const fetchTransactions = async (accountId) => {
    // Replace this with your actual fetch logic
    const response = await fetch(`/api/transactions?accountId=${accountId}`);
    const data = await response.json();
    setTransactions(data);
  };

  if (accounts.length === 0) {
    return <p>No accounts available.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-custom-darkgray p-6">
      <header className="page-header mb-6">
        <h1 className="text-3xl font-bold text-white">Transacciones</h1>
      </header>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
        <select
          id="fromAccountId"
          name="fromAccountId"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white mb-4"
        >
          <option value="" disabled>Select an account</option>
          {accounts.map(account => (
            <option key={account._id} value={account._id}>
              {account.accountNumber} - {account.userId.fullName}
            </option>
          ))}
        </select>

        <div className="flex justify-between items-center mb-4">
          <button className="px-3 py-2 bg-gray-200 rounded-md shadow-sm">Filtrar</button>
          <button className="px-3 py-2 bg-gray-200 rounded-md shadow-sm">Exportar</button>
        </div>

        <div className="mt-4">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div key={transaction.id} className="border-b border-gray-600 py-2">
                {(index === 0 || new Date(transactions[index - 1].date).toLocaleDateString() !== new Date(transaction.date).toLocaleDateString()) && (
                  <div className="text-gray-500 font-bold mt-4">
                    {new Date(transaction.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="text-gray-900">{transaction.description}</div>
                  <div className="text-gray-900">{transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}</div>
                </div>
                <div className="text-gray-500">Saldo: {transaction.balance}</div>
              </div>
            ))
          ) : (
            <p>No transactions available for this account.</p>
          )}
        </div>
      </div>
      <footer className="mt-6 text-white">
        <p>&copy; 2024 AndesInvest</p>
      </footer>

      <style jsx>{`
        .bg-custom-darkgray {
          background-color: #2d2d2d;
        }
      `}</style>
    </div>
  );
};

export default Transacciones;
