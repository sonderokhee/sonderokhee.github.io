# itsyohana.com

Portfolio of Yohana Oktavia — UI/UX designer & front-end developer, Bali.
Single page built with React, Vite, Tailwind CSS v4 and Framer Motion. English / Indonesian.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

- Copy (EN/ID), contact details, skills and projects: `src/content.js`
- Sections: `src/components/`
- Colours and fonts: `@theme` block in `src/index.css`
- Static files (video, portfolio images, CV, CNAME): `public/`

Deploys to GitHub Pages through `.github/workflows/deploy.yml` on every push to `main`
(Settings → Pages → Source must be set to **GitHub Actions**).
