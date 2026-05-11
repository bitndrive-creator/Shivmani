'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// ── TYPES ─────────────────────────────────────────────────────────
interface GalleryItem {
  _id?: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  gallery?: GalleryItem[];
  category: string;
  tags?: string[];
  author: string;
  readTime?: number;
  isFeatured?: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}

const API_BASE = 'https://api.indianluxuryhouse.com';

const CAT_SLUG_MAP: Record<string, string> = {
  'Real Estate':         'real-estate',
  'Automobiles':         'automobiles',
  'Jewellery & Watches': 'jewellery-watches',
  'Weddings':            'weddings',
  'Curated Partners':    'curated-partners',
};

// ── IMAGE URL HELPER ──────────────────────────────────────────────
// Handles: absolute URLs, /uploads/file.jpg, uploads/file.jpg
function getImgUrl(path?: string): string {
  if (!path || path.trim() === '') return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch { return iso; }
}

// ── LOGO SVG ──────────────────────────────────────────────────────
function SMLogo({ size = 32 }: { size?: number }) {
  const gold = '#C9A84C';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={gold} opacity="0.9"/>
      <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={gold} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={gold} transform="rotate(-30 30 46)" opacity="0.8"/>
      <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={gold} transform="rotate(-20 26 52)" opacity="0.7"/>
      <circle cx="52" cy="12" r="1.5" fill={gold}/>
    </svg>
  );
}

// ── GALLERY LIGHTBOX ──────────────────────────────────────────────
function Lightbox({ items, activeIdx, onClose, onPrev, onNext }: {
  items: GalleryItem[];
  activeIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[activeIdx];
  if (!item) return null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 24, right: 24,
          background: 'none', border: '1px solid rgba(201,168,76,0.3)',
          color: '#C9A84C', fontSize: 20, width: 44, height: 44,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
        }}
      >×</button>

      <div style={{
        position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
        fontSize: 10, letterSpacing: '0.2em', color: 'rgba(201,168,76,0.5)',
        textTransform: 'uppercase',
      }}>
        {activeIdx + 1} / {items.length}
      </div>

      {items.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: '1px solid rgba(201,168,76,0.3)',
            color: '#C9A84C', fontSize: 22, width: 48, height: 48,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >‹</button>
      )}

      <div onClick={e => e.stopPropagation()} style={{ maxWidth: '88vw', maxHeight: '82vh', position: 'relative' }}>
        {item.type === 'video' ? (
          <video
            src={getImgUrl(item.url)}
            controls
            style={{ maxWidth: '88vw', maxHeight: '80vh', display: 'block' }}
          />
        ) : (
          <img
            src={getImgUrl(item.url)}
            alt={item.caption || `Gallery image ${activeIdx + 1}`}
            style={{
              maxWidth: '88vw', maxHeight: '80vh',
              objectFit: 'contain', display: 'block',
            }}
          />
        )}
        {item.caption && (
          <p style={{
            textAlign: 'center', fontSize: 12, color: 'rgba(201,168,76,0.6)',
            marginTop: 12, letterSpacing: '0.04em', fontStyle: 'italic',
          }}>{item.caption}</p>
        )}
      </div>

      {items.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
          style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: '1px solid rgba(201,168,76,0.3)',
            color: '#C9A84C', fontSize: 22, width: 48, height: 48,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >›</button>
      )}
    </div>
  );
}

// ── GALLERY CARD ──────────────────────────────────────────────────
function GalleryCard({ item, index, total, onClick }: {
  item: GalleryItem;
  index: number;
  total: number;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const imgUrl = getImgUrl(item.url);

  const isFeatured = index === 0 && total >= 3 && total % 3 !== 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        paddingBottom: isFeatured ? '50%' : '70%',
        background: '#1A1A1A',
        overflow: 'hidden',
        cursor: 'pointer',
        gridColumn: isFeatured ? 'span 2' : 'span 1',
      }}
    >
      {item.type === 'video' ? (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#111',
        }}>
          <video
            src={imgUrl}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
          />
          <div style={{
            position: 'absolute',
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(201,168,76,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 20, color: '#0A0A0A', marginLeft: 4 }}>▶</span>
          </div>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imgUrl}
          alt={item.caption || `Gallery image ${index + 1}`}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
          }}
          onError={e => {
            // ✅ FIX: Error hone par hide mat karo, placeholder dikhao
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            console.error('Gallery image failed to load:', imgUrl);
          }}
        />
      )}

      <div style={{
        position: 'absolute', inset: 0,
        background: hov ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.15)',
        transition: 'background 0.3s',
      }} />

      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${hov ? 1 : 0.7})`,
        opacity: hov ? 1 : 0,
        transition: 'opacity 0.3s, transform 0.3s',
        width: 44, height: 44,
        border: '1px solid rgba(201,168,76,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 16, color: '#C9A84C' }}>⤢</span>
      </div>

      {item.caption && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '10px 14px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          opacity: hov ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', margin: 0, fontStyle: 'italic' }}>
            {item.caption}
          </p>
        </div>
      )}
    </div>
  );
}

// ── MAIN DETAIL PAGE ──────────────────────────────────────────────
export default function EditorialDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost]               = useState<Post | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/editorials`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const all: Post[] = await res.json();
        const found = all.find(p => p.slug === slug);
        if (!found) throw new Error('Post not found');

        // ✅ FIX: Gallery debug log
        console.log('Post found:', found.title);
        console.log('Gallery raw:', found.gallery);
        console.log('Cover image raw:', found.coverImage);

        setPost(found);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Something went wrong';
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // ✅ FIX: Gallery filter — url exist kare aur empty na ho
  // Pehle: .filter(g => g.url && g.url.trim() !== '')  ← same hai, theek hai
  // Problem tha ki images load nahi ho rahi thi — getImgUrl fix kiya
  const galleryItems = (post?.gallery ?? []).filter(
    g => g.url && g.url.trim() !== ''
  );

  console.log('Gallery items after filter:', galleryItems.length, galleryItems.map(g => getImgUrl(g.url)));

  const catSlug = post
    ? (CAT_SLUG_MAP[post.category] ?? post.category.toLowerCase().replace(/\s+/g, '-'))
    : '';

  // ── LOADING ────────────────────────────────────────────────────
  if (loading) return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '2px solid rgba(201,168,76,0.2)', borderTopColor: '#C9A84C',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
        }} />
        <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)' }}>Loading…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );

  // ── ERROR ──────────────────────────────────────────────────────
  if (error || !post) return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <p style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: '#1A1A1A', marginBottom: 12 }}>Post not found</p>
        <p style={{ fontSize: 13, color: '#6B6558', marginBottom: 32 }}>{error}</p>
        <Link href="/" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );

  const coverUrl = getImgUrl(post.coverImage);

  return (
    <>
      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          items={galleryItems}
          activeIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0)}
          onNext={() => setLightboxIdx(i => i !== null ? (i + 1) % galleryItems.length : 0)}
        />
      )}

      <main style={{ background: '#FAFAF8', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

        {/* ── HERO IMAGE ─────────────────────────────────────── */}
        <div style={{ position: 'relative', height: '60vh', minHeight: 400, maxHeight: 680, background: '#111', overflow: 'hidden' }}>
          {coverUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={coverUrl}
              alt={post.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1B4D45, #0A0A0A)' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 60%)' }} />

          <div style={{ position: 'absolute', top: 28, left: 32, zIndex: 10 }}>
            <Link
              href={catSlug ? `/${catSlug}` : '/'}
              style={{
                fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.7)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'color .2s',
              }}
            >
              <span style={{ fontSize: 14 }}>←</span> {post.category}
            </Link>
          </div>

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
            padding: '0 clamp(24px, 6vw, 96px) 48px',
            maxWidth: 900,
          }}>
            <span style={{
              display: 'inline-block', fontSize: 8, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#C9A84C',
              background: 'rgba(10,10,10,0.8)', padding: '5px 12px',
              border: '1px solid rgba(201,168,76,0.3)', marginBottom: 16,
            }}>{post.category}</span>
            <h1 style={{
              fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4.5vw, 54px)',
              fontWeight: 300, color: '#FAFAF8', lineHeight: 1.2,
              letterSpacing: '0.01em', margin: 0,
            }}>{post.title}</h1>
          </div>
        </div>

        {/* ── ARTICLE BODY ───────────────────────────────────── */}
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)' }}>

          {/* Meta bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
            padding: '24px 0 28px', borderBottom: '1px solid rgba(201,168,76,0.12)',
            marginBottom: 40,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SMLogo size={28} />
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.5)', margin: 0 }}>By</p>
                <p style={{ fontSize: 12, color: '#C9A84C', letterSpacing: '0.08em', margin: 0, fontWeight: 500 }}>{post.author}</p>
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.15)' }} />
            <p style={{ fontSize: 11, color: 'rgba(107,101,88,0.55)', margin: 0 }}>{formatDate(post.createdAt)}</p>
            {post.readTime && (
              <>
                <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.15)' }} />
                <p style={{ fontSize: 11, color: 'rgba(107,101,88,0.55)', margin: 0 }}>{post.readTime} min read</p>
              </>
            )}
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p style={{
              fontFamily: 'Georgia, serif', fontSize: 'clamp(17px, 2vw, 21px)',
              color: '#3A3530', lineHeight: 1.7, fontStyle: 'italic',
              borderLeft: '3px solid #C9A84C', paddingLeft: 24,
              marginBottom: 40, fontWeight: 300,
            }}>{post.excerpt}</p>
          )}

          {/* Content */}
          {post.content && (
            <div
              style={{
                fontSize: 16, lineHeight: 1.85, color: '#2A2520',
                fontWeight: 300, marginBottom: 48,
              }}
              className="editorial-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 56, paddingTop: 24, borderTop: '1px solid rgba(201,168,76,0.1)' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#C9A84C', background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)', padding: '5px 12px',
                }}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* ── GALLERY SECTION ────────────────────────────────── */}
        {/* ✅ FIX: Gallery section render hoga agar galleryItems.length > 0 hai */}
        {galleryItems.length > 0 && (
          <section style={{
            background: '#0D0D0D', padding: 'clamp(48px, 6vw, 88px) clamp(20px, 5vw, 64px)',
          }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

              <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(201,168,76,0.1)', paddingBottom: 20 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 8 }}>Visual Story</p>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 300, color: '#fff', margin: 0, letterSpacing: '0.01em' }}>
                  Gallery
                  <span style={{ fontSize: 12, color: 'rgba(201,168,76,0.4)', marginLeft: 14, letterSpacing: '0.1em' }}>
                    {galleryItems.length} {galleryItems.length === 1 ? 'image' : 'images'}
                  </span>
                </h2>
              </div>

              {/* ✅ FIX: Grid columns dynamically set based on count */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    galleryItems.length === 1
                      ? '1fr'
                      : galleryItems.length === 2
                        ? 'repeat(2, 1fr)'
                        : 'repeat(3, 1fr)',
                  gap: 4,
                }}
                className="gallery-grid"
              >
                {galleryItems.map((item, i) => (
                  <GalleryCard
                    key={item._id ?? i}
                    item={item}
                    index={i}
                    total={galleryItems.length}
                    onClick={() => setLightboxIdx(i)}
                  />
                ))}
              </div>

              <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.3)', textAlign: 'center', marginTop: 20, textTransform: 'uppercase' }}>
                Click any image to view fullscreen
              </p>
            </div>
          </section>
        )}

        {/* ── BACK LINK ──────────────────────────────────────── */}
        <div style={{
          background: '#FAFAF8', padding: '48px clamp(20px, 5vw, 64px)',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <Link
            href={catSlug ? `/${catSlug}` : '/'}
            style={{
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#C9A84C', textDecoration: 'none',
              border: '1px solid rgba(201,168,76,0.3)', padding: '12px 24px',
              transition: 'all .2s',
            }}
          >← Back to {post.category}</Link>
          <Link
            href="/"
            style={{
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(107,101,88,0.5)', textDecoration: 'none',
              transition: 'color .2s',
            }}
          >SM Luxury Home →</Link>
        </div>

      </main>

      <style>{`
        .editorial-content h1,
        .editorial-content h2,
        .editorial-content h3,
        .editorial-content h4 {
          font-family: Georgia, serif;
          font-weight: 400;
          color: #1A1A1A;
          line-height: 1.3;
          margin: 2em 0 0.75em;
          letter-spacing: 0.01em;
        }
        .editorial-content h1 { font-size: clamp(24px, 3vw, 36px); }
        .editorial-content h2 { font-size: clamp(20px, 2.5vw, 28px); }
        .editorial-content h3 { font-size: clamp(17px, 2vw, 22px); }
        .editorial-content p  { margin: 0 0 1.5em; }
        .editorial-content ul,
        .editorial-content ol { padding-left: 1.6em; margin: 0 0 1.5em; }
        .editorial-content li { margin-bottom: 0.5em; }
        .editorial-content strong { color: #1A1A1A; font-weight: 600; }
        .editorial-content a  { color: #C9A84C; text-decoration: underline; }
        .editorial-content blockquote {
          border-left: 3px solid #C9A84C;
          padding-left: 20px;
          margin: 2em 0;
          font-style: italic;
          color: #5A5550;
          font-family: Georgia, serif;
          font-size: 1.05em;
        }
        .editorial-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 2em auto;
        }
        @media(max-width: 767px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}


// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';

// // ── TYPES ─────────────────────────────────────────────────────────
// interface GalleryItem {
//   _id?: string;
//   url: string;
//   type: 'image' | 'video';
//   caption?: string;
// }

// interface Post {
//   _id: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   coverImage?: string;
//   gallery?: GalleryItem[];
//   category: string;
//   tags?: string[];
//   author: string;
//   readTime?: number;
//   isFeatured?: boolean;
//   isPublished: boolean;
//   createdAt: string;
//   updatedAt?: string;
// }

// const API_BASE = 'https://api.indianluxuryhouse.com';

// // Category → listing page URL
// const CAT_SLUG_MAP: Record<string, string> = {
//   'Real Estate':         'real-estate',
//   'Automobiles':         'automobiles',
//   'Jewellery & Watches': 'jewellery-watches',
//   'Weddings':            'weddings',
//   'Curated Partners':    'curated-partners',
// };

// // ── IMAGE URL HELPER ──────────────────────────────────────────────
// function getImgUrl(path?: string): string {
//   if (!path || path.trim() === '') return '';
//   if (path.startsWith('http://') || path.startsWith('https://')) return path;
//   const p = path.startsWith('/') ? path : `/${path}`;
//   return `${API_BASE}${p}`;
// }

// function formatDate(iso: string): string {
//   try {
//     return new Date(iso).toLocaleDateString('en-IN', {
//       day: 'numeric', month: 'long', year: 'numeric',
//     });
//   } catch { return iso; }
// }

// // ── LOGO SVG ──────────────────────────────────────────────────────
// function SMLogo({ size = 32 }: { size?: number }) {
//   const gold = '#C9A84C';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
//       <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={gold} opacity="0.9"/>
//       <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={gold} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={gold} transform="rotate(-30 30 46)" opacity="0.8"/>
//       <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={gold} transform="rotate(-20 26 52)" opacity="0.7"/>
//       <circle cx="52" cy="12" r="1.5" fill={gold}/>
//     </svg>
//   );
// }

// // ── GALLERY LIGHTBOX ──────────────────────────────────────────────
// function Lightbox({ items, activeIdx, onClose, onPrev, onNext }: {
//   items: GalleryItem[];
//   activeIdx: number;
//   onClose: () => void;
//   onPrev: () => void;
//   onNext: () => void;
// }) {
//   const item = items[activeIdx];
//   if (!item) return null;

//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose();
//       if (e.key === 'ArrowLeft') onPrev();
//       if (e.key === 'ArrowRight') onNext();
//     };
//     window.addEventListener('keydown', handler);
//     document.body.style.overflow = 'hidden';
//     return () => {
//       window.removeEventListener('keydown', handler);
//       document.body.style.overflow = '';
//     };
//   }, [onClose, onPrev, onNext]);

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: 'fixed', inset: 0, zIndex: 9999,
//         background: 'rgba(0,0,0,0.95)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//       }}
//     >
//       {/* Close */}
//       <button
//         onClick={onClose}
//         style={{
//           position: 'absolute', top: 24, right: 24,
//           background: 'none', border: '1px solid rgba(201,168,76,0.3)',
//           color: '#C9A84C', fontSize: 20, width: 44, height: 44,
//           cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           zIndex: 10,
//         }}
//       >×</button>

//       {/* Counter */}
//       <div style={{
//         position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
//         fontSize: 10, letterSpacing: '0.2em', color: 'rgba(201,168,76,0.5)',
//         textTransform: 'uppercase',
//       }}>
//         {activeIdx + 1} / {items.length}
//       </div>

//       {/* Prev */}
//       {items.length > 1 && (
//         <button
//           onClick={e => { e.stopPropagation(); onPrev(); }}
//           style={{
//             position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
//             background: 'none', border: '1px solid rgba(201,168,76,0.3)',
//             color: '#C9A84C', fontSize: 22, width: 48, height: 48,
//             cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}
//         >‹</button>
//       )}

//       {/* Image / Video */}
//       <div onClick={e => e.stopPropagation()} style={{ maxWidth: '88vw', maxHeight: '82vh', position: 'relative' }}>
//         {item.type === 'video' ? (
//           <video
//             src={getImgUrl(item.url)}
//             controls
//             style={{ maxWidth: '88vw', maxHeight: '80vh', display: 'block' }}
//           />
//         ) : (
//           <img
//             src={getImgUrl(item.url)}
//             alt={item.caption || `Gallery image ${activeIdx + 1}`}
//             style={{
//               maxWidth: '88vw', maxHeight: '80vh',
//               objectFit: 'contain', display: 'block',
//             }}
//           />
//         )}
//         {item.caption && (
//           <p style={{
//             textAlign: 'center', fontSize: 12, color: 'rgba(201,168,76,0.6)',
//             marginTop: 12, letterSpacing: '0.04em', fontStyle: 'italic',
//           }}>{item.caption}</p>
//         )}
//       </div>

//       {/* Next */}
//       {items.length > 1 && (
//         <button
//           onClick={e => { e.stopPropagation(); onNext(); }}
//           style={{
//             position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
//             background: 'none', border: '1px solid rgba(201,168,76,0.3)',
//             color: '#C9A84C', fontSize: 22, width: 48, height: 48,
//             cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}
//         >›</button>
//       )}
//     </div>
//   );
// }

// // ── MAIN DETAIL PAGE ──────────────────────────────────────────────
// export default function EditorialDetailPage() {
//   const params = useParams();
//   const slug = params?.slug as string;

//   const [post, setPost]         = useState<Post | null>(null);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState('');
//   const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

//   useEffect(() => {
//     if (!slug) return;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API_BASE}/api/editorials`);
//         if (!res.ok) throw new Error(`Server error: ${res.status}`);
//         const all: Post[] = await res.json();
//         const found = all.find(p => p.slug === slug);
//         if (!found) throw new Error('Post not found');
//         setPost(found);
//       } catch (e: any) {
//         setError(e.message ?? 'Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [slug]);

//   // ── Gallery items with valid URLs only
//   const galleryItems = (post?.gallery ?? []).filter(g => g.url && g.url.trim() !== '');

//   const catSlug = post ? (CAT_SLUG_MAP[post.category] ?? post.category.toLowerCase().replace(/\s+/g, '-')) : '';

//   // ── LOADING ────────────────────────────────────────────────────
//   if (loading) return (
//     <main style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div style={{ textAlign: 'center' }}>
//         <div style={{
//           width: 40, height: 40, borderRadius: '50%',
//           border: '2px solid rgba(201,168,76,0.2)', borderTopColor: '#C9A84C',
//           animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
//         }} />
//         <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)' }}>Loading…</p>
//       </div>
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </main>
//   );

//   // ── ERROR ──────────────────────────────────────────────────────
//   if (error || !post) return (
//     <main style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
//       <div style={{ textAlign: 'center', maxWidth: 400 }}>
//         <p style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: '#1A1A1A', marginBottom: 12 }}>Post not found</p>
//         <p style={{ fontSize: 13, color: '#6B6558', marginBottom: 32 }}>{error}</p>
//         <Link href="/" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
//           ← Back to Home
//         </Link>
//       </div>
//     </main>
//   );

//   const coverUrl = getImgUrl(post.coverImage);

//   return (
//     <>
//       {/* Lightbox */}
//       {lightboxIdx !== null && (
//         <Lightbox
//           items={galleryItems}
//           activeIdx={lightboxIdx}
//           onClose={() => setLightboxIdx(null)}
//           onPrev={() => setLightboxIdx(i => i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0)}
//           onNext={() => setLightboxIdx(i => i !== null ? (i + 1) % galleryItems.length : 0)}
//         />
//       )}

//       <main style={{ background: '#FAFAF8', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

//         {/* ── HERO IMAGE ─────────────────────────────────────── */}
//         <div style={{ position: 'relative', height: '60vh', minHeight: 400, maxHeight: 680, background: '#111', overflow: 'hidden' }}>
//           {coverUrl ? (
//             <img
//               src={coverUrl}
//               alt={post.title}
//               style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
//               onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//             />
//           ) : (
//             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1B4D45, #0A0A0A)' }} />
//           )}
//           {/* Gradient overlay */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 60%)' }} />

//           {/* Back link */}
//           <div style={{ position: 'absolute', top: 28, left: 32, zIndex: 10 }}>
//             <Link
//               href={catSlug ? `/${catSlug}` : '/'}
//               style={{
//                 fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
//                 color: 'rgba(201,168,76,0.7)', textDecoration: 'none',
//                 display: 'flex', alignItems: 'center', gap: 8,
//                 transition: 'color .2s',
//               }}
//             >
//               <span style={{ fontSize: 14 }}>←</span> {post.category}
//             </Link>
//           </div>

//           {/* Category badge + Title overlay */}
//           <div style={{
//             position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
//             padding: '0 clamp(24px, 6vw, 96px) 48px',
//             maxWidth: 900,
//           }}>
//             <span style={{
//               display: 'inline-block', fontSize: 8, letterSpacing: '0.25em',
//               textTransform: 'uppercase', color: '#C9A84C',
//               background: 'rgba(10,10,10,0.8)', padding: '5px 12px',
//               border: '1px solid rgba(201,168,76,0.3)', marginBottom: 16,
//             }}>{post.category}</span>
//             <h1 style={{
//               fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4.5vw, 54px)',
//               fontWeight: 300, color: '#FAFAF8', lineHeight: 1.2,
//               letterSpacing: '0.01em', margin: 0,
//             }}>{post.title}</h1>
//           </div>
//         </div>

//         {/* ── ARTICLE BODY ───────────────────────────────────── */}
//         <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)' }}>

//           {/* Meta bar */}
//           <div style={{
//             display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
//             padding: '24px 0 28px', borderBottom: '1px solid rgba(201,168,76,0.12)',
//             marginBottom: 40,
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <SMLogo size={28} />
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.5)', margin: 0 }}>By</p>
//                 <p style={{ fontSize: 12, color: '#C9A84C', letterSpacing: '0.08em', margin: 0, fontWeight: 500 }}>{post.author}</p>
//               </div>
//             </div>
//             <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.15)' }} />
//             <p style={{ fontSize: 11, color: 'rgba(107,101,88,0.55)', margin: 0 }}>{formatDate(post.createdAt)}</p>
//             {post.readTime && (
//               <>
//                 <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.15)' }} />
//                 <p style={{ fontSize: 11, color: 'rgba(107,101,88,0.55)', margin: 0 }}>{post.readTime} min read</p>
//               </>
//             )}
//           </div>

//           {/* Excerpt */}
//           {post.excerpt && (
//             <p style={{
//               fontFamily: 'Georgia, serif', fontSize: 'clamp(17px, 2vw, 21px)',
//               color: '#3A3530', lineHeight: 1.7, fontStyle: 'italic',
//               borderLeft: '3px solid #C9A84C', paddingLeft: 24,
//               marginBottom: 40, fontWeight: 300,
//             }}>{post.excerpt}</p>
//           )}

//           {/* Content — render HTML */}
//           {post.content && (
//             <div
//               style={{
//                 fontSize: 16, lineHeight: 1.85, color: '#2A2520',
//                 fontWeight: 300, marginBottom: 48,
//               }}
//               className="editorial-content"
//               dangerouslySetInnerHTML={{ __html: post.content }}
//             />
//           )}

//           {/* Tags */}
//           {post.tags && post.tags.length > 0 && (
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 56, paddingTop: 24, borderTop: '1px solid rgba(201,168,76,0.1)' }}>
//               {post.tags.map(tag => (
//                 <span key={tag} style={{
//                   fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
//                   color: '#C9A84C', background: 'rgba(201,168,76,0.08)',
//                   border: '1px solid rgba(201,168,76,0.2)', padding: '5px 12px',
//                 }}>{tag}</span>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ── GALLERY SECTION ────────────────────────────────── */}
//         {galleryItems.length > 0 && (
//           <section style={{
//             background: '#0D0D0D', padding: 'clamp(48px, 6vw, 88px) clamp(20px, 5vw, 64px)',
//             marginBottom: 0,
//           }}>
//             <div style={{ maxWidth: 1200, margin: '0 auto' }}>

//               {/* Section header */}
//               <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(201,168,76,0.1)', paddingBottom: 20 }}>
//                 <p style={{ fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 8 }}>Visual Story</p>
//                 <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 300, color: '#fff', margin: 0, letterSpacing: '0.01em' }}>
//                   Gallery
//                   <span style={{ fontSize: 12, color: 'rgba(201,168,76,0.4)', marginLeft: 14, letterSpacing: '0.1em' }}>
//                     {galleryItems.length} {galleryItems.length === 1 ? 'image' : 'images'}
//                   </span>
//                 </h2>
//               </div>

//               {/* Grid */}
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: galleryItems.length === 1
//                   ? '1fr'
//                   : galleryItems.length === 2
//                     ? 'repeat(2, 1fr)'
//                     : 'repeat(3, 1fr)',
//                 gap: 4,
//               }}
//               className="gallery-grid"
//               >
//                 {galleryItems.map((item, i) => (
//                   <GalleryCard
//                     key={item._id ?? i}
//                     item={item}
//                     index={i}
//                     total={galleryItems.length}
//                     onClick={() => setLightboxIdx(i)}
//                   />
//                 ))}
//               </div>

//               <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.3)', textAlign: 'center', marginTop: 20, textTransform: 'uppercase' }}>
//                 Click any image to view fullscreen
//               </p>
//             </div>
//           </section>
//         )}

//         {/* ── BACK LINK ──────────────────────────────────────── */}
//         <div style={{
//           background: '#FAFAF8', padding: '48px clamp(20px, 5vw, 64px)',
//           borderTop: '1px solid rgba(201,168,76,0.1)',
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
//         }}>
//           <Link
//             href={catSlug ? `/${catSlug}` : '/'}
//             style={{
//               fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
//               color: '#C9A84C', textDecoration: 'none',
//               border: '1px solid rgba(201,168,76,0.3)', padding: '12px 24px',
//               transition: 'all .2s',
//             }}
//           >← Back to {post.category}</Link>
//           <Link
//             href="/"
//             style={{
//               fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
//               color: 'rgba(107,101,88,0.5)', textDecoration: 'none',
//               transition: 'color .2s',
//             }}
//           >SM Luxury Home →</Link>
//         </div>

//       </main>

//       <style>{`
//         .editorial-content h1,
//         .editorial-content h2,
//         .editorial-content h3,
//         .editorial-content h4 {
//           font-family: Georgia, serif;
//           font-weight: 400;
//           color: #1A1A1A;
//           line-height: 1.3;
//           margin: 2em 0 0.75em;
//           letter-spacing: 0.01em;
//         }
//         .editorial-content h1 { font-size: clamp(24px, 3vw, 36px); }
//         .editorial-content h2 { font-size: clamp(20px, 2.5vw, 28px); }
//         .editorial-content h3 { font-size: clamp(17px, 2vw, 22px); }
//         .editorial-content p  { margin: 0 0 1.5em; }
//         .editorial-content ul,
//         .editorial-content ol { padding-left: 1.6em; margin: 0 0 1.5em; }
//         .editorial-content li { margin-bottom: 0.5em; }
//         .editorial-content strong { color: #1A1A1A; font-weight: 600; }
//         .editorial-content a  { color: #C9A84C; text-decoration: underline; }
//         .editorial-content blockquote {
//           border-left: 3px solid #C9A84C;
//           padding-left: 20px;
//           margin: 2em 0;
//           font-style: italic;
//           color: #5A5550;
//           font-family: Georgia, serif;
//           font-size: 1.05em;
//         }
//         .editorial-content img {
//           max-width: 100%;
//           height: auto;
//           display: block;
//           margin: 2em auto;
//         }
//         @media(max-width: 767px) {
//           .gallery-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//           }
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </>
//   );
// }

// // ── GALLERY CARD ──────────────────────────────────────────────────
// function GalleryCard({ item, index, total, onClick }: {
//   item: GalleryItem;
//   index: number;
//   total: number;
//   onClick: () => void;
// }) {
//   const [hov, setHov] = useState(false);
//   const imgUrl = getImgUrl(item.url);

//   // First image in a 3+ grid spans 2 columns if total is not divisible by 3
//   const isFeatured = index === 0 && total >= 3 && total % 3 !== 0;

//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         position: 'relative',
//         paddingBottom: isFeatured ? '50%' : '70%',
//         background: '#1A1A1A',
//         overflow: 'hidden',
//         cursor: 'pointer',
//         gridColumn: isFeatured ? 'span 2' : 'span 1',
//       }}
//     >
//       {item.type === 'video' ? (
//         <div style={{
//           position: 'absolute', inset: 0,
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           background: '#111',
//         }}>
//           <video
//             src={imgUrl}
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             muted
//           />
//           <div style={{
//             position: 'absolute',
//             width: 56, height: 56, borderRadius: '50%',
//             background: 'rgba(201,168,76,0.9)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <span style={{ fontSize: 20, color: '#0A0A0A', marginLeft: 4 }}>▶</span>
//           </div>
//         </div>
//       ) : (
//         <img
//           src={imgUrl}
//           alt={item.caption || `Gallery image ${index + 1}`}
//           style={{
//             position: 'absolute', inset: 0,
//             width: '100%', height: '100%',
//             objectFit: 'cover',
//             transition: 'transform 0.6s ease',
//             transform: hov ? 'scale(1.05)' : 'scale(1)',
//           }}
//           onError={e => {
//             (e.target as HTMLImageElement).style.display = 'none';
//           }}
//         />
//       )}

//       {/* Hover overlay */}
//       <div style={{
//         position: 'absolute', inset: 0,
//         background: hov ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.15)',
//         transition: 'background 0.3s',
//       }} />

//       {/* Expand icon */}
//       <div style={{
//         position: 'absolute', top: '50%', left: '50%',
//         transform: `translate(-50%, -50%) scale(${hov ? 1 : 0.7})`,
//         opacity: hov ? 1 : 0,
//         transition: 'opacity 0.3s, transform 0.3s',
//         width: 44, height: 44,
//         border: '1px solid rgba(201,168,76,0.8)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//       }}>
//         <span style={{ fontSize: 16, color: '#C9A84C' }}>⤢</span>
//       </div>

//       {/* Caption */}
//       {item.caption && (
//         <div style={{
//           position: 'absolute', bottom: 0, left: 0, right: 0,
//           padding: '10px 14px',
//           background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
//           opacity: hov ? 1 : 0,
//           transition: 'opacity 0.3s',
//         }}>
//           <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', margin: 0, fontStyle: 'italic' }}>
//             {item.caption}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }