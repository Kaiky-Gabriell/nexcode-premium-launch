"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroBackgroundProps {
  className?: string;
}

export const HeroBackground = ({ className }: HeroBackgroundProps) => {
  const isMobile = useIsMobile();

  return (
    <MeshGradient
      className={className}
      speed={isMobile ? 0.08 : 0.15}
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
