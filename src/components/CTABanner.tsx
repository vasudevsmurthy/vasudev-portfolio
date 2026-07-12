"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";
import ClapButton from "./ClapButton";

export default function CTABanner() {
  return (
    <section className="section !py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl glass p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />
        <div className="relative">
          <h3 className="font-display text-2xl md:text-3xl">
            Let&apos;s build the <span className="italic gradient-text">future</span> together.
          </h3>
          <p className="opacity-70 mt-2 text-sm md:text-base">
            I&apos;m always open to exciting opportunities, collaborations, and research.
          </p>
        </div>
        <div className="relative flex flex-col sm:flex-row items-center gap-6 shrink-0">
          <ClapButton />
          <Magnetic>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:scale-105 transition shadow-lg shadow-accent/30 whitespace-nowrap"
            >
              Get In Touch <ArrowRight size={16} />
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
