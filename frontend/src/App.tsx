import "./App.css";
import { Outlet } from "react-router-dom";
import HeaderC from "./components/Header";

function App() {
  return (
    <>
      <HeaderC />
      <Outlet />      
    </>
  );
}

export default App;
