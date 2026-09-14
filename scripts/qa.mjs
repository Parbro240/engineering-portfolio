import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const origin=process.env.QA_URL || 'http://127.0.0.1:4321/';
const browser=await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
const context=await browser.newContext();
const page=await context.newPage();
const errors=[];
page.on('pageerror', e=>errors.push(e.message));
page.on('console', m=>{if(m.type()==='error') errors.push(m.text());});
const pages=['','work/','work/putter-design/','work/peterbilt-ai-tool/','work/peterbilt-manufacturing/','work/research-putting-performance/','404.html'];
const widths=[1440,1024,768,430,390,375,320];
const results=[];
await mkdir('qa/screenshots',{recursive:true});
for(const width of widths){
  await page.setViewportSize({width,height:width<768?844:1000});
  for(const route of pages){
    const response=await page.goto(new URL(route,origin).href,{waitUntil:'networkidle'});
    assert(response?.ok(), `HTTP failure: ${route}`);
    const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)&&!e.classList.contains('skip-link')&&!e.classList.contains('sr-only');}).map(e=>e.tagName+'.'+e.className).slice(0,10)}));
    assert(overflow.scroll<=width+1, `Overflow ${width}/${route}: ${JSON.stringify(overflow)}`);
    const brokenImages=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.getAttribute('src') && (!i.complete||i.naturalWidth===0)).map(i=>i.src));
    assert.equal(brokenImages.length,0,`Broken images ${route}`);
    assert.equal(await page.locator('h1').count(),1);
    const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.equal(axe.violations.length,0,`Accessibility ${width}/${route}: ${JSON.stringify(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))}`);
    results.push({width,route:route||'/',overflow:false,axeViolations:0});
    if((width===1440||width===390)&&['','work/putter-design/','work/peterbilt-ai-tool/'].includes(route)){
      const label=route===''?'homepage':route.includes('putter-design')?'project':'ai-project';
      await page.screenshot({path:`qa/screenshots/${width===1440?'desktop':'mobile'}-${label}.png`,fullPage:true});
      if(route==='') await page.screenshot({path:`qa/screenshots/${width===1440?'desktop':'mobile'}-first-screen.png`});
    }
  }
}
// Follow every local link, check every fragment and exact supplied contact destinations.
await page.setViewportSize({width:1440,height:1000});
const checked=new Set();
for(const route of pages){
  await page.goto(new URL(route,origin).href);
  const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.href));
  for(const link of links){
    const u=new URL(link);
    if(u.origin!==new URL(origin).origin || checked.has(link)) continue;
    checked.add(link);
    const response=await context.request.get(link);
    assert(response.ok(),`Broken link ${link}`);
    if(u.hash){await page.goto(link);assert(await page.locator(`[id="${decodeURIComponent(u.hash.slice(1))}"]`).count(),`Missing fragment ${link}`);}
  }
}
await page.goto(origin,{waitUntil:'networkidle'});
assert.equal(await page.locator('a[href="mailto:pacole06@icloud.com"]').count(),1);
assert.equal(await page.locator('a[href="tel:+19408082777"]').count(),1);
assert.equal(await page.locator('a[href="https://www.linkedin.com/in/parker-cole-engineering"]').count(),1);
// Mobile menu: keyboard opening, Escape, a real navigation click, and resize reset.
await page.setViewportSize({width:390,height:844});
const menu=page.getByRole('button',{name:'Menu'});
await menu.focus();await page.keyboard.press('Enter');
await expect(menu).toHaveAttribute('aria-expanded','true');
await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
assert(await menu.evaluate(e=>e===document.activeElement));
await menu.click();await page.locator('#main-nav').getByRole('link',{name:'Work',exact:true}).click();
assert(page.url().endsWith('/work/'));
await menu.click();await page.setViewportSize({width:1024,height:900});await page.setViewportSize({width:390,height:844});
await expect(menu).toHaveAttribute('aria-expanded','false');
await page.goto(origin,{waitUntil:'networkidle'});await page.keyboard.press('Tab');
assert.equal(await page.evaluate(()=>document.activeElement?.textContent?.trim()),'Skip to content');
await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement?.id),'main');
// Two-times text size across every page, plus reduced motion.
for(const route of pages){
  await page.goto(new URL(route,origin).href,{waitUntil:'networkidle'});
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow at 200% text size: ${route}`);
}
await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
// Content and navigation survive disabled JavaScript.
const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:812}});
const fallback=await plain.newPage();await fallback.goto(origin);
assert(await fallback.locator('#main-nav').isVisible());
await fallback.locator('#main-nav').getByRole('link',{name:'Work',exact:true}).click();assert(fallback.url().endsWith('/work/'));
await plain.close();
assert.equal(errors.length,0,`Browser errors: ${errors.join('\n')}`);
await writeFile('qa/browser-results.json',JSON.stringify({testedAt:new Date().toISOString(),origin,cases:results,localLinksChecked:checked.size,consoleErrors:errors,mobileMenu:'passed',keyboard:'passed',textZoom:'passed',reducedMotion:'passed',noJavaScript:'passed'},null,2));
console.log(`Passed ${results.length} viewport/page checks, ${checked.size} local destinations, axe accessibility, navigation, keyboard, 200% text, reduced motion, and no-JS fallback.`);
await browser.close();
