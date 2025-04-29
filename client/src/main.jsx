import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./compenent/themecontext";
import App from "./app-a";
import Loginpage from "./pages/loginpage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
