"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#2E5AAC", "#4C7BD9", "#64748B", "#F8FAFC", "#22C55E"];

type Piece = { id: number; x: number; rotate: number; color: string; delay: number };

export default function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const next = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      rotate: Math.random() * 360,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.3,
    }));
    setPieces(next);
    const timeout = setTimeout(() => setPieces([]), 2200);
    return () => clearTimeout(timeout);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            initial={{ top: "-5%", left: `${p.x}%`, opacity: 1, rotate: 0 }}
            animate={{ top: "105%", rotate: p.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, delay: p.delay, ease: "easeIn" }}
            style={{ background: p.color }}
            className="absolute w-2.5 h-2.5 rounded-sm"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
