import { storage } from './stores/storage';

declare const browser: typeof chrome;
const runtime =
    globalThis.chrome?.runtime ?? browser?.runtime;

runtime?.onInstalled.addListener((details: chrome.runtime.InstalledDetails) => {
    if (details.reason === 'install') {
        console.log('Extension installed');
    }
    if (details.reason === 'update') {
        console.log('Extension updated');
    }
});

storage().addListener((changes) => {
    if (changes.theme) {
        console.log(
            `[extension-boilerplate][background.ts] Theme changed: ${changes.theme.oldValue} → ${changes.theme.newValue}`,
        );
    }
});
