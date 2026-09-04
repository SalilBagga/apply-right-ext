import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Font } from "@react-pdf/renderer";

// Font registration — must run before any Document using FONT_FAMILY is
// rendered. Importing this module (directly, or transitively via index.ts)
// triggers Font.register() as a side effect at module load, matching the
// "register once, up front" pattern react-pdf expects.
//
// Font files are bundled locally under ./assets/fonts and loaded as base64
// data: URLs rather than fetched from a CDN or referenced by filesystem
// path. @react-pdf/font resolves every `src` via the global `fetch()`, and
// `data:` URLs are the one source scheme that's guaranteed to resolve
// synchronously in-process on every platform — no network call, no
// Node-version-dependent `file://` support, no Windows-path-as-URL
// edge cases. This keeps PDF generation fully offline.
//
// To swap the typeface later: replace the two .ttf files in ./assets/fonts
// and update the two filenames referenced below.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.join(__dirname, "assets", "fonts");

function loadFontAsDataUrl(filename: string): string {
  const bytes = readFileSync(path.join(FONTS_DIR, filename));
  return `data:font/ttf;base64,${bytes.toString("base64")}`;
}

export const FONT_FAMILY = "Inter";

Font.register({
  family: FONT_FAMILY,
  fonts: [
    { src: loadFontAsDataUrl("Inter-Regular.ttf"), fontWeight: "normal" },
    { src: loadFontAsDataUrl("Inter-Bold.ttf"), fontWeight: "bold" },
  ],
});

// Short-form documents (letters, resumes) don't benefit from hyphenation,
// and react-pdf's default hyphenation engine assumes English dictionary
// rules that aren't always desirable. Disabling it keeps word-wrapping
// predictable.
Font.registerHyphenationCallback((word) => [word]);
