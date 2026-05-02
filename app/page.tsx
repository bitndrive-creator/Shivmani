'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// ── TYPES ────────────────────────────────────────────────────────
interface Post {
  id: string; title: string; slug: string; category: string;
  excerpt: string; imageUrl: string; author: string;
  publishedAt: string; readTime: number; featured?: boolean;
}
interface Cat {
  name: string; slug: string; icon: string;
  description: string; heroImage: string;
}

// ── CATEGORIES (Blueprint ke hisab se) ───────────────────────────
const CATS: Cat[] = [
  { name: 'Real Estate',        slug: 'real-estate',       icon: '🏛️', description: "India's finest residences and global investment opportunities", heroImage: '/images/real-estate.jpg'  },
  { name: 'Automobiles',        slug: 'automobiles',        icon: '🚗', description: 'Luxury performance, prestige, and collector culture',           heroImage: '/images/automobiles.jpg'  },
  { name: 'Jewellery & Watches',slug: 'jewellery-watches',  icon: '💎', description: 'Timeless assets. Enduring style.',                              heroImage: '/images/Jewellery.png'    },
  { name: 'Weddings',           slug: 'weddings',           icon: '✨', description: "India's world of couture celebrations and unforgettable occasions", heroImage: '/images/hero-weddings.jpg'  },
  { name: 'Curated Partners',   slug: 'curated-partners',   icon: '🤝', description: "India's trusted network of premium businesses",                 heroImage: '/images/hero-partners.jpg'    },
];

// ── NAV LINKS (Blueprint ke hisab se) ────────────────────────────
const NAV_LINKS = [
  { label: 'Home',                href: '/'                  },
  { label: 'News',                href: '/news'              },
  { label: 'Real Estate',         href: '/real-estate'       },
  { label: 'Automobiles',         href: '/automobiles'       },
  { label: 'Jewellery & Watches', href: '/jewellery-watches' },
  { label: 'Weddings',            href: '/weddings'          },
  { label: 'Curated Partners',    href: '/curated-partners'  },
  { label: 'Partner With Us',     href: '/partner-with-us'   },
  { label: 'About',               href: '/about'             },
];

// ── PARTNER BRANDS (placeholder logos) ───────────────────────────
const PARTNERS = [
  { name: 'Lodha Group',       logo: '/images/partner-lodha.png'    },
  { name: 'DLF Luxury',        logo: '/images/partner-dlf.png'      },
  { name: 'Rolls-Royce India', logo: '/images/partner-rr.png'       },
  { name: 'Tanishq',           logo: '/images/partner-tanishq.png'  },
  { name: 'Sabyasachi',        logo: '/images/partner-sabya.png'    },
  { name: 'Oberoi Hotels',     logo: '/images/partner-oberoi.png'   },
];

// ── WHY ILH POINTS ────────────────────────────────────────────────
const WHY_ILH = [
  { icon: '◈', title: 'Curated Luxury Intelligence',     desc: 'Only the most refined, relevant, and authoritative luxury content — curated for India\'s discerning audience.' },
  { icon: '◈', title: 'Trusted Premium Network',          desc: 'A vetted ecosystem of India\'s most respected luxury businesses and global brands.' },
  { icon: '◈', title: 'India-Focused Global Lens',        desc: 'Global luxury seen through an India-first perspective — aspirational, relevant, and deeply resonant.' },
  { icon: '◈', title: 'Business Growth Opportunities',    desc: 'Bespoke visibility packages designed to connect premium brands with India\'s luxury consumers.' },
];

// ── POSTS (ILH categories ke hisab se) ───────────────────────────
const POSTS: Post[] = [
  { id:'1', slug:'branded-residences-rise-india',         category:'Real Estate',         title:'Branded Residences Rise: How Global Luxury Hotels Are Redefining Indian Real Estate', excerpt:'From Four Seasons to Ritz-Carlton, global hospitality giants are reimagining luxury living in India\'s most coveted addresses.',            imageUrl:'/images/real-estate.jpg',  author:'Priya Mehta',    publishedAt:'Apr 28, 2026', readTime:8,  featured:true  },
  { id:'2', slug:'best-second-home-markets-india-2026',   category:'Real Estate',         title:'The Best Second-Home Markets in India for 2026',                                      excerpt:'From Alibaug to Kasauli, where India\'s ultra-affluent are investing in their next great escape.',                                          imageUrl:'/images/hero-home.jpg',  author:'Rahul Singhania',publishedAt:'Apr 24, 2026', readTime:6,  featured:false },
  { id:'3', slug:'rolls-royce-spectre-india-launch',      category:'Automobiles',         title:'Rolls-Royce Spectre Arrives in India: The First All-Electric Ultra-Luxury Car',       excerpt:'Silent, powerful, and unmistakably Rolls-Royce. We drive the Spectre on India\'s most scenic roads.',                                       imageUrl:'/images/automobiles.jpg',         author:'Vikram Oberoi',  publishedAt:'Apr 22, 2026', readTime:7,  featured:false },

  { id:'5', slug:'heritage-jewellery-trends-2026',        category:'Jewellery & Watches', title:'Heritage Jewellery Trends Dominating India\'s Bridal Season in 2026',                 excerpt:'Polki, Kundan, Jadau — the timeless crafts of India\'s royal courts are having their most spectacular moment yet.',                          imageUrl:'/images/Jewellery.png',        author:'Isha Thapar',    publishedAt:'Apr 15, 2026', readTime:5,  featured:false },
  // { id:'6', slug:'watches-worth-collecting-india',        category:'Jewellery & Watches', title:'5 Watches Worth Collecting in 2026 — An Indian Connoisseur\'s Guide',                 excerpt:'Patek Philippe, A. Lange & Söhne, F.P. Journe. Our editors pick the horological icons you should be acquiring now.',                        imageUrl:'/images/hero-watches.jpg',        author:'Siddharth Rao',  publishedAt:'Apr 10, 2026', readTime:7,  featured:false },
  { id:'7', slug:'destination-wedding-trends-2026',       category:'Weddings',            title:'Destination Wedding Trends Redefining India\'s Luxury Wedding Season',                 excerpt:'From Rajasthan\'s heritage forts to Maldivian islands, India\'s elite are choosing destinations as extraordinary as their love stories.',    imageUrl:'/images/hero-weddings.jpg',      author:'Ananya Birla',   publishedAt:'Apr 8, 2026',  readTime:6,  featured:false },
  { id:'8', slug:'luxury-bridal-looks-2026',              category:'Curated Partners',            title:'The Most Covetable Bridal Looks of 2026 — From Sabyasachi to Manish Malhotra',        excerpt:'India\'s couture masters have outdone themselves this season. Our editors curate the looks that made us catch our breath.',                   imageUrl:'/images/hero-partners.jpg',      author:'Divya Nair',     publishedAt:'Apr 4, 2026',  readTime:5,  featured:false },
];

// ── ILH LOGO SVG ────────────────────────────────────────────────
function ILHLogo({ size = 36 }: { size?: number }) {
  const gold = '#C9A84C';
  const emerald = '#2A7A6A';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Peacock body */}
      <path d="M40 62C40 62 34 50 33 40C32 30 36 22 40 18C44 14 50 14 52 20C54 26 48 32 44 37C40 42 40 48 42 54C44 60 40 62 40 62Z" fill={gold} opacity="0.9"/>
      {/* Peacock feathers */}
      <path d="M44 28C52 20 64 16 66 20C68 24 62 32 54 36C48 39 44 36 44 36" stroke={gold} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M42 34C50 22 62 12 68 14C72 16 68 28 60 34C54 38 42 36 42 36" stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      {/* Peacock eye spots */}
      <ellipse cx="30" cy="44" rx="5" ry="2.5" fill={emerald} transform="rotate(-30 30 44)" opacity="0.8"/>
      <ellipse cx="26" cy="50" rx="5" ry="2.5" fill={emerald} transform="rotate(-20 26 50)" opacity="0.7"/>
      <ellipse cx="28" cy="38" rx="4.5" ry="2" fill={emerald} transform="rotate(-45 28 38)" opacity="0.7"/>
      {/* ILH monogram hint */}
      <circle cx="52" cy="12" r="1.5" fill={gold}/>
      <circle cx="56" cy="10" r="1.2" fill={gold} opacity="0.8"/>
    </svg>
  );
}

// ── NAVBAR ───────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.4s ease',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
      }}>
        {/* Gold top line */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.7 }} />

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <ILHLogo size={40} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
              <div style={{ fontSize: 8, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 0 }} className="ilh-nav-desktop">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', textDecoration: 'none', padding: '8px 11px', borderBottom: '1px solid transparent', transition: 'color 0.2s, border-color 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderBottomColor = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,168,76,0.6)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button className="ilh-nav-mobile" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 8, display: 'none' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen
                ? <path d="M18 6 6 18M6 6l12 12" />
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: menuOpen ? 600 : 0, transition: 'max-height 0.35s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', padding: '14px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >{link.label}</Link>
          ))}
        </div>

        {/* Gold bottom line */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
      </header>

      <style>{`
        .ilh-nav-desktop { display: flex !important; }
        .ilh-nav-mobile  { display: none  !important; }
        @media (max-width: 1100px) {
          .ilh-nav-desktop { display: none !important; }
          .ilh-nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────
// function Footer() {
//   return (
//     <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '60px 32px 32px' }}>
//       <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//         {/* Top: Logo + Nav cols */}
//         <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="ilh-footer-grid">
//           {/* Brand col */}
//           <div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
//               <ILHLogo size={36} />
//               <div>
//                 <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#DFC27A', letterSpacing: '0.3em' }}>INDIAN</div>
//                 <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.4)', letterSpacing: '0.4em', marginTop: 2 }}>LUXURY HOUSE</div>
//               </div>
//             </div>
//             <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, fontWeight: 300, maxWidth: 240 }}>
//               Where India Meets Global Luxury. Celebrating, connecting, and elevating the world of luxury through an India-first lens.
//             </p>
//             {/* Socials */}
//             <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
//               {['Instagram', 'LinkedIn'].map(s => (
//                 <a key={s} href="#" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
//                   onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                   onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.5)')}
//                 >{s}</a>
//               ))}
//             </div>
//           </div>

//           {/* Nav col 1 */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20 }}>Navigate</p>
//             {['Home', 'News', 'About', 'Partner With Us'].map(item => (
//               <div key={item} style={{ marginBottom: 12 }}>
//                 <a href="#" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
//                   onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
//                   onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
//                 >{item}</a>
//               </div>
//             ))}
//           </div>

//           {/* Nav col 2 */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20 }}>Categories</p>
//             {CATS.map(c => (
//               <div key={c.slug} style={{ marginBottom: 12 }}>
//                 <Link href={`/${c.slug}`} style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
//                   onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
//                   onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
//                 >{c.name}</Link>
//               </div>
//             ))}
//           </div>

//           {/* Contact col */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20 }}>Contact</p>
//             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, marginBottom: 8 }}>Partnerships:</p>
//             <a href="mailto:hello@indianluxuryhouse.com" style={{ fontSize: 11, color: 'rgba(201,168,76,0.6)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
//               onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//               onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.6)')}
//             >hello@indianluxuryhouse.com</a>
//           </div>
//         </div>

//         {/* Gold divider */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)', marginBottom: 24 }} />

//         {/* Bottom bar */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
//           <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>
//             © {new Date().getFullYear()} Indian Luxury House. All rights reserved.
//           </p>
//           <div style={{ display: 'flex', gap: 24 }}>
//             {['Privacy Policy', 'Terms of Use'].map(item => (
//               <a key={item} href="#" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
//               >{item}</a>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @media (max-width: 767px) {
//           .ilh-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
//         }
//         @media (min-width: 768px) and (max-width: 1023px) {
//           .ilh-footer-grid { grid-template-columns: 1fr 1fr !important; }
//         }
//       `}</style>
//     </footer>
//   );
// }

// ── BLOG CARD ────────────────────────────────────────────────────
function BlogCard({ post, big = false }: { post: Post; big?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/blog/${post.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', height: '100%', border: '1px solid rgba(0,0,0,0.06)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingBottom: big ? '56%' : '62%', overflow: 'hidden', background: '#1A1A1A' }}>
        {post.imageUrl && (
          <Image src={post.imageUrl} alt={post.title} fill
            style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
            sizes={big ? '60vw' : '33vw'}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        {/* Gradient overlay */}
        {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 55%)' }} />}
        {/* Category badge */}
        <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: big ? '24px 26px 26px' : '18px 20px 20px' }}>
        {/* Gold accent line */}
        <div style={{ width: hov ? 40 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s ease' }} />

        <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: big ? 22 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: big ? 2 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.title}
        </h3>

        <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
          <div>
            <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(107,101,88,0.5)', marginRight: 4 }}>By</span>
            <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
          </div>
          <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)', letterSpacing: '0.04em' }}>{post.publishedAt} · {post.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}

// ── CATEGORY CARD (Homepage Section 2) ──────────────────────────
function CategoryCard({ cat }: { cat: Cat }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/${cat.slug}`}
      style={{ display: 'block', textDecoration: 'none', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingBottom: '70%', background: '#1A1A1A', overflow: 'hidden' }}>
        <Image src={cat.heroImage} alt={cat.name} fill
          style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
          sizes="(max-width:768px) 100vw, 20vw"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.38)', transition: 'background .4s' }} />
        {/* Gold bottom bar on hover */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#C9A84C', transform: hov ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform .4s ease', transformOrigin: 'left' }} />

        {/* Content */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px 28px', textAlign: 'center' }}>
          <span style={{ fontSize: 32, marginBottom: 10, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))', transform: hov ? 'translateY(-6px)' : 'translateY(0)', transition: 'transform .35s' }}>{cat.icon}</span>
          <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 18, color: '#fff', letterSpacing: '0.03em', lineHeight: 1.2, textShadow: '0 2px 12px rgba(0,0,0,0.7)', transform: hov ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform .35s', margin: 0 }}>
            {cat.name}
          </h3>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', margin: '6px 0 0', fontWeight: 300, letterSpacing: '0.04em', opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity .35s, transform .35s' }}>
            {cat.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────
export default function HomePage() {
  const featured  = POSTS.find(p => p.featured) ?? POSTS[0];
  const secondary = POSTS.filter(p => p.id !== featured.id).slice(0, 2);
  const rest      = POSTS.filter(p => p.id !== featured.id).slice(0, 6);

  // Hero Slideshow
  const HERO_IMAGES = ['/images/heroimg-1.png', 
    '/images/heroimg-2.png'];
  const [heroIdx, setHeroIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = heroIdx;
      setPrevIdx(current);
      setFading(true);
      setTimeout(() => {
        setHeroIdx(i => (i + 1) % HERO_IMAGES.length);
        setFading(false);
        setPrevIdx(null);
      }, 1200);
    }, 30000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroIdx]);

  const goToSlide = (i: number) => {
    if (i === heroIdx) return;
    setPrevIdx(heroIdx);
    setFading(true);
    setTimeout(() => { setHeroIdx(i); setFading(false); setPrevIdx(null); }, 1200);
  };

  return (
    <>
      <Navbar />
      <main>

        {/* ══ SECTION 1: HERO ══════════════════════════════════ */}
        <section style={{ position: 'relative', height: '100vh', minHeight: 680, maxHeight: 960, background: '#0A0A0A', overflow: 'hidden' }}>

          {/* Fading out image */}
          {prevIdx !== null && (
            <Image src={HERO_IMAGES[prevIdx]} alt="ILH Hero" fill priority
              style={{ objectFit: 'cover', objectPosition: 'center top', opacity: fading ? 0 : 1, transition: 'opacity 1.2s ease-in-out', zIndex: 1 }}
              quality={95}
            />
          )}

          {/* Active image */}
          <Image key={heroIdx} src={HERO_IMAGES[heroIdx]} alt="ILH Hero" fill priority
            style={{ objectFit: 'cover', objectPosition: 'center top', opacity: fading ? 0 : 1, transition: 'opacity 1.2s ease-in-out', zIndex: 2 }}
            quality={95}
          />

          {/* Overlays */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 40%, transparent 70%)' }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(to right, rgba(10,10,10,0.25), transparent 60%)' }} />

          {/* Hero Text Content */}
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center', padding: '0 24px 120px' }}>

            {/* Tagline */}
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', marginBottom: 18, animation: 'hFadeUp .8s .1s ease both' }}>
              Where India Meets Global Luxury
            </p>

            {/* Main Headline */}
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 7vw, 88px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.08, marginBottom: 22, animation: 'hFadeUp .8s .2s ease both', letterSpacing: '0.015em' }}>
              Discover the Finest<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>in Indian Luxury</em>
            </h1>

            {/* Subheadline */}
            <p style={{ fontSize: 13, color: 'rgba(250,250,248,0.5)', fontWeight: 300, letterSpacing: '0.04em', marginBottom: 40, animation: 'hFadeUp .8s .3s ease both', maxWidth: 560 }}>
              Real estate, automobiles, jewellery, weddings, and curated luxury experiences — through an India-first lens.
            </p>

            {/* Two CTA buttons */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', animation: 'hFadeUp .8s .4s ease both' }}>
              <a href="#categories"
                style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '14px 32px', textDecoration: 'none', fontWeight: 600, transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
              >Explore Categories</a>

              <Link href="/partner-with-us"
                style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.5)', padding: '14px 32px', textDecoration: 'none', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
              >Partner With Us</Link>
            </div>
          </div>

          {/* Slide dots */}
          <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 10 }}>
            {HERO_IMAGES.map((_, i) => (
              <button key={i} onClick={() => goToSlide(i)} aria-label={`Slide ${i + 1}`}
                style={{ width: i === heroIdx ? 28 : 8, height: 8, borderRadius: 4, background: i === heroIdx ? '#C9A84C' : 'rgba(201,168,76,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.4s ease', outline: 'none' }}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.6))', zIndex: 10 }} />
        </section>

        <style>{`
          @keyframes hFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          @media(max-width:767px){
            .ilh-grid-5{grid-template-columns:1fr!important}
            .ilh-grid-3{grid-template-columns:1fr!important}
            .ilh-grid-4{grid-template-columns:repeat(2,1fr)!important}
            .ilh-grid-why{grid-template-columns:1fr!important}
            .ilh-footer-grid{grid-template-columns:1fr!important;gap:32px!important}
          }
          @media(min-width:768px) and (max-width:1023px){
            .ilh-grid-5{grid-template-columns:repeat(2,1fr)!important}
            .ilh-grid-3{grid-template-columns:repeat(2,1fr)!important}
            .ilh-grid-4{grid-template-columns:repeat(2,1fr)!important}
            .ilh-grid-why{grid-template-columns:repeat(2,1fr)!important}
            .ilh-footer-grid{grid-template-columns:1fr 1fr!important}
          }
        `}</style>

        {/* ══ SECTION 2: FEATURED CATEGORIES ══════════════════ */}
        <section id="categories" style={{ background: '#0A0A0A', padding: '80px 32px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 12 }}>Explore</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>Our Categories</h2>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '20px auto 0' }} />
            </div>

            {/* 5 Category cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }} className="ilh-grid-5">
              {CATS.map(cat => <CategoryCard key={cat.slug} cat={cat} />)}
            </div>
          </div>
        </section>

        {/* ══ SECTION 3: TRENDING STORIES ═════════════════════ */}
        <section style={{ background: '#FAFAF8', padding: '80px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, borderBottom: '1px solid rgba(201,168,76,0.15)', paddingBottom: 20 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Latest from the World of Luxury</p>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.01em' }}>Trending Stories</h2>
              </div>
              <Link href="/news" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2, flexShrink: 0 }}>
                All News →
              </Link>
            </div>

            {/* 3 featured posts top row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }} className="ilh-grid-3">
              <BlogCard post={featured} big />
              {secondary.map(p => <BlogCard key={p.id} post={p} />)}
            </div>

            {/* 3 more posts bottom row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="ilh-grid-3">
              {rest.slice(2, 5).map(p => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>

        {/* ══ SECTION 4: FEATURED BRANDS / PARTNERS ═══════════ */}
        <section style={{ background: '#0A0A0A', padding: '72px 32px', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 14 }}>Our Network</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 300, color: '#FAFAF8', marginBottom: 48, letterSpacing: '0.02em' }}>
              Trusted by India&apos;s Premium Businesses
            </h2>

            {/* Logo grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, border: '1px solid rgba(201,168,76,0.1)' }} className="ilh-grid-4">
              {PARTNERS.map((p, i) => (
                <div key={p.name}
                  style={{ padding: '32px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: i < 5 ? '1px solid rgba(201,168,76,0.08)' : 'none', transition: 'background .25s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Logo placeholder — apni real images dalna */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 48, height: 48, background: 'rgba(201,168,76,0.1)', borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 18, color: '#C9A84C' }}>◈</span>
                    </div>
                    <p style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', margin: 0 }}>{p.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/curated-partners"
              style={{ display: 'inline-block', marginTop: 40, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: 2, transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.6)')}
            >View All Partners →</Link>
          </div>
        </section>

        {/* ══ SECTION 5: WHY INDIAN LUXURY HOUSE ══════════════ */}
        <section style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Our Promise</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.01em' }}>
                Why Indian Luxury House
              </h2>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '20px auto 0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }} className="ilh-grid-why">
              {WHY_ILH.map((item, i) => (
                <div key={i}
                  style={{ padding: '40px 32px', background: '#fff', border: '1px solid rgba(201,168,76,0.1)', transition: 'all .3s', cursor: 'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#0A0A0A'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.1)'; }}
                >
                  <div style={{ fontSize: 28, color: '#C9A84C', marginBottom: 20, opacity: 0.8 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 400, color: 'inherit', marginBottom: 14, letterSpacing: '0.01em', lineHeight: 1.35 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(107,101,88,0.75)', lineHeight: 1.8, fontWeight: 300 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SECTION 6: CTA PARTNER ═══════════════════════════ */}
        <section style={{ background: '#0A0A0A', padding: '100px 32px', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative gold lines */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4 }} />

          {/* Peacock emerald accent circle */}
          <div style={{ position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,122,106,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: 18 }}>
              Grow With Us
            </p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 60px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.15, marginBottom: 22, letterSpacing: '0.01em' }}>
              Build Your Presence in<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>India&apos;s Luxury Market</em>
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.4)', fontWeight: 300, lineHeight: 1.8, marginBottom: 48, maxWidth: 560, margin: '0 auto 48px' }}>
              Reach India&apos;s most affluent audience through editorial stories, featured listings, and bespoke brand campaigns — crafted for luxury.
            </p>
            <Link href="/partner-with-us"
              style={{ display: 'inline-block', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 48px', textDecoration: 'none', fontWeight: 700, transition: 'all .3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
            >Partner With Us</Link>
          </div>
        </section>

      </main>

      {/* ══ SECTION 7: FOOTER ════════════════════════════════ */}
     
    </>
  );
}


// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// // ── TYPES ────────────────────────────────────────────────────────
// interface Post {
//   id: string; title: string; slug: string; category: string;
//   excerpt: string; imageUrl: string; author: string;
//   publishedAt: string; readTime: number; featured?: boolean;
// }
// interface Cat {
//   name: string; slug: string; emoji: string;
//   description: string; accentColor: string; heroImage: string;
// }

// // ── DATA ─────────────────────────────────────────────────────────
// const CATS: Cat[] = [
//   { name:'Cars',        slug:'cars',       emoji:'🚗', description:'The finest machines on four wheels',         accentColor:'#C9A84C', heroImage:'/images/hero-cars.jpg'     },
//   { name:'Yachts',      slug:'yachts',     emoji:'⛵', description:'Life on the open water',                     accentColor:'#5FA8D4', heroImage:'/images/hero-yachts.jpg'   },
//   { name:'Watches',     slug:'watches',    emoji:'⌚', description:'Mechanical artistry on your wrist',          accentColor:'#D4B483', heroImage:'/images/hero-watches.jpg'  },
//   { name:'Style',       slug:'style',      emoji:'👔', description:'Dressing the modern connoisseur',            accentColor:'#C4A8D4', heroImage:'/images/hero-style.jpg'    },
//   { name:'Home',        slug:'home',       emoji:'🏛️', description:'Architecture and interior excellence',       accentColor:'#8DC48D', heroImage:'/images/hero-home.jpg'     },
//   { name:'Food & Drink',slug:'food-drink', emoji:'🍾', description:'Gastronomy and the art of drinking',         accentColor:'#D48888', heroImage:'/images/hero-food.jpg'     },
//   { name:'Travel',      slug:'travel',     emoji:'✈️', description:"The world's most extraordinary destinations",accentColor:'#88B0D4', heroImage:'/images/hero-travel.jpg'   },
// ];

// // ── EXPERIENCE CATEGORIES ─────────────────────────────────────────
// const EXPERIENCES = [
//   { label:'Beach Hotels',       sub:'Concance Halaveli, Maldives',  img:'/images/exp-beach.jpg',     slug:'beach-hotels'       },
//   { label:'Honeymoon Hotspots', sub:'Iconic Santorini boutique',    img:'/images/exp-honeymoon.jpg', slug:'honeymoon-hotspots' },
//   { label:'Wild Safaris',       sub:'Mahali Mzuri',                 img:'/images/exp-safari.jpg',    slug:'wild-safaris'       },
//   { label:'Family-Friendly',    sub:'LUX* Grand Gaube',             img:'/images/exp-family.jpg',    slug:'family-friendly'    },
//   { label:'Wellness Retreats',  sub:'Chenot Palace Weggis',         img:'/images/exp-wellness.jpg',  slug:'wellness-retreats'  },
//   { label:'Gourmet Getaways',   sub:'Borgo Santo Pietro',           img:'/images/exp-gourmet.jpg',   slug:'gourmet-getaways'   },
// ];

// // ── LIMITED TIME DEALS ────────────────────────────────────────────
// const DEALS = [
//   { location:'Santa Monica, United States', hotel:'Regent Santa Monica Beach',       discount:'30% Off',               dates:'Mar 1, 2026 – May 31, 2026',    img:'/images/deal-santa-monica.jpg' },
//   { location:'Bangkok, Thailand',           hotel:'Park Hyatt Bangkok',               discount:'25% Off',               dates:'Dec 10, 2025 – May 31, 2026',   img:'/images/deal-bangkok.jpg'      },
//   { location:'Lugano, Switzerland',         hotel:'Villa Principe Leopoldo',          discount:'Visa Exclusive: 20% Off',dates:'Feb 2, 2026 – Dec 30, 2026',   img:'/images/deal-lugano.jpg'       },
//   { location:'London, United Kingdom',      hotel:'Great Scotland Yard Hotel London', discount:'25% Off',               dates:'Jan 29, 2026 – Jan 29, 2027',   img:'/images/deal-london.jpg'       },
// ];

// // ── POSTS ─────────────────────────────────────────────────────────
// const POSTS: Post[] = [
//   { id:'1', slug:'ferrari-laferrari-aperta-final-edition',    category:'Cars',         title:'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12', excerpt:'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.',      imageUrl:'/images/placeholder-car.jpg',    author:'Alessandro Greco', publishedAt:'Apr 10, 2026', readTime:8,  featured:true  },
//   { id:'2', slug:'patek-philippe-5711-value-2026',             category:'Watches',      title:'Patek Philippe 5711: Why It Still Commands Six Figures in 2026',           excerpt:"Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.",                                   imageUrl:'/images/placeholder-watch.jpg',  author:'M. Laurent',       publishedAt:'Apr 8, 2026',  readTime:6,  featured:true  },
//   { id:'3', slug:'benetti-107-mediterranean-week',             category:'Yachts',       title:'Aboard the Benetti 107: A Week in the Mediterranean',                       excerpt:'107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.',                                                imageUrl:'/images/placeholder-yacht.jpg',  author:'R. Voss',          publishedAt:'Apr 6, 2026',  readTime:10, featured:true  },
//   { id:'4', slug:'zuma-dubai-food-cocktail-guide',             category:'Food & Drink', title:'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide',                     excerpt:'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.',                                                       imageUrl:'/images/placeholder-food.jpg',   author:'S. Chen',          publishedAt:'Apr 4, 2026',  readTime:5,  featured:false },
//   { id:'5', slug:'maldives-vs-seychelles-2026',                category:'Travel',       title:'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026',  excerpt:'Two island paradises, two entirely different philosophies. Our editors have stayed at both.',                                                      imageUrl:'/images/placeholder-travel.jpg', author:'P. Black',         publishedAt:'Mar 30, 2026', readTime:7,  featured:false },
//   { id:'6', slug:'lamborghini-miura-1972-restored',            category:'Cars',         title:'Lamborghini Spent 3 Years Restoring This Gorgeous 1972 Miura to Its Original Spec', excerpt:"The most beautiful car ever built has been returned to factory glory. The restoration team reveals the painstaking process.",             imageUrl:'/images/placeholder-car.jpg',   author:'Bryan Hood',       publishedAt:'Apr 24, 2026', readTime:6,  featured:false },
//   { id:'7', slug:'french-riviera-villa-sale',                  category:'Home',         title:'A Storied French Riviera Villa by Artist Ferdinand Bac Can Be Yours for $13.5 Million', excerpt:"A rare opportunity to own a masterpiece of landscape architecture on the Cote d'Azur.",                                               imageUrl:'/images/placeholder-home.jpg',   author:'Abby Montanez',    publishedAt:'Apr 24, 2026', readTime:5,  featured:false },
//   { id:'8', slug:'tom-ford-vs-brunello-cucinelli-style-guide', category:'Style',        title:'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide',                excerpt:'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?',                                          imageUrl:'/images/placeholder-style.jpg',  author:'J. White',         publishedAt:'Mar 28, 2026', readTime:6,  featured:false },
// ];

// // ── SM LOGO SVG ──────────────────────────────────────────────────
// function SMLogo({ size = 36 }: { size?: number }) {
//   const g = '#C9A84C';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
//       <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={g} opacity="0.9"/>
//       <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={g} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <path d="M42 36C48 26 58 16 66 16C70 16 70 26 62 32C56 37 44 38 44 38" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
//       <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={g} transform="rotate(-30 30 46)" opacity="0.8"/>
//       <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={g} transform="rotate(-20 26 52)" opacity="0.7"/>
//       <ellipse cx="28" cy="40" rx="4.5" ry="2" fill={g} transform="rotate(-45 28 40)" opacity="0.7"/>
//       <circle cx="52" cy="12" r="1.5" fill={g}/>
//       <circle cx="56" cy="10" r="1.2" fill={g} opacity="0.8"/>
//     </svg>
//   );
// }

// // ── NAVBAR ───────────────────────────────────────────────────────
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);
//   return (
//     <>
//       <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background: scrolled ? '#1B4D45' : 'rgba(27,77,69,0.96)', backdropFilter:'blur(10px)', transition:'background 0.4s ease', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none' }}>
//         <div style={{ height:1, background:'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity:0.6 }} />
//         <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', height:72, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', flexShrink:0 }}>
//             <SMLogo size={40} />
//             <div style={{ lineHeight:1 }}>
//               <div style={{ fontFamily:'Georgia, serif', fontSize:22, fontWeight:300, color:'#DFC27A', letterSpacing:'0.25em' }}>INDIAN</div>
//               <div style={{ fontSize:9, color:'rgba(201,168,76,0.5)', letterSpacing:'0.35em', textTransform:'uppercase', marginTop:3 }}>Luxury House</div>
//             </div>
//           </Link>
//           <nav style={{ display:'flex', alignItems:'center', gap:2 }} className="sm-nav-desktop">
//             {CATS.map(c => (
//               <Link key={c.slug} href={`/category/${c.slug}`} style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.65)', textDecoration:'none', padding:'8px 14px', borderBottom:'1px solid transparent', transition:'color 0.2s, border-color 0.2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.color='#DFC27A'; e.currentTarget.style.borderBottomColor='#C9A84C'; }}
//                 onMouseLeave={e => { e.currentTarget.style.color='rgba(201,168,76,0.65)'; e.currentTarget.style.borderBottomColor='transparent'; }}
//               >{c.name}</Link>
//             ))}
//           </nav>
//           <button className="sm-nav-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background:'none', border:'none', color:'#C9A84C', cursor:'pointer', padding:8, display:'none' }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               {menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//             </svg>
//           </button>
//         </div>
//         <div style={{ background:'#163D37', overflow:'hidden', maxHeight: menuOpen ? 500 : 0, transition:'max-height 0.35s ease', borderTop:'1px solid rgba(201,168,76,0.1)' }}>
//           {CATS.map(c => (
//             <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMenuOpen(false)}
//               style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 28px', fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)', textDecoration:'none', borderBottom:'1px solid rgba(201,168,76,0.08)', transition:'background 0.2s' }}
//               onMouseEnter={e => (e.currentTarget.style.background='rgba(201,168,76,0.06)')}
//               onMouseLeave={e => (e.currentTarget.style.background='transparent')}
//             ><span style={{ fontSize:18 }}>{c.emoji}</span>{c.name}</Link>
//           ))}
//         </div>
//         <div style={{ height:1, background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
//       </header>
//       <style>{`
//         .sm-nav-desktop { display: flex !important; }
//         .sm-nav-mobile  { display: none  !important; }
//         @media (max-width: 1024px) { .sm-nav-desktop { display: none !important; } .sm-nav-mobile { display: flex !important; } }
//       `}</style>
//     </>
//   );
// }



// // ── BLOG CARD ────────────────────────────────────────────────────
// function BlogCard({ post, big = false }: { post: Post; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   const accent = CATS.find(c => c.name === post.category)?.accentColor ?? '#C9A84C';
//   const emoji  = CATS.find(c => c.name === post.category)?.emoji ?? '';
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display:'block', textDecoration:'none', background: hov ? '#F0EBE0' : '#FAF7F0', transition:'background .2s', height:'100%' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position:'relative', paddingBottom: big ? '56%' : '62%', overflow:'hidden', background:'#1B4D45' }}>
//         {post.imageUrl ? (
//           <Image src={post.imageUrl} alt={post.title} fill
//             style={{ objectFit:'cover', transition:'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//             sizes={big ? '60vw' : '33vw'}
//             onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
//           />
//         ) : (
//           <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:48, opacity:0.2 }}>{emoji}</div>
//         )}
//         {big && <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(28,28,26,0.75) 0%, transparent 55%)' }} />}
//         <span style={{ position:'absolute', top:14, left:14, fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#DFC27A', background:'rgba(27,77,69,0.9)', padding:'5px 10px' }}>
//           {post.category}
//         </span>
//       </div>
//       <div style={{ padding: big ? '24px 26px 26px' : '18px 20px 20px', borderBottom:'1px solid rgba(201,168,76,0.1)', borderLeft:'1px solid rgba(201,168,76,0.07)', borderRight:'1px solid rgba(201,168,76,0.07)' }}>
//         <div style={{ width: hov ? 40 : 24, height:1, background:accent, marginBottom:12, transition:'width .3s' }} />
//         <h3 style={{ fontFamily:'Georgia,serif', fontWeight:400, fontSize: big ? 24 : 18, lineHeight:1.35, color: hov ? '#1F5C52' : '#1C1C1A', marginBottom:10, transition:'color .3s', letterSpacing:'0.01em', display:'-webkit-box', WebkitLineClamp: big ? 2 : 3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
//           {post.title}
//         </h3>
//         <p style={{ fontSize:13, color:'#5a5650', lineHeight:1.7, marginBottom:14, fontWeight:300, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
//           {post.excerpt}
//         </p>
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//           <div>
//             <span style={{ fontSize:10, letterSpacing:'0.1em', color:'rgba(107,101,88,0.5)', marginRight:5 }}>By</span>
//             <span style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#C9A84C', fontWeight:500 }}>{post.author}</span>
//           </div>
//           <span style={{ fontSize:10, color:'rgba(107,101,88,0.5)' }}>{post.publishedAt} · {post.readTime} min</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── EXPERIENCE CARD ───────────────────────────────────────────────
// function ExperienceCard({ exp }: { exp: typeof EXPERIENCES[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/experiences/${exp.slug}`}
//       style={{ display:'block', textDecoration:'none', overflow:'hidden', cursor:'pointer' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position:'relative', paddingBottom:'66%', background:'#1B4D45', overflow:'hidden' }}>
//         <Image src={exp.img} alt={exp.label} fill
//           style={{ objectFit:'cover', transition:'transform .7s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
//           sizes="(max-width:768px) 50vw, 33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
//         />
//         <div style={{ position:'absolute', inset:0, background: hov ? 'rgba(0,0,0,0.42)' : 'rgba(0,0,0,0.28)', transition:'background .4s' }} />
//         <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end', padding:'20px 24px' }}>
//           <h3 style={{ fontFamily:'Georgia, serif', fontWeight:400, fontSize:'clamp(17px, 2vw, 24px)', color:'#fff', letterSpacing:'0.02em', lineHeight:1.2, margin:0, textShadow:'0 1px 10px rgba(0,0,0,0.6)', transform: hov ? 'translateY(-4px)' : 'translateY(0)', transition:'transform .35s' }}>
//             {exp.label}
//           </h3>
//           <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)', margin:'5px 0 0', letterSpacing:'0.05em', fontWeight:300 }}>{exp.sub}</p>
//           <div style={{ width: hov ? 40 : 0, height:2, background:'#C9A84C', marginTop:10, transition:'width .4s ease' }} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── DEAL CARD ─────────────────────────────────────────────────────
// function DealCard({ deal }: { deal: typeof DEALS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href="/experiences/deals"
//       style={{ display:'block', textDecoration:'none', background: hov ? '#F5F0E8' : '#fff', border:'1px solid rgba(201,168,76,0.12)', transition:'all .25s', overflow:'hidden' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position:'relative', paddingBottom:'65%', overflow:'hidden', background:'#1B4D45' }}>
//         <Image src={deal.img} alt={deal.hotel} fill
//           style={{ objectFit:'cover', transition:'transform .6s', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
//           sizes="25vw"
//           onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
//         />
//       </div>
//       <div style={{ padding:'16px 18px 20px' }}>
//         <p style={{ fontSize:11, color:'#6b6558', letterSpacing:'0.04em', marginBottom:4, fontWeight:300 }}>{deal.location}</p>
//         <h4 style={{ fontFamily:'Georgia,serif', fontSize:15, fontWeight:400, color:'#1C1C1A', marginBottom:12, lineHeight:1.3 }}>{deal.hotel}</h4>
//         <div style={{ display:'inline-block', background:'#C9A84C', color:'#1B4D45', fontSize:11, fontWeight:700, letterSpacing:'0.08em', padding:'4px 10px', marginBottom:8 }}>
//           {deal.discount}
//         </div>
//         <p style={{ fontSize:10, color:'rgba(90,86,80,0.6)', letterSpacing:'0.04em', margin:0 }}>{deal.dates}</p>
//       </div>
//     </Link>
//   );
// }

// // ── CATEGORY SECTION ─────────────────────────────────────────────
// function CategorySection({ cat, posts, idx }: { cat: Cat; posts: Post[]; idx: number }) {
//   if (posts.length === 0) return null;
//   return (
//     <section style={{ background: idx % 2 === 1 ? '#F0EBE0' : '#FAF7F0' }}>
//       <div style={{ position:'relative', height:220, overflow:'hidden', background:'#1B4D45' }}>
//         <Image src={cat.heroImage} alt={cat.name} fill
//           style={{ objectFit:'cover', objectPosition:'center' }}
//           onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
//         />
//         <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(28,28,26,0.88) 0%,rgba(28,28,26,0.4) 55%,transparent 100%)' }} />
//         <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(28,28,26,0.4) 0%,transparent 60%)' }} />
//         <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 40px 32px', maxWidth:600 }}>
//           <p style={{ fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', marginBottom:8 }}>Category</p>
//           <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:8 }}>
//             <span style={{ fontSize:36 }}>{cat.emoji}</span>
//             <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(32px,5vw,56px)', fontWeight:300, color:'#FAF7F0', lineHeight:1, letterSpacing:'0.02em' }}>{cat.name}</h2>
//           </div>
//           <p style={{ fontSize:13, color:'rgba(250,247,240,0.55)', fontWeight:300, letterSpacing:'0.02em' }}>{cat.description}</p>
//         </div>
//         <div style={{ position:'absolute', bottom:28, right:40, zIndex:10 }}>
//           <Link href={`/category/${cat.slug}`}
//             style={{ fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.45)', padding:'8px 18px', textDecoration:'none', transition:'all .2s' }}
//             onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#1B4D45'; }}
//             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
//           >All {cat.name} →</Link>
//         </div>
//       </div>
//       <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 32px' }}>
//         <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="sm-grid-3">
//           {posts.slice(0, 3).map(p => <BlogCard key={p.id} post={p} />)}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── HOME PAGE ─────────────────────────────────────────────────────
// export default function HomePage() {
//   const featured  = POSTS.find(p => p.featured) ?? POSTS[0];
//   const secondary = POSTS.filter(p => p.id !== featured.id).slice(0, 2);
//   const rest      = POSTS.filter(p => p.id !== featured.id);

//   // ── HERO SLIDESHOW STATE ──────────────────────────────────────
//   const HERO_IMAGES = [
//     '/images/hero-1.png',
//     '/images/hero-2.png',
//   ];
//   const [heroIdx, setHeroIdx] = useState(0);
//   const [prevIdx, setPrevIdx] = useState<number | null>(null);
//   const [fading, setFading] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const current = heroIdx;
//       setPrevIdx(current);
//       setFading(true);
//       setTimeout(() => {
//         setHeroIdx(i => (i + 1) % HERO_IMAGES.length);
//         setFading(false);
//         setPrevIdx(null);
//       }, 1200);
//     }, 30000);
//     return () => clearInterval(timer);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [heroIdx]);

//   const goToSlide = (i: number) => {
//     if (i === heroIdx) return;
//     setPrevIdx(heroIdx);
//     setFading(true);
//     setTimeout(() => {
//       setHeroIdx(i);
//       setFading(false);
//       setPrevIdx(null);
//     }, 1200);
//   };

//   return (
//     <>
//       <Navbar />
//       <main>

//         {/* ══ HERO ═════════════════════════════════════════════ */}
//         <section style={{ position:'relative', height:'100vh', minHeight:680, maxHeight:920, background:'#1B4D45', overflow:'hidden' }}>

//           {/* Previous image — fading out */}
//           {prevIdx !== null && (
//             <Image
//               src={HERO_IMAGES[prevIdx]}
//               alt="SM Luxury Hero"
//               fill
//               priority
//               style={{
//                 objectFit: 'cover',
//                 // objectPosition: 'center',
//                  objectPosition: 'center top',
//                 opacity: fading ? 0 : 1,
//                 transition: 'opacity 1.2s ease-in-out',
//                 zIndex: 1,
//               }}
//               quality={95}
//             />
//           )}

//           {/* Current image — fading in */}
//           <Image
//             key={heroIdx}
//             src={HERO_IMAGES[heroIdx]}
//             alt="SM Luxury Hero"
//             fill
//             priority
//             style={{
//               objectFit: 'cover',
//               // objectPosition: 'center',
//                objectPosition: 'center top',
//               opacity: fading ? 0 : 1,
//               transition: 'opacity 1.2s ease-in-out',
//               zIndex: 2,
//             }}
//             quality={95}
//           />

//           {/* Gradient overlays */}
//           <div style={{ position:'absolute', inset:0, zIndex:3, background:'linear-gradient(to top,rgba(28,28,26,0.82) 0%,rgba(28,28,26,0.12) 55%,transparent 100%)' }} />
//           <div style={{ position:'absolute', inset:0, zIndex:3, background:'linear-gradient(to right,rgba(28,28,26,0.18),transparent 60%)' }} />

//           {/* Hero content */}
//           {/* <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px 0' }}> */}
//             {/* <div style={{ marginBottom:24, animation:'hFadeUp .8s .1s ease both' }}><SMLogo size={72} /></div> */}
//             {/* <p style={{ fontSize:10, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,168,76,0.65)', marginBottom:20, animation:'hFadeUp .8s .2s ease both' }}>The Connoisseur&apos;s Journal</p>
//             <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(48px,9vw,110px)', fontWeight:300, color:'#FAF7F0', lineHeight:1.02, marginBottom:28, animation:'hFadeUp .8s .3s ease both', letterSpacing:'0.01em' }}>
//               Live Without<br /><em style={{ color:'#DFC27A' }}>Compromise</em>
//             </h1> */}
//             {/* <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:22, animation:'hFadeUp .8s .38s ease both' }}>
//               <div style={{ width:48, height:1, background:'rgba(201,168,76,0.4)' }} />
//               <SMLogo size={20} />
//               <div style={{ width:48, height:1, background:'rgba(201,168,76,0.4)' }} />
//             </div> */}
//             {/* <p style={{ fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(201,168,76,0.42)', marginBottom:40, animation:'hFadeUp .8s .44s ease both' }}>
//               Cars · Yachts · Watches · Style · Home · Food &amp; Drink · Travel
//             </p> */}
//             {/* <a href="#latest"
//               style={{ fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.45)', padding:'14px 36px', textDecoration:'none', transition:'all .3s', animation:'hFadeUp .8s .5s ease both', display:'inline-block' }}
//               onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#1B4D45'; }}
//               onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
//             >Explore Latest</a>
//           </div> */}
//           {/* Hero content */}
// <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', /* ← center se flex-end */ textAlign:'center', padding:'80px 24px 75px' /* ← bottom padding badha */ }}>
//   <a href="#latest"
//     style={{ fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.45)', padding:'14px 36px', textDecoration:'none', transition:'all .3s', display:'inline-block', marginBottom: 40 /* ← gap categories ke liye */ }}
//     onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#1B4D45'; }}
//     onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
//   >Explore Latest</a>
// </div>

//           {/* Dot indicators */}
//           <div style={{ position:'absolute', bottom:60, left:'50%', transform:'translateX(-50%)', display:'flex', gap:10, zIndex:10 }}>
//             {HERO_IMAGES.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => goToSlide(i)}
//                 aria-label={`Go to slide ${i + 1}`}
//                 style={{
//                   width: i === heroIdx ? 28 : 8,
//                   height: 8,
//                   borderRadius: 4,
//                   background: i === heroIdx ? '#C9A84C' : 'rgba(201,168,76,0.35)',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   transition: 'all 0.4s ease',
//                   outline: 'none',
//                 }}
//               />
//             ))}
//           </div>

//           {/* Scroll line */}
//           <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', width:1, height:56, background:'linear-gradient(to bottom,transparent,rgba(201,168,76,0.7))', zIndex:10 }} />
//         </section>

//         <style>{`
//           @keyframes hFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
//           @media(max-width:767px){
//             .sm-grid-3{grid-template-columns:1fr!important}
//             .sm-feat-grid{grid-template-columns:1fr!important}
//             .sm-all-grid{grid-template-columns:1fr!important}
//             .sm-exp-grid{grid-template-columns:1fr!important}
//             .sm-deal-grid{grid-template-columns:repeat(2,1fr)!important}
//           }
//           @media(min-width:768px) and (max-width:1023px){
//             .sm-grid-3{grid-template-columns:repeat(2,1fr)!important}
//             .sm-exp-grid{grid-template-columns:repeat(2,1fr)!important}
//             .sm-deal-grid{grid-template-columns:repeat(2,1fr)!important}
//           }
//         `}</style>

//         {/* ══ CATEGORY STRIP ══════════════════════════════════ */}
//         <div style={{ background:'#1B4D45', borderTop:'1px solid rgba(201,168,76,0.2)', borderBottom:'1px solid rgba(201,168,76,0.2)' }}>
//           <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(7,1fr)' }} className="sm-cat-strip">
//             {CATS.map((c, i) => (
//               <Link key={c.slug} href={`/category/${c.slug}`}
//                 style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'26px 10px', textDecoration:'none', borderRight: i < 6 ? '1px solid rgba(201,168,76,0.1)' : 'none', gap:8, transition:'background .25s' }}
//                 onMouseEnter={e => (e.currentTarget.style.background='rgba(201,168,76,0.08)')}
//                 onMouseLeave={e => (e.currentTarget.style.background='transparent')}
//               >
//                 <span style={{ fontSize:22 }}>{c.emoji}</span>
//                 <span style={{ fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', textAlign:'center', lineHeight:1.3 }}>{c.name}</span>
//               </Link>
//             ))}
//           </div>
//           <style>{`@media(max-width:767px){.sm-cat-strip{grid-template-columns:repeat(4,1fr)!important}}`}</style>
//         </div>

//         {/* ══ LATEST SELECTIONS ════════════════════════════════ */}
//         <section id="latest" style={{ maxWidth:1280, margin:'0 auto', padding:'72px 32px 60px' }}>
//           <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:40, borderBottom:'1px solid rgba(201,168,76,0.12)', paddingBottom:18 }}>
//             <div>
//               <p style={{ fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'#C9A84C', marginBottom:8 }}>Latest from the Journal</p>
//               <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(26px,4vw,46px)', fontWeight:300, color:'#1C1C1A', letterSpacing:'0.01em' }}>This Week&apos;s Selections</h2>
//             </div>
//             <Link href="/category/cars" style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', borderBottom:'1px solid rgba(201,168,76,0.3)', paddingBottom:2 }}>View All →</Link>
//           </div>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="sm-feat-grid">
//             <BlogCard post={featured} />
//             {secondary.map(p => <BlogCard key={p.id} post={p} />)}
//           </div>
//         </section>

//         {/* ══ PER-CATEGORY SECTIONS ═══════════════════════════ */}
//         {CATS.map((cat, idx) => {
//           const catPosts = rest.filter(p =>
//             p.category.toLowerCase().replace(' & ','-').replace(' ','-') === cat.slug ||
//             p.category === cat.name
//           );
//           return <CategorySection key={cat.slug} cat={cat} posts={catPosts} idx={idx} />;
//         })}

//         {/* ══ ALL RECENT ═════════════════════════════════════ */}
//         <section style={{ maxWidth:1280, margin:'0 auto', padding:'64px 32px 80px' }}>
//           <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:36, borderBottom:'1px solid rgba(201,168,76,0.12)', paddingBottom:18 }}>
//             <div>
//               <p style={{ fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'#C9A84C', marginBottom:8 }}>Recently Published</p>
//               <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(26px,4vw,46px)', fontWeight:300, color:'#1C1C1A' }}>From All Categories</h2>
//             </div>
//           </div>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="sm-all-grid">
//             {rest.map(p => <BlogCard key={p.id} post={p} />)}
//           </div>
//         </section>

//       </main>
//       {/* <Footer /> */}
//     </>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// // ── TYPES ────────────────────────────────────────────────────────
// interface Post {
//   id: string; title: string; slug: string; category: string;
//   excerpt: string; imageUrl: string; author: string;
//   publishedAt: string; readTime: number; featured?: boolean;
// }
// interface Cat {
//   name: string; slug: string; emoji: string;
//   description: string; accentColor: string; heroImage: string;
// }

// // ── DATA ─────────────────────────────────────────────────────────
// const CATS: Cat[] = [
//   { name:'Cars',        slug:'cars',       emoji:'🚗', description:'The finest machines on four wheels',         accentColor:'#C9A84C', heroImage:'/images/hero-cars.jpg'     },
//   { name:'Yachts',      slug:'yachts',     emoji:'⛵', description:'Life on the open water',                     accentColor:'#5FA8D4', heroImage:'/images/hero-yachts.jpg'   },
//   { name:'Watches',     slug:'watches',    emoji:'⌚', description:'Mechanical artistry on your wrist',          accentColor:'#D4B483', heroImage:'/images/hero-watches.jpg'  },
//   { name:'Style',       slug:'style',      emoji:'👔', description:'Dressing the modern connoisseur',            accentColor:'#C4A8D4', heroImage:'/images/hero-style.jpg'    },
//   { name:'Home',        slug:'home',       emoji:'🏛️', description:'Architecture and interior excellence',       accentColor:'#8DC48D', heroImage:'/images/hero-home.jpg'     },
//   { name:'Food & Drink',slug:'food-drink', emoji:'🍾', description:'Gastronomy and the art of drinking',         accentColor:'#D48888', heroImage:'/images/hero-food.jpg'     },
//   { name:'Travel',      slug:'travel',     emoji:'✈️', description:"The world's most extraordinary destinations",accentColor:'#88B0D4', heroImage:'/images/hero-travel.jpg'   },
// ];

// // ── EXPERIENCE CATEGORIES (Kiwi Collection-style 3×2 image grid) ─
// const EXPERIENCES = [
//   { label:'Beach Hotels',       sub:'Concance Halaveli, Maldives',  img:'/images/exp-beach.jpg',     slug:'beach-hotels'       },
//   { label:'Honeymoon Hotspots', sub:'Iconic Santorini boutique',    img:'/images/exp-honeymoon.jpg', slug:'honeymoon-hotspots' },
//   { label:'Wild Safaris',       sub:'Mahali Mzuri',                 img:'/images/exp-safari.jpg',    slug:'wild-safaris'       },
//   { label:'Family-Friendly',    sub:'LUX* Grand Gaube',             img:'/images/exp-family.jpg',    slug:'family-friendly'    },
//   { label:'Wellness Retreats',  sub:'Chenot Palace Weggis',         img:'/images/exp-wellness.jpg',  slug:'wellness-retreats'  },
//   { label:'Gourmet Getaways',   sub:'Borgo Santo Pietro',           img:'/images/exp-gourmet.jpg',   slug:'gourmet-getaways'   },
// ];

// // ── LIMITED TIME DEALS ────────────────────────────────────────────
// const DEALS = [
//   { location:'Santa Monica, United States', hotel:'Regent Santa Monica Beach',       discount:'30% Off',               dates:'Mar 1, 2026 – May 31, 2026',    img:'/images/deal-santa-monica.jpg' },
//   { location:'Bangkok, Thailand',           hotel:'Park Hyatt Bangkok',               discount:'25% Off',               dates:'Dec 10, 2025 – May 31, 2026',   img:'/images/deal-bangkok.jpg'      },
//   { location:'Lugano, Switzerland',         hotel:'Villa Principe Leopoldo',          discount:'Visa Exclusive: 20% Off',dates:'Feb 2, 2026 – Dec 30, 2026',   img:'/images/deal-lugano.jpg'       },
//   { location:'London, United Kingdom',      hotel:'Great Scotland Yard Hotel London', discount:'25% Off',               dates:'Jan 29, 2026 – Jan 29, 2027',   img:'/images/deal-london.jpg'       },
// ];

// // ── POSTS ─────────────────────────────────────────────────────────
// const POSTS: Post[] = [
//   { id:'1', slug:'ferrari-laferrari-aperta-final-edition',    category:'Cars',         title:'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12', excerpt:'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.',      imageUrl:'/images/placeholder-car.jpg',    author:'Alessandro Greco', publishedAt:'Apr 10, 2026', readTime:8,  featured:true  },
//   { id:'2', slug:'patek-philippe-5711-value-2026',             category:'Watches',      title:'Patek Philippe 5711: Why It Still Commands Six Figures in 2026',           excerpt:"Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.",                                   imageUrl:'/images/placeholder-watch.jpg',  author:'M. Laurent',       publishedAt:'Apr 8, 2026',  readTime:6,  featured:true  },
//   { id:'3', slug:'benetti-107-mediterranean-week',             category:'Yachts',       title:'Aboard the Benetti 107: A Week in the Mediterranean',                       excerpt:'107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.',                                                imageUrl:'/images/placeholder-yacht.jpg',  author:'R. Voss',          publishedAt:'Apr 6, 2026',  readTime:10, featured:true  },
//   { id:'4', slug:'zuma-dubai-food-cocktail-guide',             category:'Food & Drink', title:'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide',                     excerpt:'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.',                                                       imageUrl:'/images/placeholder-food.jpg',   author:'S. Chen',          publishedAt:'Apr 4, 2026',  readTime:5,  featured:false },
//   { id:'5', slug:'maldives-vs-seychelles-2026',                category:'Travel',       title:'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026',  excerpt:'Two island paradises, two entirely different philosophies. Our editors have stayed at both.',                                                      imageUrl:'/images/placeholder-travel.jpg', author:'P. Black',         publishedAt:'Mar 30, 2026', readTime:7,  featured:false },
//   { id:'6', slug:'lamborghini-miura-1972-restored',            category:'Cars',         title:'Lamborghini Spent 3 Years Restoring This Gorgeous 1972 Miura to Its Original Spec', excerpt:"The most beautiful car ever built has been returned to factory glory. The restoration team reveals the painstaking process.",             imageUrl:'/images/placeholder-car.jpg',   author:'Bryan Hood',       publishedAt:'Apr 24, 2026', readTime:6,  featured:false },
//   { id:'7', slug:'french-riviera-villa-sale',                  category:'Home',         title:'A Storied French Riviera Villa by Artist Ferdinand Bac Can Be Yours for $13.5 Million', excerpt:"A rare opportunity to own a masterpiece of landscape architecture on the Cote d'Azur.",                                               imageUrl:'/images/placeholder-home.jpg',   author:'Abby Montanez',    publishedAt:'Apr 24, 2026', readTime:5,  featured:false },
//   { id:'8', slug:'tom-ford-vs-brunello-cucinelli-style-guide', category:'Style',        title:'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide',                excerpt:'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?',                                          imageUrl:'/images/placeholder-style.jpg',  author:'J. White',         publishedAt:'Mar 28, 2026', readTime:6,  featured:false },
// ];

// // ── SM LOGO SVG ──────────────────────────────────────────────────
// function SMLogo({ size = 36 }: { size?: number }) {
//   const g = '#C9A84C';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
//       <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={g} opacity="0.9"/>
//       <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={g} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <path d="M42 36C48 26 58 16 66 16C70 16 70 26 62 32C56 37 44 38 44 38" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
//       <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={g} transform="rotate(-30 30 46)" opacity="0.8"/>
//       <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={g} transform="rotate(-20 26 52)" opacity="0.7"/>
//       <ellipse cx="28" cy="40" rx="4.5" ry="2" fill={g} transform="rotate(-45 28 40)" opacity="0.7"/>
//       <circle cx="52" cy="12" r="1.5" fill={g}/>
//       <circle cx="56" cy="10" r="1.2" fill={g} opacity="0.8"/>
//     </svg>
//   );
// }

// // ── NAVBAR ───────────────────────────────────────────────────────
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);
//   return (
//     <>
//       <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background: scrolled ? '#1B4D45' : 'rgba(27,77,69,0.96)', backdropFilter:'blur(10px)', transition:'background 0.4s ease', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none' }}>
//         <div style={{ height:1, background:'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity:0.6 }} />
//         <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', height:72, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', flexShrink:0 }}>
//             <SMLogo size={40} />
//             <div style={{ lineHeight:1 }}>
//               <div style={{ fontFamily:'Georgia, serif', fontSize:22, fontWeight:300, color:'#DFC27A', letterSpacing:'0.25em' }}>SM</div>
//               <div style={{ fontSize:9, color:'rgba(201,168,76,0.5)', letterSpacing:'0.35em', textTransform:'uppercase', marginTop:3 }}>Luxury</div>
//             </div>
//           </Link>
//           <nav style={{ display:'flex', alignItems:'center', gap:2 }} className="sm-nav-desktop">
//             {CATS.map(c => (
//               <Link key={c.slug} href={`/category/${c.slug}`} style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.65)', textDecoration:'none', padding:'8px 14px', borderBottom:'1px solid transparent', transition:'color 0.2s, border-color 0.2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.color='#DFC27A'; e.currentTarget.style.borderBottomColor='#C9A84C'; }}
//                 onMouseLeave={e => { e.currentTarget.style.color='rgba(201,168,76,0.65)'; e.currentTarget.style.borderBottomColor='transparent'; }}
//               >{c.name}</Link>
//             ))}
//           </nav>
//           <button className="sm-nav-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background:'none', border:'none', color:'#C9A84C', cursor:'pointer', padding:8, display:'none' }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               {menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//             </svg>
//           </button>
//         </div>
//         <div style={{ background:'#163D37', overflow:'hidden', maxHeight: menuOpen ? 500 : 0, transition:'max-height 0.35s ease', borderTop:'1px solid rgba(201,168,76,0.1)' }}>
//           {CATS.map(c => (
//             <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMenuOpen(false)}
//               style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 28px', fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)', textDecoration:'none', borderBottom:'1px solid rgba(201,168,76,0.08)', transition:'background 0.2s' }}
//               onMouseEnter={e => (e.currentTarget.style.background='rgba(201,168,76,0.06)')}
//               onMouseLeave={e => (e.currentTarget.style.background='transparent')}
//             ><span style={{ fontSize:18 }}>{c.emoji}</span>{c.name}</Link>
//           ))}
//         </div>
//         <div style={{ height:1, background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
//       </header>
//       <style>{`
//         .sm-nav-desktop { display: flex !important; }
//         .sm-nav-mobile  { display: none  !important; }
//         @media (max-width: 1024px) { .sm-nav-desktop { display: none !important; } .sm-nav-mobile { display: flex !important; } }
//       `}</style>
//     </>
//   );
// }

// // ── FOOTER ───────────────────────────────────────────────────────
// function Footer() {
//   return (
//     <footer style={{ background:'#1B4D45' }}>
//       <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }} />
//       <div style={{ maxWidth:1280, margin:'0 auto', padding:'60px 32px 36px' }}>
//         <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:48, marginBottom:48 }}>
//           <div>
//             <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:8, marginBottom:16 }}>
//               <SMLogo size={48} />
//               <span style={{ fontFamily:'Georgia,serif', fontSize:20, fontWeight:300, color:'#DFC27A', letterSpacing:'0.22em' }}>SM Luxury</span>
//             </div>
//             <p style={{ fontSize:12, lineHeight:1.8, color:'rgba(201,168,76,0.45)', fontWeight:300 }}>A curated journal for those who appreciate the finest things in life.</p>
//           </div>
//           <div>
//             <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>Categories</p>
//             {CATS.map(c => (
//               <Link key={c.slug} href={`/category/${c.slug}`}
//                 style={{ display:'block', fontSize:12, color:'rgba(201,168,76,0.55)', textDecoration:'none', marginBottom:10, transition:'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color='#DFC27A')}
//                 onMouseLeave={e => (e.currentTarget.style.color='rgba(201,168,76,0.55)')}
//               >{c.name}</Link>
//             ))}
//           </div>
//           <div>
//             <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>About</p>
//             {['About Us','Contact','Privacy Policy','Advertise'].map(l => (
//               <a key={l} href="#"
//                 style={{ display:'block', fontSize:12, color:'rgba(201,168,76,0.55)', textDecoration:'none', marginBottom:10, transition:'color .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.color='#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.color='rgba(201,168,76,0.55)')}
//               >{l}</a>
//             ))}
//           </div>
//           <div>
//             <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>Newsletter</p>
//             <p style={{ fontSize:12, color:'rgba(201,168,76,0.45)', marginBottom:16, lineHeight:1.7 }}>Curated stories, delivered every Thursday.</p>
//             <div style={{ display:'flex' }}>
//               <input type="email" placeholder="your@email.com" style={{ flex:1, background:'#163D37', border:'1px solid rgba(201,168,76,0.18)', color:'#DFC27A', fontSize:12, padding:'11px 14px', outline:'none', fontFamily:'inherit' }}/>
//               <button style={{ background:'#C9A84C', color:'#1B4D45', border:'none', padding:'11px 18px', cursor:'pointer', fontSize:16, fontWeight:700, transition:'background .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.background='#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.background='#C9A84C')}
//               >→</button>
//             </div>
//           </div>
//         </div>
//         <div style={{ borderTop:'1px solid rgba(201,168,76,0.1)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
//           <p style={{ fontSize:10, letterSpacing:'0.12em', color:'rgba(201,168,76,0.26)' }}>© 2026 SM Luxury. All rights reserved.</p>
//           <div style={{ display:'flex', gap:24 }}>
//             {['Instagram','Twitter','LinkedIn'].map(s => (
//               <a key={s} href="#" style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', textDecoration:'none', transition:'color .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.color='#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.color='rgba(201,168,76,0.32)')}
//               >{s}</a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ── BLOG CARD (Robb Report editorial style) ──────────────────────
// function BlogCard({ post, big = false }: { post: Post; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   const accent = CATS.find(c => c.name === post.category)?.accentColor ?? '#C9A84C';
//   const emoji  = CATS.find(c => c.name === post.category)?.emoji ?? '';
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display:'block', textDecoration:'none', background: hov ? '#F0EBE0' : '#FAF7F0', transition:'background .2s', height:'100%' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position:'relative', paddingBottom: big ? '56%' : '62%', overflow:'hidden', background:'#1B4D45' }}>
//         {post.imageUrl ? (
//           <Image src={post.imageUrl} alt={post.title} fill
//             style={{ objectFit:'cover', transition:'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//             sizes={big ? '60vw' : '33vw'}
//             onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
//           />
//         ) : (
//           <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:48, opacity:0.2 }}>{emoji}</div>
//         )}
//         {big && <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(28,28,26,0.75) 0%, transparent 55%)' }} />}
//         {/* Category label — Robb Report style */}
//         <span style={{ position:'absolute', top:14, left:14, fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#DFC27A', background:'rgba(27,77,69,0.9)', padding:'5px 10px' }}>
//           {post.category}
//         </span>
//       </div>
//       <div style={{ padding: big ? '24px 26px 26px' : '18px 20px 20px', borderBottom:'1px solid rgba(201,168,76,0.1)', borderLeft:'1px solid rgba(201,168,76,0.07)', borderRight:'1px solid rgba(201,168,76,0.07)' }}>
//         <div style={{ width: hov ? 40 : 24, height:1, background:accent, marginBottom:12, transition:'width .3s' }} />
//         <h3 style={{ fontFamily:'Georgia,serif', fontWeight:400, fontSize: big ? 24 : 18, lineHeight:1.35, color: hov ? '#1F5C52' : '#1C1C1A', marginBottom:10, transition:'color .3s', letterSpacing:'0.01em', display:'-webkit-box', WebkitLineClamp: big ? 2 : 3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
//           {post.title}
//         </h3>
//         <p style={{ fontSize:13, color:'#5a5650', lineHeight:1.7, marginBottom:14, fontWeight:300, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
//           {post.excerpt}
//         </p>
//         {/* Robb Report-style byline: "By AUTHOR  ·  Date · X min" */}
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//           <div>
//             <span style={{ fontSize:10, letterSpacing:'0.1em', color:'rgba(107,101,88,0.5)', marginRight:5 }}>By</span>
//             <span style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#C9A84C', fontWeight:500 }}>{post.author}</span>
//           </div>
//           <span style={{ fontSize:10, color:'rgba(107,101,88,0.5)' }}>{post.publishedAt} · {post.readTime} min</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── EXPERIENCE CARD (Kiwi Collection image-only card) ─────────────
// function ExperienceCard({ exp }: { exp: typeof EXPERIENCES[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/experiences/${exp.slug}`}
//       style={{ display:'block', textDecoration:'none', overflow:'hidden', cursor:'pointer' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position:'relative', paddingBottom:'66%', background:'#1B4D45', overflow:'hidden' }}>
//         <Image src={exp.img} alt={exp.label} fill
//           style={{ objectFit:'cover', transition:'transform .7s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
//           sizes="(max-width:768px) 50vw, 33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
//         />
//         {/* Dark gradient overlay — gets stronger on hover */}
//         <div style={{ position:'absolute', inset:0, background: hov ? 'rgba(0,0,0,0.42)' : 'rgba(0,0,0,0.28)', transition:'background .4s' }} />
//         {/* Label bottom-left — exactly like Kiwi Collection */}
//         <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end', padding:'20px 24px' }}>
//           <h3 style={{ fontFamily:'Georgia, serif', fontWeight:400, fontSize:'clamp(17px, 2vw, 24px)', color:'#fff', letterSpacing:'0.02em', lineHeight:1.2, margin:0, textShadow:'0 1px 10px rgba(0,0,0,0.6)', transform: hov ? 'translateY(-4px)' : 'translateY(0)', transition:'transform .35s' }}>
//             {exp.label}
//           </h3>
//           <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)', margin:'5px 0 0', letterSpacing:'0.05em', fontWeight:300 }}>{exp.sub}</p>
//           <div style={{ width: hov ? 40 : 0, height:2, background:'#C9A84C', marginTop:10, transition:'width .4s ease' }} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── DEAL CARD (Limited Time Offers) ──────────────────────────────
// function DealCard({ deal }: { deal: typeof DEALS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href="/experiences/deals"
//       style={{ display:'block', textDecoration:'none', background: hov ? '#F5F0E8' : '#fff', border:'1px solid rgba(201,168,76,0.12)', transition:'all .25s', overflow:'hidden' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={{ position:'relative', paddingBottom:'65%', overflow:'hidden', background:'#1B4D45' }}>
//         <Image src={deal.img} alt={deal.hotel} fill
//           style={{ objectFit:'cover', transition:'transform .6s', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
//           sizes="25vw"
//           onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
//         />
//       </div>
//       {/* Content */}
//       <div style={{ padding:'16px 18px 20px' }}>
//         <p style={{ fontSize:11, color:'#6b6558', letterSpacing:'0.04em', marginBottom:4, fontWeight:300 }}>{deal.location}</p>
//         <h4 style={{ fontFamily:'Georgia,serif', fontSize:15, fontWeight:400, color:'#1C1C1A', marginBottom:12, lineHeight:1.3 }}>{deal.hotel}</h4>
//         {/* Gold discount badge */}
//         <div style={{ display:'inline-block', background:'#C9A84C', color:'#1B4D45', fontSize:11, fontWeight:700, letterSpacing:'0.08em', padding:'4px 10px', marginBottom:8 }}>
//           {deal.discount}
//         </div>
//         <p style={{ fontSize:10, color:'rgba(90,86,80,0.6)', letterSpacing:'0.04em', margin:0 }}>{deal.dates}</p>
//       </div>
//     </Link>
//   );
// }

// // ── CATEGORY SECTION (hero banner + posts grid) ──────────────────
// function CategorySection({ cat, posts, idx }: { cat: Cat; posts: Post[]; idx: number }) {
//   if (posts.length === 0) return null;
//   return (
//     <section style={{ background: idx % 2 === 1 ? '#F0EBE0' : '#FAF7F0' }}>
//       <div style={{ position:'relative', height:220, overflow:'hidden', background:'#1B4D45' }}>
//         <Image src={cat.heroImage} alt={cat.name} fill
//           style={{ objectFit:'cover', objectPosition:'center' }}
//           onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
//         />
//         <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(28,28,26,0.88) 0%,rgba(28,28,26,0.4) 55%,transparent 100%)' }} />
//         <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(28,28,26,0.4) 0%,transparent 60%)' }} />
//         <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 40px 32px', maxWidth:600 }}>
//           <p style={{ fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', marginBottom:8 }}>Category</p>
//           <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:8 }}>
//             <span style={{ fontSize:36 }}>{cat.emoji}</span>
//             <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(32px,5vw,56px)', fontWeight:300, color:'#FAF7F0', lineHeight:1, letterSpacing:'0.02em' }}>{cat.name}</h2>
//           </div>
//           <p style={{ fontSize:13, color:'rgba(250,247,240,0.55)', fontWeight:300, letterSpacing:'0.02em' }}>{cat.description}</p>
//         </div>
//         <div style={{ position:'absolute', bottom:28, right:40, zIndex:10 }}>
//           <Link href={`/category/${cat.slug}`}
//             style={{ fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.45)', padding:'8px 18px', textDecoration:'none', transition:'all .2s' }}
//             onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#1B4D45'; }}
//             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
//           >All {cat.name} →</Link>
//         </div>
//       </div>
//       <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 32px' }}>
//         <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="sm-grid-3">
//           {posts.slice(0, 3).map(p => <BlogCard key={p.id} post={p} />)}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── HOME PAGE ─────────────────────────────────────────────────────
// export default function HomePage() {
//   const featured  = POSTS.find(p => p.featured) ?? POSTS[0];
//   const secondary = POSTS.filter(p => p.id !== featured.id).slice(0, 2);
//   const rest      = POSTS.filter(p => p.id !== featured.id);

//   return (
//     <>
//       <Navbar />
//       <main>
//         {/* ══ HERO ═════════════════════════════════════════════ */}
//         <section style={{ position:'relative', height:'100vh', minHeight:680, maxHeight:920, background:'#1B4D45', overflow:'hidden' }}>
//           {/*
//             Add hero image: public/images/hero-homepage.jpg then uncomment:
//             <Image src="/images/hero-homepage.jpg" alt="SM Luxury Hero" fill priority
//               style={{ objectFit:'cover', objectPosition:'center' }} quality={95} />
//           */}
//           <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#1B4D45 0%,#1F5C52 50%,#163D37 100%)' }}>
//             <div style={{ position:'absolute', inset:0, opacity:0.04, backgroundImage:'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize:'28px 28px' }} />
//           </div>
//           <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(28,28,26,0.85) 0%,rgba(28,28,26,0.15) 55%,transparent 100%)' }} />
//           <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(28,28,26,0.2),transparent 60%)' }} />
//           <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px 0' }}>
//             <div style={{ marginBottom:24, animation:'hFadeUp .8s .1s ease both' }}><SMLogo size={72} /></div>
//             <p style={{ fontSize:10, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,168,76,0.65)', marginBottom:20, animation:'hFadeUp .8s .2s ease both' }}>The Connoisseur&apos;s Journal</p>
//             <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(48px,9vw,110px)', fontWeight:300, color:'#FAF7F0', lineHeight:1.02, marginBottom:28, animation:'hFadeUp .8s .3s ease both', letterSpacing:'0.01em' }}>
//               Live Without<br /><em style={{ color:'#DFC27A' }}>Compromise</em>
//             </h1>
//             <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:22, animation:'hFadeUp .8s .38s ease both' }}>
//               <div style={{ width:48, height:1, background:'rgba(201,168,76,0.4)' }} />
//               <SMLogo size={20} />
//               <div style={{ width:48, height:1, background:'rgba(201,168,76,0.4)' }} />
//             </div>
//             <p style={{ fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(201,168,76,0.42)', marginBottom:40, animation:'hFadeUp .8s .44s ease both' }}>
//               Cars · Yachts · Watches · Style · Home · Food &amp; Drink · Travel
//             </p>
//             <a href="#latest"
//               style={{ fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.45)', padding:'14px 36px', textDecoration:'none', transition:'all .3s', animation:'hFadeUp .8s .5s ease both', display:'inline-block' }}
//               onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#1B4D45'; }}
//               onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
//             >Explore Latest</a>
//           </div>
//           <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', width:1, height:56, background:'linear-gradient(to bottom,transparent,rgba(201,168,76,0.7))' }} />
//         </section>

//         <style>{`
//           @keyframes hFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
//           @media(max-width:767px){
//             .sm-grid-3{grid-template-columns:1fr!important}
//             .sm-feat-grid{grid-template-columns:1fr!important}
//             .sm-all-grid{grid-template-columns:1fr!important}
//             .sm-exp-grid{grid-template-columns:1fr!important}
//             .sm-deal-grid{grid-template-columns:repeat(2,1fr)!important}
//           }
//           @media(min-width:768px) and (max-width:1023px){
//             .sm-grid-3{grid-template-columns:repeat(2,1fr)!important}
//             .sm-exp-grid{grid-template-columns:repeat(2,1fr)!important}
//             .sm-deal-grid{grid-template-columns:repeat(2,1fr)!important}
//           }
//         `}</style>

//         {/* ══ CATEGORY STRIP ══════════════════════════════════ */}
//         <div style={{ background:'#1B4D45', borderTop:'1px solid rgba(201,168,76,0.2)', borderBottom:'1px solid rgba(201,168,76,0.2)' }}>
//           <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(7,1fr)' }} className="sm-cat-strip">
//             {CATS.map((c, i) => (
//               <Link key={c.slug} href={`/category/${c.slug}`}
//                 style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'26px 10px', textDecoration:'none', borderRight: i < 6 ? '1px solid rgba(201,168,76,0.1)' : 'none', gap:8, transition:'background .25s' }}
//                 onMouseEnter={e => (e.currentTarget.style.background='rgba(201,168,76,0.08)')}
//                 onMouseLeave={e => (e.currentTarget.style.background='transparent')}
//               >
//                 <span style={{ fontSize:22 }}>{c.emoji}</span>
//                 <span style={{ fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', textAlign:'center', lineHeight:1.3 }}>{c.name}</span>
//               </Link>
//             ))}
//           </div>
//           <style>{`@media(max-width:767px){.sm-cat-strip{grid-template-columns:repeat(4,1fr)!important}}`}</style>
//         </div>

//         {/* ══ LATEST SELECTIONS ════════════════════════════════ */}
//         <section id="latest" style={{ maxWidth:1280, margin:'0 auto', padding:'72px 32px 60px' }}>
//           <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:40, borderBottom:'1px solid rgba(201,168,76,0.12)', paddingBottom:18 }}>
//             <div>
//               <p style={{ fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'#C9A84C', marginBottom:8 }}>Latest from the Journal</p>
//               <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(26px,4vw,46px)', fontWeight:300, color:'#1C1C1A', letterSpacing:'0.01em' }}>This Week&apos;s Selections</h2>
//             </div>
//             <Link href="/category/cars" style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', borderBottom:'1px solid rgba(201,168,76,0.3)', paddingBottom:2 }}>View All →</Link>
//           </div>
//           {/* Equal 3-column grid — Kiwi Collection style */}
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="sm-feat-grid">
//             <BlogCard post={featured} />
//             {secondary.map(p => <BlogCard key={p.id} post={p} />)}
//           </div>
//         </section>

//         {/* ══ EXPERIENCE IMAGE GRID (Kiwi Collection style) ═══ */}
//         {/* <section style={{ background:'#1B4D45', padding:'64px 0' }}>
//           <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
//             <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:32, borderBottom:'1px solid rgba(201,168,76,0.15)', paddingBottom:18 }}>
//               <div>
//                 <p style={{ fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)', marginBottom:8 }}>Curated Journeys</p>
//                 <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(26px,4vw,46px)', fontWeight:300, color:'#FAF7F0', letterSpacing:'0.01em', margin:0 }}>Browse Experiences</h2>
//               </div>
//               <Link href="/experiences"
//                 style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', border:'1px solid rgba(201,168,76,0.4)', padding:'10px 22px', whiteSpace:'nowrap', transition:'all .2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#1B4D45'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
//               >View All Experiences</Link>
//             </div>
//             {/* 3×2 image grid exactly like Kiwi Collection */}
//             {/* <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:3 }} className="sm-exp-grid">
//               {EXPERIENCES.map(exp => <ExperienceCard key={exp.slug} exp={exp} />)}
//             </div>
//           </div>
//         </section> */} 

//         {/* ══ LIMITED TIME OFFERS ════════════════════════════ */}
//         {/* <section style={{ background:'#FAF7F0', padding:'72px 0' }}>
//           <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
//             <div style={{ textAlign:'center', marginBottom:48 }}>
//               <p style={{ fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'#C9A84C', marginBottom:10 }}>Exclusive Savings</p>
//               <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(26px,4vw,46px)', fontWeight:300, color:'#1C1C1A', letterSpacing:'0.01em', margin:0 }}>Limited Time Offers</h2>
//               <div style={{ width:60, height:1, background:'#C9A84C', margin:'20px auto 0', opacity:0.5 }} />
//             </div>
//             {/* 4-col deal cards */}
//             {/* <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }} className="sm-deal-grid">
//               {DEALS.map((deal, i) => <DealCard key={i} deal={deal} />)}
//             </div>
//             <div style={{ textAlign:'center', marginTop:40 }}>
//               <Link href="/experiences/deals"
//                 style={{ display:'inline-block', fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'#1B4D45', background:'#C9A84C', padding:'16px 40px', textDecoration:'none', fontWeight:600, transition:'background .25s' }}
//                 onMouseEnter={e => { e.currentTarget.style.background='#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background='#C9A84C'; }}
//               >View All Limited Time Offers</Link>
//             </div>
//           </div>
//         </section>  */}

//         {/* ══ PER-CATEGORY SECTIONS ═══════════════════════════ */}
//         {CATS.map((cat, idx) => {
//           const catPosts = rest.filter(p =>
//             p.category.toLowerCase().replace(' & ','-').replace(' ','-') === cat.slug ||
//             p.category === cat.name
//           );
//           return <CategorySection key={cat.slug} cat={cat} posts={catPosts} idx={idx} />;
//         })}

//         {/* ══ ALL RECENT ═════════════════════════════════════ */}
//         <section style={{ maxWidth:1280, margin:'0 auto', padding:'64px 32px 80px' }}>
//           <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:36, borderBottom:'1px solid rgba(201,168,76,0.12)', paddingBottom:18 }}>
//             <div>
//               <p style={{ fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'#C9A84C', marginBottom:8 }}>Recently Published</p>
//               <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(26px,4vw,46px)', fontWeight:300, color:'#1C1C1A' }}>From All Categories</h2>
//             </div>
//           </div>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="sm-all-grid">
//             {rest.map(p => <BlogCard key={p.id} post={p} />)}
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }


// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// // ── TYPES ────────────────────────────────────────────────────────
// interface Post {
//   id: string; title: string; slug: string; category: string;
//   excerpt: string; imageUrl: string; author: string;
//   publishedAt: string; readTime: number; featured?: boolean;
// }
// interface Cat {
//   name: string; slug: string; emoji: string;
//   description: string; accentColor: string; heroImage: string;
// }

// // ── DATA ─────────────────────────────────────────────────────────
// const CATS: Cat[] = [
//   { name:'Cars',        slug:'cars',       emoji:'🚗', description:'The finest machines on four wheels',         accentColor:'#C9A84C', heroImage:'/images/hero-cars.jpg'     },
//   { name:'Yachts',      slug:'yachts',     emoji:'⛵', description:'Life on the open water',                     accentColor:'#5FA8D4', heroImage:'/images/hero-yachts.jpg'   },
//   { name:'Watches',     slug:'watches',    emoji:'⌚', description:'Mechanical artistry on your wrist',          accentColor:'#D4B483', heroImage:'/images/hero-watches.jpg'  },
//   { name:'Style',       slug:'style',      emoji:'👔', description:'Dressing the modern connoisseur',            accentColor:'#C4A8D4', heroImage:'/images/hero-style.jpg'    },
//   { name:'Home',        slug:'home',       emoji:'🏛️', description:'Architecture and interior excellence',       accentColor:'#8DC48D', heroImage:'/images/hero-home.jpg'     },
//   { name:'Food &  RESTAURANT',slug:'food-drink', emoji:'🍾', description:'Gastronomy and the art of drinking',         accentColor:'#D48888', heroImage:'/images/hero-food.jpg'     },
//   { name:'Travel',      slug:'travel',     emoji:'✈️', description:"The world's most extraordinary destinations",accentColor:'#88B0D4', heroImage:'/images/hero-travel.jpg'   },
// ];

// const POSTS: Post[] = [
//   { id:'1', slug:'ferrari-laferrari-aperta-final-edition',    category:'Cars',         title:'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12', excerpt:'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.',      imageUrl:'/images/placeholder-car.jpg',    author:'Alessandro Greco', publishedAt:'Apr 10, 2026', readTime:8,  featured:true  },
//   { id:'2', slug:'patek-philippe-5711-value-2026',             category:'Watches',      title:'Patek Philippe 5711: Why It Still Commands Six Figures in 2026',           excerpt:"Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.",                                   imageUrl:'/images/placeholder-watch.jpg',  author:'M. Laurent',       publishedAt:'Apr 8, 2026',  readTime:6,  featured:true  },
//   { id:'3', slug:'benetti-107-mediterranean-week',             category:'Yachts',       title:'Aboard the Benetti 107: A Week in the Mediterranean',                       excerpt:'107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.',                                                imageUrl:'/images/placeholder-yacht.jpg',  author:'R. Voss',          publishedAt:'Apr 6, 2026',  readTime:10, featured:true  },
//   { id:'4', slug:'zuma-dubai-food-cocktail-guide',             category:'Food & RESTAURANT', title:'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide',                     excerpt:'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.',                                                       imageUrl:'/images/placeholder-food.jpg',   author:'S. Chen',          publishedAt:'Apr 4, 2026',  readTime:5,  featured:false },
//   { id:'5', slug:'maldives-vs-seychelles-2026',                category:'Travel',       title:'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026',  excerpt:'Two island paradises, two entirely different philosophies. Our editors have stayed at both.',                                                      imageUrl:'/images/placeholder-travel.jpg', author:'P. Black',         publishedAt:'Mar 30, 2026', readTime:7,  featured:false },
//   { id:'6', slug:'tom-ford-vs-brunello-cucinelli-style-guide', category:'Style',        title:'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide',                excerpt:'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?',                                          imageUrl:'/images/placeholder-style.jpg',  author:'J. White',         publishedAt:'Mar 28, 2026', readTime:6,  featured:false },
// ];

// // ── SM LOGO SVG ──────────────────────────────────────────────────
// function SMLogo({ size = 36 }: { size?: number }) {
//   const g = '#C9A84C';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
//       <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={g} opacity="0.9"/>
//       <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={g} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <path d="M42 36C48 26 58 16 66 16C70 16 70 26 62 32C56 37 44 38 44 38" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
//       <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={g} transform="rotate(-30 30 46)" opacity="0.8"/>
//       <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={g} transform="rotate(-20 26 52)" opacity="0.7"/>
//       <ellipse cx="28" cy="40" rx="4.5" ry="2" fill={g} transform="rotate(-45 28 40)" opacity="0.7"/>
//       <circle cx="52" cy="12" r="1.5" fill={g}/>
//       <circle cx="56" cy="10" r="1.2" fill={g} opacity="0.8"/>
//     </svg>
//   );
// }

// // ── NAVBAR ───────────────────────────────────────────────────────
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <>
//       <header style={{
//         position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
//         background: scrolled ? '#1B4D45' : 'rgba(27,77,69,0.96)',
//         backdropFilter: 'blur(10px)',
//         transition: 'background 0.4s ease',
//         boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
//       }}>
//         {/* Top gold line */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.6 }} />

//         <div style={{
//           maxWidth: 1280, margin: '0 auto',
//           padding: '0 32px',
//           height: 72,
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         }}>

//           {/* ── Logo ── */}
//           <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
//             <SMLogo size={40} />
//             <div style={{ lineHeight: 1 }}>
//               <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.25em' }}>SM</div>
//               <div style={{ fontSize: 9, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.35em', textTransform: 'uppercase', marginTop: 3 }}>Luxury</div>
//             </div>
//           </Link>

//           {/* ── Desktop Nav Links ── */}
//           <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="sm-nav-desktop">
//             {CATS.map(c => (
//               <Link key={c.slug} href={`/category/${c.slug}`} style={{
//                 fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
//                 color: 'rgba(201,168,76,0.65)', textDecoration: 'none',
//                 padding: '8px 14px', borderBottom: '1px solid transparent',
//                 transition: 'color 0.2s, border-color 0.2s',
//               }}
//                 onMouseEnter={e => { e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderBottomColor = '#C9A84C'; }}
//                 onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
//               >{c.name}</Link>
//             ))}
//           </nav>

//           {/* ── Hamburger (mobile) ── */}
//           <button className="sm-nav-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{
//             background: 'none', border: 'none', color: '#C9A84C',
//             cursor: 'pointer', padding: 8, display: 'none',
//           }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               {menuOpen
//                 ? <path d="M18 6 6 18M6 6l12 12"/>
//                 : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
//               }
//             </svg>
//           </button>
//         </div>

//         {/* ── Mobile dropdown ── */}
//         <div style={{
//           background: '#163D37',
//           overflow: 'hidden',
//           maxHeight: menuOpen ? 500 : 0,
//           transition: 'max-height 0.35s ease',
//           borderTop: '1px solid rgba(201,168,76,0.1)',
//         }}>
//           {CATS.map(c => (
//             <Link key={c.slug} href={`/category/${c.slug}`}
//               onClick={() => setMenuOpen(false)}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 12,
//                 padding: '14px 28px',
//                 fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
//                 color: 'rgba(201,168,76,0.7)', textDecoration: 'none',
//                 borderBottom: '1px solid rgba(201,168,76,0.08)',
//                 transition: 'background 0.2s',
//               }}
//               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//               onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//             >
//               <span style={{ fontSize: 18 }}>{c.emoji}</span>
//               {c.name}
//             </Link>
//           ))}
//         </div>

//         {/* Bottom gold line */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
//       </header>

//       {/* Responsive CSS */}
//       <style>{`
//         .sm-nav-desktop { display: flex !important; }
//         .sm-nav-mobile  { display: none  !important; }
//         @media (max-width: 1024px) {
//           .sm-nav-desktop { display: none  !important; }
//           .sm-nav-mobile  { display: flex  !important; }
//         }
//       `}</style>
//     </>
//   );
// }

// // ── FOOTER ───────────────────────────────────────────────────────
// function Footer() {
//   return (
//     <footer style={{ background: '#1B4D45' }}>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }} />
//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px 36px' }}>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 48, marginBottom: 48 }}>

//           {/* Brand */}
//           <div>
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginBottom: 16 }}>
//               <SMLogo size={48} />
//               <span style={{ fontFamily: 'Georgia,serif', fontSize: 20, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.22em' }}>SM Luxury</span>
//             </div>
//             <p style={{ fontSize: 12, lineHeight: 1.8, color: 'rgba(201,168,76,0.45)', fontWeight: 300 }}>
//               A curated journal for those who appreciate the finest things in life.
//             </p>
//           </div>

//           {/* Categories */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 18, fontWeight: 500 }}>Categories</p>
//             {CATS.map(c => (
//               <Link key={c.slug} href={`/category/${c.slug}`}
//                 style={{ display: 'block', fontSize: 12, color: 'rgba(201,168,76,0.55)', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#DFC27A')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.55)')}
//               >{c.name}</Link>
//             ))}
//           </div>

//           {/* About */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 18, fontWeight: 500 }}>About</p>
//             {['About Us','Contact','Privacy Policy','Advertise'].map(l => (
//               <a key={l} href="#"
//                 style={{ display: 'block', fontSize: 12, color: 'rgba(201,168,76,0.55)', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.color = '#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.55)')}
//               >{l}</a>
//             ))}
//           </div>

//           {/* Newsletter */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 18, fontWeight: 500 }}>Newsletter</p>
//             <p style={{ fontSize: 12, color: 'rgba(201,168,76,0.45)', marginBottom: 16, lineHeight: 1.7 }}>Curated stories, delivered every Thursday.</p>
//             <div style={{ display: 'flex' }}>
//               <input type="email" placeholder="your@email.com" style={{
//                 flex: 1, background: '#163D37', border: '1px solid rgba(201,168,76,0.18)',
//                 color: '#DFC27A', fontSize: 12, padding: '11px 14px', outline: 'none', fontFamily: 'inherit',
//               }}/>
//               <button style={{ background: '#C9A84C', color: '#1B4D45', border: 'none', padding: '11px 18px', cursor: 'pointer', fontSize: 16, fontWeight: 700, transition: 'background .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.background = '#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.background = '#C9A84C')}
//               >→</button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
//           <p style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(201,168,76,0.26)' }}>© 2026 SM Luxury. All rights reserved.</p>
//           <div style={{ display: 'flex', gap: 24 }}>
//             {['Instagram','Twitter','LinkedIn'].map(s => (
//               <a key={s} href="#"
//                 style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.color = '#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.32)')}
//               >{s}</a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ── BLOG CARD ────────────────────────────────────────────────────
// function BlogCard({ post, big = false }: { post: Post; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   const accent = CATS.find(c => c.name === post.category)?.accentColor ?? '#C9A84C';
//   const emoji  = CATS.find(c => c.name === post.category)?.emoji ?? '';

//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F0EBE0' : '#FAF7F0', transition: 'background .2s', height: '100%' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', paddingBottom: big ? '56%' : '62%', overflow: 'hidden', background: '#1B4D45' }}>
//         {post.imageUrl ? (
//           <Image src={post.imageUrl} alt={post.title} fill
//             style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//             sizes={big ? '60vw' : '33vw'}
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />
//         ) : (
//           <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, opacity: 0.2 }}>{emoji}</div>
//         )}
//         {/* Gradient overlay */}
//         {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,28,26,0.75) 0%, transparent 55%)' }} />}
//         {/* Category badge */}
//         <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DFC27A', background: 'rgba(27,77,69,0.9)', padding: '5px 10px' }}>
//           {post.category}
//         </span>
//       </div>

//       {/* Body */}
//       <div style={{ padding: big ? '24px 26px 26px' : '18px 20px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)', borderLeft: '1px solid rgba(201,168,76,0.07)', borderRight: '1px solid rgba(201,168,76,0.07)' }}>
//         <div style={{ width: hov ? 40 : 24, height: 1, background: accent, marginBottom: 12, transition: 'width .3s' }} />
//         <h3 style={{
//           fontFamily: 'Georgia,serif', fontWeight: 400,
//           fontSize: big ? 24 : 18, lineHeight: 1.35,
//           color: hov ? '#1F5C52' : '#1C1C1A',
//           marginBottom: 10, transition: 'color .3s',
//           letterSpacing: '0.01em',
//           display: '-webkit-box', WebkitLineClamp: big ? 2 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
//         }}>{post.title}</h3>
//         <p style={{ fontSize: 13, color: '#5a5650', lineHeight: 1.7, marginBottom: 14, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//           {post.excerpt}
//         </p>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           <span style={{ fontSize: 10, color: 'rgba(107,101,88,0.6)' }}>{post.readTime} min read</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── CATEGORY SECTION (hero banner + posts grid) ──────────────────
// function CategorySection({ cat, posts, idx }: { cat: Cat; posts: Post[]; idx: number }) {
//   if (posts.length === 0) return null;
//   return (
//     <section style={{ background: idx % 2 === 1 ? '#F0EBE0' : '#FAF7F0' }}>
//       {/* Hero image banner */}
//       <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: '#1B4D45' }}>
//         <Image src={cat.heroImage} alt={cat.name} fill
//           style={{ objectFit: 'cover', objectPosition: 'center' }}
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(28,28,26,0.88) 0%,rgba(28,28,26,0.4) 55%,transparent 100%)' }} />
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,28,26,0.4) 0%,transparent 60%)' }} />

//         {/* Category title */}
//         <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 32px', maxWidth: 600 }}>
//           <p style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 8 }}>Category</p>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
//             <span style={{ fontSize: 36 }}>{cat.emoji}</span>
//             <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 300, color: '#FAF7F0', lineHeight: 1, letterSpacing: '0.02em' }}>{cat.name}</h2>
//           </div>
//           <p style={{ fontSize: 13, color: 'rgba(250,247,240,0.55)', fontWeight: 300, letterSpacing: '0.02em' }}>{cat.description}</p>
//         </div>

//         {/* View all button */}
//         <div style={{ position: 'absolute', bottom: 28, right: 40, zIndex: 10 }}>
//           <Link href={`/category/${cat.slug}`}
//             style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.45)', padding: '8px 18px', textDecoration: 'none', transition: 'all .2s' }}
//             onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1B4D45'; }}
//             onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
//           >All {cat.name} →</Link>
//         </div>
//       </div>

//       {/* Posts grid */}
//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(201,168,76,0.08)' }} className="sm-grid-3">
//           {posts.slice(0, 3).map(p => <BlogCard key={p.id} post={p} />)}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── HOME PAGE ─────────────────────────────────────────────────────
// export default function HomePage() {
//   const featured   = POSTS.find(p => p.featured) ?? POSTS[0];
//   const secondary  = POSTS.filter(p => p.id !== featured.id).slice(0, 2);
//   const rest       = POSTS.filter(p => p.id !== featured.id);

//   return (
//     <>
//       <Navbar />

//       <main>
//         {/* ══ HERO ═══════════════════════════════════════════════
//             Put your hero image at: public/images/hero-homepage.jpg
//             Then uncomment the <Image> tag below and remove the
//             placeholder <div>.
//         ═══════════════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', height: '100vh', minHeight: 680, maxHeight: 920, background: '#1B4D45', overflow: 'hidden' }}>

//           {/* ▼▼▼ UNCOMMENT when you add public/images/hero-homepage.jpg ▼▼▼
//           <Image
//             src="/images/hero-homepage.jpg"
//             alt="SM Luxury Hero"
//             fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             quality={95}
//           />
//           ▲▲▲ */}

//           {/* Placeholder gradient (delete after adding real image) */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1B4D45 0%,#1F5C52 50%,#163D37 100%)' }}>
//             <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px' }} />
//           </div>

//           {/* Dark overlays — keep even with real image */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,28,26,0.85) 0%,rgba(28,28,26,0.15) 55%,transparent 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(28,28,26,0.2),transparent 60%)' }} />

//           {/* Hero content */}
//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 0' }}>
//             <div style={{ marginBottom: 24, animation: 'hFadeUp .8s .1s ease both' }}>
//               <SMLogo size={72} />
//             </div>
//             <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', marginBottom: 20, animation: 'hFadeUp .8s .2s ease both' }}>
//               The Connoisseur&apos;s Journal
//             </p>
//             <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(48px,9vw,110px)', fontWeight: 300, color: '#FAF7F0', lineHeight: 1.02, marginBottom: 28, animation: 'hFadeUp .8s .3s ease both', letterSpacing: '0.01em' }}>
//               Live Without<br /><em style={{ color: '#DFC27A' }}>Compromise</em>
//             </h1>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 22, animation: 'hFadeUp .8s .38s ease both' }}>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
//               <SMLogo size={20} />
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
//             </div>
//             <p style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.42)', marginBottom: 40, animation: 'hFadeUp .8s .44s ease both' }}>
//               Cars · Yachts · Watches · Style · Home · Food &amp; Drink · Travel
//             </p>
//             <a href="#latest"
//               style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.45)', padding: '14px 36px', textDecoration: 'none', transition: 'all .3s', animation: 'hFadeUp .8s .5s ease both', display: 'inline-block' }}
//               onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1B4D45'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
//             >Explore Latest</a>
//           </div>

//           {/* Scroll indicator */}
//           <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', width: 1, height: 56, background: 'linear-gradient(to bottom,transparent,rgba(201,168,76,0.7))' }} />
//         </section>

//         <style>{`
//           @keyframes hFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
//           @media(max-width:767px){ .sm-grid-3{grid-template-columns:1fr!important} .sm-feat-grid{grid-template-columns:1fr!important} .sm-all-grid{grid-template-columns:1fr!important} }
//           @media(min-width:768px) and (max-width:1023px){ .sm-grid-3{grid-template-columns:repeat(2,1fr)!important} }
//         `}</style>

//         {/* ══ CATEGORY STRIP ═══════════════════════════════════════ */}
//         <div style={{ background: '#1B4D45', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }} className="sm-cat-strip">
//             {CATS.map((c, i) => (
//               <Link key={c.slug} href={`/category/${c.slug}`}
//                 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '26px 10px', textDecoration: 'none', borderRight: i < 6 ? '1px solid rgba(201,168,76,0.1)' : 'none', gap: 8, transition: 'background .25s' }}
//                 onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
//                 onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//               >
//                 <span style={{ fontSize: 22 }}>{c.emoji}</span>
//                 <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', textAlign: 'center', lineHeight: 1.3 }}>{c.name}</span>
//               </Link>
//             ))}
//           </div>
//           <style>{`@media(max-width:767px){.sm-cat-strip{grid-template-columns:repeat(4,1fr)!important}}`}</style>
//         </div>

//         {/* ══ LATEST SELECTIONS ════════════════════════════════════ */}
//         <section id="latest" style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 32px 60px' }}>
//           <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 18 }}>
//             <div>
//               <p style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8 }}>Latest from the Journal</p>
//               <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,4vw,46px)', fontWeight: 300, color: '#1C1C1A', letterSpacing: '0.01em' }}>This Week&apos;s Selections</h2>
//             </div>
//             <Link href="/category/cars" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: 2 }}>
//               View All →
//             </Link>
//           </div>

//           {/* Featured 2/3 + 1/3 */}
//           <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 1, background: 'rgba(201,168,76,0.07)' }} className="sm-feat-grid">
//             <BlogCard post={featured} big />
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//               {secondary.map(p => <BlogCard key={p.id} post={p} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ PER-CATEGORY SECTIONS (with hero banner) ════════════ */}
//         {CATS.map((cat, idx) => {
//           const catPosts = rest.filter(p =>
//             p.category.toLowerCase().replace(' & ','-').replace(' ','-') === cat.slug ||
//             p.category === cat.name
//           );
//           return <CategorySection key={cat.slug} cat={cat} posts={catPosts} idx={idx} />;
//         })}

//         {/* ══ ALL RECENT ══════════════════════════════════════════ */}
//         <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 80px' }}>
//           <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 18 }}>
//             <div>
//               <p style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8 }}>Recently Published</p>
//               <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,4vw,46px)', fontWeight: 300, color: '#1C1C1A' }}>From All Categories</h2>
//             </div>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(201,168,76,0.07)' }} className="sm-all-grid">
//             {rest.map(p => <BlogCard key={p.id} post={p} />)}
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }



// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';

// // ── TYPES ─────────────────────────────────────────
// interface Post {
//   id: string;
//   title: string;
//   slug: string;
//   category: string;
//   excerpt: string;
//   imageUrl: string;
//   author: string;
//   publishedAt: string;
//   readTime: number;
//   featured?: boolean;
// }

// interface Category {
//   name: string;
//   slug: string;
//   emoji: string;
//   description: string;
//   accentColor: string;
//   heroImage: string;   // e.g. /images/hero-cars.jpg  (place in /public/images/)
// }

// // ── MOCK DATA ──────────────────────────────────────
// const MOCK_POSTS: Post[] = [
//   { id: '1', title: 'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12', slug: 'ferrari-laferrari-aperta-final-edition', category: 'Cars', excerpt: 'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.', imageUrl: '/images/placeholder-car.jpg', author: 'Alessandro Greco', publishedAt: '2026-04-10', readTime: 8, featured: true },
//   { id: '2', title: 'Patek Philippe 5711: Why It Still Commands Six Figures in 2026', slug: 'patek-philippe-5711-value-2026', category: 'Watches', excerpt: "Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.", imageUrl: '/images/placeholder-watch.jpg', author: 'M. Laurent', publishedAt: '2026-04-08', readTime: 6, featured: true },
//   { id: '3', title: 'Aboard the Benetti 107: A Week in the Mediterranean', slug: 'benetti-107-mediterranean-week', category: 'Yachts', excerpt: '107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.', imageUrl: '/images/placeholder-yacht.jpg', author: 'R. Voss', publishedAt: '2026-04-06', readTime: 10, featured: true },
//   { id: '4', title: 'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide', slug: 'zuma-dubai-food-cocktail-guide', category: 'Food & Drink', excerpt: 'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.', imageUrl: '/images/placeholder-food.jpg', author: 'S. Chen', publishedAt: '2026-04-04', readTime: 5, featured: false },
//   { id: '5', title: 'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026', slug: 'maldives-vs-seychelles-2026', category: 'Travel', excerpt: 'Two island paradises, two entirely different philosophies. Our editors have stayed at both.', imageUrl: '/images/placeholder-travel.jpg', author: 'P. Black', publishedAt: '2026-03-30', readTime: 7, featured: false },
//   { id: '6', title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide', slug: 'tom-ford-vs-brunello-cucinelli-style-guide', category: 'Style', excerpt: 'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?', imageUrl: '/images/placeholder-style.jpg', author: 'J. White', publishedAt: '2026-03-28', readTime: 6, featured: false },
// ];

// const CATEGORIES: Category[] = [
//   { name: 'Cars',        slug: 'cars',       emoji: '🚗', description: 'The finest machines on four wheels',          accentColor: '#C9A84C', heroImage: '/images/hero-cars.jpg' },
//   { name: 'Yachts',      slug: 'yachts',     emoji: '⛵', description: 'Life on the open water',                      accentColor: '#5FA8D4', heroImage: '/images/hero-yachts.jpg' },
//   { name: 'Watches',     slug: 'watches',    emoji: '⌚', description: 'Mechanical artistry on your wrist',            accentColor: '#D4B483', heroImage: '/images/hero-watches.jpg' },
//   { name: 'Style',       slug: 'style',      emoji: '👔', description: 'Dressing the modern connoisseur',              accentColor: '#C4A8D4', heroImage: '/images/hero-style.jpg' },
//   { name: 'Home',        slug: 'home',       emoji: '🏛️', description: 'Architecture and interior excellence',         accentColor: '#8DC48D', heroImage: '/images/hero-home.jpg' },
//   { name: 'Food & Drink',slug: 'food-drink', emoji: '🍾', description: 'Gastronomy and the art of drinking',           accentColor: '#D48888', heroImage: '/images/hero-food.jpg' },
//   { name: 'Travel',      slug: 'travel',     emoji: '✈️', description: "The world's most extraordinary destinations",  accentColor: '#88B0D4', heroImage: '/images/hero-travel.jpg' },
// ];

// // ── SM LOGO ────────────────────────────────────────
// function SMLogoComponent({
//   variant = 'gold',
//   size = 'md',
//   showText = true,
// }: {
//   variant?: 'gold' | 'white' | 'dark';
//   size?: 'sm' | 'md' | 'lg';
//   showText?: boolean;
// }) {
//   const color = variant === 'gold' ? '#C9A84C' : variant === 'white' ? '#FAF7F0' : '#1C1C1A';
//   const dim = size === 'sm' ? 24 : size === 'lg' ? 56 : 36;
//   return (
//     <div className="flex items-center gap-2">
//       <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none">
//         <polygon points="28,4 52,52 4,52" stroke={color} strokeWidth="2" fill="none" />
//         <text x="28" y="38" textAnchor="middle" fontSize="18" fontFamily="serif" fill={color} fontWeight="300">SM</text>
//       </svg>
//       {showText && (
//         <span style={{ color, fontSize: size === 'sm' ? 11 : size === 'lg' ? 16 : 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'serif' }}>
//           SM Luxury
//         </span>
//       )}
//     </div>
//   );
// }

// // ── CATEGORY STRIP ─────────────────────────────────
// function CategoryStrip() {
//   return (
//     <div className="bg-[#1C1C1A] border-b border-[#C9A84C]/15 overflow-x-auto">
//       <div className="flex items-center gap-0 max-w-screen-xl mx-auto">
//         {CATEGORIES.map((cat) => (
//           <Link
//             key={cat.slug}
//             href={`/category/${cat.slug}`}
//             className="flex items-center gap-2 px-6 py-4 text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all whitespace-nowrap border-r border-[#C9A84C]/10"
//           >
//             <span className="text-base">{cat.emoji}</span>
//             {cat.name}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── BLOG CARD ──────────────────────────────────────
// function BlogCard({ post, variant = 'default' }: { post: Post; variant?: 'featured' | 'default' }) {
//   const isFeatured = variant === 'featured';
//   return (
//     <Link href={`/blog/${post.slug}`} className="group block bg-[#FAF7F0] overflow-hidden h-full">
//       <div className={`relative overflow-hidden ${isFeatured ? 'h-64' : 'h-48'} bg-[#E8E0D0]`}>
//         {post.imageUrl ? (
//           <Image
//             src={post.imageUrl}
//             alt={post.title}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform duration-700"
//           />
//         ) : (
//           <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D45] to-[#163D37] flex items-center justify-center">
//             <SMLogoComponent variant="gold" size="md" showText={false} />
//           </div>
//         )}
//         <div className="absolute top-3 left-3">
//           <span className="text-[9px] tracking-[0.2em] uppercase bg-[#1C1C1A]/70 text-[#C9A84C] px-2 py-1 backdrop-blur-sm">
//             {post.category}
//           </span>
//         </div>
//       </div>
//       <div className="p-5">
//         <h3 className={`font-display font-light text-[#1C1C1A] leading-snug mb-2 group-hover:text-[#1F5C52] transition-colors ${isFeatured ? 'text-xl' : 'text-lg'}`}>
//           {post.title}
//         </h3>
//         <p className="text-xs text-[#6B6B67] leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
//         <div className="flex items-center justify-between">
//           <span className="text-[10px] tracking-[0.1em] uppercase text-[#C9A84C]/70">{post.author}</span>
//           <span className="text-[10px] text-[#6B6B67]">{post.readTime} min read</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── CATEGORY SECTION (hero image banner + posts) ───
// function CategorySection({ cat, posts, idx }: { cat: Category; posts: Post[]; idx: number }) {
//   if (posts.length === 0) return null;
//   return (
//     <section className={idx % 2 === 1 ? 'bg-[#F0EBE0]' : 'bg-[#FAF7F0]'}>
//       {/* ── Full-width category hero image ── */}
//       <div className="relative h-48 md:h-64 overflow-hidden">
//         <Image
//           src={cat.heroImage}
//           alt={cat.name}
//           fill
//           className="object-cover object-center"
//         />
//         {/* Gradient overlay — left-heavy so text stays readable */}
//         <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1A]/85 via-[#1C1C1A]/40 to-transparent" />

//         {/* Category label + title */}
//         <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-12 pb-8">
//           <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-1">Category</p>
//           <div className="flex items-center gap-3 mb-1">
//             <span className="text-3xl">{cat.emoji}</span>
//             <h2 className="font-display text-4xl md:text-5xl font-light text-[#FAF7F0] leading-none">
//               {cat.name}
//             </h2>
//           </div>
//           <p className="text-sm text-[#FAF7F0]/50 font-light tracking-wide">{cat.description}</p>
//         </div>

//         {/* "View All" button — bottom right */}
//         <div className="absolute bottom-6 right-8 z-10">
//           <Link
//             href={`/category/${cat.slug}`}
//             className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] border border-[#C9A84C]/40 px-4 py-2 hover:bg-[#C9A84C] hover:text-[#1B4D45] transition-all duration-200"
//           >
//             All {cat.name} →
//           </Link>
//         </div>
//       </div>

//       {/* ── Posts grid ── */}
//       <div className="max-w-screen-xl mx-auto px-6 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#C9A84C]/10">
//           {posts.slice(0, 3).map((p) => (
//             <BlogCard key={p.id} post={p} variant="default" />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── HEADER ─────────────────────────────────────────
// function Header() {
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#1C1C1A]/80 backdrop-blur-md border-b border-[#C9A84C]/10">
//       <Link href="/"><SMLogoComponent variant="gold" size="sm" showText /></Link>
//       <nav className="hidden md:flex items-center gap-8">
//         {CATEGORIES.slice(0, 5).map((cat) => (
//           <Link
//             key={cat.slug}
//             href={`/category/${cat.slug}`}
//             className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors"
//           >
//             {cat.name}
//           </Link>
//         ))}
//       </nav>
//     </header>
//   );
// }

// // ── FOOTER ─────────────────────────────────────────
// function Footer() {
//   return (
//     <footer className="bg-[#1C1C1A] border-t border-[#C9A84C]/15 py-12 px-8">
//       <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
//         <SMLogoComponent variant="gold" size="sm" showText />
//         <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/40">
//           © {new Date().getFullYear()} SM Luxury. All rights reserved.
//         </p>
//         <div className="flex items-center gap-6">
//           {CATEGORIES.slice(0, 4).map((cat) => (
//             <Link
//               key={cat.slug}
//               href={`/category/${cat.slug}`}
//               className="text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/40 hover:text-[#C9A84C]/70 transition-colors"
//             >
//               {cat.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ── MAIN PAGE ──────────────────────────────────────
// export default function HomePage() {
//   const featuredPost = MOCK_POSTS.find((p) => p.featured) ?? MOCK_POSTS[0];
//   const secondaryPosts = MOCK_POSTS.filter((p) => p.id !== featuredPost.id).slice(0, 2);
//   const gridPosts = MOCK_POSTS.filter((p) => p.id !== featuredPost.id);

//   return (
//     <>
//       <Header />
//       <main>

//         {/* ══════════════════════════════════════════
//             HERO — full-screen video background
//             Put your video at:  public/videos/hero.mp4
//             (also add hero.webm as fallback)
//         ══════════════════════════════════════════ */}
//         <section className="relative h-screen min-h-[680px] max-h-[900px] overflow-hidden bg-[#1B4D45]">

//           {/* Video background */}
//           <video
//             className="absolute inset-0 w-full h-full object-cover"
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="auto"
//           >
//             <source src="/videos/hero.mp4" type="video/mp4" />
//             <source src="/videos/hero.webm" type="video/webm" />
//           </video>

//           {/* Dark overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/85 via-[#1C1C1A]/30 to-[#1C1C1A]/20" />

//           {/* Hero content */}
//           <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
//             <div className="mb-6">
//               <SMLogoComponent variant="gold" size="lg" showText={false} />
//             </div>
//             <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]/70 mb-5">
//               The Connoisseur&apos;s Journal
//             </p>
//             <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-[#FAF7F0] leading-none mb-6">
//               Live Without<br />
//               <em className="text-[#DFC27A] italic">Compromise</em>
//             </h1>
//             <div className="flex items-center gap-4 mb-6">
//               <div className="w-12 h-px bg-[#C9A84C]/50" />
//               <SMLogoComponent variant="gold" size="sm" showText={false} />
//               <div className="w-12 h-px bg-[#C9A84C]/50" />
//             </div>
//             <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]/50 mb-10">
//               Cars · Yachts · Watches · Style · Home · Food & Drink · Travel
//             </p>
//             <Link
//               href="#latest"
//               className="border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-[#C9A84C] hover:text-[#1B4D45] transition-all duration-300 font-medium"
//             >
//               Explore Latest
//             </Link>
//           </div>

//           {/* Scroll indicator */}
//           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
//             <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#C9A84C] animate-pulse" />
//           </div>
//         </section>

//         {/* ── CATEGORY STRIP ── */}
//         <CategoryStrip />

//         {/* ── LATEST SELECTIONS ── */}
//         <section id="latest" className="max-w-screen-xl mx-auto px-6 py-20">
//           <div className="flex items-end justify-between mb-12 border-b border-[#C9A84C]/15 pb-5">
//             <div>
//               <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Latest from the Journal</p>
//               <h2 className="font-display text-4xl md:text-5xl font-light text-[#1C1C1A]">This Week&apos;s Selections</h2>
//             </div>
//             <Link href="/category/cars" className="hidden md:block text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1F5C52] transition-colors border-b border-[#C9A84C]/30 pb-0.5">
//               View All →
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-1">
//             <div className="lg:col-span-2">
//               <BlogCard post={featuredPost} variant="featured" />
//             </div>
//             <div className="flex flex-col gap-1">
//               {secondaryPosts.map((p) => (
//                 <BlogCard key={p.id} post={p} variant="featured" />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════════
//             PER-CATEGORY SECTIONS
//             Each shows a full-width hero image banner
//             then the posts grid below it.

//             Add images to: public/images/
//               hero-cars.jpg
//               hero-yachts.jpg
//               hero-watches.jpg
//               hero-style.jpg
//               hero-home.jpg
//               hero-food.jpg
//               hero-travel.jpg
//         ══════════════════════════════════════════ */}
//         {CATEGORIES.map((cat, idx) => {
//           const catPosts = gridPosts.filter((p) =>
//             p.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])
//           );
//           return (
//             <CategorySection key={cat.slug} cat={cat} posts={catPosts} idx={idx} />
//           );
//         })}

//         {/* ── ALL RECENT ── */}
//         <section className="max-w-screen-xl mx-auto px-6 py-20">
//           <div className="flex items-end justify-between mb-10 border-b border-[#C9A84C]/15 pb-5">
//             <div>
//               <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Recently Published</p>
//               <h2 className="font-display text-4xl font-light text-[#1C1C1A]">From All Categories</h2>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#C9A84C]/10">
//             {gridPosts.map((p) => (
//               <BlogCard key={p.id} post={p} variant="default" />
//             ))}
//           </div>
//         </section>

//       </main>
//       <Footer />
//     </>
//   );
// } 


// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';

// // ── TYPES ─────────────────────────────────────────
// interface Post {
//   id: string;
//   title: string;
//   slug: string;
//   category: string;
//   excerpt: string;
//   imageUrl: string;
//   author: string;
//   publishedAt: string;
//   readTime: number;
//   featured?: boolean;
// }

// interface Category {
//   name: string;
//   slug: string;
//   emoji: string;
//   description: string;
//   accentColor: string;
//   heroImage: string;
// }

// // ── MOCK DATA ──────────────────────────────────────
// const MOCK_POSTS: Post[] = [
//   { id: '1', title: 'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12', slug: 'ferrari-laferrari-aperta-final-edition', category: 'Cars', excerpt: 'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.', imageUrl: '/images/placeholder-car.jpg', author: 'Alessandro Greco', publishedAt: '2026-04-10', readTime: 8, featured: true },
//   { id: '2', title: 'Patek Philippe 5711: Why It Still Commands Six Figures in 2026', slug: 'patek-philippe-5711-value-2026', category: 'Watches', excerpt: "Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.", imageUrl: '/images/placeholder-watch.jpg', author: 'M. Laurent', publishedAt: '2026-04-08', readTime: 6, featured: true },
//   { id: '3', title: 'Aboard the Benetti 107: A Week in the Mediterranean', slug: 'benetti-107-mediterranean-week', category: 'Yachts', excerpt: '107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.', imageUrl: '/images/placeholder-yacht.jpg', author: 'R. Voss', publishedAt: '2026-04-06', readTime: 10, featured: true },
//   { id: '4', title: 'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide', slug: 'zuma-dubai-food-cocktail-guide', category: 'Food & Drink', excerpt: 'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.', imageUrl: '/images/placeholder-food.jpg', author: 'S. Chen', publishedAt: '2026-04-04', readTime: 5, featured: false },
//   { id: '5', title: 'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026', slug: 'maldives-vs-seychelles-2026', category: 'Travel', excerpt: 'Two island paradises, two entirely different philosophies. Our editors have stayed at both.', imageUrl: '/images/placeholder-travel.jpg', author: 'P. Black', publishedAt: '2026-03-30', readTime: 7, featured: false },
//   { id: '6', title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide', slug: 'tom-ford-vs-brunello-cucinelli-style-guide', category: 'Style', excerpt: 'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?', imageUrl: '/images/placeholder-style.jpg', author: 'J. White', publishedAt: '2026-03-28', readTime: 6, featured: false },
// ];

// const CATEGORIES: Category[] = [
//   { name: 'Cars',        slug: 'cars',       emoji: '🚗', description: 'The finest machines on four wheels',          accentColor: '#C9A84C', heroImage: '/images/hero-cars.jpg' },
//   { name: 'Yachts',      slug: 'yachts',     emoji: '⛵', description: 'Life on the open water',                      accentColor: '#5FA8D4', heroImage: '/images/hero-yachts.jpg' },
//   { name: 'Watches',     slug: 'watches',    emoji: '⌚', description: 'Mechanical artistry on your wrist',            accentColor: '#D4B483', heroImage: '/images/hero-watches.jpg' },
//   { name: 'Style',       slug: 'style',      emoji: '👔', description: 'Dressing the modern connoisseur',              accentColor: '#C4A8D4', heroImage: '/images/hero-style.jpg' },
//   { name: 'Home',        slug: 'home',       emoji: '🏛️', description: 'Architecture and interior excellence',         accentColor: '#8DC48D', heroImage: '/images/hero-home.jpg' },
//   { name: 'Food & Drink',slug: 'food-drink', emoji: '🍾', description: 'Gastronomy and the art of drinking',           accentColor: '#D48888', heroImage: '/images/hero-food.jpg' },
//   { name: 'Travel',      slug: 'travel',     emoji: '✈️', description: "The world's most extraordinary destinations",  accentColor: '#88B0D4', heroImage: '/images/hero-travel.jpg' },
// ];

// // ── SM LOGO ────────────────────────────────────────
// function SMLogoComponent({ variant = 'gold', size = 'md', showText = true }: { variant?: 'gold' | 'white' | 'dark'; size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
//   const color = variant === 'gold' ? '#C9A84C' : variant === 'white' ? '#FAF7F0' : '#1C1C1A';
//   const dim = size === 'sm' ? 24 : size === 'lg' ? 56 : 36;
//   return (
//     <div className="flex items-center gap-2">
//       <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none">
//         <polygon points="28,4 52,52 4,52" stroke={color} strokeWidth="2" fill="none" />
//         <text x="28" y="38" textAnchor="middle" fontSize="18" fontFamily="serif" fill={color} fontWeight="300">SM</text>
//       </svg>
//       {showText && (
//         <span style={{ color, fontSize: size === 'sm' ? 11 : size === 'lg' ? 16 : 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'serif' }}>
//           SM Luxury
//         </span>
//       )}
//     </div>
//   );
// }

// // ── CATEGORY STRIP ─────────────────────────────────
// function CategoryStrip() {
//   return (
//     <div className="bg-[#1C1C1A] border-b border-[#C9A84C]/15 overflow-x-auto">
//       <div className="flex items-center gap-0 max-w-screen-xl mx-auto">
//         {CATEGORIES.map((cat) => (
//           <Link key={cat.slug} href={`/category/${cat.slug}`}
//             className="flex items-center gap-2 px-6 py-4 text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all whitespace-nowrap border-r border-[#C9A84C]/10">
//             <span className="text-base">{cat.emoji}</span>
//             {cat.name}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── BLOG CARD ──────────────────────────────────────
// function BlogCard({ post, variant = 'default' }: { post: Post; variant?: 'featured' | 'default' }) {
//   const isFeatured = variant === 'featured';
//   return (
//     <Link href={`/blog/${post.slug}`} className="group block bg-[#FAF7F0] overflow-hidden h-full">
//       <div className={`relative overflow-hidden ${isFeatured ? 'h-64' : 'h-48'} bg-[#E8E0D0]`}>
//         {post.imageUrl ? (
//           <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
//         ) : (
//           <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D45] to-[#163D37] flex items-center justify-center">
//             <SMLogoComponent variant="gold" size="md" showText={false} />
//           </div>
//         )}
//         <div className="absolute top-3 left-3">
//           <span className="text-[9px] tracking-[0.2em] uppercase bg-[#1C1C1A]/70 text-[#C9A84C] px-2 py-1 backdrop-blur-sm">{post.category}</span>
//         </div>
//       </div>
//       <div className="p-5">
//         <h3 className={`font-display font-light text-[#1C1C1A] leading-snug mb-2 group-hover:text-[#1F5C52] transition-colors ${isFeatured ? 'text-xl' : 'text-lg'}`}>
//           {post.title}
//         </h3>
//         <p className="text-xs text-[#6B6B67] leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
//         <div className="flex items-center justify-between">
//           <span className="text-[10px] tracking-[0.1em] uppercase text-[#C9A84C]/70">{post.author}</span>
//           <span className="text-[10px] text-[#6B6B67]">{post.readTime} min read</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── HEADER ─────────────────────────────────────────
// function Header() {
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#1C1C1A]/80 backdrop-blur-md border-b border-[#C9A84C]/10">
//       <Link href="/"><SMLogoComponent variant="gold" size="sm" showText /></Link>
//       <nav className="hidden md:flex items-center gap-8">
//         {CATEGORIES.slice(0, 5).map((cat) => (
//           <Link key={cat.slug} href={`/category/${cat.slug}`}
//             className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors">
//             {cat.name}
//           </Link>
//         ))}
//       </nav>
//     </header>
//   );
// }

// // ── FOOTER ─────────────────────────────────────────
// function Footer() {
//   return (
//     <footer className="bg-[#1C1C1A] border-t border-[#C9A84C]/15 py-12 px-8">
//       <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
//         <SMLogoComponent variant="gold" size="sm" showText />
//         <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/40">
//           © {new Date().getFullYear()} SM Luxury. All rights reserved.
//         </p>
//         <div className="flex items-center gap-6">
//           {CATEGORIES.slice(0, 4).map((cat) => (
//             <Link key={cat.slug} href={`/category/${cat.slug}`}
//               className="text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/40 hover:text-[#C9A84C]/70 transition-colors">
//               {cat.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ── MAIN PAGE ──────────────────────────────────────
// export default function HomePage() {
//   const featuredPost = MOCK_POSTS.find((p) => p.featured) ?? MOCK_POSTS[0];
//   const secondaryPosts = MOCK_POSTS.filter((p) => p.id !== featuredPost.id).slice(0, 2);
//   const gridPosts = MOCK_POSTS.filter((p) => p.id !== featuredPost.id);

//   return (
//     <>
//       <Header />
//       <main>
//         {/* ── HERO ── */}
//         <section className="relative h-screen min-h-[680px] max-h-[900px] bg-[#1B4D45] overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D45] via-[#1F5C52] to-[#163D37]">
//             <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '28px 28px' }} />
//           </div>
//           <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/80 via-[#1C1C1A]/20 to-transparent" />
//           <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
//             <div className="mb-6"><SMLogoComponent variant="gold" size="lg" showText={false} /></div>
//             <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]/70 mb-5">The Connoisseur&apos;s Journal</p>
//             <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-[#FAF7F0] leading-none mb-6">
//               Live Without<br /><em className="text-[#DFC27A] italic">Compromise</em>
//             </h1>
//             <div className="flex items-center gap-4 mb-6">
//               <div className="w-12 h-px bg-[#C9A84C]/50" />
//               <SMLogoComponent variant="gold" size="sm" showText={false} />
//               <div className="w-12 h-px bg-[#C9A84C]/50" />
//             </div>
//             <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]/50 mb-10">
//               Cars · Yachts · Watches · Style · Home · Food & Drink · Travel
//             </p>
//             <Link href="#latest" className="border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-[#C9A84C] hover:text-[#1B4D45] transition-all duration-300 font-medium">
//               Explore Latest
//             </Link>
//           </div>
//           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
//             <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#C9A84C] animate-pulse" />
//           </div>
//         </section>

//         {/* ── CATEGORY STRIP ── */}
//         <CategoryStrip />

//         {/* ── LATEST ── */}
//         <section id="latest" className="max-w-screen-xl mx-auto px-6 py-20">
//           <div className="flex items-end justify-between mb-12 border-b border-[#C9A84C]/15 pb-5">
//             <div>
//               <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Latest from the Journal</p>
//               <h2 className="font-display text-4xl md:text-5xl font-light text-[#1C1C1A]">This Week&apos;s Selections</h2>
//             </div>
//             <Link href="/category/cars" className="hidden md:block text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1F5C52] transition-colors border-b border-[#C9A84C]/30 pb-0.5">
//               View All →
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-1">
//             <div className="lg:col-span-2"><BlogCard post={featuredPost} variant="featured" /></div>
//             <div className="flex flex-col gap-1">
//               {secondaryPosts.map((p) => <BlogCard key={p.id} post={p} variant="featured" />)}
//             </div>
//           </div>
//         </section>

//         {/* ── PER-CATEGORY SECTIONS ── */}
//         {CATEGORIES.slice(0, 4).map((cat, idx) => {
//           const catPosts = gridPosts.filter((p) =>
//             p.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])
//           );
//           if (catPosts.length === 0) return null;
//           return (
//             <section key={cat.slug} className={`py-16 ${idx % 2 === 1 ? 'bg-[#F0EBE0]' : 'bg-[#FAF7F0]'}`}>
//               <div className="max-w-screen-xl mx-auto px-6">
//                 <div className="flex items-end justify-between mb-8 border-b border-[#C9A84C]/15 pb-5">
//                   <div className="flex items-center gap-4">
//                     <span className="text-3xl">{cat.emoji}</span>
//                     <div>
//                       <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/60 mb-1">Category</p>
//                       <h2 className="font-display text-3xl font-light text-[#1C1C1A]">{cat.name}</h2>
//                     </div>
//                   </div>
//                   <Link href={`/category/${cat.slug}`} className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#1F5C52] transition-colors border-b border-[#C9A84C]/30 pb-0.5">
//                     All {cat.name} →
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#C9A84C]/10">
//                   {catPosts.slice(0, 3).map((p) => <BlogCard key={p.id} post={p} variant="default" />)}
//                 </div>
//               </div>
//             </section>
//           );
//         })}

//         {/* ── ALL RECENT ── */}
//         <section className="max-w-screen-xl mx-auto px-6 py-20">
//           <div className="flex items-end justify-between mb-10 border-b border-[#C9A84C]/15 pb-5">
//             <div>
//               <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Recently Published</p>
//               <h2 className="font-display text-4xl font-light text-[#1C1C1A]">From All Categories</h2>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#C9A84C]/10">
//             {gridPosts.map((p) => <BlogCard key={p.id} post={p} variant="default" />)}
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }