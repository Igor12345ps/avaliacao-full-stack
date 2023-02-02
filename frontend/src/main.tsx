import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TransfersProvider } from "./context/TransfersContext";
import Home from "./routes/Home/Home";
import Accounts from "./routes/Accounts/Accounts";
import Error from "./routes/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/accounts", element: <Accounts /> },
      { path: "/*", element: <Error /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <TransfersProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </TransfersProvider>
  </>
);
