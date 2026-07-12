"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const alreadyLogged = sessionStorage.getItem("visit-logged");
    const logAndFetch = async () => {
      try {
        if (!alreadyLogged) {
          await fetch("/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: pathname }),
          });
          sessionStorage.setItem("visit-logged", "1");
        }
        const res = await fetch("/api/visitors");
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      } catch {
        // fail silently — this is a nice-to-have, not critical
      }
    };
    logAndFetch();
  }, [pathname]);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 text-xs glass px-3 py-1.5 rounded-full"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      {count} {count === 1 ? "person" : "people"} viewed today
    </motion.div>
  );
}
