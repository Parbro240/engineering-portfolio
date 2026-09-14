import { defineConfig } from 'astro/config';

// GitHub's workflow supplies the complete public URL, including a repository path.
const deployedUrl = process.env.SITE_URL;
const parsed = deployedUrl ? new URL(deployedUrl) : null;
export default defineConfig({
  site: parsed?.origin,
  base: parsed?.pathname || '/',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
});
