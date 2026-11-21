import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveSiteUrl } from '../src/lib/site-url.ts';

test('uses a custom domain before Vercel defaults and normalizes its origin', () => {
  assert.equal(resolveSiteUrl({ SITE_URL: ' https://restaurant.example/ ', VERCEL_PROJECT_PRODUCTION_URL: 'project.vercel.app' }), 'https://restaurant.example');
});
test('preview builds use the stable production hostname for canonical metadata', () => {
  assert.equal(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'project.vercel.app', VERCEL_URL: 'project-random.vercel.app' }), 'https://project.vercel.app');
});
test('accepts deployment hostname and Cloudflare build URL fallbacks', () => {
  assert.equal(resolveSiteUrl({ VERCEL_URL: 'project-random.vercel.app' }), 'https://project-random.vercel.app');
  assert.equal(resolveSiteUrl({ CF_PAGES_URL: 'https://restaurant.pages.dev/' }), 'https://restaurant.pages.dev');
});
test('portable builds never invent a public origin', () => {
  assert.equal(resolveSiteUrl({}), undefined);
});
test('rejects invalid or credential-bearing metadata origins', () => {
  for (const value of ['not a url', 'ftp://example.com', 'https://user:pass@example.com', 'https://example.com/path', 'https://example.com/?q=1', 'https://example.com/#section']) {
    assert.throws(() => resolveSiteUrl({ SITE_URL: value }));
  }
});
