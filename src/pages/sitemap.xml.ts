import type { APIRoute } from 'astro';
import {projects,href} from '../lib/content';
export const GET: APIRoute = async ({site}) => {
  const paths = ['', 'work/', ...(await projects()).map(p => `work/${p.id}/`)];
  const escape = (s:string) => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site ? paths.map(p=>`<url><loc>${escape(new URL(href(p),site).href)}</loc></url>`).join('') : ''}</urlset>`,{headers:{'Content-Type':'application/xml'}});
};
