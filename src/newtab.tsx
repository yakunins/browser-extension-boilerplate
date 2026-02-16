import React from "react";
import { createRoot } from "react-dom/client";
import { NewTabApp } from "./components";
import "./global.css";

const element = document.getElementById("root");
if (!element) throw new Error("Root element not found");
const root = createRoot(element);
root.render(
    <React.StrictMode>
        <NewTabApp />
    </React.StrictMode>
);
