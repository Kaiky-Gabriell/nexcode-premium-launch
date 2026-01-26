"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React, { useRef, ReactNode } from "react";

interface HeroScrollWrapperProps {
  heroContent: ReactNode;
  nextSectionContent: ReactNode;
}

const AnimatedHero = ({
  scrollYProgress,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  children: ReactNode;
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div className="sticky top-0 h-screen z-0 bg-secondary/30">
      <motion.div
        style={{
          scale,
          rotate,
          borderRadius,
        }}
        className="h-full w-full origin-center overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

const AnimatedNextSection = ({
  scrollYProgress,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  children: ReactNode;
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, 0]);

  return (
    <motion.div
      style={{
        scale,
        rotate,
      }}
      className="relative w-full origin-center will-change-transform z-10 bg-background -mt-[100vh]"
    >
      <div className="h-screen" /> {/* Spacer to cover the hero during scroll */}
      {children}
    </motion.div>
  );
};

export const HeroScrollAnimation = ({
  heroContent,
  nextSectionContent,
}: HeroScrollWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <AnimatedHero scrollYProgress={scrollYProgress}>
        {heroContent}
      </AnimatedHero>
      <AnimatedNextSection scrollYProgress={scrollYProgress}>
        {nextSectionContent}
      </AnimatedNextSection>
    </div>
  );
};

export default HeroScrollAnimation;
