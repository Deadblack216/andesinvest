// /src/context/transferContext.jsx
import { createContext, useContext, useState } from "react";
import { createTransferRequest, getTransfersRequest } from "../api/transfers.js";

const TransferContext = createContext();

export const useTransfer = () => {
  const context = useContext(TransferContext);
  if (!context) throw new Error("useTransfer must be used within a TransferProvider");
  return context;
};

export const TransferProvider = ({ children }) => {
  const [transfers, setTransfers] = useState([]);

  const fetchTransfers = async () => {
    try {
      const res = await getTransfersRequest();
      setTransfers(res.data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    }
  };

  const createTransfer = async (transferData) => {
    try {
      const res = await createTransferRequest(transferData);
      setTransfers([...transfers, res.data]);
      console.log("Transfer created:", res.data);
    } catch (error) {
      console.error("Error creating transfer:", error);
    }
  };

  return (
    <TransferContext.Provider value={{ transfers, fetchTransfers, createTransfer }}>
      {children}
    </TransferContext.Provider>
  );
};
