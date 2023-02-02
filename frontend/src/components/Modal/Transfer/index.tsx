import { Button, Form, Header, Icon, Message, Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import moment from "moment";
import transfersAPI from "../../../helpers/transferRequest";
import { Transfer } from "../../../models/transfer";

type Props = {
  show: boolean;
};

const ModalTransfer = ({ show }: Props) => {
  const api = transfersAPI();

  const [opened, setOpened] = useState(false);

  const [originAccount, setOriginAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [transferValue, setTransferValue] = useState("");
  const [transferCompletionDate, setTransferCompletionDate] = useState("");
  const [schedulingDate, setSchedulingDate] = useState("");

  const [transferValueErrorMessage, setTransferValueErrorMessage] =
    useState("");

  const [OriginAccountErrorMessage, setOriginAccountErrorMessage] =
    useState("");

  const [destinationAccountErrorMessage, setDestinationAccountErrorMessage] =
    useState("");

  const [dateErrorMessage, setDateErrorMessage] = useState("");

  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

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
    setSubmitErrorMessage("");
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
    setSubmitErrorMessage("");
    const transformToDot = t.replace(",", ".");
    if (t == "" || isNaN(transformToDot)) {
      setTransferValueErrorMessage("Valor da transferência inválido!");
      setTransferValue(transformToDot);
    } else {
      setTransferValue(transformToDot);
      setTransferValueErrorMessage("");
    }
  };

  const validateDate = (t: string) => {
    setSubmitErrorMessage("");
    const today_milliseconds = Date.now();
    const today_date = new Date(today_milliseconds).toISOString().split("T")[0];
    setSchedulingDate(today_date);
    if (moment(t).isBefore(today_date)) {
      setDateErrorMessage(
        "A data de transferência precisa ser hoje ou no futuro!"
      );
      setTransferCompletionDate(t);
    } else {
      setTransferCompletionDate(t);
      setDateErrorMessage("");
    }
  };

  const requestTransfer = () => {
    if (
      OriginAccountErrorMessage == "" &&
      destinationAccountErrorMessage == "" &&
      transferValueErrorMessage == "" &&
      dateErrorMessage == ""
    ) {
      const postTransfer = async () => {
        const new_transfer: Transfer = {
          originAccount: originAccount,
          destinationAccount: destinationAccount,
          transferValue: Number(transferValue),
          transferCompletionDate: transferCompletionDate,
          schedulingDate: schedulingDate
        }
        await api.postTransference(new_transfer);
        setOpened(false);
      };
      postTransfer();
    } else {
      setSubmitErrorMessage("Os campos estão vazios!")
    }
  };

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
          dateErrorMessage != "" ||
          submitErrorMessage != "" ) && (
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
                {submitErrorMessage != "" && (
                  <>
                    <span>- {submitErrorMessage}</span>
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
              value={transferCompletionDate}
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpened(false)}>
          <Icon name="remove" /> Sair
        </Button>
        <Button color="green" onClick={requestTransfer}>
          <Icon name="dollar sign" /> Transferir
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalTransfer;
