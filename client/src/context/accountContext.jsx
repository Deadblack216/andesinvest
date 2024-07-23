// /src/context/accountContext.jsx
import { createContext, useContext, useState } from "react";
import { createAccountRequest, fetchAccountsRequest, checkAccountExistsRequest } from "../api/accounts";

const AccountContext = createContext();

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used within an AccountProvider");
  return context;
};

export function AccountProvider({ children }) {
  const [accounts, setAccounts] = useState([]);

  const createAccount = async (accountData) => {
    try {
      const res = await createAccountRequest(accountData);
      setAccounts([...accounts, res.data]);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await fetchAccountsRequest();
      setAccounts(res.data);
    } catch (error) {
      console.error(error);
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

  return (
    <AccountContext.Provider value={{ accounts, createAccount, fetchAccounts, checkAccountExists }}>
      {children}
    </AccountContext.Provider>
  );
}
