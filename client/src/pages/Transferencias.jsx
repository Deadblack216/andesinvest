import { useEffect } from "react";
import { Label, Input, Button } from "../components/ui";

const Transferencias = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-custom-darkgray p-6">
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-3xl p-8 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">Transferencias Directas</h1>
          <div className="account-info bg-gray-800 p-4 rounded-md mb-6 text-center shadow-md">
            <h2 className="text-xl font-bold text-white">Cuenta de Ahorro Transaccional</h2>
            <p className="text-gray-400">00000000</p>
            <p className="text-gray-400 font-semibold">Saldo: $100</p>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label htmlFor="amount" className="block text-base font-medium text-white col-span-1">Monto</Label>
              <div className="amount-input col-span-2 flex">
                <span className="px-3 py-2 bg-blue-700 text-white border border-r-0 border-gray-600 rounded-l-md">$</span>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  min="0"
                  step="0.01"
                  required
                  className="flex-1 px-3 py-2 border border-gray-600 rounded-r-md focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label htmlFor="beneficiary-name" className="block text-base font-medium text-white col-span-1">Beneficiario</Label>
              <Input
                type="text"
                id="beneficiary-name"
                name="beneficiary-name"
                placeholder="Nombre del beneficiario"
                required
                className="col-span-2 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label htmlFor="account-number" className="block text-base font-medium text-white col-span-1">Número de cuenta</Label>
              <Input
                type="text"
                id="account-number"
                name="account-number"
                placeholder="Número de cuenta"
                required
                className="col-span-2 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label htmlFor="description" className="block text-base font-medium text-white col-span-1">Descripción</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Descripción (opcional)"
                maxLength="150"
                className="col-span-2 mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              ></textarea>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label htmlFor="notification" className="block text-base font-medium text-white col-span-1">Notificación</Label>
              <Input
                type="email"
                id="notification"
                name="notification"
                placeholder="Correo electrónico (Opcional)"
                className="col-span-2 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div className="form-actions flex justify-between mt-4">
              <Button type="reset" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors">
                Limpiar
              </Button>
              <Button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors">
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


