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

const Section1: React.FC<SectionProps> = ({ scrollYProgress, children }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  
  return (
    <div className="sticky top-0 h-screen z-0">
      <motion.div
        style={{ scale, rotate }}
        className="h-full w-full origin-center"
      >
        {children}
      </motion.div>
    </div>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress, children }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="relative h-full w-full origin-center z-10"
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
    <div ref={container} className="relative h-[200vh]">
      <Section1 scrollYProgress={scrollYProgress}>
        {heroContent}
      </Section1>
      <Section2 scrollYProgress={scrollYProgress}>
        {nextSectionContent}
      </Section2>
    </div>
  );
};

export default HeroScrollAnimation;
