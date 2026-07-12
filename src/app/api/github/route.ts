import { NextResponse } from "next/server";
import content from "@/data/content.json";

function extractUsername(url: string) {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
}

export async function GET() {
  const username = extractUsername(content.profile.social.github);

  if (!username) {
    return NextResponse.json({ error: "No GitHub username configured" }, { status: 400 });
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
    ]);

    if (!userRes.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0)
      : 0;

    const languageCounts: Record<string, number> = {};
    if (Array.isArray(repos)) {
      for (const r of repos) {
        if (r.language) languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
      }
    }
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      username,
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars,
      topLanguages,
      avatarUrl: user.avatar_url,
    });
  } catch (err) {
    console.error("GitHub stats error:", err);
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}
