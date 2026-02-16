import React from 'react';
import { observer } from 'mobx-react';
import { SettingsStore } from '../../stores';
import { Radio } from '../../components-shared';
import { cx } from '../../utils';
import './popup-app.css';

function parseAuthor(author: string) {
    const match = author.match(/^(.+?)\s*<(.+?)>$/);
    return match
        ? { name: match[1], email: match[2] }
        : { name: author, email: '' };
}

const author = parseAuthor(__APP_AUTHOR__);

const themeOptions = [
    { value: 'light', children: 'Light' },
    { value: 'dark', children: 'Dark' },
];

export const PopupApp = observer(() => {
    const store = SettingsStore;

    return (
        <div
            className={cx('popup-app', store.theme === 'dark' && 'theme-dark')}
        >
            <h2>Extension Popup</h2>
            <Radio
                options={themeOptions}
                defaultValue={store.theme}
                onChange={(next) =>
                    store.set('theme', next as 'light' | 'dark')
                }
                legend="Theme"
            />
            <hr />
            <p className="copy-info">
                v{__APP_VERSION__} · {__APP_YEAR__} ·{' '}
                {author.email ? (
                    <a href={`mailto:${author.email}`}>{author.name}</a>
                ) : (
                    author.name
                )}
            </p>
        </div>
    );
});
