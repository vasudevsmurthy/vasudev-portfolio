"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "./Confetti";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function EasterEgg() {
  const progress = useRef<string[]>([]);
  const [found, setFound] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      progress.current = [...progress.current, e.key].slice(-KONAMI.length);
      if (progress.current.join(",") === KONAMI.join(",")) {
        setFound(true);
        setTrigger((n) => n + 1);
        progress.current = [];
        setTimeout(() => setFound(false), 3500);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Confetti trigger={trigger} />
      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[250] glass rounded-2xl px-6 py-4 shadow-2xl text-center"
          >
            <p className="font-display italic text-lg gradient-text">
              🎮 You found the secret code!
            </p>
            <p className="text-xs opacity-60 mt-1">
              A developer who checks the console AND tries the Konami code? Hire this person.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
