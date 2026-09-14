# Portfolio QA report

## Result

The final static build passed all 49 page/viewport combinations, automated accessibility checks, 39 local link destinations, mobile and desktop navigation checks, keyboard checks, and 200% text enlargement on all seven pages. Content-system tests passed for image optimization, galleries, project creation, ordering, draft exclusion, repository subpaths, and custom-domain output.

Three final Lighthouse mobile audits scored 100 in all four reported categories. No known functional defects remain from the performed checks. Actual project photos and additional engineering evidence remain content inputs, not fabricated site assets.

Tests were run September 13, 2026, America/Chicago (September 14 UTC), on Windows using Node.js 24.19.0, Astro 7.3.2, installed Google Chrome through Playwright, axe-core through `@axe-core/playwright`, and Lighthouse 13.4.1. Raw evidence is saved in `qa/`.

## Build and links

| Check | Final result |
|---|---|
| Astro content and type diagnostics | 0 errors, 0 warnings, 0 hints across 20 checked files |
| Production build | Passed; seven generated HTML pages |
| Every local `href` / `src` path | Validated against the generated files |
| Navigation and project links | 39 unique local destinations checked with successful HTTP responses; fragments resolve to real elements |
| Resume | Valid PDF, successful local HTTP response, approximately 144 KiB |
| Resume fidelity | SHA-256 matches the supplied PDF exactly |
| Email | Exact `mailto:pacole06@icloud.com` destination verified |
| Phone | Exact `tel:+19408082777` destination verified; display matches resume |
| LinkedIn | Exact HTTPS destination from the PDF annotation verified; opens in a new tab with `noopener noreferrer` |
| Console | No JavaScript page errors or console errors in the final browser suite |
| Missing images | No broken images in the delivered pages; intentional placeholders do not request nonexistent files |
| Unknown page | Designed 404 page with a working route back to the work index |

Mail and phone destinations were inspected without sending mail or initiating a call. LinkedIn's authenticated profile availability was not tested; the source-verified link is present and correctly formed. GitHub Pages deployment itself requires a repository and its settings, which were not supplied.

## Responsive matrix

Each of these pages was tested at every width below: homepage, work index, putter design, AI drawing tool, Peterbilt manufacturing, research, and 404.

| Width | Pages checked | Horizontal overflow | Automated WCAG A/AA violations |
|---:|---:|---|---:|
| 1440px | 7 | None | 0 |
| 1024px | 7 | None | 0 |
| 768px | 7 | None | 0 |
| 430px | 7 | None | 0 |
| 390px | 7 | None | 0 |
| 375px | 7 | None | 0 |
| 320px | 7 | None | 0 |

Additional checks cover 200% root text size at 390px on all seven pages, viewport changes across the navigation breakpoint, and reduced-motion behavior. Screenshots were reviewed for text wrapping, spacing, alignment, image framing, and visual hierarchy.

These are real desktop-browser renders at the listed CSS widths, not physical iPhone, Android, tablet, or Safari-device tests. Automated axe scans do not constitute full WCAG certification or a screen-reader user study.

## Interaction and accessibility

- Main content is available in static HTML.
- A keyboard-accessible skip link moves focus to the main content.
- Mobile menu opens with Enter, closes with Escape, returns focus to its button, follows real links, and resets when returning to desktop layout.
- Main navigation remains available with JavaScript disabled.
- Focus outlines, semantic headings, descriptive link names, and content landmarks are present.
- Reduced motion changes smooth scrolling to automatic scrolling.
- Gallery links work with keyboard activation and in a browser without JavaScript.
- The native image dialog displays the expected image and caption, closes with Escape or Close, and restores focus to the activating gallery link.
- The image-dialog state passed axe checks with real test images loaded.

## Content and image-system tests

A temporary, explicitly labeled QA project used simple landscape and portrait test images. It was removed from both source and the final build after testing.

| Editing action or behavior | Result |
|---|---|
| Add a Markdown file | New page generated automatically |
| Set `featured: true` | Project added to the homepage |
| Set an earlier `order` | Project moved to the first position |
| Add landscape and portrait images | Optimized image variants generated and loaded |
| Responsive image markup | `srcset` present; real images loaded at 1440, 768, 390, and 320px |
| Image proportions | Containment preserves important content; portrait and landscape fixtures both supported |
| Captions and enlargement | Correct caption, image, keyboard behavior, and focus return |
| Disable JavaScript | Gallery destination still serves the large image |
| Set `draft: true` | No generated project page, homepage entry, or sitemap entry |
| Missing cover alt text | Build rejected invalid content with a useful message |
| Missing image path | Build rejected the nonexistent asset |
| Repository subpath | Built and served under `/engineering/`; pages, styles, images, canonical links, social metadata, and sitemap verified |
| Custom-domain root | Built with an example HTTPS root hostname; root paths and canonical metadata verified |

The example hostnames were test inputs only and are not claimed as Parker's domains. The final default build uses local/root paths without invented public URLs. GitHub Actions supplies the real Pages URL during publishing.

## Final Lighthouse measurements

Mobile mode, simulated throttling, local HTTP server, current installed Chrome. These are lab measurements, not real-user cellular-network measurements.

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Homepage | 100 | 100 | 100 | 100 | 0.9 s | 0 ms | 0 |
| Putter case study | 100 | 100 | 100 | 100 | 0.8 s | 0 ms | 0 |
| AI-tool case study | 100 | 100 | 100 | 100 | 0.8 s | 0 ms | 0 |

Lighthouse still lists ordinary diagnostic opportunities around the stylesheet's render-blocking request and request dependency tree. A small same-origin stylesheet is intentionally retained to provide a styled first render and shared browser caching. Older diagnostic metrics such as maximum potential first-input delay are not field INP measurements. There is no claim of a real-user Core Web Vitals pass before deployment and traffic collection.

The complete current output is approximately **260 KiB**, including the 144 KiB resume and 38 KiB sharing image. Homepage HTML and shared CSS together are approximately **9.1 KiB gzipped** in a local compression calculation; actual transfer depends on the host's compression. There are no third-party font, tracking, video, or runtime-framework requests. Real project photos will increase asset sizes; the responsive-image pipeline has been tested, but those photos should receive a new visual and performance review after upload.

## Visual review and improvements

The first version was revised after screenshot and browser review:

1. Corrected the flagship desktop project layout so the summary sits beside its visual instead of below an oversized full-width placeholder.
2. Replaced cramped mobile practice columns with readable rows.
3. Increased small metadata text and corrected missing whitespace where mobile headings reflowed.
4. Fixed enlarged-text overflow in the academic summary and project-number labels without hiding page overflow.
5. Corrected a navigation-breakpoint timing issue and made its tests wait for actual navigation state.
6. Moved the JavaScript-availability marker into the document head to prevent the mobile menu's initial layout shift.
7. Removed the brand link's conflicting accessible-name override.
8. Verified the improved screenshots and reran affected functional and performance tests.

## Preview files

| View | Screenshot |
|---|---|
| Desktop homepage, full page | [desktop-homepage.png](qa/screenshots/desktop-homepage.png) |
| Mobile homepage, full page | [mobile-homepage.png](qa/screenshots/mobile-homepage.png) |
| Desktop homepage, first screen | [desktop-first-screen.png](qa/screenshots/desktop-first-screen.png) |
| Mobile homepage, first screen | [mobile-first-screen.png](qa/screenshots/mobile-first-screen.png) |
| Desktop putter case study | [desktop-project.png](qa/screenshots/desktop-project.png) |
| Mobile putter case study | [mobile-project.png](qa/screenshots/mobile-project.png) |
| Desktop AI case study | [desktop-ai-project.png](qa/screenshots/desktop-ai-project.png) |
| Mobile AI case study | [mobile-ai-project.png](qa/screenshots/mobile-ai-project.png) |

## Remaining inputs and deployment boundaries

- Genuine CAD screenshots, prototype photographs, and assembly-detail images were not supplied. Their locations are intentional labeled placeholders.
- Project dates, specific failed iterations, final dimensions, and test results are not invented. Add them as documented evidence becomes available.
- Research is described only as developing work, with potential methods distinguished from completed experiments.
- Peterbilt implementation details and internal visuals are omitted. The timing result remains approximate and task-specific.
- No target GitHub repository, Pages settings, or domain ownership was provided. The source and static output are packaged for deployment; a live public URL has not been created.
- Local builds omit invented canonical URLs and use an empty sitemap until `SITE_URL` is supplied. The tested Pages workflow supplies it automatically from the configured repository.
- Browser checks did not validate real operating-system mail/phone handlers, every browser engine, or a public HTTPS deployment.

## Evidence and reproduction

- `qa/browser-results.json`: 49 viewport/page cases, link count, and interaction results.
- `qa/content-results.json`: fixture, gallery, draft, and deployment-path results.
- `qa/performance-results.json`: final Lighthouse scores and measurements.
- `qa/lighthouse/`: complete HTML and JSON Lighthouse reports.
- `scripts/qa.mjs`, `scripts/content-tests.mjs`, `scripts/performance.mjs`: repeatable checks.

Run the commands in `README.md`. The content tests create and clean up only their own temporary fixture files, then restore a normal production build. Do not edit content simultaneously with those tests.
