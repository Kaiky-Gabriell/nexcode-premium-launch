import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useRevealAnimation = <T extends HTMLElement>() => {
  const revealRef = useRef<T>(null);

  useEffect(() => {
    if (!revealRef.current) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animating `filter: blur()` on a full-viewport element is one of the
      // most expensive things to composite on a phone GPU. Fall back to a
      // cheap opacity/translate fade on touch devices and keep the fancier
      // blur reveal for desktop.
      if (coarsePointer) {
        gsap.fromTo(revealRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      } else {
        gsap.fromTo(revealRef.current,
          { filter: "blur(30px)", opacity: 0, scale: 1.02 },
          { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return revealRef;
};
