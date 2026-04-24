'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// ── CATEGORIES — yahan sirf ek jagah change karo ──────────────
// Agar naam badalna ho ya naya add karna ho, BAS YAHAN karo.
// Sab pages (home, category, blog) automatically update ho jayenge.
export const NAV_CATEGORIES = [
  { name: 'Cars',         slug: 'cars'       },
  { name: 'Yachts',       slug: 'yachts'     },
  { name: 'Watches',      slug: 'watches'    },
  { name: 'Style',        slug: 'style'      },
  { name: 'Home',         slug: 'home'       },
  { name: 'Food & Drink', slug: 'food-drink' },
  { name: 'Travel',       slug: 'travel'     },
];

// ── SM LOGO SVG ───────────────────────────────────────────────
function SMLogo({ size = 38 }: { size?: number }) {
  const g = '#C9A84C';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-label="SM Luxury">
      <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={g} opacity="0.9"/>
      <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={g} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M42 36C48 26 58 16 66 16C70 16 70 26 62 32C56 37 44 38 44 38" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={g} transform="rotate(-30 30 46)" opacity="0.8"/>
      <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={g} transform="rotate(-20 26 52)" opacity="0.7"/>
      <ellipse cx="28" cy="40" rx="4.5" ry="2"  fill={g} transform="rotate(-45 28 40)" opacity="0.7"/>
      <circle cx="52" cy="12" r="1.5" fill={g}/>
      <circle cx="56" cy="10" r="1.2" fill={g} opacity="0.8"/>
    </svg>
  );
}

// ── NAVBAR COMPONENT ─────────────────────────────────────────
// Props:
//   activeSlug — current category slug (e.g. "cars"), highlights that link
//                pass "" or undefined on homepage / blog pages
export default function Navbar({ activeSlug = '' }: { activeSlug?: string }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header style={{
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         100,
        background:     scrolled ? '#1B4D45' : 'rgba(27,77,69,0.96)',
        backdropFilter: 'blur(10px)',
        transition:     'background 0.4s ease',
        boxShadow:      scrolled ? '0 2px 20px rgba(0,0,0,0.25)' : 'none',
      }}>
        {/* Top gold shimmer line */}
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.55 }} />

        <div style={{
          maxWidth:       1280,
          margin:         '0 auto',
          padding:        '0 32px',
          height:         72,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', flexShrink:0 }}>
            <SMLogo size={40} />
            <div style={{ lineHeight:1 }}>
              <div style={{ fontFamily:'Georgia,serif', fontSize:22, fontWeight:300, color:'#DFC27A', letterSpacing:'0.25em' }}>INDIAN</div>
              <div style={{ fontSize:9, color:'rgba(201,168,76,0.5)', letterSpacing:'0.35em', textTransform:'uppercase', marginTop:3 }}>Luxury House</div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="smn-desktop" style={{ display:'flex', alignItems:'center', gap:2 }}>
            {NAV_CATEGORIES.map(c => {
              const isActive = c.slug === activeSlug;
              return (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  style={{
                    fontSize:       10,
                    letterSpacing:  '0.16em',
                    textTransform:  'uppercase',
                    color:          isActive ? '#DFC27A' : 'rgba(201,168,76,0.65)',
                    textDecoration: 'none',
                    padding:        '8px 14px',
                    borderBottom:   isActive ? '1px solid #C9A84C' : '1px solid transparent',
                    fontWeight:     isActive ? 500 : 400,
                    transition:     'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#DFC27A';
                      e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.4)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(201,168,76,0.65)';
                      e.currentTarget.style.borderBottomColor = 'transparent';
                    }
                  }}
                >
                  {c.name}
                </Link>
              );
            })}
          </nav>

          {/* ── Hamburger (mobile only) ── */}
          <button
            className="smn-mobile"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            style={{ background:'none', border:'none', color:'#C9A84C', cursor:'pointer', padding:8 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen
                ? <path d="M18 6 6 18M6 6l12 12"/>
                : <><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        <div style={{
          background:  '#163D37',
          overflow:    'hidden',
          maxHeight:   menuOpen ? 500 : 0,
          transition:  'max-height 0.35s ease',
          borderTop:   '1px solid rgba(201,168,76,0.1)',
        }}>
          {NAV_CATEGORIES.map(c => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display:       'flex',
                alignItems:    'center',
                gap:           14,
                padding:       '14px 28px',
                fontSize:      11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         c.slug === activeSlug ? '#DFC27A' : 'rgba(201,168,76,0.7)',
                textDecoration:'none',
                borderBottom:  '1px solid rgba(201,168,76,0.08)',
                transition:    'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Bottom gold shimmer line */}
        <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)' }} />
      </header>

      {/* Responsive visibility */}
      <style>{`
        .smn-desktop { display: flex  !important; }
        .smn-mobile  { display: none  !important; }
        @media (max-width: 1024px) {
          .smn-desktop { display: none  !important; }
          .smn-mobile  { display: flex  !important; }
        }
      `}</style>
    </>
  );
}