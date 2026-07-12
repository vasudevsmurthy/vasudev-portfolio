"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/data/content.json";
import SectionHeader from "./SectionHeader";
import { X, Trophy } from "lucide-react";

export default function Achievements() {
  const [active, setActive] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});
  const items = content.achievements;

  if (!items.length) return null;

  return (
    <section id="achievements" className="section">
      <SectionHeader index="07" eyebrow="Milestones" title="" accentWord="Achievements" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => {
          const hasImage = item.image && !brokenImages[i];
          return (
            <motion.button
              key={item.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => hasImage && setActive(i)}
              className="glass rounded-2xl overflow-hidden text-left group"
            >
              <div className="aspect-[4/3] bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden">
                {hasImage ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={() => setBrokenImages((prev) => ({ ...prev, [i]: true }))}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <Trophy className="opacity-30" size={32} />
                )}
              </div>
              <div className="p-4">
                <p className="font-medium">{item.title}</p>
                {item.date && (
                  <p className="text-xs opacity-60 font-mono mt-1">{item.date}</p>
                )}
                {item.description && (
                  <p className="text-sm opacity-70 mt-2">{item.description}</p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active !== null && items[active]?.image && !brokenImages[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={items[active].image}
              alt={items[active].title}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
