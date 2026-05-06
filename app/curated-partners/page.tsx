'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  'All',
  'Real Estate',
  'Automobiles',
  'Jewellery',
  'Weddings',
  'Beauty',
  'Hospitality',
];

const PARTNERS = [
  { id: 1,  name: 'Rustomjee Estates',  category: 'Real Estate',  city: 'Mumbai',    desc: "Ultra-luxury residences across Mumbai's most coveted addresses, redefining Indian urban living." },
  { id: 2,  name: 'Prestige Group',      category: 'Real Estate',  city: 'Bangalore', desc: "South India's foremost luxury real estate developer with a legacy of excellence since 1986." },
  { id: 3,  name: 'Lamborghini India',   category: 'Automobiles',  city: 'Delhi',     desc: "Official home of Sant'Agata's finest — where Italian engineering meets Indian aspiration." },
  { id: 4,  name: 'Rolls-Royce Delhi',   category: 'Automobiles',  city: 'Delhi',     desc: "The pinnacle of automotive luxury, serving India's most discerning collectors and connoisseurs." },
  { id: 5,  name: 'Hazoorilal Legacy',   category: 'Jewellery',    city: 'Delhi',     desc: "Seven decades of bespoke fine jewellery craftsmanship, beloved by India's royalty and elite." },
  { id: 6,  name: 'Tanishq Couture',     category: 'Jewellery',    city: 'Mumbai',    desc: "Where heritage goldsmithing meets contemporary luxury — India's most trusted jewellery house." },
  { id: 7,  name: 'Shaadi by Marriott',  category: 'Weddings',     city: 'Mumbai',    desc: "Bespoke luxury wedding experiences across Marriott's iconic properties throughout India." },
  { id: 8,  name: 'The Wedding Studio',  category: 'Weddings',     city: 'Jaipur',    desc: "India's premier destination wedding curators, crafting unforgettable celebrations since 2010." },
  { id: 9,  name: 'Forest Essentials',   category: 'Beauty',       city: 'Delhi',     desc: "Luxurious Ayurvedic beauty rituals crafted from the purest natural ingredients across India." },
  { id: 10, name: 'Kama Ayurveda',       category: 'Beauty',       city: 'Delhi',     desc: "Ancient wisdom, modern luxury — India's most revered natural beauty and wellness brand." },
  { id: 11, name: 'The Leela Palaces',   category: 'Hospitality',  city: 'Pan-India', desc: "India's most celebrated luxury hotel collection — palaces, resorts, and urban sanctuaries." },
  { id: 12, name: 'Aman New Delhi',      category: 'Hospitality',  city: 'Delhi',     desc: "A serene urban retreat redefining hotel luxury in the heart of India's capital city." },
];

const THIS_CATEGORY = 'Curated Partners';
const THIS_CAT_SLUG = 'curated-partners';
const API_BASE = 'https://api.indianluxuryhouse.com';

const CAT_IMAGE_MAP: Record<string, string> = {
  'Real Estate':         '/images/real-estate.jpg',
  'Automobiles':         '/images/automobiles.jpg',
  'Jewellery & Watches': '/images/Jewellery.png',
  'Weddings':            '/images/hero-weddings.jpg',
  'Curated Partners':    '/images/hero-partners.jpg',
};

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
  coverImage?: string; // ✅
}

// ── IMAGE URL HELPER ───────────────────────────────────────────
function getImg(coverImage?: string, category?: string): string {
  if (coverImage) {
    if (coverImage.startsWith('http')) return coverImage;
    if (coverImage.startsWith('/uploads/')) return `${API_BASE}${coverImage}`;
    return `${API_BASE}/uploads/${coverImage}`;
  }
  return CAT_IMAGE_MAP[category ?? ''] ?? '/images/hero-partners.jpg';
}

// ── PARTNER CARD — no Inquire button ──────────────────────────
function PartnerCard({ partner }: { partner: typeof PARTNERS[0] }) {
  const [hov, setHov] = useState(false);
  const initials = partner.name.split(' ').map(w => w[0]).slice(0, 2).join('');

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? '#0a0a0a' : '#ffffff', border: '1px solid', borderColor: hov ? 'transparent' : '#ececec', padding: '36px 32px 28px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: hov ? 'linear-gradient(90deg,#1B4D45,#C9A84C)' : '#1B4D45', transition: 'background 0.3s' }} />

      <div style={{ width: 56, height: 56, background: hov ? 'rgba(201,168,76,0.1)' : '#f5f5f5', border: `1px solid ${hov ? 'rgba(201,168,76,0.3)' : '#e8e8e8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'all 0.3s' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300, color: hov ? '#C9A84C' : '#999', letterSpacing: '0.05em' }}>{initials}</span>
      </div>

      <p style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.6)' : '#1B4D45', fontFamily: 'sans-serif', marginBottom: 10, transition: 'color 0.3s' }}>{partner.category}</p>
      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, color: hov ? '#ffffff' : '#0a0a0a', marginBottom: 12, letterSpacing: '0.01em', lineHeight: 1.3, transition: 'color 0.3s' }}>{partner.name}</h3>
      <div style={{ width: hov ? 36 : 24, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width 0.3s' }} />
      <p style={{ fontSize: 13, lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.5)' : '#666', marginBottom: 20, flex: 1, transition: 'color 0.3s' }}>{partner.desc}</p>

      {/* ✅ Inquire button removed — sirf city dikhao */}
      <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.4)' : '#aaa', fontFamily: 'sans-serif', transition: 'color 0.3s' }}>📍 {partner.city}</span>
    </div>
  );
}

// ── EDITORIAL CARD (API) ───────────────────────────────────────
function EditorialCard({ post, big = false }: { post: Post; big?: boolean }) {
  const [hov, setHov] = useState(false);
  const imgSrc = getImg(post.coverImage, post.category);
  const postUrl = `/${THIS_CAT_SLUG}/${post.slug}`;

  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return iso; }
  };

  return (
    <a
      href={postUrl}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: big ? '55%' : '62%', overflow: 'hidden', background: '#1A1A1A' }}>
        <Image src={imgSrc} alt={post.title} fill
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
          <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)' }}>{formatDate(post.createdAt)} · {post.readTime} min</span>
        </div>
      </div>
    </a>
  );
}

function EditorialSkeleton({ big = false }: { big?: boolean }) {
  return (
    <div style={{ background: '#FAFAF8', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}>
      <div style={{ paddingBottom: big ? '55%' : '62%', background: 'linear-gradient(90deg,#f0ebe0 25%,#e8e2d4 50%,#f0ebe0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: big ? '26px 28px' : '18px 20px' }}>
        <div style={{ height: 1, width: 20, background: '#C9A84C', marginBottom: 14 }} />
        <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 8, width: '85%' }} />
        <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 16, width: '65%' }} />
        <div style={{ height: 12, background: '#ede8dd', borderRadius: 2, width: '50%' }} />
      </div>
    </div>
  );
}

export default function PartnersPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PARTNERS : PARTNERS.filter(p => p.category === active);

  const [editorialPosts, setEditorialPosts] = useState<Post[]>([]);
  const [editorialLoading, setEditorialLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/editorials`);
        if (!res.ok) return;
        const data: Post[] = await res.json();
        setEditorialPosts(data.filter(p => p.isPublished && p.category === THIS_CATEGORY));
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
      <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{ position: 'relative', background: '#0a0a0a', padding: '100px 32px 90px', overflow: 'hidden', textAlign: 'center' }}>
          <Image src="/images/hero-partners.jpg" alt="Curated Partners" fill priority
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.35 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.65)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex: 2 }} />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>Trusted Network</p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(38px, 6vw, 76px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 28 }}>
              Curated <em style={{ color: '#C9A84C' }}>Partners</em>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontWeight: 300, fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
              India's trusted network of premium businesses.
            </p>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', zIndex: 2 }} />
        </section>

        {/* ══ FILTER ════════════════════════════════════════════ */}
        <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
            {CATEGORIES.map((cat, i) => (
              <button key={cat} onClick={() => setActive(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '20px 22px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 500, color: active === cat ? '#C9A84C' : 'rgba(255,255,255,0.3)', borderBottom: active === cat ? '2px solid #C9A84C' : '2px solid transparent', borderRight: i < CATEGORIES.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* ══ PARTNERS GRID ═════════════════════════════════════ */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: '#aaa', fontFamily: 'sans-serif', letterSpacing: '0.1em' }}>
              <span style={{ color: '#C9A84C', fontWeight: 600 }}>{filtered.length}</span> partners in {active === 'All' ? 'all categories' : active}
            </p>
            <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="partners-grid">
            {filtered.map(p => <PartnerCard key={p.id} partner={p} />)}
          </div>
        </section>

        {/* ══ EDITORIAL STORIES (API DATA) ══════════════════════ */}
        <section style={{ background: '#FAFAF8', padding: '80px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 24 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Partner Stories</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Editorial Stories</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              <a href={`/news?category=${THIS_CAT_SLUG}`} style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>All Stories →</a>
            </div>

            {editorialLoading && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="partners-editorial">
                <EditorialSkeleton big />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <EditorialSkeleton />
                  <EditorialSkeleton />
                </div>
              </div>
            )}

            {!editorialLoading && editorialPosts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(107,101,88,0.45)' }}>
                <p style={{ fontFamily: 'Georgia,serif', fontSize: 20, marginBottom: 8 }}>No stories published yet.</p>
                <p style={{ fontSize: 13 }}>Check back soon for {THIS_CATEGORY} editorial content.</p>
              </div>
            )}

            {!editorialLoading && editorialPosts.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="partners-editorial">
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
        <section style={{ background: '#0a0a0a', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />

          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'sans-serif' }}>Join the Network</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#ffffff', marginBottom: 16, letterSpacing: '0.01em' }}>
              Want to be <em style={{ color: '#C9A84C' }}>Featured?</em>
            </h2>
            <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto 24px' }} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 40, lineHeight: 1.85, fontWeight: 300, fontFamily: 'sans-serif' }}>
              Join India's most trusted luxury network. Be seen by the audience that matters.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/partner-with-us" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#0a0a0a', background: '#C9A84C', padding: '16px 36px', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 600, display: 'inline-block' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
              >Apply Now →</Link>
              <a href="mailto:hello@indianluxuryhouse.com" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)', padding: '16px 36px', textDecoration: 'none', fontFamily: 'sans-serif', display: 'inline-block' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
              >Email Us</a>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '36px 32px 52px', borderTop: '1px solid #f0f0f0' }}>
          <Link href="/" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif', borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3 }}>← Back to Journal</Link>
        </div>

      </main>

      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @media (max-width: 767px) {
          .partners-grid { grid-template-columns: 1fr !important; }
          .partners-editorial { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .partners-grid { grid-template-columns: repeat(2,1fr) !important; }
          .partners-editorial { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}



// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import Link from 'next/link';

// const CATEGORIES = [
//   'All',
//   'Real Estate',
//   'Automobiles',
//   'Jewellery',
//   'Weddings',
//   'Beauty',
//   'Hospitality',
// ];

// const PARTNERS = [
//   { id: 1,  name: 'Rustomjee Estates',  category: 'Real Estate',  city: 'Mumbai',    desc: "Ultra-luxury residences across Mumbai's most coveted addresses, redefining Indian urban living." },
//   { id: 2,  name: 'Prestige Group',      category: 'Real Estate',  city: 'Bangalore', desc: "South India's foremost luxury real estate developer with a legacy of excellence since 1986." },
//   { id: 3,  name: 'Lamborghini India',   category: 'Automobiles',  city: 'Delhi',     desc: "Official home of Sant'Agata's finest — where Italian engineering meets Indian aspiration." },
//   { id: 4,  name: 'Rolls-Royce Delhi',   category: 'Automobiles',  city: 'Delhi',     desc: "The pinnacle of automotive luxury, serving India's most discerning collectors and connoisseurs." },
//   { id: 5,  name: 'Hazoorilal Legacy',   category: 'Jewellery',    city: 'Delhi',     desc: "Seven decades of bespoke fine jewellery craftsmanship, beloved by India's royalty and elite." },
//   { id: 6,  name: 'Tanishq Couture',     category: 'Jewellery',    city: 'Mumbai',    desc: "Where heritage goldsmithing meets contemporary luxury — India's most trusted jewellery house." },
//   { id: 7,  name: 'Shaadi by Marriott',  category: 'Weddings',     city: 'Mumbai',    desc: "Bespoke luxury wedding experiences across Marriott's iconic properties throughout India." },
//   { id: 8,  name: 'The Wedding Studio',  category: 'Weddings',     city: 'Jaipur',    desc: "India's premier destination wedding curators, crafting unforgettable celebrations since 2010." },
//   { id: 9,  name: 'Forest Essentials',   category: 'Beauty',       city: 'Delhi',     desc: "Luxurious Ayurvedic beauty rituals crafted from the purest natural ingredients across India." },
//   { id: 10, name: 'Kama Ayurveda',       category: 'Beauty',       city: 'Delhi',     desc: "Ancient wisdom, modern luxury — India's most revered natural beauty and wellness brand." },
//   { id: 11, name: 'The Leela Palaces',   category: 'Hospitality',  city: 'Pan-India', desc: "India's most celebrated luxury hotel collection — palaces, resorts, and urban sanctuaries." },
//   { id: 12, name: 'Aman New Delhi',      category: 'Hospitality',  city: 'Delhi',     desc: "A serene urban retreat redefining hotel luxury in the heart of India's capital city." },
// ];

// function PartnerCard({ partner }: { partner: typeof PARTNERS[0] }) {
//   const [hov, setHov] = useState(false);
//   const initials = partner.name.split(' ').map(w => w[0]).slice(0, 2).join('');

//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{ background: hov ? '#0a0a0a' : '#ffffff', border: '1px solid', borderColor: hov ? 'transparent' : '#ececec', padding: '36px 32px 28px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}
//     >
//       <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: hov ? 'linear-gradient(90deg,#1B4D45,#C9A84C)' : '#1B4D45', transition: 'background 0.3s' }} />

//       <div style={{ width: 56, height: 56, background: hov ? 'rgba(201,168,76,0.1)' : '#f5f5f5', border: `1px solid ${hov ? 'rgba(201,168,76,0.3)' : '#e8e8e8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'all 0.3s' }}>
//         <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300, color: hov ? '#C9A84C' : '#999', letterSpacing: '0.05em' }}>{initials}</span>
//       </div>

//       <p style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.6)' : '#1B4D45', fontFamily: 'sans-serif', marginBottom: 10, transition: 'color 0.3s' }}>{partner.category}</p>
//       <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, color: hov ? '#ffffff' : '#0a0a0a', marginBottom: 12, letterSpacing: '0.01em', lineHeight: 1.3, transition: 'color 0.3s' }}>{partner.name}</h3>
//       <div style={{ width: hov ? 36 : 24, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width 0.3s' }} />
//       <p style={{ fontSize: 13, lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.5)' : '#666', marginBottom: 24, flex: 1, transition: 'color 0.3s' }}>{partner.desc}</p>

//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.4)' : '#aaa', fontFamily: 'sans-serif', transition: 'color 0.3s' }}>📍 {partner.city}</span>
//         <a href="mailto:hello@indianluxuryhouse.com" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: hov ? '#0a0a0a' : '#1B4D45', background: hov ? '#C9A84C' : 'transparent', border: `1px solid ${hov ? '#C9A84C' : 'rgba(27,77,69,0.35)'}`, padding: '8px 16px', textDecoration: 'none', fontFamily: 'sans-serif', transition: 'all 0.25s', fontWeight: 500 }}>Inquire →</a>
//       </div>
//     </div>
//   );
// }

// export default function PartnersPage() {
//   const [active, setActive] = useState('All');
//   const filtered = active === 'All' ? PARTNERS : PARTNERS.filter(p => p.category === active);

//   return (
//     <>
//       <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

//         {/* ══ HERO ══════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', background: '#0a0a0a', padding: '100px 32px 90px', overflow: 'hidden', textAlign: 'center' }}>

//           {/* Hero Image */}
//           <Image
//             src="/images/hero-partners.jpg"
//             alt="Curated Partners"
//             fill
//             priority
//             style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.35 }}
//           />

//           {/* Dark overlay */}
//           <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.65)' }} />

//           {/* Top gold line */}
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex: 2 }} />

//           <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto' }}>
//             <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>Trusted Network</p>
//             <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(38px, 6vw, 76px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 28 }}>
//               Curated <em style={{ color: '#C9A84C' }}>Partners</em>
//             </h1>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
//               <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
//               <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
//               <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
//             </div>
//             <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontWeight: 300, fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
//               India's trusted network of premium businesses.
//             </p>
//           </div>

//           {/* Bottom gold line */}
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', zIndex: 2 }} />
//         </section>

//         {/* ══ FILTER ════════════════════════════════════════════ */}
//         <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
//             {CATEGORIES.map((cat, i) => (
//               <button key={cat} onClick={() => setActive(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '20px 22px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 500, color: active === cat ? '#C9A84C' : 'rgba(255,255,255,0.3)', borderBottom: active === cat ? '2px solid #C9A84C' : '2px solid transparent', borderRight: i < CATEGORIES.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>{cat}</button>
//             ))}
//           </div>
//         </div>

//         {/* ══ GRID ══════════════════════════════════════════════ */}
//         <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 80px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
//             <p style={{ fontSize: 11, color: '#aaa', fontFamily: 'sans-serif', letterSpacing: '0.1em' }}>
//               <span style={{ color: '#C9A84C', fontWeight: 600 }}>{filtered.length}</span> partners in {active === 'All' ? 'all categories' : active}
//             </p>
//             <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="partners-grid">
//             {filtered.map(p => <PartnerCard key={p.id} partner={p} />)}
//           </div>
//         </section>

//         {/* ══ CTA ═══════════════════════════════════════════════ */}
//         <section style={{ background: '#0a0a0a', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
//           <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
//           <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />

//           <div style={{ maxWidth: 560, margin: '0 auto' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'sans-serif' }}>Join the Network</p>
//             <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#ffffff', marginBottom: 16, letterSpacing: '0.01em' }}>
//               Want to be <em style={{ color: '#C9A84C' }}>Featured?</em>
//             </h2>
//             <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto 24px' }} />
//             <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 40, lineHeight: 1.85, fontWeight: 300, fontFamily: 'sans-serif' }}>
//               Join India's most trusted luxury network. Be seen by the audience that matters.
//             </p>
//             <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Link href="/partner-with-us" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#0a0a0a', background: '#C9A84C', padding: '16px 36px', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 600, transition: 'background 0.2s', display: 'inline-block' }}
//                 onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
//                 onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
//               >Apply Now →</Link>
//               <a href="mailto:hello@indianluxuryhouse.com" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)', padding: '16px 36px', textDecoration: 'none', fontFamily: 'sans-serif', transition: 'border-color 0.2s', display: 'inline-block' }}
//                 onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
//               >Email Us</a>
//             </div>
//           </div>
//         </section>

//         {/* Back */}
//         <div style={{ textAlign: 'center', padding: '36px 32px 52px', borderTop: '1px solid #f0f0f0' }}>
//           <Link href="/" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif', borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3 }}>← Back to Journal</Link>
//         </div>

//       </main>

//       <style>{`
//         @media (max-width: 767px) { .partners-grid { grid-template-columns: 1fr !important; } }
//         @media (min-width: 768px) and (max-width: 1023px) { .partners-grid { grid-template-columns: repeat(2,1fr) !important; } }
//       `}</style>
//     </>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// const CATEGORIES = [
//   'All',
//   'Real Estate',
//   'Automobiles',
//   'Jewellery',
//   'Weddings',
//   'Beauty',
//   'Hospitality',
// ];

// const PARTNERS = [
//   { id: 1,  name: 'Rustomjee Estates',        category: 'Real Estate',  city: 'Mumbai',    desc: "Ultra-luxury residences across Mumbai's most coveted addresses, redefining Indian urban living." },
//   { id: 2,  name: 'Prestige Group',            category: 'Real Estate',  city: 'Bangalore', desc: "South India's foremost luxury real estate developer with a legacy of excellence since 1986." },
//   { id: 3,  name: 'Lamborghini India',         category: 'Automobiles',  city: 'Delhi',     desc: "Official home of Sant'Agata's finest — where Italian engineering meets Indian aspiration." },
//   { id: 4,  name: 'Rolls-Royce Delhi',         category: 'Automobiles',  city: 'Delhi',     desc: "The pinnacle of automotive luxury, serving India's most discerning collectors and connoisseurs." },
//   { id: 5,  name: 'Hazoorilal Legacy',         category: 'Jewellery',    city: 'Delhi',     desc: "Seven decades of bespoke fine jewellery craftsmanship, beloved by India's royalty and elite." },
//   { id: 6,  name: 'Tanishq Couture',           category: 'Jewellery',    city: 'Mumbai',    desc: "Where heritage goldsmithing meets contemporary luxury — India's most trusted jewellery house." },
//   { id: 7,  name: 'Shaadi by Marriott',        category: 'Weddings',     city: 'Mumbai',    desc: "Bespoke luxury wedding experiences across Marriott's iconic properties throughout India." },
//   { id: 8,  name: 'The Wedding Studio',        category: 'Weddings',     city: 'Jaipur',    desc: "India's premier destination wedding curators, crafting unforgettable celebrations since 2010." },
//   { id: 9,  name: 'Forest Essentials',         category: 'Beauty',       city: 'Delhi',     desc: "Luxurious Ayurvedic beauty rituals crafted from the purest natural ingredients across India." },
//   { id: 10, name: 'Kama Ayurveda',             category: 'Beauty',       city: 'Delhi',     desc: "Ancient wisdom, modern luxury — India's most revered natural beauty and wellness brand." },
//   { id: 11, name: 'The Leela Palaces',         category: 'Hospitality',  city: 'Pan-India', desc: "India's most celebrated luxury hotel collection — palaces, resorts, and urban sanctuaries." },
//   { id: 12, name: 'Aman New Delhi',            category: 'Hospitality',  city: 'Delhi',     desc: "A serene urban retreat redefining hotel luxury in the heart of India's capital city." },
// ];

// function PartnerCard({ partner }: { partner: typeof PARTNERS[0] }) {
//   const [hov, setHov] = useState(false);
//   const initials = partner.name.split(' ').map(w => w[0]).slice(0, 2).join('');

//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         background: hov ? '#0a0a0a' : '#ffffff',
//         border: '1px solid',
//         borderColor: hov ? 'transparent' : '#ececec',
//         padding: '36px 32px 28px',
//         position: 'relative',
//         overflow: 'hidden',
//         transition: 'all 0.3s ease',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: hov ? 'linear-gradient(90deg,#1B4D45,#C9A84C)' : '#1B4D45', transition: 'background 0.3s' }} />

//       <div style={{ width: 56, height: 56, background: hov ? 'rgba(201,168,76,0.1)' : '#f5f5f5', border: `1px solid ${hov ? 'rgba(201,168,76,0.3)' : '#e8e8e8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'all 0.3s' }}>
//         <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300, color: hov ? '#C9A84C' : '#999', letterSpacing: '0.05em' }}>{initials}</span>
//       </div>

//       <p style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.6)' : '#1B4D45', fontFamily: 'sans-serif', marginBottom: 10, transition: 'color 0.3s' }}>{partner.category}</p>
//       <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, color: hov ? '#ffffff' : '#0a0a0a', marginBottom: 12, letterSpacing: '0.01em', lineHeight: 1.3, transition: 'color 0.3s' }}>{partner.name}</h3>
//       <div style={{ width: hov ? 36 : 24, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width 0.3s' }} />
//       <p style={{ fontSize: 13, lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.5)' : '#666', marginBottom: 24, flex: 1, transition: 'color 0.3s' }}>{partner.desc}</p>

//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.4)' : '#aaa', fontFamily: 'sans-serif', transition: 'color 0.3s' }}>📍 {partner.city}</span>
//         <a href="mailto:hello@indianluxuryhouse.com" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: hov ? '#0a0a0a' : '#1B4D45', background: hov ? '#C9A84C' : 'transparent', border: `1px solid ${hov ? '#C9A84C' : 'rgba(27,77,69,0.35)'}`, padding: '8px 16px', textDecoration: 'none', fontFamily: 'sans-serif', transition: 'all 0.25s', fontWeight: 500 }}>Inquire →</a>
//       </div>
//     </div>
//   );
// }

// export default function PartnersPage() {
//   const [active, setActive] = useState('All');
//   const filtered = active === 'All' ? PARTNERS : PARTNERS.filter(p => p.category === active);

//   return (
//     <>
//       <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

//         {/* HERO */}
//         <section style={{ position: 'relative', background: '#0a0a0a', padding: '100px 32px 90px', overflow: 'hidden', textAlign: 'center' }}>
//           <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px)' }} />
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />

//           <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto' }}>
//             <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>Trusted Network</p>
//             <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(38px, 6vw, 76px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 28 }}>
//               Curated <em style={{ color: '#C9A84C' }}>Partners</em>
//             </h1>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
//               <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
//               <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
//               <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
//             </div>
//             <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', fontWeight: 300, fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
//               India's trusted network of premium businesses.
//             </p>
//           </div>
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
//         </section>

//         {/* FILTER */}
//         <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
//             {CATEGORIES.map((cat, i) => (
//               <button key={cat} onClick={() => setActive(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '20px 22px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 500, color: active === cat ? '#C9A84C' : 'rgba(255,255,255,0.3)', borderBottom: active === cat ? '2px solid #C9A84C' : '2px solid transparent', borderRight: i < CATEGORIES.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>{cat}</button>
//             ))}
//           </div>
//         </div>

//         {/* GRID */}
//         <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 80px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
//             <p style={{ fontSize: 11, color: '#aaa', fontFamily: 'sans-serif', letterSpacing: '0.1em' }}>
//               <span style={{ color: '#C9A84C', fontWeight: 600 }}>{filtered.length}</span> partners in {active === 'All' ? 'all categories' : active}
//             </p>
//             <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="partners-grid">
//             {filtered.map(p => <PartnerCard key={p.id} partner={p} />)}
//           </div>
//         </section>

//         {/* CTA */}
//         <section style={{ background: '#0a0a0a', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
//           <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
//           <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />

//           <div style={{ maxWidth: 560, margin: '0 auto' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'sans-serif' }}>Join the Network</p>
//             <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#ffffff', marginBottom: 16, letterSpacing: '0.01em' }}>
//               Want to be <em style={{ color: '#C9A84C' }}>Featured?</em>
//             </h2>
//             <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto 24px' }} />
//             <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 40, lineHeight: 1.85, fontWeight: 300, fontFamily: 'sans-serif' }}>
//               Join India's most trusted luxury network. Be seen by the audience that matters.
//             </p>
//             <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Link href="/partner" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#0a0a0a', background: '#C9A84C', padding: '16px 36px', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 600, transition: 'background 0.2s', display: 'inline-block' }}
//                 onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
//                 onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
//               >Apply Now →</Link>
//               <a href="mailto:hello@indianluxuryhouse.com" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)', padding: '16px 36px', textDecoration: 'none', fontFamily: 'sans-serif', transition: 'border-color 0.2s', display: 'inline-block' }}
//                 onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
//               >Email Us</a>
//             </div>
//           </div>
//         </section>

//         <div style={{ textAlign: 'center', padding: '36px 32px 52px', borderTop: '1px solid #f0f0f0' }}>
//           <Link href="/" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif', borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3 }}>← Back to Journal</Link>
//         </div>

//       </main>

//       <style>{`
//         @media (max-width: 767px) { .partners-grid { grid-template-columns: 1fr !important; } }
//         @media (min-width: 768px) and (max-width: 1023px) { .partners-grid { grid-template-columns: repeat(2,1fr) !important; } }
//       `}</style>
//     </>
//   );
// }