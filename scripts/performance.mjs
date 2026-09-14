import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
import {writeFile,mkdir} from 'node:fs/promises';
const origin=process.env.QA_URL||'http://127.0.0.1:4321/';
await mkdir('qa/lighthouse',{recursive:true});
const chrome=await launch({chromePath:process.env.CHROME_PATH,chromeFlags:['--headless','--disable-gpu','--no-first-run']});
const results=[];
try{
  for(const [name,route] of [['homepage',''],['project','work/putter-design/'],['ai-project','work/peterbilt-ai-tool/']]){
    const result=await lighthouse(new URL(route,origin).href,{port:chrome.port,output:['html','json'],logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']});
    if(!result||result.lhr.runtimeError)throw Error(JSON.stringify(result?.lhr.runtimeError));
    await writeFile(`qa/lighthouse/${name}.html`,result.report[0]);
    await writeFile(`qa/lighthouse/${name}.json`,result.report[1]);
    results.push({page:name,scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,result.lhr.audits[k].displayValue])),failedAudits:Object.entries(result.lhr.audits).filter(([,a])=>a.score!==null&&a.score<1&&a.scoreDisplayMode!=='informative').map(([id,a])=>({id,title:a.title,score:a.score}))});
  }
  await writeFile('qa/performance-results.json',JSON.stringify({testedAt:new Date().toISOString(),environment:'Local Chrome, Lighthouse simulated mobile defaults',results},null,2));
  console.log(JSON.stringify(results,null,2));
}finally{chrome.kill();}
