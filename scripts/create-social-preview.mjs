import { chromium } from '@playwright/test';
import profile from '../content/profile.json' with {type:'json'};
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Social preview</title><style>*{box-sizing:border-box}body{margin:0;background:#202523;color:#fff;font-family:Arial,Helvetica,sans-serif;padding:65px 80px;width:1200px;height:630px}.top{font-size:17px;color:#f78c52;letter-spacing:2px;text-transform:uppercase;margin:0 0 64px}h1{font-size:105px;letter-spacing:-6px;font-weight:600;line-height:1;margin:0 0 25px}h1 span{color:#f78c52}.role{font-size:30px;margin:0 0 14px}.school{font-size:23px;color:#c4ccc6;margin:0}.bottom{position:absolute;bottom:57px;left:80px;right:80px;padding-top:25px;border-top:1px solid #49504b;font-size:19px;color:#c4ccc6;display:flex;justify-content:space-between}</style></head><body><p class="top">Design · Manufacturing · Prototyping</p><h1>${escape(profile.name)}</h1><p class="role">${escape(profile.discipline)}</p><p class="school">${escape(profile.university)}</p><div class="bottom"><span>Engineering Portfolio</span><span>CAD · Physical prototypes · Manufacturing</span></div></body></html>`);
await page.screenshot({path:'public/social-preview.png'});
await browser.close();
console.log('Created 1200 × 630 social-preview.png');
