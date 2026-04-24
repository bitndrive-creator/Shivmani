'use client';

import Link from 'next/link';

// CATS array yahan bhi chahiye ya import karo
const CATS = [
  { name:'Cars', slug:'cars' },
  { name:'Yachts', slug:'yachts' },
  { name:'Watches', slug:'watches' },
  { name:'Style', slug:'style' },
  { name:'Home', slug:'home' },
  { name:'Food & Drink', slug:'food-drink' },
  { name:'Travel', slug:'travel' },
];

function SMLogo({ size = 36 }: { size?: number }) {
  const g = '#C9A84C';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={g} opacity="0.9"/>
      <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={g} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M42 36C48 26 58 16 66 16C70 16 70 26 62 32C56 37 44 38 44 38" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={g} transform="rotate(-30 30 46)" opacity="0.8"/>
      <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={g} transform="rotate(-20 26 52)" opacity="0.7"/>
      <ellipse cx="28" cy="40" rx="4.5" ry="2" fill={g} transform="rotate(-45 28 40)" opacity="0.7"/>
      <circle cx="52" cy="12" r="1.5" fill={g}/>
      <circle cx="56" cy="10" r="1.2" fill={g} opacity="0.8"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background:'#1B4D45' }}>
      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'60px 32px 36px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:48, marginBottom:48 }}>
          <div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:8, marginBottom:16 }}>
              <SMLogo size={48} />
              <span style={{ fontFamily:'Georgia,serif', fontSize:20, fontWeight:300, color:'#DFC27A', letterSpacing:'0.22em' }}>INDIAN Luxury House</span>
            </div>
            <p style={{ fontSize:12, lineHeight:1.8, color:'rgba(201,168,76,0.45)', fontWeight:300 }}>A curated journal for those who appreciate the finest things in life.</p>
          </div>
          <div>
            <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>Categories</p>
            {CATS.map(c => (
              <Link key={c.slug} href={`/category/${c.slug}`}
                style={{ display:'block', fontSize:12, color:'rgba(201,168,76,0.55)', textDecoration:'none', marginBottom:10, transition:'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='#DFC27A')}
                onMouseLeave={e => (e.currentTarget.style.color='rgba(201,168,76,0.55)')}
              >{c.name}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>About</p>
            {['About Us','Contact','Privacy Policy','Advertise'].map(l => (
              <a key={l} href="#"
                style={{ display:'block', fontSize:12, color:'rgba(201,168,76,0.55)', textDecoration:'none', marginBottom:10, transition:'color .2s' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color='#DFC27A')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color='rgba(201,168,76,0.55)')}
              >{l}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', marginBottom:18, fontWeight:500 }}>Newsletter</p>
            <p style={{ fontSize:12, color:'rgba(201,168,76,0.45)', marginBottom:16, lineHeight:1.7 }}>Curated stories, delivered every Thursday.</p>
            <div style={{ display:'flex' }}>
              <input type="email" placeholder="your@email.com"
                style={{ flex:1, background:'#163D37', border:'1px solid rgba(201,168,76,0.18)', color:'#DFC27A', fontSize:12, padding:'11px 14px', outline:'none', fontFamily:'inherit' }}
              />
              <button
                style={{ background:'#C9A84C', color:'#1B4D45', border:'none', padding:'11px 18px', cursor:'pointer', fontSize:16, fontWeight:700, transition:'background .2s' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.background='#DFC27A')}
                onMouseLeave={e => ((e.target as HTMLElement).style.background='#C9A84C')}
              >→</button>
            </div>
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(201,168,76,0.1)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontSize:10, letterSpacing:'0.12em', color:'rgba(201,168,76,0.26)' }}>© 2026 SM Luxury. All rights reserved.</p>
          <div style={{ display:'flex', gap:24 }}>
            {['Instagram','Twitter','LinkedIn'].map(s => (
              <a key={s} href="#"
                style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.32)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color='#DFC27A')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color='rgba(201,168,76,0.32)')}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}