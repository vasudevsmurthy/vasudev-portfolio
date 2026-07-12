"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Calendar } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  timeline: string;
  features: string[];
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center hover:text-accent transition"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {project.timeline && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono opacity-60 mb-3">
                <Calendar size={12} /> {project.timeline}
              </span>
            )}

            <h3 className="font-display text-2xl mb-3 pr-10">{project.title}</h3>
            <p className="opacity-80 text-sm leading-relaxed mb-5">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                  {t}
                </span>
              ))}
            </div>

            {project.features?.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-mono uppercase tracking-wide opacity-60 mb-2">
                  Key Features
                </p>
                <ul className="space-y-1.5 text-sm opacity-80">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm hover:text-accent transition"
                >
                  <Github size={15} /> View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent text-white text-sm hover:scale-105 transition"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
