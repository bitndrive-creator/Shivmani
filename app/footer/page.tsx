'use client';

import Link from 'next/link';
import Image from 'next/image';

// ── CATEGORIES ───────────────────────
const CATS = [
  { name: 'Real Estate',         slug: 'real-estate'      },
  { name: 'Automobiles',         slug: 'automobiles'      },
  { name: 'Jewellery & Watches', slug: 'jewellery-watches'},
  { name: 'Weddings',            slug: 'weddings'         },
  { name: 'Curated Partners',    slug: 'curated-partners' },
];

const NAVIGATE = [
  { label: 'Home',            href: '/'               },
  { label: 'News',            href: '/news'           },
  { label: 'Partner With Us', href: '/partner-with-us'},
  { label: 'About',           href: '/about'          },
];

// const LEGAL = [
//   { label: 'Privacy Policy', href: '/privacy' },
//   { label: 'Terms of Use',   href: '/terms'   },
// ];

// ── FOOTER ────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)' }}>

      {/* Top gold shimmer */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 32px 36px' }}>

        {/* ── 4-column grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="ilh-footer-grid">

          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Image
                src="/logos.png"
                alt="Indian Luxury House"
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
              <div style={{ marginLeft: -4 }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#DFC27A', letterSpacing: '0.28em', textTransform: 'uppercase' }}>Indian</div>
                <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.4)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
              </div>
            </div>

            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.9, fontWeight: 300, maxWidth: 260, marginBottom: 28 }}>
              Celebrating, connecting, and elevating the world of luxury through an India-first lens.
            </p>

            {/* Tagline */}
            <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 24 }}>
              Where India Meets Global Luxury
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 20 }}>
              {['Instagram', 'LinkedIn'].map(s => (
                <a key={s} href="#"
                  style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)')}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <p style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 22, fontWeight: 500 }}>Navigate</p>
            {NAVIGATE.map(item => (
              <div key={item.href} style={{ marginBottom: 14 }}>
                <Link href={item.href}
                  style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                >{item.label}</Link>
              </div>
            ))}
          </div>

          {/* Col 3 — Categories */}
          <div>
            <p style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 22, fontWeight: 500 }}>Categories</p>
            {CATS.map(c => (
              <div key={c.slug} style={{ marginBottom: 14 }}>
                <Link href={`/${c.slug}`}
                  style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                >{c.name}</Link>
              </div>
            ))}
          </div>

          {/* Col 4 — Contact + Newsletter */}
          <div>
            <p style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 22, fontWeight: 500 }}>Contact</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 8, letterSpacing: '0.04em' }}>Partnerships:</p>
            <a href="mailto:hello@indianluxuryhouse.com"
              style={{ fontSize: 14, color: '#C9A84C', textDecoration: 'none', letterSpacing: '0.03em', transition: 'color 0.2s', display: 'block', marginBottom: 36 }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#DFC27A')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
            >hello@indianluxuryhouse.com</a>

            {/* Newsletter mini */}
            <p style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 14, fontWeight: 500 }}>
              Join India&apos;s Luxury Circle
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 14 }}>
              Curated luxury intelligence, every week.
            </p>
            <div style={{ display: 'flex' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: '#DFC27A', fontSize: 13, padding: '10px 14px', outline: 'none', fontFamily: 'inherit', minWidth: 0 }}
              />
              <button
                style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: 15, fontWeight: 700, transition: 'background 0.2s', flexShrink: 0 }}
                onMouseEnter={e => ((e.target as HTMLElement).style.background = '#DFC27A')}
                onMouseLeave={e => ((e.target as HTMLElement).style.background = '#C9A84C')}
              >→</button>
            </div>
          </div>
        </div>

        {/* ── Gold divider ── */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)', marginBottom: 28 }} />

        {/* ── Bottom bar ── */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textAlign: 'center' }}>
            © {new Date().getFullYear()} Indian Luxury House. All rights reserved.
          </p>
          {/* <div style={{ display: 'flex', gap: 24 }}>
            {LEGAL.map(item => (
              <a key={item.href} href={item.href}
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.85)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
              >{item.label}</a>
            ))}
          </div> */}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .ilh-footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .ilh-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}


// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';

// // ── CATEGORIES ───────────────────────
// const CATS = [
//   { name: 'Real Estate',         slug: 'real-estate'      },
//   { name: 'Automobiles',         slug: 'automobiles'      },
//   { name: 'Jewellery & Watches', slug: 'jewellery-watches'},
//   { name: 'Weddings',            slug: 'weddings'         },
//   { name: 'Curated Partners',    slug: 'curated-partners' },
// ];

// const NAVIGATE = [
//   { label: 'Home',            href: '/'               },
//   { label: 'News',            href: '/news'           },
//   { label: 'Partner With Us', href: '/partner-with-us'},
//   { label: 'About',           href: '/about'          },
// ];

// const LEGAL = [
//   { label: 'Privacy Policy', href: '/privacy' },
//   { label: 'Terms of Use',   href: '/terms'   },
// ];

// // ── FOOTER ────────────────────────────────────────────────────
// export default function Footer() {
//   return (
//     <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)' }}>

//       {/* Top gold shimmer */}
//       <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4 }} />

//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 32px 36px' }}>

//         {/* ── 4-column grid ── */}
//         <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="ilh-footer-grid">

//           {/* Col 1 — Brand */}
//           <div>
//             {/* <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
//               <Image
//                 src="/logos.png"
//                 alt="Indian Luxury House"
//                 width={80}
//                 height={80}
//                 style={{ objectFit: 'contain' }}
//               />
//               <div>
//                 <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#DFC27A', letterSpacing: '0.28em', textTransform: 'uppercase' }}>Indian</div>
//                 <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.4)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//               </div>
//             </div> */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
//   <Image
//     src="/logos.png"
//     alt="Indian Luxury House"
//     width={80}
//     height={80}
//     style={{ objectFit: 'contain' }}
//   />
//   <div style={{ marginLeft: -4 }}>  {/* ← thoda aur paas */}
//     <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#DFC27A', letterSpacing: '0.28em', textTransform: 'uppercase' }}>Indian</div>
//     <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.4)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//   </div>
// </div>

//             <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.9, fontWeight: 300, maxWidth: 260, marginBottom: 28 }}>
//               Celebrating, connecting, and elevating the world of luxury through an India-first lens.
//             </p>

//             {/* Tagline */}
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 24 }}>
//               Where India Meets Global Luxury
//             </p>

//             {/* Socials */}
//             <div style={{ display: 'flex', gap: 20 }}>
//               {['Instagram', 'LinkedIn'].map(s => (
//                 <a key={s} href="#"
//                   style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
//                   onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
//                   onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.4)')}
//                 >{s}</a>
//               ))}
//             </div>
//           </div>

//           {/* Col 2 — Navigate */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 22, fontWeight: 500 }}>Navigate</p>
//             {NAVIGATE.map(item => (
//               <div key={item.href} style={{ marginBottom: 14 }}>
//                 <Link href={item.href}
//                   style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
//                   onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
//                   onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.32)')}
//                 >{item.label}</Link>
//               </div>
//             ))}
//           </div>

//           {/* Col 3 — Categories */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 22, fontWeight: 500 }}>Categories</p>
//             {CATS.map(c => (
//               <div key={c.slug} style={{ marginBottom: 14 }}>
//                 <Link href={`/${c.slug}`}
//                   style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
//                   onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
//                   onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.32)')}
//                 >{c.name}</Link>
//               </div>
//             ))}
//           </div>

//           {/* Col 4 — Contact + Newsletter */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 22, fontWeight: 500 }}>Contact</p>
//             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginBottom: 8, letterSpacing: '0.04em' }}>Partnerships:</p>
//             <a href="mailto:hello@indianluxuryhouse.com"
//               style={{ fontSize: 12, color: 'rgba(201,168,76,0.55)', textDecoration: 'none', letterSpacing: '0.03em', transition: 'color 0.2s', display: 'block', marginBottom: 36 }}
//               onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
//               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.55)')}
//             >hello@indianluxuryhouse.com</a>

//             {/* Newsletter mini */}
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 14, fontWeight: 500 }}>
//               Join India&apos;s Luxury Circle
//             </p>
//             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', lineHeight: 1.7, marginBottom: 14 }}>
//               Curated luxury intelligence, every week.
//             </p>
//             <div style={{ display: 'flex' }}>
//               <input
//                 type="email"
//                 placeholder="your@email.com"
//                 style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: '#DFC27A', fontSize: 11, padding: '10px 14px', outline: 'none', fontFamily: 'inherit', minWidth: 0 }}
//               />
//               <button
//                 style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: 15, fontWeight: 700, transition: 'background 0.2s', flexShrink: 0 }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.background = '#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.background = '#C9A84C')}
//               >→</button>
//             </div>
//           </div>
//         </div>

//         {/* ── Gold divider ── */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)', marginBottom: 28 }} />

//         {/* ── Bottom bar ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
//           <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
//             © {new Date().getFullYear()} Indian Luxury House. All rights reserved.
//           </p>
//           <div style={{ display: 'flex', gap: 24 }}>
//             {LEGAL.map(item => (
//               <a key={item.href} href={item.href}
//                 style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.18)')}
//               >{item.label}</a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Responsive styles */}
//       <style>{`
//         @media (max-width: 767px) {
//           .ilh-footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
//         }
//         @media (min-width: 768px) and (max-width: 1023px) {
//           .ilh-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
//         }
//       `}</style>
//     </footer>
//   );
// }



// 'use client';

// import Link from 'next/link';

// // ── CATEGORIES (blueprint ke hisab se) ───────────────────────
// const CATS = [
//   { name: 'Real Estate',         slug: 'real-estate'      },
//   { name: 'Automobiles',         slug: 'automobiles'      },
//   { name: 'Jewellery & Watches', slug: 'jewellery-watches'},
//   { name: 'Weddings',            slug: 'weddings'         },
//   { name: 'Curated Partners',    slug: 'curated-partners' },
// ];

// const NAVIGATE = [
//   { label: 'Home',            href: '/'               },
//   { label: 'News',            href: '/news'           },
//   { label: 'Partner With Us', href: '/partner-with-us'},
//   { label: 'About',           href: '/about'          },
// ];

// const LEGAL = [
//   { label: 'Privacy Policy', href: '/privacy' },
//   { label: 'Terms of Use',   href: '/terms'   },
// ];

// // ── ILH PEACOCK LOGO (same as Navbar) ────────────────────────
// function ILHLogo({ size = 36 }: { size?: number }) {
//   const gold    = '#C9A84C';
//   const emerald = '#2A7A6A';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-label="Indian Luxury House">
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

// // ── FOOTER ────────────────────────────────────────────────────
// export default function Footer() {
//   return (
//     <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)' }}>

//       {/* Top gold shimmer */}
//       <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4 }} />

//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 32px 36px' }}>

//         {/* ── 4-column grid ── */}
//         <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="ilh-footer-grid">

//           {/* Col 1 — Brand */}
//           <div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
//               <ILHLogo size={40} />
//               <div>
//                 <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#DFC27A', letterSpacing: '0.28em', textTransform: 'uppercase' }}>Indian</div>
//                 <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.4)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//               </div>
//             </div>

//             <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.9, fontWeight: 300, maxWidth: 260, marginBottom: 28 }}>
//               Celebrating, connecting, and elevating the world of luxury through an India-first lens.
//             </p>

//             {/* Tagline */}
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 24 }}>
//               Where India Meets Global Luxury
//             </p>

//             {/* Socials */}
//             <div style={{ display: 'flex', gap: 20 }}>
//               {['Instagram', 'LinkedIn'].map(s => (
//                 <a key={s} href="#"
//                   style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
//                   onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
//                   onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.4)')}
//                 >{s}</a>
//               ))}
//             </div>
//           </div>

//           {/* Col 2 — Navigate */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 22, fontWeight: 500 }}>Navigate</p>
//             {NAVIGATE.map(item => (
//               <div key={item.href} style={{ marginBottom: 14 }}>
//                 <Link href={item.href}
//                   style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
//                   onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
//                   onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.32)')}
//                 >{item.label}</Link>
//               </div>
//             ))}
//           </div>

//           {/* Col 3 — Categories */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 22, fontWeight: 500 }}>Categories</p>
//             {CATS.map(c => (
//               <div key={c.slug} style={{ marginBottom: 14 }}>
//                 <Link href={`/${c.slug}`}
//                   style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
//                   onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
//                   onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.32)')}
//                 >{c.name}</Link>
//               </div>
//             ))}
//           </div>

//           {/* Col 4 — Contact + Newsletter */}
//           <div>
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 22, fontWeight: 500 }}>Contact</p>
//             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginBottom: 8, letterSpacing: '0.04em' }}>Partnerships:</p>
//             <a href="mailto:hello@indianluxuryhouse.com"
//               style={{ fontSize: 12, color: 'rgba(201,168,76,0.55)', textDecoration: 'none', letterSpacing: '0.03em', transition: 'color 0.2s', display: 'block', marginBottom: 36 }}
//               onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
//               onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.55)')}
//             >hello@indianluxuryhouse.com</a>

//             {/* Newsletter mini */}
//             <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)', marginBottom: 14, fontWeight: 500 }}>
//               Join India&apos;s Luxury Circle
//             </p>
//             <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', lineHeight: 1.7, marginBottom: 14 }}>
//               Curated luxury intelligence, every week.
//             </p>
//             <div style={{ display: 'flex' }}>
//               <input
//                 type="email"
//                 placeholder="your@email.com"
//                 style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: '#DFC27A', fontSize: 11, padding: '10px 14px', outline: 'none', fontFamily: 'inherit', minWidth: 0 }}
//               />
//               <button
//                 style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: 15, fontWeight: 700, transition: 'background 0.2s', flexShrink: 0 }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.background = '#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.background = '#C9A84C')}
//               >→</button>
//             </div>
//           </div>
//         </div>

//         {/* ── Gold divider ── */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)', marginBottom: 28 }} />

//         {/* ── Bottom bar ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
//           <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
//             © {new Date().getFullYear()} Indian Luxury House. All rights reserved.
//           </p>
//           <div style={{ display: 'flex', gap: 24 }}>
//             {LEGAL.map(item => (
//               <a key={item.href} href={item.href}
//                 style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.18)')}
//               >{item.label}</a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Responsive styles */}
//       <style>{`
//         @media (max-width: 767px) {
//           .ilh-footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
//         }
//         @media (min-width: 768px) and (max-width: 1023px) {
//           .ilh-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
//         }
//       `}</style>
//     </footer>
//   );
// }


// 'use client';

// import Link from 'next/link';

// // CATS array yahan bhi chahiye ya import karo
// const CATS = [
//   { name:'Cars', slug:'cars' },
//   { name:'Yachts', slug:'yachts' },
//   { name:'Watches', slug:'watches' },
//   { name:'Style', slug:'style' },
//   { name:'Home', slug:'home' },
//   { name:'Food & Drink', slug:'food-drink' },
//   { name:'Travel', slug:'travel' },
// ];

// function SMLogo({ size = 36 }: { size?: number }) {
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

// export default function Footer() {
//   return (
//     <footer style={{ background:'#1B4D45' }}>
//       <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }} />
//       <div style={{ maxWidth:1280, margin:'0 auto', padding:'60px 32px 36px' }}>
//         <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:48, marginBottom:48 }}>
//           <div>
//             <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:8, marginBottom:16 }}>
//               <SMLogo size={48} />
//               <span style={{ fontFamily:'Georgia,serif', fontSize:20, fontWeight:300, color:'#DFC27A', letterSpacing:'0.22em' }}>INDIAN Luxury House</span>
//             </div>
//             <p style={{ fontSize:12, lineHeight:1.8, color:'rgba(201,168,76,0.45)', fontWeight:300 }}>A curated journal for those who appreciate the finest things in life.</p>
//           </div>
//           <div>
//             <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>Categories</p>
//             {CATS.map(c => (
//               <Link key={c.slug} href={`/category/${c.slug}`}
//                 style={{ display:'block', fontSize:12, color:'rgba(201,168,76,0.55)', textDecoration:'none', marginBottom:10, transition:'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color='#DFC27A')}
//                 onMouseLeave={e => (e.currentTarget.style.color='rgba(201,168,76,0.55)')}
//               >{c.name}</Link>
//             ))}
//           </div>
//           <div>
//             <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>About</p>
//             {['About Us','Contact','Privacy Policy','Advertise'].map(l => (
//               <a key={l} href="#"
//                 style={{ display:'block', fontSize:12, color:'rgba(201,168,76,0.55)', textDecoration:'none', marginBottom:10, transition:'color .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.color='#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.color='rgba(201,168,76,0.55)')}
//               >{l}</a>
//             ))}
//           </div>
//           <div>
//             <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>Newsletter</p>
//             <p style={{ fontSize:12, color:'rgba(201,168,76,0.45)', marginBottom:16, lineHeight:1.7 }}>Curated stories, delivered every Thursday.</p>
//             <div style={{ display:'flex' }}>
//               <input type="email" placeholder="your@email.com"
//                 style={{ flex:1, background:'#163D37', border:'1px solid rgba(201,168,76,0.18)', color:'#DFC27A', fontSize:12, padding:'11px 14px', outline:'none', fontFamily:'inherit' }}
//               />
//               <button
//                 style={{ background:'#C9A84C', color:'#1B4D45', border:'none', padding:'11px 18px', cursor:'pointer', fontSize:16, fontWeight:700, transition:'background .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.background='#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.background='#C9A84C')}
//               >→</button>
//             </div>
//           </div>
//         </div>
//         <div style={{ borderTop:'1px solid rgba(201,168,76,0.1)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
//           <p style={{ fontSize:10, letterSpacing:'0.12em', color:'rgba(201,168,76,0.26)' }}>© 2026 Indian Luxury House. All rights reserved.</p>
//           <div style={{ display:'flex', gap:24 }}>
//             {['Instagram','Twitter','LinkedIn'].map(s => (
//               <a key={s} href="#"
//                 style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', textDecoration:'none', transition:'color .2s' }}
//                 onMouseEnter={e => ((e.target as HTMLElement).style.color='#DFC27A')}
//                 onMouseLeave={e => ((e.target as HTMLElement).style.color='rgba(201,168,76,0.32)')}
//               >{s}</a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }