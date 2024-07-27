import { createContext, useContext, useState } from "react";
import { createAccountRequest, getAccountsRequest, checkAccountExistsRequest } from "../api/accounts";

const AccountContext = createContext();

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used within an AccountProvider");
  return context;
};

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const res = await getAccountsRequest();
      setAccounts(res.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const createAccount = async (accountData) => {
    try {
      const res = await createAccountRequest(accountData);
      setAccounts([...accounts, res.data]);
      console.log(res.data);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const checkAccountExists = async (accountNumber) => {
    try {
      const res = await checkAccountExistsRequest(accountNumber);
      return res.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getAccountHolder = async (accountNumber) => {
    try {
      const res = await checkAccountExistsRequest(accountNumber);
      if (res.data.exists) {
        return res.data.account.userId; // Asegúrate de que el backend devuelve `userId`
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <AccountContext.Provider value={{ accounts, createAccount, fetchAccounts, checkAccountExists, getAccountHolder }}>
      {children}
    </AccountContext.Provider>
  );
};
