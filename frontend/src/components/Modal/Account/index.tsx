import { Button, Header, Icon, Modal, Progress } from "semantic-ui-react";
import { useContext, useEffect, useState } from "react";
import transfersAPI from "../../../helpers/transferRequest";
import { Link } from "react-router-dom";
import { AccountsContext } from "../../../context/AccountsContext";

type Props = {
  show: boolean;
};

const ModalAccount = ({ show }: Props) => {
  const api = transfersAPI();

  const { accounts, setAccounts } = useContext(AccountsContext);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createAccountButton, setCreateAccountButton] = useState(true);
  const [accountNumber, setAccountNumber] = useState(null);


  useEffect(() => {
    if (show == true) {
      setOpened(true);
    }
  }, [show]);

  useEffect(() => {
    if (opened == false) {
      setAccountNumber(null);
      setLoading(false);
      setCreateAccountButton(true);
    }
  }, [opened]);

  const generateAccount = () => {
    setCreateAccountButton(false);
    setLoading(true);
    const createAccount = async () => {
      return await api.createAccount();
    };

    setTimeout(() => {
      createAccount().then((res) => {
        setAccountNumber(res);
        setLoading(false);
      });
    }, 2000);
  };

  const updateAndClose = () => {
    const getAccounts = async () => {
      const new_accounts = await api.getAllAccounts();
      setAccounts(new_accounts);
    };
    getAccounts();
    setOpened(false)
  }

  return (
    <Modal
      open={opened}
      onClose={() => setOpened(false)}
      dimmer="blurring"
      size="small"
    >
      <Header icon="user" content="Criar Conta Bancária" />
      <Modal.Content>
        <p>
          Para realizar transferências bancárias, é necessário o número da
          conta. <br />O número da sua conta é:
        </p>

        {createAccountButton && (
          <Button
            color="black"
            content="Criar conta"
            icon="plus"
            onClick={generateAccount}
            fluid
          />
        )}
        {loading && (
          <Progress percent={100} indicating>
            Gerando número da conta...
          </Progress>
        )}
        {!loading && (
          <Header
            as="h1"
            className="w-full text-center"
            content={accountNumber}
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpened(false)}>
          <Icon name="remove" /> Sair
        </Button>
        <Link to="/accounts">
          <Button color="green" onClick={updateAndClose}>
            <Icon name="checkmark" /> Ver todas as contas
          </Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalAccount;
