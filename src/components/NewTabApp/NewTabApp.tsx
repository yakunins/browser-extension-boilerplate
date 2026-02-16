import React from 'react';
import { observer } from 'mobx-react';
import { SettingsStore } from '../../stores';
import { Radio } from '../../components-shared';
import { cx } from '../../utils';
import './newtab-app.css';

const themeOptions = [
    { value: 'light', children: 'Light' },
    { value: 'dark', children: 'Dark' },
];

export const NewTabApp = observer(() => {
    const store = SettingsStore;

    return (
        <div
            className={cx('newtab-app', store.theme === 'dark' && 'theme-dark')}
        >
            <h1>New Tab</h1>
            <p>
                This is a browser extension boilerplate built with React, MobX,
                and TypeScript.
            </p>
            <Radio
                options={themeOptions}
                defaultValue={store.theme}
                onChange={(next) =>
                    store.set('theme', next as 'light' | 'dark')
                }
                legend="Theme"
            />
        </div>
    );
});
