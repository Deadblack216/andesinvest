import { createContext, useContext, useState } from "react";
import { createAccountRequest, getAccountsRequest, deleteAccountRequest } from "../api/accounts";

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
      console.log("Account created:", res.data);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const deleteAccount = async (id) => {
    try {
      await deleteAccountRequest(id);
      setAccounts(accounts.filter(account => account._id !== id));
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <AccountContext.Provider value={{ accounts, fetchAccounts, createAccount, deleteAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
