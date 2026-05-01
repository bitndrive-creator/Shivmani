'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          background: '#0a0a0a',
          padding: '100px 32px 90px',
          overflow: 'hidden',
          textAlign: 'center',
        }}>
          {/* Subtle gold grid pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px), repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px)',
          }} />

          {/* Top gold line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto' }}>
            <p style={{
              fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase',
              color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif',
            }}>Our Story</p>

            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(38px, 6vw, 78px)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              marginBottom: 32,
            }}>
              About <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Indian Luxury House</em>
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.4)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.4)' }} />
            </div>

            <p style={{
              fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif',
            }}>
              Where India Meets Global Luxury
            </p>
          </div>

          {/* Bottom gold line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)' }} />
        </section>

        {/* ══ MISSION ═══════════════════════════════════════════ */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '88px 32px 72px' }}>

          {/* Intro */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, marginBottom: 80, alignItems: 'start',
          }} className="about-intro">
            <div>
              <div style={{ width: 40, height: 1, background: '#C9A84C', marginBottom: 20 }} />
              <p style={{
                fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase',
                color: '#C9A84C', fontFamily: 'sans-serif',
              }}>Who We Are</p>
            </div>
            <div>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(18px, 2.2vw, 23px)',
                fontWeight: 300,
                color: '#0a0a0a',
                lineHeight: 1.85,
                marginBottom: 24,
              }}>
                Indian Luxury House was created to celebrate, connect, and elevate the world of luxury through an India-first lens.
              </p>
              <p style={{
                fontSize: 15, lineHeight: 1.9, color: '#555', fontWeight: 300,
                fontFamily: 'sans-serif',
              }}>
                From iconic residences to fine craftsmanship, from elite mobility to unforgettable celebrations, we curate a refined ecosystem where aspiration meets opportunity.
              </p>
            </div>
          </div>

          {/* Mission block */}
          <div style={{
            background: '#0a0a0a',
            padding: '64px 56px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 80,
          }}>
            {/* Emerald accent bar left */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#1B4D45' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>Our Mission</p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(24px, 3.5vw, 42px)',
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1.4,
                letterSpacing: '0.01em',
              }}>
                "Where India Meets <em style={{ color: '#C9A84C' }}>Global Luxury.</em>"
              </p>
            </div>
          </div>

          {/* 3 Pillars */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }} className="about-pillars">
            {[
              { num: '01', title: 'Curate',  desc: 'We handpick the finest in luxury — from iconic residences to rare craftsmanship, every feature is deliberate.' },
              { num: '02', title: 'Connect', desc: "Bridging India's elite with global luxury brands, partners, and opportunities that matter." },
              { num: '03', title: 'Elevate', desc: 'Raising the standard of luxury conversation through an India-first editorial lens and rigorous curation.' },
            ].map(p => (
              <div key={p.title} style={{
                border: '1px solid #e8e8e8',
                padding: '40px 28px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Emerald top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#1B4D45' }} />
                <p style={{
                  fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 300,
                  color: '#f0f0f0', marginBottom: 16, lineHeight: 1,
                }}>{p.num}</p>
                <div style={{ width: 28, height: 1, background: '#C9A84C', marginBottom: 16 }} />
                <h3 style={{
                  fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 400,
                  color: '#0a0a0a', marginBottom: 14, letterSpacing: '0.03em',
                }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CONTACT ═══════════════════════════════════════════ */}
        <section style={{
          background: '#0a0a0a',
          padding: '80px 32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />

          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'sans-serif' }}>Partnerships</p>
            <h2 style={{
              fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 300, color: '#ffffff', marginBottom: 20, letterSpacing: '0.01em',
            }}>Get in Touch</h2>
            <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto 28px' }} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 36, lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif' }}>
              Interested in partnering with Indian Luxury House? We'd love to hear from you.
            </p>
            <a
              href="mailto:hello@indianluxuryhouse.com"
              style={{
                display: 'inline-block',
                fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#C9A84C', fontFamily: 'sans-serif',
                border: '1px solid rgba(201,168,76,0.4)',
                padding: '16px 36px',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#0a0a0a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
            >
              hello@indianluxuryhouse.com
            </a>
          </div>
        </section>

        {/* Back to home */}
        <div style={{ textAlign: 'center', padding: '40px 32px', background: '#ffffff', borderTop: '1px solid #f0f0f0' }}>
          <Link href="/"
            style={{
              fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif',
              borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3,
            }}
          >← Back to Journal</Link>
        </div>

      </main>

      <style>{`
        @media (max-width: 767px) {
          .about-intro    { grid-template-columns: 1fr !important; gap: 24px !important; }
          .about-pillars  { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-pillars  { grid-template-columns: repeat(2, 1fr) !important; }
          .about-intro    { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  );
}