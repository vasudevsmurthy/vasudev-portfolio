"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 300 });
  const springY = useSpring(y, { damping: 25, stiffness: 300 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
      const target = e.target as HTMLElement;
      setHoveringLink(!!target.closest("a, button, input, textarea"));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      style={{ translateX: springX, translateY: springY }}
      animate={{ scale: hoveringLink ? 1.8 : 1 }}
      transition={{ scale: { duration: 0.2 } }}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-accent pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    />
  );
}
