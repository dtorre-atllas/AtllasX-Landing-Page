# Deploying AtllasX

This is a standard Vite + React app. Build command `npm run build`, output folder `dist`.

## 1. Push to GitHub

Open Terminal, then:

```bash
cd "/Users/davidtorre/Desktop/AtllasX Landing Page"
git init
git add .
git commit -m "AtllasX homepage redesign"
```

Create an empty repo on github.com (e.g. `atllasx-site`), then:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/atllasx-site.git
git push -u origin main
```

(No CLI? Use **GitHub Desktop** → "Add Local Repository" → select this folder → Publish.)

## 2. Deploy on Vercel (recommended)

1. Go to vercel.com → New Project → import the GitHub repo.
2. Vercel auto-detects **Vite**. Confirm:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy. Every push to `main` now redeploys automatically.

### Custom domain (atllasx.com)
- Vercel → Project → Settings → Domains → add `atllasx.com`.
- Update your DNS per Vercel's instructions (and move it off Figma if it's currently published there).
- SSL is automatic.

## Netlify (alternative)
Same idea: New site from Git → build `npm run build`, publish directory `dist`.

## Notes
- `public/hero.mp4` is the hero background video; it ships automatically in the build.
- All external links (login, demo, docs, legal) and the ContentSquare + Intercom scripts are preserved from the original.
