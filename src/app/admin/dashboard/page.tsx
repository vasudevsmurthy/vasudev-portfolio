"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MessagesPanel from "@/components/MessagesPanel";
import TestimonialsPanel from "@/components/TestimonialsPanel";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  images: string[];
  timeline: string;
  features: string[];
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

type Content = {
  profile: any;
  about: any;
  skills: any[];
  projects: Project[];
  experience: any[];
  education: any[];
  certificates: any[];
  achievements: Achievement[];
};

export default function Dashboard() {
  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"content" | "messages" | "testimonials">("content");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/content").then(async (res) => {
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      setContent(await res.json());
    });
  }, [router]);

  async function save() {
    if (!content) return;
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    res.ok ? toast.success("Saved!") : toast.error("Save failed");
  }

  function addProject() {
    if (!content) return;
    setContent({
      ...content,
      projects: [
        ...content.projects,
        {
          id: crypto.randomUUID(),
          title: "New Project",
          description: "",
          tech: [],
          githubUrl: "",
          liveUrl: "",
          images: [],
          timeline: "",
          features: [],
        },
      ],
    });
  }

  function updateProject(idx: number, field: keyof Project, value: any) {
    if (!content) return;
    const projects = [...content.projects];
    // @ts-ignore
    projects[idx][field] = value;
    setContent({ ...content, projects });
  }

  function removeProject(idx: number) {
    if (!content) return;
    const projects = content.projects.filter((_, i) => i !== idx);
    setContent({ ...content, projects });
  }

  function addAchievement() {
    if (!content) return;
    setContent({
      ...content,
      achievements: [
        ...content.achievements,
        {
          id: crypto.randomUUID(),
          title: "New achievement",
          description: "",
          date: "",
          image: "",
        },
      ],
    });
  }

  function updateAchievement(idx: number, field: keyof Achievement, value: string) {
    if (!content) return;
    const achievements = [...content.achievements];
    achievements[idx] = { ...achievements[idx], [field]: value };
    setContent({ ...content, achievements });
  }

  function removeAchievement(idx: number) {
    if (!content) return;
    setContent({
      ...content,
      achievements: content.achievements.filter((_, i) => i !== idx),
    });
  }

  async function uploadAchievementImage(idx: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (res.ok) {
      updateAchievement(idx, "image", data.url);
      toast.success("Image uploaded");
    } else {
      toast.error(data.error || "Upload failed");
    }
  }

  if (!content) return <main className="p-10">Loading...</main>;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      <div className="flex justify-between items-center sticky top-0 bg-white/80 dark:bg-black/60 backdrop-blur py-4 z-10">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-1 glass rounded-full p-1">
            <button
              onClick={() => setTab("content")}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                tab === "content" ? "bg-accent text-white" : "opacity-70"
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setTab("messages")}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                tab === "messages" ? "bg-accent text-white" : "opacity-70"
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setTab("testimonials")}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                tab === "testimonials" ? "bg-accent text-white" : "opacity-70"
              }`}
            >
              Testimonials
            </button>
          </div>
        </div>
        {tab === "content" && (
          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2 rounded-full bg-accent text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        )}
      </div>

      {tab === "messages" ? (
        <MessagesPanel />
      ) : tab === "testimonials" ? (
        <TestimonialsPanel />
      ) : (
        <>
      {/* Profile */}
      <section className="glass rounded-2xl p-6 space-y-3">
        <h2 className="font-semibold text-lg">Profile</h2>
        {["name", "title", "tagline", "email", "phone", "location"].map(
          (field) => (
            <div key={field}>
              <label className="text-sm opacity-70 capitalize">{field}</label>
              <input
                className="w-full glass rounded-lg px-3 py-2 mt-1"
                value={content.profile[field] || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    profile: { ...content.profile, [field]: e.target.value },
                  })
                }
              />
            </div>
          )
        )}
      </section>

      {/* About */}
      <section className="glass rounded-2xl p-6 space-y-3">
        <h2 className="font-semibold text-lg">About</h2>
        <label className="text-sm opacity-70">Bio</label>
        <textarea
          className="w-full glass rounded-lg px-3 py-2"
          rows={4}
          value={content.about.bio}
          onChange={(e) =>
            setContent({
              ...content,
              about: { ...content.about, bio: e.target.value },
            })
          }
        />
      </section>

      {/* Projects */}
      <section className="glass rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Projects</h2>
          <button
            onClick={addProject}
            className="text-sm px-3 py-1 rounded-full bg-accent/20 text-accent"
          >
            + Add Project
          </button>
        </div>

        {content.projects.map((p, idx) => (
          <div key={p.id} className="border border-white/10 rounded-xl p-4 space-y-2">
            <input
              className="w-full glass rounded-lg px-3 py-2"
              placeholder="Title"
              value={p.title}
              onChange={(e) => updateProject(idx, "title", e.target.value)}
            />
            <textarea
              className="w-full glass rounded-lg px-3 py-2"
              placeholder="Description"
              value={p.description}
              onChange={(e) =>
                updateProject(idx, "description", e.target.value)
              }
            />
            <input
              className="w-full glass rounded-lg px-3 py-2"
              placeholder="Tech (comma separated)"
              value={p.tech.join(", ")}
              onChange={(e) =>
                updateProject(
                  idx,
                  "tech",
                  e.target.value.split(",").map((t) => t.trim())
                )
              }
            />
            <input
              className="w-full glass rounded-lg px-3 py-2"
              placeholder="GitHub URL"
              value={p.githubUrl}
              onChange={(e) =>
                updateProject(idx, "githubUrl", e.target.value)
              }
            />
            <input
              className="w-full glass rounded-lg px-3 py-2"
              placeholder="Live URL"
              value={p.liveUrl}
              onChange={(e) => updateProject(idx, "liveUrl", e.target.value)}
            />
            <button
              onClick={() => removeProject(idx)}
              className="text-sm text-red-400 hover:underline"
            >
              Remove project
            </button>
          </div>
        ))}
      </section>

      {/* Achievements */}
      <section className="glass rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Achievements</h2>
          <button
            onClick={addAchievement}
            className="text-sm px-3 py-1 rounded-full bg-accent/20 text-accent"
          >
            + Add Achievement
          </button>
        </div>

        {content.achievements.map((a, idx) => (
          <div key={a.id} className="border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                {a.image ? (
                  <img src={a.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs opacity-50">No image</span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  className="w-full glass rounded-lg px-3 py-2"
                  placeholder="Title"
                  value={a.title}
                  onChange={(e) => updateAchievement(idx, "title", e.target.value)}
                />
                <input
                  className="w-full glass rounded-lg px-3 py-2"
                  placeholder="Date (e.g. March 2026)"
                  value={a.date}
                  onChange={(e) => updateAchievement(idx, "date", e.target.value)}
                />
              </div>
            </div>
            <textarea
              className="w-full glass rounded-lg px-3 py-2"
              placeholder="Description"
              value={a.description}
              onChange={(e) => updateAchievement(idx, "description", e.target.value)}
            />
            <div className="flex items-center justify-between">
              <label className="text-sm px-3 py-2 rounded-full glass cursor-pointer hover:opacity-80">
                Upload image
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadAchievementImage(idx, file);
                  }}
                />
              </label>
              <button
                onClick={() => removeAchievement(idx)}
                className="text-sm text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>
        </>
      )}
    </main>
  );
}
