'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { Menu, X, Phone, MapPin, Search, ShoppingBag, Truck, UtensilsCrossed, Mail, Plus, Minus, Copy, Check, Expand, ChevronDown, Navigation, Clock, Flame } from 'lucide-react';
import { restaurant as r, navigation, menuItems, categories, gallery, mapsUrl } from '@/data/restaurant';

const ease = [0.22, 1, 0.36, 1] as const;
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? {} : { opacity: [0.45, 1], y: [22, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, delay, ease }}>{children}</motion.div>;
}
function Mark({ small = false }: { small?: boolean }) {
  return <span className={`brand ${small ? 'brand-small' : ''}`}><span className="brand-emblem" aria-hidden="true"><svg viewBox="0 0 60 60"><path d="M8 44h44M13 39a17 17 0 0134 0H13zM26 15c-5 5 5 7 0 12M35 10c-5 5 5 7 0 12M20 49h20" /></svg></span><span><strong>اليمن السعيد</strong><small>مندي بطعم مختلف</small></span></span>;
}
function Ornament() { return <span className="ornament" aria-hidden="true">✦</span>; }

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [service, setService] = useState('توصيل');
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const orderDialog = useRef<HTMLDialogElement>(null);
  const galleryDialog = useRef<HTMLDialogElement>(null);
  const mobileDialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }); }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);
  useEffect(() => { if (orderOpen) orderDialog.current?.showModal(); else orderDialog.current?.close(); }, [orderOpen]);
  useEffect(() => { if (lightbox !== null) galleryDialog.current?.showModal(); else galleryDialog.current?.close(); }, [lightbox]);
  useEffect(() => { if (mobileOpen) mobileDialog.current?.showModal(); else mobileDialog.current?.close(); }, [mobileOpen]);
  useEffect(() => { document.body.style.overflow = orderOpen || lightbox !== null || mobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [orderOpen, lightbox, mobileOpen]);
  const normalize = (s: string) => s.replace(/[\u064B-\u065F\u0670]/g, '').replace(/[أإآ]/g, 'ا').trim();
  const filtered = menuItems.filter(item => (category === 'all' || category === item.category) && normalize(item.name).includes(normalize(query)));
  const summary = `أهلًا مطعم اليمن السعيد، أود الاستفسار عن طلب المندي.\nالعدد المطلوب: ${quantity}\nطريقة الاستلام: ${service}\nيرجى تأكيد الخيارات والسعر ووقت التجهيز${service === 'توصيل' ? ' ورسوم التوصيل' : ''}.`;
  async function copyOrder() { try { await navigator.clipboard.writeText(summary); setCopied(true); setCopyError(false); } catch { setCopyError(true); } }
  function openOrder() { setCopied(false); setCopyError(false); setOrderOpen(true); }

  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">انتقل إلى المحتوى</a>
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner"><a href="#home" className="brand-link" aria-label="اليمن السعيد — الرئيسية"><Mark /></a>
        <nav className="desktop-nav" aria-label="القائمة الرئيسية">{navigation.map(n => <a key={n.href} className={active === n.href ? 'active' : ''} href={n.href}>{n.label}</a>)}</nav>
        <div className="header-actions"><button className="button button-gold small" onClick={openOrder}><Phone size={16} /> اطلب الآن</button><button className="mobile-toggle icon-button" aria-label="فتح القائمة" aria-expanded={mobileOpen} aria-controls="mobile-nav" onClick={() => setMobileOpen(true)}><Menu /></button></div>
      </div>
    </header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-image"><Image src="/images/mandi-hero.webp" alt="صورة تعبيرية لطبق مندي وأرز في صينية نحاسية" fill preload sizes="100vw" /></div><div className="hero-shade" />
        <div className="hero-content container"><motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
          <p className="eyebrow hero-eyebrow"><span /> {r.hero.eyebrow}</p>
          <h1 id="hero-title">{r.hero.title}<br /><span>{r.hero.accent}</span></h1>
          <p className="hero-description">{r.hero.description}</p>
          <div className="hero-buttons"><a className="button button-gold" href="#menu"><UtensilsCrossed size={18} /> اكتشف قائمتنا</a><button className="button button-outline" onClick={openOrder}><Phone size={18} /> اطلب الآن</button></div>
          <div className="hero-location"><MapPin size={16} /><span>الرمادي، القطانة</span><span className="tiny-separator" /><span>سفري وتوصيل</span></div>
        </motion.div></div>
        <div className="hero-bottom container"><a href="#story" className="scroll-cue"><span>للحكاية بقية</span><ChevronDown size={18} /></a><span className="image-note">صورة تعبيرية للمندي</span></div>
        <span className="hero-side-note" aria-hidden="true">طعم يجمعنا</span>
      </section>
      <div className="service-ribbon"><div className="container ribbon-inner"><span><Flame /> مندي بطعم مختلف</span><Ornament /><span><ShoppingBag /> طلبات سفري</span><Ornament /><span><Truck /> توصيل إلى بابك</span><Ornament /><span><MapPin /> في قلب الرمادي</span></div></div>

      <section className="story section-pad" id="story"><div className="container story-grid">
        <Reveal className="story-copy"><p className="eyebrow"><span /> حكايتنا</p><h2>من اسمنا،<br /><span className="serif-accent">تبدأ الضيافة.</span></h2><p className="lead">أهلًا بكم في مطعم اليمن السعيد.</p><p>في الرمادي، منطقة القطانة، نرحّب بكم على طعم المندي الذي يجمعنا. «مندي بطعم مختلف» هي دعوتنا لكم لتكتشفوا مذاقكم القادم.</p><p>ولأن أجمل الوجبات هي التي نشاركها، طلباتكم متاحة سفري وتوصيل… أينما كانت لمّتكم.</p><a className="text-link" href="#location"><MapPin size={17} /> أهلًا وسهلًا بكم في القطانة</a></Reveal>
        <Reveal className="story-visual" delay={0.12}><div className="arch-image"><Image src="/images/mandi-table.webp" alt="تفاصيل تعبيرية لصينية المندي" fill sizes="(max-width: 768px) 90vw, 45vw" /></div><div className="story-stamp"><Ornament /><strong>اليمن<br />السعيد</strong><small>للّمة طعم</small></div><p className="photo-caption">لقطة تعبيرية — بانتظار صور مطبخنا الفعلية</p></Reveal>
      </div></section>

      <section className="menu-section section-pad" id="menu"><div className="container">
        <Reveal className="section-heading"><div><p className="eyebrow"><span /> على مائدتكم</p><h2>الطعم الذي <span className="serif-accent">جئتم لأجله.</span></h2></div><p>اكتشف المندي من اليمن السعيد.<br />واسألنا عن خيارات اليوم عند الطلب.</p></Reveal>
        <div className="menu-toolbar"><div className="category-tabs" role="group" aria-label="تصنيف قائمة الطعام">{categories.map(c => <button key={c.id} onClick={() => setCategory(c.id)} aria-pressed={category === c.id} className={category === c.id ? 'selected' : ''}>{c.label}</button>)}</div><label className="search-field"><Search size={18} /><span className="sr-only">ابحث في قائمة الطعام</span><input type="search" placeholder="ما الذي تشتهيه؟" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
        <div className="menu-results" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={`${category}-${query}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          {filtered.length ? filtered.map(item => <article className="signature-dish" key={item.id}><div className="dish-image"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 768px) 100vw, 55vw" /><span className="dish-badge"><Flame size={15} /> نكهة اليمن السعيد</span><span className="dish-image-caption">صورة تعبيرية</span></div><div className="dish-content"><span className="dish-kicker">طبقنا الذي يجمعنا</span><h3>{item.name}</h3><p>{item.description}</p><div className="dish-meta"><span><ShoppingBag size={16} /> سفري</span><span><Truck size={17} /> توصيل</span></div><div className="dish-order"><span>{item.price === null ? 'السعر والخيارات عند الاتصال' : `${item.price.toLocaleString('ar-IQ')} د.ع`}</span><button className="button button-dark" onClick={openOrder}>اطلب المندي <Plus size={18} /></button></div></div></article>) : <div className="empty-state"><Search size={32} /><h3>لم نجد هذا الطبق</h3><p>جرّب البحث عن «مندي» أو تواصل معنا لمعرفة المتاح.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('all'); }}>عرض القائمة</button></div>}
        </motion.div></AnimatePresence></div>
        <p className="menu-footnote"><UtensilsCrossed size={16} /> القائمة الكاملة والأسعار متاحة عند الاتصال بالمطعم.</p>
      </div></section>

      <section className="hospitality section-pad"><div className="container"><Reveal className="center-heading"><p className="eyebrow">على ذوقك، وبالطريقة التي تناسبك</p><h2>من عندنا… <span>إلى لمّتكم.</span></h2></Reveal><div className="hospitality-grid">
        <Reveal><ShoppingBag /><h3>خذه معك</h3><p>اطلب سفري واستلم طلبك من مطعمنا في منطقة القطانة.</p><button className="text-link" onClick={() => { setService('سفري'); openOrder(); }}>اطلب سفري</button></Reveal>
        <Reveal delay={0.1}><Truck /><h3>نوصله إليك</h3><p>اتصل بنا لتأكيد عنوانك وتفاصيل التوصيل وموعد وصول طلبك.</p><button className="text-link" onClick={() => { setService('توصيل'); openOrder(); }}>اطلب توصيل</button></Reveal>
        <Reveal delay={0.2}><MapPin /><h3>قريبون منكم</h3><p>في الرمادي، القطانة، في الشارع المقابل للمنتجات النفطية.</p><a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer">اعثر علينا</a></Reveal>
      </div></div></section>

      <section className="gallery-section section-pad" id="gallery"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow"><span /> مذاق يبدأ من النظرة الأولى</p><h2>للمندي <span className="serif-accent">صورة وحكاية.</span></h2></div><a className="text-link" href={r.facebook} target="_blank" rel="noreferrer">صورنا وأخبارنا على فيسبوك <span className="facebook-f" aria-hidden="true">f</span></a></Reveal>
        <div className="gallery-grid">{gallery.map((photo, i) => <Reveal key={photo.src} delay={i * 0.08}><button className={`gallery-tile gallery-tile-${i}`} onClick={() => setLightbox(i)} aria-label={`تكبير الصورة التعبيرية: ${photo.title}`}><Image src={photo.src} alt={`صورة تعبيرية للمندي — ${photo.title}`} fill sizes="(max-width: 600px) 88vw, 33vw" style={{ objectPosition: photo.position }} /><span className="gallery-label">{photo.title}</span><span className="expand-icon"><Expand size={19} /></span></button></Reveal>)}</div><p className="photo-caption gallery-disclosure">{r.imageDisclosure} شاهد الصور الفعلية على صفحتنا في فيسبوك.</p>
      </div></section>

      <section className="location-section section-pad" id="location"><div className="container location-grid"><Reveal className="location-copy"><p className="eyebrow"><span /> قريبون من لمّتكم</p><h2>بانتظاركم<br /><span className="serif-accent">في الرمادي.</span></h2><address><MapPin /><div><strong>مطعم اليمن السعيد</strong><p>{r.address}</p></div></address><div className="contact-row"><Phone /><div><span>للطلب والاستفسار</span><a className="phone-number" href={`tel:${r.phone}`} dir="ltr">{r.displayPhone}</a></div></div><div className="contact-row"><Clock /><p>اتصل بنا لمعرفة أوقات العمل اليوم.</p></div><a className="button button-dark" href={mapsUrl} target="_blank" rel="noreferrer"><Navigation size={18} /> افتح الموقع على الخرائط</a></Reveal><Reveal className="map-panel" delay={0.1}><iframe title="البحث عن مطعم اليمن السعيد في منطقة القطانة بالرمادي" src={`https://maps.google.com/maps?q=${encodeURIComponent(r.mapsQuery)}&output=embed&hl=ar`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className="map-card"><MapPin /><div><strong>الرمادي · القطانة</strong><span>مقابل المنتجات النفطية</span></div><a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="فتح البحث عن المطعم في خرائط جوجل"><Navigation size={20} /></a></div><p className="map-note">الخريطة تعرض البحث بالعنوان؛ اتصل بنا لتأكيد نقطة الوصول.</p></Reveal></div></section>

      <section className="final-cta"><div className="cta-photo"><Image src="/images/mandi-hero.webp" alt="صورة تعبيرية للمندي" fill sizes="100vw" /></div><Reveal className="container cta-content"><p className="eyebrow">أهلًا وسهلًا بكم جميعًا</p><h2>لمّتكم أحلى…<br /><span>بطعم اليمن السعيد.</span></h2><p>جاهز لتجربة طعم مختلف؟ نحن بانتظار اتصالك.</p><button className="button button-gold" onClick={openOrder}><Phone size={18} /> اطلب الآن</button></Reveal></section>
    </main>
    <footer id="contact"><div className="container footer-main"><div className="footer-brand"><a href="#home" aria-label="العودة إلى الرئيسية"><Mark /></a><p>مندي بطعم مختلف.<br />من الرمادي، إلى مائدتكم بكل ترحيب.</p></div><div><h3>اكتشف اليمن السعيد</h3><div className="footer-links">{navigation.slice(1).map(n => <a key={n.href} href={n.href}>{n.label}</a>)}</div></div><div><h3>خلّينا على تواصل</h3><a className="footer-contact" href={`tel:${r.phone}`}><Phone size={16} /><bdi>{r.internationalPhone}</bdi></a><a className="footer-contact email" href={`mailto:${r.email}`}><Mail size={16} /><bdi>{r.email}</bdi></a><a className="footer-contact" href={r.facebook} target="_blank" rel="noreferrer"><span className="facebook-f" aria-hidden="true">f</span> تابعنا على فيسبوك</a></div></div><div className="container footer-bottom"><p>© {new Date().getFullYear().toLocaleString('ar', { useGrouping: false })} مطعم اليمن السعيد. جميع الحقوق محفوظة.</p><span>صُنع بروح الضيافة <span className="heart">♡</span></span></div></footer>
    <div className="mobile-action-bar"><a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={19} /> موقعنا</a><button className="button button-gold" onClick={openOrder}><Phone size={18} /> اطلب الآن</button></div>

    <dialog ref={mobileDialog} id="mobile-nav" className="mobile-menu-dialog" onCancel={() => setMobileOpen(false)} onClose={() => setMobileOpen(false)} aria-labelledby="mobile-menu-title"><div className="mobile-menu-top"><h2 id="mobile-menu-title">اليمن السعيد</h2><button className="icon-button" aria-label="إغلاق القائمة" onClick={() => setMobileOpen(false)}><X /></button></div><nav aria-label="قائمة الهاتف">{navigation.map((n, i) => <motion.a key={n.href} initial={false} animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }} transition={{ delay: i * 0.04 }} href={n.href} onClick={() => setMobileOpen(false)}>{n.label}</motion.a>)}</nav><a href={`tel:${r.phone}`} className="button button-gold"><Phone size={18} /> اتصل بنا</a></dialog>

    <dialog ref={orderDialog} className="order-dialog" aria-labelledby="order-title" onCancel={() => setOrderOpen(false)} onClose={() => setOrderOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOrderOpen(false); }}><div className="dialog-inner"><button className="dialog-close icon-button" onClick={() => setOrderOpen(false)} aria-label="إغلاق نافذة الطلب"><X /></button><p className="eyebrow">من مطبخنا إلى لمّتكم</p><h2 id="order-title">خلّينا نجهّز طلبك.</h2><p>حدد ما يناسبك ثم اتصل بنا لتأكيد الخيارات والسعر ووقت التجهيز.</p><fieldset className="service-choice"><legend>كيف تحب تستلم طلبك؟</legend>{['توصيل', 'سفري'].map(s => <label key={s} className={service === s ? 'chosen' : ''}><input type="radio" name="service" value={s} checked={service === s} onChange={() => { setService(s); setCopied(false); }} />{s === 'توصيل' ? <Truck size={20} /> : <ShoppingBag size={20} />}{s}</label>)}</fieldset><div className="quantity-row"><div><strong>المندي</strong><small>تُؤكَّد تفاصيل الوجبة عند الاتصال</small></div><div className="quantity-controls"><button aria-label="تقليل العدد" disabled={quantity <= 1} onClick={() => { setQuantity(q => q - 1); setCopied(false); }}><Minus size={17} /></button><output aria-label="العدد" aria-live="polite">{quantity.toLocaleString('ar')}</output><button aria-label="زيادة العدد" disabled={quantity >= 20} onClick={() => { setQuantity(q => q + 1); setCopied(false); }}><Plus size={17} /></button></div></div><p className="order-note">{service === 'توصيل' ? 'اتفق معنا هاتفيًا على عنوانك ورسوم التوصيل.' : 'استلام الطلب من القطانة، مقابل المنتجات النفطية.'} لا يُرسل طلبك تلقائيًا من الموقع.</p><a className="button button-gold full-width" href={`tel:${r.phone}`}><Phone size={18} /> اتصل لتأكيد الطلب <bdi>{r.displayPhone}</bdi></a><button className="copy-button" onClick={copyOrder}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'تم نسخ تفاصيل الطلب' : 'نسخ تفاصيل الطلب'}</button><p className="sr-only" role="status">{copied ? 'تم نسخ تفاصيل الطلب' : ''}</p>{copyError && <div role="status"><p>تعذّر النسخ تلقائيًا. يمكنك نسخ النص التالي:</p><textarea readOnly value={summary} aria-label="ملخص الطلب لنسخه" /></div>}</div></dialog>

    <dialog ref={galleryDialog} className="lightbox-dialog" aria-labelledby="lightbox-title" onCancel={() => setLightbox(null)} onClose={() => setLightbox(null)} onClick={e => { if (e.target === e.currentTarget) setLightbox(null); }}><button className="lightbox-close icon-button" aria-label="إغلاق الصورة" onClick={() => setLightbox(null)}><X /></button>{lightbox !== null && <><div className="lightbox-image"><Image src={gallery[lightbox].src} alt={`صورة تعبيرية للمندي — ${gallery[lightbox].title}`} fill sizes="90vw" /></div><h2 id="lightbox-title">{gallery[lightbox].title}</h2><p>{r.imageDisclosure}</p><div className="lightbox-controls"><button onClick={() => setLightbox((lightbox + gallery.length - 1) % gallery.length)}>السابقة</button><span>{(lightbox + 1).toLocaleString('ar')} / {gallery.length.toLocaleString('ar')}</span><button onClick={() => setLightbox((lightbox + 1) % gallery.length)}>التالية</button></div></>}</dialog>
  </MotionConfig>;
}
