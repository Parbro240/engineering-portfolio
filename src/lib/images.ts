import type { ImageMetadata } from 'astro';
// Originals stay in source: Astro emits optimized variants rather than shipping huge originals.
const assets = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{png,jpg,jpeg,webp,avif}', { eager: true });
export function projectImage(path: string): ImageMetadata {
  const asset = assets[`/src/assets/images/${path}`];
  if (!asset) throw new Error(`Image not found: src/assets/images/${path}. Match capitalization and use JPG, PNG, WebP or AVIF.`);
  return asset.default;
}
