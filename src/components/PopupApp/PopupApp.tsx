import React from "react";
import { observer } from "mobx-react";
import { SettingsStore } from "../../stores";
import { Radio } from "../../components-shared";
import { cx } from "../../utils";
import "./popup-app.css";

const themeOptions = [
    { value: "light", children: "Light" },
    { value: "dark", children: "Dark" },
];

export const PopupApp = observer(() => {
    const store = SettingsStore;

    return (
        <div className={cx("popup-app", store.theme === "dark" && "theme-dark")}>
            <h2>Extension Popup</h2>
            <Radio
                options={themeOptions}
                defaultValue={store.theme}
                onChange={(next) => store.set("theme", next as "light" | "dark")}
                legend="Theme"
            />
        </div>
    );
});
