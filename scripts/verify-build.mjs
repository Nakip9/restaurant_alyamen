import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../out/', import.meta.url));
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const sitemap = readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const robots = readFileSync(path.join(root, 'robots.txt'), 'utf8');
const expectedOrigin = process.argv[2];
assert(html.includes('lang="ar"'));
assert(html.includes('dir="rtl"'));
assert(!html.includes('chatgpt.site'), 'Old hosting origin remains');
assert(existsSync(path.join(root, '404.html')), 'Arabic 404 output missing');
const refs = [...html.matchAll(/(?:src|href)="([^\"]+)"/g)].map(m => m[1]).filter(v => v.startsWith('/') && !v.startsWith('//'));
for (const ref of new Set(refs)) {
  const pathname = decodeURIComponent(new URL(ref, 'https://check.example').pathname);
  const local = path.join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
  assert(existsSync(local), `Missing exported asset: ${ref}`);
}
if (expectedOrigin) {
  assert(html.includes(`rel="canonical" href="${expectedOrigin}/"`), 'Canonical origin mismatch');
  assert(html.includes(`${expectedOrigin}/images/mandi-hero.webp`), 'Social image origin mismatch');
  assert(sitemap.includes(expectedOrigin), 'Sitemap origin mismatch');
  assert(robots.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`), 'Robots sitemap mismatch');
} else {
  assert(!html.includes('rel="canonical"'), 'Portable build has an invented canonical');
  assert(!sitemap.includes('<loc>'), 'Portable sitemap has an invented URL');
  assert(!robots.includes('Sitemap:'), 'Portable robots has an invented sitemap URL');
  assert(!html.includes('deployment-check.example'), 'Test domain leaked into release');
}
console.log(`Export verified: Arabic RTL, 404, ${new Set(refs).size} local asset references, and ${expectedOrigin ? 'production' : 'portable'} metadata.`);
