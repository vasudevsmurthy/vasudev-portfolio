"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Brain,
  Github,
  Code2,
  Award,
  FileText,
  Users,
  Globe2,
  type LucideIcon,
} from "lucide-react";

type Stat = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  color: "blue" | "cyan" | "violet" | "rose" | "amber" | "jade";
};

// Edit this array to change what the dashboard shows — swap labels/values
// freely, the grid and animation don't care about the content.
const stats: Stat[] = [
  { id: "projects", label: "Projects", value: "15+", icon: Rocket, color: "violet" },
  { id: "models", label: "Models trained", value: "28+", icon: Brain, color: "blue" },
  { id: "commits", label: "GitHub commits", value: "1800+", icon: Github, color: "jade" },
  { id: "leetcode", label: "LeetCode score", value: "450+", icon: Code2, color: "amber" },
  { id: "certs", label: "Certificates", value: "20+", icon: Award, color: "rose" },
  { id: "papers", label: "Research papers", value: "3", icon: FileText, color: "cyan" },
  { id: "visitors", label: "Visitors today", value: "124+", icon: Users, color: "violet" },
  { id: "countries", label: "Countries", value: "28+", icon: Globe2, color: "blue" },
];

const colorMap: Record<Stat["color"], { icon: string; ring: string; glow: string }> = {
  blue: { icon: "text-neon-blue", ring: "group-hover:border-neon-blue/40", glow: "group-hover:shadow-neon-blue/10" },
  cyan: { icon: "text-neon-cyan", ring: "group-hover:border-neon-cyan/40", glow: "group-hover:shadow-neon-cyan/10" },
  violet: { icon: "text-neon-violet", ring: "group-hover:border-neon-violet/40", glow: "group-hover:shadow-neon-violet/10" },
  rose: { icon: "text-neon-rose", ring: "group-hover:border-neon-rose/40", glow: "group-hover:shadow-neon-rose/10" },
  amber: { icon: "text-neon-amber", ring: "group-hover:border-neon-amber/40", glow: "group-hover:shadow-neon-amber/10" },
  jade: { icon: "text-neon-jade", ring: "group-hover:border-neon-jade/40", glow: "group-hover:shadow-neon-jade/10" },
};

export default function AIImpactDashboard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-ink2/60 p-6 sm:p-7">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-lg text-paper">AI impact dashboard</h3>
        <span className="font-mono text-[11px] uppercase tracking-wider text-paper/40">
          live
        </span>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          const c = colorMap[stat.color];
          return (
            <motion.div
              key={stat.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`group rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-glow-sm backdrop-blur-sm transition-colors duration-200 ${c.ring}`}
            >
              <Icon className={`mb-3 h-4 w-4 ${c.icon}`} strokeWidth={1.75} />
              <p className="font-display text-2xl leading-none text-paper">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-paper/50">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}