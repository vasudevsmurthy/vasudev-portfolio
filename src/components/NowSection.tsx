"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Radio } from "lucide-react";

export default function NowSection() {
  const { now } = content as any;
  if (!now?.text) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 flex items-start gap-4"
    >
      <span className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
        <Radio size={18} />
      </span>
      <div>
        <p className="text-xs font-mono uppercase tracking-wide text-accent mb-1">
          Right now
        </p>
        <p className="text-sm opacity-80 leading-relaxed">{now.text}</p>
        {now.updatedAt && (
          <p className="text-xs opacity-40 mt-2">Updated {now.updatedAt}</p>
        )}
      </div>
    </motion.div>
  );
}
