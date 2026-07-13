# Vasudev — Portfolio Starter

A production-grade **starting point** for your portfolio: Next.js 14 + TypeScript + Tailwind + Framer Motion, with an editable `content.json`, a password-protected admin panel, and a working contact form backed by PostgreSQL.

## What's included
- **Sidebar navigation** — fixed left sidebar on desktop (logo, avatar, section links with scroll-spy highlighting, socials, resume download), collapses to a mobile drawer
- **Command palette (⌘K / Ctrl+K)** — jump to any section or link instantly from anywhere on the site
- **Route transitions** — smooth fade between the homepage and the Contact page
- **Multi-role typing effect** — your name's title types and cycles through the roles listed in `content.json`
- **Live GitHub stats card** — real repo count, stars, followers, and top languages pulled from the GitHub API (not fake numbers)
- **Live visitor counter** — "X people viewed today," backed by a real `VisitorLog` database table
- **"Now" section** — a small "what I'm currently building/learning" status block
- **Project case study modals** — click any project card for a full detail view (features, tech, links) instead of just inline text
- **Confetti burst** on successful contact form submission
- **Skills Galaxy** — an orbital visualization of your skill categories, hover a node to see the skills in it
- **Journey Timeline** — a horizontal timeline combining your education and experience
- **Stats dashboard** — 6 quick-glance metrics editable in `content.json`
- **Tech stack strip** — real technology logos pulled from `content.json`
- **Testimonials** — placeholder cards ready for real quotes (see note below — don't skip replacing these)
- **CTA banner** — "Let's build the future together" callout before the contact form
- **Distinctive theme** — "Executive Navy": deep navy background, steel-blue accent, slate secondary, Fraunces (display serif) + Inter (body) + JetBrains Mono (technical labels)
- Loading screen, custom cursor, magnetic buttons, scroll-triggered animations
- **Achievements tab** with its own section, image gallery, and fullscreen lightbox — upload images straight from the admin dashboard
- **AI chatbot widget** (free, via Groq) — visitors can ask questions about you; answers using your `content.json` data
- **Scroll progress bar** — a thin gradient line at the very top of the page showing how far you've scrolled
- **Back-to-top button** — appears after scrolling past the hero, smooth-scrolls back up
- **Ambient background** — soft, slow-drifting gradient blobs behind the entire site for visual cohesion (not just the hero)
- **Flip-card certificates** — hover any certificate to flip it and reveal the issuer, year, and credential link on the back
- **Filterable skills** — category tabs above your skill cards now that you have more of them
- **Interactive testimonials / guestbook** — visitors can submit their own testimonial with a star rating directly on the site; you approve or reject each one from the admin dashboard before it goes public
- **Clap button** — a real, database-backed reaction counter (like Medium's claps) visitors can tap before the contact section
- **Hidden Konami code easter egg** — try ↑ ↑ ↓ ↓ ← → ← → b a anywhere on the site (there's also a hint left in the browser console for anyone who checks)
- **Custom 404 page** — on-brand and a little playful instead of a blank error page
- **Messages inbox** in the admin dashboard — see every contact form submission without touching a database tool
- Content editable via `/admin` dashboard — no code changes needed for text/projects/achievements
- Contact form → saved to PostgreSQL via Prisma
- Schema stub for a Blog/Gallery (commented in `prisma/schema.prisma`) ready for you to activate

## After pulling this update, run one more migration
Testimonials and the clap counter both need new tables:
```bash
npx prisma generate
npx prisma migrate dev --name add_testimonials_and_reactions
```
(Prisma applies any migrations you're missing — safe to run even if you're partly caught up already.)

## How the testimonials/guestbook feature works
1. A visitor clicks **"Leave a message"** on your site, fills in their name, an optional role, a quote, and a star rating
2. It's saved to the database as **unapproved** — nothing shows publicly yet
3. You go to `/admin/dashboard` → **Testimonials** tab, see every submission (pending and published), and click the checkmark to approve one
4. Approved testimonials appear on the live site immediately — no redeploy needed, since they're read from the database, not `content.json`

This means you're fully protected from spam or inappropriate submissions showing up automatically — you're always the gatekeeper.

## Important — placeholder content to replace before going live
- **Stats** (`content.json` → `stats`) — "GitHub Repos" and "Competitions" are set to `0` as placeholders. Update with your real numbers (or let the live GitHub Stats card be the real source of truth for repo count).
- **Roles** (`content.json` → `roles`) — the typing effect cycles through this array; edit it to whatever titles actually describe you.
- **Now** (`content.json` → `now`) — update this periodically; a stale "what I'm doing now" note is worse than not having one.
- **GitHub username** — the live stats card reads your username from `profile.social.github`. Make sure that URL points to your real GitHub profile or the card will silently hide itself (it fails gracefully rather than showing an error).

## What's NOT included yet
- **Live AI model demos** ("AI Playground" with real-time inference) — this needs actual trained models running on a server, which is a separate ML backend project, not something built into a portfolio site template. If you want this eventually, your project demo links (GitHub/live URL) are the realistic version for now.
- **Recruiter View toggle** — a whole alternate condensed content mode; ask if you want this built as a follow-up
- Google OAuth (currently: simple username/password admin login)
- Cloudinary/S3 image uploads (currently: images save to `/public/uploads` on the server disk — works locally and on Railway/Render, but not on Vercel's read-only filesystem, see note below)
- Blog engine, photo gallery feed, visitor analytics dashboard

---

## 1. Prerequisites
- Node.js 18+ (`node -v` to check)
- A PostgreSQL database — easiest options for a student project:
  - [Neon](https://neon.tech) (free tier, serverless Postgres) — recommended
  - [Supabase](https://supabase.com) (free tier, Postgres + storage)
  - Or local Postgres via `sudo apt install postgresql`

## 2. Setup

```bash
cd portfolio
npm install
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL="<paste your Neon/Supabase connection string>"
ADMIN_USERNAME="vasudev"
ADMIN_PASSWORD="pick-a-real-password"
SESSION_SECRET="<run: openssl rand -hex 32>"
GROQ_API_KEY="<get one free at console.groq.com/keys, no credit card needed>"
```

The chatbot widget (bottom-right bubble) reads your `content.json` automatically and answers only from that data — update your content and the bot's answers update too. Without an API key set, the widget still shows but replies with a setup message instead of erroring. It runs on Groq's free tier (Llama 3.3 70B) — fast and free, no billing required.

## 3. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This creates the `ContactMessage` table in your database.

## 4. Run locally

```bash
npm run dev
```

Visit:
- `http://localhost:3000` — the site
- `http://localhost:3000/admin` — login with the username/password from `.env`

## 5. Add your content
Two ways:
- **Easiest**: log into `/admin/dashboard` and edit profile/about/projects, click "Save All Changes"
- **Direct**: edit `src/data/content.json` yourself — it's plain JSON, safe to hand-edit

Add your photo to `public/profile.jpg` and resume to `public/resume.pdf`, then reference them in content (already wired by default path).

The sidebar currently shows your initials as a placeholder avatar instead of a photo — swap in `<img>` yourself in `src/components/Sidebar.tsx` once you have a headshot you like, or leave the initials badge, it's intentional and clean.

Stats (`stats`) and the tech logo strip (`techStack`) are edited directly in `content.json` for now — available logo keys are in `src/components/TechStack.tsx`.

## 6. Deploy (host it live)

The easiest free path: **Vercel** (hosts the Next.js app) + **Neon** (hosts Postgres). Both have generous free tiers.

### Step 1 — Push your code to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
```
Create a new repo on [github.com/new](https://github.com/new), then:
```bash
git remote add origin https://github.com/<your-username>/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2 — Create your production database (if not done already)
1. Go to [neon.tech](https://neon.tech) → sign up → create a project
2. Copy the connection string it gives you (starts with `postgresql://...`)

### Step 3 — Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new) → sign in with GitHub → import your `portfolio` repo
2. Before clicking Deploy, expand **Environment Variables** and add every key from your `.env` file:
   - `DATABASE_URL`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
   - `GROQ_API_KEY`
3. Click **Deploy**. Vercel builds and gives you a live URL like `portfolio-yourname.vercel.app`

### Step 4 — Run the database migration against production
Locally, point at your production `DATABASE_URL` once to create the tables (Neon's connection string works from anywhere):
```bash
npx prisma migrate deploy
```

### Step 5 — Custom domain (optional)
In the Vercel project → Settings → Domains → add your domain (e.g. from Namecheap/GoDaddy) and follow the DNS instructions Vercel shows you.

Any time you `git push` to `main`, Vercel automatically redeploys.

> ⚠️ Important: On Vercel, the filesystem is read-only in production, so the admin dashboard's "edit content.json" feature **and** the achievement image uploads **will not persist** after deploy — both only work when running locally or on a server with a writable disk (e.g. Railway/Render). For production content editing and image uploads, migrate to the database + add Cloudinary (see Next Steps below).

---

## Next steps (in priority order)

1. **Move content to the database** instead of `content.json`, so admin edits persist in production. The commented `Project`, `BlogPost`, `GalleryImage` models in `prisma/schema.prisma` are your starting point — uncomment, migrate, and swap the admin API routes to read/write via Prisma instead of the filesystem.
2. **Add Cloudinary** for image uploads: sign up free, add `CLOUDINARY_*` keys to `.env`, use their Next.js widget or unsigned upload preset for drag-and-drop uploads in the admin dashboard.
3. **Add Google OAuth** via [Auth.js (NextAuth)](https://authjs.dev) once you're ready to replace the simple password login with a "Login with Google" flow and proper session/role management.
4. **Build the blog + gallery** pages once their DB models are active — they'll follow the same pattern as Projects (list + admin CRUD).
5. **Add visitor analytics** — either self-hosted (log page views to `VisitorLog`) or just plug in Google Analytics/Plausible for a quick win.

Because the remaining work spans many files and iterative testing (auth flows, file uploads, deployment debugging), you'll move faster continuing this in **Claude Code** working directly in this repo, rather than pasting code back and forth in chat.
