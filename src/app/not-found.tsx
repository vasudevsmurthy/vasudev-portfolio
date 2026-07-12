"use client";

import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import content from "@/data/content.json";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-grid-fade px-6">
      <div className="text-center max-w-md">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-8xl italic gradient-text mb-2"
        >
          404
        </motion.p>

        <motion.div
          animate={{ rotate: [0, -8, 0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl mb-4"
        >
          🧭
        </motion.div>

        <h1 className="font-display text-2xl mb-2">
          Looks like this page <span className="italic gradient-text">threw an exception.</span>
        </h1>
        <p className="opacity-70 text-sm mb-8">
          Even {content.profile.name}&apos;s models don&apos;t predict everything correctly.
          This page doesn&apos;t exist — but the rest of the site does.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:scale-105 transition"
          >
            <Home size={16} /> Back to home
          </a>
          <button
            onClick={() =>
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
            }
            className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:scale-105 transition"
          >
            <Search size={16} /> Search the site
          </button>
        </div>
      </div>
    </main>
  );
}
