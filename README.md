# Yahya Alshalabi — personal site (Zola + Tera + Tailwind)

A one-page personal site. Dark mode, white primary, outlined secondary
elements, no color palette. Built with:

- **Zola** — Rust-based static site generator (fast, single binary, no Node
  build chain required)
- **Tera** — the template engine Zola uses, syntax modeled on Jinja2/Django
  templates (`{% extends %}`, `{% block %}`, `{% for %}`, `{{ variable }}`)
- **Tailwind CSS** — via the Play CDN script tag for zero build-step styling,
  so editing is just changing utility classes in the templates

## Getting started

1. Install Zola (one-time):
   - macOS: `brew install zola`
   - Windows: `choco install zola` or `scoop install zola`
   - Linux / other: download a binary from
     https://github.com/getzola/zola/releases and put it on your PATH

2. From this folder, run:
   ```
   zola serve
   ```
   This starts a local dev server (usually `http://127.0.0.1:1111`) and
   live-reloads as you edit.

3. To build the final static files for hosting:
   ```
   zola build
   ```
   Output goes to a `public/` folder — upload that anywhere (Netlify,
   GitHub Pages, Vercel, any static host).

## Editing content

All the page text lives in `content/_index.md`, in the `[extra]` front
matter block — not in the templates. To change any wording (hero line,
"who I am," "how I work" list, story, etc.), edit that file only.

Contact links (email, LinkedIn, GitHub) and your name/role live in
`config.toml` under `[extra]`.

## Editing design

Layout and structure are in `templates/index.html`. Styling is done with
Tailwind utility classes directly in the HTML — e.g. to make the hero
headline bigger, find the line with `text-4xl sm:text-5xl md:text-6xl
lg:text-7xl` and adjust those size classes. No separate CSS file to hunt
through.

## Assets

- `static/img/me.jpg` — your headshot, already resized/optimized
- `static/img/logo.svg` — your logo, inverted to white for the dark
  background
- `static/img/favicon.svg` — your logo on a black square, used as the
  browser tab icon (browser tabs default to a light background, so this
  version keeps a solid backing behind the mark)
- `static/img/relentless.svg` — your personal graphic, used as a quiet
  visual accent after "The Story" section

## Adding Projects / Blog later

The nav in `templates/base.html` already has commented-out slots for
"Projects" and "Blog" links, gated behind `config.extra.show_projects_nav`
and `config.extra.show_blog_nav` (both currently `false` in `config.toml`).

When you're ready to add either:

1. Create a folder, e.g. `content/projects/`, with an `_index.md` inside it
   (front matter: `title`, `sort_by = "date"`, `template = "projects.html"`
   or similar) plus one `.md` file per project.
2. Create a matching template, e.g. `templates/projects.html`, following the
   same `{% extends "base.html" %}` / `{% block content %}` pattern used in
   `templates/index.html`.
3. Flip the matching `show_*_nav` flag to `true` in `config.toml`.

This keeps the current one-page layout untouched while giving each new
section its own clean template.

## A note on Tailwind

This project uses the Tailwind **Play CDN** (`cdn.tailwindcss.com`) — it
compiles utility classes in the browser at runtime, so there's no build step
to manage. This is fine for a small personal site. If the site grows and you
want a smaller, production-optimized CSS bundle later, swap the CDN
`<script>` tag in `templates/base.html` for a compiled stylesheet using the
Tailwind CLI (`npm install -D tailwindcss` → `npx tailwindcss -o
static/css/main.css --minify`), then link that file instead.
