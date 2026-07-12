"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Check, X, Trash2, Star } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number | null;
  approved: boolean;
  createdAt: string;
};

export default function TestimonialsPanel() {
  const [items, setItems] = useState<Testimonial[] | null>(null);

  async function load() {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function setApproved(id: string, approved: boolean) {
    await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    setItems((prev) => prev?.map((t) => (t.id === id ? { ...t, approved } : t)) ?? null);
    toast.success(approved ? "Published" : "Hidden");
  }

  async function remove(id: string) {
    await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev?.filter((t) => t.id !== id) ?? null);
    toast.success("Deleted");
  }

  if (!items) return <p className="opacity-60 text-sm">Loading testimonials...</p>;

  if (items.length === 0)
    return (
      <div className="glass rounded-2xl p-10 text-center opacity-60">
        No testimonials submitted yet.
      </div>
    );

  return (
    <div className="space-y-3">
      {items.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass rounded-2xl p-5 ${t.approved ? "border-l-4 border-green-500" : "border-l-4 border-yellow-500"}`}
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{t.name}</p>
                {t.role && <span className="text-xs opacity-60">· {t.role}</span>}
                {t.rating && (
                  <span className="flex gap-0.5 ml-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={11} className="fill-accent text-accent" />
                    ))}
                  </span>
                )}
              </div>
              <p className="text-xs opacity-50 mt-0.5">
                {new Date(t.createdAt).toLocaleString()} ·{" "}
                <span className={t.approved ? "text-green-500" : "text-yellow-500"}>
                  {t.approved ? "Published" : "Pending review"}
                </span>
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setApproved(t.id, !t.approved)}
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:text-green-500 transition"
                title={t.approved ? "Unpublish" : "Approve & publish"}
              >
                {t.approved ? <X size={14} /> : <Check size={14} />}
              </button>
              <button
                onClick={() => remove(t.id)}
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:text-red-400 transition"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm opacity-80 whitespace-pre-wrap">{t.quote}</p>
        </motion.div>
      ))}
    </div>
  );
}
