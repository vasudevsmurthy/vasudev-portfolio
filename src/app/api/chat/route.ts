import { NextRequest, NextResponse } from "next/server";
import content from "@/data/content.json";

// Builds a compact system prompt from content.json so the bot only
// talks about real, current info on the site (edit content.json / the
// admin dashboard and the bot's knowledge updates automatically).
function buildSystemPrompt() {
  const { profile, about, skills, projects, experience, education } = content;

  const skillsText = skills
    .map((g) => `${g.category}: ${g.items.map((i) => i.name).join(", ")}`)
    .join(" | ");

  const projectsText = projects
    .map((p) => `${p.title} — ${p.description} (Tech: ${p.tech.join(", ")})`)
    .join(" | ");

  const experienceText = experience
    .map((e) => `${e.role} at ${e.company} (${e.period}): ${e.description}`)
    .join(" | ");

  const educationText = education
    .map((e) => `${e.degree}, ${e.institution} (${e.period})`)
    .join(" | ");

  return `You are a friendly assistant embedded on ${profile.name}'s personal portfolio website. Answer visitor questions about ${profile.name} using ONLY the information below. Keep answers short (2-4 sentences), warm, and helpful. If asked something you don't have info on, say you don't have that detail and suggest they use the contact form.

Name: ${profile.name}
Title: ${profile.title}
Tagline: ${profile.tagline}
Location: ${profile.location}
Bio: ${about.bio}
Career objective: ${about.careerObjective}
Skills: ${skillsText}
Projects: ${projectsText}
Experience: ${experienceText}
Education: ${educationText}

Never invent facts not listed above. Never share the contact email/phone directly — point them to the contact form instead.`;
}

// Uses Groq's free API (OpenAI-compatible format) — no credit card needed.
// Get a free key at https://console.groq.com/keys
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Chat is not configured yet. Add GROQ_API_KEY to .env" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 400,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages,
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Groq API error:", res.status, errBody);
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "production"
              ? "Chat request failed"
              : `Chat request failed (${res.status}): ${errBody}`,
        },
        { status: 500 }
      );
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
