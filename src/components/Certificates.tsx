"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Award, ExternalLink, CheckCircle2 } from "lucide-react";
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
        description="Hover a card to flip it."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            className="group h-48 [perspective:1000px]"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 [backface-visibility:hidden] glass rounded-2xl p-5 flex flex-col">
                <span className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <Award size={16} />
                </span>
                <p className="font-medium text-sm leading-snug mt-3 line-clamp-3">
                  {cert.title}
                </p>
                <p className="text-xs opacity-60 mt-auto pt-2">
                  {cert.issuer} {cert.year && `· ${cert.year}`}
                </p>
              </div>

              {/* Back */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass rounded-2xl p-5 flex flex-col bg-accent/[0.06]">
                <span className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </span>
                <p className="font-medium text-sm leading-snug mt-3">{cert.title}</p>
                <p className="text-xs opacity-70 mt-2">Issued by {cert.issuer}</p>
                {cert.year && <p className="text-xs opacity-50">{cert.year}</p>}
                <div className="mt-auto pt-2">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                    >
                      View credential <ExternalLink size={12} />
                    </a>
                  ) : (
                    <p className="text-xs opacity-40">Credential link not added yet</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
