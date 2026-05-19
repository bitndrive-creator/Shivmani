'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ── TYPES ─────────────────────────────────────────────────────
interface Post {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  homepage?: {
    heroPriority?: number;
    sectionPriority?: number;
    featuredRank?: number;
  };
}

// ── IMAGE MAPS ─────────────────────────────────────────────────
const CAT_IMAGE_MAP: Record<string, string> = {
  'Real Estate':         '/images/real-estate.jpg',
  'Automobiles':         '/images/automobiles.jpg',
  'Jewellery & Watches': '/images/Jewellery.png',
  'Weddings':            '/images/hero-weddings.jpg',
  'Curated Partners':    '/images/hero-partners.jpg',
  'Beauty':              '/images/hero-beauty.jpg',
  'Hospitality':         '/images/hero-hospitality.jpg',
};

const CAT_SLUG_MAP: Record<string, string> = {
  'Real Estate':         'real-estate',
  'Automobiles':         'automobiles',
  'Jewellery & Watches': 'jewellery-watches',
  'Weddings':            'weddings',
  'Curated Partners':    'curated-partners',
  'Beauty':              'beauty',
  'Hospitality':         'hospitality',
};

// ── LUXURY HOTELS ──────────────────────────────────────────────
const HOTELS = [
  { name: 'The Oberoi Udaivilas',    location: 'Udaipur, Rajasthan', rooms: '87 Suites', img: '/images/hotel-oberoi.jpg'    },
  { name: 'Taj Lake Palace',         location: 'Udaipur, Rajasthan', rooms: '83 Rooms',  img: '/images/hotel-taj.jpg'       },
  { name: 'Aman New Delhi',          location: 'New Delhi',          rooms: '182 Rooms', img: '/images/hotel-aman.jpg'      },
  { name: 'Six Senses Fort Barwara', location: 'Rajasthan',          rooms: '48 Suites', img: '/images/hotel-sixsenses.jpg' },
];

// ── FINE DINING ────────────────────────────────────────────────
const DINING = [
  { name: 'Indian Accent',      location: 'New Delhi', cuisine: 'Modern Indian',        img: '/images/dining-indianaccent.jpg' },
  { name: 'Wasabi by Morimoto', location: 'Mumbai',    cuisine: 'Japanese Fine Dining', img: '/images/dining-wasabi.jpg'       },
  { name: 'Bukhara',            location: 'New Delhi', cuisine: 'North-West Frontier',  img: '/images/dining-bukhara.jpg'      },
  { name: 'Bombay Canteen',     location: 'Mumbai',    cuisine: 'Contemporary Indian',  img: '/images/dining-canteen.jpg'      },
];

// ── PRIVATE CLUBS ──────────────────────────────────────────────
const CLUBS = [
  { name: 'The Willingdon Sports Club', location: 'Mumbai',    founded: '1918', img: '/images/club-willingdon.jpg' },
  { name: 'Delhi Golf Club',            location: 'New Delhi', founded: '1931', img: '/images/club-delhigolf.jpg'  },
  { name: 'Bangalore Club',             location: 'Bengaluru', founded: '1868', img: '/images/club-bangalore.jpg'  },
];

// ── FORMAT DATE ────────────────────────────────────────────────
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return iso; }
}

// ── SECTION HEADER ─────────────────────────────────────────────
function SectionHeader({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div style={{ marginBottom: 0 }}>
      <p style={{ fontSize: 15, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{eyebrow}</p>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: dark ? '#FAFAF8' : '#1A1A1A', letterSpacing: '0.02em', lineHeight: 1.2 }}>{title}</h2>
      <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
    </div>
  );
}

// ── BLOG CARD (API) ────────────────────────────────────────────
function BlogCard({ post, big = false }: { post: Post; big?: boolean }) {
  const [hov, setHov] = useState(false);
  const catSlug = CAT_SLUG_MAP[post.category] ?? post.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--+/g, '-');
  const imgSrc = post.coverImage
    ? post.coverImage.startsWith('http')
      ? post.coverImage
      : post.coverImage.startsWith('/uploads/')
        ? `https://api.indianluxuryhouse.com${post.coverImage}`
        : `https://api.indianluxuryhouse.com/uploads/${post.coverImage}`
    : CAT_IMAGE_MAP[post.category] ?? '/images/hero-hospitality.jpg';

  return (
    <Link href={`/${catSlug}/${post.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', height: '100%', border: '1px solid rgba(0,0,0,0.06)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: big ? '55%' : '62%', overflow: 'hidden', background: '#1A1A1A' }}>
        <img src={imgSrc} alt={post.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 55%)' }} />}
        <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 14, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
          {post.category}
        </span>
      </div>
      <div style={{ padding: big ? '26px 28px 30px' : '18px 20px 22px' }}>
        <div style={{ width: hov ? 40 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s ease' }} />
        <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontSize: big ? 22 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.title}
        </h3>
        <p style={{ fontSize: 16, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
          <div>
            <span style={{ fontSize: 15, letterSpacing: '0.1em', color: 'rgba(107,101,88,0.5)', marginRight: 4 }}>By</span>
            <span style={{ fontSize: 15, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
          </div>
          <span style={{ fontSize: 15, color: 'rgba(107,101,88,0.45)', letterSpacing: '0.04em' }}>{formatDate(post.createdAt)} · {post.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}

// ── BLOG SKELETON ──────────────────────────────────────────────
function BlogSkeleton({ big = false }: { big?: boolean }) {
  return (
    <div style={{ background: '#FAFAF8', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}>
      <div style={{ paddingBottom: big ? '55%' : '62%', background: 'linear-gradient(90deg,#f0ebe0 25%,#e8e2d4 50%,#f0ebe0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: big ? '26px 28px 30px' : '18px 20px 22px' }}>
        <div style={{ height: 1, width: 20, background: '#C9A84C', marginBottom: 14 }} />
        <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 8, width: '88%' }} />
        <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 16, width: '65%' }} />
        <div style={{ height: 12, background: '#ede8dd', borderRadius: 2, width: '55%' }} />
      </div>
    </div>
  );
}

// ── HOTEL CARD ─────────────────────────────────────────────────
function HotelCard({ h }: { h: typeof HOTELS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ cursor: 'default' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'relative', paddingBottom: '72%', overflow: 'hidden', background: '#1A1A1A' }}>
        <img src={h.img} alt={h.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.07)' : 'scale(1)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.52)' : 'rgba(0,0,0,0.3)', transition: 'background .4s' }} />
        <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(201,168,76,${hov ? '0.55' : '0'})`, transition: 'all .4s', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,168,76,0.3)', padding: '5px 10px' }}>
          <span style={{ fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C' }}>{h.rooms}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px 22px', background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 100%)' }}>
          <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginBottom: 10, transition: 'width .4s ease' }} />
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', lineHeight: 1.25, marginBottom: 4, letterSpacing: '0.02em', transform: hov ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform .35s' }}>{h.name}</h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{h.location}</p>
        </div>
      </div>
    </div>
  );
}

// ── DINING CARD ────────────────────────────────────────────────
function DiningCard({ d }: { d: typeof DINING[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ background: hov ? '#F5F0E8' : '#fff', border: '1px solid rgba(201,168,76,0.12)', transition: 'all .25s', cursor: 'default' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden', background: '#1A1A1A' }}>
        <img src={d.img} alt={d.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width .3s' }} />
        <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 5, letterSpacing: '0.01em', transition: 'color .25s' }}>{d.name}</h3>
        <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 8, letterSpacing: '0.04em', fontWeight: 300 }}>{d.cuisine}</p>
        <span style={{ fontSize: 15, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>{d.location}</span>
      </div>
    </div>
  );
}

// ── CLUB CARD ──────────────────────────────────────────────────
function ClubCard({ c }: { c: typeof CLUBS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ cursor: 'default' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'relative', paddingBottom: '65%', overflow: 'hidden', background: '#1A1A1A' }}>
        <img src={c.img} alt={c.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.52)' : 'rgba(0,0,0,0.32)', transition: 'background .4s' }} />
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,168,76,0.3)', padding: '5px 10px' }}>
          <span style={{ fontSize: 14, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A84C' }}>Est. {c.founded}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 20px', background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 100%)' }}>
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', marginBottom: 4, transform: hov ? 'translateY(-3px)' : 'translateY(0)', transition: 'transform .35s', letterSpacing: '0.02em' }}>{c.name}</h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>{c.location}</p>
          <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginTop: 10, transition: 'width .4s ease' }} />
        </div>
      </div>
    </div>
  );
}

// ── HOSPITALITY PAGE (MAIN) ───────────────────────────────────
export default function HospitalityPage() {
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('https://api.indianluxuryhouse.com/api/editorials');
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: Post[] = await res.json();
        const filtered = data.filter(p => p.isPublished && p.category === 'Hospitality');
        setPosts(filtered);
      } catch (err) {
        console.error('API fetch error:', err);
        setError('Could not load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    const pa = a.homepage?.heroPriority ?? a.homepage?.featuredRank ?? 999;
    const pb = b.homepage?.heroPriority ?? b.homepage?.featuredRank ?? 999;
    if (pa !== pb) return pa - pb;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const featuredPost = sortedPosts[0] ?? null;
  const sidePosts    = sortedPosts.slice(1, 3);
  const bottomPosts  = sortedPosts.slice(3, 6);

  return (
    <>
      <main>

        {/* ══ HERO ═════════════════════════════════════════════ */}
        {/* <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
        
            <img
  src="/images/hosp.jpg"
  alt="Luxury Hospitality"
  style={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  }}
/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.15) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.3), transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 860 }}>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
              >Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: '#C9A84C' }}>Hospitality</span>
            </div> */}

            {/* <p style={{ fontSize: 15, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'hFadeUp .8s .1s ease both' }}>Indian Luxury House</p>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(42px,8vw,96px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, marginBottom: 22, letterSpacing: '0.02em', animation: 'hFadeUp .8s .2s ease both' }}>
              Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Hospitality</em>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 40, letterSpacing: '0.02em', animation: 'hFadeUp .8s .3s ease both' }}>
              India&apos;s palace hotels, fine dining destinations, private members&apos; clubs, and extraordinary experiences — curated for those with an eye for the exceptional.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'hFadeUp .8s .4s ease both' }}>
              {['Hotels', 'Fine Dining', 'Private Clubs', 'Editorial'].map(tab => (
                <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`}
                  style={{ fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', textDecoration: 'none', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; }}
                >{tab}</a>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
          </div>
        </section> */} 
<section className="ilh-h-hero">
  <img src="/images/hosp.jpg" alt="Luxury Hospitality" />
  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.15) 100%)' }} />
  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.3), transparent 65%)' }} />

  <div className="ilh-h-hero-text" style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 860 }}>
    <p style={{ fontSize: 15, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#F0C040', marginBottom: 18, fontWeight: 700, textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}>
      Indian Luxury House
    </p>
    <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(42px,8vw,96px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.05, marginBottom: 22, letterSpacing: '0.02em', textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>
      Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Hospitality</em>
    </h1>
    {/* <p style={{ fontSize: 16, color: 'rgba(250,250,248,0.75)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 40, letterSpacing: '0.02em', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
      India&apos;s palace hotels, fine dining destinations, private members&apos; clubs, and extraordinary experiences — curated for those with an eye for the exceptional.
    </p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {['Hotels', 'Fine Dining', 'Private Clubs', 'Editorial'].map(tab => (
        <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`}
          style={{ fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', textDecoration: 'none', transition: 'all .25s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; }}
        >{tab}</a>
      ))}
    </div> */}
  </div>

  <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <span style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
    <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
  </div>
</section>

<style>{`
  @keyframes hFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

  /* HOSPITALITY HERO */
  .ilh-h-hero { position: relative; width: 100%; background: #0A0A0A; overflow: hidden; }
  .ilh-h-hero img { width: 100% !important; display: block !important; height: auto !important; }

  /* MOBILE */
  @media(max-width:767px){
    .ilh-h-hero { height: 70vw; min-height: 320px; }
    .ilh-h-hero img { height: 100% !important; object-fit: cover !important; object-position: center 20% !important; }
    .ilh-h-hero-text { padding: 0 24px 24px !important; max-width: 100% !important; }
    .ilh-h-4  { grid-template-columns: repeat(2,1fr) !important; }
    .ilh-h-3  { grid-template-columns: 1fr !important; }
    .ilh-h-ed { grid-template-columns: 1fr !important; }
  }

  /* DESKTOP */
  @media(min-width:768px){
    .ilh-h-hero { height: 100vh; }
    .ilh-h-hero img { height: 100vh !important; object-fit: cover !important; object-position: center 30% !important; }
    .ilh-h-hero-text { padding: 0 60px 100px !important; max-width: 860px !important; }
  }

  @media(max-width:480px){
    .ilh-h-4 { grid-template-columns: 1fr !important; }
  }
`}</style>

        {/* ══ LUXURY HOTELS ════════════════════════════════════ */}
        <section id="hotels" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Palace & Heritage Hotels" title="Extraordinary Stays" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-h-4">
              {HOTELS.map((h, i) => <HotelCard key={i} h={h} />)}
            </div>
          </div>
        </section>

        {/* ══ FINE DINING ══════════════════════════════════════ */}
        {/* <section id="fine-dining" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Culinary Excellence" title="Fine Dining" dark />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-h-4">
              {DINING.map((d, i) => <DiningCard key={i} d={d} />)}
            </div>
          </div>
        </section> */}

        {/* ══ PRIVATE CLUBS ════════════════════════════════════ */}
        <section id="private-clubs" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Members Only" title="Private Clubs" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="ilh-h-3">
              {CLUBS.map((c, i) => <ClubCard key={i} c={c} />)}
            </div>
          </div>
        </section>

        {/* ══ EDITORIAL (API DATA) ════════════════════════════ */}
        <section id="editorial" style={{ background: '#FAFAF8', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Stories & Reviews" title="Hospitality Editorial" />
              <Link href="/news?category=hospitality"
                style={{ fontSize: 15, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
                All Hospitality Stories →
              </Link>
            </div>

            {error && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(107,101,88,0.6)' }}>
                <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, marginBottom: 8 }}>Unable to load articles</p>
                <p style={{ fontSize: 16 }}>{error}</p>
              </div>
            )}

            {loading && !error && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-h-ed">
                  <BlogSkeleton big />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <BlogSkeleton /><BlogSkeleton />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-h-3">
                  <BlogSkeleton /><BlogSkeleton /><BlogSkeleton />
                </div>
              </>
            )}

            {!loading && !error && (
              <>
                {sortedPosts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(107,101,88,0.5)' }}>
                    <p style={{ fontFamily: 'Georgia,serif', fontSize: 18 }}>No hospitality articles published yet.</p>
                  </div>
                ) : (
                  <>
                    {featuredPost && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-h-ed">
                        <BlogCard post={featuredPost} big />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                          {sidePosts.map(p => <BlogCard key={p._id} post={p} />)}
                        </div>
                      </div>
                    )}
                    {bottomPosts.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-h-3">
                        {bottomPosts.map(p => <BlogCard key={p._id} post={p} />)}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '110px 32px', background: '#0A0A0A' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,122,106,0.1) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
          </div>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.7 }}>🏛️</div>
            <p style={{ fontSize: 15, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 18 }}>An Invitation to Indulge</p>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.12, marginBottom: 22, letterSpacing: '0.015em' }}>
              Experience India&apos;s<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Finest Hospitality</em>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
              <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
            </div>
            <p style={{ fontSize: 15, color: 'rgba(250,250,248,0.38)', fontWeight: 300, lineHeight: 1.85, maxWidth: 560, margin: '0 auto 52px' }}>
              Connect with India&apos;s most celebrated hotels, restaurants, and private clubs — all curated by Indian Luxury House for the most discerning travellers.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/curated-partners?category=hospitality"
                style={{ fontSize: 14, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 44px', textDecoration: 'none', fontWeight: 700, transition: 'background .3s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
              >Explore Hospitality Partners</Link>
              <Link href="/partner-with-us"
                style={{ fontSize: 14, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.45)', padding: '16px 44px', textDecoration: 'none', transition: 'all .3s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; }}
              >List Your Business</Link>
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

// // ── TYPES ─────────────────────────────────────────────────────
// interface Post {
//   _id: string;
//   title: string;
//   slug: string;
//   coverImage?: string;
//   category: string;
//   excerpt: string;
//   author: string;
//   readTime: number;
//   isFeatured: boolean;
//   isPublished: boolean;
//   createdAt: string;
//   homepage?: {
//     heroPriority?: number;
//     sectionPriority?: number;
//     featuredRank?: number;
//   };
// }

// // ── IMAGE MAPS ─────────────────────────────────────────────────
// const CAT_IMAGE_MAP: Record<string, string> = {
//   'Real Estate':         '/images/real-estate.jpg',
//   'Automobiles':         '/images/automobiles.jpg',
//   'Jewellery & Watches': '/images/Jewellery.png',
//   'Weddings':            '/images/hero-weddings.jpg',
//   'Curated Partners':    '/images/hero-partners.jpg',
//   'Beauty':              '/images/hero-beauty.jpg',
//   'Hospitality':         '/images/hero-hospitality.jpg',
// };

// const CAT_SLUG_MAP: Record<string, string> = {
//   'Real Estate':         'real-estate',
//   'Automobiles':         'automobiles',
//   'Jewellery & Watches': 'jewellery-watches',
//   'Weddings':            'weddings',
//   'Curated Partners':    'curated-partners',
//   'Beauty':              'beauty',
//   'Hospitality':         'hospitality',
// };

// // ── LUXURY HOTELS ──────────────────────────────────────────────
// const HOTELS = [
//   { name: 'The Oberoi Udaivilas',   location: 'Udaipur, Rajasthan',  rooms: '87 Suites',  img: '/images/hotel-oberoi.jpg'    },
//   { name: 'Taj Lake Palace',        location: 'Udaipur, Rajasthan',  rooms: '83 Rooms',   img: '/images/hotel-taj.jpg'       },
//   { name: 'Aman New Delhi',         location: 'New Delhi',           rooms: '182 Rooms',  img: '/images/hotel-aman.jpg'      },
//   { name: 'Six Senses Fort Barwara',location: 'Rajasthan',           rooms: '48 Suites',  img: '/images/hotel-sixsenses.jpg' },
// ];

// // ── FINE DINING ────────────────────────────────────────────────
// const DINING = [
//   { name: 'Indian Accent',      location: 'New Delhi',  cuisine: 'Modern Indian',         img: '/images/dining-indianaccent.jpg' },
//   { name: 'Wasabi by Morimoto', location: 'Mumbai',     cuisine: 'Japanese Fine Dining',  img: '/images/dining-wasabi.jpg'       },
//   { name: 'Bukhara',            location: 'New Delhi',  cuisine: 'North-West Frontier',   img: '/images/dining-bukhara.jpg'      },
//   { name: 'Bombay Canteen',     location: 'Mumbai',     cuisine: 'Contemporary Indian',   img: '/images/dining-canteen.jpg'      },
// ];

// // ── PRIVATE CLUBS ──────────────────────────────────────────────
// const CLUBS = [
//   { name: 'The Willingdon Sports Club', location: 'Mumbai',    founded: '1918', img: '/images/club-willingdon.jpg' },
//   { name: 'Delhi Golf Club',            location: 'New Delhi', founded: '1931', img: '/images/club-delhigolf.jpg'  },
//   { name: 'Bangalore Club',             location: 'Bengaluru', founded: '1868', img: '/images/club-bangalore.jpg'  },
// ];

// // ── FORMAT DATE ────────────────────────────────────────────────
// function formatDate(iso: string): string {
//   try {
//     return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
//   } catch { return iso; }
// }

// // ── SECTION HEADER ─────────────────────────────────────────────
// function SectionHeader({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
//   return (
//     <div style={{ marginBottom: 0 }}>
//       <p style={{ fontSize: 15, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{eyebrow}</p>
//       <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: dark ? '#FAFAF8' : '#1A1A1A', letterSpacing: '0.02em', lineHeight: 1.2 }}>{title}</h2>
//       <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//     </div>
//   );
// }

// // ── BLOG CARD (API) ────────────────────────────────────────────
// function BlogCard({ post, big = false }: { post: Post; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   const catSlug = CAT_SLUG_MAP[post.category] ?? post.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--+/g, '-');
//   const imgSrc = post.coverImage
//     ? post.coverImage.startsWith('http')
//       ? post.coverImage
//       : post.coverImage.startsWith('/uploads/')
//         ? `https://shivmani-baceknd.onrender.com${post.coverImage}`
//         : `https://shivmani-baceknd.onrender.com/uploads/${post.coverImage}`
//     : CAT_IMAGE_MAP[post.category] ?? '/images/hero-hospitality.jpg';

//   return (
//     <Link href={`/${catSlug}/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', height: '100%', border: '1px solid rgba(0,0,0,0.06)' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: big ? '55%' : '62%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={imgSrc} alt={post.title} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//           sizes={big ? '50vw' : '33vw'}
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 55%)' }} />}
//         <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 14, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
//           {post.category}
//         </span>
//       </div>
//       <div style={{ padding: big ? '26px 28px 30px' : '18px 20px 22px' }}>
//         <div style={{ width: hov ? 40 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s ease' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontSize: big ? 22 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//           {post.title}
//         </h3>
//         <p style={{ fontSize: 16, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//           {post.excerpt}
//         </p>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
//           <div>
//             <span style={{ fontSize: 15, letterSpacing: '0.1em', color: 'rgba(107,101,88,0.5)', marginRight: 4 }}>By</span>
//             <span style={{ fontSize: 15, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           </div>
//           <span style={{ fontSize: 15, color: 'rgba(107,101,88,0.45)', letterSpacing: '0.04em' }}>{formatDate(post.createdAt)} · {post.readTime} min</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── BLOG SKELETON ──────────────────────────────────────────────
// function BlogSkeleton({ big = false }: { big?: boolean }) {
//   return (
//     <div style={{ background: '#FAFAF8', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}>
//       <div style={{ paddingBottom: big ? '55%' : '62%', background: 'linear-gradient(90deg,#f0ebe0 25%,#e8e2d4 50%,#f0ebe0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
//       <div style={{ padding: big ? '26px 28px 30px' : '18px 20px 22px' }}>
//         <div style={{ height: 1, width: 20, background: '#C9A84C', marginBottom: 14 }} />
//         <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 8, width: '88%' }} />
//         <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 16, width: '65%' }} />
//         <div style={{ height: 12, background: '#ede8dd', borderRadius: 2, width: '55%' }} />
//       </div>
//     </div>
//   );
// }

// // ── HOTEL CARD (no link) ───────────────────────────────────────
// function HotelCard({ h }: { h: typeof HOTELS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <div style={{ cursor: 'default' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
//       <div style={{ position: 'relative', paddingBottom: '72%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={h.img} alt={h.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.07)' : 'scale(1)' }}
//           sizes="25vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.52)' : 'rgba(0,0,0,0.3)', transition: 'background .4s' }} />
//         <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(201,168,76,${hov ? '0.55' : '0'})`, transition: 'all .4s', pointerEvents: 'none' }} />
//         <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,168,76,0.3)', padding: '5px 10px' }}>
//           <span style={{ fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C' }}>{h.rooms}</span>
//         </div>
//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px 22px', background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 100%)' }}>
//           <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginBottom: 10, transition: 'width .4s ease' }} />
//           <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', lineHeight: 1.25, marginBottom: 4, letterSpacing: '0.02em', transform: hov ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform .35s' }}>{h.name}</h3>
//           <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{h.location}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── DINING CARD (no link) ──────────────────────────────────────
// function DiningCard({ d }: { d: typeof DINING[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <div
//       style={{ background: hov ? '#F5F0E8' : '#fff', border: '1px solid rgba(201,168,76,0.12)', transition: 'all .25s', cursor: 'default' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={d.img} alt={d.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//           sizes="25vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//       </div>
//       <div style={{ padding: '18px 20px 22px' }}>
//         <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width .3s' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 5, letterSpacing: '0.01em', transition: 'color .25s' }}>{d.name}</h3>
//         <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 8, letterSpacing: '0.04em', fontWeight: 300 }}>{d.cuisine}</p>
//         <span style={{ fontSize: 15, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>{d.location}</span>
//       </div>
//     </div>
//   );
// }

// // ── CLUB CARD (no link) ────────────────────────────────────────
// function ClubCard({ c }: { c: typeof CLUBS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <div style={{ cursor: 'default' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
//       <div style={{ position: 'relative', paddingBottom: '65%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={c.img} alt={c.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
//           sizes="(max-width:768px) 100vw, 33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.52)' : 'rgba(0,0,0,0.32)', transition: 'background .4s' }} />
//         <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,168,76,0.3)', padding: '5px 10px' }}>
//           <span style={{ fontSize: 14, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A84C' }}>Est. {c.founded}</span>
//         </div>
//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 20px', background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 100%)' }}>
//           <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', marginBottom: 4, transform: hov ? 'translateY(-3px)' : 'translateY(0)', transition: 'transform .35s', letterSpacing: '0.02em' }}>{c.name}</h3>
//           <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>{c.location}</p>
//           <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginTop: 10, transition: 'width .4s ease' }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── HOSPITALITY PAGE (MAIN) ───────────────────────────────────
// export default function HospitalityPage() {
//   const [posts, setPosts]     = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await fetch('https://shivmani-baceknd.onrender.com/api/editorials');
//         if (!res.ok) throw new Error(`Server error: ${res.status}`);
//         const data: Post[] = await res.json();
//         // Sirf Hospitality category ke published posts
//         const filtered = data.filter(p => p.isPublished && p.category === 'Hospitality');
//         setPosts(filtered);
//       } catch (err) {
//         console.error('API fetch error:', err);
//         setError('Could not load articles. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const sortedPosts  = [...posts].sort((a, b) => {
//     const pa = a.homepage?.heroPriority ?? a.homepage?.featuredRank ?? 999;
//     const pb = b.homepage?.heroPriority ?? b.homepage?.featuredRank ?? 999;
//     if (pa !== pb) return pa - pb;
//     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//   });

//   const featuredPost = sortedPosts[0] ?? null;
//   const sidePosts    = sortedPosts.slice(1, 3);
//   const bottomPosts  = sortedPosts.slice(3, 6);

//   return (
//     <>
//       <main>

//         {/* ══ HERO ═════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
//           <Image src="/images/hero-hospitality.jpg" alt="Luxury Hospitality" fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }} quality={95} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.15) 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.3), transparent 65%)' }} />
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 860 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, fontSize: 15, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
//               >Home</Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>Hospitality</span>
//             </div>

//             <p style={{ fontSize: 15, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'hFadeUp .8s .1s ease both' }}>Indian Luxury House</p>
//             <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(42px,8vw,96px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, marginBottom: 22, letterSpacing: '0.02em', animation: 'hFadeUp .8s .2s ease both' }}>
//               Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Hospitality</em>
//             </h1>
//             <p style={{ fontSize: 15, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 40, letterSpacing: '0.02em', animation: 'hFadeUp .8s .3s ease both' }}>
//               India&apos;s palace hotels, fine dining destinations, private members&apos; clubs, and extraordinary experiences — curated for those with an eye for the exceptional.
//             </p>

//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'hFadeUp .8s .4s ease both' }}>
//               {['Hotels', 'Fine Dining', 'Private Clubs', 'Editorial'].map(tab => (
//                 <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`}
//                   style={{ fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', textDecoration: 'none', transition: 'all .25s' }}
//                   onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; }}
//                 >{tab}</a>
//               ))}
//             </div>
//           </div>

//           <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
//             <span style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
//             <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
//           </div>
//         </section>

//         <style>{`
//           @keyframes hFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//           @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//           @media(max-width:767px){
//             .ilh-h-4  { grid-template-columns: repeat(2,1fr) !important; }
//             .ilh-h-3  { grid-template-columns: 1fr !important; }
//             .ilh-h-ed { grid-template-columns: 1fr !important; }
//           }
//           @media(max-width:480px){
//             .ilh-h-4  { grid-template-columns: 1fr !important; }
//           }
//         `}</style>

//         {/* ══ LUXURY HOTELS ════════════════════════════════════ */}
//         <section id="hotels" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <SectionHeader eyebrow="Palace & Heritage Hotels" title="Extraordinary Stays" />
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-h-4">
//               {HOTELS.map((h, i) => <HotelCard key={i} h={h} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ FINE DINING ══════════════════════════════════════ */}
//         <section id="fine-dining" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <SectionHeader eyebrow="Culinary Excellence" title="Fine Dining" dark />
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-h-4">
//               {DINING.map((d, i) => <DiningCard key={i} d={d} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ PRIVATE CLUBS ════════════════════════════════════ */}
//         <section id="private-clubs" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <SectionHeader eyebrow="Members Only" title="Private Clubs" />
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="ilh-h-3">
//               {CLUBS.map((c, i) => <ClubCard key={i} c={c} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ EDITORIAL (API DATA) ════════════════════════════ */}
//         <section id="editorial" style={{ background: '#FAFAF8', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <SectionHeader eyebrow="Stories & Reviews" title="Hospitality Editorial" />
//               <Link href="/news?category=hospitality"
//                 style={{ fontSize: 15, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
//                 All Hospitality Stories →
//               </Link>
//             </div>

//             {error && (
//               <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(107,101,88,0.6)' }}>
//                 <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, marginBottom: 8 }}>Unable to load articles</p>
//                 <p style={{ fontSize: 16 }}>{error}</p>
//               </div>
//             )}

//             {loading && !error && (
//               <>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-h-ed">
//                   <BlogSkeleton big />
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <BlogSkeleton />
//                     <BlogSkeleton />
//                   </div>
//                 </div>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-h-3">
//                   <BlogSkeleton /><BlogSkeleton /><BlogSkeleton />
//                 </div>
//               </>
//             )}

//             {!loading && !error && (
//               <>
//                 {sortedPosts.length === 0 ? (
//                   <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(107,101,88,0.5)' }}>
//                     <p style={{ fontFamily: 'Georgia,serif', fontSize: 18 }}>No hospitality articles published yet.</p>
//                   </div>
//                 ) : (
//                   <>
//                     {featuredPost && (
//                       <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-h-ed">
//                         <BlogCard post={featuredPost} big />
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                           {sidePosts.map(p => <BlogCard key={p._id} post={p} />)}
//                         </div>
//                       </div>
//                     )}
//                     {bottomPosts.length > 0 && (
//                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-h-3">
//                         {bottomPosts.map(p => <BlogCard key={p._id} post={p} />)}
//                       </div>
//                     )}
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </section>

//         {/* ══ CTA ═════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', overflow: 'hidden', padding: '110px 32px', background: '#0A0A0A' }}>
//           <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
//             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
//             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
//             <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,122,106,0.1) 0%, transparent 70%)' }} />
//             <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
//           </div>
//           <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
//             <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.7 }}>🏛️</div>
//             <p style={{ fontSize: 15, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 18 }}>An Invitation to Indulge</p>
//             <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.12, marginBottom: 22, letterSpacing: '0.015em' }}>
//               Experience India&apos;s<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Finest Hospitality</em>
//             </h2>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//               <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//             </div>
//             <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.38)', fontWeight: 300, lineHeight: 1.85, maxWidth: 560, margin: '0 auto 52px' }}>
//               Connect with India&apos;s most celebrated hotels, restaurants, and private clubs — all curated by Indian Luxury House for the most discerning travellers.
//             </p>
//             <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Link href="/curated-partners?category=hospitality"
//                 style={{ fontSize: 14, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 44px', textDecoration: 'none', fontWeight: 700, transition: 'background .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
//               >Explore Hospitality Partners</Link>
//               <Link href="/partner-with-us"
//                 style={{ fontSize: 14, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.45)', padding: '16px 44px', textDecoration: 'none', transition: 'all .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; }}
//               >List Your Business</Link>
//             </div>
//           </div>
//         </section>

//       </main>
//     </>
//   );
// }