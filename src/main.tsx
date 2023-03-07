import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom/client";
import { getEnvironment } from "./api/environment";
import App from "./App.js";
import "./main.css";

if (getEnvironment() === "development") {
  Sentry.init({
    dsn: "https://28a8206a1e7e4fa8b51b90445d099594@sentry.gc.nav.no/141",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.1,
  });
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);