import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" with { type: "json" };

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    // Required so the extension's service worker / content scripts
    // can reach the Vite dev server during `npm run dev`.
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
