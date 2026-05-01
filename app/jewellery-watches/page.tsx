'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// ── TYPES ─────────────────────────────────────────────────────────
interface Brand { name: string; origin: string; specialty: string; img: string; slug: string; }
interface WatchSpotlight { name: string; brand: string; price: string; desc: string; img: string; slug: string; }
interface Story { title: string; category: string; excerpt: string; author: string; date: string; readTime: number; img: string; slug: string; }

// ── DATA ──────────────────────────────────────────────────────────
const BRIDAL_COLLECTIONS = [
  { title: 'Solitaire Diamonds',   sub: 'Timeless engagement rings',           img: '/images/jwl-bridal-solitaire.jpg' },
  { title: 'Bridal Sets',          sub: 'Perfectly matched ring ensembles',     img: '/images/jwl-bridal-sets.jpg'      },
  { title: 'Coloured Gemstones',   sub: 'Sapphires, rubies & emeralds',         img: '/images/jwl-bridal-gems.jpg'      },
  { title: 'Heirloom & Antique',   sub: 'Pieces with a storied past',           img: '/images/jwl-bridal-antique.jpg'   },
];

const FINE_BRANDS: Brand[] = [
  { name: 'Cartier',         origin: 'Paris, 1847',         specialty: 'Love & Panthère collections',           img: '/images/jwl-brand-cartier.jpg',    slug: 'cartier'    },
  { name: 'Van Cleef & Arpels', origin: 'Paris, 1906',     specialty: 'Alhambra & floral motifs',              img: '/images/jwl-brand-vca.jpg',        slug: 'van-cleef'  },
  { name: 'Bulgari',         origin: 'Rome, 1884',          specialty: 'Serpenti & B.zero1',                    img: '/images/jwl-brand-bvlgari.jpg',    slug: 'bvlgari'    },
  { name: 'Tiffany & Co.',   origin: 'New York, 1837',      specialty: 'Setting & diamond expertise',           img: '/images/jwl-brand-tiffany.jpg',    slug: 'tiffany'    },
  { name: 'Chopard',         origin: 'Geneva, 1860',        specialty: 'Happy Diamonds & haute joaillerie',     img: '/images/jwl-brand-chopard.jpg',    slug: 'chopard'    },
  { name: 'Harry Winston',   origin: 'New York, 1932',      specialty: 'Rare diamonds & cluster designs',       img: '/images/jwl-brand-harrywinston.jpg',slug:'harry-winston'},
];

const WATCH_SPOTLIGHTS: WatchSpotlight[] = [
  { name: 'Royal Oak',          brand: 'Audemars Piguet', price: 'From $30,000',  desc: 'The octagonal bezel that changed watchmaking forever. Genta\'s masterpiece remains untouchable.',           img: '/images/jwl-watch-royaloak.jpg',   slug: 'audemars-royal-oak'    },
  { name: 'Nautilus 5711',      brand: 'Patek Philippe',  price: 'From $150,000', desc: 'Discontinued. Mythologised. The most coveted sports watch ever made — and still climbing.',                 img: '/images/jwl-watch-nautilus.jpg',   slug: 'patek-nautilus-5711'   },
  { name: 'Daytona 116500LN',   brand: 'Rolex',           price: 'From $75,000',  desc: 'The Panda dial on a ceramic bezel. Every serious collector\'s non-negotiable.',                             img: '/images/jwl-watch-daytona.jpg',    slug: 'rolex-daytona-116500'  },
  { name: 'Santos de Cartier',  brand: 'Cartier',         price: 'From $8,000',   desc: 'Born for aviation in 1904. Still the most elegant dress-sport watch money can buy.',                        img: '/images/jwl-watch-santos.jpg',     slug: 'cartier-santos'        },
];

const STORIES: Story[] = [
  { title: 'The New Language of Bridal Jewellery: Beyond the Solitaire',           category: 'Heritage Trends',       excerpt: 'How brides in 2026 are choosing coloured stones, alternative cuts, and heritage pieces over the traditional diamond solitaire.',      author: 'Priya Mehra',     date: 'Apr 20, 2026', readTime: 7,  img: '/images/jwl-story-bridal.jpg',    slug: 'bridal-jewellery-trends-2026'     },
  { title: 'Six Watches Worth Buying Today (That Will Be Worth More Tomorrow)',     category: 'Collector\'s Guide',    excerpt: 'These are not just timepieces — they are stores of value. Our experts identify the watches serious collectors should acquire now.',    author: 'Marcus Webb',     date: 'Apr 16, 2026', readTime: 9,  img: '/images/jwl-story-watches.jpg',   slug: 'watches-worth-collecting-2026'    },
  { title: 'Inside Cartier\'s Archives: The Jewels That Defined an Era',            category: 'Heritage',              excerpt: 'A rare look inside the Maison\'s private archive reveals commissions for royalty, film stars, and the world\'s most powerful women.',  author: 'Isabelle Fontaine',date: 'Apr 12, 2026', readTime: 6, img: '/images/jwl-story-cartier.jpg',  slug: 'cartier-archives-heritage'        },
  { title: 'The Emerald\'s Moment: Why Green Is the Colour of 2026',               category: 'Fine Jewellery',        excerpt: 'Colombian emeralds are commanding record prices at auction. We trace the stone\'s resurgence from heirlooms to the latest collections.',  author: 'Nadia Rao',       date: 'Apr 8, 2026',  readTime: 5,  img: '/images/jwl-story-emerald.jpg',   slug: 'emerald-jewellery-trend-2026'     },
];

// ── SM LOGO ────────────────────────────────────────────────────────
function SMLogo({ size = 36, gold = '#C9A84C' }: { size?: number; gold?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={gold} opacity="0.9"/>
      <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={gold} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M42 36C48 26 58 16 66 16C70 16 70 26 62 32C56 37 44 38 44 38" stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={gold} transform="rotate(-30 30 46)" opacity="0.8"/>
      <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={gold} transform="rotate(-20 26 52)" opacity="0.7"/>
      <ellipse cx="28" cy="40" rx="4.5" ry="2" fill={gold} transform="rotate(-45 28 40)" opacity="0.7"/>
      <circle cx="52" cy="12" r="1.5" fill={gold}/>
      <circle cx="56" cy="10" r="1.2" fill={gold} opacity="0.8"/>
    </svg>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const NAV_LINKS = [
    { label: 'Bridal',         href: '#bridal'   },
    { label: 'Fine Brands',    href: '#brands'   },
    { label: 'Watch Spotlights', href: '#watches' },
    { label: 'Stories',        href: '#stories'  },
    { label: '← SM Luxury',   href: '/'         },
  ];
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <>
      <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background: scrolled ? 'rgba(8,8,8,0.97)' : 'rgba(8,8,8,0.88)', backdropFilter:'blur(12px)', transition:'all 0.4s ease', boxShadow: scrolled ? '0 1px 30px rgba(0,0,0,0.6)' : 'none' }}>
        <div style={{ height:1, background:'linear-gradient(90deg,transparent,#C9A84C 30%,#C9A84C 70%,transparent)', opacity:0.5 }} />
        <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 40px', height:70, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
            <SMLogo size={36} />
            <div>
              <div style={{ fontFamily:'Georgia,serif', fontSize:18, fontWeight:300, color:'#C9A84C', letterSpacing:'0.22em' }}>SM</div>
              <div style={{ fontSize:8, color:'rgba(201,168,76,0.45)', letterSpacing:'0.35em', textTransform:'uppercase' }}>Luxury</div>
            </div>
          </Link>
          <nav style={{ display:'flex', alignItems:'center', gap:4 }} className="jwl-nav-desk">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)', textDecoration:'none', padding:'8px 16px', borderBottom:'1px solid transparent', transition:'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.color='#C9A84C'; e.currentTarget.style.borderBottomColor='#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(201,168,76,0.55)'; e.currentTarget.style.borderBottomColor='transparent'; }}
              >{l.label}</a>
            ))}
          </nav>
          <button className="jwl-nav-mob" onClick={() => setMenuOpen(!menuOpen)} style={{ background:'none', border:'none', color:'#C9A84C', cursor:'pointer', padding:8, display:'none' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
        </div>
        <div style={{ background:'#080808', overflow:'hidden', maxHeight: menuOpen ? 400 : 0, transition:'max-height .35s ease', borderTop:'1px solid rgba(201,168,76,0.08)' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display:'block', padding:'14px 32px', fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', textDecoration:'none', borderBottom:'1px solid rgba(201,168,76,0.06)', transition:'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background='rgba(201,168,76,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background='transparent')}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }} />
      </header>
      <style>{`
        .jwl-nav-desk { display:flex!important; }
        .jwl-nav-mob  { display:none!important; }
        @media(max-width:1024px){ .jwl-nav-desk{display:none!important;} .jwl-nav-mob{display:flex!important;} }
      `}</style>
    </>
  );
}

// ── BRIDAL CARD ────────────────────────────────────────────────────
function BridalCard({ item }: { item: typeof BRIDAL_COLLECTIONS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position:'relative', overflow:'hidden', cursor:'pointer' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position:'relative', paddingBottom:'130%', background:'#111' }}>
        <Image src={item.img} alt={item.title} fill
          style={{ objectFit:'cover', transition:'transform .8s ease', transform: hov ? 'scale(1.07)' : 'scale(1)' }}
          sizes="25vw"
          onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
        />
        {/* Gradient */}
        <div style={{ position:'absolute', inset:0, background: hov ? 'linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.1) 60%)' : 'linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 55%)', transition:'background .5s' }} />
        {/* Label */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'24px 22px' }}>
          <div style={{ width: hov ? 32 : 0, height:1, background:'#C9A84C', marginBottom:10, transition:'width .4s ease' }} />
          <h3 style={{ fontFamily:'Georgia,serif', fontSize:20, fontWeight:400, color:'#fff', margin:0, letterSpacing:'0.02em', transform: hov ? 'translateY(-3px)' : 'translateY(0)', transition:'transform .35s' }}>{item.title}</h3>
          <p style={{ fontSize:11, color:'rgba(255,255,255,0.6)', margin:'6px 0 0', letterSpacing:'0.06em', fontWeight:300 }}>{item.sub}</p>
        </div>
      </div>
    </div>
  );
}

// ── BRAND CARD ─────────────────────────────────────────────────────
function BrandCard({ brand }: { brand: Brand }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/jewellery/${brand.slug}`}
      style={{ display:'block', textDecoration:'none', background: hov ? '#111' : '#0D0D0D', border: hov ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(255,255,255,0.06)', transition:'all .3s', overflow:'hidden' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position:'relative', paddingBottom:'65%', background:'#1a1a1a', overflow:'hidden' }}>
        <Image src={brand.img} alt={brand.name} fill
          style={{ objectFit:'cover', transition:'transform .7s', transform: hov ? 'scale(1.05)' : 'scale(1)', filter: hov ? 'brightness(1)' : 'brightness(0.85)' }}
          sizes="33vw"
          onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
        />
        {hov && <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.2)' }} />}
      </div>
      {/* Content */}
      <div style={{ padding:'20px 22px 22px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
          <h3 style={{ fontFamily:'Georgia,serif', fontSize:18, fontWeight:400, color:'#fff', margin:0, letterSpacing:'0.01em' }}>{brand.name}</h3>
          <span style={{ fontSize:9, color:'rgba(201,168,76,0.5)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:3 }}>{brand.origin}</span>
        </div>
        <div style={{ width:24, height:1, background:'#C9A84C', marginBottom:10, opacity:0.6 }} />
        <p style={{ fontSize:12, color:'rgba(255,255,255,0.4)', margin:0, fontWeight:300, letterSpacing:'0.03em' }}>{brand.specialty}</p>
      </div>
    </Link>
  );
}

// ── WATCH CARD ─────────────────────────────────────────────────────
function WatchCard({ watch, idx }: { watch: WatchSpotlight; idx: number }) {
  const [hov, setHov] = useState(false);
  const isEven = idx % 2 === 0;
  return (
    <div style={{ display:'grid', gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr', gap:0, background:'#0A0A0A', border:'1px solid rgba(255,255,255,0.05)', overflow:'hidden', transition:'border-color .3s', ...(hov ? { borderColor:'rgba(201,168,76,0.2)' } : {}) }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="watch-row"
    >
      {/* Image side */}
      <div style={{ order: isEven ? 0 : 1, position:'relative', minHeight:320, background:'#111', overflow:'hidden' }}>
        <Image src={watch.img} alt={watch.name} fill
          style={{ objectFit:'cover', transition:'transform .8s', transform: hov ? 'scale(1.04)' : 'scale(1)' }}
          sizes="50vw"
          onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
        />
        {/* Dark overlay */}
        <div style={{ position:'absolute', inset:0, background: isEven ? 'linear-gradient(to right,transparent 60%,rgba(10,10,10,0.8))' : 'linear-gradient(to left,transparent 60%,rgba(10,10,10,0.8))' }} />
      </div>
      {/* Content side */}
      <div style={{ order: isEven ? 1 : 0, padding:'48px 44px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <p style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)', marginBottom:12 }}>{watch.brand}</p>
        <h3 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(22px,3vw,34px)', fontWeight:300, color:'#fff', lineHeight:1.2, marginBottom:16, letterSpacing:'0.01em' }}>{watch.name}</h3>
        <div style={{ width: hov ? 48 : 28, height:1, background:'#C9A84C', marginBottom:18, transition:'width .4s ease' }} />
        <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.8, marginBottom:24, fontWeight:300 }}>{watch.desc}</p>
        {/* Price */}
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <span style={{ fontFamily:'Georgia,serif', fontSize:16, color:'#C9A84C', letterSpacing:'0.04em' }}>{watch.price}</span>
          <Link href={`/jewellery/watches/${watch.slug}`}
            style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', border:'1px solid rgba(201,168,76,0.35)', padding:'7px 16px', transition:'all .25s' }}
            onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#080808'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
          >Read More →</Link>
        </div>
      </div>
    </div>
  );
}

// ── STORY CARD ─────────────────────────────────────────────────────
function StoryCard({ story }: { story: Story }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/jewellery/stories/${story.slug}`}
      style={{ display:'block', textDecoration:'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position:'relative', paddingBottom:'58%', background:'#111', overflow:'hidden', marginBottom:18 }}>
        <Image src={story.img} alt={story.title} fill
          style={{ objectFit:'cover', transition:'transform .7s', transform: hov ? 'scale(1.05)' : 'scale(1)', filter: hov ? 'brightness(1)' : 'brightness(0.8)' }}
          sizes="25vw"
          onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
        />
        {/* Category badge */}
        <span style={{ position:'absolute', top:14, left:14, fontSize:8, letterSpacing:'0.22em', textTransform:'uppercase', color:'#C9A84C', background:'rgba(8,8,8,0.88)', padding:'5px 10px', border:'1px solid rgba(201,168,76,0.25)' }}>
          {story.category}
        </span>
      </div>
      {/* Text */}
      <div style={{ width: hov ? 36 : 20, height:1, background:'#C9A84C', marginBottom:12, transition:'width .35s' }} />
      <h4 style={{ fontFamily:'Georgia,serif', fontSize:17, fontWeight:400, color: hov ? '#C9A84C' : '#fff', lineHeight:1.35, marginBottom:10, letterSpacing:'0.01em', transition:'color .3s', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
        {story.title}
      </h4>
      <p style={{ fontSize:12, color:'rgba(255,255,255,0.38)', lineHeight:1.7, marginBottom:12, fontWeight:300, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
        {story.excerpt}
      </p>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)' }}>By {story.author}</span>
        <span style={{ fontSize:9, color:'rgba(255,255,255,0.25)', letterSpacing:'0.06em' }}>{story.date} · {story.readTime} min</span>
      </div>
    </Link>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────
export default function JewelleryWatchesPage() {
  return (
    <>
      <Navbar />

      <main style={{ background:'#080808', color:'#fff', fontFamily:'system-ui,sans-serif' }}>

        {/* ══ HERO ════════════════════════════════════════════════ */}
        <section style={{ position:'relative', height:'100vh', minHeight:700, maxHeight:960, overflow:'hidden', background:'#080808' }}>
          {/* Hero image — path set to Jewellery.png as requested */}
          <Image
            src="/images/Jewellery.png"
            alt="Jewellery & Watches"
            fill priority
            style={{ objectFit:'cover', objectPosition:'center' }}
            quality={95}
          />

          {/* Rich layered overlays */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.15) 40%, rgba(8,8,8,0.75) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 50%)' }} />

          {/* Decorative diagonal gold line */}
          <div style={{ position:'absolute', top:0, right:'30%', width:1, height:'100%', background:'linear-gradient(to bottom,transparent 0%,rgba(201,168,76,0.12) 40%,rgba(201,168,76,0.25) 60%,transparent 100%)', transform:'rotate(8deg)', transformOrigin:'top center' }} />

          {/* Content — left aligned */}
          <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 80px 100px', maxWidth:780 }}>
            {/* Eyebrow */}
            <p style={{ fontSize:9, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,168,76,0.65)', marginBottom:16, animation:'jwlFadeUp .9s .1s ease both' }}>SM Luxury · Collections</p>
            {/* Title */}
            <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(48px,7vw,92px)', fontWeight:300, color:'#FAF7F0', lineHeight:1.05, marginBottom:24, letterSpacing:'0.01em', animation:'jwlFadeUp .9s .2s ease both' }}>
              Jewellery<br />&amp; <em style={{ color:'#C9A84C', fontStyle:'italic' }}>Watches</em>
            </h1>
            {/* Gold divider */}
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20, animation:'jwlFadeUp .9s .3s ease both' }}>
              <div style={{ width:56, height:1, background:'rgba(201,168,76,0.5)' }} />
              <SMLogo size={18} />
              <div style={{ width:24, height:1, background:'rgba(201,168,76,0.3)' }} />
            </div>
            {/* Tagline */}
            <p style={{ fontFamily:'Georgia,serif', fontSize:'clamp(16px,2vw,22px)', color:'rgba(250,247,240,0.65)', fontWeight:300, fontStyle:'italic', letterSpacing:'0.04em', marginBottom:36, animation:'jwlFadeUp .9s .38s ease both' }}>
              Timeless assets. Enduring style.
            </p>
            {/* CTAs */}
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', animation:'jwlFadeUp .9s .46s ease both' }}>
              <a href="#bridal"
                style={{ fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#080808', background:'#C9A84C', padding:'14px 32px', textDecoration:'none', fontWeight:600, transition:'background .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background='#DFC27A'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#C9A84C'; }}
              >Explore Bridal</a>
              <a href="#watches"
                style={{ fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#C9A84C', background:'transparent', border:'1px solid rgba(201,168,76,0.45)', padding:'14px 32px', textDecoration:'none', transition:'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(201,168,76,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}
              >Watch Spotlights</a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position:'absolute', bottom:36, right:40, zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.4)', writingMode:'vertical-rl' }}>Scroll</span>
            <div style={{ width:1, height:48, background:'linear-gradient(to bottom,rgba(201,168,76,0.5),transparent)' }} />
          </div>
        </section>

        <style>{`
          @keyframes jwlFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          @media(max-width:767px){
            .jwl-bridal-grid  { grid-template-columns:repeat(2,1fr)!important }
            .jwl-brands-grid  { grid-template-columns:1fr!important }
            .jwl-stories-grid { grid-template-columns:1fr!important }
            .watch-row        { grid-template-columns:1fr!important }
            .jwl-hero-pad     { padding:0 24px 72px!important }
          }
          @media(min-width:768px) and (max-width:1023px){
            .jwl-brands-grid  { grid-template-columns:repeat(2,1fr)!important }
            .jwl-stories-grid { grid-template-columns:repeat(2,1fr)!important }
          }
        `}</style>

        {/* ══ INTRO STRIP ═════════════════════════════════════════ */}
        <div style={{ background:'#0D0D0D', borderTop:'1px solid rgba(201,168,76,0.12)', borderBottom:'1px solid rgba(201,168,76,0.12)' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'32px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
            {['Bridal Jewellery','Fine Jewellery Brands','Watch Spotlights','Heritage Stories'].map((label, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                {i > 0 && <div style={{ width:1, height:20, background:'rgba(201,168,76,0.15)' }} />}
                <span style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ BRIDAL JEWELLERY ════════════════════════════════════ */}
        <section id="bridal" style={{ padding:'96px 0 80px' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 40px' }}>
            {/* Header */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'flex-end', marginBottom:48, borderBottom:'1px solid rgba(255,255,255,0.06)', paddingBottom:24 }}>
              <div>
                <p style={{ fontSize:9, letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:10 }}>For the Bride</p>
                <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(28px,4vw,52px)', fontWeight:300, color:'#fff', letterSpacing:'0.01em', margin:0 }}>Bridal Jewellery</h2>
              </div>
              <a href="#brands" style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', border:'1px solid rgba(201,168,76,0.3)', padding:'10px 20px', transition:'all .2s', whiteSpace:'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#080808'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
              >View All →</a>
            </div>

            {/* 4-col portrait grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:3 }} className="jwl-bridal-grid">
              {BRIDAL_COLLECTIONS.map(item => <BridalCard key={item.title} item={item} />)}
            </div>
          </div>
        </section>

        {/* ══ FINE JEWELLERY BRANDS ═══════════════════════════════ */}
        <section id="brands" style={{ padding:'80px 0', background:'#050505' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 40px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'flex-end', marginBottom:48, borderBottom:'1px solid rgba(255,255,255,0.05)', paddingBottom:24 }}>
              <div>
                <p style={{ fontSize:9, letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:10 }}>The Maisons</p>
                <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(28px,4vw,52px)', fontWeight:300, color:'#fff', letterSpacing:'0.01em', margin:0 }}>Fine Jewellery Brands</h2>
              </div>
              <a href="#watches" style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', border:'1px solid rgba(201,168,76,0.3)', padding:'10px 20px', transition:'all .2s', whiteSpace:'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#080808'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
              >All Brands →</a>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="jwl-brands-grid">
              {FINE_BRANDS.map(b => <BrandCard key={b.slug} brand={b} />)}
            </div>
          </div>
        </section>

        {/* ══ WATCH SPOTLIGHTS ════════════════════════════════════ */}
        <section id="watches" style={{ padding:'96px 0 80px', background:'#080808' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 40px' }}>
            <div style={{ marginBottom:56, borderBottom:'1px solid rgba(255,255,255,0.06)', paddingBottom:24 }}>
              <p style={{ fontSize:9, letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:10 }}>Horological Excellence</p>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(28px,4vw,52px)', fontWeight:300, color:'#fff', letterSpacing:'0.01em', margin:0 }}>Watch Spotlights</h2>
            </div>
            {/* Alternating left/right layout */}
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              {WATCH_SPOTLIGHTS.map((w, i) => <WatchCard key={w.slug} watch={w} idx={i} />)}
            </div>
          </div>
        </section>

        {/* ══ STORIES ═════════════════════════════════════════════ */}
        <section id="stories" style={{ padding:'96px 0 80px', background:'#0D0D0D' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 40px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'flex-end', marginBottom:52, borderBottom:'1px solid rgba(255,255,255,0.05)', paddingBottom:24 }}>
              <div>
                <p style={{ fontSize:9, letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:10 }}>Heritage &amp; Insight</p>
                <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(28px,4vw,52px)', fontWeight:300, color:'#fff', letterSpacing:'0.01em', margin:0 }}>Stories</h2>
              </div>
              <a href="#" style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', border:'1px solid rgba(201,168,76,0.3)', padding:'10px 20px', transition:'all .2s', whiteSpace:'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#080808'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; }}
              >All Stories →</a>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32 }} className="jwl-stories-grid">
              {STORIES.map(s => <StoryCard key={s.slug} story={s} />)}
            </div>
          </div>
        </section>

        {/* ══ CTA — Connect with Premium Brands ══════════════════ */}
        <section style={{ position:'relative', padding:'120px 40px', background:'#050505', overflow:'hidden' }}>
          {/* Decorative gold orbs */}
          <div style={{ position:'absolute', top:'50%', left:'10%', transform:'translateY(-50%)', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', top:'50%', right:'10%', transform:'translateY(-50%)', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(31,92,82,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />
          {/* Horizontal gold lines */}
          <div style={{ position:'absolute', top:'50%', left:0, right:0, height:1, background:'linear-gradient(to right,transparent,rgba(201,168,76,0.08) 30%,rgba(201,168,76,0.08) 70%,transparent)' }} />

          <div style={{ position:'relative', zIndex:2, maxWidth:720, margin:'0 auto', textAlign:'center' }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}><SMLogo size={52} /></div>
            <p style={{ fontSize:9, letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:18 }}>Premium Partnership</p>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(28px,4vw,52px)', fontWeight:300, color:'#fff', lineHeight:1.2, marginBottom:16, letterSpacing:'0.01em' }}>
              Connect with<br /><em style={{ color:'#C9A84C' }}>Premium Brands</em>
            </h2>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:24 }}>
              <div style={{ width:48, height:1, background:'rgba(201,168,76,0.3)' }} />
              <div style={{ width:5, height:5, borderRadius:'50%', background:'#C9A84C', opacity:0.6 }} />
              <div style={{ width:48, height:1, background:'rgba(201,168,76,0.3)' }} />
            </div>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', lineHeight:1.8, marginBottom:40, fontWeight:300 }}>
              We connect discerning collectors, bridal couples, and gifting connoisseurs with the world&apos;s most prestigious jewellery and watch maisons.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <a href="/contact"
                style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#080808', background:'#C9A84C', padding:'16px 40px', textDecoration:'none', fontWeight:600, transition:'background .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background='#DFC27A'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#C9A84C'; }}
              >Get in Touch</a>
              <a href="/jewellery"
                style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A84C', background:'transparent', border:'1px solid rgba(201,168,76,0.4)', padding:'16px 40px', textDecoration:'none', transition:'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.background='rgba(201,168,76,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.4)'; e.currentTarget.style.background='transparent'; }}
              >Browse Collections</a>
            </div>
          </div>
        </section>

        {/* ══ FOOTER STRIP ════════════════════════════════════════ */}
        <div style={{ background:'#080808', borderTop:'1px solid rgba(201,168,76,0.1)', padding:'28px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <SMLogo size={24} />
            <span style={{ fontFamily:'Georgia,serif', fontSize:13, color:'rgba(201,168,76,0.4)', letterSpacing:'0.15em' }}>SM Luxury · Jewellery &amp; Watches</span>
          </div>
          <div style={{ display:'flex', gap:24 }}>
            {['Bridal','Fine Brands','Watch Spotlights','Stories'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`}
                style={{ fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.3)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color='#C9A84C')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color='rgba(201,168,76,0.3)')}
              >{l}</a>
            ))}
          </div>
          <Link href="/" style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.35)', textDecoration:'none', transition:'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color='#C9A84C')}
            onMouseLeave={e => (e.currentTarget.style.color='rgba(201,168,76,0.35)')}
          >← Back to SM Luxury</Link>
        </div>

      </main>
    </>
  );
}