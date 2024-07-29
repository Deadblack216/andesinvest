import React, { createContext, useContext, useState } from "react";
import axios from "../api/axios";

const TransactionContext = createContext();

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error("useTransaction must be used within a TransactionProvider");
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async (accountId) => {
    try {
      const response = await axios.get(`/transactions?accountId=${accountId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
