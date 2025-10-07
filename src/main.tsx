import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppWithAudio from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithAudio />
  </StrictMode>
);
