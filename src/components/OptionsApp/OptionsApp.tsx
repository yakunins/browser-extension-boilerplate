import React from "react";
import { observer } from "mobx-react";
import { SettingsStore } from "../../stores";
import { Radio } from "../../components-shared";
import { cx } from "../../utils";
import "./options-app.css";

const themeOptions = [
    { value: "light", children: "Light" },
    { value: "dark", children: "Dark" },
];

export const OptionsApp = observer(() => {
    const store = SettingsStore;

    return (
        <div className={cx("options-app", store.theme === "dark" && "theme-dark")}>
            <h1>Extension Options</h1>
            <Radio
                options={themeOptions}
                defaultValue={store.theme}
                onChange={(next) => store.setTheme(next as "light" | "dark")}
                legend="Theme"
            />
        </div>
    );
});
