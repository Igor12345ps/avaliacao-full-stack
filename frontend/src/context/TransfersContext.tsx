import { createContext, useEffect, useState } from "react";
import { Transfer } from "../models/transfer";

export const TransfersContext = createContext<any>(null);

export const TransfersProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  // useEffect(()=>{
  //   console.log(transfers);
  // },[transfers]);

  return (
    <TransfersContext.Provider value={{ transfers, setTransfers }}>{children}</TransfersContext.Provider>
  );
};
