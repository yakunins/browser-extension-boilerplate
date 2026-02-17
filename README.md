# Browser Extension Boilerplate

A cross-browser extension starter template with **synchronized state across all entry points**: content, newtab, options, popup, service worker. Built with React, MobX, TypeScript, and Webpack.

## State Propagation

Each entry point runs in its own context with its own MobX store instance. State stays in sync across all of them through Chrome Storage API:

```
 User changes a setting in any entry point
                  |
                  ↓
 ┌──────────────────────────────┐
 │  MobX Store (local context)  │──→ UI re-renders locally
 └──────────────┬───────────────┘
                ↓
 ┌──────────────────────────────┐
 │  chrome.storage.sync.set()   │   (debounced write)
 └──────────────┬───────────────┘
                ↓
 ┌──────────────────────────────┐
 │  chrome.storage.onChanged    │   (fired by browser)
 └──┬───────────┬───────────┬───┘
    v           ↓           ↓
 New Tab     Popup      Options     (across all browsers/tabs)
  Store       Store       Store
    |           |           |
    ↓           ↓           ↓
 UI update   UI update   UI update
```

Changing a setting in the popup reflects on the new tab page and options page, and vice versa — no manual messaging or ports needed.

## Features

- Multi-target build for **Chrome** and **Firefox** (manifest v3)
- 5 entry points: new tab, popup, options page, background service worker, content script
- MobX state management with Chrome Storage sync
- React Aria Components for accessibility
- Jest testing with ESM support
- Prettier code formatting

## Getting Started

```bash
# Install dependencies
npm install

# Development build with watch
npm run watch

# Production build (Chrome + Firefox)
npm run build

# Run tests
npm test

# Format code
npm run style
```

## Loading the Extension

### Chrome

1. Run `npm run build`
2. Open `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist/chrome` folder

### Firefox

1. Run `npm run build`
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select any file in the `dist/firefox` folder

## Project Structure

```
src/
  components/         # Page-level components (NewTabApp, PopupApp, OptionsApp)
  components-shared/  # Reusable UI primitives (Checkbox, Radio, Slider, Icon)
  hooks/              # Custom React hooks (useSize, usePosition)
  stores/             # MobX stores with Chrome Storage sync
  __tests__/          # Jest tests
  newtab.tsx          # New tab entry point
  popup.tsx           # Popup entry point
  options.tsx         # Options page entry point
  background.ts       # Background service worker
  content.ts          # Content script
public/               # HTML templates, manifests, icons
webpack/              # Webpack configurations
```

## License

MIT
