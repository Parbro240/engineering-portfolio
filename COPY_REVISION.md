# Portfolio Copy Revision — September 14, 2026

The existing design is preserved. The revised copy is implemented in the website source and tested locally using the actual GitHub Pages repository path. These edits have not been committed, pushed, or deployed.

## Page-by-Page Changes

| Page or shared area | Changes |
|---|---|
| Homepage | Rewrote the hero and About text in first person. Replaced slogans with Selected Engineering Projects, Engineering Experience, About Me, Technical and Professional Skills, Leadership and Activities, and Contact. Clarified GPA, graduation, certification, and minor labels. Rewrote employment bullets, separated professional skills, and incorporated the confirmed golf club approval status. |
| Projects index | Added a direct title and introduction. Rewrote all four card summaries and standardized View Case Study links. The research card now reflects work underway under Dr. Xiang. |
| Custom Golf Putter Design & Prototyping | Rewrote the overview, CAD and prototyping process, modular face and assembly discussion, and learning points. Retained resume-supported molded components and heat-set inserts. Removed unnecessary exclusions about dimensions and performance. Added a link to the related research case study. |
| AI-Assisted Engineering Drawing Analysis Tool | Organized the page around The Problem, My Approach, Result, and What I Learned. Kept the approximate five-minute-to-one-minute result specific to finding drawing information. Removed repeated disclaimers and exaggerated interpretations. Preserved your live title, with consistent capitalization. |
| Advanced Manufacturing Engineering at Peterbilt | Clarified your role, Creo Parametric work, DFA coursework, concurrent projects, weekly progress presentations, and final leadership presentation. Added a direct link to the drawing-tool case study. |
| Golf Putter Performance Research | Changed the status from in development to Research Underway using your confirmation. Named Dr. Xiang and Oklahoma State University. Explained the research question in first person and described test methods as possibilities. |
| 404 page | Replaced the slogan with Page Not Found and a clear View Projects action. Added a page-specific description and omitted canonical/social page URLs for this noindex error page. |
| Navigation, footer, project templates, galleries, and metadata | Standardized Title Case headings and buttons, removed final punctuation from major titles, reduced slash and ampersand separators, simplified gallery captions, and used one confidentiality note on each Peterbilt case study. Updated page descriptions and the social preview to use the student identity. |

## Factual Review

The supplied `Parker_Cole_Resume_2027.pdf` remains the source for formal education, dates, employment, activities, skills, and contact information. The website's resume PDF has the same SHA-256 hash as that supplied file; its contents were not changed.

- Identity: **Mechanical & Aerospace Engineering Student**.
- Formal degree: **Bachelor of Science, Mechanical and Aerospace Engineering**, exactly as supplied in the resume and confirmed by you.
- Minor: Mathematics. GPA: 4.00. Expected graduation: May 2028.
- Peterbilt: Advanced Manufacturing Engineering Intern, May 2026 – August 2026, Denton, Texas.
- Little Guys Movers: Mover / Navigator, May 2025 – August 2025.
- Sam's Club: Merchandise & Stocking Associate, May 2024 – July 2024.
- Cowboy Golf Club: August 2026 – Present; university approval is pending. You confirmed that you are working with the university.
- Cowboy Rocketworks: January 2026 – Present. Running Club: February 2026 – Present. Bands: August 2024 – May 2026. These dates follow the supplied resume.
- Putter prototypes: the resume supports molded components, modular screw-on faces, fastening methods, and heat-set inserts. Your original brief supports use of the Bambu P1S and DFA coursework during the internship.
- Research: you confirmed that you have started putter face research under Dr. Xiang at Oklahoma State University. Possible video, tracking, and controlled testing methods are not presented as completed experiments.

**No factual confirmation is required to publish this revision.** Exact research start dates, completed test methods, measurements, specific prototype revision examples, and project photographs can be added when you supply them. Existing image placeholders remain; no substitute photos or performance results were invented.

## Style System

Use first person and active verbs for personal work. Explain the task, approach, and supported result in plain engineering language. Keep most sentences around 10–25 words. Use Title Case for project titles, section headings, official job titles, statuses, and action links; use sentence case for prose, captions, and skill entries. Preserve official names and the resume's degree wording. Use full month names consistently.

Spell out “about five minutes to one minute per drawing” in prose. The visual uses 5 → 1 and states that the timing is approximate. Each Peterbilt page contains one short proprietary-information note.

These rules are also included in `EDITING_GUIDE.md` and the future-project template.

## Final QA

- Reviewed the live site first, inspected its source and supplied materials, and completed a second reading of the rendered copy across all seven pages.
- `npm run check`: 20 files checked, zero errors, warnings, or hints.
- `npm run build`: seven HTML pages built successfully using `SITE_URL=https://parbro240.github.io/engineering-portfolio/`.
- Static build validation: local links, assets, and the resume PDF passed.
- Browser matrix: all seven pages at **1440, 1024, 768, 430, 390, 375, and 320 pixels**; **49 checks passed**.
- No horizontal overflow or detected desktop/tablet header collisions. Screenshot review covered desktop and mobile page layouts, narrow-phone project headings, and tablet navigation and project cards.
- **37 local link destinations** passed, including project pages, section anchors, and the resume. Contact destinations match the supplied email, phone number, and LinkedIn URL.
- No browser JavaScript or console errors.
- Axe checks reported zero violations for the selected WCAG A/AA rules in all 49 cases. This is automated testing, not an accessibility certification.
- Mobile menu, keyboard opening, Escape, focus return, navigation, resize reset, skip link, 200% text size, reduced motion, and navigation without JavaScript passed.
- Rendered copy checked for corrupted character encoding, obsolete slogans, current degree/club/research wording, and exactly two confidentiality notes across the site.
- `git diff --check` passed.

The final browser report and screenshots are in `qa/copy-revision/`. The older root QA report, Lighthouse reports, and earlier screenshots describe the original build; they are retained as historical records. Lighthouse and the image-fixture/content-management suite were not rerun for this copy revision.

## Every Modified File

Replace these existing files at the same repository paths:

- `EDITING_GUIDE.md`
- `content/profile.json`
- `content/projects/peterbilt-ai-tool.md`
- `content/projects/peterbilt-manufacturing.md`
- `content/projects/putter-design.md`
- `content/projects/research-putting-performance.md`
- `content/templates/new-project.md`
- `public/social-preview.png`
- `scripts/create-social-preview.mjs`
- `scripts/qa.mjs`
- `src/components/Gallery.astro`
- `src/components/ProjectCard.astro`
- `src/components/ProjectVisual.astro`
- `src/layouts/Base.astro`
- `src/pages/404.astro`
- `src/pages/index.astro`
- `src/pages/work/[id].astro`
- `src/pages/work/index.astro`

## Every New File

Add these files at the indicated paths:

- `COPY_REVISION.md`
- `UPDATE_GUIDE.md`
- `UPDATE_FILES.txt`
- `qa/copy-revision/browser-results.json`
- `qa/copy-revision/rendered-copy.txt`
- `qa/copy-revision/screenshots/320-404.html.png`
- `qa/copy-revision/screenshots/320-homepage.png`
- `qa/copy-revision/screenshots/320-work-.png`
- `qa/copy-revision/screenshots/320-work-peterbilt-ai-tool-.png`
- `qa/copy-revision/screenshots/320-work-peterbilt-manufacturing-.png`
- `qa/copy-revision/screenshots/320-work-putter-design-.png`
- `qa/copy-revision/screenshots/320-work-research-putting-performance-.png`
- `qa/copy-revision/screenshots/768-404.html.png`
- `qa/copy-revision/screenshots/768-homepage.png`
- `qa/copy-revision/screenshots/768-work-.png`
- `qa/copy-revision/screenshots/768-work-peterbilt-ai-tool-.png`
- `qa/copy-revision/screenshots/768-work-peterbilt-manufacturing-.png`
- `qa/copy-revision/screenshots/768-work-putter-design-.png`
- `qa/copy-revision/screenshots/768-work-research-putting-performance-.png`
- `qa/copy-revision/screenshots/desktop-ai-project.png`
- `qa/copy-revision/screenshots/desktop-first-screen.png`
- `qa/copy-revision/screenshots/desktop-homepage.png`
- `qa/copy-revision/screenshots/desktop-project.png`
- `qa/copy-revision/screenshots/mobile-ai-project.png`
- `qa/copy-revision/screenshots/mobile-first-screen.png`
- `qa/copy-revision/screenshots/mobile-homepage.png`
- `qa/copy-revision/screenshots/mobile-project.png`

No files were deleted. The update ZIP contains 45 files: 18 replacements and 27 additions. `UPDATE_FILES.txt` is the exact machine-readable upload and staging manifest, with one repository-relative path per line.

## Publishing

Follow [UPDATE_GUIDE.md](UPDATE_GUIDE.md) for exact browser and PowerShell instructions, deployment checks, hard refresh, and phone verification. Use one method. The existing workflow builds and deploys changes when they reach `main`.
