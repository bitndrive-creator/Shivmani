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

const BRANDS = [
  { name: 'Forest Essentials', specialty: 'Luxury Ayurvedic Skincare',  city: 'Delhi',  img: '/images/beauty-forest.jpg'   },
  { name: 'Kama Ayurveda',     specialty: 'Premium Natural Beauty',     city: 'Delhi',  img: '/images/beauty-kama.jpg'     },
  { name: 'Biotique',          specialty: 'Bio-Active Luxury Skincare', city: 'Mumbai', img: '/images/beauty-biotique.jpg' },
  { name: 'SUGAR Cosmetics',   specialty: 'High-Performance Makeup',    city: 'Mumbai', img: '/images/beauty-sugar.jpg'    },
];

const ARTISTS = [
  { name: 'Mickey Contractor', specialty: 'Celebrity Makeup Artistry', city: 'Mumbai', img: '/images/beauty-mickey.jpg'  },
  { name: 'Namrata Soni',      specialty: 'Red Carpet & Bridal Looks', city: 'Delhi',  img: '/images/beauty-namrata.jpg' },
  { name: 'Elton Fernandez',   specialty: 'Editorial & Film Makeup',   city: 'Mumbai', img: '/images/beauty-elton.jpg'   },
  { name: 'Ambika Pillai',     specialty: 'Luxury Bridal Styling',     city: 'Delhi',  img: '/images/beauty-ambika.jpg'  },
];

const SPAS = [
  { name: 'Ananda in the Himalayas', location: 'Rishikesh, Uttarakhand',    type: 'Destination Spa',   img: '/images/spa-ananda.jpg'    },
  { name: 'Six Senses Fort Barwara', location: 'Sawai Madhopur, Rajasthan', type: 'Heritage Wellness', img: '/images/spa-sixsenses.jpg' },
  { name: 'Taj SpaS',               location: 'Pan-India',                  type: 'Urban Luxury Spa',  img: '/images/spa-taj.jpg'       },
];

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return iso; }
}

function SectionHeader({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div style={{ marginBottom: 0 }}>
      <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{eyebrow}</p>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: dark ? '#FAFAF8' : '#1A1A1A', letterSpacing: '0.02em', lineHeight: 1.2 }}>{title}</h2>
      <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
    </div>
  );
}

function BlogCard({ post, big = false }: { post: Post; big?: boolean }) {
  const [hov, setHov] = useState(false);
  const catSlug = CAT_SLUG_MAP[post.category] ?? post.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--+/g, '-');
  const imgSrc = post.coverImage
    ? post.coverImage.startsWith('http')
      ? post.coverImage
      : post.coverImage.startsWith('/uploads/')
        ? `http://91.108.111.103:5000${post.coverImage}`
        : `http://91.108.111.103:5000/uploads/${post.coverImage}`
    : CAT_IMAGE_MAP[post.category] ?? '/images/hero-beauty.jpg';

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
          <div>
            <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(107,101,88,0.5)', marginRight: 4 }}>By</span>
            <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
          </div>
          <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)', letterSpacing: '0.04em' }}>{formatDate(post.createdAt)} · {post.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}

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

function BrandCard({ b }: { b: typeof BRANDS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ cursor: 'default' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', background: '#1A1A1A' }}>
        <img src={b.img} alt={b.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.07)' : 'scale(1)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.28)', transition: 'background .4s' }} />
        <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(201,168,76,${hov ? '0.6' : '0'})`, transition: 'all .4s', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px 22px', background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 100%)' }}>
          <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginBottom: 10, transition: 'width .4s ease' }} />
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', lineHeight: 1.25, marginBottom: 4, letterSpacing: '0.02em', transform: hov ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform .35s' }}>{b.name}</h3>
          <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', marginBottom: 3 }}>{b.specialty}</p>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{b.city}</p>
        </div>
      </div>
    </div>
  );
}

function ArtistCard({ a }: { a: typeof ARTISTS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ background: hov ? '#0A0A0A' : '#1A1A1A', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.1'})`, transition: 'all .3s', padding: '28px 26px', cursor: 'default' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, overflow: 'hidden', position: 'relative' }}>
        <img src={a.img} alt={a.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <span style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#C9A84C', position: 'absolute' }}>
          {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </span>
      </div>
      <div style={{ width: hov ? 28 : 14, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .3s' }} />
      <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em', lineHeight: 1.3 }}>{a.name}</h3>
      <p style={{ fontSize: 10, color: 'rgba(201,168,76,0.55)', marginBottom: 10, letterSpacing: '0.06em', fontWeight: 300 }}>{a.specialty}</p>
      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{a.city}</p>
    </div>
  );
}

function SpaCard({ s }: { s: typeof SPAS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ cursor: 'default' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'relative', paddingBottom: '68%', overflow: 'hidden', background: '#1A1A1A' }}>
        <img src={s.img} alt={s.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.52)' : 'rgba(0,0,0,0.32)', transition: 'background .4s' }} />
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,168,76,0.3)', padding: '5px 10px' }}>
          <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C' }}>{s.type}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 20px', background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 100%)' }}>
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', marginBottom: 5, transform: hov ? 'translateY(-3px)' : 'translateY(0)', transition: 'transform .35s', letterSpacing: '0.02em' }}>{s.name}</h3>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>{s.location}</p>
          <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginTop: 10, transition: 'width .4s ease' }} />
        </div>
      </div>
    </div>
  );
}

export default function BeautyPage() {
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); setError(null);
        const res = await fetch('http://91.108.111.103:5000/api/editorials');
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: Post[] = await res.json();
        setPosts(data.filter(p => p.isPublished && p.category === 'Beauty'));
      } catch (err) {
        console.error('API fetch error:', err);
        setError('Could not load articles. Please try again later.');
      } finally { setLoading(false); }
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
        <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
          <Image src="/images/beauty-elton.jpg" alt="Luxury Beauty" fill priority
            style={{ objectFit: 'cover', objectPosition: 'center' }} quality={75} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.15) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.3), transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 860 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
              >Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: '#C9A84C' }}>Beauty</span>
            </div>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'bFadeUp .8s .1s ease both' }}>Indian Luxury House</p>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(42px,8vw,96px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, marginBottom: 22, letterSpacing: '0.02em', animation: 'bFadeUp .8s .2s ease both' }}>
              Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Beauty</em>
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 40, letterSpacing: '0.02em', animation: 'bFadeUp .8s .3s ease both' }}>
              India&apos;s finest skincare houses, makeup artists, wellness spas, and beauty rituals — curated for those who demand nothing but the exceptional.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'bFadeUp .8s .4s ease both' }}>
              {['Brands', 'Artists', 'Wellness Spas', 'Editorial'].map(tab => (
                <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`}
                  style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', textDecoration: 'none', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; }}
                >{tab}</a>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
          </div>
        </section>

        <style>{`
          @keyframes bFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
          @media(max-width:767px){
            .ilh-b-4  { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-b-3  { grid-template-columns: 1fr !important; }
            .ilh-b-ed { grid-template-columns: 1fr !important; }
          }
          @media(max-width:480px){
            .ilh-b-4  { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* ══ LUXURY BRANDS ════════════════════════════════════ */}
        <section id="brands" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Skincare & Cosmetics" title="Luxury Beauty Brands" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-b-4">
              {BRANDS.map((b, i) => <BrandCard key={i} b={b} />)}
            </div>
          </div>
        </section>

        {/* ══ MAKEUP ARTISTS ═══════════════════════════════════ */}
        <section id="artists" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Hair & Makeup" title="Celebrated Artists" dark />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }} className="ilh-b-4">
              {ARTISTS.map((a, i) => <ArtistCard key={i} a={a} />)}
            </div>
          </div>
        </section>

        {/* ══ WELLNESS SPAS ════════════════════════════════════ */}
        <section id="wellness-spas" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Rejuvenation & Wellness" title="Extraordinary Spas" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="ilh-b-3">
              {SPAS.map((s, i) => <SpaCard key={i} s={s} />)}
            </div>
          </div>
        </section>

        {/* ══ EDITORIAL ════════════════════════════════════════ */}
        <section id="editorial" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <SectionHeader eyebrow="Stories & Trends" title="Beauty Editorial" dark />
              <Link href="/news?category=beauty"
                style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
                All Beauty Stories →
              </Link>
            </div>

            {error && (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#FAFAF8', marginBottom: 8 }}>Unable to load articles</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{error}</p>
              </div>
            )}

            {loading && !error && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-b-ed">
                  <BlogSkeleton big />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <BlogSkeleton /><BlogSkeleton />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-b-3">
                  <BlogSkeleton /><BlogSkeleton /><BlogSkeleton />
                </div>
              </>
            )}

            {!loading && !error && (
              <>
                {sortedPosts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>No beauty articles published yet.</p>
                  </div>
                ) : (
                  <>
                    {featuredPost && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-b-ed">
                        <BlogCard post={featuredPost} big />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                          {sidePosts.map(p => <BlogCard key={p._id} post={p} />)}
                        </div>
                      </div>
                    )}
                    {bottomPosts.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-b-3">
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
        <section style={{ position: 'relative', overflow: 'hidden', padding: '110px 32px', background: '#FAFAF8' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
          </div>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.6 }}>✦</div>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 18 }}>Elevate Your Presence</p>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.12, marginBottom: 22, letterSpacing: '0.015em' }}>
              Discover India&apos;s<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Beauty Finest</em>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
              <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
            </div>
            <p style={{ fontSize: 14, color: 'rgba(26,26,26,0.45)', fontWeight: 300, lineHeight: 1.85, maxWidth: 560, margin: '0 auto 52px' }}>
              Connect with India&apos;s most celebrated beauty brands, makeup artists, and wellness destinations — curated for the discerning connoisseur.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/curated-partners?category=beauty"
                style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 44px', textDecoration: 'none', fontWeight: 700, transition: 'background .3s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
              >Explore Beauty Partners</Link>
              <Link href="/partner-with-us"
                style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.45)', padding: '16px 44px', textDecoration: 'none', transition: 'all .3s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
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

// // ── BEAUTY BRANDS ──────────────────────────────────────────────
// const BRANDS = [
//   { name: 'Forest Essentials',  specialty: 'Luxury Ayurvedic Skincare',   city: 'Delhi',   img: '/images/beauty-forest.jpg'   },
//   { name: 'Kama Ayurveda',      specialty: 'Premium Natural Beauty',      city: 'Delhi',   img: '/images/beauty-kama.jpg'     },
//   { name: 'Biotique',           specialty: 'Bio-Active Luxury Skincare',  city: 'Mumbai',  img: '/images/beauty-biotique.jpg' },
//   { name: 'SUGAR Cosmetics',    specialty: 'High-Performance Makeup',     city: 'Mumbai',  img: '/images/beauty-sugar.jpg'    },
// ];

// // ── MAKEUP ARTISTS ─────────────────────────────────────────────
// const ARTISTS = [
//   { name: 'Mickey Contractor',  specialty: 'Celebrity Makeup Artistry',   city: 'Mumbai',  img: '/images/beauty-mickey.jpg'   },
//   { name: 'Namrata Soni',       specialty: 'Red Carpet & Bridal Looks',   city: 'Delhi',   img: '/images/beauty-namrata.jpg'  },
//   { name: 'Elton Fernandez',    specialty: 'Editorial & Film Makeup',     city: 'Mumbai',  img: '/images/beauty-elton.jpg'    },
//   { name: 'Ambika Pillai',      specialty: 'Luxury Bridal Styling',       city: 'Delhi',   img: '/images/beauty-ambika.jpg'   },
// ];

// // ── WELLNESS SPAS ──────────────────────────────────────────────
// const SPAS = [
//   { name: 'Ananda in the Himalayas', location: 'Rishikesh, Uttarakhand', type: 'Destination Spa', img: '/images/spa-ananda.jpg'   },
//   { name: 'Six Senses Fort Barwara', location: 'Sawai Madhopur, Rajasthan', type: 'Heritage Wellness', img: '/images/spa-sixsenses.jpg' },
//   { name: 'Taj SpaS',               location: 'Pan-India',              type: 'Urban Luxury Spa',  img: '/images/spa-taj.jpg'      },
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
//       <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{eyebrow}</p>
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
//     : CAT_IMAGE_MAP[post.category] ?? '/images/hero-beauty.jpg';

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
//         <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
//           {post.category}
//         </span>
//       </div>
//       <div style={{ padding: big ? '26px 28px 30px' : '18px 20px 22px' }}>
//         <div style={{ width: hov ? 40 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s ease' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontSize: big ? 22 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//           {post.title}
//         </h3>
//         <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//           {post.excerpt}
//         </p>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
//           <div>
//             <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(107,101,88,0.5)', marginRight: 4 }}>By</span>
//             <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           </div>
//           <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)', letterSpacing: '0.04em' }}>{formatDate(post.createdAt)} · {post.readTime} min</span>
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

// // ── BRAND CARD (no link) ───────────────────────────────────────
// function BrandCard({ b }: { b: typeof BRANDS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <div style={{ cursor: 'default' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
//       <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={b.img} alt={b.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.07)' : 'scale(1)' }}
//           sizes="25vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.28)', transition: 'background .4s' }} />
//         <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(201,168,76,${hov ? '0.6' : '0'})`, transition: 'all .4s', pointerEvents: 'none' }} />
//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px 22px', background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 100%)' }}>
//           <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginBottom: 10, transition: 'width .4s ease' }} />
//           <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', lineHeight: 1.25, marginBottom: 4, letterSpacing: '0.02em', transform: hov ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform .35s' }}>{b.name}</h3>
//           <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', marginBottom: 3 }}>{b.specialty}</p>
//           <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{b.city}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── ARTIST CARD (no link) ──────────────────────────────────────
// function ArtistCard({ a }: { a: typeof ARTISTS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <div
//       style={{ background: hov ? '#0A0A0A' : '#1A1A1A', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.1'})`, transition: 'all .3s', padding: '28px 26px', cursor: 'default' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, overflow: 'hidden', position: 'relative' }}>
//         <Image src={a.img} alt={a.name} fill style={{ objectFit: 'cover' }} sizes="64px" onError={() => {}} />
//         <span style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#C9A84C', position: 'absolute' }}>
//           {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
//         </span>
//       </div>
//       <div style={{ width: hov ? 28 : 14, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .3s' }} />
//       <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em', lineHeight: 1.3 }}>{a.name}</h3>
//       <p style={{ fontSize: 10, color: 'rgba(201,168,76,0.55)', marginBottom: 10, letterSpacing: '0.06em', fontWeight: 300 }}>{a.specialty}</p>
//       <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{a.city}</p>
//     </div>
//   );
// }

// // ── SPA CARD (no link) ─────────────────────────────────────────
// function SpaCard({ s }: { s: typeof SPAS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <div style={{ cursor: 'default' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
//       <div style={{ position: 'relative', paddingBottom: '68%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={s.img} alt={s.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
//           sizes="(max-width:768px) 100vw, 33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.52)' : 'rgba(0,0,0,0.32)', transition: 'background .4s' }} />
//         <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,168,76,0.3)', padding: '5px 10px' }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C' }}>{s.type}</span>
//         </div>
//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 20px', background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 100%)' }}>
//           <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 400, color: '#FAFAF8', marginBottom: 5, transform: hov ? 'translateY(-3px)' : 'translateY(0)', transition: 'transform .35s', letterSpacing: '0.02em' }}>{s.name}</h3>
//           <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>{s.location}</p>
//           <div style={{ width: hov ? 28 : 0, height: 1, background: '#C9A84C', marginTop: 10, transition: 'width .4s ease' }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── BEAUTY PAGE (MAIN) ────────────────────────────────────────
// export default function BeautyPage() {
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
//         // Sirf Beauty category ke published posts
//         const filtered = data.filter(p => p.isPublished && p.category === 'Beauty');
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
//           <Image src="/images/hero-beauty.jpg" alt="Luxury Beauty" fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }} quality={95} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.15) 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.3), transparent 65%)' }} />
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 860 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
//               >Home</Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>Beauty</span>
//             </div>

//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'bFadeUp .8s .1s ease both' }}>Indian Luxury House</p>
//             <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(42px,8vw,96px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, marginBottom: 22, letterSpacing: '0.02em', animation: 'bFadeUp .8s .2s ease both' }}>
//               Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Beauty</em>
//             </h1>
//             <p style={{ fontSize: 15, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 40, letterSpacing: '0.02em', animation: 'bFadeUp .8s .3s ease both' }}>
//               India&apos;s finest skincare houses, makeup artists, wellness spas, and beauty rituals — curated for those who demand nothing but the exceptional.
//             </p>

//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'bFadeUp .8s .4s ease both' }}>
//               {['Brands', 'Artists', 'Wellness Spas', 'Editorial'].map(tab => (
//                 <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`}
//                   style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', textDecoration: 'none', transition: 'all .25s' }}
//                   onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(201,168,76,0.65)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; }}
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
//           @keyframes bFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//           @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//           @media(max-width:767px){
//             .ilh-b-4  { grid-template-columns: repeat(2,1fr) !important; }
//             .ilh-b-3  { grid-template-columns: 1fr !important; }
//             .ilh-b-ed { grid-template-columns: 1fr !important; }
//           }
//           @media(max-width:480px){
//             .ilh-b-4  { grid-template-columns: 1fr !important; }
//           }
//         `}</style>

//         {/* ══ LUXURY BRANDS ════════════════════════════════════ */}
//         <section id="brands" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <SectionHeader eyebrow="Skincare & Cosmetics" title="Luxury Beauty Brands" />
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-b-4">
//               {BRANDS.map((b, i) => <BrandCard key={i} b={b} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ MAKEUP ARTISTS ═══════════════════════════════════ */}
//         <section id="artists" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <SectionHeader eyebrow="Hair & Makeup" title="Celebrated Artists" dark />
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }} className="ilh-b-4">
//               {ARTISTS.map((a, i) => <ArtistCard key={i} a={a} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ WELLNESS SPAS ════════════════════════════════════ */}
//         <section id="wellness-spas" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <SectionHeader eyebrow="Rejuvenation & Wellness" title="Extraordinary Spas" />
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="ilh-b-3">
//               {SPAS.map((s, i) => <SpaCard key={i} s={s} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ EDITORIAL (API DATA) ════════════════════════════ */}
//         <section id="editorial" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <SectionHeader eyebrow="Stories & Trends" title="Beauty Editorial" dark />
//               <Link href="/news?category=beauty"
//                 style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2, marginBottom: 18 }}>
//                 All Beauty Stories →
//               </Link>
//             </div>

//             {error && (
//               <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(201,168,76,0.5)' }}>
//                 <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#FAFAF8', marginBottom: 8 }}>Unable to load articles</p>
//                 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{error}</p>
//               </div>
//             )}

//             {loading && !error && (
//               <>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-b-ed">
//                   <BlogSkeleton big />
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <BlogSkeleton />
//                     <BlogSkeleton />
//                   </div>
//                 </div>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-b-3">
//                   <BlogSkeleton /><BlogSkeleton /><BlogSkeleton />
//                 </div>
//               </>
//             )}

//             {!loading && !error && (
//               <>
//                 {sortedPosts.length === 0 ? (
//                   <div style={{ textAlign: 'center', padding: '60px 0' }}>
//                     <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>No beauty articles published yet.</p>
//                   </div>
//                 ) : (
//                   <>
//                     {featuredPost && (
//                       <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 20 }} className="ilh-b-ed">
//                         <BlogCard post={featuredPost} big />
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                           {sidePosts.map(p => <BlogCard key={p._id} post={p} />)}
//                         </div>
//                       </div>
//                     )}
//                     {bottomPosts.length > 0 && (
//                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-b-3">
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
//         <section style={{ position: 'relative', overflow: 'hidden', padding: '110px 32px', background: '#FAFAF8' }}>
//           <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
//             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
//             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
//             <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
//           </div>
//           <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
//             <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.6 }}>✦</div>
//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 18 }}>Elevate Your Presence</p>
//             <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.12, marginBottom: 22, letterSpacing: '0.015em' }}>
//               Discover India&apos;s<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Beauty Finest</em>
//             </h2>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//               <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//             </div>
//             <p style={{ fontSize: 14, color: 'rgba(26,26,26,0.45)', fontWeight: 300, lineHeight: 1.85, maxWidth: 560, margin: '0 auto 52px' }}>
//               Connect with India&apos;s most celebrated beauty brands, makeup artists, and wellness destinations — curated for the discerning connoisseur.
//             </p>
//             <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Link href="/curated-partners?category=beauty"
//                 style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 44px', textDecoration: 'none', fontWeight: 700, transition: 'background .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
//               >Explore Beauty Partners</Link>
//               <Link href="/partner-with-us"
//                 style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.45)', padding: '16px 44px', textDecoration: 'none', transition: 'all .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; }}
//               >List Your Business</Link>
//             </div>
//           </div>
//         </section>

//       </main>
//     </>
//   );
// }