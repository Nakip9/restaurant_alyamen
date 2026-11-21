import type { Metadata, Viewport } from 'next';
import '@fontsource/tajawal/arabic-400.css';
import '@fontsource/tajawal/arabic-500.css';
import '@fontsource/tajawal/arabic-700.css';
import '@fontsource/tajawal/arabic-800.css';
import '@fontsource/tajawal/latin-400.css';
import './globals.css';
import { restaurant } from '@/data/restaurant';
import { siteUrl, isPreview } from '@/lib/site-url';
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'مطعم اليمن السعيد | مندي بطعم مختلف في الرمادي',
  description: 'أهلًا بكم في مطعم اليمن السعيد في الرمادي، منطقة القطانة، مقابل المنتجات النفطية. مندي بطعم مختلف، وطلبات سفري وتوصيل. اتصل بنا على 07872966136.',
  alternates: siteUrl ? { canonical: '/' } : undefined,
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { title: 'اليمن السعيد — مندي بطعم مختلف', description: 'من اليمن السعيد، إلى مائدتكم في الرمادي. طلبات سفري وتوصيل.', locale: 'ar_IQ', type: 'website', url: siteUrl, images: siteUrl ? [{ url: `${siteUrl}/images/mandi-hero.webp`, width: 1536, height: 1024, alt: 'صورة تعبيرية للمندي' }] : [] },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = { themeColor: '#201b17' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { '@context': 'https://schema.org', '@type': 'Restaurant', name: restaurant.name, url: siteUrl, telephone: restaurant.phone, email: restaurant.email, servesCuisine: 'مندي', address: { '@type': 'PostalAddress', streetAddress: 'منطقة القطانة، الشارع المقابل للمنتجات النفطية', addressLocality: 'الرمادي', addressRegion: 'الأنبار', addressCountry: 'IQ' }, sameAs: [restaurant.facebook] };
  return <html lang="ar" dir="rtl"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />{children}</body></html>;
}
