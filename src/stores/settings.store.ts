import { makeObservable, observable, action } from "mobx";
import {
    storage as getStorage,
    StorageChangeHandler,
    Changes,
    Namespace,
} from "./storage";

type Settings = {
    theme: "light" | "dark";
};

export type SettingsStore = Settings & {
    handleStorageChange: StorageChangeHandler;
    setTheme: (val: Settings["theme"]) => void;
};

const config = {
    storageDebouncePeriod: 250,
};

const initial: Settings = {
    theme: "light",
};

class ExtensionSettingsStore implements SettingsStore {
    theme = initial.theme;

    storage = getStorage(config.storageDebouncePeriod);

    constructor() {
        makeObservable(this, {
            theme: observable,
            setTheme: action.bound,
        });

        this.storage
            .get({ theme: this.theme })
            .then((res) => this.setTheme(res, false));

        this.storage.addListener(this.handleStorageChange.bind(this));
    }

    handleStorageChange(changes: Changes, _namespace: Namespace) {
        for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
            if (oldValue === newValue) continue;
            if (key === "theme") this.setTheme(newValue as any, false);
        }
    }

    setTheme(val: Settings["theme"], useStorage = true) {
        if (this.theme === val) return;
        this.theme = val;
        if (useStorage) this.storage.debouncedSet({ theme: this.theme });
    }
}

export const SettingsStore = new ExtensionSettingsStore();
