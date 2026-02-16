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
    set: <K extends keyof Settings>(key: K, val: Settings[K]) => void;
};

const config = {
    storageDebouncePeriod: 250,
};

const initial: Settings = {
    theme: "light",
};

function buildAnnotations(defaults: Record<string, unknown>) {
    const annotations: Record<string, typeof observable | typeof action.bound> = {};
    for (const key of Object.keys(defaults)) {
        annotations[key] = observable;
    }
    annotations["set"] = action.bound;
    return annotations;
}

class ExtensionSettingsStore implements SettingsStore {
    theme = initial.theme;

    storage = getStorage(config.storageDebouncePeriod);

    constructor() {
        makeObservable(this, buildAnnotations(initial));

        this.storage
            .getAll(initial)
            .then((res) => {
                for (const key of Object.keys(res)) {
                    this.set(key as keyof Settings, res[key as keyof Settings], false);
                }
            });

        this.storage.addListener(this.handleStorageChange.bind(this));
    }

    handleStorageChange(changes: Changes, _namespace: Namespace) {
        for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
            if (oldValue === newValue) continue;
            if (key in initial) {
                this.set(key as keyof Settings, newValue as Settings[keyof Settings], false);
            }
        }
    }

    set<K extends keyof Settings>(key: K, val: Settings[K], useStorage = true) {
        if (this[key] === val) return;
        this[key] = val;
        if (useStorage) this.storage.debouncedSet({ [key]: val });
    }
}

export const SettingsStore = new ExtensionSettingsStore();
