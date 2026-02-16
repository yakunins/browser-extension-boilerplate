import { storage } from './stores/storage';

storage().addListener((changes) => {
    if (changes.theme) {
        console.log(
            `[extension-boilerplate][content.ts] Theme changed: ${changes.theme.oldValue} → ${changes.theme.newValue}`,
        );
    }
});
