'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ── NAV LINKS ──────────────────────────────────────────────────
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

// ── DESIGNERS ──────────────────────────────────────────────────
const DESIGNERS = [
  { name: 'Sabyasachi Mukherjee', specialty: 'Bridal Couture',         city: 'Kolkata',   img: '/images/Sabyasachi Mukherjee.jpg',    slug: 'sabyasachi-mukherjee'   },
  { name: 'Manish Malhotra',      specialty: 'Contemporary Bridal',    city: 'Mumbai',    img: '/images/Manish Malhotra.jpg',        slug: 'manish-malhotra'        },
  { name: 'Tarun Tahiliani',      specialty: 'Luxury Indian Couture',  city: 'Delhi',     img: '/images/Tarun Tahiliani.jpg',         slug: 'tarun-tahiliani'        },
  { name: 'Abu Jani Sandeep Khosla', specialty: 'Heritage Bridal',     city: 'Mumbai',    img: '/images/Abu Jani Sandeep Khosla.jpg',   slug: 'abu-jani-sandeep-khosla'},
];

// ── WEDDING PLANNERS ───────────────────────────────────────────
const PLANNERS = [
  { name: 'Shaadi Squad',        specialty: 'Destination & Luxury Weddings', city: 'Mumbai',    img: '/images/Shaadi Squad.jpg',  slug: 'shaadi-squad'    },
  { name: 'WeddingSutra',        specialty: 'Pan-India Luxury Events',       city: 'Mumbai',    img: '/images/WeddingSutra.jpg', slug: 'weddingsutra'    },
  { name: 'Morvi Images',        specialty: 'Rajasthan Heritage Weddings',   city: 'Jaipur',    img: '/images/Morvi Images.jpg',        slug: 'morvi-images'    },
  { name: 'Weddings by Neeraj Kamra', specialty: 'Royal Palace Weddings',   city: 'Delhi',     img: '/images/eddings by Neeraj Kamra.jpg',       slug: 'neeraj-kamra'    },
];

// ── VENUES ─────────────────────────────────────────────────────
const VENUES = [
  { name: 'Umaid Bhawan Palace',     location: 'Jodhpur, Rajasthan',   capacity: '2000+', img: '/images/Umaid Bhawan Palace.jpg',     slug: 'umaid-bhawan-palace'   },
  { name: 'Taj Lake Palace',         location: 'Udaipur, Rajasthan',   capacity: '500',   img: '/images/Taj Lake Palace.jpg',  slug: 'taj-lake-palace'       },
  { name: 'The Leela Palace',        location: 'New Delhi',            capacity: '1500',  img: '/images/The Leela Palace.jpg',     slug: 'leela-palace-delhi'    },
  // { name: 'Falaknuma Palace',        location: 'Hyderabad',            capacity: '800',   img: '/images/venue-falaknuma.jpg', slug: 'falaknuma-palace'      },
  // { name: 'Samode Palace',           location: 'Jaipur, Rajasthan',    capacity: '600',   img: '/images/venue-samode.jpg',    slug: 'samode-palace'         },
  // { name: 'The Oberoi Udaivilas',    location: 'Udaipur, Rajasthan',   capacity: '400',   img: '/images/venue-udaivilas.jpg', slug: 'oberoi-udaivilas'      },
];

// ── BEAUTY EXPERTS ─────────────────────────────────────────────
const BEAUTY = [
  { name: 'Mickey Contractor',   specialty: 'Bridal Makeup Artistry',   city: 'Mumbai',  img: '/images/beauty-mickey.jpg',   slug: 'mickey-contractor'  },
  { name: 'Namrata Soni',        specialty: 'Celebrity Bridal Makeup',   city: 'Delhi',   img: '/images/beauty-namrata.jpg',  slug: 'namrata-soni'       },
  { name: 'Elton Fernandez',     specialty: 'Hair & Makeup Direction',   city: 'Mumbai',  img: '/images/beauty-elton.jpg',    slug: 'elton-fernandez'    },
  { name: 'Ambika Pillai',       specialty: 'Luxury Bridal Styling',     city: 'Delhi',   img: '/images/beauty-ambika.jpg',   slug: 'ambika-pillai'      },
];

// ── EDITORIAL POSTS ────────────────────────────────────────────
const EDITORIAL = [
  {
    slug: 'destination-wedding-trends-2026',
    category: 'Destination Weddings',
    title: 'Destination Wedding Trends Redefining India\'s Luxury Wedding Season',
    excerpt: 'From Rajasthan\'s heritage forts to Maldivian islands, India\'s elite are choosing destinations as extraordinary as their love stories.',
    img: '/images/hero-weddings.jpg',
    author: 'Ananya Birla',
    date: 'Apr 8, 2026',
    readTime: 6,
  },
  {
    slug: 'destination-wedding-trends-2026',
    category: 'Bridal Fashion',
    title: 'The Most Covetable Bridal Looks of 2026 — From Sabyasachi to Manish Malhotra',
    excerpt: 'India\'s couture masters have outdone themselves this season. Our editors curate the looks that made us catch our breath.',
    img: '/images/WeddingSutra.jpg',
    author: 'Divya Nair',
    date: 'Apr 4, 2026',
    readTime: 5,
  },
  {
    slug: 'destination-wedding-trends-2026',
    category: 'Wedding Planning',
    title: 'The Rise of the Intimate Luxury Wedding: 50 Guests, Infinite Elegance',
    excerpt: 'Why India\'s most discerning couples are choosing depth over scale — and how the results are transforming the wedding industry.',
    img: '/images/Shaadi Squad.jpg',
    author: 'Priya Mehta',
    date: 'Mar 28, 2026',
    readTime: 7,
  },
];

// ── ILH LOGO ──────────────────────────────────────────────────
function ILHLogo({ size = 36 }: { size?: number }) {
  const gold = '#C9A84C', emerald = '#2A7A6A';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M40 62C40 62 34 50 33 40C32 30 36 22 40 18C44 14 50 14 52 20C54 26 48 32 44 37C40 42 40 48 42 54C44 60 40 62 40 62Z" fill={gold} opacity="0.9"/>
      <path d="M44 28C52 20 64 16 66 20C68 24 62 32 54 36C48 39 44 36 44 36" stroke={gold} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M42 34C50 22 62 12 68 14C72 16 68 28 60 34C54 38 42 36 42 36" stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      <ellipse cx="30" cy="44" rx="5" ry="2.5" fill={emerald} transform="rotate(-30 30 44)" opacity="0.8"/>
      <ellipse cx="26" cy="50" rx="5" ry="2.5" fill={emerald} transform="rotate(-20 26 50)" opacity="0.7"/>
      <ellipse cx="28" cy="38" rx="4.5" ry="2" fill={emerald} transform="rotate(-45 28 38)" opacity="0.7"/>
      <circle cx="52" cy="12" r="1.5" fill={gold}/>
      <circle cx="56" cy="10" r="1.2" fill={gold} opacity="0.8"/>
    </svg>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.88)',
        backdropFilter: 'blur(12px)', transition: 'background 0.4s ease',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
      }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.7 }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <ILHLogo size={40} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
              <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.45)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
            </div>
          </Link>

          <nav className="ilh-w-nav" style={{ display: 'flex', alignItems: 'center' }}>
            {NAV_LINKS.map(link => {
              const isActive = link.href === '/weddings';
              return (
                <Link key={link.href} href={link.href}
                  style={{
                    fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: isActive ? '#DFC27A' : link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)',
                    textDecoration: 'none', padding: '8px 10px',
                    borderBottom: isActive ? '1px solid #C9A84C' : '1px solid transparent',
                    fontWeight: isActive ? 500 : 400, transition: 'color .2s', whiteSpace: 'nowrap',
                    ...(link.href === '/partner-with-us' ? { border: '1px solid rgba(201,168,76,0.3)', padding: '6px 10px', marginLeft: 4 } : {}),
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#DFC27A'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)'; }}
                >{link.label}</Link>
              );
            })}
          </nav>

          <button className="ilh-w-ham" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 8, display: 'none' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>

        <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: menuOpen ? 600 : 0, transition: 'max-height 0.35s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '14px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: link.href === '/weddings' ? '#DFC27A' : 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >{link.label}</Link>
          ))}
        </div>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
      </header>

      <style>{`
        .ilh-w-nav { display: flex !important; }
        .ilh-w-ham { display: none !important; }
        @media(max-width:1100px){ .ilh-w-nav { display: none !important; } .ilh-w-ham { display: flex !important; } }
      `}</style>
    </>
  );
}

// ── SECTION HEADER ────────────────────────────────────────────
function SectionHeader({ eyebrow, title, align = 'left' }: { eyebrow: string; title: string; align?: 'left' | 'center' }) {
  return (
    <div style={{ textAlign: align, marginBottom: 48 }}>
      <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{eyebrow}</p>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em', lineHeight: 1.2 }}>{title}</h2>
      <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', margin: align === 'center' ? '18px auto 0' : '18px 0 0' }} />
    </div>
  );
}

// ── DESIGNER CARD ─────────────────────────────────────────────
function DesignerCard({ d }: { d: typeof DESIGNERS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/weddings/designers/${d.slug}`}
      style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: '120%', overflow: 'hidden', background: '#1A1A1A' }}>
        <Image src={d.img} alt={d.name} fill
          style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.07)' : 'scale(1)' }}
          sizes="25vw"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.3)', transition: 'background .4s' }} />
        {/* Gold border reveal */}
        <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(201,168,76,${hov ? '0.6' : '0'})`, transition: 'all .4s', pointerEvents: 'none' }} />

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px 24px', background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)' }}>
          <div style={{ width: hov ? 32 : 0, height: 1, background: '#C9A84C', marginBottom: 10, transition: 'width .4s ease' }} />
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 400, color: '#FAFAF8', lineHeight: 1.25, marginBottom: 4, letterSpacing: '0.02em', transform: hov ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform .35s' }}>{d.name}</h3>
          <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', marginBottom: 3 }}>{d.specialty}</p>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{d.city}</p>
        </div>
      </div>
    </Link>
  );
}

// ── PLANNER CARD ──────────────────────────────────────────────
function PlannerCard({ p }: { p: typeof PLANNERS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/weddings/planners/${p.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#fff', border: '1px solid rgba(201,168,76,0.12)', transition: 'all .25s' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: '58%', overflow: 'hidden', background: '#1A1A1A' }}>
        <Image src={p.img} alt={p.name} fill
          style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
          sizes="25vw"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width .3s' }} />
        <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 6, letterSpacing: '0.01em', transition: 'color .25s' }}>{p.name}</h3>
        <p style={{ fontSize: 10, color: '#6B6560', marginBottom: 10, letterSpacing: '0.04em', fontWeight: 300 }}>{p.specialty}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>{p.city}</span>
          <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', opacity: hov ? 1 : 0, transition: 'opacity .25s' }}>Inquire →</span>
        </div>
      </div>
    </Link>
  );
}

// ── VENUE CARD ────────────────────────────────────────────────
function VenueCard({ v }: { v: typeof VENUES[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/weddings/venues/${v.slug}`}
      style={{ display: 'block', textDecoration: 'none', overflow: 'hidden', position: 'relative' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: '75%', overflow: 'hidden', background: '#1A1A1A' }}>
        <Image src={v.img} alt={v.name} fill
          style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
          sizes="(max-width:768px) 50vw, 33vw"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.52)' : 'rgba(0,0,0,0.32)', transition: 'background .4s' }} />
        {/* Capacity badge */}
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,168,76,0.3)', padding: '5px 10px', backdropFilter: 'blur(4px)' }}>
          <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C' }}>Up to {v.capacity}</span>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 20px', background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 100%)' }}>
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', marginBottom: 5, transform: hov ? 'translateY(-3px)' : 'translateY(0)', transition: 'transform .35s', letterSpacing: '0.02em' }}>{v.name}</h3>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>{v.location}</p>
          <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginTop: 10, transition: 'width .4s ease' }} />
        </div>
      </div>
    </Link>
  );
}

// ── BEAUTY CARD ───────────────────────────────────────────────
function BeautyCard({ b }: { b: typeof BEAUTY[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/weddings/beauty/${b.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#0A0A0A' : '#1A1A1A', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.1'})`, transition: 'all .3s', padding: '28px 26px' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {/* Avatar circle */}
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, overflow: 'hidden', position: 'relative' }}>
        <Image src={b.img} alt={b.name} fill style={{ objectFit: 'cover' }} sizes="64px"
          onError={() => {}} />
        <span style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#C9A84C', position: 'absolute' }}>
          {b.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </span>
      </div>
      <div style={{ width: hov ? 28 : 14, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .3s' }} />
      <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em', lineHeight: 1.3 }}>{b.name}</h3>
      <p style={{ fontSize: 10, color: 'rgba(201,168,76,0.55)', marginBottom: 10, letterSpacing: '0.06em', fontWeight: 300 }}>{b.specialty}</p>
      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{b.city}</p>
    </Link>
  );
}

// ── EDITORIAL CARD ────────────────────────────────────────────
function EditorialCard({ post, big = false }: { post: typeof EDITORIAL[0]; big?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/blog/${post.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', border: '1px solid rgba(0,0,0,0.06)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: big ? '55%' : '62%', overflow: 'hidden', background: '#1A1A1A' }}>
        <Image src={post.img} alt={post.title} fill
          style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
          sizes={big ? '50vw' : '33vw'}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 55%)' }} />}
        <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
          {post.category}
        </span>
      </div>
      <div style={{ padding: big ? '26px 28px 30px' : '18px 20px 22px' }}>
        <div style={{ width: hov ? 40 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s ease' }} />
        <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontSize: big ? 22 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.title}
        </h3>
        <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
          <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)' }}>{post.date} · {post.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer() {
  const CATS = [
    { name: 'Real Estate', slug: 'real-estate' }, { name: 'Automobiles', slug: 'automobiles' },
    { name: 'Jewellery & Watches', slug: 'jewellery-watches' }, { name: 'Weddings', slug: 'weddings' },
    { name: 'Curated Partners', slug: 'curated-partners' },
  ];
  // return (
  //   <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '64px 32px 32px' }}>
  //     <div style={{ maxWidth: 1280, margin: '0 auto' }}>
  //       <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 52 }} className="ilh-w-footer">
  //         <div>
  //           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
  //             <ILHLogo size={36} />
  //             <div>
  //               <div style={{ fontFamily: 'Georgia,serif', fontSize: 15, color: '#DFC27A', letterSpacing: '0.28em' }}>INDIAN</div>
  //               <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.35)', letterSpacing: '0.4em', marginTop: 2 }}>LUXURY HOUSE</div>
  //             </div>
  //           </div>
  //           <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, fontWeight: 300, maxWidth: 250, marginBottom: 24 }}>Where India Meets Global Luxury. Celebrating the world of luxury through an India-first lens.</p>
  //           <div style={{ display: 'flex', gap: 18 }}>
  //             {['Instagram', 'LinkedIn'].map(s => (
  //               <a key={s} href="#" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.38)', textDecoration: 'none', transition: 'color .2s' }}
  //                 onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
  //                 onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.38)')}
  //               >{s}</a>
  //             ))}
  //           </div>
  //         </div>
  //         <div>
  //           <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Categories</p>
  //           {CATS.map(c => (
  //             <Link key={c.slug} href={`/${c.slug}`}
  //               style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', marginBottom: 12, letterSpacing: '0.04em', transition: 'color .2s' }}
  //               onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
  //               onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
  //             >{c.name}</Link>
  //           ))}
  //         </div>
  //         <div>
  //           <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Navigate</p>
  //           {[{ l: 'Home', h: '/' }, { l: 'News', h: '/news' }, { l: 'Partner With Us', h: '/partner-with-us' }, { l: 'About', h: '/about' }].map(item => (
  //             <Link key={item.h} href={item.h}
  //               style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', marginBottom: 12, letterSpacing: '0.04em', transition: 'color .2s' }}
  //               onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
  //               onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
  //             >{item.l}</Link>
  //           ))}
  //         </div>
  //         <div>
  //           <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Contact</p>
  //           <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginBottom: 6 }}>Partnerships:</p>
  //           <a href="mailto:hello@indianluxuryhouse.com"
  //             style={{ fontSize: 12, color: 'rgba(201,168,76,0.5)', textDecoration: 'none', letterSpacing: '0.03em', display: 'block', marginBottom: 28, transition: 'color .2s' }}
  //             onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
  //             onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.5)')}
  //           >hello@indianluxuryhouse.com</a>
  //           <p style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.28)', marginBottom: 12 }}>Newsletter</p>
  //           <div style={{ display: 'flex' }}>
  //             <input type="email" placeholder="your@email.com"
  //               style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.18)', color: '#DFC27A', fontSize: 11, padding: '9px 12px', outline: 'none', fontFamily: 'inherit', minWidth: 0 }}
  //             />
  //             <button style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', padding: '9px 14px', cursor: 'pointer', fontSize: 14, fontWeight: 700, transition: 'background .2s' }}
  //               onMouseEnter={e => ((e.target as HTMLElement).style.background = '#DFC27A')}
  //               onMouseLeave={e => ((e.target as HTMLElement).style.background = '#C9A84C')}
  //             >→</button>
  //           </div>
  //         </div>
  //       </div>
  //       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)', marginBottom: 24 }} />
  //       <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
  //         <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} Indian Luxury House. All rights reserved.</p>
  //         <div style={{ display: 'flex', gap: 22 }}>
  //           {['Privacy Policy', 'Terms of Use'].map(l => (
  //             <a key={l} href="#" style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color .2s' }}
  //               onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
  //               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.16)')}
  //             >{l}</a>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //     <style>{`
  //       @media(max-width:767px){ .ilh-w-footer { grid-template-columns: 1fr !important; gap: 32px !important; } }
  //       @media(min-width:768px) and (max-width:1023px){ .ilh-w-footer { grid-template-columns: 1fr 1fr !important; } }
  //     `}</style>
  //   </footer>
  // );
}

// ── WEDDINGS PAGE (MAIN) ──────────────────────────────────────
export default function WeddingsPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ═════════════════════════════════════════════ */}
        <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
          <Image
            src="/images/hero-weddings.jpg"
            alt="Luxury Weddings"
            fill priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            quality={95}
          />
          {/* Overlays */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.15) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.3), transparent 65%)' }} />
          {/* Gold shimmer bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

          {/* Hero content */}
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 860 }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
              >Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: '#C9A84C' }}>Weddings</span>
            </div>

            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'wFadeUp .8s .1s ease both' }}>
              Indian Luxury House
            </p>

            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(42px,8vw,96px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, marginBottom: 22, letterSpacing: '0.02em', animation: 'wFadeUp .8s .2s ease both' }}>
              Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Weddings</em>
            </h1>

            <p style={{ fontSize: 15, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 40, letterSpacing: '0.02em', animation: 'wFadeUp .8s .3s ease both' }}>
              India&apos;s world of couture celebrations and unforgettable occasions — designers, planners, venues, and beauty experts, curated for the discerning few.
            </p>

            {/* Quick nav pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'wFadeUp .8s .4s ease both' }}>
              {['Designers', 'Planners', 'Venues', 'Beauty Experts', 'Editorial'].map(tab => (
                <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`}
                  style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', textDecoration: 'none', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; }}
                >{tab}</a>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
          </div>
        </section>

        <style>{`
          @keyframes wFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @media(max-width:767px){
            .ilh-w-designers { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-w-planners  { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-w-venues    { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-w-beauty    { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-w-editorial { grid-template-columns: 1fr !important; }
          }
          @media(max-width:480px){
            .ilh-w-designers { grid-template-columns: 1fr !important; }
            .ilh-w-planners  { grid-template-columns: 1fr !important; }
            .ilh-w-venues    { grid-template-columns: 1fr !important; }
            .ilh-w-beauty    { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* ══ DESIGNERS ════════════════════════════════════════ */}
        <section id="designers" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Bridal Couture" title="Celebrated Designers" />
              <Link href="/weddings/designers"
                style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
                View All Designers →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-w-designers">
              {DESIGNERS.map(d => <DesignerCard key={d.slug} d={d} />)}
            </div>
          </div>
        </section>

        {/* ══ WEDDING PLANNERS ════════════════════════════════= */}
        <section id="planners" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <div style={{ marginBottom: 0 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Trusted Professionals</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>Wedding Planners</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              <Link href="/weddings/planners"
                style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
                View All Planners →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-w-planners">
              {PLANNERS.map(p => <PlannerCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>

        {/* ══ VENUES ══════════════════════════════════════════ */}
        <section id="venues" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Palace & Heritage" title="Extraordinary Venues" />
              <Link href="/weddings/venues"
                style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
                View All Venues →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="ilh-w-venues">
              {VENUES.map(v => <VenueCard key={v.slug} v={v} />)}
            </div>
          </div>
        </section>

        {/* ══ BEAUTY EXPERTS ══════════════════════════════════ */}
        <section id="beauty-experts" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Hair & Makeup</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>Beauty Experts</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              <Link href="/weddings/beauty"
                style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
                View All Experts →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }} className="ilh-w-beauty">
              {BEAUTY.map(b => <BeautyCard key={b.slug} b={b} />)}
            </div>
          </div>
        </section>

        {/* ══ EDITORIAL ═══════════════════════════════════════ */}
        <section id="editorial" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Stories & Inspiration" title="Wedding Editorial" />
              <Link href="/news?category=weddings"
                style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
                All Wedding Stories →
              </Link>
            </div>

            {/* Featured + 2 side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-w-editorial">
              <EditorialCard post={EDITORIAL[0]} big />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <EditorialCard post={EDITORIAL[1]} />
                <EditorialCard post={EDITORIAL[2]} />
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '110px 32px', background: '#0A0A0A' }}>
          {/* Decorative background elements */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* Gold lines top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            {/* Emerald radial */}
            <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,122,106,0.1) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
          </div>

          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Decorative icon */}
            <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.7 }}>✨</div>

            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 18 }}>Begin Your Journey</p>

            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.12, marginBottom: 22, letterSpacing: '0.015em' }}>
              Plan Your Dream<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Celebration</em>
            </h2>

            {/* Gold divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
              <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
            </div>

            <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.38)', fontWeight: 300, lineHeight: 1.85, marginBottom: 52, maxWidth: 560, margin: '0 auto 52px' }}>
              Connect with India&apos;s most celebrated designers, planners, venues, and beauty experts — all curated by Indian Luxury House for the most discerning celebrations.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/curated-partners?category=weddings"
                style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 44px', textDecoration: 'none', fontWeight: 700, transition: 'background .3s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
              >Explore Wedding Partners</Link>

              <Link href="/partner-with-us"
                style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.45)', padding: '16px 44px', textDecoration: 'none', transition: 'all .3s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; }}
              >List Your Business</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}