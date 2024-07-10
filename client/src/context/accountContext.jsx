// /src/context/accountContext.jsx
import { createContext, useContext, useState } from "react";
import { createAccountRequest } from "../api/accounts";

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

  return (
    <AccountContext.Provider value={{ accounts, createAccount }}>
      {children}
    </AccountContext.Provider>
  );
}
