export const restaurant = {
  name: 'مطعم اليمن السعيد', shortName: 'اليمن السعيد', tagline: 'مندي بطعم مختلف',
  phone: '+9647872966136', displayPhone: '0787 296 6136', internationalPhone: '+964 787 296 6136',
  email: 'alyemenalsaeed00@gmail.com',
  address: 'الأنبار – الرمادي – منطقة القطانة، الشارع المقابل للمنتجات النفطية.',
  facebook: 'https://www.facebook.com/profile.php?id=61596541268870',
  mapsQuery: 'مطعم اليمن السعيد، القطانة، الرمادي، العراق',
  hours: null, whatsapp: null,
  hero: { eyebrow: 'أهلًا بكم في مطعم اليمن السعيد', title: 'مندي', accent: 'بطعم مختلف.', description: 'للّمة طعم… وللمندي حكاية.\nمن اليمن السعيد، إلى مائدتكم في الرمادي.' },
  imageDisclosure: 'صور تعبيرية للمندي، وليست صورًا لأطباق المطعم.',
};
export const navigation = [
  { href: '#home', label: 'الرئيسية' }, { href: '#story', label: 'حكايتنا' },
  { href: '#menu', label: 'قائمة الطعام' }, { href: '#gallery', label: 'معرض الصور' },
  { href: '#location', label: 'موقعنا' }, { href: '#contact', label: 'تواصل معنا' },
];
export const categories = [{ id: 'all', label: 'الكل' }, { id: 'mandi', label: 'المندي' }];
export type MenuItem = { id: string; name: string; category: string; description: string; price: number | null; image: string; imageAlt: string };
export const menuItems: MenuItem[] = [{ id: 'mandi', name: 'المندي', category: 'mandi', description: 'مندي بطعم مختلف، من مطعم اليمن السعيد. تواصل معنا لمعرفة الخيارات المتاحة اليوم وتفاصيل طلبك.', price: null, image: '/images/mandi-detail.webp', imageAlt: 'صورة تعبيرية لطبق مندي مع الأرز، لا تمثل طبقًا موثقًا من المطعم' }];
export const gallery = [
  { src: '/images/mandi-hero.webp', title: 'للمندي حكاية', position: '25% 50%' },
  { src: '/images/mandi-detail.webp', title: 'تفاصيل تشهي', position: '40% 50%' },
  { src: '/images/mandi-table.webp', title: 'وللّمة طعم', position: '20% 70%' },
];
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapsQuery)}`;
