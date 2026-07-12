"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTensorflow,
  SiOpencv,
  SiFlutter,
  SiFastapi,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const iconMap: Record<string, any> = {
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tensorflow: SiTensorflow,
  opencv: SiOpencv,
  flutter: SiFlutter,
  fastapi: SiFastapi,
  java: FaJava,
};

export default function TechStack() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {content.techStack.map((tech, i) => {
        const Icon = iconMap[tech];
        if (!Icon) return null;
        return (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="w-12 h-12 rounded-xl glass flex items-center justify-center text-xl opacity-80 hover:opacity-100 hover:text-accent transition"
          >
            <Icon />
          </motion.div>
        );
      })}
    </div>
  );
}
