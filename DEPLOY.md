# Deploying to GitHub Pages

The site is configured for **https://huement.github.io/iRock/**.

## Option 1: GitHub Actions (recommended)

1. Push this project to `https://github.com/huement/iRock`
2. In the repo: **Settings → Pages → Source**: choose **Deploy from a branch**
3. **Branch**: `gh-pages` | **Folder**: `/ (root)` | Save
4. Push to `main`; the workflow will build and deploy to `gh-pages`

## Option 2: Manual deploy

```bash
cd /path/to/docs
npm run build
npx gh-pages -d dist
```

Requires `origin` to point at `https://github.com/huement/iRock.git`.

## Initial setup (hard reset / replace repo)

If you're replacing the existing iRock repo:

```bash
cd /path/to/docs   # this Astro project folder

# Init git and add remote (if starting fresh)
git init
git remote add origin https://github.com/huement/iRock.git

# Stage all source files
git add .
git commit -m "Replace with Astro portfolio"

# If push fails with HTTP 400 / "remote end hung up" (large repos):
git config http.postBuffer 524288000

# Force push to main (replaces remote history)
git push -u origin main --force

# Deploy the built site to gh-pages
npm run deploy
```

Then in GitHub: **Settings → Pages** → Source: **Deploy from branch** → Branch: **gh-pages** → Save.

## .nojekyll

The `public/.nojekyll` file is included so GitHub Pages serves all files (including `_astro/` and other underscore-prefixed paths) without Jekyll processing.
