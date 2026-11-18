import state, { root, $, G, params } from "./state.js";

export function initLoader() {
  const bar = $("#loaderBar");
  const gate = $("#gate");
  const gateImg = $("#gateImg");
  const video = $("#gateVideo");
  const critical = state.critical;

  let done = 0;
  critical.forEach((p) =>
    p.then(() => {
      if (bar) bar.style.setProperty("--p", ++done / critical.length);
    })
  );

  const minTime = params.has("skip") ? 0 : 1700;
  const t0 = performance.now();

  Promise.race([Promise.all(critical), new Promise((r) => setTimeout(r, 8000))]).then(() => {
    if (state.assets.opening && video) {
      if (state.assets.openingPoster) {
        if (gateImg) gateImg.src = state.assets.openingPoster;
        video.poster = state.assets.openingPoster;
        root.classList.add("has-stage-closed");
      }
    }
    // the film plays only once it is fully downloaded; until then a tap opens the gate with the still reveal
    const useFilm = () => {
      if (!video || !state.assets.openingUrl || video.getAttribute("src")) return;
      video.src = state.assets.openingUrl;
      video.load();
    };
    useFilm();
    critical[1].then(() => {
      useFilm();
      state.warmUp();
    });
    setTimeout(() => {
      root.classList.add("is-ready");
      state.layoutFoil();
      state.placeGlows();
      if (params.has("skip")) {
        state.opened = true;
        if (gate) gate.remove();
        state.lightsOn(0, true);
        state.unlock();
        state.playLoop();
        state.heroIntro(0.1);
        state.startMusic();
      } else if (G) {
        G.from(".gate__ui > *", {
          autoAlpha: 0,
          y: 24,
          filter: "blur(6px)",
          duration: 1.3,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.35,
        });
      }
      setTimeout(() => $("#loader") && $("#loader").remove(), 1200);
    }, Math.max(0, minTime - (performance.now() - t0)));
  });
}
