# Browser Extension Boilerplate

A cross-browser extension starter template built with **React 19**, **MobX**, **TypeScript**, and **Webpack 5**.

## Features

- Multi-target build for **Chrome** and **Firefox** (manifest v3)
- 4 entry points: new tab, popup, options page, background service worker
- MobX state management with Chrome Storage sync
- React Aria Components for accessibility
- Jest testing with ESM support
- Prettier code formatting
- GitHub Actions CI (Node 18/20/22)

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
  components/         # Page-level components (App, PopupApp, OptionsApp)
  components-shared/  # Reusable UI primitives (Checkbox, Radio, Slider, Icon)
  hooks/              # Custom React hooks (useSize, usePosition)
  stores/             # MobX stores with Chrome Storage sync
  __tests__/          # Jest tests
  newtab.tsx          # New tab entry point
  popup.tsx           # Popup entry point
  options.tsx         # Options page entry point
  background.ts       # Background service worker
public/               # HTML templates, manifests, icons
webpack/              # Webpack configurations
```

## License

MIT
