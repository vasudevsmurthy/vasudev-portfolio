"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import content from "@/data/content.json";
import SectionHeader from "./SectionHeader";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import ProjectModal from "./ProjectModal";

type ProjectItem = (typeof content.projects)[number];

export default function Projects() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [featured, ...rest] = content.projects;

  return (
    <section id="projects" className="section">
      <SectionHeader
        index="04"
        eyebrow="Things I've built"
        title="Featured"
        accentWord="Projects"
        description="Click any project for the full case study."
      />

      {/* Spotlight — first project gets the big treatment */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => setSelected(featured)}
          className="glass rounded-3xl p-8 md:p-10 mb-6 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/15 transition" />
          <span className="eyebrow relative">Latest work</span>
          <h3 className="font-display text-2xl md:text-3xl mt-2 mb-3 relative">
            {featured.title}
          </h3>
          <p className="opacity-80 text-sm md:text-base leading-relaxed max-w-2xl relative mb-5">
            {featured.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6 relative">
            {featured.tech.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm relative">
            {featured.githubUrl && (
              <a
                href={featured.githubUrl}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 hover:text-accent transition"
              >
                <Github size={15} /> Code
              </a>
            )}
            {featured.liveUrl && (
              <a
                href={featured.liveUrl}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 hover:text-accent transition"
              >
                <ExternalLink size={15} /> Live
              </a>
            )}
            <span className="ml-auto flex items-center gap-1 text-xs opacity-50 group-hover:opacity-80 group-hover:gap-2 transition-all">
              View case study <ArrowUpRight size={13} />
            </span>
          </div>
        </motion.div>
      )}

      {/* Rest — compact grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {rest.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={() => setSelected(p)}
            className="glass rounded-2xl p-6 flex flex-col gap-3 shadow-lg cursor-pointer"
          >
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="opacity-80 text-sm leading-relaxed line-clamp-3">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent dark:text-accent2"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-2 text-sm">
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 hover:text-accent"
                >
                  <Github size={14} /> Code
                </a>
              )}
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 hover:text-accent"
                >
                  <ExternalLink size={14} /> Live
                </a>
              )}
              <span className="ml-auto text-xs opacity-50">Details →</span>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
