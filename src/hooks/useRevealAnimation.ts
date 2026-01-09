import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useRevealAnimation = <T extends HTMLElement>() => {
  const revealRef = useRef<T>(null);

  useEffect(() => {
    if (!revealRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(revealRef.current, 
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
      );
    });
    
    return () => ctx.revert();
  }, []);

  return revealRef;
};
