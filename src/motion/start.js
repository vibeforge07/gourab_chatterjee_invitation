import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initWords } from "./words.js";
import { initPetals } from "./petals.js";
import { initArtwork } from "./artwork.js";
import { initSmooth } from "./smooth.js";
import { initHero } from "./hero.js";
import { initGate } from "./gate.js";
import { initLoader } from "./loader.js";
import { initEverywhere } from "./everywhere.js";
import { initScenes } from "./scenes.js";
import { initScratch } from "./scratch.js";
import { initCountdown } from "./countdown.js";
import { initShare } from "./share.js";

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== "undefined") {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

export function startSite() {
  initWords();
  initPetals();
  initArtwork();
  initSmooth();
  initHero();
  initGate();
  initLoader();
  initEverywhere();
  initScenes();
  initScratch();
  initCountdown();
  initShare();
}
