"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import SectionHeader from "./SectionHeader";

export default function Timeline() {
  const items = [
    ...content.education.map((e) => ({
      label: e.period,
      title: e.degree,
      subtitle: e.institution,
    })),
    ...content.experience.map((e) => ({
      label: e.period,
      title: e.role,
      subtitle: e.company,
    })),
  ].filter((i) => i.label);

  if (!items.length) return null;

  return (
    <section className="section">
      <SectionHeader index="03" eyebrow="How I got here" title="My" accentWord="Journey" />

      <div className="relative overflow-x-auto pb-4">
        <div className="flex gap-8 min-w-max px-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex flex-col items-center w-44 text-center"
            >
              {/* connecting line */}
              {i < items.length - 1 && (
                <div className="absolute top-2 left-1/2 w-full h-px bg-black/10 dark:bg-white/10" />
              )}
              <span className="relative z-10 w-4 h-4 rounded-full bg-accent border-4 border-paper dark:border-ink" />
              <p className="font-mono text-xs text-accent mt-3">{item.label}</p>
              <p className="font-medium text-sm mt-1">{item.title}</p>
              {item.subtitle && (
                <p className="text-xs opacity-60 mt-0.5">{item.subtitle}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
