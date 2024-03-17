import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../assets/main.css";
import ContextWrapper from "./components/hooks/ContextWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal';

Modal.setAppElement('#root');

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
      <ToastContainer />
    </ContextWrapper>
  </React.StrictMode>
);
