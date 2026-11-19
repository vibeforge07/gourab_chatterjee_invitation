import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function ogPlugin() {
  return {
    name: "vite-og-meta",
    transformIndexHtml(html) {
      const siteRaw = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
      const site = siteRaw.replace(/\/+$/, "");

      let hash = "preview";
      const ogPath = path.resolve(__dirname, "public/assets/og-preview.jpg");
      if (fs.existsSync(ogPath)) {
        const buf = fs.readFileSync(ogPath);
        hash = crypto.createHash("md5").update(buf).digest("hex").slice(0, 8);
      }

      const imgUrl = site ? `${site}/assets/og-preview.jpg?v=${hash}` : `/assets/og-preview.jpg?v=${hash}`;

      let transformed = html.replaceAll('content="/assets/og-preview.jpg"', `content="${imgUrl}"`);

      if (site && !transformed.includes('property="og:url"')) {
        transformed = transformed.replace('</head>', `  <meta property="og:url" content="${site}/">\n</head>`);
      }
      return transformed;
    },
  };
}

export default defineConfig({
  plugins: [react(), ogPlugin()],
  base: "/",
});
