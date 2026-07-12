"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Github, Linkedin, ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";
import CodeWindow from "./CodeWindow";
import TypingRoles from "./TypingRoles";
import VisitorCounter from "./VisitorCounter";

export default function Hero() {
  const { profile } = content;

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-grid-fade">
      <div className="section grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: text */}
        <div className="flex flex-col gap-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fit px-4 py-1.5 rounded-full glass text-sm"
          >
            👋 Hello, I&apos;m
          </motion.span>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl leading-[1.02]"
          >
            {profile.name}
            <br />
            <TypingRoles />
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg opacity-80 max-w-md"
          >
            {profile.tagline}
          </motion.p>

          <VisitorCounter />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <Magnetic>
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:scale-105 transition shadow-lg shadow-accent/30"
              >
                View My Work <ArrowRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.social.github}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:scale-105 transition"
              >
                <Github size={16} /> GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.social.linkedin}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:scale-105 transition"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: animated code window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[360px] md:h-[440px] w-full"
        >
          <CodeWindow />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden md:flex absolute bottom-8 left-8 items-center gap-2 text-xs opacity-60 hover:opacity-100 transition"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-current flex items-start justify-center p-1"
        >
          <span className="w-1 h-1.5 rounded-full bg-current" />
        </motion.span>
        Scroll to Explore
      </motion.a>
    </section>
  );
}
