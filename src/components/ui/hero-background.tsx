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
      speed={isMobile ? 0.08 : 0.12}
      colors={['#ffffff', '#f5f5f5', '#e8e8e8', '#d9d9d9']}
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
