"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  index,
  eyebrow,
  title,
  accentWord,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accentWord: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-5 mb-10">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-xs opacity-30 pt-2 shrink-0"
      >
        {index}
      </motion.span>
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-2"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl"
        >
          {title} <span className="italic gradient-text">{accentWord}</span>
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm opacity-60 mt-3 max-w-md"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
