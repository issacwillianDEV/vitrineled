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

        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 45%",
          onEnter: () => section.classList.add("immersive-active"),
          onEnterBack: () => section.classList.add("immersive-active"),
          onLeave: () => section.classList.remove("immersive-active"),
          onLeaveBack: () => section.classList.remove("immersive-active"),
        });

        if (content && index > 0) {
          gsap.fromTo(
            content,
            {
              autoAlpha: 0.18,
              y: 72,
              filter: "blur(12px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                end: "top 40%",
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

      media.add("(min-width: 1024px)", () => {
        const firstSection = sections[0];

        const snapTrigger = ScrollTrigger.create({
          start: () => window.innerHeight * 0.95,
          end: "max",
          snap: {
            snapTo: (progress) => {
              const max = ScrollTrigger.maxScroll(window);
              if (!max) return progress;

              const freeProgressUntil = firstSection
                ? Math.min(0.999, (firstSection.offsetHeight * 0.92) / max)
                : 0;

              if (progress <= freeProgressUntil) return progress;

              const points = sections.slice(1).map((section) => {
                const offset = section.offsetTop;
                return Math.min(1, Math.max(0, offset / max));
              });

              if (!points.length) return progress;
              return gsap.utils.snap(points, progress);
            },
            duration: { min: 0.1, max: 0.24 },
            delay: 0.04,
            ease: "power2.out",
          },
        });

        return () => {
          snapTrigger.kill();
        };
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
