"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Mascot() {
  const [wave, setWave] = useState(false);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setWave(true)}
      onMouseLeave={() => setWave(false)}
    >
      {/* Ambient glow */}
      <div className="absolute w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <motion.div
        className="absolute w-40 h-40 bg-plum/25 rounded-full blur-2xl"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 400 400"
        className="relative w-full max-w-md"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Desk */}
        <rect x="60" y="300" width="280" height="14" rx="4" fill="#334155" opacity="0.4" />
        <rect x="70" y="314" width="10" height="50" fill="#334155" opacity="0.25" />
        <rect x="320" y="314" width="10" height="50" fill="#334155" opacity="0.25" />

        {/* Chair back */}
        <rect x="145" y="145" width="110" height="130" rx="22" fill="#1A2438" />

        {/* Body — hoodie, deep wine with gold trim */}
        <path
          d="M148 210 Q148 188 177 183 L223 183 Q252 188 252 210 L258 288 Q200 300 142 288 Z"
          fill="#334155"
        />
        <rect x="178" y="245" width="44" height="26" rx="8" fill="#0B1220" opacity="0.2" />
        <line x1="188" y1="192" x2="185" y2="218" stroke="#2E5AAC" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        <line x1="212" y1="192" x2="215" y2="218" stroke="#2E5AAC" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        {/* collar trim */}
        <path d="M177 183 Q200 198 223 183" stroke="#2E5AAC" strokeWidth="2.5" fill="none" opacity="0.4" />

        {/* Neck */}
        <rect x="188" y="166" width="24" height="26" rx="8" fill="#D9A066" />

        {/* Head group */}
        <motion.g
          animate={{ rotate: [0, -2, 0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 128px" }}
        >
          {/* Head — slightly squarer jaw for a masculine profile */}
          <path
            d="M156 118 Q154 160 176 178 Q188 188 200 188 Q212 188 224 178 Q246 160 244 118 Q244 78 200 76 Q156 78 156 118 Z"
            fill="#D9A066"
          />
          {/* Ears */}
          <circle cx="155" cy="122" r="7" fill="#D9A066" />
          <circle cx="245" cy="122" r="7" fill="#D9A066" />

          {/* Short cropped hair */}
          <path
            d="M154 116 Q150 68 200 64 Q250 68 246 116 Q244 96 226 90 Q214 84 200 84 Q186 84 174 90 Q156 96 154 116 Z"
            fill="#1E293B"
          />
          {/* Side part */}
          <path d="M182 86 Q188 78 196 76" stroke="#0B1220" strokeWidth="2" fill="none" opacity="0.5" />
          {/* Sideburns */}
          <rect x="152" y="108" width="6" height="18" rx="2" fill="#1E293B" />
          <rect x="242" y="108" width="6" height="18" rx="2" fill="#1E293B" />

          {/* Eyebrows — straighter, thicker */}
          <rect x="172" y="112" width="18" height="3.5" rx="1.5" fill="#1E293B" transform="rotate(-4 181 114)" />
          <rect x="210" y="112" width="18" height="3.5" rx="1.5" fill="#1E293B" transform="rotate(4 219 114)" />

          {/* Eyes (blink) */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1, 1] }}
            style={{ transformOrigin: "200px 130px" }}
          >
            <circle cx="182" cy="130" r="6" fill="#0B1220" />
            <circle cx="218" cy="130" r="6" fill="#0B1220" />
          </motion.g>

          {/* Nose */}
          <path d="M199 132 Q196 142 200 145" stroke="#B8875A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

          {/* Smile */}
          <path d="M184 152 Q200 162 216 152" stroke="#1E293B" strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* Light jaw shadow for a defined look */}
          <path d="M170 160 Q200 182 230 160" stroke="#B8875A" strokeWidth="3" fill="none" opacity="0.25" strokeLinecap="round" />
        </motion.g>

        {/* Left arm — typing */}
        <motion.g
          animate={{ rotate: [0, 6, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.4 }}
          style={{ transformOrigin: "168px 225px" }}
        >
          <rect x="158" y="215" width="18" height="42" rx="9" fill="#334155" />
          <circle cx="167" cy="260" r="10" fill="#D9A066" />
        </motion.g>

        {/* Right arm — types, or waves on hover */}
        <motion.g
          animate={
            wave
              ? { rotate: [0, -50, -35, -50, -20] }
              : { rotate: [0, -6, 0] }
          }
          transition={
            wave
              ? { duration: 0.9, repeat: Infinity, repeatType: "loop" }
              : { duration: 0.5, repeat: Infinity, repeatDelay: 0.4, delay: 0.2 }
          }
          style={{ transformOrigin: "232px 225px" }}
        >
          <rect x="224" y="215" width="18" height="42" rx="9" fill="#334155" />
          <circle cx="233" cy="260" r="10" fill="#D9A066" />
        </motion.g>

        {/* Laptop */}
        <rect x="150" y="278" width="100" height="8" rx="3" fill="#334155" opacity="0.7" />
        <rect x="160" y="248" width="80" height="32" rx="4" fill="#1A2438" />
        <rect x="166" y="253" width="68" height="22" rx="2" fill="#2E5AAC" opacity="0.2" />

        {/* Plant */}
        <rect x="312" y="285" width="20" height="18" rx="3" fill="#334155" opacity="0.6" />
        <path d="M322 285 C312 270 312 260 319 250 C327 260 332 270 322 285" fill="#3F6B4A" />
        <path d="M322 285 C332 272 337 262 332 252 C322 262 315 272 322 285" fill="#4F7D5B" />
      </motion.svg>

      {/* Floating code badge */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-4 w-14 h-14 rounded-2xl glass flex items-center justify-center font-mono text-accent text-lg shadow-lg"
      >
        {"</>"}
      </motion.div>

      {/* Sparkle badge */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-16 left-2 w-10 h-10 rounded-xl glass flex items-center justify-center text-plum text-lg shadow-lg"
      >
        ✨
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-8 right-0 glass rounded-2xl rounded-br-sm px-4 py-3 max-w-[170px] text-sm shadow-lg"
      >
        Building <span className="text-accent font-medium">smart</span>, useful
        things ✨
      </motion.div>
    </div>
  );
}
