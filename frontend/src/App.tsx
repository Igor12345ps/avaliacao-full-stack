import "./App.css";

import transfersAPI from "./helpers/transferRequest";
import { Transfer } from "./models/transfer";
import { useEffect, useState } from "react";

import HeaderC from "./components/Header";
import TransferTable from "./components/TransferTable";

function App() {
  const api = transfersAPI();

  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    const getTransfers = async () => {
      const new_transfers = await api.getAllTransfers();
      setTransfers(new_transfers);
    };
    getTransfers();
  }, []);

  return (
    <>
      <HeaderC />

      <br />
      <br />
      <br />

      <section className="w-full flex flex-col items-center">
        <div className="w-5/6">
          <TransferTable data={transfers} />
        </div>
      </section>

    </>
  );
}

export default App;
