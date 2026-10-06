'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollEffects() {
  const pathname = usePathname(); // re-runs on every page change

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = () =>
      document
        .querySelectorAll(
          ".reveal:not(.in-view), .reveal-left:not(.in-view), .reveal-right:not(.in-view), .reveal-scale:not(.in-view)"
        )
        .forEach((el) => observer.observe(el));

    observeAll();

    // Also catches elements that render later (tabs, fetched content, etc.)
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [pathname]);

  // Header solid-on-scroll
  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector("header");
      const hero = document.querySelector(".hero") as HTMLElement | null;
      if (!header) return;

      // Pages without a hero: header is always solid
      const trigger = hero ? Math.min(hero.offsetHeight - 90, 420) : 0;
      if (window.scrollY > trigger || !hero) {
        header.classList.add("solid");
      } else {
        header.classList.remove("solid");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}