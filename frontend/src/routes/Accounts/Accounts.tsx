import "./style.css";

import { useContext, useEffect, useState } from "react";
import { TransfersContext } from "../../context/TransfersContext";
import { Button } from "semantic-ui-react";
import TransferTable from "../../components/TransferTable";
import transfersAPI from "../../helpers/transferRequest";
import AccountTable from "../../components/AccountTable";
import { AccountsContext } from "../../context/AccountsContext";

const Accounts = () => {
  const api = transfersAPI();

  const { accounts, setAccounts } = useContext(AccountsContext);
  const [accountModal, setAccountModal] = useState(false);

  useEffect(() => {
    const getAccounts = async () => {
      const new_accounts = await api.getAllAccounts();
      setAccounts(new_accounts);
    };
    getAccounts();
  }, []);

  const openModal = () => {
    setAccountModal(true);
    setTimeout(() => {
      setAccountModal(false);
    }, 10);
  };

  const reloadList = () => {
    const getAccounts = async () => {
      const new_accounts = await api.getAllAccounts();
      setAccounts(new_accounts);
    };
    getAccounts();
  };

  return (
    <div>
      <div className="w-full flex flex-col items-center mt-20">
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
          <AccountTable />
        </div>
      </section>
    </div>
  );
};

export default Accounts;
