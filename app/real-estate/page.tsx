'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ── NAV LINKS ──────────────────────────────────────────────────────────────────
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

const THIS_CATEGORY = 'Real Estate';
const THIS_CAT_SLUG = 'real-estate';
const API_BASE = 'https://shivmani-baceknd.onrender.com';

// ── FEATURED PROPERTIES ────────────────────────────────────────────────────────
const PROPERTIES = [
  {
    slug: 'four-seasons-private-residences-mumbai',
    type: 'Penthouse',
    name: 'Four Seasons Private Residences',
    location: 'Worli, Mumbai',
    price: '₹42 Cr onwards',
    area: '4,800 sq ft',
    bedrooms: '4 BHK',
    img: '/images/hero-home.jpg',
    tag: 'Branded Residence',
    status: 'Ready to Move',
  },
  {
    slug: 'dlf-camellias-gurugram',
    type: 'Villa',
    name: 'DLF The Camellias',
    location: 'Golf Course Road, Gurugram',
    price: '₹55 Cr onwards',
    area: '7,200 sq ft',
    bedrooms: '5 BHK',
    img: '/images/placeholder-home.jpg',
    tag: 'Ultra Luxury',
    status: 'Limited Units',
  },
  {
    slug: 'alibaug-beachfront-villa',
    type: 'Estate',
    name: 'Alibaug Beachfront Estate',
    location: 'Alibaug, Maharashtra',
    price: '₹18 Cr onwards',
    area: '12,000 sq ft',
    bedrooms: '6 BHK',
    img: '/images/real-estate.jpg',
    tag: 'Second Home',
    status: 'New Launch',
  },
  {
    slug: 'oberoi-sky-city-borivali',
    type: 'Penthouse',
    name: 'Oberoi Sky City',
    location: 'Borivali East, Mumbai',
    price: '₹28 Cr onwards',
    area: '5,600 sq ft',
    bedrooms: '4 BHK',
    img: '/images/hero-home.jpg',
    tag: 'Branded Residence',
    status: 'Under Construction',
  },
  {
    slug: 'lodha-malabar-hill',
    type: 'Penthouse',
    name: 'Lodha Malabar Hill',
    location: 'Malabar Hill, Mumbai',
    price: '₹75 Cr onwards',
    area: '9,100 sq ft',
    bedrooms: '5 BHK',
    img: '/images/placeholder-home.jpg',
    tag: 'Ultra Luxury',
    status: 'Ready to Move',
  },
];

// ── DEVELOPER SPOTLIGHTS ───────────────────────────────────────────────────────
const DEVELOPERS = [
  {
    slug: 'lodha-group',
    name: 'Lodha Group',
    tagline: 'Building India\'s Most Iconic Addresses',
    city: 'Mumbai',
    projects: 12,
    established: '1980',
    img: '/images/developer-lodha.jpg',
    logo: '/images/logo-lodha.png',
    specialty: 'Ultra Luxury Residential',
  },
  {
    slug: 'dlf-limited',
    name: 'DLF Limited',
    tagline: 'Creating Communities of Excellence',
    city: 'Delhi NCR',
    projects: 18,
    established: '1946',
    img: '/images/developer-dlf.jpg',
    logo: '/images/logo-dlf.png',
    specialty: 'Luxury Villas & Condominiums',
  },
  {
    slug: 'oberoi-realty',
    name: 'Oberoi Realty',
    tagline: 'Luxury Redefined, One Address at a Time',
    city: 'Mumbai',
    projects: 8,
    established: '1983',
    img: '/images/developer-oberoi.jpg',
    logo: '/images/logo-oberoi.png',
    specialty: 'Premium High-Rise Living',
  },
  {
    slug: 'prestige-group',
    name: 'Prestige Group',
    tagline: 'South India\'s Finest Luxury Developer',
    city: 'Bengaluru',
    projects: 14,
    established: '1986',
    img: '/images/developer-prestige.jpg',
    logo: '/images/logo-prestige.png',
    specialty: 'Branded & Luxury Residences',
  },
];

// ── CATEGORY IMAGE MAP ─────────────────────────────────────────────────────────
const CAT_IMAGE_MAP: Record<string, string> = {
  'Real Estate':         '/images/real-estate.jpg',
  'Automobiles':         '/images/automobiles.jpg',
  'Jewellery & Watches': '/images/Jewellery.png',
  'Weddings':            '/images/hero-weddings.jpg',
  'Curated Partners':    '/images/hero-partners.jpg',
};

// ── API POST TYPE ──────────────────────────────────────────────────────────────
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
  coverImage?: string; // ✅ added
}

// ── IMAGE URL HELPER ───────────────────────────────────────────────────────────
function getImg(coverImage?: string, category?: string): string {
  if (coverImage) {
    if (coverImage.startsWith('http')) return coverImage;
    if (coverImage.startsWith('/uploads/')) return `${API_BASE}${coverImage}`;
    return `${API_BASE}/uploads/${coverImage}`;
  }
  return CAT_IMAGE_MAP[category ?? ''] ?? '/images/real-estate.jpg';
}

// ── ILH LOGO ──────────────────────────────────────────────────────────────────
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

// ── PROPERTY CARD — No Link, No Enquire ───────────────────────────────────────
function PropertyCard({ p, featured = false }: { p: typeof PROPERTIES[0]; featured?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'block', background: '#fff', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.12'})`, transition: 'all .3s', boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.08)' : 'none', cursor: 'default' }}
    >
      <div style={{ position: 'relative', paddingBottom: featured ? '58%' : '65%', overflow: 'hidden', background: '#1A1A1A' }}>
        <Image
          src={p.img} alt={p.name} fill
          style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
          sizes={featured ? '50vw' : '33vw'}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)', transition: 'background .4s' }} />
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.3)' }}>{p.tag}</span>
        </div>
        <div style={{ position: 'absolute', top: 14, right: 14 }}>
          <span style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAFAF8', background: p.status === 'Ready to Move' ? 'rgba(42,122,106,0.9)' : p.status === 'New Launch' ? 'rgba(201,168,76,0.9)' : 'rgba(10,10,10,0.8)', padding: '5px 10px' }}>{p.status}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 100%)' }}>
          <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>{p.type}</span>
        </div>
      </div>
      <div style={{ padding: '20px 22px 24px' }}>
        <div style={{ width: hov ? 36 : 18, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s ease' }} />
        <h3 style={{ fontFamily: 'Georgia,serif', fontSize: featured ? 20 : 17, fontWeight: 400, color: '#1A1A1A', marginBottom: 5, letterSpacing: '0.01em', lineHeight: 1.3 }}>{p.name}</h3>
        <p style={{ fontSize: 11, color: 'rgba(107,101,88,0.65)', marginBottom: 16, letterSpacing: '0.06em', fontWeight: 300 }}>📍 {p.location}</p>
        <div style={{ display: 'flex', gap: 16, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          {[{ label: 'Area', val: p.area }, { label: 'Config', val: p.bedrooms }].map(stat => (
            <div key={stat.label}>
              <p style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.45)', marginBottom: 3 }}>{stat.label}</p>
              <p style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 400, letterSpacing: '0.04em' }}>{stat.val}</p>
            </div>
          ))}
        </div>
        {/* ✅ Enquire button removed */}
        <div>
          <p style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.45)', marginBottom: 3 }}>Starting from</p>
          <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#C9A84C', fontWeight: 400 }}>{p.price}</p>
        </div>
      </div>
    </div>
  );
}

// ── DEVELOPER CARD ─────────────────────────────────────────────────────────────
function DeveloperCard({ d }: { d: typeof DEVELOPERS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={`/real-estate/developers/${d.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#0A0A0A' : '#111', border: `1px solid rgba(201,168,76,${hov ? '0.35' : '0.12'})`, transition: 'all .3s', overflow: 'hidden' }}
    >
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <div style={{ position: 'relative', paddingBottom: '52%', overflow: 'hidden', background: '#1A1A1A' }}>
          <Image
            src={d.img} alt={d.name} fill
            style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)', opacity: 0.7 }}
            sizes="25vw"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.5)' }} />
          <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', padding: '4px 10px' }}>
            <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Est. {d.established}</span>
          </div>
        </div>
        <div style={{ padding: '22px 22px 24px' }}>
          <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 19, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em' }}>{d.name}</h3>
          <p style={{ fontSize: 11, color: 'rgba(201,168,76,0.5)', marginBottom: 14, letterSpacing: '0.04em', fontStyle: 'italic' }}>{d.tagline}</p>
          <div style={{ display: 'flex', gap: 20, marginBottom: 18 }}>
            <div>
              <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 3 }}>City</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{d.city}</p>
            </div>
            <div>
              <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 3 }}>Projects</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{d.projects}+</p>
            </div>
          </div>
          <div style={{ padding: '8px 12px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.1)' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)' }}>{d.specialty}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── EDITORIAL CARD (API data) ──────────────────────────────────────────────────
function EditorialCard({ post, big = false }: { post: Post; big?: boolean }) {
  const [hov, setHov] = useState(false);

  // ✅ coverImage from API, fallback to category default
  const imgSrc = getImg(post.coverImage, post.category);
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
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ height: '100%' }}>
        <div style={{ position: 'relative', paddingBottom: big ? '55%' : '60%', overflow: 'hidden', background: '#1A1A1A' }}>
          <Image
            src={imgSrc} alt={post.title} fill
            style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
            sizes={big ? '50vw' : '33vw'}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
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

// ── EDITORIAL SKELETON ─────────────────────────────────────────────────────────
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

// ── REAL ESTATE PAGE ───────────────────────────────────────────────────────────
export default function RealEstatePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Villas', 'Penthouses', 'Estates', 'Branded Residences'];

  const [editorialPosts, setEditorialPosts] = useState<Post[]>([]);
  const [editorialLoading, setEditorialLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/editorials`);
        if (!res.ok) return;
        const data: Post[] = await res.json();
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

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
          <Image src="/images/real-estate.jpg" alt="Luxury Real Estate India" fill priority
            style={{ objectFit: 'cover', objectPosition: 'center' }} quality={95}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0.15) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,10,10,0.6) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 900 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
              <a href="/" className="ilh-breadcrumb-link">Home</a>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: '#C9A84C' }}>Real Estate</span>
            </div>

            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'reFadeUp .8s .1s ease both' }}>Indian Luxury House</p>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(44px,8vw,100px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.03, marginBottom: 22, letterSpacing: '0.015em', animation: 'reFadeUp .8s .2s ease both' }}>
              Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Real Estate</em>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 540, marginBottom: 44, letterSpacing: '0.02em', animation: 'reFadeUp .8s .3s ease both' }}>
              India&apos;s finest residences and global investment opportunities — villas, penthouses, and branded estates curated for the discerning few.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'reFadeUp .8s .4s ease both' }}>
              {['Featured Properties', 'Developer Spotlights', 'Editorial'].map(tab => (
                <a key={tab} href={`#${tab.toLowerCase().replace(' ', '-')}`} className="ilh-hero-tab">{tab}</a>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
          </div>
        </section>

        <style>{`
          @keyframes reFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes shimmer  { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
          .ilh-breadcrumb-link { color: inherit; text-decoration: none; transition: color .2s; }
          .ilh-breadcrumb-link:hover { color: #C9A84C; }
          .ilh-hero-tab { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(201,168,76,0.65); border: 1px solid rgba(201,168,76,0.25); padding: 8px 18px; text-decoration: none; transition: all .25s; }
          .ilh-hero-tab:hover { background: rgba(201,168,76,0.12); color: #DFC27A; border-color: rgba(201,168,76,0.5); }
          .ilh-cta-primary { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: #1A1A1A; background: #C9A84C; padding: 16px 44px; text-decoration: none; font-weight: 700; transition: background .3s; display: inline-block; }
          .ilh-cta-primary:hover { background: #DFC27A; }
          .ilh-cta-secondary { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: #C9A84C; border: 1px solid rgba(201,168,76,0.45); padding: 16px 44px; text-decoration: none; transition: all .3s; display: inline-block; }
          .ilh-cta-secondary:hover { background: rgba(201,168,76,0.1); border-color: #C9A84C; }
          .ilh-view-all { font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: #C9A84C; text-decoration: none; border-bottom: 1px solid rgba(201,168,76,0.35); padding-bottom: 2px; transition: border-color .2s; }
          .ilh-view-all:hover { border-color: #C9A84C; }
          @media(max-width:767px){
            .ilh-re-props     { grid-template-columns: 1fr !important; }
            .ilh-re-devs      { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-re-editorial { grid-template-columns: 1fr !important; }
          }
          @media(max-width:480px){ .ilh-re-devs { grid-template-columns: 1fr !important; } }
          @media(min-width:768px) and (max-width:1023px){
            .ilh-re-props { grid-template-columns: repeat(2,1fr) !important; }
            .ilh-re-devs  { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>

        {/* ══ FEATURED PROPERTIES ═══════════════════════════════════════════════ */}
        <section id="featured-properties" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Villas · Penthouses · Estates</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Featured Properties</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              <a href="/real-estate/all-properties" className="ilh-view-all">View All Properties →</a>
            </div>

            <div style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', overflowX: 'auto' }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '12px 20px', border: 'none', cursor: 'pointer', background: 'transparent', color: activeFilter === f ? '#1A1A1A' : 'rgba(107,101,88,0.5)', borderBottom: activeFilter === f ? '2px solid #C9A84C' : '2px solid transparent', transition: 'all .2s', whiteSpace: 'nowrap', fontWeight: activeFilter === f ? 500 : 400 }}
                  onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.color = '#1A1A1A'; }}
                  onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.color = 'rgba(107,101,88,0.5)'; }}
                >{f}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 20 }} className="ilh-re-props">
              {PROPERTIES.slice(0, 2).map(p => <PropertyCard key={p.slug} p={p} featured />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-re-props">
              {PROPERTIES.slice(2).map(p => <PropertyCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>

        {/* ══ DEVELOPER SPOTLIGHTS ══════════════════════════════════════════════ */}
        {/* <section id="developer-spotlights" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Premium Builders</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>Developer Spotlights</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              <a href="/real-estate/developers" className="ilh-view-all" style={{ color: '#C9A84C', borderBottomColor: 'rgba(201,168,76,0.35)' }}>View All Developers →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-re-devs">
              {DEVELOPERS.map(d => <DeveloperCard key={d.slug} d={d} />)}
            </div>
          </div>
        </section> */}

        {/* ══ EDITORIAL STORIES ═════════════════════════════════════════════════ */}
        <section id="editorial" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Intelligence & Insight</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Editorial Stories</h2>
                <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
              </div>
              <a href={`/news?category=${THIS_CAT_SLUG}`} className="ilh-view-all">All {THIS_CATEGORY} Stories →</a>
            </div>

            {editorialLoading && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-re-editorial">
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
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-re-editorial">
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

        {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#0A0A0A', padding: '100px 32px' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,122,106,0.1) 0%, transparent 70%)' }} />
          </div>
          <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.6 }}>🏛️</div>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 18 }}>We Are Here to Help</p>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.12, marginBottom: 20, letterSpacing: '0.015em' }}>
              Need Curated<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Property Options?</em>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
              <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
              <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
            </div>
            <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.38)', fontWeight: 300, lineHeight: 1.85, marginBottom: 52, maxWidth: 540, margin: '0 auto 52px' }}>
              Whether you&apos;re a buyer, investor, or developer — our team connects you with India&apos;s most exceptional real estate opportunities, privately and precisely.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/partner-with-us?category=real-estate" className="ilh-cta-primary">Get in Touch</a>
              <a href="/curated-partners?category=real-estate" className="ilh-cta-secondary">View All Partners</a>
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

// // ── NAV LINKS ──────────────────────────────────────────────────────────────────
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

// const THIS_CATEGORY = 'Real Estate';
// const THIS_CAT_SLUG = 'real-estate';

// // ── FEATURED PROPERTIES ────────────────────────────────────────────────────────
// const PROPERTIES = [
//   {
//     slug: 'four-seasons-private-residences-mumbai',
//     type: 'Penthouse',
//     name: 'Four Seasons Private Residences',
//     location: 'Worli, Mumbai',
//     price: '₹42 Cr onwards',
//     area: '4,800 sq ft',
//     bedrooms: '4 BHK',
//     img: '/images/hero-home.jpg',
//     tag: 'Branded Residence',
//     status: 'Ready to Move',
//   },
//   {
//     slug: 'dlf-camellias-gurugram',
//     type: 'Villa',
//     name: 'DLF The Camellias',
//     location: 'Golf Course Road, Gurugram',
//     price: '₹55 Cr onwards',
//     area: '7,200 sq ft',
//     bedrooms: '5 BHK',
//     img: '/images/placeholder-home.jpg',
//     tag: 'Ultra Luxury',
//     status: 'Limited Units',
//   },
//   {
//     slug: 'alibaug-beachfront-villa',
//     type: 'Estate',
//     name: 'Alibaug Beachfront Estate',
//     location: 'Alibaug, Maharashtra',
//     price: '₹18 Cr onwards',
//     area: '12,000 sq ft',
//     bedrooms: '6 BHK',
//     img: '/images/real-estate.jpg',
//     tag: 'Second Home',
//     status: 'New Launch',
//   },
//   {
//     slug: 'oberoi-sky-city-borivali',
//     type: 'Penthouse',
//     name: 'Oberoi Sky City',
//     location: 'Borivali East, Mumbai',
//     price: '₹28 Cr onwards',
//     area: '5,600 sq ft',
//     bedrooms: '4 BHK',
//     img: '/images/hero-home.jpg',
//     tag: 'Branded Residence',
//     status: 'Under Construction',
//   },
//   {
//     slug: 'lodha-malabar-hill',
//     type: 'Penthouse',
//     name: 'Lodha Malabar Hill',
//     location: 'Malabar Hill, Mumbai',
//     price: '₹75 Cr onwards',
//     area: '9,100 sq ft',
//     bedrooms: '5 BHK',
//     img: '/images/placeholder-home.jpg',
//     tag: 'Ultra Luxury',
//     status: 'Ready to Move',
//   },
// ];

// // ── DEVELOPER SPOTLIGHTS ───────────────────────────────────────────────────────
// const DEVELOPERS = [
//   {
//     slug: 'lodha-group',
//     name: 'Lodha Group',
//     tagline: 'Building India\'s Most Iconic Addresses',
//     city: 'Mumbai',
//     projects: 12,
//     established: '1980',
//     img: '/images/developer-lodha.jpg',
//     logo: '/images/logo-lodha.png',
//     specialty: 'Ultra Luxury Residential',
//   },
//   {
//     slug: 'dlf-limited',
//     name: 'DLF Limited',
//     tagline: 'Creating Communities of Excellence',
//     city: 'Delhi NCR',
//     projects: 18,
//     established: '1946',
//     img: '/images/developer-dlf.jpg',
//     logo: '/images/logo-dlf.png',
//     specialty: 'Luxury Villas & Condominiums',
//   },
//   {
//     slug: 'oberoi-realty',
//     name: 'Oberoi Realty',
//     tagline: 'Luxury Redefined, One Address at a Time',
//     city: 'Mumbai',
//     projects: 8,
//     established: '1983',
//     img: '/images/developer-oberoi.jpg',
//     logo: '/images/logo-oberoi.png',
//     specialty: 'Premium High-Rise Living',
//   },
//   {
//     slug: 'prestige-group',
//     name: 'Prestige Group',
//     tagline: 'South India\'s Finest Luxury Developer',
//     city: 'Bengaluru',
//     projects: 14,
//     established: '1986',
//     img: '/images/developer-prestige.jpg',
//     logo: '/images/logo-prestige.png',
//     specialty: 'Branded & Luxury Residences',
//   },
// ];

// // ── API POST TYPE ──────────────────────────────────────────────────────────────
// interface Post {
//   _id: string;
//   title: string;
//   slug: string;
//   category: string;
//   excerpt: string;
//   author: string;
//   readTime: number;
//   isPublished: boolean;
//   createdAt: string;
// }

// // ── ILH LOGO ──────────────────────────────────────────────────────────────────
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



// // ── PROPERTY CARD ──────────────────────────────────────────────────────────────
// function PropertyCard({ p, featured = false }: { p: typeof PROPERTIES[0]; featured?: boolean }) {
//   const [hov, setHov] = useState(false);
//   return (
//     // ✅ Link used for navigation only — hover state via React useState, not onMouseEnter on Link
//     <Link
//       href={`/real-estate/${p.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: '#fff', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.12'})`, transition: 'all .3s', boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.08)' : 'none' }}
//     >
//       {/* ✅ Hover tracked on wrapper div, not on Link */}
//       <div
//         onMouseEnter={() => setHov(true)}
//         onMouseLeave={() => setHov(false)}
//       >
//         <div style={{ position: 'relative', paddingBottom: featured ? '58%' : '65%', overflow: 'hidden', background: '#1A1A1A' }}>
//           <Image
//             src={p.img} alt={p.name} fill
//             style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
//             sizes={featured ? '50vw' : '33vw'}
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />
//           <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)', transition: 'background .4s' }} />
//           <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
//             <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.3)' }}>{p.tag}</span>
//           </div>
//           <div style={{ position: 'absolute', top: 14, right: 14 }}>
//             <span style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAFAF8', background: p.status === 'Ready to Move' ? 'rgba(42,122,106,0.9)' : p.status === 'New Launch' ? 'rgba(201,168,76,0.9)' : 'rgba(10,10,10,0.8)', padding: '5px 10px' }}>{p.status}</span>
//           </div>
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 100%)' }}>
//             <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>{p.type}</span>
//           </div>
//         </div>
//         <div style={{ padding: '20px 22px 24px' }}>
//           <div style={{ width: hov ? 36 : 18, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s ease' }} />
//           <h3 style={{ fontFamily: 'Georgia,serif', fontSize: featured ? 20 : 17, fontWeight: 400, color: '#1A1A1A', marginBottom: 5, letterSpacing: '0.01em', lineHeight: 1.3 }}>{p.name}</h3>
//           <p style={{ fontSize: 11, color: 'rgba(107,101,88,0.65)', marginBottom: 16, letterSpacing: '0.06em', fontWeight: 300 }}>📍 {p.location}</p>
//           <div style={{ display: 'flex', gap: 16, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
//             {[{ label: 'Area', val: p.area }, { label: 'Config', val: p.bedrooms }].map(stat => (
//               <div key={stat.label}>
//                 <p style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.45)', marginBottom: 3 }}>{stat.label}</p>
//                 <p style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 400, letterSpacing: '0.04em' }}>{stat.val}</p>
//               </div>
//             ))}
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div>
//               <p style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.45)', marginBottom: 3 }}>Starting from</p>
//               <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#C9A84C', fontWeight: 400 }}>{p.price}</p>
//             </div>
//             <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: hov ? '#1A1A1A' : '#C9A84C', background: hov ? '#C9A84C' : 'transparent', border: '1px solid rgba(201,168,76,0.4)', padding: '8px 14px', transition: 'all .3s' }}>Enquire →</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── DEVELOPER CARD ─────────────────────────────────────────────────────────────
// function DeveloperCard({ d }: { d: typeof DEVELOPERS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link
//       href={`/real-estate/developers/${d.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#0A0A0A' : '#111', border: `1px solid rgba(201,168,76,${hov ? '0.35' : '0.12'})`, transition: 'all .3s', overflow: 'hidden' }}
//     >
//       {/* ✅ Hover on inner div */}
//       <div
//         onMouseEnter={() => setHov(true)}
//         onMouseLeave={() => setHov(false)}
//       >
//         <div style={{ position: 'relative', paddingBottom: '52%', overflow: 'hidden', background: '#1A1A1A' }}>
//           <Image
//             src={d.img} alt={d.name} fill
//             style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)', opacity: 0.7 }}
//             sizes="25vw"
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />
//           <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.5)' }} />
//           <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', padding: '4px 10px' }}>
//             <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Est. {d.established}</span>
//           </div>
//         </div>
//         <div style={{ padding: '22px 22px 24px' }}>
//           <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
//           <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 19, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em' }}>{d.name}</h3>
//           <p style={{ fontSize: 11, color: 'rgba(201,168,76,0.5)', marginBottom: 14, letterSpacing: '0.04em', fontStyle: 'italic' }}>{d.tagline}</p>
//           <div style={{ display: 'flex', gap: 20, marginBottom: 18 }}>
//             <div>
//               <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 3 }}>City</p>
//               <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{d.city}</p>
//             </div>
//             <div>
//               <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 3 }}>Projects</p>
//               <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{d.projects}+</p>
//             </div>
//           </div>
//           <div style={{ padding: '8px 12px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.1)' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)' }}>{d.specialty}</p>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── EDITORIAL CARD (API data) ──────────────────────────────────────────────────
// function EditorialCard({ post, big = false }: { post: Post; big?: boolean }) {
//   const [hov, setHov] = useState(false);

//   const CAT_IMAGE_MAP: Record<string, string> = {
//     'Real Estate':         '/images/real-estate.jpg',
//     'Automobiles':         '/images/automobiles.jpg',
//     'Jewellery & Watches': '/images/Jewellery.png',
//     'Weddings':            '/images/hero-weddings.jpg',
//     'Curated Partners':    '/images/hero-partners.jpg',
//   };
//   const imgSrc = CAT_IMAGE_MAP[post.category] ?? '/images/real-estate.jpg';
//   const postUrl = `/${THIS_CAT_SLUG}/${post.slug}`;

//   const formatDate = (iso: string) => {
//     try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
//     catch { return iso; }
//   };

//   return (
//     <Link
//       href={postUrl}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}
//     >
//       {/* ✅ Hover on inner div */}
//       <div
//         onMouseEnter={() => setHov(true)}
//         onMouseLeave={() => setHov(false)}
//         style={{ height: '100%' }}
//       >
//         <div style={{ position: 'relative', paddingBottom: big ? '55%' : '60%', overflow: 'hidden', background: '#1A1A1A' }}>
//           <Image
//             src={imgSrc} alt={post.title} fill
//             style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
//             sizes={big ? '50vw' : '33vw'}
//           />
//           {big && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 55%)' }} />}
//           <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
//             {post.category}
//           </span>
//         </div>
//         <div style={{ padding: big ? '24px 26px 28px' : '18px 20px 22px' }}>
//           <div style={{ width: hov ? 38 : 18, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
//           <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontSize: big ? 21 : 17, lineHeight: 1.4, color: hov ? '#8B6914' : '#1A1A1A', marginBottom: 10, transition: 'color .25s', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//             {post.title}
//           </h3>
//           <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.75, marginBottom: 16, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//             {post.excerpt}
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
//             <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 500 }}>{post.author}</span>
//             <span style={{ fontSize: 9, color: 'rgba(107,101,88,0.45)' }}>{formatDate(post.createdAt)} · {post.readTime} min</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── EDITORIAL SKELETON ─────────────────────────────────────────────────────────
// function EditorialSkeleton({ big = false }: { big?: boolean }) {
//   return (
//     <div style={{ background: '#FAFAF8', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}>
//       <div style={{ paddingBottom: big ? '55%' : '60%', background: 'linear-gradient(90deg,#f0ebe0 25%,#e8e2d4 50%,#f0ebe0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
//       <div style={{ padding: big ? '24px 26px' : '18px 20px' }}>
//         <div style={{ height: 1, width: 18, background: '#C9A84C', marginBottom: 14 }} />
//         <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 8, width: '85%' }} />
//         <div style={{ height: 16, background: '#e8e2d4', borderRadius: 2, marginBottom: 16, width: '65%' }} />
//         <div style={{ height: 12, background: '#ede8dd', borderRadius: 2, width: '50%' }} />
//       </div>
//     </div>
//   );
// }

// // ── REAL ESTATE PAGE ───────────────────────────────────────────────────────────
// export default function RealEstatePage() {
//   const [activeFilter, setActiveFilter] = useState('All');
//   const filters = ['All', 'Villas', 'Penthouses', 'Estates', 'Branded Residences'];

//   const [editorialPosts, setEditorialPosts] = useState<Post[]>([]);
//   const [editorialLoading, setEditorialLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch('https://shivmani-baceknd.onrender.com/api/editorials');
//         if (!res.ok) return;
//         const data: Post[] = await res.json();
//         const filtered = data.filter(p => p.isPublished && p.category === THIS_CATEGORY);
//         setEditorialPosts(filtered);
//       } catch (err) {
//         console.error('Editorial fetch error:', err);
//       } finally {
//         setEditorialLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <>
     
//       <main>

//         {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
//           <Image src="/images/real-estate.jpg" alt="Luxury Real Estate India" fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }} quality={95}
//           />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0.15) 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,10,10,0.6) 0%, transparent 55%)' }} />
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.5 }} />

//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 100px', maxWidth: 900 }}>

//             {/* ✅ Breadcrumb — plain <a> tag, CSS hover class */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
//               <a href="/" className="ilh-breadcrumb-link">Home</a>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: '#C9A84C' }}>Real Estate</span>
//             </div>

//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'reFadeUp .8s .1s ease both' }}>Indian Luxury House</p>
//             <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(44px,8vw,100px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.03, marginBottom: 22, letterSpacing: '0.015em', animation: 'reFadeUp .8s .2s ease both' }}>
//               Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Real Estate</em>
//             </h1>
//             <p style={{ fontSize: 16, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 540, marginBottom: 44, letterSpacing: '0.02em', animation: 'reFadeUp .8s .3s ease both' }}>
//               India&apos;s finest residences and global investment opportunities — villas, penthouses, and branded estates curated for the discerning few.
//             </p>

//             {/* ✅ Hero tab links — <a> tags with CSS hover class */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'reFadeUp .8s .4s ease both' }}>
//               {['Featured Properties', 'Developer Spotlights', 'Editorial'].map(tab => (
//                 <a
//                   key={tab}
//                   href={`#${tab.toLowerCase().replace(' ', '-')}`}
//                   className="ilh-hero-tab"
//                 >
//                   {tab}
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div style={{ position: 'absolute', bottom: 36, right: 60, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
//             <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)', writingMode: 'vertical-rl' }}>Scroll</span>
//             <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
//           </div>
//         </section>

//         <style>{`
//           @keyframes reFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//           @keyframes shimmer  { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

//           /* Breadcrumb */
//           .ilh-breadcrumb-link {
//             color: inherit;
//             text-decoration: none;
//             transition: color .2s;
//           }
//           .ilh-breadcrumb-link:hover { color: #C9A84C; }

//           /* Hero tabs */
//           .ilh-hero-tab {
//             font-size: 9px;
//             letter-spacing: 0.2em;
//             text-transform: uppercase;
//             color: rgba(201,168,76,0.65);
//             border: 1px solid rgba(201,168,76,0.25);
//             padding: 8px 18px;
//             text-decoration: none;
//             transition: all .25s;
//           }
//           .ilh-hero-tab:hover {
//             background: rgba(201,168,76,0.12);
//             color: #DFC27A;
//             border-color: rgba(201,168,76,0.5);
//           }

//           /* CTA buttons */
//           .ilh-cta-primary {
//             font-size: 10px;
//             letter-spacing: 0.28em;
//             text-transform: uppercase;
//             color: #1A1A1A;
//             background: #C9A84C;
//             padding: 16px 44px;
//             text-decoration: none;
//             font-weight: 700;
//             transition: background .3s;
//             display: inline-block;
//           }
//           .ilh-cta-primary:hover { background: #DFC27A; }

//           .ilh-cta-secondary {
//             font-size: 10px;
//             letter-spacing: 0.28em;
//             text-transform: uppercase;
//             color: #C9A84C;
//             border: 1px solid rgba(201,168,76,0.45);
//             padding: 16px 44px;
//             text-decoration: none;
//             transition: all .3s;
//             display: inline-block;
//           }
//           .ilh-cta-secondary:hover {
//             background: rgba(201,168,76,0.1);
//             border-color: #C9A84C;
//           }

//           /* View all links */
//           .ilh-view-all {
//             font-size: 9px;
//             letter-spacing: 0.22em;
//             text-transform: uppercase;
//             color: #C9A84C;
//             text-decoration: none;
//             border-bottom: 1px solid rgba(201,168,76,0.35);
//             padding-bottom: 2px;
//             transition: border-color .2s;
//           }
//           .ilh-view-all:hover { border-color: #C9A84C; }

//           /* Responsive grid */
//           @media(max-width:767px){
//             .ilh-re-props     { grid-template-columns: 1fr !important; }
//             .ilh-re-devs      { grid-template-columns: repeat(2,1fr) !important; }
//             .ilh-re-editorial { grid-template-columns: 1fr !important; }
//           }
//           @media(max-width:480px){
//             .ilh-re-devs { grid-template-columns: 1fr !important; }
//           }
//           @media(min-width:768px) and (max-width:1023px){
//             .ilh-re-props { grid-template-columns: repeat(2,1fr) !important; }
//             .ilh-re-devs  { grid-template-columns: repeat(2,1fr) !important; }
//           }
//         `}</style>

//         {/* ══ FEATURED PROPERTIES ═══════════════════════════════════════════════ */}
//         <section id="featured-properties" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Villas · Penthouses · Estates</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Featured Properties</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               {/* ✅ CSS class hover */}
//               <a href="/real-estate/all-properties" className="ilh-view-all">View All Properties →</a>
//             </div>

//             <div style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', overflowX: 'auto' }}>
//               {filters.map(f => (
//                 <button key={f} onClick={() => setActiveFilter(f)}
//                   style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '12px 20px', border: 'none', cursor: 'pointer', background: 'transparent', color: activeFilter === f ? '#1A1A1A' : 'rgba(107,101,88,0.5)', borderBottom: activeFilter === f ? '2px solid #C9A84C' : '2px solid transparent', transition: 'all .2s', whiteSpace: 'nowrap', fontWeight: activeFilter === f ? 500 : 400 }}
//                   onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.color = '#1A1A1A'; }}
//                   onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.color = 'rgba(107,101,88,0.5)'; }}
//                 >{f}</button>
//               ))}
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 20 }} className="ilh-re-props">
//               {PROPERTIES.slice(0, 2).map(p => <PropertyCard key={p.slug} p={p} featured />)}
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-re-props">
//               {PROPERTIES.slice(2).map(p => <PropertyCard key={p.slug} p={p} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ DEVELOPER SPOTLIGHTS ══════════════════════════════════════════════ */}
//         <section id="developer-spotlights" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Premium Builders</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>Developer Spotlights</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               {/* ✅ CSS class hover */}
//               <a href="/real-estate/developers" className="ilh-view-all" style={{ color: '#C9A84C', borderBottomColor: 'rgba(201,168,76,0.35)' }}>View All Developers →</a>
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-re-devs">
//               {DEVELOPERS.map(d => <DeveloperCard key={d.slug} d={d} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ EDITORIAL STORIES ═════════════════════════════════════════════════ */}
//         <section id="editorial" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Intelligence & Insight</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Editorial Stories</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               {/* ✅ CSS class hover */}
//               <a href={`/news?category=${THIS_CAT_SLUG}`} className="ilh-view-all">All {THIS_CATEGORY} Stories →</a>
//             </div>

//             {editorialLoading && (
//               <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-re-editorial">
//                 <EditorialSkeleton big />
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                   <EditorialSkeleton />
//                   <EditorialSkeleton />
//                 </div>
//               </div>
//             )}

//             {!editorialLoading && editorialPosts.length === 0 && (
//               <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(107,101,88,0.45)' }}>
//                 <p style={{ fontFamily: 'Georgia,serif', fontSize: 20, marginBottom: 8 }}>No stories published yet.</p>
//                 <p style={{ fontSize: 13 }}>Check back soon for {THIS_CATEGORY} editorial content.</p>
//               </div>
//             )}

//             {!editorialLoading && editorialPosts.length > 0 && (
//               <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-re-editorial">
//                 <EditorialCard post={editorialPosts[0]} big />
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                   {editorialPosts[1] && <EditorialCard post={editorialPosts[1]} />}
//                   {editorialPosts[2] && <EditorialCard post={editorialPosts[2]} />}
//                   {editorialPosts.length === 1 && (
//                     <div style={{ flex: 1, background: '#F5F0E8', border: '1px solid rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
//                       <p style={{ fontSize: 12, color: 'rgba(107,101,88,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>More stories coming soon</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', overflow: 'hidden', background: '#0A0A0A', padding: '100px 32px' }}>
//           <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
//             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
//             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
//             <div style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,122,106,0.1) 0%, transparent 70%)' }} />
//           </div>
//           <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
//             <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.6 }}>🏛️</div>
//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 18 }}>We Are Here to Help</p>
//             <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.12, marginBottom: 20, letterSpacing: '0.015em' }}>
//               Need Curated<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Property Options?</em>
//             </h2>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//               <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//             </div>
//             <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.38)', fontWeight: 300, lineHeight: 1.85, marginBottom: 52, maxWidth: 540, margin: '0 auto 52px' }}>
//               Whether you&apos;re a buyer, investor, or developer — our team connects you with India&apos;s most exceptional real estate opportunities, privately and precisely.
//             </p>
//             {/* ✅ CTA buttons — plain <a> tags with CSS classes */}
//             <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <a href="/partner-with-us?category=real-estate" className="ilh-cta-primary">Get in Touch</a>
//               <a href="/curated-partners?category=real-estate" className="ilh-cta-secondary">View All Partners</a>
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

// // ── FEATURED PROPERTIES ────────────────────────────────────────
// const PROPERTIES = [
//   {
//     slug: 'four-seasons-private-residences-mumbai',
//     type: 'Penthouse',
//     name: 'Four Seasons Private Residences',
//     location: 'Worli, Mumbai',
//     price: '₹42 Cr onwards',
//     area: '4,800 sq ft',
//     bedrooms: '4 BHK',
//     img: '/images/hero-home.jpg',
//     tag: 'Branded Residence',
//     status: 'Ready to Move',
//   },
//   {
//     slug: 'dlf-camellias-gurugram',
//     type: 'Villa',
//     name: 'DLF The Camellias',
//     location: 'Golf Course Road, Gurugram',
//     price: '₹55 Cr onwards',
//     area: '7,200 sq ft',
//     bedrooms: '5 BHK',
//     img: '/images/placeholder-home.jpg',
//     tag: 'Ultra Luxury',
//     status: 'Limited Units',
//   },
//   {
//     slug: 'alibaug-beachfront-villa',
//     type: 'Estate',
//     name: 'Alibaug Beachfront Estate',
//     location: 'Alibaug, Maharashtra',
//     price: '₹18 Cr onwards',
//     area: '12,000 sq ft',
//     bedrooms: '6 BHK',
//     img: '/images/real-estate.jpg',
//     tag: 'Second Home',
//     status: 'New Launch',
//   },
//   {
//     slug: 'oberoi-sky-city-borivali',
//     type: 'Penthouse',
//     name: 'Oberoi Sky City',
//     location: 'Borivali East, Mumbai',
//     price: '₹28 Cr onwards',
//     area: '5,600 sq ft',
//     bedrooms: '4 BHK',
//     img: '/images/hero-home.jpg',
//     tag: 'Branded Residence',
//     status: 'Under Construction',
//   },
//   {
//     slug: 'lodha-malabar-hill',
//     type: 'Penthouse',
//     name: 'Lodha Malabar Hill',
//     location: 'Malabar Hill, Mumbai',
//     price: '₹75 Cr onwards',
//     area: '9,100 sq ft',
//     bedrooms: '5 BHK',
//     img: '/images/placeholder-home.jpg',
//     tag: 'Ultra Luxury',
//     status: 'Ready to Move',
//   },
// //   {
// //     slug: 'goa-heritage-villa-assagao',
// //     type: 'Villa',
// //     name: 'Assagao Heritage Villa',
// //     location: 'Assagao, North Goa',
// //     price: '₹12 Cr onwards',
// //     area: '6,400 sq ft',
// //     bedrooms: '4 BHK',
// //     img: '/images/property-6.jpg',
// //     tag: 'Second Home',
// //     status: 'New Launch',
// //   },
// ];

// // ── DEVELOPER SPOTLIGHTS ───────────────────────────────────────
// const DEVELOPERS = [
//   {
//     slug: 'lodha-group',
//     name: 'Lodha Group',
//     tagline: 'Building India\'s Most Iconic Addresses',
//     city: 'Mumbai',
//     projects: 12,
//     established: '1980',
//     img: '/images/developer-lodha.jpg',
//     logo: '/images/logo-lodha.png',
//     specialty: 'Ultra Luxury Residential',
//   },
//   {
//     slug: 'dlf-limited',
//     name: 'DLF Limited',
//     tagline: 'Creating Communities of Excellence',
//     city: 'Delhi NCR',
//     projects: 18,
//     established: '1946',
//     img: '/images/developer-dlf.jpg',
//     logo: '/images/logo-dlf.png',
//     specialty: 'Luxury Villas & Condominiums',
//   },
//   {
//     slug: 'oberoi-realty',
//     name: 'Oberoi Realty',
//     tagline: 'Luxury Redefined, One Address at a Time',
//     city: 'Mumbai',
//     projects: 8,
//     established: '1983',
//     img: '/images/developer-oberoi.jpg',
//     logo: '/images/logo-oberoi.png',
//     specialty: 'Premium High-Rise Living',
//   },
//   {
//     slug: 'prestige-group',
//     name: 'Prestige Group',
//     tagline: 'South India\'s Finest Luxury Developer',
//     city: 'Bengaluru',
//     projects: 14,
//     established: '1986',
//     img: '/images/developer-prestige.jpg',
//     logo: '/images/logo-prestige.png',
//     specialty: 'Branded & Luxury Residences',
//   },
// ];

// // ── EDITORIAL POSTS ────────────────────────────────────────────
// const EDITORIAL = [
//   {
//     slug: 'best-second-home-markets-india-2026',
//     category: 'Branded Residences',
//     title: 'Branded Residences Rise: How Global Luxury Hotels Are Redefining Indian Real Estate',
//     excerpt: 'From Four Seasons to Ritz-Carlton, global hospitality giants are reimagining luxury living in India\'s most coveted addresses.',
//     img: '/images/hero-home.jpg',
//     author: 'Priya Mehta',
//     date: 'Apr 28, 2026',
//     readTime: 8,
//   },
//   {
//     slug: 'branded-residences-rise-india',
//     category: 'Investment',
//     title: 'The Best Second-Home Markets in India for 2026',
//     excerpt: 'From Alibaug to Kasauli, where India\'s ultra-affluent are investing in their next great escape.',
//     img: '/images/real-estate.jpg',
//     author: 'Rahul Singhania',
//     date: 'Apr 24, 2026',
//     readTime: 6,
//   },
//   {
//     slug: 'best-second-home-markets-india-2026',
//     category: 'Buyers Guide',
//     title: 'The Discerning Buyer\'s Guide to Luxury Real Estate in India',
//     excerpt: 'Location, developer reputation, product quality — what to evaluate before committing to India\'s most exclusive addresses.',
//     img: '/images/placeholder-home.jpg',
//     author: 'Vikram Malhotra',
//     date: 'Apr 16, 2026',
//     readTime: 9,
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

//           <nav className="ilh-re-nav" style={{ display: 'flex', alignItems: 'center' }}>
//             {NAV_LINKS.map(link => {
//               const isActive = link.href === '/real-estate';
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

//           <button className="ilh-re-ham" onClick={() => setMenuOpen(!menuOpen)}
//             style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 8, display: 'none' }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               {menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//             </svg>
//           </button>
//         </div>

//         <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: menuOpen ? 600 : 0, transition: 'max-height 0.35s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           {NAV_LINKS.map(link => (
//             <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
//               style={{ display: 'block', padding: '14px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: link.href === '/real-estate' ? '#DFC27A' : 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
//               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//               onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//             >{link.label}</Link>
//           ))}
//         </div>
//         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
//       </header>

//       <style>{`
//         .ilh-re-nav { display: flex !important; }
//         .ilh-re-ham { display: none !important; }
//         @media(max-width:1100px){ .ilh-re-nav { display: none !important; } .ilh-re-ham { display: flex !important; } }
//       `}</style>
//     </>
//   );
// }

// // ── PROPERTY CARD ─────────────────────────────────────────────
// function PropertyCard({ p, featured = false }: { p: typeof PROPERTIES[0]; featured?: boolean }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/real-estate/${p.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: '#fff', border: `1px solid rgba(201,168,76,${hov ? '0.3' : '0.12'})`, transition: 'all .3s', boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.08)' : 'none' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', paddingBottom: featured ? '58%' : '65%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={p.img} alt={p.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .7s ease', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
//           sizes={featured ? '50vw' : '33vw'}
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)', transition: 'background .4s' }} />

//         {/* Top badges */}
//         <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '5px 10px', border: '1px solid rgba(201,168,76,0.3)' }}>
//             {p.tag}
//           </span>
//         </div>
//         <div style={{ position: 'absolute', top: 14, right: 14 }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAFAF8', background: p.status === 'Ready to Move' ? 'rgba(42,122,106,0.9)' : p.status === 'New Launch' ? 'rgba(201,168,76,0.9)' : 'rgba(10,10,10,0.8)', padding: '5px 10px' }}>
//             {p.status}
//           </span>
//         </div>

//         {/* Property type bottom */}
//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 100%)' }}>
//           <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>{p.type}</span>
//         </div>
//       </div>

//       {/* Content */}
//       <div style={{ padding: '20px 22px 24px' }}>
//         <div style={{ width: hov ? 36 : 18, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s ease' }} />

//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: featured ? 20 : 17, fontWeight: 400, color: '#1A1A1A', marginBottom: 5, letterSpacing: '0.01em', lineHeight: 1.3, transition: 'color .25s' }}>
//           {p.name}
//         </h3>
//         <p style={{ fontSize: 11, color: 'rgba(107,101,88,0.65)', marginBottom: 16, letterSpacing: '0.06em', fontWeight: 300 }}>
//           📍 {p.location}
//         </p>

//         {/* Stats row */}
//         <div style={{ display: 'flex', gap: 16, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
//           {[
//             { label: 'Area', val: p.area },
//             { label: 'Config', val: p.bedrooms },
//           ].map(stat => (
//             <div key={stat.label}>
//               <p style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.45)', marginBottom: 3 }}>{stat.label}</p>
//               <p style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 400, letterSpacing: '0.04em' }}>{stat.val}</p>
//             </div>
//           ))}
//         </div>

//         {/* Price + CTA */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>
//             <p style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.45)', marginBottom: 3 }}>Starting from</p>
//             <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#C9A84C', fontWeight: 400, letterSpacing: '0.02em' }}>{p.price}</p>
//           </div>
//           <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: hov ? '#1A1A1A' : '#C9A84C', background: hov ? '#C9A84C' : 'transparent', border: '1px solid rgba(201,168,76,0.4)', padding: '8px 14px', transition: 'all .3s' }}>
//             Enquire →
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── DEVELOPER CARD ────────────────────────────────────────────
// function DeveloperCard({ d }: { d: typeof DEVELOPERS[0] }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/real-estate/developers/${d.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#0A0A0A' : '#111', border: `1px solid rgba(201,168,76,${hov ? '0.35' : '0.12'})`, transition: 'all .3s', overflow: 'hidden' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       {/* Hero image */}
//       <div style={{ position: 'relative', paddingBottom: '52%', overflow: 'hidden', background: '#1A1A1A' }}>
//         <Image src={d.img} alt={d.name} fill
//           style={{ objectFit: 'cover', transition: 'transform .6s', transform: hov ? 'scale(1.05)' : 'scale(1)', opacity: 0.7 }}
//           sizes="25vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.5)' }} />
//         {/* Est. badge */}
//         <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', padding: '4px 10px' }}>
//           <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Est. {d.established}</span>
//         </div>
//       </div>

//       {/* Content */}
//       <div style={{ padding: '22px 22px 24px' }}>
//         <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width .35s' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 19, fontWeight: 400, color: '#FAFAF8', marginBottom: 6, letterSpacing: '0.02em' }}>{d.name}</h3>
//         <p style={{ fontSize: 11, color: 'rgba(201,168,76,0.5)', marginBottom: 14, letterSpacing: '0.04em', fontStyle: 'italic' }}>{d.tagline}</p>

//         <div style={{ display: 'flex', gap: 20, marginBottom: 18 }}>
//           <div>
//             <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 3 }}>City</p>
//             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>{d.city}</p>
//           </div>
//           <div>
//             <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 3 }}>Projects</p>
//             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>{d.projects}+</p>
//           </div>
//         </div>

//         <div style={{ padding: '8px 12px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.1)', marginBottom: 0 }}>
//           <p style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)' }}>{d.specialty}</p>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── EDITORIAL CARD ────────────────────────────────────────────
// function EditorialCard({ post, big = false }: { post: typeof EDITORIAL[0]; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: big ? '55%' : '60%', overflow: 'hidden', background: '#1A1A1A' }}>
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
// //   return (
// //     <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '64px 32px 32px' }}>
// //       <div style={{ maxWidth: 1280, margin: '0 auto' }}>
// //         <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 52 }} className="ilh-re-footer">
// //           <div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
// //               <ILHLogo size={36} />
// //               <div>
// //                 <div style={{ fontFamily: 'Georgia,serif', fontSize: 15, color: '#DFC27A', letterSpacing: '0.28em' }}>INDIAN</div>
// //                 <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.35)', letterSpacing: '0.4em', marginTop: 2 }}>LUXURY HOUSE</div>
// //               </div>
// //             </div>
// //             <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, fontWeight: 300, maxWidth: 250, marginBottom: 24 }}>Where India Meets Global Luxury. Celebrating the world of luxury through an India-first lens.</p>
// //             <div style={{ display: 'flex', gap: 18 }}>
// //               {['Instagram', 'LinkedIn'].map(s => (
// //                 <a key={s} href="#" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.38)', textDecoration: 'none', transition: 'color .2s' }}
// //                   onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
// //                   onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.38)')}
// //                 >{s}</a>
// //               ))}
// //             </div>
// //           </div>
// //           <div>
// //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Categories</p>
// //             {CATS.map(c => (
// //               <Link key={c.slug} href={`/${c.slug}`}
// //                 style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', marginBottom: 12, letterSpacing: '0.04em', transition: 'color .2s' }}
// //                 onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
// //                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
// //               >{c.name}</Link>
// //             ))}
// //           </div>
// //           <div>
// //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Navigate</p>
// //             {[{ l: 'Home', h: '/' }, { l: 'News', h: '/news' }, { l: 'Partner With Us', h: '/partner-with-us' }, { l: 'About', h: '/about' }].map(item => (
// //               <Link key={item.h} href={item.h}
// //                 style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', marginBottom: 12, letterSpacing: '0.04em', transition: 'color .2s' }}
// //                 onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
// //                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
// //               >{item.l}</Link>
// //             ))}
// //           </div>
// //           <div>
// //             <p style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.32)', marginBottom: 20 }}>Contact</p>
// //             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginBottom: 6 }}>Partnerships:</p>
// //             <a href="mailto:hello@indianluxuryhouse.com"
// //               style={{ fontSize: 12, color: 'rgba(201,168,76,0.5)', textDecoration: 'none', display: 'block', marginBottom: 28, transition: 'color .2s' }}
// //               onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
// //               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.5)')}
// //             >hello@indianluxuryhouse.com</a>
// //             <p style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.28)', marginBottom: 12 }}>Newsletter</p>
// //             <div style={{ display: 'flex' }}>
// //               <input type="email" placeholder="your@email.com"
// //                 style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.18)', color: '#DFC27A', fontSize: 11, padding: '9px 12px', outline: 'none', fontFamily: 'inherit', minWidth: 0 }}
// //               />
// //               <button style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', padding: '9px 14px', cursor: 'pointer', fontSize: 14, fontWeight: 700, transition: 'background .2s' }}
// //                 onMouseEnter={e => ((e.target as HTMLElement).style.background = '#DFC27A')}
// //                 onMouseLeave={e => ((e.target as HTMLElement).style.background = '#C9A84C')}
// //               >→</button>
// //             </div>
// //           </div>
// //         </div>
// //         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)', marginBottom: 24 }} />
// //         <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
// //           <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} Indian Luxury House. All rights reserved.</p>
// //           <div style={{ display: 'flex', gap: 22 }}>
// //             {['Privacy Policy', 'Terms of Use'].map(l => (
// //               <a key={l} href="#" style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color .2s' }}
// //                 onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
// //                 onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.16)')}
// //               >{l}</a>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //       <style>{`
// //         @media(max-width:767px){ .ilh-re-footer { grid-template-columns: 1fr !important; gap: 32px !important; } }
// //         @media(min-width:768px) and (max-width:1023px){ .ilh-re-footer { grid-template-columns: 1fr 1fr !important; } }
// //       `}</style>
// //     </footer>
// //   );
// // }

// // ── REAL ESTATE PAGE (MAIN) ───────────────────────────────────
// export default function RealEstatePage() {
//   const [activeFilter, setActiveFilter] = useState('All');
//   const filters = ['All', 'Villas', 'Penthouses', 'Estates', 'Branded Residences'];

//   return (
//     <>
//       <Navbar />
//       <main>

//         {/* ══ HERO ═════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', height: '100vh', minHeight: 640, maxHeight: 920, overflow: 'hidden', background: '#0A0A0A' }}>
//           <Image
//             src="/images/real-estate.jpg"
//             alt="Luxury Real Estate India"
//             fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             quality={95}
//           />
//           {/* Overlays */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0.15) 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,10,10,0.6) 0%, transparent 55%)' }} />
//           {/* Gold bottom shimmer */}
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
//               <span style={{ color: '#C9A84C' }}>Real Estate</span>
//             </div>

//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 18, animation: 'reFadeUp .8s .1s ease both' }}>
//               Indian Luxury House
//             </p>

//             <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(44px,8vw,100px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.03, marginBottom: 22, letterSpacing: '0.015em', animation: 'reFadeUp .8s .2s ease both' }}>
//               Luxury<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Real Estate</em>
//             </h1>

//             <p style={{ fontSize: 16, color: 'rgba(250,250,248,0.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 540, marginBottom: 44, letterSpacing: '0.02em', animation: 'reFadeUp .8s .3s ease both' }}>
//               India&apos;s finest residences and global investment opportunities — villas, penthouses, and branded estates curated for the discerning few.
//             </p>

//             {/* Quick nav pills */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'reFadeUp .8s .4s ease both' }}>
//               {['Featured Properties', 'Developer Spotlights', 'Editorial'].map(tab => (
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
//           @keyframes reFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//           @media(max-width:767px){
//             .ilh-re-props    { grid-template-columns: 1fr !important; }
//             .ilh-re-devs     { grid-template-columns: repeat(2,1fr) !important; }
//             .ilh-re-editorial{ grid-template-columns: 1fr !important; }
//           }
//           @media(max-width:480px){
//             .ilh-re-devs     { grid-template-columns: 1fr !important; }
//           }
//           @media(min-width:768px) and (max-width:1023px){
//             .ilh-re-props    { grid-template-columns: repeat(2,1fr) !important; }
//             .ilh-re-devs     { grid-template-columns: repeat(2,1fr) !important; }
//           }
//         `}</style>

//         {/* ══ FEATURED PROPERTIES ══════════════════════════════ */}
//         <section id="featured-properties" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>

//             {/* Header */}
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Villas · Penthouses · Estates</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Featured Properties</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/real-estate/all-properties"
//                 style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>
//                 View All Properties →
//               </Link>
//             </div>

//             {/* Filter bar */}
//             <div style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', overflowX: 'auto' }}>
//               {filters.map(f => (
//                 <button key={f} onClick={() => setActiveFilter(f)}
//                   style={{
//                     fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
//                     padding: '12px 20px', border: 'none', cursor: 'pointer', background: 'transparent',
//                     color: activeFilter === f ? '#1A1A1A' : 'rgba(107,101,88,0.5)',
//                     borderBottom: activeFilter === f ? '2px solid #C9A84C' : '2px solid transparent',
//                     transition: 'all .2s', whiteSpace: 'nowrap', fontWeight: activeFilter === f ? 500 : 400,
//                   }}
//                   onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.color = '#1A1A1A'; }}
//                   onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.color = 'rgba(107,101,88,0.5)'; }}
//                 >{f}</button>
//               ))}
//             </div>

//             {/* Properties grid — featured top 2 large, rest 3-col */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 20 }} className="ilh-re-props">
//               {PROPERTIES.slice(0, 2).map(p => <PropertyCard key={p.slug} p={p} featured />)}
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-re-props">
//               {PROPERTIES.slice(2).map(p => <PropertyCard key={p.slug} p={p} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ DEVELOPER SPOTLIGHTS ═════════════════════════════ */}
//         <section id="developer-spotlights" style={{ background: '#0A0A0A', padding: '88px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Premium Builders</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#FAFAF8', letterSpacing: '0.02em' }}>Developer Spotlights</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/real-estate/developers"
//                 style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>
//                 View All Developers →
//               </Link>
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="ilh-re-devs">
//               {DEVELOPERS.map(d => <DeveloperCard key={d.slug} d={d} />)}
//             </div>
//           </div>
//         </section>

//         {/* ══ EDITORIAL STORIES ════════════════════════════════ */}
//         <section id="editorial" style={{ background: '#FAFAF8', padding: '88px 32px' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Intelligence & Insight</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.02em' }}>Editorial Stories</h2>
//                 <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,#C9A84C,transparent)', marginTop: 18 }} />
//               </div>
//               <Link href="/news?category=real-estate"
//                 style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>
//                 All Real Estate Stories →
//               </Link>
//             </div>

//             {/* Big left + 2 stacked right */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }} className="ilh-re-editorial">
//               <EditorialCard post={EDITORIAL[0]} big />
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                 <EditorialCard post={EDITORIAL[1]} />
//                 <EditorialCard post={EDITORIAL[2]} />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ══ CTA ═════════════════════════════════════════════ */}
//         <section style={{ position: 'relative', overflow: 'hidden', background: '#0A0A0A', padding: '100px 32px' }}>
//           {/* Decorative */}
//           <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
//             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
//             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }} />
//             <div style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,122,106,0.1) 0%, transparent 70%)' }} />
//             <div style={{ position: 'absolute', left: -100, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
//           </div>

//           <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
//             {/* Icon */}
//             <div style={{ fontSize: 36, marginBottom: 24, opacity: 0.6 }}>🏛️</div>

//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 18 }}>We Are Here to Help</p>

//             <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.12, marginBottom: 20, letterSpacing: '0.015em' }}>
//               Need Curated<br /><em style={{ color: '#DFC27A', fontStyle: 'italic' }}>Property Options?</em>
//             </h2>

//             {/* Gold divider */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//               <span style={{ color: '#C9A84C', fontSize: 14, opacity: 0.6 }}>◈</span>
//               <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//             </div>

//             <p style={{ fontSize: 14, color: 'rgba(250,250,248,0.38)', fontWeight: 300, lineHeight: 1.85, marginBottom: 52, maxWidth: 540, margin: '0 auto 52px' }}>
//               Whether you&apos;re a buyer, investor, or developer — our team connects you with India&apos;s most exceptional real estate opportunities, privately and precisely.
//             </p>

//             <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Link href="/partner-with-us?category=real-estate"
//                 style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '16px 44px', textDecoration: 'none', fontWeight: 700, transition: 'background .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
//               >Get in Touch</Link>

//               <Link href="/curated-partners?category=real-estate"
//                 style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.45)', padding: '16px 44px', textDecoration: 'none', transition: 'all .3s', display: 'inline-block' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; }}
//               >View All Partners</Link>
//             </div>
//           </div>
//         </section>

//       </main>
      
//     </>
//   );
// }