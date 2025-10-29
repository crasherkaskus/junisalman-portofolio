// src/animations/sections.ts
import { gsap, ScrollTrigger, reducedMotion } from "./gsap-core";

export function initSections() {
  if (reducedMotion) return;

  gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // mulai saat elemen 80% viewport
        toggleActions: "play none none reverse"
      }
    });
  });
}
