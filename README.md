# Chrome Extension Boilerplate — React + TS + Tailwind v3 + Vite

Manifest V3 Chrome extension starter with a popup, background service worker,
and content script, all sharing one build pipeline.

## Stack

- **React 18** + **TypeScript**
- **Tailwind CSS v3**
- **Vite** + **@crxjs/vite-plugin** (handles MV3 manifest, HMR for the popup, and bundling the service worker / content script correctly)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Then in Chrome:
1. Go to `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `dist` folder that Vite generates

With the dev server running, popup changes hot-reload. Background/content
script changes require clicking the refresh icon on the extension card in
`chrome://extensions` (and reloading the target page for content scripts).

## Production build

```bash
npm run build
```

Output goes to `dist/` — load that folder the same way via **Load unpacked**,
or zip it for the Chrome Web Store.

## Project structure

```
manifest.json           # MV3 manifest (referenced by vite.config.ts)
src/
  popup/                # Toolbar popup UI (React)
    index.html
    main.tsx
    Popup.tsx
  background/
    index.ts            # MV3 service worker
  content/
    index.ts            # Content script injected into pages
  index.css             # Tailwind directives
public/icons/           # Extension icons (16/48/128px placeholders included)
```

## Notes

- `manifest.json` currently requests `storage`, `activeTab`, `scripting`, and
  `<all_urls>` host permissions — trim these to what you actually need before
  publishing.
- The content script matches `<all_urls>`; narrow `matches` in
  `manifest.json` to specific sites if you don't need it everywhere.
- Icons in `public/icons/` are placeholder circles — swap them for real
  artwork before shipping.
- The popup, background, and content script can talk to each other via
  `chrome.runtime.sendMessage` / `chrome.tabs.sendMessage` — see the
  `pingContentScript` example in `Popup.tsx`.
