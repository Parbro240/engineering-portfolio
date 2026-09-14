import { getCollection } from 'astro:content';
export { default as profile } from '../../content/profile.json';
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const projects = async () => (await getCollection('projects')).filter(p => !p.data.draft).sort((a,b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
