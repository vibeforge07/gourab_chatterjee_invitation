/*
  Card ornaments, drawn to fit whatever box they sit in and redrawn on resize:
  - [data-arch]   cusped (multifoil) Mughal arch with a carved gold frame; .arch__inner is clipped to it
  - [data-bells]  strings of gold beads, a small lotus and a bell, swaying
  - .card-edge    gold double border of a printed card, with corner filigree
*/
const f = (n) => Math.round(n * 10) / 10;
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const bez = (P, t) => {
  const u = 1 - t;
  return [0, 1].map((i) => u * u * u * P[0][i] + 3 * u * u * t * P[1][i] + 3 * u * t * t * P[2][i] + t * t * t * P[3][i]);
};

/* ---------- the arch outline ---------- */
export function archPath(w, h, o = {}) {
  const lobes = o.lobes || (w < 300 ? 2 : 3);
  const s = Math.min(w * (o.spring || 0.5), h * 0.62); // height of the arched top
  const qx = w * (o.qx || 0.36);
  const qy = s * 0.22;
  // shoulder envelope from the springer (0, s) up to Q, where the crown starts
  const P = [[0, s], [0, s * 0.45], [qx * 0.4, qy * 1.08], [qx, qy]];
  const N = 96;
  const pts = [];
  const len = [0];
  for (let i = 0; i <= N; i++) {
    pts.push(bez(P, i / N));
    if (i) len.push(len[i - 1] + dist(pts[i], pts[i - 1]));
  }
  const at = (L) => {
    let i = 1;
    while (i < N && len[i] < L) i++;
    const k = (L - len[i - 1]) / (len[i] - len[i - 1] || 1);
    return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k];
  };
  const weights = lobes === 2 ? [1, 1.3] : [1, 1.12, 1.3];
  const sum = weights.reduce((a, b) => a + b, 0);
  const left = [[0, s]];
  let acc = 0;
  weights.forEach((wt, i) => {
    acc += wt / sum;
    left.push(i === weights.length - 1 ? [qx, qy] : at(acc * len[N]));
  });
  const ax = w / 2;
  const half = ax - qx;
  const c1 = [qx + half * 0.06, qy * -0.05];
  const c2 = [ax - half * 0.34, qy * 0.32];
  const m = (p) => [w - p[0], p[1]];
  const arc = (from, to) => {
    const r = dist(from, to) * 0.6;
    return ` A${f(r)} ${f(r)} 0 0 1 ${f(to[0])} ${f(to[1])}`;
  };
  let d = `M0 ${f(h)} L0 ${f(s)}`;
  for (let i = 1; i < left.length; i++) d += arc(left[i - 1], left[i]);
  d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(ax)} 0`;
  const mc2 = m(c2);
  const mc1 = m(c1);
  const q2 = m(left[left.length - 1]);
  d += ` C${f(mc2[0])} ${f(mc2[1])} ${f(mc1[0])} ${f(mc1[1])} ${f(q2[0])} ${f(q2[1])}`;
  for (let i = left.length - 1; i > 0; i--) d += arc(m(left[i]), m(left[i - 1]));
  d += ` L${f(w)} ${f(h)} Z`;
  return d;
}

/* ---------- arches ---------- */
const SVGNS = "http://www.w3.org/2000/svg";
function drawArch(el) {
  const w = el.clientWidth;
  const h = el.clientHeight;
  if (!w || !h) return;
  const key = `${w}x${h}`;
  if (el._archKey === key) return;
  el._archKey = key;
  const o = {
    lobes: +el.dataset.lobes || undefined,
    spring: +el.dataset.spring || undefined,
    qx: +el.dataset.qx || undefined,
  };
  const band = clampN(w * 0.016, 7, 15);
  const gap = band * 1.15;
  const d = archPath(w, h, o);
  const outer = archPath(w + gap * 2, h + gap, o);
  const pad = band * 3 + 46;
  let svg = el.querySelector(":scope > .arch__frame");
  if (!svg) {
    svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("class", "arch__frame");
    svg.setAttribute("aria-hidden", "true");
    el.appendChild(svg);
  }
  svg.setAttribute("viewBox", `${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`);
  svg.style.inset = `${-pad}px`;
  svg.innerHTML =
    `<g filter="url(#bevel)">` +
    `<path d="${outer}" transform="translate(${-gap} ${-gap})" fill="none" stroke="#3a2105" stroke-width="${f(band * 0.42)}"/>` +
    `<path d="${outer}" transform="translate(${-gap} ${-gap})" fill="none" stroke="url(#goldFrame)" stroke-width="${f(band * 0.24)}"/>` +
    `<path d="${d}" fill="none" stroke="#3a2105" stroke-width="${f(band + 3)}"/>` +
    `<path d="${d}" fill="none" stroke="url(#goldFrame)" stroke-width="${f(band)}"/>` +
    `<path d="${d}" fill="none" stroke="#5e0f1d" stroke-width="${f(band * 0.42)}"/>` +
    `<path d="${d}" fill="none" stroke="url(#goldFrame)" stroke-width="${f(band * 0.17)}"/>` +
    `</g>` +
    `<g transform="translate(${f(w / 2)} ${f(-gap)})" filter="url(#bevel)">` +
    `<path d="M0 ${f(-band * 3.4)} C${f(band * 0.55)} ${f(-band * 2.3)} ${f(band * 0.9)} ${f(-band * 1.1)} 0 0 C${f(-band * 0.9)} ${f(-band * 1.1)} ${f(-band * 0.55)} ${f(-band * 2.3)} 0 ${f(-band * 3.4)}Z" fill="url(#goldFrame)" stroke="#3a2105" stroke-width="1"/>` +
    `<circle cy="${f(-band * 4)}" r="${f(band * 0.42)}" fill="url(#goldBall)" stroke="#3a2105" stroke-width=".8"/>` +
    `</g>`;
  const inner = el.querySelector(":scope > .arch__inner");
  if (inner) inner.style.clipPath = `path("${d}")`;
}
const clampN = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- bells ---------- */
const PATTERN = [0.64, 1, 0.8, 0.93, 0.7, 0.86];
function drawBells(el) {
  const n = +el.dataset.bells || 4;
  const H = el.clientHeight;
  if (!H) return;
  const key = `${n}x${H}`;
  if (el._bellKey === key) return;
  el._bellKey = key;
  const gap = clampN(H * 0.13, 21, 36);
  const W = n * gap;
  const scale = clampN(H / 240, 0.85, 1.45);
  let g = "";
  for (let i = 0; i < n; i++) {
    const x = gap / 2 + i * gap;
    const L = H * PATTERN[(i + (+el.dataset.shift || 0)) % PATTERN.length] - 34 * scale;
    const lotusY = L * 0.52;
    let beads = "";
    for (let y = 9, j = 0; y < L - 4; y += 7 * scale, j++) {
      if (Math.abs(y - lotusY) < 10 * scale) continue;
      beads += `<circle cy="${f(y)}" r="${f((j % 2 ? 1.5 : 2.4) * scale)}" fill="url(#goldBall)"/>`;
    }
    g +=
      `<g transform="translate(${f(x)} 0)"><g class="bell" style="--sw:${(3.2 + (i % 3) * 0.7).toFixed(1)}s;--dl:${(-i * 0.9).toFixed(1)}s">` +
      `<circle cy="${f(3 * scale)}" r="${f(2.6 * scale)}" fill="none" stroke="url(#goldFrame)" stroke-width="${f(1.3 * scale)}"/>` +
      `<path d="M0 ${f(6 * scale)}V${f(L)}" stroke="#6e4d19" stroke-width="${f(0.8 * scale)}"/>` +
      beads +
      `<use href="#lotusSm" x="${f(-9 * scale)}" y="${f(lotusY - 7 * scale)}" width="${f(18 * scale)}" height="${f(13 * scale)}"/>` +
      `<use href="#bell" x="${f(-11 * scale)}" y="${f(L - 2 * scale)}" width="${f(22 * scale)}" height="${f(30 * scale)}"/>` +
      `</g></g>`;
  }
  el.innerHTML = `<svg viewBox="0 0 ${f(W)} ${f(H)}" width="${f(W)}" height="${f(H)}" aria-hidden="true">${g}</svg>`;
}

/* ---------- card edge corners ---------- */
function drawEdge(el) {
  if (el.childElementCount) return;
  ["tl", "tr", "bl", "br"].forEach((c) => {
    el.insertAdjacentHTML("beforeend", `<svg class="card-edge__c card-edge__c--${c}" aria-hidden="true"><use href="#corner"/></svg>`);
  });
}

const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver((entries) =>
  entries.forEach((e) => {
    const t = e.target;
    if (t.hasAttribute("data-arch")) drawArch(t);
    if (t.hasAttribute("data-bells")) drawBells(t);
  })
) : null;

export function mount(root = document) {
  root.querySelectorAll("[data-arch]").forEach((el) => {
    drawArch(el);
    if (ro) ro.observe(el);
  });
  root.querySelectorAll("[data-bells]").forEach((el) => {
    drawBells(el);
    if (ro) ro.observe(el);
  });
  root.querySelectorAll(".card-edge").forEach(drawEdge);
}

if (typeof window !== "undefined") {
  window.Ornaments = { archPath, mount };
}
