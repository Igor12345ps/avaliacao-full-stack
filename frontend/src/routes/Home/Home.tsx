import "./style.css";
import transfersAPI from "../../helpers/transferRequest";
import { Transfer } from "../../models/transfer";
import { useContext, useEffect, useState } from "react";
import TransferTable from "../../components/TransferTable";
import { Button, Icon } from "semantic-ui-react";
import ModalAccount from "../../components/Modal/Account";
import { TransfersContext } from "../../context/TransfersContext";
import { AccountsContext } from "../../context/AccountsContext";

const Home = () => {
  const api = transfersAPI();

  const { transfers, setTransfers } = useContext(TransfersContext);
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

  const reloadList = () => {
    const getTransfers = async () => {
      const new_transfers = await api.getAllTransfers();
      setTransfers(new_transfers);
    };
    getTransfers();
  };

  return (
    <>
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

      <div className="w-full flex flex-col items-center mt-4">
        <div className="w-5/6">
          <Button
            color="black"
            content="Atualizar a Lista"
            icon="redo"
            onClick={reloadList}
            fluid
          />
        </div>
      </div>

      <section className="w-full flex flex-col items-center">
        <div className="w-5/6">
          <TransferTable />
        </div>
      </section>

      <ModalAccount show={accountModal} />
    </>
  );
};

export default Home;
