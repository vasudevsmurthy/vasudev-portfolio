"use client";

import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Home,
  User,
  Sparkles,
  FolderKanban,
  Briefcase,
  Award,
  Trophy,
  Mail,
  Github,
  Linkedin,
  Download,
} from "lucide-react";
import content from "@/data/content.json";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/#about", icon: User },
  { label: "Skills", href: "/#skills", icon: Sparkles },
  { label: "Projects", href: "/#projects", icon: FolderKanban },
  { label: "Experience", href: "/#experience", icon: Briefcase },
  { label: "Certificates", href: "/#certificates", icon: Award },
  { label: "Achievements", href: "/#achievements", icon: Trophy },
  { label: "Contact page", href: "/contact", icon: Mail },
  { label: "GitHub profile", href: content.profile.social.github, icon: Github, external: true },
  { label: "LinkedIn profile", href: content.profile.social.linkedin, icon: Linkedin, external: true },
  { label: "Download résumé", href: content.profile.resumeUrl, icon: Download, external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filtered = useMemo(
    () => items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  function go(href: string, external?: boolean) {
    if (external) window.open(href, "_blank");
    else window.location.href = href;
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[300] bg-black/50 flex items-start justify-center pt-[15vh] px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg glass rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10 dark:border-white/10">
              <Search size={16} className="opacity-50 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <kbd className="text-[10px] font-mono opacity-50 border border-current/20 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-sm opacity-50 text-center py-6">No matches</p>
              )}
              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => go(item.href, "external" in item && item.external)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent/10 hover:text-accent transition text-left"
                  >
                    <Icon size={15} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
