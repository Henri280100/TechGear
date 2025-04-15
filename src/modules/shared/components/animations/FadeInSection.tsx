"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useEffect, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

export interface FadeInSectionProps {
  children: ReactNode;
};

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};
