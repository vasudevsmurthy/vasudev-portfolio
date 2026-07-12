"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, MessageSquarePlus, X } from "lucide-react";
import toast from "react-hot-toast";
import SectionHeader from "./SectionHeader";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number | null;
  createdAt: string;
};

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="p-0.5"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            size={20}
            className={n <= value ? "fill-accent text-accent" : "text-current opacity-30"}
          />
        </button>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", quote: "", rating: 5 });

  async function load() {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) setTestimonials(await res.json());
      else setTestimonials([]);
    } catch {
      setTestimonials([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success("Thanks! Your message will appear here once it's reviewed.");
      setForm({ name: "", role: "", quote: "", rating: 5 });
      setShowForm(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader index="08" eyebrow="Kind words" title="What People" accentWord="Say" />
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:scale-105 transition shadow-md shadow-accent/20 shrink-0"
        >
          <MessageSquarePlus size={16} />
          {showForm ? "Cancel" : "Leave a message"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 mb-8 overflow-hidden space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-transparent border border-black/10 dark:border-white/15 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-accent transition"
              />
              <input
                placeholder="Your role (e.g. Professor, Teammate) — optional"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="bg-transparent border border-black/10 dark:border-white/15 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-accent transition"
              />
            </div>
            <textarea
              required
              minLength={10}
              rows={3}
              placeholder="Share your experience working with me..."
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="w-full bg-transparent border border-black/10 dark:border-white/15 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-accent transition resize-none"
            />
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs opacity-60">Rating:</span>
                <StarRating value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
              </div>
              <button
                disabled={submitting}
                className="px-6 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:scale-105 transition disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Submit"}
              </button>
            </div>
            <p className="text-xs opacity-50">
              Your message will be reviewed before it appears publicly.
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      {testimonials === null ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass rounded-2xl p-6 h-40 animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center opacity-60 text-sm">
          No messages yet — be the first to leave one!
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <Quote className="text-accent/50" size={22} />
                {t.rating && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={13} className="fill-accent text-accent" />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm opacity-80 leading-relaxed flex-1">{t.quote}</p>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                {t.role && <p className="text-xs opacity-60">{t.role}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
