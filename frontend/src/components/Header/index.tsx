import { Container, Menu } from "semantic-ui-react";

const HeaderC = () => {
  return (
    <Menu fixed="top" inverted borderless>
      <Container>
        <Menu.Item as="p" header>
          Agendamento de Transferências
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as="a">Transferências</Menu.Item>
          <Menu.Item as="a">Contas</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default HeaderC;
