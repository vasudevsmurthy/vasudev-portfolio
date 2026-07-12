"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import toast from "react-hot-toast";
import Confetti from "./Confetti";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  const { profile } = content;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success("Message sent!");
      setConfettiTrigger((n) => n + 1);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section">
      <Confetti trigger={confettiTrigger} />
      <SectionHeader index="09" eyebrow="Let's connect" title="Get In" accentWord="Touch" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] rounded-3xl overflow-hidden shadow-xl"
      >
        {/* Left panel — solid accent info card */}
        <div className="relative bg-accent text-white p-8 md:p-10 flex flex-col justify-between overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-ink/20 blur-2xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider bg-white/15 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              Open to opportunities
            </span>

            <h3 className="font-display text-2xl italic mt-6 mb-2">
              Let&apos;s create something great.
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Whether it&apos;s a role, a collaboration, or a project idea —
              I usually reply within a day.
            </p>
          </div>

          <div className="relative space-y-4 mt-10">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition">
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Mail size={15} />
              </span>
              {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition">
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Phone size={15} />
              </span>
              {profile.phone}
            </a>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <MapPin size={15} />
              </span>
              {profile.location}
            </div>
          </div>

          <div className="relative flex gap-3 mt-10">
            {profile.social.github && (
              <a href={profile.social.github} className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition">
                <Github size={16} />
              </a>
            )}
            {profile.social.linkedin && (
              <a href={profile.social.linkedin} className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition">
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Right panel — form */}
        <form onSubmit={handleSubmit} className="glass p-8 md:p-10 flex flex-col gap-5 justify-center">
          <div>
            <label className="text-xs font-mono uppercase tracking-wide opacity-60 mb-1.5 block">
              Name
            </label>
            <input
              id="contact-name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border border-black/10 dark:border-white/15 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-accent focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wide opacity-60 mb-1.5 block">
              Email
            </label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border border-black/10 dark:border-white/15 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-accent focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wide opacity-60 mb-1.5 block">
              Message
            </label>
            <textarea
              required
              placeholder="What would you like to talk about?"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border border-black/10 dark:border-white/15 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-accent focus:border-transparent transition resize-none"
            />
          </div>

          <button
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-medium hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100 mt-2"
          >
            {loading ? "Sending..." : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
