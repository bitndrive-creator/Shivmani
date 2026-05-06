'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const FILTERS = ['All', 'Real Estate', 'Automobiles', 'Jewellery & Watches', 'Weddings', 'Curated Partners'];

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

// Category ke hisab se accent colors
const CAT_COLORS: Record<string, string> = {
  'Real Estate':         '#1B4D45',
  'Automobiles':         '#8B6914',
  'Jewellery & Watches': '#2C4A7C',
  'Weddings':            '#7C2C5A',
  'Curated Partners':    '#3D3D3D',
};

// Category ke hisab se slug (URL mein use hoga)
const CAT_SLUG: Record<string, string> = {
  'Real Estate':         'real-estate',
  'Automobiles':         'automobiles',
  'Jewellery & Watches': 'jewellery-watches',
  'Weddings':            'weddings',
  'Curated Partners':    'curated-partners',
};

function formatDate(iso: string) {
  try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return iso; }
}

// ── ARTICLE CARD ───────────────────────────────────────────────
function ArticleCard({ article, big = false }: { article: Post; big?: boolean }) {
  const [hov, setHov] = useState(false);
  const accent = CAT_COLORS[article.category] ?? '#1B4D45';
  const catSlug = CAT_SLUG[article.category] ?? 'news';
  const postUrl = `/${catSlug}/${article.slug}`;

  return (
    <a
      href={postUrl}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        background: hov ? '#0a0a0a' : '#ffffff',
        border: '1px solid',
        borderColor: hov ? 'transparent' : '#ececec',
        padding: big ? '40px 36px' : '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: hov ? 'linear-gradient(90deg,#1B4D45,#C9A84C)' : accent, transition: 'background 0.3s' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.7)' : accent, fontFamily: 'sans-serif', fontWeight: 500 }}>{article.category}</span>
          <span style={{ fontSize: 10, color: hov ? 'rgba(255,255,255,0.25)' : '#bbb', fontFamily: 'sans-serif' }}>{formatDate(article.createdAt)}</span>
        </div>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: big ? 'clamp(20px,2.5vw,28px)' : 18, fontWeight: 400, color: hov ? '#ffffff' : '#0a0a0a', marginBottom: 12, lineHeight: 1.4, transition: 'color 0.3s' }}>{article.title}</h3>
        <div style={{ width: hov ? 36 : 24, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width 0.3s' }} />
        <p style={{ fontSize: 13, lineHeight: 1.85, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.45)' : '#666', marginBottom: 20, flex: 1 }}>{article.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'sans-serif', fontWeight: 500 }}>{article.author}</span>
          <span style={{ fontSize: 10, color: hov ? 'rgba(255,255,255,0.25)' : '#bbb', fontFamily: 'sans-serif' }}>{article.readTime} min read</span>
        </div>
      </div>
    </a>
  );
}

// ── SKELETON CARD ──────────────────────────────────────────────
function SkeletonCard({ big = false }: { big?: boolean }) {
  return (
    <div style={{ background: '#f8f8f8', border: '1px solid #ececec', padding: big ? '40px 36px' : '32px 28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#e0e0e0' }} />
      <div style={{ height: 10, width: '30%', background: 'linear-gradient(90deg,#ececec 25%,#e0e0e0 50%,#ececec 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 2, marginBottom: 16 }} />
      <div style={{ height: big ? 28 : 20, width: '85%', background: 'linear-gradient(90deg,#ececec 25%,#e0e0e0 50%,#ececec 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 2, marginBottom: 8 }} />
      <div style={{ height: big ? 28 : 20, width: '65%', background: 'linear-gradient(90deg,#ececec 25%,#e0e0e0 50%,#ececec 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 2, marginBottom: 14 }} />
      <div style={{ height: 1, width: 24, background: '#C9A84C', marginBottom: 14 }} />
      <div style={{ height: 12, width: '90%', background: 'linear-gradient(90deg,#ececec 25%,#e0e0e0 50%,#ececec 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 2, marginBottom: 8 }} />
      <div style={{ height: 12, width: '75%', background: 'linear-gradient(90deg,#ececec 25%,#e0e0e0 50%,#ececec 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 2 }} />
    </div>
  );
}

// ── NEWS PAGE ──────────────────────────────────────────────────
export default function NewsPage() {
  const [active, setActive] = useState('All');
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  // API state
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // API se saare published posts fetch karo
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://91.108.111.103:5000/api/editorials');
        if (!res.ok) return;
        const data: Post[] = await res.json();
        // Sirf published posts
        setAllPosts(data.filter(p => p.isPublished));
      } catch (err) {
        console.error('News fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Active filter ke hisab se filter karo
  const filtered = active === 'All'
    ? allPosts
    : allPosts.filter(p => p.category === active);

  return (
    <>
      <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          backgroundImage: 'url(/images/news.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '100px 32px 90px',
          overflow: 'hidden',
          textAlign: 'center',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.72)' }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>Editorial</p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(38px,6vw,76px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 28 }}>
              Luxury News <em style={{ color: '#C9A84C' }}>&amp; Insights</em>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', fontWeight: 300, fontFamily: 'sans-serif' }}>Intelligence, trends, and stories from the world of Indian luxury.</p>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
        </section>

        {/* ══ FILTERS ════════════════════════════════════════════ */}
        <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)', position: 'sticky', top: 72, zIndex: 50 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
            {FILTERS.map((f, i) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '18px 22px', fontSize: 10, letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 500,
                  color: active === f ? '#C9A84C' : 'rgba(255,255,255,0.3)',
                  borderBottom: active === f ? '2px solid #C9A84C' : '2px solid transparent',
                  borderRight: i < FILTERS.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                  transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (active !== f) e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                onMouseLeave={e => { if (active !== f) e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* ══ ARTICLES ═══════════════════════════════════════════ */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: '#aaa', fontFamily: 'sans-serif' }}>
              {loading
                ? <span style={{ color: 'rgba(201,168,76,0.5)' }}>Loading…</span>
                : <><span style={{ color: '#C9A84C', fontWeight: 600 }}>{filtered.length}</span> {filtered.length === 1 ? 'story' : 'stories'}</>
              }
            </p>
            <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
          </div>

          {/* ── Loading skeletons ── */}
          {loading && (
            <>
              <div style={{ marginBottom: 24 }}>
                <SkeletonCard big />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="news-grid">
                {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
              </div>
            </>
          )}

          {/* ── No posts ── */}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#0a0a0a', marginBottom: 10 }}>No stories found.</p>
              <p style={{ fontSize: 13, color: '#aaa', fontFamily: 'sans-serif' }}>
                {active === 'All'
                  ? 'Check back soon for new editorial content.'
                  : `No published stories in "${active}" yet. Check back soon.`
                }
              </p>
            </div>
          )}

          {/* ── Posts grid: big featured + rest in 3-col ── */}
          {!loading && filtered.length > 0 && (
            <>
              {/* Featured top card (only on All view or single category) */}
              <div style={{ marginBottom: 24 }}>
                <ArticleCard article={filtered[0]} big />
              </div>

              {filtered.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="news-grid">
                  {filtered.slice(1).map(a => <ArticleCard key={a._id} article={a} />)}
                </div>
              )}
            </>
          )}
        </section>

        {/* ══ NEWSLETTER CTA ════════════════════════════════════ */}
        <section style={{ background: '#0a0a0a', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'sans-serif' }}>Weekly Intelligence</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px,4vw,44px)', fontWeight: 300, color: '#ffffff', marginBottom: 12, letterSpacing: '0.01em' }}>
              Join India's <em style={{ color: '#C9A84C' }}>Luxury Circle</em>
            </h2>
            <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto 20px' }} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 32, lineHeight: 1.8, fontFamily: 'sans-serif' }}>Curated stories, market intelligence, and exclusive insights — every Thursday.</p>
            {subbed ? (
              <p style={{ color: '#C9A84C', fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300 }}>Welcome to the Circle. ✦</p>
            ) : (
              <div style={{ display: 'flex', maxWidth: 420, margin: '0 auto' }}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="your@email.com"
                  style={{ flex: 1, background: '#141414', border: '1px solid rgba(201,168,76,0.2)', borderRight: 'none', color: '#fff', fontSize: 13, padding: '14px 18px', outline: 'none', fontFamily: 'sans-serif' }}
                />
                <button
                  onClick={() => email && setSubbed(true)}
                  style={{ background: '#C9A84C', border: 'none', color: '#0a0a0a', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600, padding: '14px 24px', cursor: 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
                >Subscribe</button>
              </div>
            )}
          </div>
        </section>

        {/* ══ BACK LINK ══════════════════════════════════════════ */}
        <div style={{ textAlign: 'center', padding: '36px 32px 52px', borderTop: '1px solid #f0f0f0' }}>
          {/* ✅ plain <a> — no Link hover handler issues */}
          <a href="/" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif', borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3 }}>← Back to Journal</a>
        </div>

      </main>

      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @media (max-width: 767px)                        { .news-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 768px) and (max-width: 1023px){ .news-grid { grid-template-columns: repeat(2,1fr) !important; } }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </>
  );
}


// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// const FILTERS = ['All', 'Real Estate', 'Cars', 'Watches', 'Weddings', 'Global Luxury'];

// const ARTICLES = [
//   { id: 1, category: 'Real Estate',    title: 'Luxury Home Trends Reshaping Dubai and Mumbai in 2026',              excerpt: "From sky gardens to AI-integrated smart homes, ultra-luxury residential design is entering a new era across India and the Gulf.",                    author: 'Priya Mehta',    date: 'Apr 28, 2026', readTime: 6 },
//   { id: 2, category: 'Weddings',       title: "India's Premium Wedding Boom: Why the ₹100 Crore Wedding Is the New Normal", excerpt: "Palace venues, couture designers, and destination celebrations — India's luxury wedding economy is growing at 35% year-on-year.",             author: 'Ananya Singh',   date: 'Apr 26, 2026', readTime: 7 },
//   { id: 3, category: 'Watches',        title: 'The Rise of Collectible Watches as Alternative Investment Assets',     excerpt: "Patek Philippe, Rolex, and AP are no longer just timepieces — they are among the fastest-appreciating alternative assets globally.",            author: 'Rahul Kapoor',   date: 'Apr 24, 2026', readTime: 5 },
//   { id: 4, category: 'Cars',           title: 'India Now the Fastest-Growing Market for Ultra-Luxury Automobiles',   excerpt: "Rolls-Royce, Bentley, and Lamborghini all report record India sales in 2025 — and 2026 is already outpacing last year.",                       author: 'Dev Sharma',     date: 'Apr 22, 2026', readTime: 6 },
//   { id: 5, category: 'Global Luxury',  title: "The New Luxury Consumer: How India's HNIs Are Rewriting the Rules",   excerpt: "Younger, more globally minded, and deeply values-driven — India's next generation of luxury buyers are transforming how premium brands operate.", author: 'Meera Bose',     date: 'Apr 20, 2026', readTime: 8 },
//   { id: 6, category: 'Real Estate',    title: 'Branded Residences: The New Trophy Asset for India\'s Ultra-Rich',    excerpt: "Backed by names like Four Seasons, Ritz-Carlton, and Armani, branded residences command 30–40% premiums over comparable luxury homes.",         author: 'Vikram Nair',    date: 'Apr 18, 2026', readTime: 5 },
//   { id: 7, category: 'Watches',        title: "Patek Philippe's Nautilus: Why It Still Commands Six Figures in 2026", excerpt: "Discontinued, yet more coveted than ever. The 5711 remains the market's most enduring paradox — and the ultimate status symbol.",              author: 'Arjun Das',      date: 'Apr 16, 2026', readTime: 6 },
//   { id: 8, category: 'Cars',           title: 'The 10 Best Luxury SUVs to Buy in India Right Now',                   excerpt: "From the Bentley Bentayga to the Range Rover SV, we rank the finest ultra-premium SUVs available to Indian buyers in 2026.",                 author: 'Rohan Pillai',   date: 'Apr 14, 2026', readTime: 7 },
//   { id: 9, category: 'Global Luxury',  title: 'How the Maldives Is Reinventing Ultra-Luxury Travel for 2026',        excerpt: "Private island residences, submarine dining, and wellness retreats designed for the world's most discerning travellers.",                       author: 'Sia Malhotra',   date: 'Apr 12, 2026', readTime: 5 },
// ];

// const CAT_COLORS: Record<string, string> = {
//   'Real Estate': '#1B4D45',
//   'Cars':        '#8B6914',
//   'Watches':     '#2C4A7C',
//   'Weddings':    '#7C2C5A',
//   'Global Luxury':'#3D3D3D',
// };

// function ArticleCard({ article, big = false }: { article: typeof ARTICLES[0]; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   const accent = CAT_COLORS[article.category] ?? '#1B4D45';
//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{ background: hov ? '#0a0a0a' : '#ffffff', border: '1px solid', borderColor: hov ? 'transparent' : '#ececec', padding: big ? '40px 36px' : '32px 28px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
//     >
//       <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: hov ? 'linear-gradient(90deg,#1B4D45,#C9A84C)' : accent, transition: 'background 0.3s' }} />
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
//         <span style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.7)' : accent, fontFamily: 'sans-serif', fontWeight: 500 }}>{article.category}</span>
//         <span style={{ fontSize: 10, color: hov ? 'rgba(255,255,255,0.25)' : '#bbb', fontFamily: 'sans-serif' }}>{article.date}</span>
//       </div>
//       <h3 style={{ fontFamily: 'Georgia, serif', fontSize: big ? 'clamp(20px,2.5vw,28px)' : 18, fontWeight: 400, color: hov ? '#ffffff' : '#0a0a0a', marginBottom: 12, lineHeight: 1.4, transition: 'color 0.3s' }}>{article.title}</h3>
//       <div style={{ width: hov ? 36 : 24, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width 0.3s' }} />
//       <p style={{ fontSize: 13, lineHeight: 1.85, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.45)' : '#666', marginBottom: 20, flex: 1 }}>{article.excerpt}</p>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'sans-serif', fontWeight: 500 }}>{article.author}</span>
//         <span style={{ fontSize: 10, color: hov ? 'rgba(255,255,255,0.25)' : '#bbb', fontFamily: 'sans-serif' }}>{article.readTime} min read</span>
//       </div>
//     </div>
//   );
// }

// export default function NewsPage() {
//   const [active, setActive] = useState('All');
//   const filtered = active === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === active);
//   const [email, setEmail] = useState('');
//   const [subbed, setSubbed] = useState(false);

//   return (
//     <>
//       <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

//         {/* HERO */}
//         <section style={{
//           position: 'relative',
//           backgroundImage: 'url(/images/news.jpg)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           padding: '100px 32px 90px',
//           overflow: 'hidden',
//           textAlign: 'center',
//         }}>
//           {/* Dark overlay for text readability */}
//           <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.72)' }} />
//           {/* Subtle gold grid pattern */}
//           <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px)' }} />
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
//           <div style={{ position: 'relative', zIndex: 10, maxWidth: 720, margin: '0 auto' }}>
//             <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>Editorial</p>
//             <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(38px,6vw,76px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 28 }}>
//               Luxury News <em style={{ color: '#C9A84C' }}>&amp; Insights</em>
//             </h1>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
//               <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
//               <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
//               <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
//             </div>
//             <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', fontWeight: 300, fontFamily: 'sans-serif' }}>Intelligence, trends, and stories from the world of Indian luxury.</p>
//           </div>
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
//         </section>

//         {/* FILTERS */}
//         <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)', position: 'sticky', top: 72, zIndex: 50 }}>
//           <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
//             {FILTERS.map((f, i) => (
//               <button key={f} onClick={() => setActive(f)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '18px 22px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 500, color: active === f ? '#C9A84C' : 'rgba(255,255,255,0.3)', borderBottom: active === f ? '2px solid #C9A84C' : '2px solid transparent', borderRight: i < FILTERS.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>{f}</button>
//             ))}
//           </div>
//         </div>

//         {/* ARTICLES */}
//         <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 80px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
//             <p style={{ fontSize: 11, color: '#aaa', fontFamily: 'sans-serif' }}>
//               <span style={{ color: '#C9A84C', fontWeight: 600 }}>{filtered.length}</span> stories
//             </p>
//             <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//           </div>

//           {/* Top featured */}
//           {active === 'All' && filtered.length > 0 && (
//             <div style={{ marginBottom: 24 }}>
//               <ArticleCard article={filtered[0]} big />
//             </div>
//           )}

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="news-grid">
//             {(active === 'All' ? filtered.slice(1) : filtered).map(a => <ArticleCard key={a.id} article={a} />)}
//           </div>
//         </section>

//         {/* NEWSLETTER CTA */}
//         <section style={{ background: '#0a0a0a', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
//           <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
//           <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
//           <div style={{ maxWidth: 520, margin: '0 auto' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'sans-serif' }}>Weekly Intelligence</p>
//             <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px,4vw,44px)', fontWeight: 300, color: '#ffffff', marginBottom: 12, letterSpacing: '0.01em' }}>
//               Join India's <em style={{ color: '#C9A84C' }}>Luxury Circle</em>
//             </h2>
//             <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto 20px' }} />
//             <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 32, lineHeight: 1.8, fontFamily: 'sans-serif' }}>Curated stories, market intelligence, and exclusive insights — every Thursday.</p>
//             {subbed ? (
//               <p style={{ color: '#C9A84C', fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300 }}>Welcome to the Circle. ✦</p>
//             ) : (
//               <div style={{ display: 'flex', maxWidth: 420, margin: '0 auto' }}>
//                 <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" style={{ flex: 1, background: '#141414', border: '1px solid rgba(201,168,76,0.2)', borderRight: 'none', color: '#fff', fontSize: 13, padding: '14px 18px', outline: 'none', fontFamily: 'sans-serif' }} />
//                 <button onClick={() => email && setSubbed(true)} style={{ background: '#C9A84C', border: 'none', color: '#0a0a0a', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600, padding: '14px 24px', cursor: 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
//                   onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
//                   onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
//                 >Subscribe</button>
//               </div>
//             )}
//           </div>
//         </section>

//         <div style={{ textAlign: 'center', padding: '36px 32px 52px', borderTop: '1px solid #f0f0f0' }}>
//           <Link href="/" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif', borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3 }}>← Back to Journal</Link>
//         </div>
//       </main>

//       <style>{`
//         @media (max-width: 767px) { .news-grid { grid-template-columns: 1fr !important; } }
//         @media (min-width: 768px) and (max-width: 1023px) { .news-grid { grid-template-columns: repeat(2,1fr) !important; } }
//         input::placeholder { color: rgba(255,255,255,0.2); }
//       `}</style>
//     </>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// const FILTERS = ['All', 'Real Estate', 'Cars', 'Watches', 'Weddings', 'Global Luxury'];

// const ARTICLES = [
//   { id: 1, category: 'Real Estate',    title: 'Luxury Home Trends Reshaping Dubai and Mumbai in 2026',              excerpt: "From sky gardens to AI-integrated smart homes, ultra-luxury residential design is entering a new era across India and the Gulf.",                    author: 'Priya Mehta',    date: 'Apr 28, 2026', readTime: 6 },
//   { id: 2, category: 'Weddings',       title: "India's Premium Wedding Boom: Why the ₹100 Crore Wedding Is the New Normal", excerpt: "Palace venues, couture designers, and destination celebrations — India's luxury wedding economy is growing at 35% year-on-year.",             author: 'Ananya Singh',   date: 'Apr 26, 2026', readTime: 7 },
//   { id: 3, category: 'Watches',        title: 'The Rise of Collectible Watches as Alternative Investment Assets',     excerpt: "Patek Philippe, Rolex, and AP are no longer just timepieces — they are among the fastest-appreciating alternative assets globally.",            author: 'Rahul Kapoor',   date: 'Apr 24, 2026', readTime: 5 },
//   { id: 4, category: 'Cars',           title: 'India Now the Fastest-Growing Market for Ultra-Luxury Automobiles',   excerpt: "Rolls-Royce, Bentley, and Lamborghini all report record India sales in 2025 — and 2026 is already outpacing last year.",                       author: 'Dev Sharma',     date: 'Apr 22, 2026', readTime: 6 },
//   { id: 5, category: 'Global Luxury',  title: "The New Luxury Consumer: How India's HNIs Are Rewriting the Rules",   excerpt: "Younger, more globally minded, and deeply values-driven — India's next generation of luxury buyers are transforming how premium brands operate.", author: 'Meera Bose',     date: 'Apr 20, 2026', readTime: 8 },
//   { id: 6, category: 'Real Estate',    title: 'Branded Residences: The New Trophy Asset for India\'s Ultra-Rich',    excerpt: "Backed by names like Four Seasons, Ritz-Carlton, and Armani, branded residences command 30–40% premiums over comparable luxury homes.",         author: 'Vikram Nair',    date: 'Apr 18, 2026', readTime: 5 },
//   { id: 7, category: 'Watches',        title: "Patek Philippe's Nautilus: Why It Still Commands Six Figures in 2026", excerpt: "Discontinued, yet more coveted than ever. The 5711 remains the market's most enduring paradox — and the ultimate status symbol.",              author: 'Arjun Das',      date: 'Apr 16, 2026', readTime: 6 },
//   { id: 8, category: 'Cars',           title: 'The 10 Best Luxury SUVs to Buy in India Right Now',                   excerpt: "From the Bentley Bentayga to the Range Rover SV, we rank the finest ultra-premium SUVs available to Indian buyers in 2026.",                 author: 'Rohan Pillai',   date: 'Apr 14, 2026', readTime: 7 },
//   { id: 9, category: 'Global Luxury',  title: 'How the Maldives Is Reinventing Ultra-Luxury Travel for 2026',        excerpt: "Private island residences, submarine dining, and wellness retreats designed for the world's most discerning travellers.",                       author: 'Sia Malhotra',   date: 'Apr 12, 2026', readTime: 5 },
// ];

// const CAT_COLORS: Record<string, string> = {
//   'Real Estate': '#1B4D45',
//   'Cars':        '#8B6914',
//   'Watches':     '#2C4A7C',
//   'Weddings':    '#7C2C5A',
//   'Global Luxury':'#3D3D3D',
// };

// function ArticleCard({ article, big = false }: { article: typeof ARTICLES[0]; big?: boolean }) {
//   const [hov, setHov] = useState(false);
//   const accent = CAT_COLORS[article.category] ?? '#1B4D45';
//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{ background: hov ? '#0a0a0a' : '#ffffff', border: '1px solid', borderColor: hov ? 'transparent' : '#ececec', padding: big ? '40px 36px' : '32px 28px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
//     >
//       <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: hov ? 'linear-gradient(90deg,#1B4D45,#C9A84C)' : accent, transition: 'background 0.3s' }} />
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
//         <span style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.7)' : accent, fontFamily: 'sans-serif', fontWeight: 500 }}>{article.category}</span>
//         <span style={{ fontSize: 10, color: hov ? 'rgba(255,255,255,0.25)' : '#bbb', fontFamily: 'sans-serif' }}>{article.date}</span>
//       </div>
//       <h3 style={{ fontFamily: 'Georgia, serif', fontSize: big ? 'clamp(20px,2.5vw,28px)' : 18, fontWeight: 400, color: hov ? '#ffffff' : '#0a0a0a', marginBottom: 12, lineHeight: 1.4, transition: 'color 0.3s' }}>{article.title}</h3>
//       <div style={{ width: hov ? 36 : 24, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width 0.3s' }} />
//       <p style={{ fontSize: 13, lineHeight: 1.85, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.45)' : '#666', marginBottom: 20, flex: 1 }}>{article.excerpt}</p>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'sans-serif', fontWeight: 500 }}>{article.author}</span>
//         <span style={{ fontSize: 10, color: hov ? 'rgba(255,255,255,0.25)' : '#bbb', fontFamily: 'sans-serif' }}>{article.readTime} min read</span>
//       </div>
//     </div>
//   );
// }

// export default function NewsPage() {
//   const [active, setActive] = useState('All');
//   const filtered = active === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === active);
//   const [email, setEmail] = useState('');
//   const [subbed, setSubbed] = useState(false);

//   return (
//     <>
//       <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

//         {/* HERO */}
//         <section style={{ position: 'relative', background: '#0a0a0a', padding: '100px 32px 90px', overflow: 'hidden', textAlign: 'center' }}>
//           <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px)' }} />
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
//           <div style={{ position: 'relative', zIndex: 10, maxWidth: 720, margin: '0 auto' }}>
//             <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>Editorial</p>
//             <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(38px,6vw,76px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 28 }}>
//               Luxury News <em style={{ color: '#C9A84C' }}>&amp; Insights</em>
//             </h1>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
//               <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
//               <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
//               <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
//             </div>
//             <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', fontWeight: 300, fontFamily: 'sans-serif' }}>Intelligence, trends, and stories from the world of Indian luxury.</p>
//           </div>
//           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
//         </section>

//         {/* FILTERS */}
//         <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)', position: 'sticky', top: 72, zIndex: 50 }}>
//           <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
//             {FILTERS.map((f, i) => (
//               <button key={f} onClick={() => setActive(f)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '18px 22px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 500, color: active === f ? '#C9A84C' : 'rgba(255,255,255,0.3)', borderBottom: active === f ? '2px solid #C9A84C' : '2px solid transparent', borderRight: i < FILTERS.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>{f}</button>
//             ))}
//           </div>
//         </div>

//         {/* ARTICLES */}
//         <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 80px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
//             <p style={{ fontSize: 11, color: '#aaa', fontFamily: 'sans-serif' }}>
//               <span style={{ color: '#C9A84C', fontWeight: 600 }}>{filtered.length}</span> stories
//             </p>
//             <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
//           </div>

//           {/* Top featured */}
//           {active === 'All' && filtered.length > 0 && (
//             <div style={{ marginBottom: 24 }}>
//               <ArticleCard article={filtered[0]} big />
//             </div>
//           )}

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="news-grid">
//             {(active === 'All' ? filtered.slice(1) : filtered).map(a => <ArticleCard key={a.id} article={a} />)}
//           </div>
//         </section>

//         {/* NEWSLETTER CTA */}
//         <section style={{ background: '#0a0a0a', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
//           <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
//           <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
//           <div style={{ maxWidth: 520, margin: '0 auto' }}>
//             <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'sans-serif' }}>Weekly Intelligence</p>
//             <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px,4vw,44px)', fontWeight: 300, color: '#ffffff', marginBottom: 12, letterSpacing: '0.01em' }}>
//               Join India's <em style={{ color: '#C9A84C' }}>Luxury Circle</em>
//             </h2>
//             <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto 20px' }} />
//             <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 32, lineHeight: 1.8, fontFamily: 'sans-serif' }}>Curated stories, market intelligence, and exclusive insights — every Thursday.</p>
//             {subbed ? (
//               <p style={{ color: '#C9A84C', fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300 }}>Welcome to the Circle. ✦</p>
//             ) : (
//               <div style={{ display: 'flex', maxWidth: 420, margin: '0 auto' }}>
//                 <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" style={{ flex: 1, background: '#141414', border: '1px solid rgba(201,168,76,0.2)', borderRight: 'none', color: '#fff', fontSize: 13, padding: '14px 18px', outline: 'none', fontFamily: 'sans-serif' }} />
//                 <button onClick={() => email && setSubbed(true)} style={{ background: '#C9A84C', border: 'none', color: '#0a0a0a', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600, padding: '14px 24px', cursor: 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
//                   onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
//                   onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
//                 >Subscribe</button>
//               </div>
//             )}
//           </div>
//         </section>

//         <div style={{ textAlign: 'center', padding: '36px 32px 52px', borderTop: '1px solid #f0f0f0' }}>
//           <Link href="/" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif', borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3 }}>← Back to Journal</Link>
//         </div>
//       </main>

//       <style>{`
//         @media (max-width: 767px) { .news-grid { grid-template-columns: 1fr !important; } }
//         @media (min-width: 768px) and (max-width: 1023px) { .news-grid { grid-template-columns: repeat(2,1fr) !important; } }
//         input::placeholder { color: rgba(255,255,255,0.2); }
//       `}</style>
//     </>
//   );
// }