import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const routes = ['/', '/how-it-works', '/churn-intelligence', '/pricing', '/demo', '/trust'];
const readPage = path => readFile(path==='/'?'dist/index.html':'dist'+path+'.html','utf8');
test('every public route ships useful HTML and route-specific metadata before JavaScript',async()=>{
 const descriptions=new Set();
 for(const path of routes){
  const html=await readPage(path);
  assert.equal((html.match(/<h1>/g)||[]).length,1,path+' must have one primary heading');
  assert.ok(html.includes('data-route="'+path+'"'),path+' must identify its prerendered route');
  assert.ok(html.includes('href="https://www.hyzl.ai'+(path==='/'?'':path)+'"'),path+' canonical');
  const description=html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1];
  assert.ok(description && description.length>35,path+' description');
  descriptions.add(description);
  for(const match of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) await access('dist'+match[1]);
 }
 assert.equal(descriptions.size,routes.length,'descriptions must be specific to each route');
});
test('conversion and illustrative evidence remain honest in static HTML',async()=>{
 const home=await readPage('/');
 const demo=await readPage('/demo');
 assert.match(home,/Illustrative data, not customer results/);
 assert.match(home,/Sample message, not a customer transcript/);
 assert.match(demo,/https:\/\/meetings-na2.hubspot.com\/d-torre\/hyzl-revenue-recovery/);
 assert.doesNotMatch(demo,/<form\b/);
});
test('sitemap contains public pages, and unknown pages are not indexed',async()=>{
 const sitemap=await readFile('dist/sitemap.xml','utf8');
 assert.equal((sitemap.match(/<url>/g)||[]).length,routes.length);
 const missing=await readFile('dist/404.html','utf8');
 assert.match(missing,/name="robots" content="noindex"/);
 assert.match(missing,/This page/);
});
