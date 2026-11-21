import type { MetadataRoute } from 'next';
import { siteUrl, isPreview } from '@/lib/site-url';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots { return { rules: isPreview ? { userAgent: '*', disallow: '/' } : { userAgent: '*', allow: '/' }, sitemap: siteUrl && !isPreview ? `${siteUrl}/sitemap.xml` : undefined }; }
