import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // asegúrate de que existe (puede estar vacío o con Tailwind)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

