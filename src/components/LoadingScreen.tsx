"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/data/content.json";

const MESSAGES = [
  "Initializing neural pathways...",
  "Compiling experience...",
  "Loading portfolio.exe...",
  "Rendering with intelligence...",
];

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // A small "neural network" — a few nodes that light up in sequence
  const nodes = useMemo(
    () => [
      { x: 30, y: 50 },
      { x: 75, y: 20 },
      { x: 75, y: 80 },
      { x: 120, y: 50 },
    ],
    []
  );
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
  ];

  useEffect(() => {
    const duration = 1600;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setPercent(pct);
      if (pct >= 100) clearInterval(interval);
    }, 30);

    const messageTimer = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 500);

    const doneTimer = setTimeout(() => setLoading(false), duration + 200);

    return () => {
      clearInterval(interval);
      clearInterval(messageTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper dark:bg-ink"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Neural network graphic */}
            <svg viewBox="0 0 150 100" className="w-40 h-24">
              {edges.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={nodes[a].x}
                  y1={nodes[a].y}
                  x2={nodes[b].x}
                  y2={nodes[b].y}
                  stroke="#2E5AAC"
                  strokeWidth={1}
                  initial={{ opacity: 0.15 }}
                  animate={{ opacity: [0.15, 0.6, 0.15] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
              {nodes.map((n, i) => (
                <motion.circle
                  key={i}
                  cx={n.x}
                  cy={n.y}
                  r={5}
                  fill="#2E5AAC"
                  initial={{ opacity: 0.3, scale: 0.8 }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </svg>

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl italic gradient-text"
            >
              {content.profile.name}
            </motion.div>

            <div className="flex flex-col items-center gap-2 w-48">
              <div className="w-full h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <motion.div
                  animate={{ width: `${percent}%` }}
                  transition={{ ease: "linear" }}
                  className="h-full bg-gradient-to-r from-accent to-accent2"
                />
              </div>
              <div className="flex justify-between w-full font-mono text-[11px] opacity-50">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={messageIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {MESSAGES[messageIndex]}
                  </motion.span>
                </AnimatePresence>
                <span>{percent}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
