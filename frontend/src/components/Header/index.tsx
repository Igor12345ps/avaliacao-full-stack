import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

const HeaderC = () => {
  return (
    <Menu fixed="top" inverted borderless className="shadow-black !shadow-2xl">
      <Container>
        <Menu.Item header>
          <Link to="/">Agendamento de Transferências</Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/">Transferências</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/accounts">Contas</Link>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default HeaderC;
