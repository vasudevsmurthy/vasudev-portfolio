"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";

export default function CodeWindow() {
  const { profile, skills } = content;
  const topSkills = skills.slice(0, 2).flatMap((g) => g.items.slice(0, 2).map((i) => i.name));

  const lines = [
    <>
      <span className="text-accent2">class</span>{" "}
      <span className="text-accent">Engineer</span>:
    </>,
    <>
      &nbsp;&nbsp;<span className="text-accent2">def</span>{" "}
      <span className="text-ember2">__init__</span>(self):
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;self.name = <span className="text-green-400">&quot;{profile.name}&quot;</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;self.role = <span className="text-green-400">&quot;{profile.title}&quot;</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;self.stack = [
      {topSkills.map((s, i) => (
        <span key={s}>
          <span className="text-green-400">&quot;{s}&quot;</span>
          {i < topSkills.length - 1 ? ", " : ""}
        </span>
      ))}
      ]
    </>,
    <>&nbsp;</>,
    <>
      &nbsp;&nbsp;<span className="text-accent2">def</span>{" "}
      <span className="text-ember2">solve</span>(self, problem):
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent2">return</span> Solution(problem,
      elegant=<span className="text-accent">True</span>)
    </>,
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
      <motion.div
        className="absolute w-40 h-40 bg-plum/15 rounded-full blur-2xl"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: -6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7 }}
        whileHover={{ rotateX: -2, rotateY: 2 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full max-w-md rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-ink2"
      >
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-black/20 border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="ml-3 text-xs font-mono text-paper/50">engineer.py</span>
        </div>

        {/* code body */}
        <div className="p-5 font-mono text-[13px] leading-relaxed text-paper/90">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              className="whitespace-pre"
            >
              {line}
              {i === lines.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[7px] h-[14px] bg-accent ml-1 align-middle"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-4 w-14 h-14 rounded-2xl glass flex items-center justify-center font-mono text-accent text-lg shadow-lg"
      >
        {"</>"}
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute bottom-6 left-0 glass rounded-2xl px-4 py-2.5 text-xs font-mono shadow-lg"
      >
        <span className="text-green-400">●</span> compiling ideas...
      </motion.div>
    </div>
  );
}
