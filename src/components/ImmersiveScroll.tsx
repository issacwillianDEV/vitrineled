"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImmersiveScroll() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>("main section");
    if (!sections.length) return;

    sections.forEach((section) => section.setAttribute("data-immersive", "true"));
    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        const content =
          section.querySelector<HTMLElement>("[data-immersive-content]") ??
          section.querySelector<HTMLElement>(".section-shell");
        const skipReveal = section.hasAttribute("data-skip-immersive-reveal");

        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 45%",
          onEnter: () => section.classList.add("immersive-active"),
          onEnterBack: () => section.classList.add("immersive-active"),
          onLeave: () => section.classList.remove("immersive-active"),
          onLeaveBack: () => section.classList.remove("immersive-active"),
        });

        if (content && index > 0 && !skipReveal) {
          gsap.fromTo(
            content,
            {
              autoAlpha: 0,
              y: 120,
              scale: 0.88,
              rotateX: 25,
              transformPerspective: 1400,
              filter: "blur(16px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                end: "top 35%",
                scrub: false,
              },
            }
          );
        }
      });

      const parallaxLayers = gsap.utils.toArray<HTMLElement>("[data-parallax-layer]");
      parallaxLayers.forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0.12);
        const section = layer.closest("section") ?? layer;

        gsap.to(layer, {
          yPercent: -depth * 100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });



    });

    ScrollTrigger.refresh();
    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return null;
}
