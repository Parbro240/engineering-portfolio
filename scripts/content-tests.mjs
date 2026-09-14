import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import sharp from 'sharp';
import {readFile,writeFile,unlink,access} from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';
const root=process.cwd();
const file=path.join(root,'content/projects/qa-gallery-fixture.md');
const wide=path.join(root,'src/assets/images/projects/qa-wide-fixture.png');
const tall=path.join(root,'src/assets/images/projects/qa-tall-fixture.png');
const temporary=[file,wide,tall];
for(const f of temporary){assert(f.startsWith(root+path.sep));let exists=false;try{await access(f);exists=true;}catch{}assert(!exists,`Refusing to overwrite ${f}`);}
const env={...process.env,ASTRO_TELEMETRY_DISABLED:'1',PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH};
function build(site,expectSuccess=true){
  const buildEnv={...env};if(site)buildEnv.SITE_URL=site;else delete buildEnv.SITE_URL;
  const result=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{cwd:root,env:buildEnv,encoding:'utf8',timeout:120000});
  assert.equal(result.status===0,expectSuccess,`${expectSuccess?'Build failed':'Invalid content unexpectedly built'}: ${result.stdout}\n${result.stderr}`);
  if(expectSuccess){const check=spawnSync(process.execPath,['scripts/validate-build.mjs'],{env:buildEnv,encoding:'utf8'});assert.equal(check.status,0,check.stderr);}
  return result.stdout+result.stderr;
}
const content=({draft=false,alt=true,badPath=false}={})=>`---
title: "QA fixture — image system"
subtitle: "Temporary browser-test material; not an engineering project."
date: "Test only"
role: "Test fixture"
type: "QA"
tools: ["QA"]
categories: ["QA"]
featured: true
order: -1
draft: ${draft}
status: "Test only"
coverImage: "projects/${badPath?'does-not-exist.png':'qa-wide-fixture.png'}"
coverAlt: "${alt?'Solid-color landscape test fixture':''}"
gallery:
  - src: "projects/qa-wide-fixture.png"
    alt: "Landscape test fixture"
    caption: "Landscape layout test"
  - src: "projects/qa-tall-fixture.png"
    alt: "Portrait test fixture"
    caption: "Portrait layout test"
---
## Image behavior

Temporary test content. This file is removed when the tests finish.
`;
let browser,server;
const results={};
try{
  await sharp({create:{width:2400,height:1400,channels:3,background:'#c4d1c7'}}).png().toFile(wide);
  await sharp({create:{width:900,height:1600,channels:3,background:'#d8c9bd'}}).png().toFile(tall);
  await writeFile(file,content());
  build('https://portfolio.example/engineering/');
  results.repositorySubpathBuild='passed';
  server=createServer(async(req,res)=>{
    try{
      const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      if(!route.startsWith('/engineering/')){res.writeHead(404);return res.end();}
      const relative=route.slice('/engineering/'.length);
      const target=path.resolve(root,'dist',relative+(route.endsWith('/')?'index.html':''));
      if(!target.startsWith(path.join(root,'dist')+path.sep)){res.writeHead(403);return res.end();}
      const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.pdf':'application/pdf'};
      res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');res.end(await readFile(target));
    }catch{res.writeHead(404);res.end();}
  });
  await new Promise(resolve=>server.listen(4322,'127.0.0.1',resolve));
  browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
  const context=await browser.newContext();
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url='http://127.0.0.1:4322/engineering/';
  await page.goto(url);
  assert((await page.locator('.project-card h3').first().textContent()).startsWith('QA fixture'));
  assert.equal(await page.locator('.project-card').count(),4);
  results.addProjectAndFeaturedOrdering='passed';
  for(const width of [1440,768,390,320]){
    await page.setViewportSize({width,height:900});
    await page.goto(url+'work/qa-gallery-fixture/',{waitUntil:'networkidle'});
    await page.locator('.gallery-grid').scrollIntoViewIfNeeded();
    await page.locator('.gallery-grid img').first().waitFor();
    await page.waitForFunction(()=>[...document.querySelectorAll('.gallery-grid img')].every(i=>i.complete&&i.naturalWidth>0));
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    assert(await page.locator('.gallery-grid img').first().getAttribute('srcset'));
    assert.equal(await page.locator('.gallery-grid img').last().evaluate(i=>getComputedStyle(i).objectFit),'contain');
    const link=page.locator('[data-lightbox]').first();
    await link.focus();await page.keyboard.press('Enter');
    assert(await page.locator('#image-dialog').evaluate(d=>d.open));
    await page.waitForFunction(()=>document.querySelector('#dialog-image').naturalWidth>0);
    assert.equal(await page.locator('#dialog-caption').textContent(),'Landscape layout test');
    const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.equal(axe.violations.length,0,JSON.stringify(axe.violations.map(v=>v.id)));
    await page.keyboard.press('Escape');
    assert(!(await page.locator('#image-dialog').evaluate(d=>d.open)));
    assert(await link.evaluate(e=>e===document.activeElement));
    await page.locator('[data-lightbox]').last().click();await page.getByRole('button',{name:'Close'}).click();
    assert(!(await page.locator('#image-dialog').evaluate(d=>d.open)));
  }
  assert.equal(errors.length,0);
  results.responsiveImagesAndDialog='passed at 1440, 768, 390, 320';
  const nojs=await browser.newContext({javaScriptEnabled:false});const plain=await nojs.newPage();await plain.goto(url+'work/qa-gallery-fixture/');
  const imageUrl=await plain.locator('[data-lightbox]').first().getAttribute('href');
  assert((await plain.request.get(new URL(imageUrl,url).href)).ok());await nojs.close();
  results.noJavaScriptGallery='passed';
  const html=await readFile('dist/work/qa-gallery-fixture/index.html','utf8');
  assert(html.includes('https://portfolio.example/engineering/work/qa-gallery-fixture/'));
  assert(html.includes('https://portfolio.example/engineering/social-preview.png'));
  assert((await readFile('dist/sitemap.xml','utf8')).includes('https://portfolio.example/engineering/work/qa-gallery-fixture/'));
  results.subpathCanonicalSocialAndSitemap='passed';
  await writeFile(file,content({draft:true}));build('https://portfolio.example/');
  let draftPresent=true;try{await access('dist/work/qa-gallery-fixture/index.html');}catch{draftPresent=false;}
  assert(!draftPresent);assert(!(await readFile('dist/index.html','utf8')).includes('QA fixture'));
  assert(!(await readFile('dist/sitemap.xml','utf8')).includes('qa-gallery-fixture'));
  assert((await readFile('dist/work/putter-design/index.html','utf8')).includes('https://portfolio.example/work/putter-design/'));
  results.hideDraftAndCustomDomainBuild='passed';
  await writeFile(file,content({alt:false}));assert(build('',false).includes('coverAlt'));
  results.missingAltValidation='passed';
  await writeFile(file,content({badPath:true}));assert(build('',false).includes('Image not found'));
  results.missingFileValidation='passed';
  await writeFile('qa/content-results.json',JSON.stringify({testedAt:new Date().toISOString(),...results},null,2));
  console.log(JSON.stringify(results,null,2));
}finally{
  await browser?.close();if(server)await new Promise(resolve=>server.close(resolve));
  for(const f of temporary){try{await unlink(f);}catch(e){if(e.code!=='ENOENT')throw e;}}
  build();
  console.log('Temporary fixtures removed; normal production build restored.');
}
