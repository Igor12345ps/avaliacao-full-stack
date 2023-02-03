import { createContext, useEffect, useState } from "react";
import { Account } from "../models/account";

export const AccountsContext = createContext<any>(null);

export const AccountsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts }}>{children}</AccountsContext.Provider>
  );
};
