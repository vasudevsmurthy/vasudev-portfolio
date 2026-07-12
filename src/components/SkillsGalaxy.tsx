"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import content from "@/data/content.json";

export default function SkillsGalaxy() {
  const nodes = useMemo(() => {
    const n = content.skills.length;
    const radius = 36;
    return content.skills.map((group, i) => {
      const angle = (-90 + (i * 360) / n) * (Math.PI / 180);
      return {
        category: group.category,
        items: group.items,
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle),
      };
    });
  }, []);

  return (
    <div className="relative aspect-square max-w-sm mx-auto mb-4">
      {/* connecting lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {nodes.map((node) => (
          <line
            key={node.category}
            x1={50}
            y1={50}
            x2={node.x}
            y2={node.y}
            stroke="#2E5AAC"
            strokeOpacity={0.25}
            strokeWidth={0.4}
          />
        ))}
      </svg>

      {/* rotating decorative ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-dashed border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* center node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-accent to-plum flex items-center justify-center text-white font-display italic text-center text-sm shadow-xl shadow-accent/30 z-10">
        Skills
      </div>

      {/* category nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.category}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
        >
          <div className="w-[72px] h-[72px] rounded-2xl glass flex items-center justify-center text-center text-[11px] leading-tight px-1.5 cursor-default hover:scale-110 hover:text-accent hover:border-accent/40 transition">
            {node.category}
          </div>
          {/* hover tooltip */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 w-44 glass rounded-xl p-3 text-xs opacity-0 group-hover:opacity-100 transition z-20">
            {node.items.map((it: any) => it.name).join(" · ")}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
