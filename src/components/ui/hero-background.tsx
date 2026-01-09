"use client";

import { MeshGradient } from "@paper-design/shaders-react";

interface HeroBackgroundProps {
  className?: string;
}

export const HeroBackground = ({ className }: HeroBackgroundProps) => {
  return (
    <MeshGradient
      className={className}
      speed={0.12}
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
