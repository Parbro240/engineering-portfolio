import type { APIRoute } from 'astro';
import {href} from '../lib/content';
export const GET: APIRoute = ({site}) => new Response(`User-agent: *\nAllow: /\n${site ? `Sitemap: ${new URL(href('sitemap.xml'),site).href}\n` : ''}`,{headers: {'Content-Type':'text/plain'}});
