"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import CommandPalette from "./CommandPalette";
import EasterEgg from "./EasterEgg";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    console.log(
      "%c👋 Poking around the console?",
      "font-size: 16px; font-weight: bold; color: #2E5AAC;"
    );
    console.log(
      "%cTry the Konami code somewhere on this page: ↑ ↑ ↓ ↓ ← → ← → b a",
      "font-size: 12px; color: #64748B;"
    );
  }, []);

  return (
    <>
      <CommandPalette />
      <EasterEgg />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Toaster position="bottom-right" />
    </>
  );
}
