import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";

import "./index.css";
import "./interceptors/axios.interceptor";

import App from "./App";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
    />
  </StrictMode>
);