// src/animations/hero.ts
import { gsap, reducedMotion } from "./gsap-core";

export function initHero() {
  if (typeof window === "undefined") return;

  // Animasi masuk
  if (!reducedMotion) {
    gsap.from(".hello-bar", { y: -14, opacity: 0, duration: 0.8, ease: "power3.out" });
    gsap.from(".headline", { y: 20, opacity: 0, duration: 1.0, delay: 0.1, ease: "power3.out" });
    gsap.from(".subtext",  { y: 14, opacity: 0, duration: 0.9, delay: 0.2, ease: "power3.out" });
    gsap.from(".cta-row",  { y: 12, opacity: 0, duration: 0.9, delay: 0.3, ease: "power3.out" });
    gsap.from(".portrait-wrap", { y: 24, opacity: 0, duration: 1.0, delay: 0.2, ease: "power3.out" });
  }

  // Parallax kecil saat mouse gerak (optional; kalau sudah punya versi JS-mu, skip bagian ini)
  const wrap = document.getElementById("portrait-wrap");
  if (!wrap || reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  const img = wrap.querySelector<HTMLImageElement>(".hero-portrait");
  if (!img) return;

  const MAX_TX = 12, MAX_TY = 10, MAX_RX = 6, MAX_RY = 6;

  let rect: DOMRect;
  const to = { x: 0, y: 0, rx: 0, ry: 0 };

  const tween = gsap.to(img, {
    x: () => to.x, y: () => to.y,
    rotateX: () => to.rx, rotateY: () => to.ry,
    ease: "expo.out", duration: 0.5, paused: true
  });

  function onEnter() {
    rect = wrap.getBoundingClientRect();
    wrap.classList.add("is-hover");
  }
  function onMove(e: MouseEvent) {
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    to.x = x * 2 * MAX_TX;
    to.y = y * 2 * MAX_TY;
    to.ry = x * 2 * MAX_RY;
    to.rx = -y * 2 * MAX_RX;
    tween.play(); // update target, animasi halus
  }
  function onLeave() {
    wrap.classList.remove("is-hover");
    gsap.to(img, { x: 0, y: 0, rotateX: 0, rotateY: 0, ease: "power2.out", duration: 0.4 });
  }

  wrap.addEventListener("mouseenter", onEnter);
  wrap.addEventListener("mousemove", onMove);
  wrap.addEventListener("mouseleave", onLeave);
}
