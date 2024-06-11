import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import { initializeIcons } from "@fluentui/react";
import { BrowserRouter } from "react-router-dom";

initializeIcons();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
