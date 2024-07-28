// src/components/ServiceBillComponent.jsx
import React, { useEffect } from 'react';
import { useServiceBill } from "../context/serviceBillContext";
import { createPaypalOrderRequest } from "../api/serviceBill";
import { useNavigate } from 'react-router-dom';

const ServiceBillComponent = () => {
  const { bills, fetchBills, loading } = useServiceBill();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const handlePaypalPayment = async (billId) => {
    try {
      const { data: order } = await createPaypalOrderRequest(billId);
      console.log(order); // Agregar este log para verificar la respuesta de la API
      const approvalLink = order.links.find(link => link.rel === 'approval_url');
      if (approvalLink) {
        window.location.href = approvalLink.href;
      } else {
        console.error('Approval link not found in the PayPal order');
      }
    } catch (error) {
      console.error('Error creating PayPal order:', error);
    }
  };

  if (loading) {
    return <p>Cargando facturas...</p>;
  }

  if (bills.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 md:p-6">
        <main className="flex-1 flex items-center justify-center w-full">
          <div className="w-full max-w-2xl p-4 md:p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6 text-center">Facturas de Servicios Básicos</h1>
            <p className="text-black text-center">No hay facturas disponibles. Por favor, crea una cuenta primero.</p>
          </div>
        </main>

        <footer className="text-center py-4 bg-gray-800 w-full mt-auto">
          <p className="text-gray-400">&copy; 2024 AndesInvest</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 md:p-6">
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-2xl p-4 md:p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6 text-center">Facturas de Servicios Básicos</h1>
          <ul className="space-y-4">
            {bills.map(bill => (
              <li key={bill._id} className="bg-gray-100 p-4 rounded-md shadow-md">
                <p className="text-black">Servicio: {bill.serviceType}</p>
                <p className="text-black">Monto: ${bill.amount}</p>
                <p className="text-black">Fecha de Emisión: {new Date(bill.issueDate).toLocaleDateString()}</p>
                <p className="text-black">Fecha de Vencimiento: {new Date(bill.dueDate).toLocaleDateString()}</p>
                <p className="text-black">Estado: {bill.paid ? "Pagada" : "Pendiente"}</p>
                {!bill.paid && (
                  <>
                    {/* <button
                      onClick={() => payBill(bill._id)}
                      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
                    >
                      Pagar
                    </button> */}
                    <button
                      onClick={() => handlePaypalPayment(bill._id)}
                      className="mt-2 ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                    >
                      Pagar con PayPal
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="text-center py-4 bg-gray-800 w-full mt-auto">
        <p className="text-gray-400">&copy; 2024 AndesInvest</p>
      </footer>
    </div>
  );
};

export default ServiceBillComponent;
