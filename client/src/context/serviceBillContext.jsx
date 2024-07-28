// context/serviceBillContext.js
import { createContext, useContext, useState } from "react";
import { getServiceBillsRequest, payServiceBillRequest } from "../api/serviceBill.js";

const ServiceBillContext = createContext();

export const useServiceBill = () => {
  const context = useContext(ServiceBillContext);
  if (!context) throw new Error("useServiceBill must be used within a ServiceBillProvider");
  return context;
};

export const ServiceBillProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      const res = await getServiceBillsRequest();
      setBills(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching service bills:", error);
      setLoading(false);
    }
  };

  const payBill = async (billId) => {
    try {
      await payServiceBillRequest(billId);
      fetchBills(); // Refrescar la lista de facturas después de pagar una
    } catch (error) {
      console.error("Error paying service bill:", error);
    }
  };

  return (
    <ServiceBillContext.Provider value={{ bills, fetchBills, payBill, loading }}>
      {children}
    </ServiceBillContext.Provider>
  );
};
