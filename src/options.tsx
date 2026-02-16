import React from "react";
import { createRoot } from "react-dom/client";
import { OptionsApp } from "./components";
import "./global.css";

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <OptionsApp />
    </React.StrictMode>
);
