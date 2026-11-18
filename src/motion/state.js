import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import C from "../config.js";
import * as Ornaments from "../ornaments.js";

const root = document.documentElement;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;
const portrait = innerWidth / innerHeight < 0.9;
const orient = portrait ? "tall" : "wide";
const other = portrait ? "wide" : "tall";
const params = new URLSearchParams(location.search);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const enc = encodeURIComponent;
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c])
  );
const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${enc(q)}`;
const G = gsap;
const lite = !fine || innerWidth <= 760;

const state = {
  C,
  root,
  $,
  $$,
  reduced,
  fine,
  portrait,
  orient,
  other,
  params,
  clamp,
  enc,
  esc,
  mapsLink,
  G,
  lite,
  Ornaments,
  assets: {},
  critical: [],
  fields: {},
  cardPages: {},
  tlItems: [],
  names: [],
  layoutFoil: () => {},
  placeGlows: () => {},
  findImage: null,
  findVideo: null,
  setVar: null,
  pickStage: null,
  buildSeam: null,
  Petals: null,
  lenis: null,
  unlocked: false,
  unlock: () => {},
  heroOn: true,
  opened: false,
  musicStarted: false,
  playLoop: () => {},
  lightsOn: () => {},
  heroIntro: () => {},
  heroBurst: () => {},
  askTilt: () => {},
  openGate: () => {},
  startMusic: () => {},
  toggleMusic: () => {},
  tapfx: null,
  bellSets: [],
  decos: [],
  everywhere: () => {},
};

export default state;
export {
  C,
  root,
  $,
  $$,
  reduced,
  fine,
  portrait,
  orient,
  other,
  params,
  clamp,
  enc,
  esc,
  mapsLink,
  G,
  lite,
  Ornaments,
  state,
};
