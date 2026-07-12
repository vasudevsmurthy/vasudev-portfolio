"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Calendar, Code2, Briefcase, Award, Github, Trophy, BookOpen, Cpu } from "lucide-react";

const iconMap: Record<string, any> = {
  calendar: Calendar,
  code: Code2,
  briefcase: Briefcase,
  award: Award,
  github: Github,
  trophy: Trophy,
  book: BookOpen,
  cpu: Cpu,
};

export default function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {content.stats.map((stat, i) => {
        const Icon = iconMap[stat.icon] || Code2;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-5 flex flex-col gap-2"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
              <Icon size={18} />
            </div>
            <p className="font-display text-2xl">{stat.value}</p>
            <p className="text-xs opacity-60">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
