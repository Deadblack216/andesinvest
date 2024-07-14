// /src/pages/Transferencias.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label, Input, Button } from "../components/ui";
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../context/accountContext';
import { useTransfer } from '../context/transferContext';
import { useAuth } from '../context/authContext';

const Transferencias = () => {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, setValue } = useForm();
  const { accounts, fetchAccounts, checkAccountExists } = useAccount();
  const { createTransfer } = useTransfer();
  const { user } = useAuth(); // Obtener información del usuario autenticado
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isOwnAccount, setIsOwnAccount] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (isOwnAccount) {
      setValue('beneficiaryName', user.fullName); // Auto-completar con el nombre del usuario
    } else {
      setValue('beneficiaryName', '');
    }
  }, [isOwnAccount, setValue, user.fullName]);

  const onSubmit = async (data) => {
    if (!selectedAccount) {
      alert("Por favor, seleccione una cuenta de origen.");
      return;
    }

    const amount = parseFloat(data.amount);
    const account = accounts.find(acc => acc._id === selectedAccount);

    if (amount <= 0) {
      setError("amount", {
        type: "manual",
        message: "El monto a transferir debe ser mayor que $0.",
      });
      return;
    }

    if (account.balance < amount) {
      setError("amount", {
        type: "manual",
        message: "Fondos insuficientes en la cuenta seleccionada.",
      });
      return;
    }

    if (!isOwnAccount) {
      const accountExists = await checkAccountExists(data.toAccountNumber);
      if (!accountExists) {
        setError("toAccountNumber", {
          type: "manual",
          message: "La cuenta de destino no existe.",
        });
        return;
      }
    }
    
    clearErrors("amount");
    clearErrors("toAccountNumber");

    const transferData = {
      fromAccountId: selectedAccount,
      amount: amount,
      beneficiaryName: data.beneficiaryName,
      description: data.description,
      notificationEmail: data.notificationEmail,
    };

    if (isOwnAccount) {
      transferData.toAccountNumber = data.toOwnAccountId;
    } else {
      transferData.toAccountNumber = data.toAccountNumber;
    }

    try {
      await createTransfer(transferData);
      navigate('/saldo');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-custom-darkgray p-4 md:p-6">
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-2xl p-4 md:p-8 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 text-center">Transferencias Directas</h1>
          <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
            <Label htmlFor="fromAccountId" className="block text-lg font-medium text-white">Cuenta de origen</Label>
            <select
              id="fromAccountId"
              name="fromAccountId"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            >
              <option value="" disabled>Seleccione una cuenta</option>
              {accounts.map(account => (
                <option key={account._id} value={account._id}>
                  {account.accountType === 'savings' ? 'Ahorro' : 'Corriente'} - {account.accountNumber} (Saldo: ${account.balance.toFixed(2)})
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isOwnAccount}
                onChange={(e) => setIsOwnAccount(e.target.checked)}
              />
              <span className="ml-2 text-white">Transferir a cuenta propia</span>
            </label>
          </div>
          <form className="space-y-4 md:space-y-6 mt-4 md:mt-6" onSubmit={handleSubmit(onSubmit)}>
            {!isOwnAccount && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <Label htmlFor="toAccountNumber" className="block text-lg font-medium text-white">Número de cuenta</Label>
                <Input
                  type="text"
                  id="toAccountNumber"
                  name="toAccountNumber"
                  placeholder="Número de cuenta"
                  required
                  className="col-span-2 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  {...register("toAccountNumber", { required: "Por favor, ingrese el número de cuenta de destino." })}
                />
                {errors.toAccountNumber && (
                  <p className="text-red-500 text-xs italic col-span-3">{errors.toAccountNumber.message}</p>
                )}
              </div>
            )}
            {isOwnAccount && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <Label htmlFor="toOwnAccountId" className="block text-lg font-medium text-white">Cuenta de destino</Label>
                <select
                  id="toOwnAccountId"
                  name="toOwnAccountId"
                  className="col-span-2 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  {...register("toOwnAccountId", { required: "Por favor, seleccione una cuenta de destino." })}
                >
                  <option value="" disabled>Seleccione una cuenta</option>
                  {accounts.filter(account => account._id !== selectedAccount).map(account => (
                    <option key={account._id} value={account.accountNumber}>
                      {account.accountType === 'savings' ? 'Ahorro' : 'Corriente'} - {account.accountNumber} (Saldo: ${account.balance.toFixed(2)})
                    </option>
                  ))}
                </select>
                {errors.toOwnAccountId && (
                  <p className="text-red-500 text-xs italic col-span-3">{errors.toOwnAccountId.message}</p>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label htmlFor="amount" className="block text-lg font-medium text-white">Monto</Label>
              <div className="amount-input col-span-2 flex">
                <span className="px-3 md:px-4 py-2 bg-blue-700 text-white border border-r-0 border-gray-600 rounded-l-md">$</span>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  min="0"
                  step="0.01"
                  required
                  className="flex-1 px-3 py-2 border border-gray-600 rounded-r-md focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  {...register("amount", { required: "Por favor, ingrese el monto a transferir." })}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-xs italic col-span-3">{errors.amount.message}</p>
              )}
            </div>
            {!isOwnAccount && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label htmlFor="beneficiaryName" className="block text-lg font-medium text-white">Beneficiario</Label>
                  <Input
                    type="text"
                    id="beneficiaryName"
                    name="beneficiaryName"
                    placeholder="Nombre del beneficiario"
                    required
                    className="col-span-2 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                    {...register("beneficiaryName", { required: "Por favor, ingrese el nombre del beneficiario." })}
                  />
                  {errors.beneficiaryName && (
                    <p className="text-red-500 text-xs italic col-span-3">{errors.beneficiaryName.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label htmlFor="notificationEmail" className="block text-lg font-medium text-white">Notificación</Label>
                  <Input
                    type="email"
                    id="notificationEmail"
                    name="notificationEmail"
                    placeholder="Correo electrónico"
                    className="col-span-2 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                    {...register("notificationEmail", { required: "Por favor, ingrese el correo electrónico para la notificación." })}
                  />
                  {errors.notificationEmail && (
                    <p className="text-red-500 text-xs italic col-span-3">{errors.notificationEmail.message}</p>
                  )}
                </div>
              </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label htmlFor="description" className="block text-lg font-medium text-white">Descripción</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Descripción (opcional)"
                maxLength="150"
                className="col-span-2 mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                {...register("description")}
              ></textarea>
            </div>
            <div className="form-actions flex justify-between mt-4 md:mt-6">
              <Button type="reset" className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors">
                Limpiar
              </Button>
              <Button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors">
                Continuar
              </Button>
            </div>
          </form>
        </div>
      </main>

      <footer className="text-center py-4 bg-gray-800 w-full mt-auto">
        <p className="text-gray-400">&copy; 2024 AndesInvest</p>
      </footer>

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
        }
        .bg-custom-darkgray {
          background-color: #202020;
        }
        .form-actions button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Transferencias;
