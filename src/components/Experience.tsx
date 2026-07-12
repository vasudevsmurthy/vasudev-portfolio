"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader index="05" eyebrow="Where I've worked" title="Work" accentWord="Experience" />

      <div className="relative border-l border-black/10 dark:border-white/10 pl-6 space-y-8">
        {content.experience.map((e, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-accent" />
            <p className="font-semibold">{e.role}</p>
            <p className="text-sm opacity-70">
              {e.company} · {e.period}
            </p>
            <p className="mt-2 opacity-80 text-sm">{e.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
