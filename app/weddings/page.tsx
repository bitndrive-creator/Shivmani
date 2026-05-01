'use client';

import { useState } from 'react';
import Link from 'next/link';

// ── DATA ──────────────────────────────────────────────────────
const DESIGNERS = [
  { name: 'Sabyasachi Mukherjee', city: 'Kolkata', specialty: 'Bridal Couture',       desc: 'The definitive name in Indian bridal fashion — heritage textiles, royal embroidery, timeless silhouettes.' },
  { name: 'Manish Malhotra',      city: 'Mumbai',  specialty: 'Luxury Lehengas',       desc: 'Bollywood's most beloved couturier, crafting opulent bridal wear that defines modern Indian glamour.' },
  { name: 'Tarun Tahiliani',      city: 'Delhi',   specialty: 'Fusion Bridal',         desc: 'Master of East-meets-West bridal design, celebrated for ethereal drapes and exquisite handcraftsmanship.' },
  { name: 'Abu Jani Sandeep Khosla', city: 'Mumbai', specialty: 'Heritage Couture',   desc: 'Legendary designers to India\'s royalty and cinema icons — unmatched in heritage embroidery and zardozi.' },
];

const PLANNERS = [
  { name: 'Shaadi Squad',        city: 'Delhi',   specialty: 'Destination Weddings',   desc: 'India\'s premier destination wedding architects, orchestrating flawless celebrations across the world.' },
  { name: 'Wizcraft Weddings',   city: 'Mumbai',  specialty: 'Grand Celebrations',     desc: 'Three decades of crafting India\'s most spectacular luxury wedding productions and live experiences.' },
  { name: 'The Wedding Design Co', city: 'Jaipur', specialty: 'Palace Weddings',       desc: 'Specialists in Rajasthan\'s iconic palace wedding experiences — curated for the truly discerning.' },
];

const VENUES = [
  { name: 'Umaid Bhawan Palace',  city: 'Jodhpur',   specialty: 'Royal Palace',       desc: 'One of the world\'s largest private residences, offering an unparalleled setting for royal celebrations.' },
  { name: 'The Leela Palace',     city: 'Udaipur',   specialty: 'Lake Palace',        desc: 'Floating on the serene Pichola Lake — a dreamlike backdrop for India\'s most exclusive weddings.' },
  { name: 'Taj Falaknuma Palace', city: 'Hyderabad', specialty: 'Nizam Heritage',     desc: 'The former palace of the Nizam — an awe-inspiring venue steeped in grandeur, history, and luxury.' },
  { name: 'Oberoi Amarvilas',     city: 'Agra',      specialty: 'Taj Backdrop',       desc: 'Exchange vows with the Taj Mahal as your backdrop — an irreplaceable, once-in-a-lifetime experience.' },
];

const BEAUTY = [
  { name: 'Mickey Contractor',   city: 'Mumbai',   specialty: 'Bridal Makeup',        desc: 'India\'s most sought-after bridal makeup artist — the choice of Bollywood\'s biggest stars for three decades.' },
  { name: 'Ambika Pillai',       city: 'Delhi',    specialty: 'Hair & Makeup',         desc: 'Celebrity stylist and bridal beauty expert with an unrivalled portfolio across Indian cinema and fashion.' },
  { name: 'Forest Essentials',   city: 'Pan-India', specialty: 'Luxury Skincare',     desc: 'Ayurvedic luxury bridal skincare rituals crafted from the finest botanical ingredients across India.' },
];

const EDITORIAL = [
  { tag: 'Destination Weddings', title: 'The Rise of the Indian Destination Wedding: From Rajasthan to the Riviera', excerpt: 'How India\'s luxury couples are rewriting the wedding rulebook — exchanging vows on private islands, European châteaux, and Himalayan retreats.', readTime: 8 },
  { tag: 'Bridal Fashion',       title: 'Luxury Bridal Looks of the Season: Sabyasachi to Tarun Tahiliani',         excerpt: 'Our editors curate the most extraordinary bridal ensembles of 2026 — from heirloom zardozi to contemporary minimalist couture.',               readTime: 6 },
  { tag: 'Venues',               title: 'India\'s 10 Most Spectacular Wedding Venues for 2026',                       excerpt: 'Palace courtyards, lakeside terraces, and private island resorts — the venues that turn a wedding into a legend.',                          readTime: 7 },
];

// ── SECTION HEADER ────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: 48, borderBottom: '1px solid #f0f0f0', paddingBottom: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10, fontFamily: 'sans-serif' }}>{label}</p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 300, color: '#0a0a0a', letterSpacing: '0.01em' }}>{title}</h2>
      </div>
      <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)', flexShrink: 0 }} />
    </div>
  );
}

// ── LISTING CARD ──────────────────────────────────────────────
function ListingCard({ item }: { item: { name: string; city: string; specialty: string; desc: string } }) {
  const [hov, setHov] = useState(false);
  const initials = item.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('');
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#0a0a0a' : '#ffffff',
        border: '1px solid', borderColor: hov ? 'transparent' : '#ececec',
        padding: '32px 28px 24px', position: 'relative',
        overflow: 'hidden', transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: hov ? 'linear-gradient(90deg,#1B4D45,#C9A84C)' : '#1B4D45', transition: 'background 0.3s' }} />

      {/* Initials logo */}
      <div style={{ width: 48, height: 48, background: hov ? 'rgba(201,168,76,0.1)' : '#f5f5f5', border: `1px solid ${hov ? 'rgba(201,168,76,0.3)' : '#e8e8e8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, transition: 'all 0.3s' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 300, color: hov ? '#C9A84C' : '#999' }}>{initials}</span>
      </div>

      <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.6)' : '#1B4D45', fontFamily: 'sans-serif', marginBottom: 8, transition: 'color 0.3s' }}>{item.specialty}</p>
      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 400, color: hov ? '#ffffff' : '#0a0a0a', marginBottom: 10, lineHeight: 1.3, transition: 'color 0.3s' }}>{item.name}</h3>
      <div style={{ width: hov ? 32 : 20, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width 0.3s' }} />
      <p style={{ fontSize: 13, lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.5)' : '#666', marginBottom: 20, flex: 1, transition: 'color 0.3s' }}>{item.desc}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.4)' : '#aaa', fontFamily: 'sans-serif', transition: 'color 0.3s' }}>📍 {item.city}</span>
        <a href="/partner" style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: hov ? '#0a0a0a' : '#1B4D45', background: hov ? '#C9A84C' : 'transparent', border: `1px solid ${hov ? '#C9A84C' : 'rgba(27,77,69,0.35)'}`, padding: '7px 14px', textDecoration: 'none', fontFamily: 'sans-serif', transition: 'all 0.25s', fontWeight: 500 }}>Inquire →</a>
      </div>
    </div>
  );
}

// ── EDITORIAL CARD ────────────────────────────────────────────
function EditorialCard({ item }: { item: typeof EDITORIAL[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? '#0a0a0a' : '#ffffff', border: '1px solid', borderColor: hov ? 'transparent' : '#ececec', padding: '36px 32px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: hov ? 'linear-gradient(90deg,#1B4D45,#C9A84C)' : '#C9A84C', transition: 'background 0.3s' }} />
      <p style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'sans-serif', marginBottom: 14 }}>{item.tag}</p>
      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 400, color: hov ? '#ffffff' : '#0a0a0a', marginBottom: 12, lineHeight: 1.4, transition: 'color 0.3s' }}>{item.title}</h3>
      <div style={{ width: hov ? 36 : 24, height: 1, background: '#C9A84C', marginBottom: 14, transition: 'width 0.3s' }} />
      <p style={{ fontSize: 13, lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.5)' : '#666', marginBottom: 20 }}>{item.excerpt}</p>
      <span style={{ fontSize: 10, color: hov ? 'rgba(201,168,76,0.5)' : '#aaa', fontFamily: 'sans-serif', letterSpacing: '0.1em', transition: 'color 0.3s' }}>{item.readTime} min read</span>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────
export default function WeddingsPage() {
  return (
    <>
      <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{ position: 'relative', background: '#0a0a0a', padding: '100px 32px 90px', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>A Curated Edit</p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(40px, 7vw, 82px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.05, letterSpacing: '0.02em', marginBottom: 28 }}>
              Luxury <em style={{ color: '#C9A84C' }}>Weddings</em>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', fontWeight: 300, fontFamily: 'sans-serif', letterSpacing: '0.02em', maxWidth: 560, margin: '0 auto' }}>
              India's world of couture celebrations and unforgettable occasions.
            </p>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
        </section>

        {/* ══ CATEGORY STRIP ════════════════════════════════════ */}
        <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
            {['Designers', 'Wedding Planners', 'Venues', 'Beauty Experts', 'Editorial'].map((cat, i, arr) => (
              <a key={cat} href={`#${cat.toLowerCase().replace(' ', '-')}`} style={{ padding: '18px 22px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', borderRight: i < arr.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >{cat}</a>
            ))}
          </div>
        </div>

        {/* ══ DESIGNERS ═════════════════════════════════════════ */}
        <section id="designers" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px 56px' }}>
          <SectionHeader label="Couture" title="Bridal Designers" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="w-grid-4">
            {DESIGNERS.map(d => <ListingCard key={d.name} item={d} />)}
          </div>
        </section>

        {/* ══ PLANNERS ══════════════════════════════════════════ */}
        <section id="wedding-planners" style={{ background: '#fafafa', padding: '72px 0 56px', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <SectionHeader label="Expertise" title="Wedding Planners" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="w-grid-3">
              {PLANNERS.map(p => <ListingCard key={p.name} item={p} />)}
            </div>
          </div>
        </section>

        {/* ══ VENUES ════════════════════════════════════════════ */}
        <section id="venues" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px 56px' }}>
          <SectionHeader label="Iconic Settings" title="Luxury Venues" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="w-grid-4">
            {VENUES.map(v => <ListingCard key={v.name} item={v} />)}
          </div>
        </section>

        {/* ══ BEAUTY ════════════════════════════════════════════ */}
        <section id="beauty-experts" style={{ background: '#fafafa', padding: '72px 0 56px', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <SectionHeader label="Artistry" title="Beauty Experts" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="w-grid-3">
              {BEAUTY.map(b => <ListingCard key={b.name} item={b} />)}
            </div>
          </div>
        </section>

        {/* ══ EDITORIAL ═════════════════════════════════════════ */}
        <section id="editorial" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px 56px' }}>
          <SectionHeader label="From the Journal" title="Wedding Editorial" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="w-grid-3">
            {EDITORIAL.map(e => <EditorialCard key={e.title} item={e} />)}
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════ */}
        <section style={{ background: '#0a0a0a', padding: '88px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: '#1B4D45' }} />

          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'sans-serif' }}>Begin Here</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: 300, color: '#ffffff', marginBottom: 16, letterSpacing: '0.01em', lineHeight: 1.2 }}>
              Plan Your <em style={{ color: '#C9A84C' }}>Dream Celebration</em>
            </h2>
            <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto 24px' }} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 40, lineHeight: 1.85, fontWeight: 300, fontFamily: 'sans-serif' }}>
              Connect with India's finest wedding designers, planners, and venues — all curated by Indian Luxury House.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/partner"
                style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#0a0a0a', background: '#C9A84C', padding: '16px 40px', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 600, transition: 'background 0.2s', display: 'inline-block' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
              >Start Planning →</Link>
              <a href="mailto:hello@indianluxuryhouse.com"
                style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)', padding: '16px 40px', textDecoration: 'none', fontFamily: 'sans-serif', transition: 'border-color 0.2s', display: 'inline-block' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
              >Email Us</a>
            </div>
          </div>
        </section>

        {/* Back */}
        <div style={{ textAlign: 'center', padding: '36px 32px 52px', borderTop: '1px solid #f0f0f0' }}>
          <Link href="/" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif', borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3 }}>← Back to Journal</Link>
        </div>

      </main>

      <style>{`
        @media (max-width: 767px) {
          .w-grid-4 { grid-template-columns: 1fr !important; }
          .w-grid-3 { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .w-grid-4 { grid-template-columns: repeat(2,1fr) !important; }
          .w-grid-3 { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  );
}