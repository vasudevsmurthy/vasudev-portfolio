"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/data/content.json";
import SectionHeader from "./SectionHeader";
import SkillsGalaxy from "./SkillsGalaxy";

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...content.skills.map((g) => g.category)];
  const visible =
    filter === "All" ? content.skills : content.skills.filter((g) => g.category === filter);

  return (
    <section id="skills" className="section">
      <SectionHeader index="02" eyebrow="What I work with" title="My" accentWord="Skills" />

      <SkillsGalaxy />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === cat
                ? "bg-accent text-white"
                : "glass opacity-70 hover:opacity-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((group) => (
            <motion.div
              key={group.category}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4">{group.category}</h3>
              <div className="space-y-3">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="opacity-60">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
