# Update Parker Cole's GitHub Pages Website

Use **one** of the two methods below. Method A is the easiest browser-only option. Method B uses the local folder that already contains the revised files.

Your existing repository is [Parbro240/engineering-portfolio](https://github.com/Parbro240/engineering-portfolio), and its publishing branch is `main`. Your site stays at [parbro240.github.io/engineering-portfolio](https://parbro240.github.io/engineering-portfolio/).

I verified the local remote and branch, synchronized the repository to remote commit `d1d458e`, and then implemented this revision. I have not committed, pushed, or published these new changes.

## The Download Files

- **Portfolio_Copy_Update.zip**: the changed files, preserving their repository paths. Use this for Method A.
- **Portfolio_Revised_Source.zip**: the complete source and QA evidence. Keep this as a backup or use it for a fresh local setup.
- **Portfolio_Revised_Static.zip**: the compiled website, built for your existing `/engineering-portfolio/` URL. Your existing GitHub Actions workflow generates these files automatically from source, so this ZIP is not needed for either method below.

`UPDATE_FILES.txt` lists every file included in the update ZIP. Paths in that list are relative to the repository root, which is the folder containing `package.json`, `content`, `src`, and `.github`.

Existing files with matching paths must be replaced. New documentation and QA files are added. **No old files or folders need to be deleted.** Uploading a changed folder merges its included files; it does not remove other existing files in that folder. The project URLs and resume PDF remain the same.

## Method A — GitHub Website

1. Save **Portfolio_Copy_Update.zip** to your computer.
2. In Windows File Explorer, right-click the ZIP and select **Extract All**, then **Extract**.
3. Open the extracted folder. You should see `content`, `public`, `scripts`, `src`, `qa`, and the Markdown/text guide files. Do not upload the ZIP itself or an enclosing folder named `Portfolio_Copy_Update`.
4. Sign in to GitHub and open [your repository](https://github.com/Parbro240/engineering-portfolio).
5. Click **Code**. Set the branch dropdown above the file list to **main**. Stay at the repository root, where `package.json` appears.
6. Select **Add file → Upload files**.
7. In File Explorer, select everything **inside** the extracted update folder and drag it into the GitHub upload area. Dragging the folders preserves their internal paths.
8. Wait for the upload to finish. Confirm the list contains paths such as `content/profile.json`, `src/pages/index.astro`, and `public/social-preview.png`. They must not start with `Portfolio_Copy_Update/` or an extra `engineering-portfolio/` folder.
9. Enter this commit message: **Refine portfolio copy and wording**.
10. Select **Commit directly to the main branch**, then click **Commit changes**. If GitHub instead requires a new branch, enter `codex/portfolio-copy-revision`, click **Propose changes**, open the proposed pull request, and merge it into `main` after its checks pass.
11. Open the [Actions tab](https://github.com/Parbro240/engineering-portfolio/actions). Find the newest **Build and deploy portfolio** run associated with your commit.
12. Open that run. Wait for both **build** and **deploy** to show green checks.
13. Follow the verification steps below.

GitHub supports uploading files and folders in this interface, with up to 100 files per upload. This update fits that limit. See [GitHub's upload instructions](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## Method B — Git / PowerShell

Use this method instead of Method A. The revised source is already in:

```text
C:\Users\pacol\Documents\ChatGPT\Resume
```

The nested `engineering-portfolio` folder in that directory is a separate, untracked repository. The commands below use the verified parent repository and stage only the update manifest.

1. Open **PowerShell**.
2. Paste and run:

```powershell
Set-Location -LiteralPath 'C:\Users\pacol\Documents\ChatGPT\Resume'
git status --short
git remote -v
git branch --show-current
```

The remote should be `https://github.com/Parbro240/engineering-portfolio.git`, and the branch should be `main`. If either differs, stop and check the folder before continuing.

3. Review the changes:

```powershell
git diff --stat
git diff -- content/profile.json content/projects src
```

4. Stage only the files included in this revision. Git's literal-path mode handles the Astro filename `[id].astro` correctly:

```powershell
git --literal-pathspecs add --pathspec-from-file=UPDATE_FILES.txt
git diff --cached --stat
```

Confirm that the staged list contains only the files in `UPDATE_FILES.txt`. It should not include the nested `engineering-portfolio/` repository or ZIP files.

5. Commit:

```powershell
git commit -m "Refine portfolio copy and wording"
```

If Git requests an identity, set your own GitHub name and commit email, then repeat the commit:

```powershell
git config user.name "YOUR NAME"
git config user.email "YOUR GITHUB COMMIT EMAIL"
```

Replace both placeholders with your information. You can use the commit email shown in GitHub's email settings.

6. Incorporate any remote edits made since this revision started, then push. Run the commands separately; proceed to the push only if the pull succeeds:

```powershell
git -c http.sslBackend=schannel pull --rebase origin main
```

```powershell
git -c http.sslBackend=schannel push origin main
```

The `schannel` option uses Windows certificate trust, which was needed for this computer's connection to GitHub. If a sign-in window appears, sign in to the GitHub account that owns the repository. If the pull reports conflicts, stop and resolve them before pushing; do not force-push.

7. Open the [Actions tab](https://github.com/Parbro240/engineering-portfolio/actions). Wait for the newest **Build and deploy portfolio** run to show successful **build** and **deploy** jobs.
8. Follow the verification steps below.

If using a different local clone, first update that clone from `main`, then copy the extracted update ZIP's contents into its root, merging folders and replacing matching files. Run the remaining commands in that clone's actual folder.

## How Redeployment Works

The existing `.github/workflows/deploy.yml` runs whenever a commit reaches `main`. It installs dependencies with Node 24, checks the Astro source, builds the static site, validates links, and deploys the `dist` output to GitHub Pages. No workflow changes are needed for this copy revision.

In [Settings → Pages](https://github.com/Parbro240/engineering-portfolio/settings/pages), **Build and deployment → Source** should be **GitHub Actions**. Keep the existing workflow. See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Allow a few minutes for the workflow. GitHub says publication can take up to ten minutes after changes are pushed. Check the actual run rather than relying only on elapsed time. See [GitHub's Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

If a run fails, open the red job and failed step to read the error. Your update is not deployed until the deploy job succeeds. If no run appears, confirm that the commit reached `main`; the workflow also supports **Run workflow** from its Actions page.

## Verify the Updated Website

1. Open [the homepage](https://parbro240.github.io/engineering-portfolio/) after the deployment succeeds.
2. Confirm the hero begins **“I enjoy mechanical design, CAD, and building physical prototypes.”**
3. Confirm the homepage includes **Selected Engineering Projects**, **Engineering Experience**, **About Me**, and **Technical and Professional Skills**.
4. Find Cowboy Golf Club. It should say **Pending University Approval** and explain that you are working with the university.
5. Open **Golf Putter Performance Research**. It should say **Research Underway** and mention **Dr. Xiang**.
6. Open all four case studies from the Projects page. Confirm each loads and its **All Projects** link works.
7. Click **View Resume** and confirm your PDF opens. Check Email and LinkedIn from the contact section.
8. If old wording remains on Windows Chrome or Edge, press **Ctrl + Shift + R**. You can also open the URL in a new private/incognito window to compare.
9. On your phone, open the same live URL and reload it. If it still shows old text, open a fresh private/incognito tab and enter the URL there.
10. On the phone, verify the same hero and Dr. Xiang wording, open **Menu → Projects**, open a case study, and test **View Resume**. Scroll through the page to check that headings and contact details fit.

The phone and desktop use the same published files. There is no separate mobile deployment.
