import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const base = process.env.SITE_URL ? new URL(process.env.SITE_URL).pathname.replace(/\/$/,'') : '';
async function walk(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const files = await walk(root);
const htmlFiles = files.filter(f=>f.endsWith('.html'));
const failures=[];
for(const file of htmlFiles){
  const html=await readFile(file,'utf8');
  if(!/<title>[^<]+<\/title>/.test(html)) failures.push(`Missing title: ${file}`);
  if((html.match(/<h1(?:\s|>)/g)||[]).length!==1) failures.push(`Expected one h1: ${file}`);
  for(const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(/^(https?:|mailto:|tel:|data:|#)/.test(raw)) continue;
    let target=decodeURIComponent(raw.split(/[?#]/)[0]);
    if(target.startsWith('/') && base && !target.startsWith(base+'/')) {failures.push(`Missing base path: ${raw}`);continue;}
    if(target.startsWith('/')) target=path.join(root,target.slice(base.length));
    else target=path.resolve(path.dirname(file),target);
    try{if((await stat(target)).isDirectory()) await stat(path.join(target,'index.html'));}
    catch{failures.push(`Broken asset/link in ${path.relative(root,file)}: ${raw}`);}
  }
}
const resume=await readFile(path.join(root,'resume.pdf'));
if(resume.subarray(0,5).toString()!=='%PDF-') failures.push('Resume is not a PDF');
if(failures.length) throw Error(failures.join('\n'));
console.log(`Validated ${htmlFiles.length} HTML pages, local links/assets, and resume PDF (${Math.round(resume.length/1024)} KB).`);
