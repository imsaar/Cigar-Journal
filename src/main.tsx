import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
import { initDb } from "./lib/db";

// Initialize the database before rendering
initDb().then(() => {
  TempoDevtools.init();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
});

const basename = import.meta.env.BASE_URL;

// Root element rendering is now handled in the initDb().then() callback
