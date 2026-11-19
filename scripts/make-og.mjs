import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import INVITE from "../src/config.js";
import { archPath } from "../src/ornaments.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function findBrowser() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    // Windows
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "Google\\Chrome\\Application\\chrome.exe") : null,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    // macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    // Linux
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/microsoft-edge",
    "/snap/bin/chromium",
  ].filter(Boolean);

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("No Chrome or Edge executable found. Set CHROME_PATH environment variable.");
}

async function makeOg() {
  console.log("Generating WhatsApp Open Graph preview image (1200x630)...");

  // Read Inputs from site config
  const brideFirst = INVITE.couple?.bride?.first || "Shreya";
  const groomFirst = INVITE.couple?.groom?.first || "Gourab";
  const dateShort = INVITE.wedding?.short || "28 · 01 · 2027";
  const city = (INVITE.wedding?.city || "Serampore").toUpperCase();

  // Find couple photo
  const coupleCandidates = [
    path.join(rootDir, "public/assets/couple.webp"),
    path.join(rootDir, "public/assets/couple.jpg"),
    path.join(rootDir, "public/assets/couple.jpeg"),
    path.join(rootDir, "public/assets/couple.png"),
  ];
  const couplePath = coupleCandidates.find((p) => fs.existsSync(p));
  if (!couplePath) {
    throw new Error("Couple photo not found in public/assets/ (checked couple.webp, couple.jpg, etc.)");
  }
  const coupleBase64 = `data:image/webp;base64,${fs.readFileSync(couplePath).toString("base64")}`;

  // Find damask pattern
  const damaskPath = path.join(rootDir, "public/assets/damask.webp");
  let damaskCss = "";
  if (fs.existsSync(damaskPath)) {
    const damaskBase64 = `data:image/webp;base64,${fs.readFileSync(damaskPath).toString("base64")}`;
    damaskCss = `
      .damask-bg {
        position: absolute;
        inset: 0;
        background-image: url('${damaskBase64}');
        background-repeat: repeat;
        background-size: 320px;
        opacity: 0.16;
        mix-blend-mode: soft-light;
        pointer-events: none;
      }
    `;
  }

  // Arch calculations
  const archW = 360;
  const archH = 484;
  const archLeft = 420; // Exactly centered: (1200 - 360)/2 = 420
  const archTop = 100;
  const d = archPath(archW, archH);

  const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Noto+Serif+Bengali:wght@700&family=Tiro+Bangla&display=block" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 50%, #6b1120 0%, #3a0610 60%, #1c0308 100%);
      position: relative;
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }
    ${damaskCss}

    /* Gold Double Border */
    .border-outer {
      position: absolute;
      inset: 18px;
      border: 1.5px solid rgba(224, 189, 114, 0.75);
      pointer-events: none;
      z-index: 20;
    }
    .border-inner {
      position: absolute;
      inset: 25px;
      border: 1px solid rgba(224, 189, 114, 0.35);
      pointer-events: none;
      z-index: 20;
    }

    /* Central Arch Glow */
    .arch-glow {
      position: absolute;
      left: 310px;
      top: 35px;
      width: 580px;
      height: 580px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(240, 200, 120, 0.28) 0%, rgba(107, 17, 32, 0) 65%);
      pointer-events: none;
      z-index: 2;
    }

    /* Central Arch Container */
    .arch-wrap {
      position: absolute;
      left: ${archLeft}px;
      top: ${archTop}px;
      width: ${archW}px;
      height: ${archH}px;
      z-index: 5;
    }

    /* Side Columns */
    .col-left {
      position: absolute;
      left: 40px;
      top: 35px;
      bottom: 35px;
      width: 228px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      z-index: 10;
    }

    .col-right {
      position: absolute;
      left: 935px;
      top: 35px;
      bottom: 35px;
      width: 228px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      z-index: 10;
    }

    .fit-line {
      width: 100%;
      white-space: nowrap;
      text-align: center;
    }

    /* Bengali typography on Left */
    .kicker-top {
      font-family: 'Tiro Bangla', serif;
      font-size: 22px;
      line-height: 1.35;
      color: #f6e3a8;
      margin-bottom: 12px;
      text-shadow: 0 2px 6px rgba(0,0,0,0.6);
    }
    .kicker-sub {
      font-family: 'Tiro Bangla', serif;
      font-size: 20px;
      line-height: 1.35;
      color: #f6e3a8;
      margin-bottom: 14px;
      text-shadow: 0 2px 6px rgba(0,0,0,0.6);
    }

    .shuvo-biye-word {
      font-family: 'Noto Serif Bengali', serif;
      font-weight: 700;
      font-size: 96px;
      line-height: 0.95;
      background: linear-gradient(135deg, #fff7d6 0%, #f6e3a8 25%, #d4af37 50%, #aa7c11 75%, #f1d796 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 3px rgba(40, 10, 0, 0.75)) drop-shadow(0 10px 24px rgba(0, 0, 0, 0.85));
      margin-top: 2px;
    }

    /* Names and Date on Right */
    .name-line {
      font-family: 'Cinzel', serif;
      font-weight: 600;
      font-size: 46px;
      line-height: 1.1;
      color: #f3dca0;
      letter-spacing: 0.04em;
      text-shadow: 0 2px 8px rgba(0,0,0,0.7);
    }
    .amp-line {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 40px;
      line-height: 1;
      color: #e0bd72;
      margin: 2px 0 4px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.7);
    }

    .divider-gold {
      width: 140px;
      height: 14px;
      margin: 14px 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .divider-gold::before, .divider-gold::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(224, 189, 114, 0.1), rgba(224, 189, 114, 0.8));
    }
    .divider-gold::after {
      background: linear-gradient(90deg, rgba(224, 189, 114, 0.8), rgba(224, 189, 114, 0.1));
    }
    .divider-gold i {
      width: 7px;
      height: 7px;
      background: #e0bd72;
      transform: rotate(45deg);
      margin: 0 8px;
      box-shadow: 0 0 6px rgba(224, 189, 114, 0.7);
    }

    .date-line {
      font-family: 'Cinzel', serif;
      font-weight: 500;
      font-size: 28px;
      line-height: 1.2;
      color: #f3dca0;
      letter-spacing: 0.08em;
      text-shadow: 0 2px 8px rgba(0,0,0,0.7);
    }
    .city-line {
      font-family: 'Cinzel', serif;
      font-weight: 600;
      font-size: 19px;
      line-height: 1.2;
      color: #e0bd72;
      letter-spacing: 0.28em;
      margin-top: 6px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.7);
    }
  </style>
</head>
<body>
  <div class="border-outer"></div>
  <div class="border-inner"></div>
  <div class="damask-bg"></div>
  <div class="arch-glow"></div>

  <!-- Central Arch with Photo -->
  <div class="arch-wrap">
    <svg width="${archW}" height="${archH}" viewBox="0 0 ${archW} ${archH}" style="overflow: visible;">
      <defs>
        <linearGradient id="goldFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6b4a17" />
          <stop offset="12%" stop-color="#e9cd88" />
          <stop offset="24%" stop-color="#a77c33" />
          <stop offset="36%" stop-color="#fff0c2" />
          <stop offset="50%" stop-color="#b4873c" />
          <stop offset="64%" stop-color="#f1d796" />
          <stop offset="78%" stop-color="#8f6a25" />
          <stop offset="90%" stop-color="#e2c27a" />
          <stop offset="100%" stop-color="#5e4013" />
        </linearGradient>
        <radialGradient id="goldBall" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#fff6d8" />
          <stop offset="35%" stop-color="#e9c877" />
          <stop offset="75%" stop-color="#a87c34" />
          <stop offset="100%" stop-color="#5e4013" />
        </radialGradient>
        <clipPath id="archClip">
          <path d="${d}" />
        </clipPath>
        <filter id="archShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0a0103" flood-opacity="0.9" />
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.6" />
        </filter>
      </defs>

      <!-- Arch with Drop Shadow -->
      <g filter="url(#archShadow)">
        <!-- Photo clipped to arch -->
        <image href="${coupleBase64}" width="${archW}" height="${archH}" clip-path="url(#archClip)" preserveAspectRatio="xMidYMin slice" />

        <!-- 4 Strokes for carved frame -->
        <path d="${d}" fill="none" stroke="#3a2105" stroke-width="17" />
        <path d="${d}" fill="none" stroke="url(#goldFrame)" stroke-width="13" />
        <path d="${d}" fill="none" stroke="#5e0f1d" stroke-width="5" />
        <path d="${d}" fill="none" stroke="url(#goldFrame)" stroke-width="2" />

        <!-- Finial teardrop and ball at top center -->
        <g transform="translate(${archW / 2}, 0)">
          <path d="M0 -44 C7.15 -30 11.7 -14.3 0 0 C-11.7 -14.3 -7.15 -30 0 -44 Z" fill="url(#goldFrame)" stroke="#3a2105" stroke-width="1" />
          <circle cy="-52" r="5.5" fill="url(#goldBall)" stroke="#3a2105" stroke-width="0.8" />
        </g>
      </g>
    </svg>
  </div>

  <!-- Left Column (Bengali Invitation) -->
  <div class="col-left">
    <div class="fit-line kicker-top">শ্রী শ্রী</div>
    <div class="fit-line kicker-sub">প্রজাপতয়ে নমঃ</div>
    <div class="fit-line shuvo-biye-word">শুভ</div>
    <div class="fit-line shuvo-biye-word">বিবাহ</div>
  </div>

  <!-- Right Column (Names, Date, City) -->
  <div class="col-right">
    <div class="fit-line name-line">${brideFirst}</div>
    <div class="amp-line">&amp;</div>
    <div class="fit-line name-line">${groomFirst}</div>
    <div class="divider-gold"><i></i></div>
    <div class="fit-line date-line">${dateShort}</div>
    <div class="fit-line city-line">${city}</div>
  </div>

  <script>
    // Fit step: shrink text lines until they fit within column width (228px)
    document.querySelectorAll('.fit-line').forEach(el => {
      let size = parseFloat(window.getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth && size > 14) {
        size -= 1;
        el.style.fontSize = size + 'px';
      }
    });
    document.body.dataset.fitted = "1";
  </script>
</body>
</html>`;

  // Write temporary HTML file
  const tempHtmlPath = path.join(os.tmpdir(), `og-preview-${Date.now()}.html`);
  fs.writeFileSync(tempHtmlPath, htmlContent, "utf-8");

  // Launch browser with puppeteer-core
  const browserPath = findBrowser();
  console.log("Using browser at:", browserPath);

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.goto(`file://${tempHtmlPath}`, { waitUntil: "networkidle0" });

    // Wait for fonts and fitting step to finish
    await page.waitForFunction(() => {
      return document.fonts.ready.then(() => document.body.dataset.fitted === "1");
    });

    // Save as JPEG quality 86 to public/assets/og-preview.jpg
    const outPath = path.join(rootDir, "public/assets/og-preview.jpg");
    await page.screenshot({
      path: outPath,
      type: "jpeg",
      quality: 86,
    });

    const stats = fs.statSync(outPath);
    const kb = (stats.size / 1024).toFixed(1);
    console.log(`Saved ${outPath} (${kb} KB)`);

    if (stats.size > 300 * 1024) {
      console.warn(`WARNING: og-preview.jpg is ${kb} KB (exceeds 300 KB limit for WhatsApp!). Reducing quality...`);
      await page.screenshot({
        path: outPath,
        type: "jpeg",
        quality: 78,
      });
      const newStats = fs.statSync(outPath);
      console.log(`Re-saved at lower quality: ${(newStats.size / 1024).toFixed(1)} KB`);
    }
  } finally {
    await browser.close();
    try {
      if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
    } catch {}
  }
}

makeOg().catch((err) => {
  console.error("make-og failed:", err);
  process.exit(1);
});
