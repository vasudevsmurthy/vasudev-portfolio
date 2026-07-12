"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Award, ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Certificates() {
  const items = (content as any).certificates as {
    title: string;
    issuer: string;
    year: string;
    credentialUrl?: string;
  }[];

  if (!items?.length) return null;

  return (
    <section id="certificates" className="section">
      <SectionHeader
        index="06"
        eyebrow="Verified learning"
        title="Certificates"
        accentWord="& Courses"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            className="glass rounded-2xl p-5 flex flex-col gap-2"
          >
            <span className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
              <Award size={16} />
            </span>
            <p className="font-medium text-sm leading-snug mt-1">{cert.title}</p>
            <div className="flex items-center justify-between mt-auto pt-2">
              <p className="text-xs opacity-60">
                {cert.issuer} {cert.year && `· ${cert.year}`}
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  className="text-accent hover:opacity-70 transition shrink-0"
                  aria-label="View credential"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
