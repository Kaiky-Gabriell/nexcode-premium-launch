"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

interface HeroBackgroundProps {
  className?: string;
}

// The animated WebGL shader is fairly demanding on the GPU since it
// renders continuously for as long as the hero is mounted. That's fine
// on desktop, but it's a common source of jank/battery drain on phones,
// so we swap it for a cheap CSS gradient there (and when the user has
// asked for reduced motion).
const useWantsLiteBackground = () => {
  const [wantsLite, setWantsLite] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setWantsLite(coarsePointer.matches || reducedMotion.matches);
    update();

    coarsePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      coarsePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return wantsLite;
};

export const HeroBackground = ({ className }: HeroBackgroundProps) => {
  const wantsLite = useWantsLiteBackground();

  if (wantsLite) {
    return (
      <div
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 25% 30%, #333333, transparent 55%), radial-gradient(circle at 75% 70%, #1a1a1a, transparent 55%), linear-gradient(135deg, #000000, #2a2a2a)",
        }}
      />
    );
  }

  return (
    <MeshGradient
      className={className}
      // The library's default is 1. Values ~0.1 can look static on small screens.
      speed={0.6}
      colors={['#000000', '#1a1a1a', '#333333', '#4a4a4a']}
      distortion={0.8}
      swirl={0.6}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};
