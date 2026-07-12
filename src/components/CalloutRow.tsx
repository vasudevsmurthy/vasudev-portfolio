"use client";

import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import TechStack from "./TechStack";

export default function CalloutRow() {
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-5 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
          <Rocket size={18} />
        </div>
        <p className="text-sm">
          Let&apos;s build something{" "}
          <span className="text-accent font-medium italic">awesome</span> together
        </p>
      </motion.div>

      <TechStack />

      <motion.a
        href="#contact"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-5 flex items-center justify-between gap-3 hover:bg-accent/10 transition group"
      >
        <p className="text-sm">Have a project in mind?</p>
        <span className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center shrink-0 group-hover:translate-x-1 transition">
          <ArrowRight size={16} />
        </span>
      </motion.a>
    </div>
  );
}
