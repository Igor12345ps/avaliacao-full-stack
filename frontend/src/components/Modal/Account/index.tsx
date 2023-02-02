import { Button, Header, Icon, Modal, Progress } from "semantic-ui-react";
import { useEffect, useState } from "react";

type Props = {
  show: boolean;
};

const ModalAccount = ({ show }: Props) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accountNumber, setAccountNumber] = useState("123456");

  useEffect(() => {
    if (show == true) {
      setOpened(true);
    }
  }, [show]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [show]);

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
        <Button color="green" onClick={null}>
          <Icon name="checkmark" /> Ver todas as contas
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalAccount;
