"use client";

import { useEffect, useState } from "react";
import content from "@/data/content.json";

export default function TypingRoles() {
  const roles = content.roles;
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 35 : 70;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className="italic gradient-text">
      {text}
      <span className="inline-block w-[3px] h-12 md:h-14 bg-accent ml-1 align-middle animate-pulse" />
    </span>
  );
}
