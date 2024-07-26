import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../context/accountContext";
import { useTransfer } from "../context/transferContext";
import { useAuth } from "../context/authContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Label, Input, Button } from "../components/ui";

const Transferencias = () => {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, setValue } = useForm();
  const { accounts, fetchAccounts, checkAccountExists } = useAccount();
  const { createTransfer } = useTransfer();
  const { user } = useAuth(); // Obtener información del usuario autenticado
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isOwnAccount, setIsOwnAccount] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (isOwnAccount) {
      setValue("beneficiaryName", user.fullName); // Auto-completar con el nombre del usuario
    } else {
      setValue("beneficiaryName", "");
    }
  }, [isOwnAccount, setValue, user.fullName]);

  const onSubmit = async (data) => {
    if (!selectedAccount) {
      alert("Por favor, seleccione una cuenta de origen.");
      return;
    }

    const amount = parseFloat(data.amount);
    const account = accounts.find((acc) => acc._id === selectedAccount);

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
      setShowSuccessModal(true); // Mostrar el modal de éxito
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/saldo");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 md:p-6">
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-2xl p-4 md:p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-6 text-center">Transferencias Directas</h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Label htmlFor="fromAccountId" className="block text-lg font-medium text-black">Cuenta de origen</Label>
              <select
                id="fromAccountId"
                name="fromAccountId"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent text-black"
              >
                <option value="" disabled>Seleccione una cuenta</option>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.accountType === "savings" ? "Ahorro" : "Corriente"} - {account.accountNumber} (Saldo: ${account.balance.toFixed(2)})
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
                  style={{ color: 'black' }}
                />
                <span className="ml-2 text-black">Transferir a cuenta propia</span>
              </label>
            </div>
            {!isOwnAccount && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <Label htmlFor="toAccountNumber" className="block text-lg font-medium text-black">Número de cuenta</Label>
                <Input
                  type="text"
                  id="toAccountNumber"
                  name="toAccountNumber"
                  placeholder="Número de cuenta"
                  required
                  className="col-span-2 px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent text-black text-lg"
                  {...register("toAccountNumber", { required: "Por favor, ingrese el número de cuenta de destino." })}
                />
                {errors.toAccountNumber && (
                  <p className="text-red-500 text-xs italic col-span-3">{errors.toAccountNumber.message}</p>
                )}
                <Button type="button" className="col-span-3 px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  Verificar
                </Button>
              </div>
            )}
            {isOwnAccount && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <Label htmlFor="toOwnAccountId" className="block text-lg font-medium text-black">Cuenta de destino</Label>
                <select
                  id="toOwnAccountId"
                  name="toOwnAccountId"
                  className="col-span-2 px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent text-black text-lg"
                  {...register("toOwnAccountId", { required: "Por favor, seleccione una cuenta de destino." })}
                >
                  <option value="" disabled>Seleccione una cuenta</option>
                  {accounts.filter((account) => account._id !== selectedAccount).map((account) => (
                    <option key={account._id} value={account.accountNumber}>
                      {account.accountType === "savings" ? "Ahorro" : "Corriente"} - {account.accountNumber} (Saldo: ${account.balance.toFixed(2)})
                    </option>
                  ))}
                </select>
                {errors.toOwnAccountId && (
                  <p className="text-red-500 text-xs italic col-span-3">{errors.toOwnAccountId.message}</p>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label htmlFor="amount" className="block text-lg font-medium text-black">Monto</Label>
              <div className="amount-input col-span-2 flex">
                <span className="px-4 py-3 bg-blue-700 text-white border border-r-0 border-black rounded-l-md">$</span>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  min="0"
                  step="0.01"
                  required
                  className="flex-1 px-4 py-3 border border-black rounded-r-md focus:ring-blue-500 focus:border-blue-500 bg-transparent text-black text-lg"
                  {...register("amount", { required: "Por favor, ingrese el monto a transferir." })}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-xs italic col-span-3">{errors.amount.message}</p>
              )}
            </div>
            {!isOwnAccount && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <Label htmlFor="beneficiaryName" className="block text-lg font-medium text-black">Beneficiario</Label>
                  <Input
                    type="text"
                    id="beneficiaryName"
                    name="beneficiaryName"
                    placeholder="Nombre del beneficiario"
                    required
                    className="col-span-2 px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent text-black text-lg w-full"
                    {...register("beneficiaryName", { required: "Por favor, ingrese el nombre del beneficiario." })}
                  />
                  {errors.beneficiaryName && (
                    <p className="text-red-500 text-xs italic col-span-2">{errors.beneficiaryName.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <Label htmlFor="notificationEmail" className="block text-lg font-medium text-black">Correo</Label>
                  <Input
                    type="email"
                    id="notificationEmail"
                    name="notificationEmail"
                    placeholder="Correo electrónico"
                    className="col-span-2 px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent text-black text-lg w-full"
                    {...register("notificationEmail", { required: "Por favor, ingrese el correo electrónico para la notificación." })}
                  />
                  {errors.notificationEmail && (
                    <p className="text-red-500 text-xs italic col-span-2">{errors.notificationEmail.message}</p>
                  )}
                </div>
              </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Label htmlFor="description" className="block text-lg font-medium text-black">Descripción*</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Descripción (opcional)"
                maxLength="150"
                className="col-span-2 mt-1 block w-full px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent text-black text-lg"
                {...register("description")}
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Label htmlFor="confirmationCode" className="block text-lg font-medium text-black">Código de confirmación</Label>
              <div className="col-span-2 flex">
                <Input
                  type="text"
                  id="confirmationCode"
                  name="confirmationCode"
                  placeholder="Código de confirmación"
                  className="flex-1 px-4 py-3 border border-black rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent text-black text-lg"
                  {...register("confirmationCode", { required: "Por favor, ingrese el código de confirmación." })}
                />
                <Button type="button" className="ml-2 px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  Enviar código
                </Button>
              </div>
              {errors.confirmationCode && (
                <p className="text-red-500 text-xs italic col-span-2">{errors.confirmationCode.message}</p>
              )}
            </div>
            <div className="form-actions flex justify-between mt-6">
              <Button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors text-lg">
                Continuar
              </Button>
              <Button type="button" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors text-lg">
                Confirmar
              </Button>
            </div>
          </form>
        </div>
      </main>

      <footer className="text-center py-4 bg-gray-100 w-full mt-auto">
        <p className="text-gray-600">&copy; 2024 AndesInvest</p>
      </footer>

      <Modal
        open={showSuccessModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: 0,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Transferencia exitosa
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            La transferencia se ha realizado con éxito.
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Cerrar
          </Button>
        </Box>
      </Modal>

      <style jsx>{`
        body {
          background-color: #fff;
        }
        .form-actions button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        input, select, textarea {
          color: black !important;
          background-color: transparent !important;
          border: 1px solid black !important;
        }
        label, .text-black {
          color: black !important;
        }
      `}</style>
    </div>
  );
};

export default Transferencias;
