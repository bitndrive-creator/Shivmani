'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';

// ── TYPES ──────────────────────────────────────────────────────
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
  coverImage?: string;
}

interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
  heroImage: string;
}

const API_BASE = 'https://api.indianluxuryhouse.com';

const CAT_IMAGE_MAP: Record<string, string> = {
  'Real Estate':         '/images/real-estate.jpg',
  'Automobiles':         '/images/automobiles.jpg',
  'Jewellery & Watches': '/images/Jewellery.png',
  'Weddings':            '/images/hero-weddings.jpg',
  'Curated Partners':    '/images/hero-partners.jpg',
  'Hospitality':         '/images/hero-partners.jpg',
  'Beauty':              '/images/Jewellery.png',
};

// ── IMAGE URL HELPER ───────────────────────────────────────────
function getImg(coverImage?: string, category?: string): string {
  if (coverImage) {
    if (coverImage.includes('localhost')) {
      const filename = coverImage.split('/uploads/')[1];
      return `${API_BASE}/uploads/${filename}`;
    }
    if (coverImage.startsWith('http')) return coverImage;
    if (coverImage.startsWith('/uploads/')) return `${API_BASE}${coverImage}`;
    return `${API_BASE}/uploads/${coverImage}`;
  }
  return CAT_IMAGE_MAP[category ?? ''] ?? '/images/real-estate.jpg';
}

// ── CATEGORIES ─────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  { name: 'Real Estate',         slug: 'real-estate',       icon: '🏛️', description: "India's finest residences and global investment opportunities", heroImage: '/images/real-estate.jpg'   },
  { name: 'Automobiles',         slug: 'automobiles',        icon: '🚗', description: 'Luxury performance, prestige, and collector culture',           heroImage: '/images/automobiles.jpg'   },
  { name: 'Jewellery & Watches', slug: 'jewellery-watches',  icon: '💎', description: 'Timeless assets. Enduring style.',                              heroImage: '/images/Jewellery.png'     },
  { name: 'Weddings',            slug: 'weddings',           icon: '✨', description: "India's world of couture celebrations and unforgettable occasions", heroImage: '/images/hero-weddings.jpg' },
  { name: 'Curated Partners',    slug: 'curated-partners',   icon: '🤝', description: "India's trusted network of premium businesses",                 heroImage: '/images/hero-partners.jpg' },
];

// Slug → Category name map
const SLUG_TO_CAT: Record<string, string> = {
  'real-estate':       'Real Estate',
  'automobiles':       'Automobiles',
  'jewellery-watches': 'Jewellery & Watches',
  'weddings':          'Weddings',
  'curated-partners':  'Curated Partners',
};

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

// ── ILH LOGO ──────────────────────────────────────────────────
function ILHLogo({ size = 32 }: { size?: number }) {
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

// ── HEADER ────────────────────────────────────────────────────
function Header({ currentHref }: { currentHref: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.92)',
      backdropFilter: 'blur(12px)', transition: 'background .4s',
      boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
    }}>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.7 }} />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
          <ILHLogo size={38} />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
            <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.45)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center' }} className="ilh-cat-nav">
          {NAV_LINKS.map(link => {
            const isActive = link.href === currentHref;
            return (
              <Link key={link.href} href={link.href}
                style={{
                  fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: isActive ? '#DFC27A' : 'rgba(201,168,76,0.6)',
                  textDecoration: 'none', padding: '8px 10px',
                  borderBottom: isActive ? '1px solid #C9A84C' : '1px solid transparent',
                  fontWeight: isActive ? 500 : 400,
                  transition: 'color .2s, border-color .2s', whiteSpace: 'nowrap',
                  ...(link.href === '/partner-with-us' && !isActive ? { color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 10px', marginLeft: 4 } : {}),
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#DFC27A'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)'; }}
              >{link.label}</Link>
            );
          })}
        </nav>

        <button className="ilh-cat-ham" onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4, display: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: open ? 560 : 0, transition: 'max-height .3s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
            style={{ display: 'block', padding: '13px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: link.href === currentHref ? '#DFC27A' : 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >{link.label}</Link>
        ))}
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />

      <style>{`
        .ilh-cat-nav { display: flex !important; }
        .ilh-cat-ham { display: none !important; }
        @media(max-width:1100px){ .ilh-cat-nav { display: none !important; } .ilh-cat-ham { display: block !important; } }
      `}</style>
    </header>
  );
}

// ── POST CARD ─────────────────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  const [hov, setHov] = useState(false);
  const imgSrc = getImg(post.coverImage, post.category);
  const catSlug = Object.entries(SLUG_TO_CAT).find(([, v]) => v === post.category)?.[0] ?? post.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--+/g, '-');

  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return iso; }
  };

  return (
    <Link href={`/${catSlug}/${post.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', height: '100%', border: '1px solid rgba(0,0,0,0.06)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden', background: '#1A1A1A' }}>
        <Image src={imgSrc} alt={post.title} fill
          style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
          sizes="(max-width:768px) 100vw, 33vw"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
          {post.category}
        </span>
      </div>
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ width: hov ? 38 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .3s' }} />
        <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 400, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em' }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
          <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.5)', letterSpacing: '0.04em' }}>{formatDate(post.createdAt)} · {post.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}

// ── SKELETON ──────────────────────────────────────────────────
function PostSkeleton() {
  return (
    <div style={{ background: '#FAFAF8', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ paddingBottom: '62%', background: 'linear-gradient(90deg,#f0ebe0 25%,#e8e2d4 50%,#f0ebe0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: '20px 22px' }}>
        <div style={{ height: 1, width: 20, background: '#C9A84C', marginBottom: 14 }} />
        <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 8, width: '90%' }} />
        <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 16, width: '70%' }} />
        <div style={{ height: 12, background: '#ede8dd', borderRadius: 2, width: '50%' }} />
      </div>
    </div>
  );
}

// ── MAIN CATEGORY PAGE ────────────────────────────────────────
export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const cat = CATEGORIES.find(c => c.slug === slug);
  const currentHref = `/${slug}`;
  const categoryName = SLUG_TO_CAT[slug] ?? '';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/editorials`);
        if (!res.ok) return;
        const data: Post[] = await res.json();
        // ✅ Sirf is category ke published posts
        const filtered = data.filter(p => p.isPublished && p.category === categoryName);
        setPosts(filtered);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (categoryName) fetchPosts();
    else setLoading(false);
  }, [categoryName]);

  if (!cat) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <ILHLogo size={56} />
        <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 36, fontWeight: 300, color: '#1A1A1A' }}>Category Not Found</h1>
        <Link href="/" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header currentHref={currentHref} />
      <main style={{ paddingTop: 72 }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', height: 360, overflow: 'hidden', background: '#0A0A0A' }}>
          <Image src={cat.heroImage} alt={cat.name} fill priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 55%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 44px', maxWidth: 720 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
              >Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: '#C9A84C' }}>{cat.name}</span>
            </div>
            <p style={{ fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: 12 }}>Category</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <span style={{ fontSize: 42 }}>{cat.icon}</span>
              <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(34px,6vw,62px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, letterSpacing: '0.02em' }}>{cat.name}</h1>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.5)', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.55 }}>{cat.description}</p>
          </div>

          {!loading && (
            <div style={{ position: 'absolute', bottom: 44, right: 48, zIndex: 10 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(201,168,76,0.2)', padding: '7px 14px', backdropFilter: 'blur(4px)' }}>
                {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>
          )}
        </section>

        {/* ── POSTS GRID ── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 88px', background: '#FAFAF8' }}>

          {/* Loading */}
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-posts-grid">
              {[1,2,3,4,5,6].map(i => <PostSkeleton key={i} />)}
            </div>
          )}

          {/* No posts */}
          {!loading && posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '88px 24px' }}>
              <span style={{ fontSize: 52, display: 'block', marginBottom: 20, opacity: 0.3 }}>{cat.icon}</span>
              <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, fontWeight: 300, color: '#6B6558', marginBottom: 10 }}>No articles yet</h2>
              <p style={{ fontSize: 13, color: 'rgba(107,101,88,0.6)', marginBottom: 32 }}>New stories in {cat.name} are coming soon.</p>
              <Link href="/" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
              >← Back to Home</Link>
            </div>
          )}

          {/* Posts */}
          {!loading && posts.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 18 }}>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8 }}>{posts.length} {posts.length === 1 ? 'story' : 'stories'}</p>
                  <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.01em' }}>Latest in {cat.name}</h2>
                </div>
                <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.35)', alignSelf: 'center' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-posts-grid">
                {posts.map(p => <PostCard key={p._id} post={p} />)}
              </div>
            </>
          )}
        </section>

        {/* ── OTHER CATEGORIES ── */}
        <section style={{ background: '#0A0A0A', padding: '56px 0', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: 28, textAlign: 'center' }}>Explore More</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 1, background: 'rgba(201,168,76,0.08)' }} className="ilh-explore-grid">
              {CATEGORIES.map(c => {
                const isCurrent = c.slug === slug;
                return (
                  <Link key={c.slug} href={`/${c.slug}`}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 10px', textDecoration: 'none', gap: 10, background: isCurrent ? 'rgba(201,168,76,0.1)' : 'transparent', transition: 'background .25s' }}
                    onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; }}
                    onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{ fontSize: 26 }}>{c.icon}</span>
                    <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: isCurrent ? '#DFC27A' : 'rgba(201,168,76,0.48)', textAlign: 'center', lineHeight: 1.4 }}>{c.name}</span>
                    {isCurrent && <span style={{ width: 16, height: 1, background: '#C9A84C', display: 'block' }} />}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @media(max-width:900px){ .ilh-posts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:600px){ .ilh-posts-grid { grid-template-columns: 1fr !important; } }
        @media(max-width:768px){ .ilh-explore-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media(max-width:480px){ .ilh-explore-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </>
  );
}


// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect, use } from 'react';

// // ── TYPES ──────────────────────────────────────────────────────
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
//   icon: string;
//   description: string;
//   heroImage: string;
// }

// // ── CATEGORIES ────────────────────────────────────────────────
// const CATEGORIES: Category[] = [
//   { name: 'Real Estate',         slug: 'real-estate',       icon: '🏛️', description: "India's finest residences and global investment opportunities", heroImage: '/images/placeholder-home.jpg'  },
//   { name: 'Automobiles',         slug: 'automobiles',        icon: '🚗', description: 'Luxury performance, prestige, and collector culture',           heroImage: '/images/automobiles.jpg'  },
//   { name: 'Jewellery & Watches', slug: 'jewellery-watches',  icon: '💎', description: 'Timeless assets. Enduring style.',                              heroImage: '/images/Jewellery.png'    },
//   { name: 'Weddings',            slug: 'weddings',           icon: '✨', description: "India's world of couture celebrations and unforgettable occasions", heroImage: '/images/hero-weddings.jpg'  },
//   { name: 'Curated Partners',    slug: 'curated-partners',   icon: '🤝', description: "India's trusted network of premium businesses",                 heroImage: '/images/hero-partners.jpg'    },
// ];

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

// // ── ALL POSTS ──────────────────────────────────────────────────
// const ALL_POSTS: Post[] = [
//   { id: '1',  slug: 'branded-residences-rise-india',          category: 'Real Estate',         title: 'Branded Residences Rise: How Global Luxury Hotels Are Redefining Indian Real Estate',      excerpt: "From Four Seasons to Ritz-Carlton, global hospitality giants are reimagining luxury living in India's most coveted addresses.",          imageUrl: '/images/real-estate.jpg',      author: 'Priya Mehta',     publishedAt: 'Apr 28, 2026', readTime: 8,  featured: true  },
//   { id: '2',  slug: 'best-second-home-markets-india-2026',    category: 'Real Estate',         title: 'The Best Second-Home Markets in India for 2026',                                            excerpt: "From Alibaug to Kasauli, where India's ultra-affluent are investing in their next great escape.",                                        imageUrl: '/images/hero-home.jpg',        author: 'Rahul Singhania', publishedAt: 'Apr 24, 2026', readTime: 6,  featured: false },
//   { id: '3',  slug: 'rolls-royce-spectre-india-launch',       category: 'Automobiles',         title: 'Rolls-Royce Spectre Arrives in India: The First All-Electric Ultra-Luxury Car',             excerpt: "Silent, powerful, and unmistakably Rolls-Royce. We drive the Spectre on India's most scenic roads.",                                     imageUrl: '/images/automobiles.jpg',      author: 'Vikram Oberoi',   publishedAt: 'Apr 22, 2026', readTime: 7,  featured: false },
//   { id: '4',  slug: 'best-luxury-suvs-india-2026',            category: 'Automobiles',         title: 'The 7 Best Luxury SUVs Money Can Buy in India Right Now',                                   excerpt: "From Bentley Bentayga to Lamborghini Urus — the definitive ranking for India's most discerning drivers.",                                imageUrl: '/images/hero-cars.jpg',        author: 'Arjun Kapoor',    publishedAt: 'Apr 18, 2026', readTime: 6,  featured: false },
//   { id: '5',  slug: 'heritage-jewellery-trends-2026',         category: 'Jewellery & Watches', title: "Heritage Jewellery Trends Dominating India's Bridal Season in 2026",                        excerpt: "Polki, Kundan, Jadau — the timeless crafts of India's royal courts are having their most spectacular moment yet.",                        imageUrl: '/images/Jewellery.png',        author: 'Isha Thapar',     publishedAt: 'Apr 15, 2026', readTime: 5,  featured: false },
//   { id: '6',  slug: 'watches-worth-collecting-india',         category: 'Jewellery & Watches', title: "5 Watches Worth Collecting in 2026 — An Indian Connoisseur's Guide",                        excerpt: "Patek Philippe, A. Lange & Söhne, F.P. Journe. Our editors pick the horological icons you should be acquiring now.",                      imageUrl: '/images/hero-watches.jpg',     author: 'Siddharth Rao',   publishedAt: 'Apr 10, 2026', readTime: 7,  featured: false },
//   { id: '7',  slug: 'destination-wedding-trends-2026',        category: 'Weddings',            title: "Destination Wedding Trends Redefining India's Luxury Wedding Season",                        excerpt: "From Rajasthan's heritage forts to Maldivian islands, India's elite are choosing destinations as extraordinary as their love stories.",  imageUrl: '/images/hero-weddings.jpg',    author: 'Ananya Birla',    publishedAt: 'Apr 8, 2026',  readTime: 6,  featured: false },
//   { id: '8',  slug: 'luxury-bridal-looks-2026',               category: 'Weddings',            title: 'The Most Covetable Bridal Looks of 2026 — From Sabyasachi to Manish Malhotra',              excerpt: "India's couture masters have outdone themselves this season. Our editors curate the looks that made us catch our breath.",                 imageUrl: '/images/hero-weddings.jpg',    author: 'Divya Nair',      publishedAt: 'Apr 4, 2026',  readTime: 5,  featured: false },
//   { id: '9',  slug: 'oberoi-group-curated-partner-spotlight', category: 'Curated Partners',    title: 'Partner Spotlight: The Oberoi Group — Redefining Luxury Hospitality in India',              excerpt: "From New Delhi to Udaipur, the Oberoi Group has long set the standard for luxury hospitality. We go inside the legend.",                  imageUrl: '/images/hero-partners.jpg',    author: 'Ritu Sharma',     publishedAt: 'Apr 2, 2026',  readTime: 6,  featured: false },
// ];

// // ── ILH LOGO ──────────────────────────────────────────────────
// function ILHLogo({ size = 32 }: { size?: number }) {
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

// // ── HEADER ────────────────────────────────────────────────────
// function Header({ currentHref }: { currentHref: string }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   return (
//     <header style={{
//       position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
//       background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.92)',
//       backdropFilter: 'blur(12px)', transition: 'background .4s',
//       boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
//     }}>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.7 }} />
//       <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

//         <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
//           <ILHLogo size={38} />
//           <div style={{ lineHeight: 1 }}>
//             <div style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
//             <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.45)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//           </div>
//         </Link>

//         <nav style={{ display: 'flex', alignItems: 'center' }} className="ilh-cat-nav">
//           {NAV_LINKS.map(link => {
//             const isActive = link.href === currentHref;
//             return (
//               <Link key={link.href} href={link.href}
//                 style={{
//                   fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
//                   color: isActive ? '#DFC27A' : 'rgba(201,168,76,0.6)',
//                   textDecoration: 'none', padding: '8px 10px',
//                   borderBottom: isActive ? '1px solid #C9A84C' : '1px solid transparent',
//                   fontWeight: isActive ? 500 : 400,
//                   transition: 'color .2s, border-color .2s', whiteSpace: 'nowrap',
//                   ...(link.href === '/partner-with-us' && !isActive ? { color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 10px', marginLeft: 4 } : {}),
//                 }}
//                 onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#DFC27A'; }}
//                 onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)'; }}
//               >{link.label}</Link>
//             );
//           })}
//         </nav>

//         <button className="ilh-cat-ham" onClick={() => setOpen(!open)}
//           style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4, display: 'none' }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             {open ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//           </svg>
//         </button>
//       </div>

//       <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: open ? 560 : 0, transition: 'max-height .3s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//         {NAV_LINKS.map(link => (
//           <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
//             style={{ display: 'block', padding: '13px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: link.href === currentHref ? '#DFC27A' : 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
//             onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//             onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//           >{link.label}</Link>
//         ))}
//       </div>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />

//       <style>{`
//         .ilh-cat-nav { display: flex !important; }
//         .ilh-cat-ham { display: none !important; }
//         @media(max-width:1100px){ .ilh-cat-nav { display: none !important; } .ilh-cat-ham { display: block !important; } }
//       `}</style>
//     </header>
//   );
// }

// // ── POST CARD ─────────────────────────────────────────────────
// function PostCard({ post }: { post: Post }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', height: '100%', border: '1px solid rgba(0,0,0,0.06)' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={post.imageUrl || '/images/placeholder.jpg'} alt={post.title} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//           sizes="(max-width:768px) 100vw, 33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
//           {post.category}
//         </span>
//       </div>
//       <div style={{ padding: '20px 22px 22px' }}>
//         <div style={{ width: hov ? 38 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .3s' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 400, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em' }}>{post.title}</h3>
//         <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
//           <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.5)', letterSpacing: '0.04em' }}>{post.readTime} min read</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── MAIN CATEGORY PAGE ────────────────────────────────────────
// export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = use(params);
//   const [activeFilter, setActiveFilter] = useState('All');

//   const cat = CATEGORIES.find(c => c.slug === slug);
//   const currentHref = `/${slug}`;

//   if (!cat) {
//     return (
//       <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
//         <ILHLogo size={56} />
//         <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 36, fontWeight: 300, color: '#1A1A1A' }}>Category Not Found</h1>
//         <Link href="/" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
//           ← Back to Home
//         </Link>
//       </div>
//     );
//   }

//   const catPosts = ALL_POSTS.filter(p => p.category === cat.name);
//   const filters = ['All', 'Latest', 'Most Read', "Editors' Pick"];

//   return (
//     <>
//       <Header currentHref={currentHref} />
//       <main style={{ paddingTop: 72 }}>

//         {/* HERO */}
//         <section style={{ position: 'relative', height: 360, overflow: 'hidden', background: '#0A0A0A' }}>
//           <Image src={cat.heroImage} alt={cat.name} fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 55%, transparent 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 60%)' }} />
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.5 }} />

//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 44px', maxWidth: 720 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
//               >Home</Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>{cat.name}</span>
//             </div>
//             <p style={{ fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: 12 }}>Category</p>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
//               <span style={{ fontSize: 42 }}>{cat.icon}</span>
//               <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(34px,6vw,62px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, letterSpacing: '0.02em' }}>{cat.name}</h1>
//             </div>
//             <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.5)', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.55 }}>{cat.description}</p>
//           </div>

//           <div style={{ position: 'absolute', bottom: 44, right: 48, zIndex: 10 }}>
//             <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(201,168,76,0.2)', padding: '7px 14px', backdropFilter: 'blur(4px)' }}>
//               {catPosts.length} {catPosts.length === 1 ? 'Article' : 'Articles'}
//             </span>
//           </div>
//         </section>

//         {/* FILTER BAR */}
//         <div style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(201,168,76,0.15)', position: 'sticky', top: 72, zIndex: 30 }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
//             {filters.map(f => {
//               const active = f === activeFilter;
//               return (
//                 <button key={f} onClick={() => setActiveFilter(f)}
//                   style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '14px 20px', border: 'none', cursor: 'pointer', background: 'transparent', color: active ? '#DFC27A' : 'rgba(201,168,76,0.4)', borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent', transition: 'all .2s', whiteSpace: 'nowrap', borderRight: '1px solid rgba(201,168,76,0.08)' }}
//                   onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#C9A84C'; }}
//                   onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(201,168,76,0.4)'; }}
//                 >{f}</button>
//               );
//             })}
//           </div>
//         </div>

//         {/* POSTS GRID */}
//         <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 88px', background: '#FAFAF8' }}>
//           {catPosts.length === 0 ? (
//             <div style={{ textAlign: 'center', padding: '88px 24px' }}>
//               <span style={{ fontSize: 52, display: 'block', marginBottom: 20, opacity: 0.3 }}>{cat.icon}</span>
//               <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, fontWeight: 300, color: '#6B6558', marginBottom: 10 }}>No articles yet</h2>
//               <p style={{ fontSize: 13, color: 'rgba(107,101,88,0.6)', marginBottom: 32 }}>New stories in {cat.name} are coming soon.</p>
//               <Link href="/" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
//               >← Back to Home</Link>
//             </div>
//           ) : (
//             <>
//               <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 18 }}>
//                 <div>
//                   <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8 }}>{catPosts.length} {catPosts.length === 1 ? 'story' : 'stories'}</p>
//                   <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.01em' }}>Latest in {cat.name}</h2>
//                 </div>
//                 <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.35)', alignSelf: 'center' }} />
//               </div>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-posts-grid">
//                 {catPosts.map(p => <PostCard key={p.id} post={p} />)}
//               </div>
//             </>
//           )}
//         </section>

//         {/* OTHER CATEGORIES */}
//         <section style={{ background: '#0A0A0A', padding: '56px 0', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: 28, textAlign: 'center' }}>Explore More</p>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 1, background: 'rgba(201,168,76,0.08)' }} className="ilh-explore-grid">
//               {CATEGORIES.map(c => {
//                 const isCurrent = c.slug === slug;
//                 return (
//                   <Link key={c.slug} href={`/${c.slug}`}
//                     style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 10px', textDecoration: 'none', gap: 10, background: isCurrent ? 'rgba(201,168,76,0.1)' : 'transparent', transition: 'background .25s' }}
//                     onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; }}
//                     onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
//                   >
//                     <span style={{ fontSize: 26 }}>{c.icon}</span>
//                     <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: isCurrent ? '#DFC27A' : 'rgba(201,168,76,0.48)', textAlign: 'center', lineHeight: 1.4 }}>{c.name}</span>
//                     {isCurrent && <span style={{ width: 16, height: 1, background: '#C9A84C', display: 'block' }} />}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//       </main>

//       <style>{`
//         @media(max-width:900px){ .ilh-posts-grid { grid-template-columns: repeat(2,1fr) !important; } }
//         @media(max-width:600px){ .ilh-posts-grid { grid-template-columns: 1fr !important; } }
//         @media(max-width:768px){ .ilh-explore-grid { grid-template-columns: repeat(3,1fr) !important; } }
//         @media(max-width:480px){ .ilh-explore-grid { grid-template-columns: repeat(2,1fr) !important; } }
//       `}</style>
//     </>
//   );
// }


// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, use } from 'react';

// // ── TYPES ──────────────────────────────────────────────────────
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
//   icon: string;
//   description: string;
//   heroImage: string;
// }

// // ── CATEGORIES (blueprint ke hisab se) ────────────────────────
// const CATEGORIES: Category[] = [
//   { name: 'Real Estate',         slug: 'real-estate',       icon: '🏛️', description: "India's finest residences and global investment opportunities", heroImage: '/images/placeholder-home.jpg'  },
//   { name: 'Automobiles',         slug: 'automobiles',        icon: '🚗', description: 'Luxury performance, prestige, and collector culture',           heroImage: '/images/automobiles.jpg'  },
//   { name: 'Jewellery & Watches', slug: 'jewellery-watches',  icon: '💎', description: 'Timeless assets. Enduring style.',                              heroImage: '/images/Jewellery.png'    },
//   { name: 'Weddings',            slug: 'weddings',           icon: '✨', description: "India's world of couture celebrations and unforgettable occasions", heroImage: '/images/hero-weddings.jpg'  },
//   { name: 'Curated Partners',    slug: 'curated-partners',   icon: '🤝', description: "India's trusted network of premium businesses",                 heroImage: '/images/hero-partners.jpg'    },
// ];

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

// // ── ALL POSTS (ILH categories) ─────────────────────────────────
// const ALL_POSTS: Post[] = [
//   { id: '1',  slug: 'branded-residences-rise-india',          category: 'Real Estate',         title: 'Branded Residences Rise: How Global Luxury Hotels Are Redefining Indian Real Estate',      excerpt: 'From Four Seasons to Ritz-Carlton, global hospitality giants are reimagining luxury living in India\'s most coveted addresses.',          imageUrl: '/images/real-estate.jpg',  author: 'Priya Mehta',     publishedAt: 'Apr 28, 2026', readTime: 8,  featured: true  },
//   { id: '2',  slug: 'best-second-home-markets-india-2026',    category: 'Real Estate',         title: 'The Best Second-Home Markets in India for 2026',                                            excerpt: 'From Alibaug to Kasauli, where India\'s ultra-affluent are investing in their next great escape.',                                        imageUrl: '/images/hero-home.jpg',  author: 'Rahul Singhania', publishedAt: 'Apr 24, 2026', readTime: 6,  featured: false },
//   { id: '3',  slug: 'rolls-royce-spectre-india-launch',       category: 'Automobiles',         title: 'Rolls-Royce Spectre Arrives in India: The First All-Electric Ultra-Luxury Car',             excerpt: 'Silent, powerful, and unmistakably Rolls-Royce. We drive the Spectre on India\'s most scenic roads.',                                     imageUrl: '/images/automobiles.jpg',         author: 'Vikram Oberoi',   publishedAt: 'Apr 22, 2026', readTime: 7,  featured: false },
//   { id: '4',  slug: 'best-luxury-suvs-india-2026',            category: 'Automobiles',         title: 'The 7 Best Luxury SUVs Money Can Buy in India Right Now',                                   excerpt: 'From Bentley Bentayga to Lamborghini Urus — the definitive ranking for India\'s most discerning drivers.',                                imageUrl: '/images/hero-cars.jpg',         author: 'Arjun Kapoor',    publishedAt: 'Apr 18, 2026', readTime: 6,  featured: false },
//   { id: '5',  slug: 'heritage-jewellery-trends-2026',         category: 'Jewellery & Watches', title: 'Heritage Jewellery Trends Dominating India\'s Bridal Season in 2026',                       excerpt: 'Polki, Kundan, Jadau — the timeless crafts of India\'s royal courts are having their most spectacular moment yet.',                        imageUrl: '/images/Jewellery.png',        author: 'Isha Thapar',     publishedAt: 'Apr 15, 2026', readTime: 5,  featured: false },
//   { id: '6',  slug: 'watches-worth-collecting-india',         category: 'Jewellery & Watches', title: '5 Watches Worth Collecting in 2026 — An Indian Connoisseur\'s Guide',                       excerpt: 'Patek Philippe, A. Lange & Söhne, F.P. Journe. Our editors pick the horological icons you should be acquiring now.',                      imageUrl: '/images/hero-watches.jpg',        author: 'Siddharth Rao',   publishedAt: 'Apr 10, 2026', readTime: 7,  featured: false },
//   { id: '7',  slug: 'destination-wedding-trends-2026',        category: 'Weddings',            title: 'Destination Wedding Trends Redefining India\'s Luxury Wedding Season',                       excerpt: 'From Rajasthan\'s heritage forts to Maldivian islands, India\'s elite are choosing destinations as extraordinary as their love stories.',  imageUrl: '/images/hero-weddings.jpg',      author: 'Ananya Birla',    publishedAt: 'Apr 8, 2026',  readTime: 6,  featured: false },
//   { id: '8',  slug: 'luxury-bridal-looks-2026',               category: 'Weddings',            title: 'The Most Covetable Bridal Looks of 2026 — From Sabyasachi to Manish Malhotra',              excerpt: 'India\'s couture masters have outdone themselves this season. Our editors curate the looks that made us catch our breath.',                 imageUrl: '/images/hero-weddings.jpg',      author: 'Divya Nair',      publishedAt: 'Apr 4, 2026',  readTime: 5,  featured: false },
//   { id: '9',  slug: 'oberoi-group-curated-partner-spotlight', category: 'Curated Partners',    title: 'Partner Spotlight: The Oberoi Group — Redefining Luxury Hospitality in India',              excerpt: 'From New Delhi to Udaipur, the Oberoi Group has long set the standard for luxury hospitality. We go inside the legend.',                  imageUrl: '/images/hero-partners.jpg',      author: 'Ritu Sharma',     publishedAt: 'Apr 2, 2026',  readTime: 6,  featured: false },
// ];

// // ── ILH LOGO ──────────────────────────────────────────────────
// function ILHLogo({ size = 32 }: { size?: number }) {
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

// // ── HEADER ────────────────────────────────────────────────────
// function Header({ currentHref }: { currentHref: string }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   return (
//     <header style={{
//       position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
//       background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.92)',
//       backdropFilter: 'blur(12px)', transition: 'background .4s',
//       boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
//     }}>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.7 }} />
//       <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

//         {/* Logo */}
//         <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
//           <ILHLogo size={38} />
//           <div style={{ lineHeight: 1 }}>
//             <div style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
//             <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.45)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//           </div>
//         </Link>

//         {/* Desktop Nav */}
//         <nav style={{ display: 'flex', alignItems: 'center' }} className="ilh-cat-nav">
//           {NAV_LINKS.map(link => {
//             const isActive = link.href === currentHref;
//             return (
//               <Link key={link.href} href={link.href}
//                 style={{
//                   fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
//                   color: isActive ? '#DFC27A' : 'rgba(201,168,76,0.6)',
//                   textDecoration: 'none', padding: '8px 10px',
//                   borderBottom: isActive ? '1px solid #C9A84C' : '1px solid transparent',
//                   fontWeight: isActive ? 500 : 400,
//                   transition: 'color .2s, border-color .2s', whiteSpace: 'nowrap',
//                   ...(link.href === '/partner-with-us' && !isActive ? { color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 10px', marginLeft: 4 } : {}),
//                 }}
//                 onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#DFC27A'; } }}
//                 onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)'; } }}
//               >{link.label}</Link>
//             );
//           })}
//         </nav>

//         {/* Hamburger */}
//         <button className="ilh-cat-ham" onClick={() => setOpen(!open)}
//           style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4, display: 'none' }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             {open ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile dropdown */}
//       <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: open ? 560 : 0, transition: 'max-height .3s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//         {NAV_LINKS.map(link => (
//           <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
//             style={{ display: 'block', padding: '13px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: link.href === currentHref ? '#DFC27A' : 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
//             onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//             onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//           >{link.label}</Link>
//         ))}
//       </div>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />

//       <style>{`
//         .ilh-cat-nav { display: flex !important; }
//         .ilh-cat-ham { display: none !important; }
//         @media(max-width:1100px){ .ilh-cat-nav { display: none !important; } .ilh-cat-ham { display: block !important; } }
//       `}</style>
//     </header>
//   );
// }



// // ── POST CARD ─────────────────────────────────────────────────
// function PostCard({ post }: { post: Post }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', height: '100%', border: '1px solid rgba(0,0,0,0.06)' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={post.imageUrl || '/images/placeholder.jpg'} alt={post.title} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//           sizes="(max-width:768px) 100vw, 33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
//           {post.category}
//         </span>
//       </div>

//       {/* Body */}
//       <div style={{ padding: '20px 22px 22px' }}>
//         <div style={{ width: hov ? 38 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .3s' }} />
//         <h3 style={{
//           fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 400, lineHeight: 1.4,
//           color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s',
//           display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em',
//         }}>{post.title}</h3>
//         <p style={{
//           fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300,
//           display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
//         }}>{post.excerpt}</p>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
//           <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.5)', letterSpacing: '0.04em' }}>{post.readTime} min read</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── MAIN CATEGORY PAGE ────────────────────────────────────────
// export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = use(params);
//   const [activeFilter, setActiveFilter] = useState('All');

//   const cat = CATEGORIES.find(c => c.slug === slug);
//   const currentHref = `/${slug}`;

//   // 404 fallback — pehle check karo
//   if (!cat) {
//     return (
//       <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
//         <ILHLogo size={56} />
//         <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 36, fontWeight: 300, color: '#1A1A1A' }}>Category Not Found</h1>
//         <Link href="/" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
//           ← Back to Home
//         </Link>
//       </div>
//     );
//   }

//   // cat guaranteed non-null yahan se aage
//   const catPosts = ALL_POSTS.filter(p => p.category === cat.name);

//   const filters = ['All', 'Latest', 'Most Read', "Editors' Pick"];

//   return (
//     <>
//       <Header currentHref={currentHref} />
//       <main style={{ paddingTop: 72 }}>

//         {/* ── CATEGORY HERO ───────────────────────────── */}
//         <section style={{ position: 'relative', height: 360, overflow: 'hidden', background: '#0A0A0A' }}>
//           <Image src={cat.heroImage} alt={cat.name} fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />
//           {/* Overlays */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 55%, transparent 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 60%)' }} />
//           {/* Gold bottom bar */}
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.5 }} />

//           {/* Content */}
//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 44px', maxWidth: 720 }}>
//             {/* Breadcrumb */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
//               >Home</Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>{cat.name}</span>
//             </div>

//             {/* Eyebrow */}
//             <p style={{ fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: 12 }}>Category</p>

//             {/* Title */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
//               <span style={{ fontSize: 42 }}>{cat.icon}</span>
//               <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(34px,6vw,62px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, letterSpacing: '0.02em' }}>
//                 {cat.name}
//               </h1>
//             </div>
//             <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.5)', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.55 }}>
//               {cat.description}
//             </p>
//           </div>

//           {/* Article count badge */}
//           <div style={{ position: 'absolute', bottom: 44, right: 48, zIndex: 10 }}>
//             <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(201,168,76,0.2)', padding: '7px 14px', backdropFilter: 'blur(4px)' }}>
//               {catPosts.length} {catPosts.length === 1 ? 'Article' : 'Articles'}
//             </span>
//           </div>
//         </section>

//         {/* ── FILTER BAR ──────────────────────────────── */}
//         <div style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(201,168,76,0.15)', position: 'sticky', top: 72, zIndex: 30 }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', overflowX: 'auto', gap: 0 }}>
//             {filters.map(f => {
//               const active = f === activeFilter;
//               return (
//                 <button key={f} onClick={() => setActiveFilter(f)}
//                   style={{
//                     fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
//                     padding: '14px 20px', border: 'none', cursor: 'pointer', background: 'transparent',
//                     color: active ? '#DFC27A' : 'rgba(201,168,76,0.4)',
//                     borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent',
//                     transition: 'all .2s', whiteSpace: 'nowrap',
//                     borderRight: '1px solid rgba(201,168,76,0.08)',
//                   }}
//                   onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#C9A84C'; }}
//                   onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(201,168,76,0.4)'; }}
//                 >{f}</button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ── POSTS GRID ──────────────────────────────── */}
//         <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 88px', background: '#FAFAF8' }}>
//           {catPosts.length === 0 ? (
//             <div style={{ textAlign: 'center', padding: '88px 24px' }}>
//               <span style={{ fontSize: 52, display: 'block', marginBottom: 20, opacity: 0.3 }}>{cat.icon}</span>
//               <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, fontWeight: 300, color: '#6B6558', marginBottom: 10 }}>No articles yet</h2>
//               <p style={{ fontSize: 13, color: 'rgba(107,101,88,0.6)', marginBottom: 32 }}>New stories in {cat.name} are coming soon.</p>
//               <Link href="/"
//                 style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '12px 28px', textDecoration: 'none', display: 'inline-block', transition: 'all .2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
//               >← Back to Home</Link>
//             </div>
//           ) : (
//             <>
//               <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 18 }}>
//                 <div>
//                   <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8 }}>
//                     {catPosts.length} {catPosts.length === 1 ? 'story' : 'stories'}
//                   </p>
//                   <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.01em' }}>
//                     Latest in {cat.name}
//                   </h2>
//                 </div>
//                 <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.35)', alignSelf: 'center' }} />
//               </div>

//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-posts-grid">
//                 {catPosts.map(p => <PostCard key={p.id} post={p} />)}
//               </div>
//             </>
//           )}
//         </section>

//         {/* ── OTHER CATEGORIES ────────────────────────── */}
//         <section style={{ background: '#0A0A0A', padding: '56px 0', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: 28, textAlign: 'center' }}>Explore More</p>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 1, background: 'rgba(201,168,76,0.08)' }} className="ilh-explore-grid">
//               {CATEGORIES.map(c => {
//                 const isCurrent = c.slug === slug;
//                 return (
//                   <Link key={c.slug} href={`/${c.slug}`}
//                     style={{
//                       display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//                       padding: '28px 10px', textDecoration: 'none', gap: 10,
//                       background: isCurrent ? 'rgba(201,168,76,0.1)' : 'transparent',
//                       transition: 'background .25s',
//                     }}
//                     onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; }}
//                     onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
//                   >
//                     <span style={{ fontSize: 26 }}>{c.icon}</span>
//                     <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: isCurrent ? '#DFC27A' : 'rgba(201,168,76,0.48)', textAlign: 'center', lineHeight: 1.4 }}>{c.name}</span>
//                     {isCurrent && <span style={{ width: 16, height: 1, background: '#C9A84C', display: 'block' }} />}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </section></main>
//       <style>{`
//         @media(max-width:900px){ .ilh-posts-grid { grid-template-columns: repeat(2,1fr) !important; } }
//         @media(max-width:600px){ .ilh-posts-grid { grid-template-columns: 1fr !important; } }
//         @media(max-width:768px){ .ilh-explore-grid { grid-template-columns: repeat(3,1fr) !important; } }
//         @media(max-width:480px){ .ilh-explore-grid { grid-template-columns: repeat(2,1fr) !important; } }
//       `}</style>
//     </>
//   );
// }


// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, use } from 'react';

// // ── TYPES ──────────────────────────────────────────────────────
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
//   icon: string;
//   description: string;
//   heroImage: string;
// }

// // ── CATEGORIES (blueprint ke hisab se) ────────────────────────
// const CATEGORIES: Category[] = [
//   { name: 'Real Estate',         slug: 'real-estate',       icon: '🏛️', description: "India's finest residences and global investment opportunities", heroImage: '/images/real-estate.jpg'  },
//   { name: 'Automobiles',         slug: 'automobiles',        icon: '🚗', description: 'Luxury performance, prestige, and collector culture',           heroImage: '/images/automobiles.jpg'  },
//   { name: 'Jewellery & Watches', slug: 'jewellery-watches',  icon: '💎', description: 'Timeless assets. Enduring style.',                              heroImage: '/images/Jewellery.png'    },
//     { name: 'Jewellery & Watches', slug: 'jewellery-watches',  icon: '💎', description: 'Timeless assets. Enduring style.',                              heroImage: '/images/hero-watches.png'    },
//   { name: 'Weddings',            slug: 'weddings',           icon: '✨', description: "India's world of couture celebrations and unforgettable occasions", heroImage: '/images/hero-weddings.jpg'  },
//   { name: 'Curated Partners',    slug: 'curated-partners',   icon: '🤝', description: "India's trusted network of premium businesses",                 heroImage: '/images/hero-partners.jpg'    },
// ];

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

// // ── ALL POSTS (ILH categories) ─────────────────────────────────
// const ALL_POSTS: Post[] = [
//   { id: '1',  slug: 'branded-residences-rise-india',          category: 'Real Estate',         title: 'Branded Residences Rise: How Global Luxury Hotels Are Redefining Indian Real Estate',      excerpt: 'From Four Seasons to Ritz-Carlton, global hospitality giants are reimagining luxury living in India\'s most coveted addresses.',          imageUrl: '/images/real-estate.jpg',  author: 'Priya Mehta',     publishedAt: 'Apr 28, 2026', readTime: 8,  featured: true  },
//   { id: '2',  slug: 'best-second-home-markets-india-2026',    category: 'Real Estate',         title: 'The Best Second-Home Markets in India for 2026',                                            excerpt: 'From Alibaug to Kasauli, where India\'s ultra-affluent are investing in their next great escape.',                                        imageUrl: '/images/hero-home.jpg',  author: 'Rahul Singhania', publishedAt: 'Apr 24, 2026', readTime: 6,  featured: false },
//   { id: '3',  slug: 'rolls-royce-spectre-india-launch',       category: 'Automobiles',         title: 'Rolls-Royce Spectre Arrives in India: The First All-Electric Ultra-Luxury Car',             excerpt: 'Silent, powerful, and unmistakably Rolls-Royce. We drive the Spectre on India\'s most scenic roads.',                                     imageUrl: '/images/automobiles.jpg',         author: 'Vikram Oberoi',   publishedAt: 'Apr 22, 2026', readTime: 7,  featured: false },
//   { id: '4',  slug: 'best-luxury-suvs-india-2026',            category: 'Automobiles',         title: 'The 7 Best Luxury SUVs Money Can Buy in India Right Now',                                   excerpt: 'From Bentley Bentayga to Lamborghini Urus — the definitive ranking for India\'s most discerning drivers.',                                imageUrl: '/images/hero-cars.jpg',         author: 'Arjun Kapoor',    publishedAt: 'Apr 18, 2026', readTime: 6,  featured: false },
//   { id: '5',  slug: 'heritage-jewellery-trends-2026',         category: 'Jewellery & Watches', title: 'Heritage Jewellery Trends Dominating India\'s Bridal Season in 2026',                       excerpt: 'Polki, Kundan, Jadau — the timeless crafts of India\'s royal courts are having their most spectacular moment yet.',                        imageUrl: '/images/hero-watches.jpg',        author: 'Isha Thapar',     publishedAt: 'Apr 15, 2026', readTime: 5,  featured: false },
//   { id: '6',  slug: 'watches-worth-collecting-india',         category: 'Jewellery & Watches', title: '5 Watches Worth Collecting in 2026 — An Indian Connoisseur\'s Guide',                       excerpt: 'Patek Philippe, A. Lange & Söhne, F.P. Journe. Our editors pick the horological icons you should be acquiring now.',                      imageUrl: '/images/Jewellery.jpg',        author: 'Siddharth Rao',   publishedAt: 'Apr 10, 2026', readTime: 7,  featured: false },
//   { id: '7',  slug: 'destination-wedding-trends-2026',        category: 'Weddings',            title: 'Destination Wedding Trends Redefining India\'s Luxury Wedding Season',                       excerpt: 'From Rajasthan\'s heritage forts to Maldivian islands, India\'s elite are choosing destinations as extraordinary as their love stories.',  imageUrl: '/images/hero-weddings.jpg',      author: 'Ananya Birla',    publishedAt: 'Apr 8, 2026',  readTime: 6,  featured: false },
//   { id: '8',  slug: 'luxury-bridal-looks-2026',               category: 'Weddings',            title: 'The Most Covetable Bridal Looks of 2026 — From Sabyasachi to Manish Malhotra',              excerpt: 'India\'s couture masters have outdone themselves this season. Our editors curate the looks that made us catch our breath.',                 imageUrl: '/images/hero-weddings.jpg',      author: 'Divya Nair',      publishedAt: 'Apr 4, 2026',  readTime: 5,  featured: false },
//   { id: '9',  slug: 'oberoi-group-curated-partner-spotlight', category: 'Curated Partners',    title: 'Partner Spotlight: The Oberoi Group — Redefining Luxury Hospitality in India',              excerpt: 'From New Delhi to Udaipur, the Oberoi Group has long set the standard for luxury hospitality. We go inside the legend.',                  imageUrl: '/images/hero-partners.jpg',      author: 'Ritu Sharma',     publishedAt: 'Apr 2, 2026',  readTime: 6,  featured: false },
// ];

// // ── ILH LOGO ──────────────────────────────────────────────────
// function ILHLogo({ size = 32 }: { size?: number }) {
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

// // ── HEADER ────────────────────────────────────────────────────
// function Header({ currentHref }: { currentHref: string }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   return (
//     <header style={{
//       position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
//       background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.92)',
//       backdropFilter: 'blur(12px)', transition: 'background .4s',
//       boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
//     }}>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.7 }} />
//       <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

//         {/* Logo */}
//         <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
//           <ILHLogo size={38} />
//           <div style={{ lineHeight: 1 }}>
//             <div style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
//             <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.45)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//           </div>
//         </Link>

//         {/* Desktop Nav */}
//         <nav style={{ display: 'flex', alignItems: 'center' }} className="ilh-cat-nav">
//           {NAV_LINKS.map(link => {
//             const isActive = link.href === currentHref;
//             return (
//               <Link key={link.href} href={link.href}
//                 style={{
//                   fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
//                   color: isActive ? '#DFC27A' : 'rgba(201,168,76,0.6)',
//                   textDecoration: 'none', padding: '8px 10px',
//                   borderBottom: isActive ? '1px solid #C9A84C' : '1px solid transparent',
//                   fontWeight: isActive ? 500 : 400,
//                   transition: 'color .2s, border-color .2s', whiteSpace: 'nowrap',
//                   ...(link.href === '/partner-with-us' && !isActive ? { color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 10px', marginLeft: 4 } : {}),
//                 }}
//                 onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#DFC27A'; } }}
//                 onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)'; } }}
//               >{link.label}</Link>
//             );
//           })}
//         </nav>

//         {/* Hamburger */}
//         <button className="ilh-cat-ham" onClick={() => setOpen(!open)}
//           style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4, display: 'none' }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             {open ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile dropdown */}
//       <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: open ? 560 : 0, transition: 'max-height .3s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//         {NAV_LINKS.map(link => (
//           <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
//             style={{ display: 'block', padding: '13px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: link.href === currentHref ? '#DFC27A' : 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
//             onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//             onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//           >{link.label}</Link>
//         ))}
//       </div>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />

//       <style>{`
//         .ilh-cat-nav { display: flex !important; }
//         .ilh-cat-ham { display: none !important; }
//         @media(max-width:1100px){ .ilh-cat-nav { display: none !important; } .ilh-cat-ham { display: block !important; } }
//       `}</style>
//     </header>
//   );
// }

// // ── FOOTER ────────────────────────────────────────────────────
// // function Footer() {
// //   return (
// //     <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '56px 32px 32px' }}>
// //       <div style={{ maxWidth: 1280, margin: '0 auto' }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 48 }}>
// //           {/* Brand */}
// //           <div style={{ maxWidth: 260 }}>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
// //               <ILHLogo size={36} />
// //               <div>
// //                 <div style={{ fontFamily: 'Georgia,serif', fontSize: 15, color: '#DFC27A', letterSpacing: '0.28em' }}>INDIAN</div>
// //                 <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.35)', letterSpacing: '0.4em', marginTop: 2 }}>LUXURY HOUSE</div>
// //               </div>
// //             </div>
// //             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, fontWeight: 300 }}>
// //               Where India Meets Global Luxury.
// //             </p>
// //             <div style={{ display: 'flex', gap: 18, marginTop: 20 }}>
// //               {['Instagram', 'LinkedIn'].map(s => (
// //                 <a key={s} href="#" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.38)', textDecoration: 'none', transition: 'color .2s' }}
// //                   onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
// //                   onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.38)')}
// //                 >{s}</a>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Categories */}
// //           <div>
// //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 18 }}>Categories</p>
// //             {CATEGORIES.map(c => (
// //               <Link key={c.slug} href={`/${c.slug}`}
// //                 style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', marginBottom: 12, letterSpacing: '0.04em', transition: 'color .2s' }}
// //                 onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
// //                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
// //               >{c.name}</Link>
// //             ))}
// //           </div>

// //           {/* Navigate */}
// //           <div>
// //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 18 }}>Navigate</p>
// //             {[{ l: 'Home', h: '/' }, { l: 'News', h: '/news' }, { l: 'Partner With Us', h: '/partner-with-us' }, { l: 'About', h: '/about' }].map(item => (
// //               <Link key={item.h} href={item.h}
// //                 style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', marginBottom: 12, letterSpacing: '0.04em', transition: 'color .2s' }}
// //                 onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
// //                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
// //               >{item.l}</Link>
// //             ))}
// //           </div>

// //           {/* Contact */}
// //           <div>
// //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 18 }}>Contact</p>
// //             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginBottom: 6 }}>Partnerships:</p>
// //             <a href="mailto:hello@indianluxuryhouse.com"
// //               style={{ fontSize: 12, color: 'rgba(201,168,76,0.5)', textDecoration: 'none', transition: 'color .2s' }}
// //               onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
// //               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.5)')}
// //             >hello@indianluxuryhouse.com</a>
// //           </div>
// //         </div>

// //         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.18),transparent)', marginBottom: 24 }} />
// //         <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
// //           <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} Indian Luxury House. All rights reserved.</p>
// //           <div style={{ display: 'flex', gap: 20 }}>
// //             {['Privacy Policy', 'Terms of Use'].map(l => (
// //               <a key={l} href="#" style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color .2s' }}
// //                 onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
// //                 onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.16)')}
// //               >{l}</a>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // }

// // ── POST CARD ─────────────────────────────────────────────────
// function PostCard({ post }: { post: Post }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', height: '100%', border: '1px solid rgba(0,0,0,0.06)' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={post.imageUrl || '/images/placeholder.jpg'} alt={post.title} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//           sizes="(max-width:768px) 100vw, 33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
//           {post.category}
//         </span>
//       </div>

//       {/* Body */}
//       <div style={{ padding: '20px 22px 22px' }}>
//         <div style={{ width: hov ? 38 : 20, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .3s' }} />
//         <h3 style={{
//           fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 400, lineHeight: 1.4,
//           color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s',
//           display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em',
//         }}>{post.title}</h3>
//         <p style={{
//           fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300,
//           display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
//         }}>{post.excerpt}</p>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
//           <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.5)', letterSpacing: '0.04em' }}>{post.readTime} min read</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── MAIN CATEGORY PAGE ────────────────────────────────────────
// export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = use(params);
//   const [activeFilter, setActiveFilter] = useState('All');

//   const cat = CATEGORIES.find(c => c.slug === slug);
//   const currentHref = `/${slug}`;

//   const catPosts = ALL_POSTS.filter(p =>
//     p.category === cat?.name ||
//     p.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-') === slug
//   );

//   const filters = ['All', 'Latest', 'Most Read', "Editors' Pick"];

//   // 404 fallback
//   if (!cat) {
//     return (
//       <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
//         <ILHLogo size={56} />
//         <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 36, fontWeight: 300, color: '#1A1A1A' }}>Category Not Found</h1>
//         <Link href="/" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
//           ← Back to Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header currentHref={currentHref} />
//       <main style={{ paddingTop: 72 }}>

//         {/* ── CATEGORY HERO ───────────────────────────── */}
//         <section style={{ position: 'relative', height: 360, overflow: 'hidden', background: '#0A0A0A' }}>
//           <Image src={cat.heroImage} alt={cat.name} fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />
//           {/* Overlays */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 55%, transparent 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 60%)' }} />
//           {/* Gold bottom bar */}
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.5 }} />

//           {/* Content */}
//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 44px', maxWidth: 720 }}>
//             {/* Breadcrumb */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
//               >Home</Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>{cat.name}</span>
//             </div>

//             {/* Eyebrow */}
//             <p style={{ fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: 12 }}>Category</p>

//             {/* Title */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
//               <span style={{ fontSize: 42 }}>{cat.icon}</span>
//               <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(34px,6vw,62px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.05, letterSpacing: '0.02em' }}>
//                 {cat.name}
//               </h1>
//             </div>
//             <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.5)', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.55 }}>
//               {cat.description}
//             </p>
//           </div>

//           {/* Article count badge */}
//           <div style={{ position: 'absolute', bottom: 44, right: 48, zIndex: 10 }}>
//             <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(201,168,76,0.2)', padding: '7px 14px', backdropFilter: 'blur(4px)' }}>
//               {catPosts.length} {catPosts.length === 1 ? 'Article' : 'Articles'}
//             </span>
//           </div>
//         </section>

//         {/* ── FILTER BAR ──────────────────────────────── */}
//         <div style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(201,168,76,0.15)', position: 'sticky', top: 72, zIndex: 30 }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', overflowX: 'auto', gap: 0 }}>
//             {filters.map(f => {
//               const active = f === activeFilter;
//               return (
//                 <button key={f} onClick={() => setActiveFilter(f)}
//                   style={{
//                     fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
//                     padding: '14px 20px', border: 'none', cursor: 'pointer', background: 'transparent',
//                     color: active ? '#DFC27A' : 'rgba(201,168,76,0.4)',
//                     borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent',
//                     transition: 'all .2s', whiteSpace: 'nowrap',
//                     borderRight: '1px solid rgba(201,168,76,0.08)',
//                   }}
//                   onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#C9A84C'; }}
//                   onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(201,168,76,0.4)'; }}
//                 >{f}</button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ── POSTS GRID ──────────────────────────────── */}
//         <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 88px', background: '#FAFAF8' }}>
//           {catPosts.length === 0 ? (
//             <div style={{ textAlign: 'center', padding: '88px 24px' }}>
//               <span style={{ fontSize: 52, display: 'block', marginBottom: 20, opacity: 0.3 }}>{cat.icon}</span>
//               <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, fontWeight: 300, color: '#6B6558', marginBottom: 10 }}>No articles yet</h2>
//               <p style={{ fontSize: 13, color: 'rgba(107,101,88,0.6)', marginBottom: 32 }}>New stories in {cat.name} are coming soon.</p>
//               <Link href="/"
//                 style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '12px 28px', textDecoration: 'none', display: 'inline-block', transition: 'all .2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
//               >← Back to Home</Link>
//             </div>
//           ) : (
//             <>
//               <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 18 }}>
//                 <div>
//                   <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8 }}>
//                     {catPosts.length} {catPosts.length === 1 ? 'story' : 'stories'}
//                   </p>
//                   <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.01em' }}>
//                     Latest in {cat.name}
//                   </h2>
//                 </div>
//                 <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.35)', alignSelf: 'center' }} />
//               </div>

//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-posts-grid">
//                 {catPosts.map(p => <PostCard key={p.id} post={p} />)}
//               </div>
//             </>
//           )}
//         </section>

//         {/* ── OTHER CATEGORIES ────────────────────────── */}
//         <section style={{ background: '#0A0A0A', padding: '56px 0', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: 28, textAlign: 'center' }}>Explore More</p>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 1, background: 'rgba(201,168,76,0.08)' }} className="ilh-explore-grid">
//               {CATEGORIES.map(c => {
//                 const isCurrent = c.slug === slug;
//                 return (
//                   <Link key={c.slug} href={`/${c.slug}`}
//                     style={{
//                       display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//                       padding: '28px 10px', textDecoration: 'none', gap: 10,
//                       background: isCurrent ? 'rgba(201,168,76,0.1)' : 'transparent',
//                       transition: 'background .25s',
//                     }}
//                     onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; }}
//                     onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
//                   >
//                     <span style={{ fontSize: 26 }}>{c.icon}</span>
//                     <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: isCurrent ? '#DFC27A' : 'rgba(201,168,76,0.48)', textAlign: 'center', lineHeight: 1.4 }}>{c.name}</span>
//                     {isCurrent && <span style={{ width: 16, height: 1, background: '#C9A84C', display: 'block' }} />}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//       </main>
//       {/* <Footer /> */}

//       <style>{`
//         @media(max-width:900px){ .ilh-posts-grid { grid-template-columns: repeat(2,1fr) !important; } }
//         @media(max-width:600px){ .ilh-posts-grid { grid-template-columns: 1fr !important; } }
//         @media(max-width:768px){ .ilh-explore-grid { grid-template-columns: repeat(3,1fr) !important; } }
//         @media(max-width:480px){ .ilh-explore-grid { grid-template-columns: repeat(2,1fr) !important; } }
//       `}</style>
//     </>
//   );
// }


// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect, use } from 'react';

// // ── TYPES ──────────────────────────────────────────────────────
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

// // ── DATA ───────────────────────────────────────────────────────
// const CATEGORIES: Category[] = [
//   { name: 'Cars',         slug: 'cars',       emoji: '🚗', description: 'The finest machines on four wheels',          accentColor: '#C9A84C', heroImage: '/images/hero-cars.jpg' },
//   { name: 'Yachts',       slug: 'yachts',     emoji: '⛵', description: 'Life on the open water',                      accentColor: '#5FA8D4', heroImage: '/images/hero-yachts.jpg' },
//   { name: 'Watches',      slug: 'watches',    emoji: '⌚', description: 'Mechanical artistry on your wrist',           accentColor: '#D4B483', heroImage: '/images/hero-watches.jpg' },
//   { name: 'Style',        slug: 'style',      emoji: '👔', description: 'Dressing the modern connoisseur',             accentColor: '#C4A8D4', heroImage: '/images/hero-style.jpg' },
//   { name: 'Home',         slug: 'home',       emoji: '🏛️', description: 'Architecture and interior excellence',        accentColor: '#8DC48D', heroImage: '/images/hero-home.jpg' },
//   { name: 'Food & Restaurant', slug: 'food-drink', emoji: '🍾', description: 'Gastronomy and the art of drinking',          accentColor: '#D48888', heroImage: '/images/hero-food.jpg' },
//   { name: 'Travel',       slug: 'travel',     emoji: '✈️', description: "The world's most extraordinary destinations", accentColor: '#88B0D4', heroImage: '/images/hero-travel.jpg' },
// ];

// const ALL_POSTS: Post[] = [
//   { id: '1',  title: 'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12',   slug: 'ferrari-laferrari-aperta-final-edition',    category: 'Cars',         excerpt: 'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.',       imageUrl: '/images/placeholder-car.jpg',    author: 'Alessandro Greco', publishedAt: 'Apr 10, 2026', readTime: 8,  featured: true  },
//   { id: '2',  title: 'The 10 Best Grand Tourers for 2026',                                         slug: 'best-grand-tourers-2026',                   category: 'Cars',         excerpt: 'From Bentley to Aston Martin, our editors drove them all to find the definitive Grand Tourer of the year.',                                         imageUrl: '/images/placeholder-car.jpg',    author: 'Alessandro Greco', publishedAt: 'Apr 2, 2026',  readTime: 7,  featured: false },
//   { id: '3',  title: 'Patek Philippe 5711: Why It Still Commands Six Figures in 2026',             slug: 'patek-philippe-5711-value-2026',            category: 'Watches',      excerpt: "Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.",                                    imageUrl: '/images/placeholder-watch.jpg',  author: 'M. Laurent',       publishedAt: 'Apr 8, 2026',  readTime: 6,  featured: true  },
//   // { id: '4',  title: 'Inside the New A. Lange & Söhne Zeitwerk',                                  slug: 'lange-sohne-zeitwerk-review',               category: 'Watches',      excerpt: 'German watchmaking at its most radical. The Zeitwerk's jumping digital display remains one of horology's great feats.',                             imageUrl: '/images/placeholder-watch.jpg',  author: 'M. Laurent',       publishedAt: 'Mar 20, 2026', readTime: 5,  featured: false },
//   { id: '5',  title: 'Aboard the Benetti 107: A Week in the Mediterranean',                       slug: 'benetti-107-mediterranean-week',            category: 'Yachts',       excerpt: '107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.',                                                imageUrl: '/images/placeholder-yacht.jpg',  author: 'R. Voss',          publishedAt: 'Apr 6, 2026',  readTime: 10, featured: true  },
//   // { id: '6',  title: 'Sanlorenzo SL96: The Best Mid-Size Superyacht of 2026',                     slug: 'sanlorenzo-sl96-review',                    category: 'Yachts',       excerpt: 'Italian elegance meets open-ocean capability. Sanlorenzo's latest is a masterclass in understated luxury.',                                         imageUrl: '/images/placeholder-yacht.jpg',  author: 'R. Voss',          publishedAt: 'Mar 15, 2026', readTime: 8,  featured: false },
//   { id: '7',  title: 'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide',                     slug: 'zuma-dubai-food-cocktail-guide',            category: 'FOOD &  RESTAURANT', excerpt: 'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.',                                                          imageUrl: '/images/placeholder-food.jpg',   author: 'S. Chen',          publishedAt: 'Apr 4, 2026',  readTime: 5,  featured: false },
//   { id: '8',  title: 'The 12 Best Champagnes to Cellar in 2026',                                  slug: 'best-champagnes-to-cellar-2026',            category: 'FOOD &  RESTAURANT', excerpt: 'From grower Champagnes to prestige cuvées — the bottles worth investing in this vintage.',                                                            imageUrl: '/images/placeholder-food.jpg',   author: 'S. Chen',          publishedAt: 'Mar 18, 2026', readTime: 6,  featured: false },
//   { id: '9',  title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide',                slug: 'tom-ford-vs-brunello-cucinelli-style-guide',category: 'Style',        excerpt: 'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?',                                             imageUrl: '/images/placeholder-style.jpg',  author: 'J. White',         publishedAt: 'Mar 28, 2026', readTime: 6,  featured: false },
//   // { id: '10', title: 'The Perfect Summer Wardrobe: A Coastal Edit',                               slug: 'perfect-summer-wardrobe-coastal-edit',      category: 'Style',        excerpt: 'Linen, navy, and the art of appearing effortless. Our editors build the season's definitive coastal wardrobe.',                                     imageUrl: '/images/placeholder-style.jpg',  author: 'J. White',         publishedAt: 'Mar 10, 2026', readTime: 5,  featured: false },
//   // { id: '11', title: 'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026',  slug: 'maldives-vs-seychelles-2026',               category: 'Travel',       excerpt: 'Two island paradises, two entirely different philosophies. Our editors have stayed at both.',                                                         imageUrl: '/images/placeholder-travel.jpg', author: 'P. Black',         publishedAt: 'Mar 30, 2026', readTime: 7,  featured: false },
//   { id: '12', title: 'The Private Jet Experience: Flying into the Amalfi Coast',                  slug: 'private-jet-amalfi-coast',                 category: 'Travel',       excerpt: 'There is no finer arrival than the Amalfi Coast by private jet. We flew the route to find out exactly what it takes.',                              imageUrl: '/images/placeholder-travel.jpg', author: 'P. Black',         publishedAt: 'Mar 5, 2026',  readTime: 9,  featured: false },
//   // { id: '13', title: 'The Perfect Penthouse: 12 Global Listings for 2026',                        slug: 'perfect-penthouse-global-listings-2026',   category: 'Home',         excerpt: 'From Manhattan to Monaco, these are the world's most extraordinary properties currently on the market.',                                              imageUrl: '/images/placeholder-car.jpg',    author: 'M. Laurent',       publishedAt: 'Mar 25, 2026', readTime: 9,  featured: false },
//   // { id: '14', title: 'Interior Design Trends That Define 2026',                                   slug: 'interior-design-trends-2026',              category: 'Home',         excerpt: 'Quiet luxury, biophilic design, and the return of the statement ceiling — the interior world's biggest movements this year.',                      imageUrl: '/images/placeholder-car.jpg',    author: 'M. Laurent',       publishedAt: 'Feb 28, 2026', readTime: 6,  featured: false },
// ];

// // ── SM LOGO ────────────────────────────────────────────────────
// function SMLogo({ size = 32 }: { size?: number }) {
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

// // ── HEADER ─────────────────────────────────────────────────────
// function Header({ currentSlug }: { currentSlug: string }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   return (
//     <header style={{
//       position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
//       background: scrolled ? '#1B4D45' : 'rgba(27,77,69,0.95)',
//       backdropFilter: 'blur(8px)', transition: 'background .4s',
//     }}>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }} />
//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

//         {/* Logo */}
//         <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
//           <SMLogo size={34} />
//           <div>
//             <div style={{ fontFamily: 'Georgia,serif', fontSize: 20, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.22em', lineHeight: 1 }}>SM</div>
//             <div style={{ fontSize: 8, color: 'rgba(201,168,76,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 2 }}>Luxury</div>
//           </div>
//         </Link>

//         {/* Desktop Nav */}
//         <nav style={{ display: 'flex', alignItems: 'center' }} className="sm-cat-nav">
//           {CATEGORIES.map(c => {
//             const active = c.slug === currentSlug;
//             return (
//               <Link key={c.slug} href={`/category/${c.slug}`}
//                 style={{
//                   fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
//                   color: active ? '#DFC27A' : 'rgba(201,168,76,0.6)',
//                   textDecoration: 'none', padding: '6px 12px',
//                   borderBottom: active ? '1px solid #C9A84C' : '1px solid transparent',
//                   transition: 'all .2s',
//                 }}
//                 onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.4)'; } }}
//                 onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(201,168,76,0.6)'; e.currentTarget.style.borderBottomColor = 'transparent'; } }}
//               >{c.name}</Link>
//             );
//           })}
//         </nav>

//         {/* Mobile hamburger */}
//         <button className="sm-ham" onClick={() => setOpen(!open)}
//           style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4 }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             {open ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile menu */}
//       <div style={{ background: '#163D37', overflow: 'hidden', maxHeight: open ? 400 : 0, transition: 'max-height .3s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//         {CATEGORIES.map(c => (
//           <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setOpen(false)}
//             style={{ display: 'block', padding: '12px 24px', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: c.slug === currentSlug ? '#DFC27A' : 'rgba(201,168,76,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
//             {c.emoji} {c.name}
//           </Link>
//         ))}
//       </div>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }} />

//       <style>{`
//         .sm-cat-nav { display: flex !important; }
//         .sm-ham     { display: none  !important; }
//         @media(max-width:1024px){
//           .sm-cat-nav { display: none  !important; }
//           .sm-ham     { display: block !important; }
//         }
//       `}</style>
//     </header>
//   );
// }

// // ── FOOTER ─────────────────────────────────────────────────────
// // function Footer() {
// //   return (
// //     <footer style={{ background: '#1B4D45', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
// //       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 32px' }}>
// //         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 40, marginBottom: 40 }}>
// //           <div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
// //               <SMLogo size={36} />
// //               <span style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.2em' }}>Indian Luxury House</span>
// //             </div>
// //             <p style={{ fontSize: 11, color: 'rgba(201,168,76,0.4)', lineHeight: 1.7, fontWeight: 300 }}>The connoisseur's journal for the finest things in life.</p>
// //           </div>
// //           <div>
// //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', marginBottom: 14, fontWeight: 500 }}>Categories</p>
// //             {CATEGORIES.map(c => (
// //               <Link key={c.slug} href={`/category/${c.slug}`}
// //                 style={{ display: 'block', fontSize: 11, color: 'rgba(201,168,76,0.5)', textDecoration: 'none', marginBottom: 8, transition: 'color .2s' }}
// //                 onMouseEnter={e => (e.currentTarget.style.color = '#DFC27A')}
// //                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.5)')}
// //               >{c.name}</Link>
// //             ))}
// //           </div>
// //         </div>
// //         <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 20, textAlign: 'center' }}>
// //           <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.25)' }}>© 2026 Indian Luxury House. All rights reserved.</p>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // }

// // ── POST CARD ──────────────────────────────────────────────────
// function PostCard({ post }: { post: Post }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F0EBE0' : '#FAF7F0', transition: 'background .2s', height: '100%' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden', background: '#E8DFD0' }}>
//         <Image src={post.imageUrl || '/images/placeholder-car.jpg'} alt={post.title} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//           sizes="(max-width:768px) 100vw, 33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         {/* Category badge */}
//         <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DFC27A', background: 'rgba(27,77,69,0.88)', padding: '4px 9px' }}>
//           {post.category}
//         </span>
//       </div>

//       {/* Body */}
//       <div style={{ padding: '20px 22px 22px', borderBottom: '1px solid rgba(201,168,76,0.1)', borderLeft: '1px solid rgba(201,168,76,0.07)', borderRight: '1px solid rgba(201,168,76,0.07)' }}>
//         {/* Gold accent line */}
//         <div style={{ width: hov ? 38 : 22, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width .3s' }} />

//         {/* Title */}
//         <h3 style={{
//           fontFamily: 'Georgia,serif', fontSize: 19, fontWeight: 400, lineHeight: 1.38,
//           color: hov ? '#1F5C52' : '#1C1C1A',
//           marginBottom: 10, transition: 'color .3s',
//           display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
//           letterSpacing: '0.01em',
//         }}>
//           {post.title}
//         </h3>

//         {/* Excerpt */}
//         <p style={{
//           fontSize: 13, color: '#5a5650', lineHeight: 1.72, marginBottom: 14, fontWeight: 300,
//           display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
//           letterSpacing: '0.01em',
//         }}>
//           {post.excerpt}
//         </p>

//         {/* Meta */}
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//           <span style={{ fontSize: 10, color: 'rgba(107,101,88,0.6)', letterSpacing: '0.05em' }}>{post.readTime} min read</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── MAIN CATEGORY PAGE ─────────────────────────────────────────
// export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = use(params);
//   const [activeFilter, setActiveFilter] = useState('All');

//   const cat = CATEGORIES.find(c => c.slug === slug);

//   // ── Replace with real API when backend ready ──
//   // useEffect(() => { fetch(`/api/posts?category=${slug}`).then(...) }, [slug]);

//   const catPosts = ALL_POSTS.filter(p =>
//     p.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === slug ||
//     p.category.toLowerCase() === (cat?.name.toLowerCase() ?? '')
//   );

//   const filters = ['All', 'Latest', 'Most Read', "Editors' Pick", 'Reviews'];

//   // 404 fallback
//   if (!cat) {
//     return (
//       <div style={{ minHeight: '100vh', background: '#FAF7F0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
//         <SMLogo size={56} />
//         <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 36, fontWeight: 300, color: '#1C1C1A' }}>Category Not Found</h1>
//         <Link href="/" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
//           ← Back to Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header currentSlug={slug} />
//       <main style={{ paddingTop: 68 }}>

//         {/* ── CATEGORY HERO ───────────────────────────────── */}
//         <section style={{ position: 'relative', height: 340, overflow: 'hidden', background: '#1B4D45' }}>
//           {/* Hero image — place at public/images/hero-{slug}.jpg */}
//           <Image
//             src={cat.heroImage}
//             alt={cat.name}
//             fill
//             priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />

//           {/* Overlays */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,28,26,0.88) 0%, rgba(28,28,26,0.45) 55%, transparent 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,28,26,0.5) 0%, transparent 60%)' }} />

//           {/* Content */}
//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 40px', maxWidth: 700 }}>
//             {/* Breadcrumb */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.45)')}
//               >Home</Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>{cat.name}</span>
//             </div>

//             {/* Eyebrow */}
//             <p style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 10 }}>Category</p>

//             {/* Title row */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
//               <span style={{ fontSize: 44 }}>{cat.emoji}</span>
//               <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 300, color: '#FAF7F0', lineHeight: 1, letterSpacing: '0.02em' }}>
//                 {cat.name}
//               </h1>
//             </div>

//             {/* Description */}
//             <p style={{ fontSize: 14, color: 'rgba(250,247,240,0.55)', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.5 }}>
//               {cat.description}
//             </p>
//           </div>

//           {/* Post count badge */}
//           <div style={{ position: 'absolute', bottom: 40, right: 48, zIndex: 10 }}>
//             <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', background: 'rgba(27,77,69,0.7)', border: '1px solid rgba(201,168,76,0.2)', padding: '7px 14px', backdropFilter: 'blur(4px)' }}>
//               {catPosts.length} {catPosts.length === 1 ? 'Article' : 'Articles'}
//             </span>
//           </div>
//         </section>

//         {/* ── FILTER BAR ──────────────────────────────────── */}
//         <div style={{ background: '#1B4D45', borderBottom: '1px solid rgba(201,168,76,0.15)', position: 'sticky', top: 68, zIndex: 30 }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', overflowX: 'auto', gap: 0 }}>
//             {filters.map(f => {
//               const active = f === activeFilter;
//               return (
//                 <button key={f} onClick={() => setActiveFilter(f)}
//                   style={{
//                     fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
//                     padding: '14px 20px', border: 'none', cursor: 'pointer', background: 'transparent',
//                     color: active ? '#DFC27A' : 'rgba(201,168,76,0.45)',
//                     borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent',
//                     transition: 'all .2s', whiteSpace: 'nowrap',
//                     borderRight: '1px solid rgba(201,168,76,0.08)',
//                   }}
//                   onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#C9A84C'; }}
//                   onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(201,168,76,0.45)'; }}
//                 >{f}</button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ── POSTS GRID ──────────────────────────────────── */}
//         <section style={{ maxWidth: 1280, margin: '0 auto', padding: '52px 24px 80px' }}>
//           {catPosts.length === 0 ? (
//             /* Empty state */
//             <div style={{ textAlign: 'center', padding: '80px 24px' }}>
//               <span style={{ fontSize: 52, display: 'block', marginBottom: 20, opacity: 0.35 }}>{cat.emoji}</span>
//               <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, fontWeight: 300, color: '#6B6558', marginBottom: 10 }}>No articles yet</h2>
//               <p style={{ fontSize: 13, color: 'rgba(107,101,88,0.6)', marginBottom: 28 }}>New stories in {cat.name} are coming soon.</p>
//               <Link href="/" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', border: '1px solid rgba(201,168,76,0.35)', padding: '11px 24px', transition: 'all .2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1B4D45'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
//               >← Back to Home</Link>
//             </div>
//           ) : (
//             <>
//               {/* Section header */}
//               <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 16 }}>
//                 <div>
//                   <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: 6 }}>
//                     {catPosts.length} {catPosts.length === 1 ? 'story' : 'stories'}
//                   </p>
//                   <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 300, color: '#1C1C1A', letterSpacing: '0.02em' }}>
//                     Latest in {cat.name}
//                   </h2>
//                 </div>
//                 {/* Gold divider line */}
//                 <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)', alignSelf: 'center' }} />
//               </div>

//               {/* 3-col grid */}
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(201,168,76,0.08)' }} className="sm-posts-grid">
//                 {catPosts.map(p => <PostCard key={p.id} post={p} />)}
//               </div>
//             </>
//           )}
//         </section>

//         {/* ── OTHER CATEGORIES ────────────────────────────── */}
//         <section style={{ background: '#1B4D45', padding: '48px 0', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: 24, textAlign: 'center' }}>Explore More</p>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 1, background: 'rgba(201,168,76,0.1)' }} className="sm-explore-grid">
//               {CATEGORIES.map(c => {
//                 const isCurrent = c.slug === slug;
//                 return (
//                   <Link key={c.slug} href={`/category/${c.slug}`}
//                     style={{
//                       display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//                       padding: '24px 8px', textDecoration: 'none', gap: 8,
//                       background: isCurrent ? 'rgba(201,168,76,0.12)' : 'transparent',
//                       transition: 'background .25s',
//                     }}
//                     onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; }}
//                     onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
//                   >
//                     <span style={{ fontSize: 22 }}>{c.emoji}</span>
//                     <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: isCurrent ? '#DFC27A' : 'rgba(201,168,76,0.52)', textAlign: 'center', lineHeight: 1.3 }}>{c.name}</span>
//                     {isCurrent && <span style={{ width: 16, height: 1, background: '#C9A84C' }} />}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//       </main>
//       {/* <Footer /> */}

//       <style>{`
//         @media(max-width:900px){ .sm-posts-grid { grid-template-columns: repeat(2,1fr) !important; } }
//         @media(max-width:600px){ .sm-posts-grid { grid-template-columns: 1fr !important; } }
//         @media(max-width:768px){ .sm-explore-grid { grid-template-columns: repeat(4,1fr) !important; } }
//       `}</style>
//     </>
//   );
// }
