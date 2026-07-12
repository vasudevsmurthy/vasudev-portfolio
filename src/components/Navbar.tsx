"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Download, Search } from "lucide-react";
import content from "@/data/content.json";

const links = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#certificates", id: "certificates", label: "Certificates" },
  { href: "/#achievements", id: "achievements", label: "Achievements" },
  { href: "/contact", id: "contact-page", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { profile } = content;
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = links.filter((l) => l.id !== "contact-page").map((l) => l.id);
    const sections = ids.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (l: (typeof links)[number]) =>
    l.id === "contact-page" ? pathname === "/contact" : pathname === "/" && activeSection === l.id;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-28 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-16 h-16 rounded-xl p-[2px] bg-gradient-to-br from-accent to-plum shadow-md shadow-accent/20 group-hover:shadow-lg group-hover:shadow-accent/40 transition-shadow duration-300">
              <div className="w-full h-full rounded-[13px] overflow-hidden relative ring-1 ring-white/10">
                <Image
                  src={profile.profileImage || "/profile.jpg"}
                  alt={profile.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <span className="font-display italic text-2xl">{profile.name}</span>
          </a>

          {/* Center/right nav links — desktop only */}
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative py-1 transition ${
                  isActive(l) ? "text-accent font-medium" : "opacity-70 hover:opacity-100"
                }`}
              >
                {l.label}
                {isActive(l) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() =>
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
              }
              className="flex items-center gap-1.5 px-3 h-9 rounded-full glass text-xs opacity-70 hover:opacity-100 transition"
              aria-label="Quick jump"
            >
              <Search size={13} />
              <kbd className="font-mono">⌘K</kbd>
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-accent transition"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href={profile.resumeUrl}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:scale-105 transition shadow-md shadow-accent/20"
            >
              <Download size={14} /> Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 rounded-full glass flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 z-[60] bg-black/60"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper dark:bg-ink border-b border-black/10 dark:border-white/10 px-6 py-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl p-[2px] bg-gradient-to-br from-accent to-plum shrink-0">
                    <div className="w-full h-full rounded-[8px] overflow-hidden relative ring-1 ring-white/10">
                      <Image
                        src={profile.profileImage || "/profile.jpg"}
                        alt={profile.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="font-display italic text-lg">{profile.name}</span>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 mb-6">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm ${
                      isActive(l) ? "bg-accent/15 text-accent font-medium" : "opacity-80"
                    }`}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDark(!dark)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center"
                  aria-label="Toggle theme"
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <a
                  href={profile.resumeUrl}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent text-white text-sm font-medium"
                >
                  <Download size={14} /> Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
