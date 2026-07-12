"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Sparkles,
  FolderKanban,
  Briefcase,
  Trophy,
  Mail,
  Github,
  Linkedin,
  Download,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

import content from "@/data/content.json";

const links = [
  { href: "/", id: "hero", label: "Home", icon: Home },
  { href: "/#about", id: "about", label: "About", icon: User },
  { href: "/#skills", id: "skills", label: "Skills", icon: Sparkles },
  { href: "/#projects", id: "projects", label: "Projects", icon: FolderKanban },
  { href: "/#experience", id: "experience", label: "Experience", icon: Briefcase },
  { href: "/#achievements", id: "achievements", label: "Achievements", icon: Trophy },
  { href: "/contact", id: "contact-page", label: "Contact", icon: Mail },
];

function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const { profile } = content;

  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (pathname !== "/") return;

    const ids = links
      .filter((l) => l.id !== "contact-page")
      .map((l) => l.id);

    const sections = ids.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -45% 0px",
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="flex flex-col h-full px-7 py-10">

      {/* ---------------- PROFILE ---------------- */}

      <div className="flex flex-col items-center mb-10">

        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-accent shadow-2xl shadow-accent/30 transition duration-300 hover:scale-105">

          <Image
            src="/profile.jpg"
            alt={profile.name}
            fill
            priority
            className="object-cover"
          />

        </div>

        <h2 className="mt-5 text-2xl font-bold font-display text-center">
          {profile.name}
        </h2>

        <p className="mt-1 text-sm text-center opacity-70 font-mono">
          {profile.title}
        </p>

        <div className="w-16 h-1 rounded-full bg-accent mt-5"></div>

      </div>

      {/* ---------------- NAVIGATION ---------------- */}

      <nav className="flex flex-col gap-3 flex-1">
              {links.map((link) => {
          const Icon = link.icon;

          const isActive =
            link.id === "contact-page"
              ? pathname === "/contact"
              : pathname === "/" && activeSection === link.id;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`group relative flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "hover:bg-white/5 hover:translate-x-1 opacity-80 hover:opacity-100"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-pill"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-white"
                />
              )}

              <Icon
                size={19}
                className={`transition-transform duration-300 ${
                  isActive ? "" : "group-hover:scale-110"
                }`}
              />

              <span className="font-medium">{link.label}</span>
            </a>
          );
        })}
      </nav>

      {/* ---------------- QUICK JUMP ---------------- */}

      <button
        onClick={() =>
          window.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "k",
              metaKey: true,
            })
          )
        }
        className="mt-4 mb-6 flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm opacity-70 hover:opacity-100 hover:border-accent transition"
      >
        <span>Quick Jump</span>

        <kbd className="rounded-md border border-white/20 px-2 py-1 font-mono text-xs">
          ⌘K
        </kbd>
      </button>

      {/* ---------------- SOCIALS ---------------- */}

      <div className="flex justify-center gap-4 mb-6">

        {profile.social.github && (
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
          >
            <Github size={18} />
          </a>
        )}

        {profile.social.linkedin && (
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
          >
            <Linkedin size={18} />
          </a>
        )}

        <button
          onClick={() => setDark(!dark)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

      </div>

      {/* ---------------- RESUME ---------------- */}

      <a
        href={profile.resumeUrl}
        target="_blank"
        className="flex items-center justify-center gap-3 rounded-2xl bg-accent px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-accent/40"
      >
        <Download size={18} />
        Download Resume
      </a>

    </div>
  );
}
export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= Desktop Sidebar ================= */}

      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[290px] border-r border-white/10 bg-paper/70 dark:bg-ink/80 backdrop-blur-xl z-40">
        <SidebarContent />
      </aside>

      {/* ================= Mobile Top Bar ================= */}

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-paper/90 dark:bg-ink/90 backdrop-blur-xl border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-accent">

            <Image
              src="/profile.jpg"
              alt={content.profile.name}
              fill
              className="object-cover"
            />

          </div>

          <div>

            <h3 className="font-semibold text-base">
              {content.profile.name}
            </h3>

            <p className="text-xs opacity-60">
              {content.profile.title}
            </p>

          </div>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl p-2 hover:bg-white/10 transition"
        >
          <Menu size={22} />
        </button>

      </div>

      {/* ================= Mobile Drawer ================= */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setOpen(false)}
          >

            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-72 h-full bg-paper dark:bg-ink border-r border-white/10"
            >

              <div className="flex justify-end p-5">

                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 hover:bg-white/10 transition"
                >
                  <X size={22} />
                </button>

              </div>

              <SidebarContent
                onNavigate={() => setOpen(false)}
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}