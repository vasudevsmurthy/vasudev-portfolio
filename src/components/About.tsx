"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { about, education } = content;

  return (
    <section id="about" className="section">
      <SectionHeader index="01" eyebrow="Get to know me" title="About" accentWord="Me" />

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="opacity-90 leading-relaxed">{about.bio}</p>
          <p className="opacity-70 leading-relaxed">{about.careerObjective}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {about.interests.map((i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full glass"
              >
                {i}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg">Education</h3>
          {education.map((e, idx) => (
            <div key={idx} className="glass rounded-xl p-4">
              <p className="font-medium">{e.degree}</p>
              <p className="text-sm opacity-70">
                {e.institution} {e.period && `· ${e.period}`}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
