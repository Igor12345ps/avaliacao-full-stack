import "./style.css";
import { Link } from "react-router-dom";

const Error = () => {

  return (
    <div className="w-full h-screen pt-11 flex justify-center items-center">
      <div className="text-center">
        <h1>Erro!</h1>
        <h3>
          Essa rota não existe, ir para a <Link to="/">Home</Link>
        </h3>
      </div>
    </div>
  );
};

export default Error;
