"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, MailOpen, Trash2 } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesPanel() {
  const [messages, setMessages] = useState<Message[] | null>(null);

  async function load() {
    const res = await fetch("/api/admin/messages");
    if (res.ok) setMessages(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(msg: Message) {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: msg.id, read: !msg.read }),
    });
    setMessages(
      (prev) =>
        prev?.map((m) => (m.id === msg.id ? { ...m, read: !m.read } : m)) ?? null
    );
  }

  async function remove(id: string) {
    await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev?.filter((m) => m.id !== id) ?? null);
    toast.success("Message deleted");
  }

  if (!messages) return <p className="opacity-60 text-sm">Loading messages...</p>;

  if (messages.length === 0)
    return (
      <div className="glass rounded-2xl p-10 text-center opacity-60">
        No messages yet — they'll show up here as soon as someone uses your contact form.
      </div>
    );

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass rounded-2xl p-5 ${!msg.read ? "border-l-4 border-accent" : ""}`}
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-medium">{msg.name}</p>
              <a href={`mailto:${msg.email}`} className="text-sm text-accent hover:underline">
                {msg.email}
              </a>
              <p className="text-xs opacity-50 mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => toggleRead(msg)}
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:text-accent transition"
                title={msg.read ? "Mark unread" : "Mark read"}
              >
                {msg.read ? <MailOpen size={14} /> : <Mail size={14} />}
              </button>
              <button
                onClick={() => remove(msg.id)}
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:text-red-400 transition"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm opacity-80 whitespace-pre-wrap">{msg.message}</p>
        </motion.div>
      ))}
    </div>
  );
}
