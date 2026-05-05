'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

// ── THIS PAGE'S CATEGORY ───────────────────────────────────────
const THIS_CATEGORY = 'Automobiles';
const THIS_CAT_SLUG = 'automobiles';

const LAUNCHES = [
  { slug: 'rolls-royce-spectre-india',    type: 'Electric Coupe',    segment: 'Cars',  name: 'Rolls-Royce Spectre',    brand: 'Rolls-Royce',  price: '₹7.5 Cr onwards',   power: '577 bhp',   img: '/images/hero-cars.jpg',      tag: 'New Launch',  highlight: 'First all-electric ultra-luxury'    },
  { slug: 'bentley-bentayga-ewb-india',   type: 'Ultra Luxury SUV',  segment: 'Cars',  name: 'Bentley Bentayga EWB',   brand: 'Bentley',      price: '₹5.25 Cr onwards',  power: '542 bhp',   img: '/images/automobiles.jpg',    tag: 'New Arrival', highlight: 'Extended wheelbase, rear sanctuary' },
  { slug: 'lamborghini-urus-se-india',    type: 'Super SUV',         segment: 'Cars',  name: 'Lamborghini Urus SE',    brand: 'Lamborghini',  price: '₹4.18 Cr onwards',  power: '789 bhp',   img: '/images/placeholder-car.jpg',tag: 'Hybrid',      highlight: 'Plug-in hybrid super SUV'           },
  { slug: 'ferrari-roma-spider-india',    type: 'Grand Tourer',      segment: 'Cars',  name: 'Ferrari Roma Spider',    brand: 'Ferrari',      price: '₹4.02 Cr onwards',  power: '620 bhp',   img: '/images/automobiles.jpg',    tag: 'Limited',     highlight: 'Open-top Italian perfection'        },
  { slug: 'ducati-panigale-v4-sp2',       type: 'Superbike',         segment: 'Bikes', name: 'Ducati Panigale V4 SP2', brand: 'Ducati',       price: '₹64.98 L onwards',  power: '215.5 bhp', img: '/images/Rolls-Royce.jpg',    tag: 'Track Ready', highlight: 'Track-derived performance'          },
];

const DEALERS = [
  { slug: 'navnit-motors-mumbai',      name: 'Navnit Motors',     brands: ['Rolls-Royce', 'Bentley', 'Lamborghini'], city: 'Mumbai',    established: '1952', img: '/images/dealer-navnit.jpg',      specialty: 'Ultra Luxury Multi-Brand', rating: '4.9' },
  { slug: 'performance-cars-delhi',    name: 'Performance Cars',  brands: ['Ferrari', 'Maserati', 'Lotus'],          city: 'New Delhi', established: '1998', img: '/images/dealer-performance.jpg', specialty: 'Italian Sports Cars',      rating: '4.8' },
  { slug: 'bimal-auto-agency-mumbai',  name: 'Bimal Auto Agency', brands: ['Porsche', 'Aston Martin'],               city: 'Mumbai',    established: '1963', img: '/images/dealer-bimal.jpg',       specialty: 'Performance & GT Cars',    rating: '4.9' },
  { slug: 'infinity-cars-mumbai',      name: 'Infinity Cars',     brands: ['Mercedes-Benz AMG', 'BMW M'],            city: 'Mumbai',    established: '2005', img: '/images/dealer-infinity.jpg',    specialty: 'German Performance',       rating: '4.7' },
];

// ── API POST TYPE ──────────────────────────────────────────────
interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: number;
  isPublished: boolean;
  createdAt: string;
}

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
      <ellipse cx="28" cy="38" rx="4.5" ry="2"  fill={emerald} transform="rotate(-45 28 38)" opacity="0.7"/>
      <circle cx="52" cy="12" r="1.5" fill={gold}/>
      <circle cx="56" cy="10" r="1.2" fill={gold} opacity="0.8"/>
    </svg>
  );
}



// ── LAUNCH CARD ─────────────────────────────────────────────────
function LaunchCard({ car, big = false }: { car: typeof LAUNCHES[0]; big?: boolean }) {
  const [hov, setHov] = useState(false);

  const tagColor = car.tag === 'Hybrid' || car.tag === 'New Launch' || car.tag === 'Track Ready' || car.tag === 'New Arrival'
    ? '#FAFAF8' : '#0A0A0A';
  const tagBg = car.tag === 'Limited'
    ? 'rgba(180,50,50,0.85)'
    : car.tag === 'Hybrid'
    ? 'rgba(42,122,106,0.9)'
    : 'rgba(201,168,76,0.9)';

  return (
    <Link
      href={`/automobiles/${car.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: '#0F0F0F', border: `1px solid rgba(201,168,76,${hov ? '0.35' : '0.1'})`, transition: 'all .3s', boxShadow: hov ? '0 12px 40px rgba(0,0,0,0.3)' : 'none' }}
    >
      {/* ✅ Hover on inner div, not on Link */}
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <div style={{ position: 'relative', paddingBottom: big ? '55%' : '62%', overflow: 'hidden', background: '#1A1A1A' }}>
          <Image src={car.img} alt={car.name} fill
            style={{ objectFit: 'cover', transition: 'transform .8s ease', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
            sizes={big ? '50vw' : '33vw'}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)', transition: 'background .4s' }} />
          <div style={{ position: 'absolute', top: 14, left: 14 }}>
            <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: car.segment === 'Bikes' ? '#DFC27A' : '#C9A84C', background: 'rgba(10,10,10,0.88)', padding: '5px 10px', border: `1px solid ${car.segment === 'Bikes' ? 'rgba(223,192,122,0.4)' : 'rgba(201,168,76,0.3)'}` }}>
              {car.segment}
            </span>
          </div>
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <span style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: tagColor, background: tagBg, padding: '5px 10px' }}>
              {car.tag}
            </span>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 18px', background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)' }}>
            <p style={{ fontSize: 9, color: 'rgba(201,168,76,0.6)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{car.highlight}</p>
          </div>
        </div>
        <div style={{ padding: '20px 22px 24px' }}>
          <div style={{ width: hov ? 36 : 18, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width .35s ease' }} />
          <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 5 }}>{car.brand}</p>
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: big ? 21 : 18, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em', lineHeight: 1.25 }}>{car.name}</h3>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 16, letterSpacing: '0.06em' }}>{car.type}</p>
          <div style={{ display: 'flex', gap: 20, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
            <div>
              <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', marginBottom: 3 }}>Power</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{car.power}</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', marginBottom: 3 }}>Starting from</p>
              <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#C9A84C', letterSpacing: '0.02em' }}>{car.price}</p>
            </div>
            <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: hov ? '#0A0A0A' : '#C9A84C', background: hov ? '#C9A84C' : 'transparent', border: '1px solid rgba(201,168,76,0.4)', padding: '8px 14px', transition: 'all .3s' }}>
              Enquire →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── DEALER CARD ─────────────────────────────────────────────────
function DealerCard({ d }: { d: typeof DEALERS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={`/automobiles/dealers/${d.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#fff', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.12'})`, transition: 'all .3s', boxShadow: hov ? '0 6px 24px rgba(0,0,0,0.07)' : 'none' }}
    >
      {/* ✅ Hover on inner div */}
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <div style={{ position: 'relative', paddingBottom: '56%', overflow: 'hidden', background: '#1A1A1A' }}>
          <Image src={d.img} alt={d.name} fill style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }} sizes="25vw" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.82)', border: '1px solid rgba(201,168,76,0.25)', padding: '4px 10px' }}>
            <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)' }}>Est. {d.established}</span>
          </div>
        </div>
        <div style={{ padding: '20px 22px 24px' }}>
          <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 400, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 5, letterSpacing: '0.01em', transition: 'color .25s' }}>{d.name}</h3>
          <p style={{ fontSize: 10, color: 'rgba(107,101,88,0.55)', marginBottom: 14, letterSpacing: '0.04em' }}>📍 {d.city}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {d.brands.map(b => <span key={b} style={{ fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', padding: '4px 8px' }}>{b}</span>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 14 }}>
            <p style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)', letterSpacing: '0.06em' }}>{d.specialty}</p>
            <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', opacity: hov ? 1 : 0, transition: 'opacity .25s' }}>Visit →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── EDITORIAL CARD (API data) ─────────────────────────────────
function EditorialCard({ post, big = false }: { post: Post; big?: boolean }) {
  const [hov, setHov] = useState(false);

  const CAT_IMAGE_MAP: Record<string, string> = {
    'Real Estate':         '/images/real-estate.jpg',
    'Automobiles':         '/images/automobiles.jpg',
    'Jewellery & Watches': '/images/Jewellery.png',
    'Weddings':            '/images/hero-weddings.jpg',
    'Curated Partners':    '/images/hero-partners.jpg',
  };
  const imgSrc = CAT_IMAGE_MAP[post.category] ?? '/images/automobiles.jpg';
  const postUrl = `/${THIS_CAT_SLUG}/${post.slug}`;

  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return iso; }
  };

  return (
    <Link
      href={postUrl}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}
    >
      {/* ✅ Hover on inner div */}
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ height: '100%' }}>
        <div style={{ position: 'relative', paddingBottom: big ? '55%' : '60%', overflow: 'hidden', background: '#1A1A1A' }}>
          <Image src={imgSrc} alt={post.title} fill
            style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
            sizes={big ? '50vw' : '33vw'}
          />
          {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 55%)' }} />}
          <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
            {post.category}
          </span>
        </div>
        <div style={{ padding: big ? '24px 26px 28px' : '18px 20px 22px' }}>
          <div style={{ width: hov ? 38 : 18, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
          <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontSize: big ? 21 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.title}
          </h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
            <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
            <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)' }}>{formatDate(post.createdAt)} · {post.readTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── EDITORIAL SKELETON ─────────────────────────────────────────
function EditorialSkeleton({ big = false }: { big?: boolean }) {
  return (
    <div style={{ background: '#FAFAF8', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}>
      <div style={{ paddingBottom: big ? '55%' : '60%', background: 'linear-gradient(90deg,#f0ebe0 25%,#e8e2d4 50%,#f0ebe0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: big ? '24px 26px' : '18px 20px' }}>
        <div style={{ height: 1, width: 18, background: '#C9A84C', marginBottom: 14 }} />
        <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 8, width: '85%' }} />
        <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 16, width: '65%' }} />
        <div style={{ height: 12, background: '#ede8dd', borderRadius: 2, width: '50%' }} />
      </div>
    </div>
  );
}

// ── AUTOMOBILES PAGE ───────────────────────────────────────────
export default function AutomobilesPage() {
  const [activeSegment, setActiveSegment] = useState('All');
  const segments = ['All', 'Cars', 'Bikes'];
  const filtered = activeSegment === 'All' ? LAUNCHES : LAUNCHES.filter(c => c.segment === activeSegment);

  // ── API: Sirf Automobiles category ke published posts ───────
  const [editorialPosts, setEditorialPosts] = useState<Post[]>([]);
  const [editorialLoading, setEditorialLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://shivmani-baceknd.onrender.com/api/editorials');
        if (!res.ok) return;
        const data: Post[] = await res.json();
        // Sirf is category ke published posts filter karo
        const filtered = data.filter(p => p.isPublished && p.category === THIS_CATEGORY);
        setEditorialPosts(filtered);
      } catch (err) {
        console.error('Editorial fetch error:', err);
      } finally {
        setEditorialLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
   
      <main>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
          <Image src="/images/automobiles.jpg" alt="Luxury Automobiles India" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} quality={95} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0.1) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(10,10,10,0.65) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 900 }}>

            {/* ✅ Breadcrumb — plain <a> + CSS class */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
              <a href="/" className="ilh-breadcrumb-link">Home</a>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: '#C9A84C' }}>Automobiles</span>
            </div>

            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18 }}>Indian Luxury House</p>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(44px,8vw,100px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.03, marginBottom: 22, letterSpacing: '0.015em' }}>
              Auto<em style={{ color: '#DFC27A', fontStyle: 'italic' }}>mobiles</em>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 44, letterSpacing: '0.02em' }}>
              Luxury performance, prestige, and collector culture — the finest cars and motorcycles available in India, curated for connoisseurs.
            </p>

            {/* ✅ Hero tabs — plain <a> + CSS class */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['New Launches', 'Featured Dealers', 'Editorial'].map(tab => (
                <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`} className="ilh-hero-tab">
                  {tab}
                </a>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
          </div>
        </section>

        <style>{`
          @keyframes autoFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes shimmer    { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

          .ilh-breadcrumb-link { color: inherit; text-decoration: none; transition: color .2s; }
          .ilh-breadcrumb-link:hover { color: #C9A84C; }

          .ilh-hero-tab {
            font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
            color: rgba(201,168,76,0.65); border: 1px solid rgba(201,168,76,0.25);
            padding: 8px 18px; text-decoration: none; transition: all .25s;
          }
          .ilh-hero-tab:hover { background: rgba(201,168,76,0.12); color: #DFC27A; border-color: rgba(201,168,76,0.5); }

          .ilh-view-all {
            font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
            color: #C9A84C; text-decoration: none;
            border-bottom: 1px solid rgba(201,168,76,0.35); padding-bottom: 2px; transition: border-color .2s;
          }
          .ilh-view-all:hover { border-color: #C9A84C; }

          .ilh-cta-primary {
            font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
            color: #1A1A1A; background: #C9A84C; padding: 16px 44px;
            text-decoration: none; font-weight: 700; transition: background .3s; display: inline-block;
          }
          .ilh-cta-primary:hover { background: #DFC27A; }

          .ilh-cta-secondary {
            font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
            color: #C9A84C; border: 1px solid rgba(201,168,76,0.5); padding: 16px 44px;
            text-decoration: none; transition: all .3s; display: inline-block;
          }
          .ilh-cta-secondary:hover { background: rgba(201,168,76,0.08); border-color: #C9A84C; }

          @media(max-width:767px){
            .ilh-auto-launches  { grid-template-columns: 1fr !important; }
            .ilh-auto-dealers   { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-auto-editorial { grid-template-columns: 1fr !important; }
          }
          @media(max-width:480px){ .ilh-auto-dealers { grid-template-columns: 1fr !important; } }
          @media(min-width:768px) and (max-width:1023px){
            .ilh-auto-launches { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-auto-dealers  { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>

        {/* ══ NEW LAUNCHES ══════════════════════════════════════ */}
        <section id="new-launches" style={{ background: '#0A0A0A', padding: '88px 32px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Cars & Bikes</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>New Launches</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              {/* ✅ CSS class */}
              <a href="/automobiles/all" className="ilh-view-all" style={{ color: '#C9A84C' }}>View All →</a>
            </div>

            <div style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.1)', width: 'fit-content' }}>
              {segments.map(s => (
                <button key={s} onClick={() => setActiveSegment(s)}
                  style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '10px 24px', border: 'none', cursor: 'pointer', background: 'transparent', color: activeSegment === s ? '#DFC27A' : 'rgba(201,168,76,0.38)', borderBottom: activeSegment === s ? '2px solid #C9A84C' : '2px solid transparent', transition: 'all .2s', fontWeight: activeSegment === s ? 500 : 400 }}
                  onMouseEnter={e => { if (activeSegment !== s) e.currentTarget.style.color = '#C9A84C'; }}
                  onMouseLeave={e => { if (activeSegment !== s) e.currentTarget.style.color = 'rgba(201,168,76,0.38)'; }}
                >{s}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 16 }} className="ilh-auto-launches">
              {filtered.slice(0, 2).map(c => <LaunchCard key={c.slug} car={c} big />)}
            </div>
            {filtered.length > 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="ilh-auto-launches">
                {filtered.slice(2).map(c => <LaunchCard key={c.slug} car={c} />)}
              </div>
            )}
          </div>
        </section>

        {/* ══ FEATURED DEALERS ══════════════════════════════════ */}
        <section id="featured-dealers" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Trusted Partners</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Featured Dealers</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              {/* ✅ CSS class */}
              <a href="/automobiles/dealers" className="ilh-view-all">View All Dealers →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-auto-dealers">
              {DEALERS.map(d => <DealerCard key={d.slug} d={d} />)}
            </div>
          </div>
        </section>

        {/* ══ EDITORIAL STORIES (API DATA) ════════════════════ */}
        <section id="editorial" style={{ background: '#FAFAF8', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Reviews & Intelligence</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Editorial Stories</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              {/* ✅ CSS class */}
              <a href={`/news?category=${THIS_CAT_SLUG}`} className="ilh-view-all">All {THIS_CATEGORY} Stories →</a>
            </div>

            {/* Loading skeleton */}
            {editorialLoading && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-auto-editorial">
                <EditorialSkeleton big />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <EditorialSkeleton />
                  <EditorialSkeleton />
                </div>
              </div>
            )}

            {/* No posts */}
            {!editorialLoading && editorialPosts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(107,101,88,0.45)' }}>
                <p style={{ fontFamily: 'Georgia,serif', fontSize: 20, marginBottom: 8 }}>No stories published yet.</p>
                <p style={{ fontSize: 13 }}>Check back soon for {THIS_CATEGORY} editorial content.</p>
              </div>
            )}

            {/* Posts grid: big left + 2 stacked right */}
            {!editorialLoading && editorialPosts.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-auto-editorial">
                <EditorialCard post={editorialPosts[0]} big />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {editorialPosts[1] && <EditorialCard post={editorialPosts[1]} />}
                  {editorialPosts[2] && <EditorialCard post={editorialPosts[2]} />}
                  {editorialPosts.length === 1 && (
                    <div style={{ flex: 1, background: '#F5F0E8', border: '1px solid rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                      <p style={{ fontSize: 12, color: 'rgba(107,101,88,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>More stories coming soon</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#0A0A0A', padding: '100px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
          </div>
          <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.55 }}>🚗</div>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 18 }}>We Source. You Drive.</p>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.12, marginBottom: 20, letterSpacing: '0.015em' }}>
              Need Sourcing<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Assistance?</em>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
              <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
            </div>
            <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.38)', fontWeight: 300, lineHeight: 1.85, maxWidth: 540, margin: '0 auto 52px' }}>
              Looking for a specific model, a rare edition, or need expert guidance on your next acquisition? Our network of trusted dealers and specialists is at your service.
            </p>
            {/* ✅ CTA buttons — plain <a> + CSS classes */}
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/partner-with-us?category=automobiles" className="ilh-cta-primary">Get Sourcing Help</a>
              <a href="/curated-partners?category=automobiles" className="ilh-cta-secondary">View All Dealers</a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}


// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// const NAV_LINKS = [
//   { label: 'Home',                href: '/'                  },
//   { label: 'News',                href: '/news'              },
//   { label: 'Real Estate',         href: '/real-estate'       },
//   { label: 'Automobiles',         href: '/automobiles'       },
//   { label: 'Jewellery & Watches', href: '/jewellery-watches' },
//   { label: 'Weddings',            href: '/weddings'          },
//   { label: 'Curated Partners',    href: '/curated-partners'  },
//   { label: 'Partner With Us',     href: '/partner-with-us'   },
//   { label: 'About',               href: '/about'             },
// ];

// const LAUNCHES = [
//   { slug: 'rolls-royce-spectre-india',    type: 'Electric Coupe',    segment: 'Cars',  name: 'Rolls-Royce Spectre',    brand: 'Rolls-Royce',  price: '₹7.5 Cr onwards',   power: '577 bhp',   img: '/images/hero-cars.jpg',      tag: 'New Launch',  highlight: 'First all-electric ultra-luxury'    },
//   { slug: 'bentley-bentayga-ewb-india',   type: 'Ultra Luxury SUV',  segment: 'Cars',  name: 'Bentley Bentayga EWB',   brand: 'Bentley',      price: '₹5.25 Cr onwards',  power: '542 bhp',   img: '/images/automobiles.jpg',    tag: 'New Arrival', highlight: 'Extended wheelbase, rear sanctuary' },
//   { slug: 'lamborghini-urus-se-india',    type: 'Super SUV',         segment: 'Cars',  name: 'Lamborghini Urus SE',    brand: 'Lamborghini',  price: '₹4.18 Cr onwards',  power: '789 bhp',   img: '/images/placeholder-car.jpg',tag: 'Hybrid',      highlight: 'Plug-in hybrid super SUV'           },
//   { slug: 'ferrari-roma-spider-india',    type: 'Grand Tourer',      segment: 'Cars',  name: 'Ferrari Roma Spider',    brand: 'Ferrari',      price: '₹4.02 Cr onwards',  power: '620 bhp',   img: '/images/automobiles.jpg',    tag: 'Limited',     highlight: 'Open-top Italian perfection'        },
//   { slug: 'ducati-panigale-v4-sp2',       type: 'Superbike',         segment: 'Bikes', name: 'Ducati Panigale V4 SP2', brand: 'Ducati',       price: '₹64.98 L onwards',  power: '215.5 bhp', img: '/images/Rolls-Royce.jpg',    tag: 'Track Ready', highlight: 'Track-derived performance'          },
// ];

// const DEALERS = [
//   { slug: 'navnit-motors-mumbai',      name: 'Navnit Motors',     brands: ['Rolls-Royce', 'Bentley', 'Lamborghini'], city: 'Mumbai',    established: '1952', img: '/images/dealer-navnit.jpg',      specialty: 'Ultra Luxury Multi-Brand', rating: '4.9' },
//   { slug: 'performance-cars-delhi',    name: 'Performance Cars',  brands: ['Ferrari', 'Maserati', 'Lotus'],          city: 'New Delhi', established: '1998', img: '/images/dealer-performance.jpg', specialty: 'Italian Sports Cars',      rating: '4.8' },
//   { slug: 'bimal-auto-agency-mumbai',  name: 'Bimal Auto Agency', brands: ['Porsche', 'Aston Martin'],               city: 'Mumbai',    established: '1963', img: '/images/dealer-bimal.jpg',       specialty: 'Performance & GT Cars',    rating: '4.9' },
//   { slug: 'infinity-cars-mumbai',      name: 'Infinity Cars',     brands: ['Mercedes-Benz AMG', 'BMW M'],            city: 'Mumbai',    established: '2005', img: '/images/dealer-infinity.jpg',    specialty: 'German Performance',       rating: '4.7' },
// ];

// const STORIES = [
//   { slug: 'best-luxury-suvs-india-2026',         category: 'Buyers Guide',      title: 'The 7 Best Luxury SUVs Money Can Buy in India Right Now',                   excerpt: "From Bentley Bentayga to Lamborghini Urus — the definitive ranking for India's most discerning drivers.",                             img: '/images/automobiles.jpg',    author: 'Arjun Kapoor',  date: 'Apr 18, 2026', readTime: 6 },
//   { slug: 'collectible-supercars-investment',     category: 'Collector Culture', title: 'Collectible Supercars: The Machines Worth Investing in Right Now',           excerpt: 'From limited-run Ferrari specials to Porsche RS variants, these are the cars that appreciate while you enjoy them.',                  img: '/images/hero-cars.jpg',      author: 'Vikram Oberoi', date: 'Apr 12, 2026', readTime: 8 },
//   { slug: 'rolls-royce-spectre-india-launch',     category: 'First Drive',       title: 'Rolls-Royce Spectre Arrives in India: The First All-Electric Ultra-Luxury Car', excerpt: "Silent, powerful, and unmistakably Rolls-Royce. We drive the Spectre on India's most scenic roads.",                              img: '/images/placeholder-car.jpg',author: 'Vikram Oberoi', date: 'Apr 22, 2026', readTime: 7 },
// ];

// // ── ILH LOGO ──────────────────────────────────────────────────
// function ILHLogo({ size = 36 }: { size?: number }) {
//   const gold = '#C9A84C', emerald = '#2A7A6A';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
//       <path d="M40 62C40 62 34 50 33 40C32 30 36 22 40 18C44 14 50 14 52 20C54 26 48 32 44 37C40 42 40 48 42 54C44 60 40 62 40 62Z" fill={gold} opacity="0.9"/>
//       <path d="M44 28C52 20 64 16 66 20C68 24 62 32 54 36C48 39 44 36 44 36" stroke={gold} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <path d="M42 34C50 22 62 12 68 14C72 16 68 28 60 34C54 38 42 36 42 36" stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
//       <ellipse cx="30" cy="44" rx="5" ry="2.5" fill={emerald} transform="rotate(-30 30 44)" opacity="0.8"/>
//       <ellipse cx="26" cy="50" rx="5" ry="2.5" fill={emerald} transform="rotate(-20 26 50)" opacity="0.7"/>
//       <ellipse cx="28" cy="38" rx="4.5" ry="2"  fill={emerald} transform="rotate(-45 28 38)" opacity="0.7"/>
//       <circle cx="52" cy="12" r="1.5" fill={gold}/>
//       <circle cx="56" cy="10" r="1.2" fill={gold} opacity="0.8"/>
//     </svg>
//   );
// }

// // ── NAVBAR ────────────────────────────────────────────────────
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   return (
//     <>
//       <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.88)', backdropFilter: 'blur(12px)', transition: 'background 0.4s ease', boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none' }}>
//         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.7 }} />
//         <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
//           <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
//             <ILHLogo size={40} />
//             <div style={{ lineHeight: 1 }}>
//               <div style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
//               <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.45)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//             </div>
//           </Link>

//           <nav className="ilh-auto-nav" style={{ display: 'flex', alignItems: 'center' }}>
//             {NAV_LINKS.map(link => {
//               const isActive = link.href === '/automobiles';
//               return (
//                 <Link key={link.href} href={link.href}
//                   style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: isActive ? '#DFC27A' : link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)', textDecoration: 'none', padding: '8px 10px', borderBottom: isActive ? '1px solid #C9A84C' : '1px solid transparent', fontWeight: isActive ? 500 : 400, transition: 'color .2s', whiteSpace: 'nowrap', ...(link.href === '/partner-with-us' ? { border: '1px solid rgba(201,168,76,0.3)', padding: '6px 10px', marginLeft: 4 } : {}) }}
//                   onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#DFC27A'; }}
//                   onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)'; }}
//                 >{link.label}</Link>
//               );
//             })}
//           </nav>

//           <button className="ilh-auto-ham" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 8, display: 'none' }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               {menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//             </svg>
//           </button>
//         </div>

//         <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: menuOpen ? 600 : 0, transition: 'max-height 0.35s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           {NAV_LINKS.map(link => (
//             <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
//               style={{ display: 'block', padding: '14px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: link.href === '/automobiles' ? '#DFC27A' : 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
//               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//               onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//             >{link.label}</Link>
//           ))}
//         </div>
//         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
//       </header>
//       <style>{`
//         .ilh-auto-nav { display: flex !important; }
//         .ilh-auto-ham { display: none !important; }
//         @media(max-width:1100px){ .ilh-auto-nav { display: none !important; } .ilh-auto-ham { display: flex !important; } }
//       `}</style>
//     </>
//   );
// }

// // ── LAUNCH CARD ───────────────────────────────────────────────
// function LaunchCard({ car, big = false }: { car: typeof LAUNCHES[0]; big?: boolean }) {
//   const [hov, setHov] = useState(false);

//   // ✅ FIX: single color property
//   const tagColor = car.tag === 'Hybrid' || car.tag === 'New Launch' || car.tag === 'Track Ready' || car.tag === 'New Arrival'
//     ? '#FAFAF8'
//     : '#0A0A0A';
//   const tagBg = car.tag === 'Limited'
//     ? 'rgba(180,50,50,0.85)'
//     : car.tag === 'Hybrid'
//     ? 'rgba(42,122,106,0.9)'
//     : 'rgba(201,168,76,0.9)';

//   return (
//     <Link href={`/automobiles/${car.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: '#0F0F0F', border: `1px solid rgba(201,168,76,${hov ? '0.35' : '0.1'})`, transition: 'all .3s', boxShadow: hov ? '0 12px 40px rgba(0,0,0,0.3)' : 'none' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: big ? '55%' : '62%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={car.img} alt={car.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .8s ease', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
//           sizes={big ? '50vw' : '33vw'}
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)', transition: 'background .4s' }} />

//         {/* Segment badge */}
//         <div style={{ position: 'absolute', top: 14, left: 14 }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: car.segment === 'Bikes' ? '#DFC27A' : '#C9A84C', background: 'rgba(10,10,10,0.88)', padding: '5px 10px', border: `1px solid ${car.segment === 'Bikes' ? 'rgba(223,192,122,0.4)' : 'rgba(201,168,76,0.3)'}` }}>
//             {car.segment}
//           </span>
//         </div>

//         {/* Tag badge — ✅ single color */}
//         <div style={{ position: 'absolute', top: 14, right: 14 }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: tagColor, background: tagBg, padding: '5px 10px' }}>
//             {car.tag}
//           </span>
//         </div>

//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 18px', background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)' }}>
//           <p style={{ fontSize: 9, color: 'rgba(201,168,76,0.6)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{car.highlight}</p>
//         </div>
//       </div>

//       <div style={{ padding: '20px 22px 24px' }}>
//         <div style={{ width: hov ? 36 : 18, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width .35s ease' }} />
//         <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 5 }}>{car.brand}</p>
//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: big ? 21 : 18, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em', lineHeight: 1.25 }}>{car.name}</h3>
//         <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 16, letterSpacing: '0.06em' }}>{car.type}</p>
//         <div style={{ display: 'flex', gap: 20, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
//           <div>
//             <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', marginBottom: 3 }}>Power</p>
//             <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{car.power}</p>
//           </div>
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>
//             <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', marginBottom: 3 }}>Starting from</p>
//             <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#C9A84C', letterSpacing: '0.02em' }}>{car.price}</p>
//           </div>
//           <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: hov ? '#0A0A0A' : '#C9A84C', background: hov ? '#C9A84C' : 'transparent', border: '1px solid rgba(201,168,76,0.4)', padding: '8px 14px', transition: 'all .3s' }}>
//             Enquire →
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── DEALER CARD ───────────────────────────────────────────────
// function DealerCard({ d }: { d: typeof DEALERS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/automobiles/dealers/${d.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#fff', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.12'})`, transition: 'all .3s', boxShadow: hov ? '0 6px 24px rgba(0,0,0,0.07)' : 'none' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: '56%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={d.img} alt={d.name} fill style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }} sizes="25vw" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
//         <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.82)', border: '1px solid rgba(201,168,76,0.25)', padding: '4px 10px' }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)' }}>Est. {d.established}</span>
//         </div>
//       </div>
//       <div style={{ padding: '20px 22px 24px' }}>
//         <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 400, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 5, letterSpacing: '0.01em', transition: 'color .25s' }}>{d.name}</h3>
//         <p style={{ fontSize: 10, color: 'rgba(107,101,88,0.55)', marginBottom: 14, letterSpacing: '0.04em' }}>📍 {d.city}</p>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
//           {d.brands.map(b => <span key={b} style={{ fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', padding: '4px 8px' }}>{b}</span>)}
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 14 }}>
//           <p style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)', letterSpacing: '0.06em' }}>{d.specialty}</p>
//           <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', opacity: hov ? 1 : 0, transition: 'opacity .25s' }}>Visit →</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── STORY CARD ────────────────────────────────────────────────
// function StoryCard({ post, big = false }: { post: typeof STORIES[0]; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: big ? '54%' : '60%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={post.img} alt={post.title} fill style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }} sizes={big ? '50vw' : '33vw'} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
//         {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 55%)' }} />}
//         <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>{post.category}</span>
//       </div>
//       <div style={{ padding: big ? '24px 26px 28px' : '18px 20px 22px' }}>
//         <div style={{ width: hov ? 38 : 18, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontSize: big ? 21 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h3>
//         <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
//         <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
//           <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)' }}>{post.date} · {post.readTime} min</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── AUTOMOBILES PAGE ──────────────────────────────────────────
// export default function AutomobilesPage() {
//   const [activeSegment, setActiveSegment] = useState('All');
//   const segments = ['All', 'Cars', 'Bikes'];
//   const filtered = activeSegment === 'All' ? LAUNCHES : LAUNCHES.filter(c => c.segment === activeSegment);

//   return (
//     <>
//       <Navbar />
//       <main>

//         {/* HERO */}
//         <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
//           <Image src="/images/automobiles.jpg" alt="Luxury Automobiles India" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} quality={95} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0.1) 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(10,10,10,0.65) 0%, transparent 55%)' }} />
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 900 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}>Home</Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>Automobiles</span>
//             </div>
//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18 }}>Indian Luxury House</p>
//             <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(44px,8vw,100px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.03, marginBottom: 22, letterSpacing: '0.015em' }}>
//               Auto<em style={{ color: '#DFC27A', fontStyle: 'italic' }}>mobiles</em>
//             </h1>
//             <p style={{ fontSize: 16, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 44, letterSpacing: '0.02em' }}>
//               Luxury performance, prestige, and collector culture — the finest cars and motorcycles available in India, curated for connoisseurs.
//             </p>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
//               {['New Launches', 'Featured Dealers', 'Stories'].map(tab => (
//                 <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`}
//                   style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', textDecoration: 'none', transition: 'all .25s' }}
//                   onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#DFC27A'; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; }}
//                 >{tab}</a>
//               ))}
//             </div>
//           </div>

//           <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
//             <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
//             <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
//           </div>
//         </section>

//         <style>{`
//           @keyframes autoFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//           @media(max-width:767px){ .ilh-auto-launches { grid-template-columns: 1fr !important; } .ilh-auto-dealers { grid-template-columns: repeat(2,1fr) !important; } .ilh-auto-stories { grid-template-columns: 1fr !important; } }
//           @media(max-width:480px){ .ilh-auto-dealers { grid-template-columns: 1fr !important; } }
//           @media(min-width:768px) and (max-width:1023px){ .ilh-auto-launches { grid-template-columns: repeat(2,1fr) !important; } .ilh-auto-dealers { grid-template-columns: repeat(2,1fr) !important; } }
//         `}</style>

//         {/* NEW LAUNCHES */}
//         <section id="new-launches" style={{ background: '#0A0A0A', padding: '88px 32px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Cars & Bikes</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>New Launches</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/automobiles/all" style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>View All →</Link>
//             </div>

//             <div style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.1)', width: 'fit-content' }}>
//               {segments.map(s => (
//                 <button key={s} onClick={() => setActiveSegment(s)}
//                   style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '10px 24px', border: 'none', cursor: 'pointer', background: 'transparent', color: activeSegment === s ? '#DFC27A' : 'rgba(201,168,76,0.38)', borderBottom: activeSegment === s ? '2px solid #C9A84C' : '2px solid transparent', transition: 'all .2s', fontWeight: activeSegment === s ? 500 : 400 }}
//                   onMouseEnter={e => { if (activeSegment !== s) e.currentTarget.style.color = '#C9A84C'; }}
//                   onMouseLeave={e => { if (activeSegment !== s) e.currentTarget.style.color = 'rgba(201,168,76,0.38)'; }}
//                 >{s}</button>
//               ))}
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 16 }} className="ilh-auto-launches">
//               {filtered.slice(0, 2).map(c => <LaunchCard key={c.slug} car={c} big />)}
//             </div>
//             {filtered.length > 2 && (
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="ilh-auto-launches">
//                 {filtered.slice(2).map(c => <LaunchCard key={c.slug} car={c} />)}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* FEATURED DEALERS */}
//         <section id="featured-dealers" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Trusted Partners</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Featured Dealers</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/automobiles/dealers" style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>View All Dealers →</Link>
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-auto-dealers">
//               {DEALERS.map(d => <DealerCard key={d.slug} d={d} />)}
//             </div>
//           </div>
//         </section>

//         {/* STORIES */}
//         <section id="stories" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Reviews & Intelligence</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>Latest Stories</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/news?category=automobiles" style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>All Auto Stories →</Link>
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-auto-stories">
//               <StoryCard post={STORIES[0]} big />
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                 <StoryCard post={STORIES[1]} />
//                 <StoryCard post={STORIES[2]} />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section style={{ position: 'relative', overflow: 'hidden', background: '#FAFAF8', padding: '100px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
//             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.3 }} />
//             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.3 }} />
//             <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
//           </div>
//           <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
//             <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.55 }}>🚗</div>
//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.5)', marginBottom: 18 }}>We Source. You Drive.</p>
//             <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.12, marginBottom: 20, letterSpacing: '0.015em' }}>
//               Need Sourcing<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Assistance?</em>
//             </h2>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
//               <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.7 }}>◈</span>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
//             </div>
//             <p style={{ fontSize: 14, color: 'rgba(26,26,26,0.45)', fontWeight: 300, lineHeight: 1.85, maxWidth: 540, margin: '0 auto 52px' }}>
//               Looking for a specific model, a rare edition, or need expert guidance on your next acquisition? Our network of trusted dealers and specialists is at your service.
//             </p>
//             <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Link href="/partner-with-us?category=automobiles"
//                 style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 44px', textDecoration: 'none', fontWeight: 700, transition: 'background .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
//               >Get Sourcing Help</Link>
//               <Link href="/curated-partners?category=automobiles"
//                 style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.5)', padding: '16px 44px', textDecoration: 'none', transition: 'all .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
//               >View All Dealers</Link>
//             </div>
//           </div>
//         </section>

//       </main>
//     </>
//   );
// }


// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// // ── NAV LINKS ──────────────────────────────────────────────────
// const NAV_LINKS = [
//   { label: 'Home',                href: '/'                  },
//   { label: 'News',                href: '/news'              },
//   { label: 'Real Estate',         href: '/real-estate'       },
//   { label: 'Automobiles',         href: '/automobiles'       },
//   { label: 'Jewellery & Watches', href: '/jewellery-watches' },
//   { label: 'Weddings',            href: '/weddings'          },
//   { label: 'Curated Partners',    href: '/curated-partners'  },
//   { label: 'Partner With Us',     href: '/partner-with-us'   },
//   { label: 'About',               href: '/about'             },
// ];

// // ── NEW LAUNCHES ───────────────────────────────────────────────
// const LAUNCHES = [
//   {
//     slug: 'rolls-royce-spectre-india',
//     type: 'Electric Coupe',
//     segment: 'Cars',
//     name: 'Rolls-Royce Spectre',
//     brand: 'Rolls-Royce',
//     price: '₹7.5 Cr onwards',
//     power: '577 bhp',
//     img: '/images/hero-cars.jpg',
//     tag: 'New Launch',
//     highlight: 'First all-electric ultra-luxury',
//   },
//   {
//     slug: 'bentley-bentayga-ewb-india',
//     type: 'Ultra Luxury SUV',
//     segment: 'Cars',
//     name: 'Bentley Bentayga EWB',
//     brand: 'Bentley',
//     price: '₹5.25 Cr onwards',
//     power: '542 bhp',
//     img: '/images/automobiles.jpg',
//     tag: 'New Arrival',
//     highlight: 'Extended wheelbase, rear sanctuary',
//   },
//   {
//     slug: 'lamborghini-urus-se-india',
//     type: 'Super SUV',
//     segment: 'Cars',
//     name: 'Lamborghini Urus SE',
//     brand: 'Lamborghini',
//     price: '₹4.18 Cr onwards',
//     power: '789 bhp',
//     img: '/images/placeholder-car.jpg',
//     tag: 'Hybrid',
//     highlight: 'Plug-in hybrid super SUV',
//   },
//   {
//     slug: 'ferrari-roma-spider-india',
//     type: 'Grand Tourer',
//     segment: 'Cars',
//     name: 'Ferrari Roma Spider',
//     brand: 'Ferrari',
//     price: '₹4.02 Cr onwards',
//     power: '620 bhp',
//     img: '/images/automobiles.jpg',
//     tag: 'Limited',
//     highlight: 'Open-top Italian perfection',
//   },
//   {
//     slug: 'ducati-panigale-v4-sp2',
//     type: 'Superbike',
//     segment: 'Bikes',
//     name: 'Ducati Panigale V4 SP2',
//     brand: 'Ducati',
//     price: '₹64.98 L onwards',
//     power: '215.5 bhp',
//     img: '/images/Rolls-Royce.jpg',
//     tag: 'Track Ready',
//     highlight: 'Track-derived performance',
//   },
// //   {
// //     slug: 'triumph-speed-400-india',
// //     type: 'Roadster',
// //     segment: 'Bikes',
// //     name: 'Triumph Speed Triple 1200 RS',
// //     brand: 'Triumph',
// //     price: '₹19.45 L onwards',
// //     power: '177 bhp',
// //     img: '/images/bike-triumph.jpg',
// //     tag: 'New Launch',
// //     highlight: 'British engineering mastery',
// //   },
// ];

// // ── FEATURED DEALERS ───────────────────────────────────────────
// const DEALERS = [
//   {
//     slug: 'navnit-motors-mumbai',
//     name: 'Navnit Motors',
//     brands: ['Rolls-Royce', 'Bentley', 'Lamborghini'],
//     city: 'Mumbai',
//     established: '1952',
//     img: '/images/dealer-navnit.jpg',
//     specialty: 'Ultra Luxury Multi-Brand',
//     rating: '4.9',
//   },
//   {
//     slug: 'performance-cars-delhi',
//     name: 'Performance Cars',
//     brands: ['Ferrari', 'Maserati', 'Lotus'],
//     city: 'New Delhi',
//     established: '1998',
//     img: '/images/dealer-performance.jpg',
//     specialty: 'Italian Sports Cars',
//     rating: '4.8',
//   },
//   {
//     slug: 'bimal-auto-agency-mumbai',
//     name: 'Bimal Auto Agency',
//     brands: ['Porsche', 'Aston Martin'],
//     city: 'Mumbai',
//     established: '1963',
//     img: '/images/dealer-bimal.jpg',
//     specialty: 'Performance & GT Cars',
//     rating: '4.9',
//   },
//   {
//     slug: 'infinity-cars-mumbai',
//     name: 'Infinity Cars',
//     brands: ['Mercedes-Benz AMG', 'BMW M'],
//     city: 'Mumbai',
//     established: '2005',
//     img: '/images/dealer-infinity.jpg',
//     specialty: 'German Performance',
//     rating: '4.7',
//   },
// ];

// // ── EDITORIAL STORIES ──────────────────────────────────────────
// const STORIES = [
//   {
//     slug: 'rolls-royce-spectre-india-launch',
//     category: 'Buyers Guide',
//     title: 'The 7 Best Luxury SUVs Money Can Buy in India Right Now',
//     excerpt: 'From Bentley Bentayga to Lamborghini Urus — the definitive ranking for India\'s most discerning drivers.',
//     img: '/images/automobiles.jpg',
//     author: 'Arjun Kapoor',
//     date: 'Apr 18, 2026',
//     readTime: 6,
//   },
//   {
//     slug: 'rolls-royce-spectre-india-launch',
//     category: 'Collector Culture',
//     title: 'Collectible Supercars: The Machines Worth Investing in Right Now',
//     excerpt: 'From limited-run Ferrari specials to Porsche RS variants, these are the cars that appreciate while you enjoy them.',
//     img: '/images/hero-cars.jpg',
//     author: 'Vikram Oberoi',
//     date: 'Apr 12, 2026',
//     readTime: 8,
//   },
//   {
//     slug: 'rolls-royce-spectre-india-launch',
//     category: 'First Drive',
//     title: 'Rolls-Royce Spectre Arrives in India: The First All-Electric Ultra-Luxury Car',
//     excerpt: 'Silent, powerful, and unmistakably Rolls-Royce. We drive the Spectre on India\'s most scenic roads.',
//     img: '/images/placeholder-car.jpg',
//     author: 'Vikram Oberoi',
//     date: 'Apr 22, 2026',
//     readTime: 7,
//   },
// ];

// // ── ILH LOGO ──────────────────────────────────────────────────
// function ILHLogo({ size = 36 }: { size?: number }) {
//   const gold = '#C9A84C', emerald = '#2A7A6A';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
//       <path d="M40 62C40 62 34 50 33 40C32 30 36 22 40 18C44 14 50 14 52 20C54 26 48 32 44 37C40 42 40 48 42 54C44 60 40 62 40 62Z" fill={gold} opacity="0.9"/>
//       <path d="M44 28C52 20 64 16 66 20C68 24 62 32 54 36C48 39 44 36 44 36" stroke={gold} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <path d="M42 34C50 22 62 12 68 14C72 16 68 28 60 34C54 38 42 36 42 36" stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
//       <ellipse cx="30" cy="44" rx="5" ry="2.5" fill={emerald} transform="rotate(-30 30 44)" opacity="0.8"/>
//       <ellipse cx="26" cy="50" rx="5" ry="2.5" fill={emerald} transform="rotate(-20 26 50)" opacity="0.7"/>
//       <ellipse cx="28" cy="38" rx="4.5" ry="2"  fill={emerald} transform="rotate(-45 28 38)" opacity="0.7"/>
//       <circle cx="52" cy="12" r="1.5" fill={gold}/>
//       <circle cx="56" cy="10" r="1.2" fill={gold} opacity="0.8"/>
//     </svg>
//   );
// }

// // ── NAVBAR ────────────────────────────────────────────────────
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   return (
//     <>
//       <header style={{
//         position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
//         background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.88)',
//         backdropFilter: 'blur(12px)', transition: 'background 0.4s ease',
//         boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
//       }}>
//         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.7 }} />
//         <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

//           <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
//             <ILHLogo size={40} />
//             <div style={{ lineHeight: 1 }}>
//               <div style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
//               <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.45)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//             </div>
//           </Link>

//           <nav className="ilh-auto-nav" style={{ display: 'flex', alignItems: 'center' }}>
//             {NAV_LINKS.map(link => {
//               const isActive = link.href === '/automobiles';
//               return (
//                 <Link key={link.href} href={link.href}
//                   style={{
//                     fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
//                     color: isActive ? '#DFC27A' : link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)',
//                     textDecoration: 'none', padding: '8px 10px',
//                     borderBottom: isActive ? '1px solid #C9A84C' : '1px solid transparent',
//                     fontWeight: isActive ? 500 : 400, transition: 'color .2s', whiteSpace: 'nowrap',
//                     ...(link.href === '/partner-with-us' ? { border: '1px solid rgba(201,168,76,0.3)', padding: '6px 10px', marginLeft: 4 } : {}),
//                   }}
//                   onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#DFC27A'; }}
//                   onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)'; }}
//                 >{link.label}</Link>
//               );
//             })}
//           </nav>

//           <button className="ilh-auto-ham" onClick={() => setMenuOpen(!menuOpen)}
//             style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 8, display: 'none' }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               {menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//             </svg>
//           </button>
//         </div>

//         <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: menuOpen ? 600 : 0, transition: 'max-height 0.35s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           {NAV_LINKS.map(link => (
//             <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
//               style={{ display: 'block', padding: '14px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: link.href === '/automobiles' ? '#DFC27A' : 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
//               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//               onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//             >{link.label}</Link>
//           ))}
//         </div>
//         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
//       </header>

//       <style>{`
//         .ilh-auto-nav { display: flex !important; }
//         .ilh-auto-ham { display: none !important; }
//         @media(max-width:1100px){ .ilh-auto-nav { display: none !important; } .ilh-auto-ham { display: flex !important; } }
//       `}</style>
//     </>
//   );
// }

// // ── LAUNCH CARD ───────────────────────────────────────────────
// function LaunchCard({ car, big = false }: { car: typeof LAUNCHES[0]; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/automobiles/${car.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: '#0F0F0F', border: `1px solid rgba(201,168,76,${hov ? '0.35' : '0.1'})`, transition: 'all .3s', boxShadow: hov ? '0 12px 40px rgba(0,0,0,0.3)' : 'none' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', paddingBottom: big ? '55%' : '62%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={car.img} alt={car.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .8s ease', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
//           sizes={big ? '50vw' : '33vw'}
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)', transition: 'background .4s' }} />

//         {/* Segment badge top-left */}
//         <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: car.segment === 'Bikes' ? '#DFC27A' : '#C9A84C', background: 'rgba(10,10,10,0.88)', padding: '5px 10px', border: `1px solid ${car.segment === 'Bikes' ? 'rgba(223,192,122,0.4)' : 'rgba(201,168,76,0.3)'}` }}>
//             {car.segment}
//           </span>
//         </div>

//         {/* Tag top-right */}
//         <div style={{ position: 'absolute', top: 14, right: 14 }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAFAF8', background: car.tag === 'Limited' ? 'rgba(180,50,50,0.85)' : car.tag === 'Hybrid' ? 'rgba(42,122,106,0.9)' : 'rgba(201,168,76,0.9)', padding: '5px 10px', color: car.tag === 'Hybrid' || car.tag === 'New Launch' || car.tag === 'Track Ready' ? '#FAFAF8' : '#0A0A0A' }}>
//             {car.tag}
//           </span>
//         </div>

//         {/* Bottom highlight strip */}
//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 18px', background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)' }}>
//           <p style={{ fontSize: 9, color: 'rgba(201,168,76,0.6)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{car.highlight}</p>
//         </div>
//       </div>

//       {/* Content */}
//       <div style={{ padding: '20px 22px 24px' }}>
//         <div style={{ width: hov ? 36 : 18, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width .35s ease' }} />

//         <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 5 }}>{car.brand}</p>
//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: big ? 21 : 18, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em', lineHeight: 1.25, transition: 'color .25s' }}>
//           {car.name}
//         </h3>
//         <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 16, letterSpacing: '0.06em' }}>{car.type}</p>

//         {/* Stats */}
//         <div style={{ display: 'flex', gap: 20, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
//           <div>
//             <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', marginBottom: 3 }}>Power</p>
//             <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{car.power}</p>
//           </div>
//         </div>

//         {/* Price + CTA */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>
//             <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', marginBottom: 3 }}>Starting from</p>
//             <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#C9A84C', letterSpacing: '0.02em' }}>{car.price}</p>
//           </div>
//           <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: hov ? '#0A0A0A' : '#C9A84C', background: hov ? '#C9A84C' : 'transparent', border: '1px solid rgba(201,168,76,0.4)', padding: '8px 14px', transition: 'all .3s' }}>
//             Enquire →
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── DEALER CARD ───────────────────────────────────────────────
// function DealerCard({ d }: { d: typeof DEALERS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/automobiles/dealers/${d.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#fff', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.12'})`, transition: 'all .3s', boxShadow: hov ? '0 6px 24px rgba(0,0,0,0.07)' : 'none' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', paddingBottom: '56%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={d.img} alt={d.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//           sizes="25vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         {/* Est badge */}
//         <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.82)', border: '1px solid rgba(201,168,76,0.25)', padding: '4px 10px' }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)' }}>Est. {d.established}</span>
//         </div>
//       </div>

//       {/* Content */}
//       <div style={{ padding: '20px 22px 24px' }}>
//         <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />

//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 400, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 5, letterSpacing: '0.01em', transition: 'color .25s' }}>{d.name}</h3>
//         <p style={{ fontSize: 10, color: 'rgba(107,101,88,0.55)', marginBottom: 14, letterSpacing: '0.04em' }}>📍 {d.city}</p>

//         {/* Brands */}
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
//           {d.brands.map(b => (
//             <span key={b} style={{ fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', padding: '4px 8px' }}>{b}</span>
//           ))}
//         </div>

//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 14 }}>
//           <p style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)', letterSpacing: '0.06em' }}>{d.specialty}</p>
//           <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', opacity: hov ? 1 : 0, transition: 'opacity .25s' }}>Visit →</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── STORY CARD ────────────────────────────────────────────────
// function StoryCard({ post, big = false }: { post: typeof STORIES[0]; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: big ? '54%' : '60%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={post.img} alt={post.title} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//           sizes={big ? '50vw' : '33vw'}
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 55%)' }} />}
//         <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
//           {post.category}
//         </span>
//       </div>
//       <div style={{ padding: big ? '24px 26px 28px' : '18px 20px 22px' }}>
//         <div style={{ width: hov ? 38 : 18, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontSize: big ? 21 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//           {post.title}
//         </h3>
//         <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//           {post.excerpt}
//         </p>
//         <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
//           <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)' }}>{post.date} · {post.readTime} min</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── FOOTER ────────────────────────────────────────────────────
// // function Footer() {
// //   const CATS = [
// //     { name: 'Real Estate', slug: 'real-estate' },
// //     { name: 'Automobiles', slug: 'automobiles' },
// //     { name: 'Jewellery & Watches', slug: 'jewellery-watches' },
// //     { name: 'Weddings', slug: 'weddings' },
// //     { name: 'Curated Partners', slug: 'curated-partners' },
// //   ];
// // //   return (
// // //     <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '64px 32px 32px' }}>
// // //       <div style={{ maxWidth: 1280, margin: '0 auto' }}>
// // //         <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 52 }} className="ilh-auto-footer">
// // //           <div>
// // //             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
// // //               <ILHLogo size={36} />
// // //               <div>
// // //                 <div style={{ fontFamily: 'Georgia,serif', fontSize: 15, color: '#DFC27A', letterSpacing: '0.28em' }}>INDIAN</div>
// // //                 <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.35)', letterSpacing: '0.4em', marginTop: 2 }}>LUXURY HOUSE</div>
// // //               </div>
// // //             </div>
// // //             <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, fontWeight: 300, maxWidth: 250, marginBottom: 24 }}>
// // //               Where India Meets Global Luxury. Celebrating the world of luxury through an India-first lens.
// // //             </p>
// // //             <div style={{ display: 'flex', gap: 18 }}>
// // //               {['Instagram', 'LinkedIn'].map(s => (
// // //                 <a key={s} href="#" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.38)', textDecoration: 'none', transition: 'color .2s' }}
// // //                   onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
// // //                   onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.38)')}
// // //                 >{s}</a>
// // //               ))}
// // //             </div>
// // //           </div>
// // //           <div>
// // //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Categories</p>
// // //             {CATS.map(c => (
// // //               <Link key={c.slug} href={`/${c.slug}`}
// // //                 style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', marginBottom: 12, letterSpacing: '0.04em', transition: 'color .2s' }}
// // //                 onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
// // //                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
// // //               >{c.name}</Link>
// // //             ))}
// // //           </div>
// // //           <div>
// // //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Navigate</p>
// // //             {[{ l: 'Home', h: '/' }, { l: 'News', h: '/news' }, { l: 'Partner With Us', h: '/partner-with-us' }, { l: 'About', h: '/about' }].map(item => (
// // //               <Link key={item.h} href={item.h}
// // //                 style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', marginBottom: 12, letterSpacing: '0.04em', transition: 'color .2s' }}
// // //                 onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
// // //                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
// // //               >{item.l}</Link>
// // //             ))}
// // //           </div>
// // //           <div>
// // //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Contact</p>
// // //             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginBottom: 6 }}>Partnerships:</p>
// // //             <a href="mailto:hello@indianluxuryhouse.com"
// // //               style={{ fontSize: 12, color: 'rgba(201,168,76,0.5)', textDecoration: 'none', display: 'block', marginBottom: 28, transition: 'color .2s' }}
// // //               onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
// // //               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.5)')}
// // //             >hello@indianluxuryhouse.com</a>
// // //             <p style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.28)', marginBottom: 12 }}>Newsletter</p>
// // //             <div style={{ display: 'flex' }}>
// // //               <input type="email" placeholder="your@email.com"
// // //                 style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.18)', color: '#DFC27A', fontSize: 11, padding: '9px 12px', outline: 'none', fontFamily: 'inherit', minWidth: 0 }}
// // //               />
// // //               <button style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', padding: '9px 14px', cursor: 'pointer', fontSize: 14, fontWeight: 700, transition: 'background .2s' }}
// // //                 onMouseEnter={e => ((e.target as HTMLElement).style.background = '#DFC27A')}
// // //                 onMouseLeave={e => ((e.target as HTMLElement).style.background = '#C9A84C')}
// // //               >→</button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)', marginBottom: 24 }} />
// // //         <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
// // //           <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} Indian Luxury House. All rights reserved.</p>
// // //           <div style={{ display: 'flex', gap: 22 }}>
// // //             {['Privacy Policy', 'Terms of Use'].map(l => (
// // //               <a key={l} href="#" style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color .2s' }}
// // //                 onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
// // //                 onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.16)')}
// // //               >{l}</a>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <style>{`
// // //         @media(max-width:767px){ .ilh-auto-footer { grid-template-columns: 1fr !important; gap: 32px !important; } }
// // //         @media(min-width:768px) and (max-width:1023px){ .ilh-auto-footer { grid-template-columns: 1fr 1fr !important; } }
// // //       `}</style>
// // //     </footer>
// // //   );
// // }

// // ── AUTOMOBILES PAGE (MAIN) ───────────────────────────────────
// export default function AutomobilesPage() {
//   const [activeSegment, setActiveSegment] = useState('All');
//   const segments = ['All', 'Cars', 'Bikes'];

//   const filtered = activeSegment === 'All'
//     ? LAUNCHES
//     : LAUNCHES.filter(c => c.segment === activeSegment);

//   return (
//     <>
//       <Navbar />
//       <main>

//         {/* ══ HERO ═════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
//           <Image
//             src="/images/automobiles.jpg"
//             alt="Luxury Automobiles India"
//             fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             quality={95}
//           />
//           {/* Overlays — deeper on right for text contrast */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0.1) 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(10,10,10,0.65) 0%, transparent 55%)' }} />
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

//           {/* Content */}
//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 900 }}>

//             {/* Breadcrumb */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
//               >Home</Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>Automobiles</span>
//             </div>

//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'autoFadeUp .8s .1s ease both' }}>
//               Indian Luxury House
//             </p>

//             <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(44px,8vw,100px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.03, marginBottom: 22, letterSpacing: '0.015em', animation: 'autoFadeUp .8s .2s ease both' }}>
//               Auto<em style={{ color: '#DFC27A', fontStyle: 'italic' }}>mobiles</em>
//             </h1>

//             <p style={{ fontSize: 16, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 44, letterSpacing: '0.02em', animation: 'autoFadeUp .8s .3s ease both' }}>
//               Luxury performance, prestige, and collector culture — the finest cars and motorcycles available in India, curated for connoisseurs.
//             </p>

//             {/* Quick nav */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'autoFadeUp .8s .4s ease both' }}>
//               {['New Launches', 'Featured Dealers', 'Stories'].map(tab => (
//                 <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`}
//                   style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', textDecoration: 'none', transition: 'all .25s' }}
//                   onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; }}
//                 >{tab}</a>
//               ))}
//             </div>
//           </div>

//           {/* Scroll indicator */}
//           <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
//             <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
//             <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
//           </div>
//         </section>

//         <style>{`
//           @keyframes autoFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//           @media(max-width:767px){
//             .ilh-auto-launches  { grid-template-columns: 1fr !important; }
//             .ilh-auto-dealers   { grid-template-columns: repeat(2,1fr) !important; }
//             .ilh-auto-stories   { grid-template-columns: 1fr !important; }
//           }
//           @media(max-width:480px){
//             .ilh-auto-dealers   { grid-template-columns: 1fr !important; }
//           }
//           @media(min-width:768px) and (max-width:1023px){
//             .ilh-auto-launches  { grid-template-columns: repeat(2,1fr) !important; }
//             .ilh-auto-dealers   { grid-template-columns: repeat(2,1fr) !important; }
//           }
//         `}</style>

//         {/* ══ NEW LAUNCHES ═════════════════════════════════════ */}
//         <section id="new-launches" style={{ background: '#0A0A0A', padding: '88px 32px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>

//             {/* Header */}
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Cars & Bikes</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>New Launches</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/automobiles/all"
//                 style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>
//                 View All →
//               </Link>
//             </div>

//             {/* Segment filter */}
//             <div style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.1)', width: 'fit-content' }}>
//               {segments.map(s => (
//                 <button key={s} onClick={() => setActiveSegment(s)}
//                   style={{
//                     fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
//                     padding: '10px 24px', border: 'none', cursor: 'pointer', background: 'transparent',
//                     color: activeSegment === s ? '#DFC27A' : 'rgba(201,168,76,0.38)',
//                     borderBottom: activeSegment === s ? '2px solid #C9A84C' : '2px solid transparent',
//                     transition: 'all .2s', fontWeight: activeSegment === s ? 500 : 400,
//                   }}
//                   onMouseEnter={e => { if (activeSegment !== s) e.currentTarget.style.color = '#C9A84C'; }}
//                   onMouseLeave={e => { if (activeSegment !== s) e.currentTarget.style.color = 'rgba(201,168,76,0.38)'; }}
//                 >{s}</button>
//               ))}
//             </div>

//             {/* Featured top 2 large + rest 3-col */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 16 }} className="ilh-auto-launches">
//               {filtered.slice(0, 2).map(c => <LaunchCard key={c.slug} car={c} big />)}
//             </div>
//             {filtered.length > 2 && (
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="ilh-auto-launches">
//                 {filtered.slice(2).map(c => <LaunchCard key={c.slug} car={c} />)}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ══ FEATURED DEALERS ═════════════════════════════════ */}
//         <section id="featured-dealers" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Trusted Partners</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Featured Dealers</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/automobiles/dealers"
//                 style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>
//                 View All Dealers →
//               </Link>
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-auto-dealers">
//               {DEALERS.map(d => <DealerCard key={d.slug} d={d} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ STORIES ══════════════════════════════════════════ */}
//         <section id="stories" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Reviews & Intelligence</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>Latest Stories</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/news?category=automobiles"
//                 style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>
//                 All Auto Stories →
//               </Link>
//             </div>

//             {/* Big left + 2 stacked right */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-auto-stories">
//               <StoryCard post={STORIES[0]} big />
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                 <StoryCard post={STORIES[1]} />
//                 <StoryCard post={STORIES[2]} />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ══ CTA ═════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', overflow: 'hidden', background: '#FAFAF8', padding: '100px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           {/* Decorative */}
//           <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
//             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.3 }} />
//             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.3 }} />
//             <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
//             <div style={{ position: 'absolute', left: -80, bottom: -100, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,122,106,0.06) 0%, transparent 70%)' }} />
//           </div>

//           <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
//             <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.55 }}>🚗</div>

//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.5)', marginBottom: 18 }}>We Source. You Drive.</p>

//             <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.12, marginBottom: 20, letterSpacing: '0.015em' }}>
//               Need Sourcing<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Assistance?</em>
//             </h2>

//             {/* Gold divider */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
//               <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.7 }}>◈</span>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
//             </div>

//             <p style={{ fontSize: 14, color: 'rgba(26,26,26,0.45)', fontWeight: 300, lineHeight: 1.85, maxWidth: 540, margin: '0 auto 52px' }}>
//               Looking for a specific model, a rare edition, or need expert guidance on your next acquisition? Our network of trusted dealers and specialists is at your service.
//             </p>

//             <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Link href="/partner-with-us?category=automobiles"
//                 style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 44px', textDecoration: 'none', fontWeight: 700, transition: 'background .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
//               >Get Sourcing Help</Link>

//               <Link href="/curated-partners?category=automobiles"
//                 style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.5)', padding: '16px 44px', textDecoration: 'none', transition: 'all .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
//               >View All Dealers</Link>
//             </div>
//           </div>
//         </section>

//       </main>
      
//     </>
//   );
// }