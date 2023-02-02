import { Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";

type Props = {
  show: boolean;
}

const ModalC = ({show}: Props) => {
  const [opened, setOpened] = useState(false);

  useEffect(()=>{
    if(show == true){
      setOpened(true);
    }
  },[show]);

  return (
    <Modal
      open={opened}
      onClose={() => setOpened(false)}
      header="Reminder!"
      content="Call Benjamin regarding the reports."
      actions={["Snooze", { key: "done", content: "Done", positive: true }]}
    />
  );
};

export default ModalC;
