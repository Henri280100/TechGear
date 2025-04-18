"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

export interface FadeInSectionProps {
  children: ReactNode;
};

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
