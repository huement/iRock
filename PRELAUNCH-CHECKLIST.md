# Pre-launch checklist: temp images & text to update

Items to confirm or replace before the site is “done.”  
*(If something is already correct for you, just leave it.)*

---

## 1. Site URL & domain ✅

Current base URL: `https://huement.github.io/iRock/`

| File | Current value |
|------|---------------|
| `astro.config.mjs` | `site: 'https://huement.github.io/iRock/'` |
| `src/pages/index.astro` | `const site = import.meta.env.SITE ?? 'https://huement.github.io/iRock/'` (fallback) |
| `src/layouts/Layout.astro` | `baseUrl = 'https://huement.github.io/iRock/'` (canonical, og:url) |

---

## 2. Social / OG image ✅

The site uses **`/github-johnny13.png`** for:

- Schema.org Person `image` (`index.astro` personSchema)
- Open Graph `og:image`
- Twitter Card `twitter:image`

All referenced in `Layout.astro` and `index.astro`. The android-chrome icons are used in `site.webmanifest` for PWA / Add to Home Screen.

---

## 3. Resume download link

The “Resume Download” button and README use this Google Drive link:

- **URL:** `https://drive.google.com/file/d/12iPY5GhldMc1_CVRw1VqAyNbo3dAn3t2/view?usp=sharing`

**To fix:** If that’s a temp or old file, upload your real resume to Google Drive (or host it elsewhere), set sharing to “Anyone with the link,” and replace the link in:

- `src/pages/index.astro` (Resume Download button `href`)
- `README.md` (resume PDF link)

---

## 4. humans.txt ✅

Updated with Derek Scott, site URL, GitHub, LinkedIn, Twitter, location, and tech stack (Astro, React, TypeScript, Bootstrap, SCSS, Vite).

---

## 5. Contact & profile links ✅

| Where | Current value | Notes |
|-------|----------------|-------|
| Email | `admin@huement.com` | `index.astro` (button + personSchema), Layout meta author |
| GitHub | `https://github.com/johnny13` | `index.astro`, `portfolio.ts` (socials) |
| LinkedIn | `https://www.linkedin.com/in/derekscott13/` | `index.astro`, `portfolio.ts`, personSchema |
| Resume | (see section 3) | Button + README |
| Discord | `johnnyfortune_21837` | personSchema `sameAs` only |
| CodePen | `https://codepen.io/johnny13` | `portfolio.ts` socials |
| YouTube | `https://www.youtube.com/@barebonescode` | `portfolio.ts` |
| X/Twitter | `https://x.com/huement` | `portfolio.ts` |
| Blog | `https://huement.com/blog` | `portfolio.ts` |

---

## 6. Schema & meta (person, site name, description) ✅

- **Person name:** “Derek Scott” in Layout, index (schema, links), Hero (`heroData`), portfolio.
- **Site name / tagline:** “Derek Scott | Developer Extraordinaire” in Layout (title, og, twitter), index (schema, Layout props).
- **Description:** “Full Stack RockStar Web Developer. Expert with TypeScript, PHP & Python. 11 years of experience building web applications, and over 5 years building Java based Android Applications. I focus on UI/UX as well as AI automation.” (personSchema, websiteSchema, Layout meta, og, twitter).
- **Alumni:** “University of North Dakota” in personSchema in `index.astro`.
- **Job title:** “Full Stack Web Developer” in personSchema; “Developer Extraordinaire” in heroData and titles.

---

## 7. Favicons & app icons ✅

All icons confirmed and in use under `public/`:

- `/favicon.ico`, `/favicon-32x32.png`, `/favicon-16x16.png`
- `/apple-touch-icon.png`
- `/android-chrome-192x192.png`, `/android-chrome-512x512.png` (referenced in `site.webmanifest`)

`Layout.astro` links to favicons; `site.webmanifest` links to android-chrome icons for PWA.

---

## 8. Optional: robots.txt & README

- **robots.txt** – Currently allows all crawlers; no placeholder content. Change only if you need to disallow paths or use a different domain.
- **README.md** – Resume link (see section 3). The rest is project description; update if you change repo name or deployment URL.

---

## Quick reference: key files

1. **astro.config.mjs** – `site` URL (`https://huement.github.io/iRock/`)
2. **src/pages/index.astro** – `site` fallback, personSchema (image, email, sameAs), contact button hrefs
3. **src/layouts/Layout.astro** – canonical, og:url, og:image, twitter:image
4. **src/data/portfolio.ts** – heroData (name, tagline, intro), social links (hrefs)
5. **humans.txt** – team/site credits
6. **public/** – favicons, android-chrome icons, `site.webmanifest`
7. **README.md** – Resume PDF link

All items above have been completed. The site is configured for `huement.github.io/iRock/` with the correct contact info (`admin@huement.com`), branding, and assets.
