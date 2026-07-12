"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import SectionHeader from "./SectionHeader";
import SkillsGalaxy from "./SkillsGalaxy";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader index="02" eyebrow="What I work with" title="My" accentWord="Skills" />

      <SkillsGalaxy />

      <div className="grid md:grid-cols-2 gap-6">
        {content.skills.map((group) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
      </div>
    </section>
  );
}
