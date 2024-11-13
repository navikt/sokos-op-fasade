import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./main.css";
import { initGrafanaFaro } from "./utils/grafanaFaro";

if (window.location.hostname !== "localhost") initGrafanaFaro();

const startMsw = async () => {
  if (import.meta.env.MODE === "mock") {
    try {
      const { worker } = await import("../mock/browser");
      await worker.start();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to start MSW", error);
    }
  }
};

startMsw().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
});
