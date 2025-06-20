import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PlayButtonScreen } from "./screens/PlayButtonScreen";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <PlayButtonScreen />
  </StrictMode>,
);
