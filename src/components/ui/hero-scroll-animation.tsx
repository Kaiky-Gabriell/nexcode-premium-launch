'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef, ReactNode } from 'react';

interface HeroScrollWrapperProps {
  heroContent: ReactNode;
  nextSectionContent: ReactNode;
}

interface SectionProps {
  scrollYProgress: MotionValue<number>;
  children: ReactNode;
}

const HeroSection: React.FC<SectionProps> = ({ scrollYProgress, children }) => {
  // Only scale - no rotation, no opacity changes
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <div 
      className="sticky top-0 h-screen overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <motion.div
        style={{ 
          scale,
          // Ensure hero stays fully opaque
          opacity: 1,
        }}
        className="h-full w-full origin-center will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

const NextSection: React.FC<SectionProps> = ({ scrollYProgress, children }) => {
  // Subtle scale animation for premium feel
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      style={{ 
        scale,
        // Ensure section is fully opaque
        opacity: 1,
      }}
      className="relative w-full origin-center will-change-transform bg-background"
      // z-index: 2 to stack above hero
      // Using inline style for explicit z-index control
    >
      {children}
    </motion.div>
  );
};

export const HeroScrollAnimation = ({
  heroContent,
  nextSectionContent,
}: HeroScrollWrapperProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    // Container has NO background - sections have their own backgrounds
    <div ref={container} className="relative h-[200vh]">
      <HeroSection scrollYProgress={scrollYProgress}>
        {heroContent}
      </HeroSection>
      <div 
        className="relative"
        style={{ zIndex: 2 }}
      >
        <NextSection scrollYProgress={scrollYProgress}>
          {nextSectionContent}
        </NextSection>
      </div>
    </div>
  );
};

export default HeroScrollAnimation;
