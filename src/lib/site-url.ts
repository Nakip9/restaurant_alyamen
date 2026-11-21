/** Build-time metadata only. Never import this module into a client component. */
export function resolveSiteUrl(env: Record<string, string | undefined>): string | undefined {
  const explicit = env.SITE_URL?.trim();
  const host = env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || env.VERCEL_URL?.trim();
  const value = explicit || (host ? `https://${host}` : env.CF_PAGES_URL?.trim());
  if (!value) return undefined;
  let url: URL;
  try { url = new URL(value); } catch { throw new Error('SITE_URL must be an absolute URL, for example https://your-domain.com'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be a plain http(s) origin without a path, credentials, query, or fragment.');
  }
  return url.origin;
}
export const siteUrl = resolveSiteUrl(process.env);
export const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'development';
