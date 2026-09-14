# Parker Cole — Engineering Portfolio

A complete static engineering portfolio with four evidence-based case studies, editable Markdown projects, optimized galleries, contact links, and the supplied resume PDF.

**Start with [EDITING_GUIDE.md](EDITING_GUIDE.md).** It explains the everyday GitHub editing workflow without requiring HTML changes.

## What is included

- Homepage with selected work, experience, education, About, skills, leadership, and contact.
- Work index and separate putter-design, AI drawing-tool, Peterbilt internship, and research pages.
- The actual supplied resume at `public/resume.pdf`.
- Project ordering, categories, featured selection, and draft/hide controls.
- Responsive image optimization and a captioned enlargement dialog.
- GitHub Pages deployment workflow and custom-domain support.
- Accessibility and responsive browser tests, research rationale, and QA evidence.

Actual project photography and CAD screenshots were not supplied. The visible image spaces are deliberately labeled. Peterbilt pages use public summaries and no internal visuals. Research remains in development. The golf club retains its pending-university-approval status.

## Technology and architecture

Astro produces ordinary HTML and CSS at build time. Markdown files contain projects; one JSON file contains personal details, experience, leadership, and skills. There is no runtime backend, database, paid service, or client-side framework. A small browser script controls the mobile menu and image enlargement.

Astro is preferable to manually maintained HTML here because new Markdown files automatically become consistent project pages and index entries. Content schemas detect missing image descriptions. Its image pipeline creates responsive WebP versions with reserved dimensions. The browser receives static pages, while GitHub Actions does the build work after an edit.

There **is** an automatic build step. “Easy editing” means you do not need to rewrite HTML, redesign the site, or run a build yourself when editing through GitHub.

## Local use

Install **Node.js 24 LTS** (Node 22.12 or newer is the minimum), then open a terminal in this folder:

```sh
npm ci
npm run dev
```

Open the address printed by Astro. To prepare a production build:

```sh
npm run check
npm run build
npm run preview
```

The deployable site is in `dist/`. Serve it over HTTP; double-clicking `index.html` does not emulate hosting paths. Astro 7's preview command may retain a background preview process. Use `npx astro preview stop` to stop it.

The delivered `dist/` uses root hosting paths. GitHub Actions automatically rebuilds for your actual repository or domain URL. For another static host, set `SITE_URL` to the complete public address before building. For example, in PowerShell:

```powershell
$env:SITE_URL = 'https://your-account.github.io/your-repository/'
npm run build
```

That is a syntax example, not your actual account. For a custom domain use its real address, with `/` as the path. For local-only builds, leave `SITE_URL` unset. Local builds intentionally omit unverified public canonical URLs; a public deployment generates canonical links, social-image URLs, and a populated sitemap.

## Folder structure

```text
content/
  profile.json                 Personal information and homepage content
  projects/                    One Markdown file per project
  templates/new-project.md     Copy this to add work
src/
  assets/images/projects/      Original project images
    putter/
    peterbilt/
    research/
  components/                  Reusable cards, images, galleries
  layouts/Base.astro           Navigation, metadata, footer, interactions
  pages/                       Homepage, index, project routes, SEO files
  styles/global.css            Visual design and responsive rules
  content.config.ts            Project field validation
public/
  resume.pdf                   Replace with a new PDF using this name
  favicon.svg
  social-preview.png
scripts/                       Build validation and browser/content tests
.github/workflows/deploy.yml    Automatic Pages deployment
qa/                            Test results and screenshots
dist/                          Generated deployment files; do not hand-edit
RESEARCH.md                    Sources and design decisions
EDITING_GUIDE.md                Plain-language maintenance instructions
QA_REPORT.md                   Actual verification results and limitations
```

Original project images are kept in `src/assets/`, not `public/`, so Astro can optimize them and avoid copying unneeded full-size originals to the public site.

## Deploy with GitHub Pages

1. Create a public GitHub repository. Choose the repository name you want in the site URL. Do not initialize it with a second README if uploading this complete project.
2. Put this source code on its `main` branch, including the `.github` folder, `package.json`, and `package-lock.json`. Do not upload `node_modules/`, `.astro/`, or `dist/` as source. GitHub Desktop is an easy way to include hidden folders correctly.
3. Open **Settings → Pages** and choose **GitHub Actions** as the source.
4. Open **Actions → Build and deploy portfolio → Run workflow**, or make a commit to `main`.
5. Wait for both build and deploy jobs to succeed. The deployment job and Pages settings show your live URL.

The workflow reads GitHub's actual Pages URL. It automatically handles either `https://account.github.io/repository/`, a user site at `https://account.github.io/`, or a configured custom domain. No username is hard-coded. GitHub Pages on a private repository may require a paid GitHub plan; a public repository works with GitHub Free.

If your branch has a different name, change `branches: [main]` in the workflow. If the first run fails because Pages is not configured, select GitHub Actions under Pages, then rerun the failed workflow. The build intentionally fails on missing image files or missing required alternative text, preserving the previous successful deployment.

## Connect a custom domain

1. Register the domain you actually want and verify it in GitHub's account settings using the official instructions.
2. In the repository's **Settings → Pages → Custom domain**, enter the domain and save it.
3. Configure its DNS using [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). For a subdomain such as `www`, the CNAME points to your `account.github.io` hostname, without the repository path. Apex domains use GitHub's documented A records or your DNS provider's supported ALIAS/ANAME option.
4. Wait for DNS checks, then enable **Enforce HTTPS** when available.
5. Rerun the deployment workflow. It reads the new domain from Pages and rebuilds all metadata and links for it.

An Actions-based Pages deployment does not require a repository `CNAME` file. Domain registration and DNS are not configured by this deliverable; no ownership of the suggested domain has been assumed.

## Tests

```sh
npm run check
npm run build
npx playwright install chromium
npm run preview
npm test
npm run test:content
```

`npm test` expects a running site at `http://127.0.0.1:4321/`. Use `QA_URL` for a different address. `CHROME_PATH` optionally points to an installed Chrome executable. Content tests use temporary fixture files, verify image and publishing behavior, and restore the normal build; run them without simultaneous content edits.

See [QA_REPORT.md](QA_REPORT.md) for the actual test environment, screenshots, measurements, and remaining content gaps. Local browser emulation does not replace testing on a physical iPhone or Android device.

## Content ownership

The biography, project claims, and resume are based on the supplied materials. No stock imagery or external portfolio assets were copied. Site design research sources are documented in [RESEARCH.md](RESEARCH.md). Review substantive new engineering claims against your records before publishing them.
