# Editing your engineering portfolio

You will normally edit just two places: `content/profile.json` for information about you, and `content/projects/` for your work. GitHub builds and publishes your changes automatically once Pages is configured. You do not need to edit HTML or run a local build.

## The everyday GitHub workflow

1. Open your portfolio repository on GitHub.
2. Click the file you want to edit, then the pencil icon.
3. Make your changes.
4. Click **Commit changes**, write a short note describing the change, and commit to `main`.
5. Open the **Actions** tab. Wait for **Build and deploy portfolio** to show successful build and deploy jobs.
6. Open your site and refresh it. If the old version remains, try a hard refresh.

If a build fails, your last successful public site remains in place. Open the failed build step to read the error, correct the file, and commit again. Common causes are a missing quotation mark, inconsistent indentation, an image filename with different capitalization, or missing image alternative text.

## Change text, your bio, or contact information

Open `content/profile.json`.

| What to change | Field |
|---|---|
| Name and degree description | `name`, `discipline`, `degree` |
| Introduction below your name | `intro` |
| About paragraphs | `bio` |
| University, minor, GPA, graduation | `university`, `minor`, `gpa`, `graduation` |
| Email | `email` |
| Displayed phone number | `phone` |
| Click-to-call number | `phoneLink` — keep international digits, e.g. `+1...` |
| LinkedIn destination | `linkedin` — paste the full `https://...` address |
| Skills | `skills` |
| Jobs and employment dates | `experience` |
| Club roles and dates | `leadership` |

Keep JSON quotation marks, commas, and square brackets intact. Put a comma between entries, but not after the final entry. Use `\"` if you need a literal quotation mark inside a quoted sentence. You can add another bio paragraph as another quoted entry in the `bio` list.

Project text is edited in its Markdown file. The fixed interface labels such as “View projects” are part of the page design; they do not need routine maintenance. The social-preview image contains a name and university snapshot; if these change, replace `public/social-preview.png` or regenerate it with `node scripts/create-social-preview.mjs` after installing the browser test dependency.

## Change skills or experience

In `profile.json`, each skills category has a `category` name and an `items` list. Add or remove a quoted item in that list. No proficiency percentages are used.

Each experience entry has a company, role, date, optional location, and a `points` list. Add your own verified bullet points. The optional `project` field links to a case study using its filename without `.md`, such as `peterbilt-manufacturing`. Remove that field if the job has no case study.

When Cowboy Golf Club receives university approval, update the qualification in `leadership` only after that status changes. Research status is controlled separately in its project file.

## Upload a photo

Use your own photos or visuals you have permission to publish. Internship projects do not need proprietary visuals.

1. Give the file a short lowercase name without spaces, such as `putter-prototype-v2.jpg`.
2. Open `src/assets/images/projects/putter/` in GitHub.
3. Choose **Add file → Upload files** and select the photo.
4. Commit the upload.
5. Edit the project file to reference it as shown below, then commit that change.

Use these folders for the initial projects:

```text
src/assets/images/projects/putter/
src/assets/images/projects/peterbilt/
src/assets/images/projects/research/
```

For a new project, add a folder under `src/assets/images/projects/`. GitHub's web editor can create a nested folder by creating a `.gitkeep` file at the desired path first. You can also create the folder locally and use GitHub Desktop to commit it.

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. Convert iPhone HEIC photos to JPEG before uploading. Use lowercase file extensions. A sharp original around 1600–2400 pixels wide usually works well; fine CAD details may need more. Astro automatically generates smaller responsive images and WebP versions. Avoid uploading very large camera originals when a smaller export preserves all relevant detail.

## Change a project cover photo

Open the matching file, for example `content/projects/putter-design.md`. Replace these fields at the top:

```yaml
coverImage: "projects/putter/putter-prototype-v2.jpg"
coverAlt: "Describe the actual prototype and the relevant view shown in this photo."
```

The path starts **inside `src/assets/images/`**. Do not add `/public/`, `src/assets/images/`, or a leading slash. Capitalization must match the uploaded file exactly. The alt text must describe the actual image, not merely say “image” or “CAD.”

An empty `coverImage: ""` displays the intentional `coverPlaceholder` label. Once you add a real image, the placeholder automatically disappears. Cover images fit inside their frame without cutting off the model. Adding a cover image to the AI tool page replaces its cover timing panel with that image; the documented timing remains in the written case study.

## Add photos and captions to a project

Find the `gallery` field at the top of the Markdown file. Replace a placeholder item with an image entry:

```yaml
gallery:
  - src: "projects/putter/cad-overview.png"
    alt: "Describe the actual CAD view and the design features it shows."
    caption: "Explain the design decision this image helps the reader understand."
  - src: "projects/putter/physical-prototype.jpg"
    alt: "Describe the physical prototype and its orientation."
    caption: "Explain what changed in this iteration, using your actual notes."
```

Indent with spaces, as shown. Add another `- src:` block for each image. Items appear in the same order as the file. CAD and prototype images sit side by side on larger screens and stack on phones. Captions stay attached to their images. Clicking an image enlarges it; Escape or Close returns to the page.

These filenames and descriptions are examples. Upload your actual files and replace the wording with accurate descriptions before publishing.

To keep a deliberate missing-image position, use:

```yaml
  - placeholder: "Test setup image to be added"
    caption: "Experimental setup documentation"
```

To remove the entire gallery, use `gallery: []` and delete its indented entries. There are no empty lightbox buttons for placeholders.

## Create a new project

1. Open `content/templates/new-project.md` and copy its complete contents.
2. Choose **Add file → Create new file** in your repository.
3. Name it `content/projects/your-project-name.md`, using lowercase words and hyphens.
4. Paste the template and change its title, summary, role, tools, date, and body.
5. Add images to `src/assets/images/projects/your-project-name/` and fill in the image fields.
6. Keep `draft: true` while writing. Change it to `false` when it is ready to appear publicly.
7. Set `featured: true` only if it should appear on the homepage.
8. Commit the file. GitHub generates the page and updates navigation automatically.

The filename becomes the URL: `your-project-name.md` becomes `/work/your-project-name/`. Avoid renaming a published file casually because existing links to it will change. The full-work index lists every non-draft project; the homepage lists the featured ones. Keep the homepage focused on about three of your strongest projects.

## Understand the project fields

| Field | Meaning |
|---|---|
| `title` | Main project heading |
| `subtitle` | One-sentence summary shown in the index and page |
| `date` | Real dates or an honest project status if dates are unknown |
| `role` | Your individual contribution or position |
| `type` | Personal, course, internship, or research context |
| `tools` | Tools you actually used |
| `categories` | Simple labels such as Design, Manufacturing, Research, Aerospace |
| `featured` | `true` to show on the homepage |
| `order` | Smaller numbers appear first |
| `draft` | `true` to exclude the page from the public build |
| `status` | Current project status displayed on the page |
| `confidential` | `true` adds the proprietary-information callout |
| `metric` | Leave out for new projects; the supplied `true` is specific to Peterbilt's verified 5-to-1-minute result |
| `coverImage`, `coverAlt` | Cover image location and description |
| `coverPlaceholder` | Honest missing-image label when no cover exists |
| `gallery` | Ordered list of images, captions, or intentional placeholders |

The `---` lines enclose the metadata. Keep those lines intact. Below the second `---`, write ordinary Markdown:

```markdown
## The problem

A short paragraph explaining the engineering need.

## My contribution

- A specific action you took.
- A design decision and the reason for it.

## Results

Use actual measurements and state limitations.
```

Use `##` for main sections and `###` for subsections. Do not add another `#` title; the template already generates the page title. Main sections automatically appear in the page's contents navigation. Use the gallery system for images so optimization, captions, and enlargement work consistently.

## Reorder projects

Change each project's `order` number. Lower numbers come first. For example, `1`, `2`, `3`, `4`. Use distinct numbers to make the order obvious. This changes the full index, featured order, and next-project links.

## Hide, archive, or remove a project

- To hide it from the homepage while keeping its public page, set `featured: false`.
- To remove its page from the public build and both indexes, set `draft: true`.
- To retain a public archive, keep `draft: false`, set `featured: false`, and use `status: "Archived"`.
- To permanently remove the source, delete its Markdown file. Keep an offline copy if desired.

Draft status is a publishing control, not secrecy. Files in a public GitHub repository can still be read, and earlier commits remain in Git history. Do not upload confidential source material to the repository, even inside a draft.

## Replace the resume

1. Name your new PDF `resume.pdf`.
2. Open the repository's `public/` folder.
3. Upload the new `resume.pdf`, replacing the existing file, and commit.
4. Wait for the deployment and test the View Resume button.

No code change is needed. The supplied PDF is included unchanged. Updating it does not automatically update the website's GPA, dates, phone, or biography; update `content/profile.json` and relevant projects separately so both agree.

## Prepare the first public version

The code and build are ready. To strengthen the content, add:

1. A genuine putter CAD overview.
2. A clear photo of one or more physical prototypes.
3. An assembly detail showing the modular face or relevant fastening features.
4. A brief, factual revision example: observed problem → design change → what you observed next.
5. A research setup photo and finalized methods only when those exist.

Do not add internal Peterbilt drawings or production screenshots to fill an image slot. Those case studies already work as confidentiality-conscious summaries. Use verified data for research results and keep planned methods labeled as planned.

## Deploy changes and connect a domain

Follow [README.md](README.md) for the one-time GitHub Pages setup and custom-domain instructions. After setup, committing content changes to `main` is the only routine publishing step. The workflow handles repository paths, the public site URL, the sitemap, and sharing metadata.
