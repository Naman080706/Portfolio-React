# Personal Portfolio

A modern, responsive portfolio website built with **React + Vite**. Dark/light theme,
smooth scroll animations, and a single content file so you can make it yours in minutes.

## Getting started

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:5173
npm run build    # build for production into /dist
npm run preview  # preview the production build locally
```

## Make it yours

Almost everything lives in **`src/data.js`** — edit that one file:

- **`profile`** — your name, roles, tagline, location, email, resume link, socials
- **`stats`** — the quick numbers under the hero
- **`about`** + **`timeline`** — your story and milestones
- **`skills`** — grouped skills with proficiency bars
- **`projects`** — your projects (title, description, tags, links, screenshot)
- **`experience`** + **`certifications`** — optional sections (set to `[]` to hide)

### Adding images
Drop files in the **`public/`** folder and reference them with a leading slash:
- Profile photo → set `profile.avatar = '/avatar.jpg'`
- Project screenshot → set a project's `image: '/project-one.png'`
- Resume → add `public/resume.pdf` (already linked by default)

### Changing colors
Edit the `--accent` and `--accent-2` variables at the top of **`src/index.css`**.

## Deploy (free options)

- **Vercel** — import the repo, it auto-detects Vite. Done.
- **Netlify** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — run `npm run build` and deploy the `dist` folder.

## Sections included

Home · About / Journey · Skills · Projects · Experience & Achievements · Contact

## Sections you could add later

Blog / writing · Testimonials · Services · Photo gallery · A "now / currently learning" note
