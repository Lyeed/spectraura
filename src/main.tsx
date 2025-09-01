import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "node_modules/modern-normalize/modern-normalize.css";
import { App } from "./components/App";
import "./styles/style.css";
import "./styles/Toggle.css";
import "./styles/Button.css";
import { AppProvider } from "./contexts/AppContext";

const element = document.getElementById("root");
if (!element) {
    throw new Error("Could not find #root element");
}

const root = createRoot(element);

root.render(
    <AppProvider>
        <App />
    </AppProvider>
);
