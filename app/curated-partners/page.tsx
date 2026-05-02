'use client';

import Image from 'next/image';
import { useState } from 'react';
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
      <p style={{ fontSize: 13, lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif', color: hov ? 'rgba(255,255,255,0.5)' : '#666', marginBottom: 24, flex: 1, transition: 'color 0.3s' }}>{partner.desc}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: hov ? 'rgba(201,168,76,0.4)' : '#aaa', fontFamily: 'sans-serif', transition: 'color 0.3s' }}>📍 {partner.city}</span>
        <a href="mailto:hello@indianluxuryhouse.com" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: hov ? '#0a0a0a' : '#1B4D45', background: hov ? '#C9A84C' : 'transparent', border: `1px solid ${hov ? '#C9A84C' : 'rgba(27,77,69,0.35)'}`, padding: '8px 16px', textDecoration: 'none', fontFamily: 'sans-serif', transition: 'all 0.25s', fontWeight: 500 }}>Inquire →</a>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PARTNERS : PARTNERS.filter(p => p.category === active);

  return (
    <>
      <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{ position: 'relative', background: '#0a0a0a', padding: '100px 32px 90px', overflow: 'hidden', textAlign: 'center' }}>

          {/* Hero Image */}
          <Image
            src="/images/hero-partners.jpg"
            alt="Curated Partners"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.35 }}
          />

          {/* Dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.65)' }} />

          {/* Top gold line */}
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

          {/* Bottom gold line */}
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

        {/* ══ GRID ══════════════════════════════════════════════ */}
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
              <Link href="/partner-with-us" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#0a0a0a', background: '#C9A84C', padding: '16px 36px', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 600, transition: 'background 0.2s', display: 'inline-block' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
              >Apply Now →</Link>
              <a href="mailto:hello@indianluxuryhouse.com" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)', padding: '16px 36px', textDecoration: 'none', fontFamily: 'sans-serif', transition: 'border-color 0.2s', display: 'inline-block' }}
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
        @media (max-width: 767px) { .partners-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 768px) and (max-width: 1023px) { .partners-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </>
  );
}


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