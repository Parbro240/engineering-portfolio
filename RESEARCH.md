# Engineering portfolio research and design rationale

## Purpose and evidence standard

This portfolio is intended for mechanical, aerospace, manufacturing, and product-design internship recruiting. It must support a short first visit on a phone and a more detailed engineering discussion through individual case studies. The recommendations below combine engineering communication guidance, first-party portfolio examples, web usability research, and platform documentation. These sources support design decisions; they do not establish that a particular layout causes more interview offers.

Personal and professional content is grounded in *Parker_Cole_Resume_2027.pdf*, page 1, and the supplied portfolio brief. The resume supplies exact contact details, education, dates, and skill credentials. The brief supplies the developing research direction, Bambu P1S use, and the internship's Design for Assembly coursework. No external search was used to infer additional facts about Parker Cole.

## Recruiter and engineering-reviewer needs

MIT's Mechanical Engineering Communication Lab recommends a small selection of relevant projects, identifiable personal contributions, clear outcomes, and visuals that explain technical work. It also distinguishes a broad reader's need for orientation from an engineer's interest in implementation details. The practical implication is a layered portfolio: identity and relevant evidence on the homepage, then structured project pages. [1]

Nielsen Norman Group's 2020 synthesis reports that scanning remains common and recommends clear headings, front-loaded information, and concise language. This is general web-reading evidence, not a study specifically measuring engineering recruiters. It supports visible project titles, plain navigation, and a short contribution statement before technical detail. The often-repeated claim that every recruiter spends a fixed number of seconds on a portfolio is not treated as an established measurement here. [2]

For this portfolio, a first visit should reveal the engineering discipline, Oklahoma State affiliation, actual internship experience, CAD and prototyping work, GPA, graduation timing, and contact routes. A deeper visit should reveal the design problem, personal contribution, meaningful constraints, tools, current state, and evidence boundaries. This hierarchy is an editorial recommendation based on the recruiting task, rather than an empirical hiring guarantee.

## Example analysis

| First-party example | Observable strengths | Application to this portfolio | Limits |
|---|---|---|---|
| Keira Boone, MIT engineering portfolio [3] | Immediate discipline statement; projects labeled with fabrication, analysis, and design methods; concrete descriptions of contributions; separate work in progress | Use meaningful category labels and contribution-focused descriptions; distinguish research development from measured outcomes | A much larger project inventory than Parker's. Its broad filter system is unnecessary for four case studies. No claims are made about its hiring results. |
| Kate Xu, MIT portfolio [4] | Compact identity and contact block; technical skills grouped by discipline; engineering and research work identified by name | Preserve direct resume/contact access and category-based skill lists | The retrieved page exposes limited case-study detail, so it is not evidence for a complete narrative structure. |
| Hilary Johnson, engineer portfolio [5] | Extremely concise identity and a direct contact route | Keep the first screen understandable with a small number of actions | The current page is minimal; it does not provide enough process detail for Parker's needs. |
| MIT MechE portfolio guide and annotated examples [1] | Explicit problem, contribution, outcome, and process hierarchy; examples of project imagery selected for engineering relevance | Build reusable project metadata and process sections; pair CAD and prototype images when supplied | Guidance and examples are educational, not controlled recruiter-conversion experiments. |

These are patterns to learn from, not templates to reproduce. The original design here uses a typographic introduction, a restrained dark practice panel, an editorial project layout, and a compact engineering information hierarchy. Another example linked from the MIT guide, Alyssa Li's portfolio, returned an unavailable page during research and was not used as evidence.

## Project selection and case-study strategy

The homepage prioritizes three distinct forms of evidence: custom putter design and physical prototypes; a measurable professional engineering task improvement; and a clearly labeled developing research question. The full work index also includes the broader Peterbilt internship. This avoids repeating nearly identical internship claims in every homepage feature while allowing an interested reviewer to explore both the specific tool and professional context.

The putter project has the strongest public evidence of physical design iteration. Its page describes the verified mallet geometry work, modular screw-on face concept, molded and printed prototypes, fastening methods, and heat-set inserts. It does not add final dimensions, material grades, tolerances, measured accuracy, or test outcomes. CAD, prototype, and assembly-detail positions are deliberately labeled until genuine documentation is available.

The AI tool has one supported measurable outcome: approximately five minutes to approximately one minute per drawing for a recurring information-location task. The page retains those units and qualifications. It does not extrapolate annual savings, claim autonomous drawing interpretation, imply a validated accuracy rate, identify implementation tools not supplied, or suggest enterprise-wide adoption.

The broader internship page emphasizes Creo modeling, engineering-group support, concurrent projects, presentations, and Design for Assembly coursework. No internal drawing, production screenshot, source code, supplier information, or speculative factory diagram is necessary to communicate that contribution.

Research is explicitly in development. Face material and surface finish are variables of interest; bounce, skid, spin, and true roll are the stated phenomena. High-speed video, tracking, marked balls, and a controlled putting apparatus remain possible methods. They are not described as completed experiments. Future results belong in this page only after methods and measurements exist.

There is no public Rocketworks project page because membership alone does not establish an individual engineering contribution. The content system can accommodate one later. The golf club role retains the resume's pending-university-approval qualification.

## Information architecture and writing

The site uses a homepage, work index, four individual case studies, and a helpful 404 page. Experience, About, skills, leadership, and Contact live on the homepage. Resume links go directly to a PDF. This avoids unnecessary navigation levels while giving every project a shareable address.

Case-study metadata answers role, context, date or status, and tools before the detailed narrative. Headings support selective reading. Approximately 150–400 words is a useful starting range for the available evidence; it is an editorial target, not a rule to pad or cut meaningful engineering information. Longer future studies can add focused sections and galleries without changing the page template.

A project that lacks a documented failure or measured result does not need an invented challenge or lesson. Specific evidence has priority over a mechanically complete case-study checklist. Planned work and completed work use different verbs. A concise confidentiality callout appears only on Peterbilt pages.

## Visual and image strategy

Images should explain a decision or demonstrate actual work. A CAD screenshot establishes modeling work; a prototype photograph establishes a physical artifact; an assembly detail explains interfaces; a test setup identifies how evidence was collected. A caption should say what the viewer should notice rather than repeat the project title. An introductory project view followed by two or three nonredundant details is a reasonable first publication target.

No stock factory imagery, fabricated putter rendering, or generic aerospace photograph is used to imply personal work. Missing project media uses visible, intentional text placeholders. The AI timing comparison is a presentation of supplied numbers, not a simulation of the proprietary tool.

The image architecture keeps original files in source, generates optimized WebP variants, includes intrinsic dimensions, and provides responsive sizes. Original aspect ratios are preserved with containment rather than cropping. Gallery images enlarge in a keyboard-accessible native dialog and link to a large image when JavaScript is disabled. Automated image generation at build time reduces repetitive editing work. [6]

Photography recommendations: use a neutral background, soft light, and enough resolution to read the relevant feature. Capture the overall design, then isolate a useful detail. For CAD, retain context necessary to understand the model while omitting unrelated UI. Before sharing internship media, confirm the material is appropriate for public release; the existing public summaries do not require such media.

## Architecture comparison

| Approach | Benefits | Costs for this use case | Decision |
|---|---|---|---|
| Hand-maintained HTML/CSS | Minimal tooling; direct static hosting | Repeated page editing; adding projects requires layout code; easy to miss navigation updates | Rejected for ongoing content maintenance |
| Runtime JSON plus browser rendering | Simple data files; can fetch new content | Core content depends on JavaScript; per-project metadata and indexing need extra handling | Rejected for this public, content-oriented portfolio |
| Astro and Markdown collections | Static HTML output; per-project files; schemas; automatic routes; build-time images | A build step and dependency updates are required | Selected |
| Hosted CMS | Browser-based editing and media management | Extra account, integration, possible fees, and another dependency | Unnecessary for a small personal portfolio |

Astro content collections support local Markdown and validation. GitHub Actions can build and publish Astro to Pages. The user edits content and commits it; the workflow handles the rebuild. Therefore “without rebuilding” means no manual layout rewrite or local build requirement, not that a static generator never runs. A content change must still be built before it appears publicly. [7,8]

The design ships no client-side application framework. A small script handles the mobile menu and image dialog; content remains in HTML. A local system font stack avoids a third-party font request. Project image originals stay outside `public/` so a large camera original is not automatically copied into the public output.

## Accessibility

WCAG 2.2 guidance establishes reflow at a width equivalent to 320 CSS pixels, subject to exceptions for content requiring two-dimensional presentation. That supports explicit testing at 320px, in addition to common phone, tablet, and desktop widths. [9]

Keyboard focus must remain visible. The site provides focus outlines, a skip link, semantic landmarks, heading hierarchy, descriptive image alternatives, and a native modal dialog with Escape behavior and focus return. Reduced-motion preferences disable smooth scrolling. Core navigation remains available without JavaScript. [10]

The WCAG 2.2 minimum target-size criterion is 24 by 24 CSS pixels or qualifying spacing/exceptions. This design uses roughly 44px or larger controls for primary actions and mobile navigation as a more comfortable practical target. Inline text links have different context and spacing considerations. Automated axe checks complement manual keyboard and visual review; they cannot certify complete accessibility. [11]

## Performance

The principal strategy is to avoid unnecessary loading: static HTML, small CSS, little JavaScript, no video background, no client framework, and local assets. Images reserve space and use responsive sources; below-the-fold project media is lazy-loaded. Future image uploads should be reviewed for readability after compression.

Google's Core Web Vitals guidance defines good thresholds as LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1, assessed at the 75th percentile of visits. These are field-experience targets. Local Lighthouse scores are diagnostic lab results, not proof that a site meets those thresholds for real visitors on cellular networks. [12]

Performance testing should include the homepage and at least one detailed case study. The supplied-image gap means current transfer sizes will increase when photos are added; the image pipeline and content fixture tests address this future workflow, but the finished images should still receive visual review.

## Search and sharing

Each page gets a distinct title and a concise, accurate description. Public builds include canonical URLs, Open Graph fields, a social-preview image, and a sitemap. The robots file references that sitemap. These mechanisms help machines discover and describe pages; none guarantees search placement. Google recommends useful content, clear titles, sensible link organization, and crawlable pages. [13]

The final public URL is unknown at handoff. Local builds omit invented canonical and social-image hostnames; GitHub's Pages configuration supplies the real URL during deployment. The same configuration supports a repository path or a later custom domain.

## GitHub Pages and custom domains

The build workflow installs locked dependencies, validates content and types, creates static output, and deploys the Pages artifact. Pages must first be enabled in the repository with GitHub Actions as the publishing source. A public repository supports GitHub Free; availability for private repositories depends on plan. [14,15]

For custom domains, configure the domain in Pages settings and follow GitHub's DNS instructions. The Actions workflow uses the Pages-provided base URL, so internal paths and metadata are rebuilt for the domain. GitHub's documentation states that a `CNAME` file is not required for an Actions-based deployment; this differs from branch-publishing instructions. DNS and HTTPS configuration remain account-level steps. [16]

The output is deployment-ready but cannot establish a live GitHub Pages URL without a target repository and its Pages settings. No GitHub identity or domain ownership is inferred from a LinkedIn slug or suggested domain.

## Validation and content maintenance

The QA plan covers every generated page at 1440, 1024, 768, 430, 390, 375, and 320px; local link and fragment validity; exact resume/email/phone/LinkedIn destinations; navigation, keyboard, text enlargement, images, and console errors. Screenshots support a second visual pass. A separate content fixture checks adding a project, optimized images, dialog behavior, ordering, and draft exclusion. The final report records actual results and limitations separately from this research rationale.

The most valuable next content additions are genuine putter media, a dated revision with its observed problem and specific change, and research documentation once methods are established. These additions deepen evidence without redesigning the website or increasing claims beyond support.

## Sources

Accessed September 13–14, 2026. Undated pages are identified by their publisher rather than assigned a fabricated publication date.

1. MIT Mechanical Engineering Communication Lab. [Portfolio](https://mitcommlab.mit.edu/meche/commkit/portfolio/). Undated guidance and examples.
2. Kate Moran, Nielsen Norman Group. [How People Read Online: New and Old Findings](https://www.nngroup.com/articles/how-people-read-online/). 2020. General reading research, not recruiter-specific timing evidence.
3. Keira Boone. [Engineering Portfolio](https://www.mit.edu/~kboone/). First-party portfolio.
4. Kate Xu. [Portfolio](https://www.mit.edu/~katexu66/portfolio.html). First-party portfolio.
5. Hilary Johnson. [Engineer portfolio](https://hilaryannajohnson.com/). Current first-party landing page.
6. Mat Marquis, web.dev. [Automating compression and encoding](https://web.dev/learn/images/automating/). February 1, 2023. Used for build-time automation principles, not its historical browser-support statements.
7. Astro. [Content collections](https://docs.astro.build/en/guides/content-collections/). Current documentation.
8. Astro. [Deploy your Astro Site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/). Current documentation.
9. W3C WAI. [Understanding SC 1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
10. W3C WAI. [Understanding SC 2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).
11. W3C WAI. [Understanding SC 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).
12. web.dev. [How the Core Web Vitals metrics thresholds were defined](https://web.dev/articles/defining-core-web-vitals-thresholds).
13. Google Search Central. [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
14. GitHub Docs. [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
15. GitHub Docs. [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).
16. GitHub Docs. [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
17. Parker Cole. *Parker_Cole_Resume_2027.pdf*, page 1. Private supplied source; used for personal facts.
18. Parker Cole. Supplied portfolio brief (*pasted-text.txt*). Private supplied source; used for project scope, research status, and additional verified context.
