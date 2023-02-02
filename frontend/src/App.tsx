import "./App.css";

import transfersAPI from "./helpers/transferRequest";
import { Transfer } from "./models/transfer";
import { useEffect, useState } from "react";

import HeaderC from "./components/Header";
import TransferTable from "./components/TransferTable";
import { Button, Icon } from "semantic-ui-react";
import ModalAccount from "./components/Modal/Account";

function App() {
  const api = transfersAPI();

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [accountModal, setAccountModal] = useState(false);

  useEffect(() => {
    const getTransfers = async () => {
      const new_transfers = await api.getAllTransfers();
      setTransfers(new_transfers);
    };
    getTransfers();
  }, []);

  const openModal = () => {
    setAccountModal(true);
    setTimeout(() => {
      setAccountModal(false);
    }, 10);
  };

  return (
    <>
      <HeaderC />

      <section className="w-full">
        <div
          className="text-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg')",
            height: 400,
          }}
        >
          <div
            className="w-full h-full flex justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div>
              <div className="text-white">
                <h1 className="mb-3">Agendamento de Transferência</h1>
                <h4 className="mb-3">
                  Para começar, crie uma conta se ainda não tiver uma!
                </h4>
                <Button
                  inverted
                  content="Criar minha conta bancária"
                  icon="money"
                  onClick={openModal}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col items-center">
        <div className="w-5/6">
          <TransferTable data={transfers} />
        </div>
      </section>

      <ModalAccount show={accountModal} />
    </>
  );
}

export default App;
