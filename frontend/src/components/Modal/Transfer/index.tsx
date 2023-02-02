import { Button, Form, Header, Icon, Message, Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import moment from "moment";

type Props = {
  show: boolean;
};

const ModalTransfer = ({ show }: Props) => {
  const [opened, setOpened] = useState(false);

  const [originAccount, setOriginAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [transferValue, setTransferValue] = useState("");
  const [schedulingDate, setSchedulingDate] = useState("");

  const [transferValueErrorMessage, setTransferValueErrorMessage] =
    useState("");

  const [OriginAccountErrorMessage, setOriginAccountErrorMessage] =
    useState("");

  const [destinationAccountErrorMessage, setDestinationAccountErrorMessage] =
    useState("");

  const [dateErrorMessage, setDateErrorMessage] = useState("");

  useEffect(() => {
    if (show == true) {
      setOpened(true);
    }
  }, [show]);

  useEffect(() => {
    if (opened == false) {
      setOriginAccount("");
      setOriginAccountErrorMessage("");
      setDestinationAccount("");
      setDestinationAccountErrorMessage("");
      setTransferValue("");
      setTransferValueErrorMessage("");
      setSchedulingDate("");
      setDateErrorMessage("");
    }
  }, [opened]);

  enum AccountEnum {
    ORIGIN,
    DESTINATION,
  }

  const validateAccountNumber = (t: string, type: AccountEnum) => {
    switch (type) {
      case AccountEnum.ORIGIN:
        if (t == "" || isNaN(t) || t.length < 6) {
          setOriginAccountErrorMessage("Número da conta de origem inválido!");
          setOriginAccount(t);
        } else {
          setOriginAccount(t);
          setOriginAccountErrorMessage("");
        }
        break;

      case AccountEnum.DESTINATION:
        if (t == "" || isNaN(t) || t.length < 6) {
          setDestinationAccountErrorMessage(
            "Número da conta de destino inválido!"
          );
          setDestinationAccount(t);
        } else {
          setDestinationAccount(t);
          setDestinationAccountErrorMessage("");
        }
        break;
    }
  };

  const validateTransferValue = (t: string) => {
    const transformToDot = t.replace(",", ".");
    if (t == "" || isNaN(transformToDot)) {
      setTransferValueErrorMessage(
        "Valor da transferência inválido!"
      );
      setTransferValue(transformToDot);
    } else {
      setTransferValue(transformToDot);
      setTransferValueErrorMessage("");
    }
  };

  const validateDate = (t: string) => {
    const today_milliseconds = Date.now();
    const today_date = new Date(today_milliseconds).toISOString().split("T")[0];
    if (moment(t).isBefore(today_date)) {
      setDateErrorMessage("A data de transferência precisa ser hoje ou no futuro!");
      setSchedulingDate(t);
    } else {
      setSchedulingDate(t);
      setDateErrorMessage("");
    }
  };

  const requestTransfer = () => {
    
  }

  return (
    <Modal
      open={opened}
      onClose={() => setOpened(false)}
      dimmer="blurring"
      size="small"
    >
      <Header icon="user" content="Realizar Transferência Bancária" />
      <Modal.Content>
        <p>
          Para realizar a transferência bancária, é necessário inserir alguns
          dados:
        </p>

        {(OriginAccountErrorMessage != "" ||
          destinationAccountErrorMessage != "" ||
          transferValueErrorMessage != "" ||
          dateErrorMessage != "") && (
          <Message
            error
            header="Preencha o formulário corretamente:"
            content={
              <p>
                {OriginAccountErrorMessage != "" && (
                  <>
                    <span>- {OriginAccountErrorMessage}</span>
                    <br />
                  </>
                )}
                {destinationAccountErrorMessage != "" && (
                  <>
                    <span>- {destinationAccountErrorMessage}</span>
                    <br />
                  </>
                )}
                {transferValueErrorMessage != "" && (
                  <>
                    <span>- {transferValueErrorMessage}</span>
                    <br />
                  </>
                )}
                {dateErrorMessage != "" && (
                  <>
                    <span>- {dateErrorMessage}</span>
                    <br />
                  </>
                )}
              </p>
            }
          />
        )}

        <Form>
          <Form.Group>
            <Form.Input
              required
              label="Conta de Origem"
              placeholder="Número da Conta de Origem"
              width={8}
              type="number"
              onChange={(t) =>
                validateAccountNumber(t.target.value, AccountEnum.ORIGIN)
              }
              error={OriginAccountErrorMessage != ""}
              value={originAccount}
            />
            <Form.Input
              required
              label="Conta de Destino"
              placeholder="Número da Conta de Destino"
              width={8}
              type="number"
              onChange={(t) =>
                validateAccountNumber(t.target.value, AccountEnum.DESTINATION)
              }
              error={destinationAccountErrorMessage != ""}
              value={destinationAccount}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              required
              label="Valor"
              placeholder="Valor da Transferência"
              width={8}
              type="number"
              onChange={(t) => validateTransferValue(t.target.value)}
              error={transferValueErrorMessage != ""}
              value={transferValue}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              required
              label="Data da Transferência"
              placeholder="Data da Transferência"
              width={8}
              type="date"
              onChange={(t) => validateDate(t.target.value)}
              error={dateErrorMessage != ""}
              value={schedulingDate}
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpened(false)}>
          <Icon name="remove" /> Sair
        </Button>
        <Button color="green" onClick={null}>
          <Icon name="dollar sign" /> Transferir
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalTransfer;
