"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "claps-given";
const MAX_PER_SESSION = 10;

export default function ClapButton() {
  const [count, setCount] = useState<number | null>(null);
  const [given, setGiven] = useState(0);
  const [pops, setPops] = useState<number[]>([]);
  const pending = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/claps")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => setCount(0));

    const stored = parseInt(sessionStorage.getItem(SESSION_KEY) || "0");
    setGiven(stored);
  }, []);

  function sendClap() {
    if (given >= MAX_PER_SESSION) return;

    setCount((c) => (c ?? 0) + 1);
    setGiven((g) => {
      const next = g + 1;
      sessionStorage.setItem(SESSION_KEY, String(next));
      return next;
    });

    const popId = Date.now() + Math.random();
    setPops((p) => [...p, popId]);
    setTimeout(() => setPops((p) => p.filter((id) => id !== popId)), 800);

    pending.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const amount = pending.current;
      pending.current = 0;
      fetch("/api/claps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }).catch(() => {});
    }, 600);
  }

  const maxedOut = given >= MAX_PER_SESSION;

  return (
    <div className="relative inline-flex items-center gap-3">
      <motion.button
        onClick={sendClap}
        whileTap={{ scale: 0.85 }}
        disabled={maxedOut}
        className="relative w-14 h-14 rounded-full glass flex items-center justify-center text-2xl hover:bg-accent/10 transition disabled:opacity-50"
        aria-label="Give a clap"
        title={maxedOut ? "You've clapped a lot — thank you!" : "Give a clap"}
      >
        👏
        <AnimatePresence>
          {pops.map((id) => (
            <motion.span
              key={id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -40, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -top-2 text-sm font-mono text-accent pointer-events-none"
            >
              +1
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.button>
      <div className="text-sm">
        <motion.p
          key={count}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="font-display text-lg"
        >
          {count === null ? "…" : count.toLocaleString()}
        </motion.p>
        <p className="text-xs opacity-60">
          {maxedOut ? "Thanks for the love!" : "Enjoyed this? Give a clap"}
        </p>
      </div>
    </div>
  );
}
