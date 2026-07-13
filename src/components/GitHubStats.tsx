"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, Users, FolderGit2 } from "lucide-react";

type Stats = {
  username: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
};

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setStats)
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  const maxCount = stats?.topLanguages[0]?.count || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-6 transition-shadow hover:shadow-lg"
    >
      <div className="flex items-center gap-2 mb-5">
        <Github size={18} className="text-accent" />
        <h3 className="font-medium text-sm">Live GitHub Activity</h3>
        {stats && (
          <a
            href={`https://github.com/${stats.username}`}
            className="ml-auto text-xs text-accent hover:underline"
          >
            @{stats.username}
          </a>
        )}
      </div>

      {!stats ? (
        <div className="grid grid-cols-3 gap-4 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-black/5 dark:bg-white/5" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center">
              <FolderGit2 size={16} className="mx-auto mb-1 text-accent" />
              <p className="font-display text-xl">{stats.publicRepos}</p>
              <p className="text-xs opacity-60">Repos</p>
            </div>
            <div className="text-center">
              <Star size={16} className="mx-auto mb-1 text-accent" />
              <p className="font-display text-xl">{stats.totalStars}</p>
              <p className="text-xs opacity-60">Stars</p>
            </div>
            <div className="text-center">
              <Users size={16} className="mx-auto mb-1 text-accent" />
              <p className="font-display text-xl">{stats.followers}</p>
              <p className="text-xs opacity-60">Followers</p>
            </div>
          </div>

          {stats.topLanguages.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs opacity-60 font-mono uppercase tracking-wide">
                Top Languages
              </p>
              {stats.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2 text-xs">
                  <span className="w-20 shrink-0">{lang.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(lang.count / maxCount) * 100}%` }}
                      viewport={{ once: true }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
