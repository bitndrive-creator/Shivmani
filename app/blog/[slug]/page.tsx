'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';

// ── TYPES ──────────────────────────────────────────────────────
interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  tags?: string[];
}

interface Category {
  name: string;
  slug: string;
  icon: string;
}

// ── CATEGORIES (blueprint ke hisab se) ────────────────────────
const CATEGORIES: Category[] = [
  { name: 'Real Estate',         slug: 'real-estate',      icon: '🏛️' },
  { name: 'Automobiles',         slug: 'automobiles',       icon: '🚗' },
  { name: 'Jewellery & Watches', slug: 'jewellery-watches', icon: '💎' },
  { name: 'Weddings',            slug: 'weddings',          icon: '✨' },
  { name: 'Curated Partners',    slug: 'curated-partners',  icon: '🤝' },
];

// ── NAV LINKS ──────────────────────────────────────────────────
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

// ── ALL POSTS (ILH categories) ─────────────────────────────────
const ALL_POSTS: Post[] = [
  {
    id: '1', slug: 'branded-residences-rise-india', category: 'Real Estate',
    title: 'Branded Residences Rise: How Global Luxury Hotels Are Redefining Indian Real Estate',
    excerpt: 'From Four Seasons to Ritz-Carlton, global hospitality giants are reimagining luxury living in India\'s most coveted addresses.',
    imageUrl: '/images/real-estate.jpg',
    author: 'Priya Mehta', publishedAt: 'April 28, 2026', readTime: 8, featured: true,
    tags: ['Branded Residences', 'Luxury Real Estate', 'India', 'Investment'],
    content: `<p>A decade ago, the concept of a branded residence — a private home managed by a world-class hotel group — barely registered in India's luxury property market. Today, it is the most coveted address category in the country, with waiting lists that stretch years and premiums that can reach 40% over comparable unbranded properties.</p>

<h2>What Is a Branded Residence?</h2>
<p>At its simplest, a branded residence is a privately owned home — apartment, villa, or penthouse — that is affiliated with and managed by a luxury hospitality brand. The association brings with it the hotel's service infrastructure: 24-hour concierge, housekeeping, in-room dining, spa and fitness access, and a standard of upkeep that no conventional residential management company can replicate.</p>

<blockquote>"The branded residence model appeals to a very specific buyer: someone who wants the privacy of ownership combined with the service culture of a five-star hotel. In India, that market has grown enormously in the last five years."</blockquote>

<h2>The India Story</h2>
<p>The Four Seasons Private Residences in Mumbai — one of the first branded residential projects of international scale in India — established the template. Buyers were not merely acquiring property; they were acquiring a relationship with one of the world's most recognised hospitality brands, with all the brand equity and service expectation that entails.</p>

<p>Since then, the market has expanded rapidly. Ritz-Carlton, Aman, and Six Senses have all announced or broken ground on residential projects in Indian cities and resort destinations. Alibaug, Goa, and Dehradun have emerged as particular hotspots, as wealthy buyers seek second-home solutions that require no management burden.</p>

<h2>The Investment Case</h2>
<p>The financial logic is compelling. Branded residences in comparable markets — Dubai, Miami, Singapore — have consistently outperformed unbranded luxury stock in both capital appreciation and rental yield. India's market, at an earlier stage of maturity, offers the additional upside of category growth. Those who entered the Mumbai Four Seasons project at launch have seen values appreciate by over 85% in eight years.</p>

<p>The risk, as with all early-stage luxury categories, lies in developer execution. Not all branded partnerships are equal; some are licensing arrangements with limited operational involvement from the hotel brand. Buyers should scrutinise the nature of the management agreement, the operator's track record, and the developer's financial standing before committing.</p>`,
  },
  {
    id: '2', slug: 'best-second-home-markets-india-2026', category: 'Real Estate',
    title: 'The Best Second-Home Markets in India for 2026',
    excerpt: 'From Alibaug to Kasauli, where India\'s ultra-affluent are investing in their next great escape.',
    imageUrl: '/images/hero-home.jpg',
    author: 'Rahul Singhania', publishedAt: 'April 24, 2026', readTime: 6,
    tags: ['Second Homes', 'India', 'Real Estate', 'Investment'],
    content: `<p>The second-home market in India has matured considerably in the post-pandemic years. What was once a category dominated by inherited farmhouses and unremarkable hill-station bungalows has been transformed by a new generation of buyers who expect the same design standards, amenities, and service infrastructure in their weekend retreats as in their primary residences.</p>

<h2>Alibaug: Mumbai's Premier Escape</h2>
<p>Two hours from Mumbai by road, ninety minutes by Ro-Pax ferry, Alibaug has established itself as the definitive luxury second-home destination for the city's wealthy. The best developments — Ekistics' managed villas, several boutique residential projects by Mumbai architects — command prices that would not seem out of place in South Mumbai. The draw is simple: proximity to the city, access to the sea, and a community of like-minded owners.</p>

<h2>Kasauli & Mashobra: The Himachal Revival</h2>
<p>The Himachal Pradesh hills have long attracted Delhi buyers seeking respite from the capital's heat. What has changed is the quality of the product available. New developments in Kasauli, Mashobra, and the Chail area now offer contemporary architecture, hotel-standard amenities, and — crucially — year-round access roads that make winter visits practical.</p>

<blockquote>"The best second-home investment is one that you will actually use. Alibaug works for Mumbai; Kasauli works for Delhi. The mistake is buying somewhere beautiful but inaccessible."</blockquote>

<h2>Goa: Beyond the Season</h2>
<p>Goa's luxury property market has shed its seasonal character. The best private villas, particularly in the quieter northern belt between Assagao and Saligao, attract buyers who use them year-round and generate rental income from the state's growing base of long-stay premium visitors. The architectural language has also evolved; the best new projects draw on Goa's Portuguese heritage rather than ignoring it.</p>`,
  },
  {
    id: '3', slug: 'rolls-royce-spectre-india-launch', category: 'Automobiles',
    title: 'Rolls-Royce Spectre Arrives in India: The First All-Electric Ultra-Luxury Car',
    excerpt: 'Silent, powerful, and unmistakably Rolls-Royce. We drive the Spectre on India\'s most scenic roads.',
    imageUrl: '/images/automobiles.jpg',
    author: 'Vikram Oberoi', publishedAt: 'April 22, 2026', readTime: 7,
    tags: ['Rolls-Royce', 'Electric', 'Luxury Cars', 'India'],
    content: `<p>The Rolls-Royce Spectre does not announce itself. There is no engine note to herald its arrival, no mechanical drama to mark its departure. It arrives, and it departs, in a silence so profound that it reframes what luxury automotive travel can mean. That, in essence, is the Spectre's thesis: that the next evolution of ultra-luxury motoring is not louder, more powerful, or more theatrical — it is quieter, more refined, and more complete than anything that came before it.</p>

<h2>The Indian Context</h2>
<p>Rolls-Royce has confirmed strong demand for the Spectre from Indian buyers, with deliveries commencing across Mumbai, Delhi, and Bengaluru. The price — approximately ₹7.5 crore ex-showroom before customisation — positions it squarely in the marque's existing range, neither a premium over the Ghost nor a significant discount versus the Cullinan.</p>

<blockquote>"In India, the Spectre will find buyers who are already Rolls-Royce owners and who appreciate the brand's decision to evolve. It is not for everyone. But then, nothing with a Spirit of Ecstasy on the bonnet ever was."</blockquote>

<h2>On the Road</h2>
<p>We drove the Spectre on a route from Udaipur to Jodhpur — chosen for its combination of heritage setting and varied road conditions. The 577bhp dual-motor powertrain dispatches the considerable 2,975kg kerbweight with a serenity that the numbers cannot convey. Acceleration is not sudden; it is inexorable. The car simply moves faster, as if physics has been persuaded rather than conquered.</p>

<p>The cabin is the Spectre's finest achievement. Without an engine to generate noise and vibration, the engineers have had to confront the car's acoustics at a fundamental level. Every seal, every panel, every surface has been designed to silence the world outside. The result is an interior environment unlike any other car — not quiet in the way that a padded room is quiet, but calm in the way that a great building is calm. It is a controlled, purposeful stillness.</p>`,
  },
    
    {
    id: '9', slug: 'oberoi-group-curated-partner-spotlight', category: 'Curated Partners',
    title: 'Partner Spotlight: The Oberoi Group — Redefining Luxury Hospitality in India',
    excerpt: 'From New Delhi to Udaipur, the Oberoi Group has long set the standard for luxury hospitality. We go inside the legend.',
    imageUrl: '/images/hero-partners.jpg',
    author: 'Ritu Sharma', publishedAt: 'April 2, 2026', readTime: 6,
    tags: ['Oberoi Group', 'Luxury Hotels', 'India', 'Hospitality'],
    content: `<p>There is a reason that experienced luxury travellers — the kind who have stayed at Aman, at COMO, at Rosewood — consistently rate their Oberoi experiences among the finest they have had anywhere in the world. The Oberoi Group has, over decades, developed a service culture so deeply embedded in its operations that it functions as a kind of institutional instinct: an orientation toward the guest's comfort and delight that does not require a management manual to perpetuate itself.</p>

<h2>The Properties</h2>
<p>The Oberoi, New Delhi — recently reimagined by the group — represents the template at its most refined: a property that is simultaneously a landmark of its city and a sanctuary from it. The guest rooms and suites achieve the balance that eludes so many luxury hotels: they are grand without being imposing, serene without being sterile, and so meticulously maintained that the question of upkeep simply never arises.</p>

<blockquote>"The Oberoi Group understands something that many luxury hotel companies have forgotten: that the guest's experience is the product. Not the architecture, not the Instagram moment, not the star count. The experience."</blockquote>

<h2>Wildflower Hall & The Mountain Properties</h2>
<p>Wildflower Hall, Shimla — perhaps the group's most romantic property — occupies a cedar forest above the town with views of the Himalayan range that stop conversation. The original building was the residence of Lord Kitchener; the current hotel, rebuilt in the late 1990s, captures the spirit of the Raj without its discomforts. It is, for many guests, the finest mountain hotel experience available anywhere in Asia.</p>

<h2>What Partnership Means</h2>
<p>For Indian Luxury House, partnership with the Oberoi Group represents an alignment of values as much as a commercial arrangement. Both organisations believe that luxury is defined by integrity — by the quality of what is offered and the honesty with which it is presented. In that spirit, we are proud to feature the Oberoi Group among our curated partners.</p>`,
  },


  {
    id: '5', slug: 'heritage-jewellery-trends-2026', category: 'Jewellery & Watches',
    title: 'Heritage Jewellery Trends Dominating India\'s Bridal Season in 2026',
    excerpt: 'Polki, Kundan, Jadau — the timeless crafts of India\'s royal courts are having their most spectacular moment yet.',
    imageUrl: '/images/Jewellery.png',
    author: 'Isha Thapar', publishedAt: 'April 15, 2026', readTime: 5,
    tags: ['Bridal Jewellery', 'Polki', 'Kundan', 'Indian Heritage'],
    content: `<p>Something significant has shifted in India's bridal jewellery market. The contemporary pieces — the geometric solitaires, the minimalist gold — have not disappeared, but they have been joined by a resurgence of something older, more intricate, and more deeply rooted in the subcontinent's extraordinary craft heritage. The great traditions of Polki, Kundan, and Jadau are not merely surviving; they are thriving, and they are doing so in new hands and for new reasons.</p>

<h2>The Polki Renaissance</h2>
<p>Polki — diamonds in their natural, uncut state, set in gold with traditional backing — has long been associated with the jewellery of Mughal courts and Rajputana palaces. Its revival among contemporary brides is partly aesthetic: the organic, slightly irregular quality of uncut diamonds creates a warmth and depth that faceted stones cannot replicate. It is also partly cultural — an assertion of Indian identity at one of life's most significant moments.</p>

<blockquote>"A Polki set done well is perhaps the most labour-intensive jewellery that exists anywhere in the world. Each stone is individually assessed, selected, and placed. The finest pieces represent hundreds of hours of human skill."</blockquote>

<h2>Kundan: Architecture for the Body</h2>
<p>Kundan work — in which gemstones are set into highly refined gold using a technique developed over centuries in Jaipur and Delhi — is experiencing parallel growth. The finest Kundan pieces from established houses like Tribhovandas Bhimji Zaveri and Hazoorilal achieve prices that rival comparable European fine jewellery, and they deserve to. The craft involved is extraordinary.</p>

<h2>Investment Logic</h2>
<p>Beyond aesthetics, there is a financial dimension to the heritage jewellery revival. Pieces by established masters hold their value in a way that fashion jewellery cannot. Several exceptional Polki sets that appeared at auction in 2024 sold at premiums of 40% or more above their reserve estimates, as collectors and brides-to-be competed for the finest examples.</p>`,
  },
   
  



  {
    id: '7', slug: 'destination-wedding-trends-2026', category: 'Weddings',
    title: 'Destination Wedding Trends Redefining India\'s Luxury Wedding Season',
    excerpt: 'From Rajasthan\'s heritage forts to Maldivian islands, India\'s elite are choosing destinations as extraordinary as their love stories.',
    imageUrl: '/images/hero-weddings.jpg',
    author: 'Ananya Birla', publishedAt: 'April 8, 2026', readTime: 6,
    tags: ['Destination Weddings', 'Luxury Weddings', 'India', 'Rajasthan'],
    content: `<p>India's luxury wedding market has never been more ambitious — or more demanding. The couples and families who are investing ₹10 crore, ₹25 crore, or significantly more in a wedding celebration are no longer satisfied with a beautiful venue and excellent catering. They are seeking an experience: something cinematic, immersive, and utterly unlike anything their guests have attended before.</p>

<h2>The Rajasthan Standard</h2>
<p>Rajasthan remains the destination against which all Indian wedding venues are measured. The state's heritage hotels — Umaid Bhawan Palace in Jodhpur, the Samode Palace, Taj Lake Palace in Udaipur — offer a combination of architectural grandeur, historical resonance, and operational sophistication that is genuinely irreplaceable. A wedding at one of these properties is not merely an event; it is an encounter with Indian history at one of its most magnificent expressions.</p>

<blockquote>"The most memorable weddings I have worked on share one quality: they feel inevitable. The venue, the aesthetic, the flow of the days — everything feels as if it could only have happened exactly this way, in exactly this place."</blockquote>

<h2>The International Turn</h2>
<p>A growing cohort of ultra-affluent Indian families is looking beyond the subcontinent entirely. The Amalfi Coast, Santorini, Bali, and the Maldives have all hosted significant Indian weddings in the past eighteen months. The logistical complexity is considerable — some families are hosting 500 or more guests at international venues — but the planners who specialise in this segment have developed the expertise to execute it seamlessly.</p>

<h2>The Micro-Wedding Counter-Trend</h2>
<p>Against this backdrop of escalating scale, a counter-trend has emerged: the intimate luxury wedding. Fifty guests, three days, an extraordinary private villa or heritage property, and a level of personalisation and quality that simply cannot be achieved at scale. For couples who prioritise depth of experience over breadth of attendance, this format is increasingly compelling.</p>`,
  },
//   {
//     id: '9', slug: 'oberoi-group-curated-partner-spotlight', category: 'Curated Partners',
//     title: 'Partner Spotlight: The Oberoi Group — Redefining Luxury Hospitality in India',
//     excerpt: 'From New Delhi to Udaipur, the Oberoi Group has long set the standard for luxury hospitality. We go inside the legend.',
//     imageUrl: '/images/hero-partners.jpg',
//     author: 'Ritu Sharma', publishedAt: 'April 2, 2026', readTime: 6,
//     tags: ['Oberoi Group', 'Luxury Hotels', 'India', 'Hospitality'],
//     content: `<p>There is a reason that experienced luxury travellers — the kind who have stayed at Aman, at COMO, at Rosewood — consistently rate their Oberoi experiences among the finest they have had anywhere in the world. The Oberoi Group has, over decades, developed a service culture so deeply embedded in its operations that it functions as a kind of institutional instinct: an orientation toward the guest's comfort and delight that does not require a management manual to perpetuate itself.</p>

// <h2>The Properties</h2>
// <p>The Oberoi, New Delhi — recently reimagined by the group — represents the template at its most refined: a property that is simultaneously a landmark of its city and a sanctuary from it. The guest rooms and suites achieve the balance that eludes so many luxury hotels: they are grand without being imposing, serene without being sterile, and so meticulously maintained that the question of upkeep simply never arises.</p>

// <blockquote>"The Oberoi Group understands something that many luxury hotel companies have forgotten: that the guest's experience is the product. Not the architecture, not the Instagram moment, not the star count. The experience."</blockquote>

// <h2>Wildflower Hall & The Mountain Properties</h2>
// <p>Wildflower Hall, Shimla — perhaps the group's most romantic property — occupies a cedar forest above the town with views of the Himalayan range that stop conversation. The original building was the residence of Lord Kitchener; the current hotel, rebuilt in the late 1990s, captures the spirit of the Raj without its discomforts. It is, for many guests, the finest mountain hotel experience available anywhere in Asia.</p>

// <h2>What Partnership Means</h2>
// <p>For Indian Luxury House, partnership with the Oberoi Group represents an alignment of values as much as a commercial arrangement. Both organisations believe that luxury is defined by integrity — by the quality of what is offered and the honesty with which it is presented. In that spirit, we are proud to feature the Oberoi Group among our curated partners.</p>`,
//   },
];

// ── ILH LOGO ──────────────────────────────────────────────────
function ILHLogo({ size = 32 }: { size?: number }) {
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

// ── HEADER ────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)', transition: 'background .4s', boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none' }}>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.7 }} />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
          <ILHLogo size={38} />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
            <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.45)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
          </div>
        </Link>
        <nav style={{ display: 'flex' }} className="ilh-blog-nav">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              style={{
                fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)',
                textDecoration: 'none', padding: '8px 10px',
                borderBottom: '1px solid transparent', transition: 'all .2s', whiteSpace: 'nowrap',
                ...(link.href === '/partner-with-us' ? { border: '1px solid rgba(201,168,76,0.3)', padding: '6px 10px', marginLeft: 4 } : {}),
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#DFC27A'; }}
              onMouseLeave={e => { e.currentTarget.style.color = link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)'; }}
            >{link.label}</Link>
          ))}
        </nav>
        <button className="ilh-blog-ham" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4, display: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>
      <div style={{ background: '#0A0A0A', overflow: 'hidden', maxHeight: open ? 560 : 0, transition: 'max-height .3s ease', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
            style={{ display: 'block', padding: '13px 28px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', transition: 'background .2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >{link.label}</Link>
        ))}
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
      <style>{`
        .ilh-blog-nav { display: flex !important; }
        .ilh-blog-ham { display: none !important; }
        @media(max-width:1100px){ .ilh-blog-nav { display: none !important; } .ilh-blog-ham { display: block !important; } }
      `}</style>
    </header>
  );
}

// ── RELATED CARD ──────────────────────────────────────────────
function RelatedCard({ post }: { post: Post }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/blog/${post.slug}`}
      style={{ display: 'block', textDecoration: 'none', background: hov ? '#F5F0E8' : '#FAFAF8', transition: 'background .2s', border: '1px solid rgba(0,0,0,0.06)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden', background: '#1A1A1A' }}>
        <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover', transition: 'transform .5s', transform: hov ? 'scale(1.05)' : 'scale(1)' }} sizes="33vw"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.85)', padding: '4px 10px', border: '1px solid rgba(201,168,76,0.2)' }}>{post.category}</span>
      </div>
      <div style={{ padding: '18px 20px 20px' }}>
        <div style={{ width: hov ? 32 : 16, height: 1, background: '#C9A84C', marginBottom: 12, transition: 'width .3s' }} />
        <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 16, fontWeight: 400, color: hov ? '#8B6914' : '#1A1A1A', lineHeight: 1.4, marginBottom: 10, transition: 'color .25s', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em' }}>{post.title}</h3>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)' }}>{post.author}</span>
      </div>
    </Link>
  );
}

// ── BLOG DETAIL PAGE ──────────────────────────────────────────
export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setReadProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const post = ALL_POSTS.find(p => p.slug === slug) ?? ALL_POSTS[0];
  const catMeta = CATEGORIES.find(c => c.name === post.category);
  const related = ALL_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  const moreRelated = related.length < 3
    ? [...related, ...ALL_POSTS.filter(p => p.id !== post.id && p.category !== post.category).slice(0, 3 - related.length)]
    : related;

  return (
    <>
      <Header />

      {/* Reading progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 200, background: 'rgba(201,168,76,0.12)' }}>
        <div style={{ height: '100%', background: '#C9A84C', width: `${readProgress}%`, transition: 'width .1s linear' }} />
      </div>

      <main style={{ paddingTop: 72 }}>

        {/* ── ARTICLE HERO ──────────────────────────── */}
        <section style={{ position: 'relative', height: 540, overflow: 'hidden', background: '#0A0A0A' }}>
          <Image src={post.imageUrl} alt={post.title} fill priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.18) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.3), transparent 60%)' }} />

          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', maxWidth: 1280, margin: '0 auto', padding: '0 48px 52px' }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
              >Home</Link>
              <span>/</span>
              <Link href={`/${catMeta?.slug ?? ''}`} style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
              >{post.category}</Link>
              <span>/</span>
              <span style={{ color: 'rgba(201,168,76,0.65)' }}>Article</span>
            </div>

            {/* Category badge */}
            <span style={{ display: 'inline-block', width: 'fit-content', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 14px', marginBottom: 20, backdropFilter: 'blur(4px)' }}>
              {catMeta?.icon} {post.category}
            </span>

            {/* Title */}
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(24px,5vw,52px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1.2, maxWidth: 840, marginBottom: 20, letterSpacing: '0.015em' }}>
              {post.title}
            </h1>

            {/* Meta */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)' }}>
              <span style={{ color: '#C9A84C', fontWeight: 500 }}>By {post.author}</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(201,168,76,0.3)', display: 'inline-block' }} />
              <span>{post.publishedAt}</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(201,168,76,0.3)', display: 'inline-block' }} />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </section>

        {/* ── ARTICLE BODY ──────────────────────────── */}
        <article style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 88px', background: '#FAFAF8' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 64, alignItems: 'flex-start' }} className="ilh-article-grid">

            {/* Main content */}
            <div>
              {/* Lead / excerpt */}
              <p style={{
                fontFamily: 'Georgia,serif', fontSize: 'clamp(18px,2.2vw,23px)', fontWeight: 300, fontStyle: 'italic',
                color: '#8B6914', lineHeight: 1.7, marginBottom: 44, paddingBottom: 44,
                borderBottom: '1px solid rgba(201,168,76,0.15)', letterSpacing: '0.01em',
              }}>{post.excerpt}</p>

              {/* Article content */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ marginTop: 52, paddingTop: 32, borderTop: '1px solid rgba(201,168,76,0.12)', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.45)', marginRight: 6 }}>Tags:</span>
                  {post.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B6558', background: '#F0EBE0', border: '1px solid rgba(201,168,76,0.15)', padding: '5px 12px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author card */}
              <div style={{ marginTop: 52, padding: '26px 30px', background: '#F5F0E8', borderLeft: '3px solid #C9A84C', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#C9A84C', fontWeight: 300 }}>
                    {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 6 }}>Written by</p>
                  <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 300, color: '#1A1A1A', marginBottom: 6, letterSpacing: '0.02em' }}>{post.author}</p>
                  <p style={{ fontSize: 12, color: '#6B6558', lineHeight: 1.7, letterSpacing: '0.01em' }}>
                    Senior contributor to Indian Luxury House, specialising in {post.category.toLowerCase()} and the culture of connoisseurship.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div style={{ position: 'sticky', top: 92, display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* More in category */}
                <div style={{ border: '1px solid rgba(201,168,76,0.14)', padding: '20px' }}>
                  <p style={{ fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    More in {post.category}
                  </p>
                  {moreRelated.map(p => (
                    <Link key={p.id} href={`/blog/${p.slug}`}
                      style={{ display: 'flex', gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(201,168,76,0.08)', textDecoration: 'none' }}
                      className="ilh-sidebar-link"
                    >
                      <div style={{ position: 'relative', width: 72, height: 56, flexShrink: 0, overflow: 'hidden', background: '#1A1A1A' }}>
                        <Image src={p.imageUrl} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="72px"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 5 }}>{p.category}</p>
                        <p style={{ fontFamily: 'Georgia,serif', fontSize: 13, color: '#1A1A1A', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em' }}>{p.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Newsletter */}
                <div style={{ background: '#0A0A0A', padding: '26px 20px', textAlign: 'center', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <ILHLogo size={32} />
                  <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 300, color: '#FAFAF8', margin: '14px 0 6px', letterSpacing: '0.02em' }}>India&apos;s Luxury Circle</p>
                  <p style={{ fontSize: 11, color: 'rgba(201,168,76,0.45)', marginBottom: 18, lineHeight: 1.65, letterSpacing: '0.02em' }}>Curated luxury intelligence, every week.</p>
                  <input type="email" placeholder="your@email.com"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: '#DFC27A', fontSize: 11, padding: '10px 12px', outline: 'none', fontFamily: 'inherit', marginBottom: 10, boxSizing: 'border-box' }}
                  />
                  <button style={{ width: '100%', background: '#C9A84C', color: '#0A0A0A', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, padding: '12px', border: 'none', cursor: 'pointer', transition: 'background .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
                  >Join the Circle</button>
                </div>

                {/* Partner CTA */}
                <div style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '20px', background: '#F5F0E8' }}>
                  <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>For Businesses</p>
                  <p style={{ fontFamily: 'Georgia,serif', fontSize: 15, fontWeight: 400, color: '#1A1A1A', marginBottom: 8, lineHeight: 1.35 }}>Reach India&apos;s Luxury Audience</p>
                  <p style={{ fontSize: 11, color: '#6B6558', lineHeight: 1.65, marginBottom: 16 }}>Feature your brand in front of India&apos;s most affluent readers.</p>
                  <Link href="/partner-with-us"
                    style={{ display: 'block', textAlign: 'center', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1A1A1A', background: '#C9A84C', padding: '11px 16px', textDecoration: 'none', fontWeight: 700, transition: 'background .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#DFC27A'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; }}
                  >Partner With Us →</Link>
                </div>

                {/* Share */}
                <div style={{ border: '1px solid rgba(201,168,76,0.14)', padding: '16px 20px' }}>
                  <p style={{ fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: 12 }}>Share This Story</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['Instagram', 'LinkedIn', 'Copy Link'].map(s => (
                      <button key={s}
                        style={{ flex: 1, fontSize: 8, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 4px', border: '1px solid rgba(201,168,76,0.2)', color: '#6B6558', background: 'transparent', cursor: 'pointer', transition: 'all .2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; e.currentTarget.style.background = '#C9A84C'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.color = '#6B6558'; e.currentTarget.style.background = 'transparent'; }}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* ── RELATED POSTS ─────────────────────────── */}
        <section style={{ background: '#F0EBE0', padding: '64px 0', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 18 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8 }}>Continue Reading</p>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '0.01em' }}>You May Also Enjoy</h2>
              </div>
              <Link href={`/${catMeta?.slug ?? ''}`}
                style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.35)', paddingBottom: 2 }}>
                All {post.category} →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ilh-related-grid">
              {moreRelated.map(p => <RelatedCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '52px 32px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ILHLogo size={36} />
              <div>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: 15, color: '#DFC27A', letterSpacing: '0.28em' }}>INDIAN</div>
                <div style={{ fontSize: 7, color: 'rgba(201,168,76,0.35)', letterSpacing: '0.4em', marginTop: 2 }}>LUXURY HOUSE</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => (
                <Link key={c.slug} href={`/${c.slug}`}
                  style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.38)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#DFC27A')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.38)')}
                >{c.name}</Link>
              ))}
            </div>
            <a href="mailto:hello@indianluxuryhouse.com"
              style={{ fontSize: 11, color: 'rgba(201,168,76,0.45)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color .2s' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C9A84C')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(201,168,76,0.45)')}
            >hello@indianluxuryhouse.com</a>
          </div>
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.18),transparent)', marginBottom: 22 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} Indian Luxury House. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Instagram', 'LinkedIn', 'Privacy Policy', 'Terms'].map(l => (
                <a key={l} href="#" style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color .2s' }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.16)')}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media(max-width:900px){
          .ilh-article-grid { grid-template-columns: 1fr !important; }
          .ilh-related-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:600px){
          .ilh-related-grid { grid-template-columns: 1fr !important; }
        }
        article p {
          font-size: 16px; line-height: 1.92; color: #3a3834;
          margin-bottom: 24px; letter-spacing: 0.01em;
          font-family: Georgia, serif; font-weight: 300;
        }
        article h2 {
          font-family: Georgia, serif; font-size: clamp(22px,2.5vw,30px);
          font-weight: 300; color: #1A1A1A; margin: 48px 0 18px;
          line-height: 1.2; letter-spacing: 0.02em;
        }
        article h3 {
          font-family: Georgia, serif; font-size: clamp(18px,2vw,24px);
          font-weight: 400; color: #1A1A1A; margin: 36px 0 14px; letter-spacing: 0.01em;
        }
        article blockquote {
          border-left: 3px solid #C9A84C; padding: 18px 28px; margin: 40px 0;
          font-family: Georgia, serif; font-size: clamp(18px,2vw,22px);
          font-style: italic; color: #8B6914; line-height: 1.65;
          letter-spacing: 0.01em; background: rgba(201,168,76,0.04);
        }
        article strong { font-weight: 500; color: #1A1A1A; }
        .ilh-sidebar-link:last-child { border-bottom: none !important; margin-bottom: 0 !important; padding-bottom: 0 !important; }
      `}</style>
    </>
  );
}


// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect, use } from 'react';

// // ── TYPES ──────────────────────────────────────────────────────
// interface Post {
//   id: string;
//   title: string;
//   slug: string;
//   category: string;
//   excerpt: string;
//   content: string;
//   imageUrl: string;
//   author: string;
//   publishedAt: string;
//   readTime: number;
//   featured?: boolean;
//   tags?: string[];
// }

// interface Category {
//   name: string;
//   slug: string;
//   emoji: string;
//   description: string;
//   accentColor: string;
// }

// // ── DATA ───────────────────────────────────────────────────────
// const CATEGORIES: Category[] = [
//   { name: 'Cars',         slug: 'cars',       emoji: '🚗', description: 'The finest machines on four wheels',          accentColor: '#C9A84C' },
//   { name: 'Yachts',       slug: 'yachts',     emoji: '⛵', description: 'Life on the open water',                      accentColor: '#5FA8D4' },
//   { name: 'Watches',      slug: 'watches',    emoji: '⌚', description: 'Mechanical artistry on your wrist',           accentColor: '#D4B483' },
//   { name: 'Style',        slug: 'style',      emoji: '👔', description: 'Dressing the modern connoisseur',             accentColor: '#C4A8D4' },
//   { name: 'Home',         slug: 'home',       emoji: '🏛️', description: 'Architecture and interior excellence',        accentColor: '#8DC48D' },
//   { name: 'Food & Drink', slug: 'food-drink', emoji: '🍾', description: 'Gastronomy and the art of drinking',          accentColor: '#D48888' },
//   { name: 'Travel',       slug: 'travel',     emoji: '✈️', description: "The world's most extraordinary destinations", accentColor: '#88B0D4' },
// ];

// const ALL_POSTS: Post[] = [
//   {
//     id: '1', slug: 'ferrari-laferrari-aperta-final-edition', category: 'Cars',
//     title: 'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12',
//     excerpt: 'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.',
//     imageUrl: '/images/placeholder-car.jpg',
//     author: 'Alessandro Greco', publishedAt: 'April 10, 2026', readTime: 8, featured: true,
//     tags: ['Ferrari', 'Supercar', 'V12', 'Hypercar'],
//     content: `<p>The cabin greets you with the unmistakable scent of Connolly leather and barely-cooled carbon fibre. Every surface, every control, every stitch has been considered and reconsidered by engineers and craftsmen who will never accept "good enough." As you lower yourself into the seat, Ferrari has made one thing perfectly clear: this is not a car designed for the road. The road is merely where it happens to operate.</p>

// <h2>The Engine</h2>
// <p>The 6.5-litre naturally aspirated V12, paired with a 163bhp hybrid electric motor, produces 963 horsepower. On paper, the number is extraordinary. In practice, it is almost beside the point. What matters is the way this power manifests — not as a violent, turbocharged surge, but as a seamless, impossibly linear crescendo that builds from idle to the 9,250rpm limiter with an intensity that no amount of preparation can adequately brace you for.</p>

// <blockquote>"There are fast cars. There are beautiful cars. And then there is this — a machine so singular in purpose and execution that it transcends the category entirely."</blockquote>

// <p>Ferrari engineers speak of the powertrain not as two separate systems working in concert, but as a single, unified expression of force. The electric motor fills the brief gap below 3,500rpm where the V12 is merely warming up; above that threshold, both systems combine in a wave of acceleration that compresses time and stretches space in equal measure.</p>

// <h2>On Track at Fiorano</h2>
// <p>The experience at Ferrari's private Fiorano circuit is genuinely humbling. The carbon-ceramic brakes — upgraded significantly for the Final Edition — haul the car from 200km/h in a distance that seems physically impossible. The active aerodynamics shift the car's balance mid-corner with a precision that no human hand could replicate. And yet, remarkably, the car communicates. It speaks through the steering, through the seat, through every vibration of its carbon-fibre monocoque, telling you exactly what it is doing and what it needs.</p>

// <h2>The Verdict</h2>
// <p>At €3.8 million, the LaFerrari Aperta Final Edition is simultaneously the most expensive and the most entirely justified automotive purchase of 2026. Seventy will be built. All are already sold. Those who missed it will spend the rest of their lives regretting it. Those who secured one will spend the rest of their lives trying to find words for what it feels like to drive it.</p>

// <p>Some machines are defined by their specifications. This one is defined by what it does to the person behind the wheel. And that, ultimately, is the only measure that matters.</p>`,
//   },
//   {
//     id: '2', slug: 'patek-philippe-5711-value-2026', category: 'Watches',
//     title: 'Patek Philippe 5711: Why It Still Commands Six Figures in 2026',
//     excerpt: "Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.",
//     imageUrl: '/images/placeholder-watch.jpg',
//     author: 'M. Laurent', publishedAt: 'April 8, 2026', readTime: 6,
//     tags: ['Patek Philippe', 'Nautilus', 'Investment', 'Swiss Watches'],
//     content: `<p>When Patek Philippe announced the discontinuation of the Nautilus reference 5711/1A-010 in January 2021, the watchmaking world held its breath. The expectation — shared by many collectors and analysts — was that the secondary market would eventually stabilise as demand found a new equilibrium. Five years later, that stabilisation has yet to materialise.</p>

// <h2>The Numbers</h2>
// <p>Today, a 5711/1A-010 in stainless steel with the iconic blue dial commands between €140,000 and €180,000 at auction — approximately six times its last retail price of roughly €30,000. The more exotic variants, including the olive green dial released in 2021 and the white dial in stainless, regularly exceed €300,000 at Christie's and Phillips.</p>

// <blockquote>"The 5711 is not merely a watch. It is a masterclass in the economics of desire — proof that scarcity and artistry, combined in the right proportions, create something that transcends monetary value."</blockquote>

// <h2>What Makes It Irreplaceable</h2>
// <p>At its heart is the calibre 324 S C, a self-winding movement beating at 28,800 vibrations per hour, offering 45 hours of power reserve. The technical specifications, while impeccable, do not explain the 5711's hold on collectors. What explains it is the integrated bracelet — designed by Gérald Genta in 1974 — and the porthole-inspired case that remains, five decades on, one of the most harmonious objects in watchmaking.</p>

// <p>The horizontally embossed dial, the applied indices, the alternating brushed and polished surfaces of the bracelet: these are the details that reward close inspection, and that photograph differently in every light. This is a watch that reveals itself slowly, over years of wearing.</p>

// <h2>Should You Buy One?</h2>
// <p>The question collectors increasingly ask is not whether the 5711 is worth its current price, but whether it will hold that price in the years ahead. The honest answer is that no one knows. What is certain is that the combination of Genta's design, Patek's craftsmanship, and the watch's cultural moment makes it unlike anything else available — at any price.</p>`,
//   },
//   {
//     id: '3', slug: 'benetti-107-mediterranean-week', category: 'Yachts',
//     title: 'Aboard the Benetti 107: A Week in the Mediterranean',
//     excerpt: '107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.',
//     imageUrl: '/images/placeholder-yacht.jpg',
//     author: 'R. Voss', publishedAt: 'April 6, 2026', readTime: 10,
//     tags: ['Benetti', 'Superyacht', 'Mediterranean', 'Charter'],
//     content: `<p>The moment you step aboard via the fold-down beach club — teak warm under bare feet, the Ligurian Sea a shade of blue that no photograph has ever quite captured — something shifts. The urgency of shore: the emails, the meetings, the relentless connectivity, simply ceases to matter. The Benetti 107 has that effect. It is not magic. It is engineering of the highest order, applied to the oldest human desire: escape.</p>

// <h2>Design & Interior</h2>
// <p>The main saloon is pure Italian restraint. Warm teak panelling on the bulkheads. Cashmere sofas in a shade that designers might call "morning sand." A Bösendorfer grand piano in the forward corner, which our party's owner plays after dinner with a facility that suggests considerably more practice than he admits to. The interior was designed by the owner's chosen studio; the execution was Benetti's craftsmen in Livorno, and the standard is flawless.</p>

// <blockquote>"Somewhere between Monaco and Portofino, watching the sun set over the Ligurian hills, I understood why some people give up everything for this life."</blockquote>

// <h2>Life Aboard</h2>
// <p>The 750-square-metre sundeck hosts alfresco dining for twelve with room to spare. Below, the beach club converts in under three minutes to a dive platform, a paddleboard launch, or a sea-level swimming platform depending on what the mood demands. The provisioning is handled by a Michelin-trained private chef from Lyon, whose understanding of what constitutes breakfast in the Mediterranean — fresh-caught sea bream, ripe tomatoes, bread from a baker in the last port — reduces every meal to an event.</p>

// <p>A week aboard the Benetti 107, travelling the triangle from Monaco to Portofino to the Cinque Terre and back, costs approximately €280,000 in charter fees exclusive of expenses. It is, by any conventional measure, an absurd sum. By any other measure, it is the best money you will ever spend.</p>`,
//   },
//   {
//     id: '11', slug: 'maldives-vs-seychelles-2026', category: 'Travel',
//     title: 'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026',
//     excerpt: 'Two island paradises, two entirely different philosophies. Our editors have stayed at both.',
//     imageUrl: '/images/placeholder-travel.jpg',
//     author: 'P. Black', publishedAt: 'March 30, 2026', readTime: 7,
//     tags: ['Maldives', 'Seychelles', 'Luxury Travel', 'Islands'],
//     content: `<p>The question comes up every season, asked with the earnest desperation of someone who has already spent too long on Google and not enough time making a decision: Maldives or Seychelles? Our answer has changed over the years. In 2026, after extended stays at six properties across both destinations, it has changed again.</p>

// <h2>The Maldives Case</h2>
// <p>The Maldives remains unrivalled for a specific kind of luxury: the private, the curated, the controlled. The overwater villa experience — breakfast delivered by boat, a glass floor above the reef, a snorkel dropped directly into the Indian Ocean from your own deck — has no genuine equivalent anywhere else on earth. The best properties, among them Cheval Blanc Randheli and Soneva Jani, have refined this formula to something close to perfection.</p>

// <blockquote>"Both destinations will change you. The question is which kind of change you need."</blockquote>

// <h2>The Seychelles Case</h2>
// <p>The Seychelles offers something the Maldives cannot: wildness. Félicité Island, the Vallée de Mai on Praslin, the granite boulders of Anse Source d'Argent — these are places that feel genuinely untamed, where the luxury is contextual rather than constructed. The best properties here, particularly North Island and Six Senses Zil Pasyon, understand that the landscape is the product, and build accordingly.</p>

// <h2>Our Verdict for 2026</h2>
// <p>For a honeymoon, an anniversary, or any trip where the agenda is principally horizontal: Maldives. For the traveller who wants to feel the world rather than be insulated from it, who wants to hike, snorkel wild reefs, and eat fish that was caught that morning by someone who will tell you its name: Seychelles. Both will restore you. The question is which kind of restoration you need.</p>`,
//   },
//   {
//     id: '9', slug: 'tom-ford-vs-brunello-cucinelli-style-guide', category: 'Style',
//     title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide',
//     excerpt: 'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?',
//     imageUrl: '/images/placeholder-style.jpg',
//     author: 'J. White', publishedAt: 'March 28, 2026', readTime: 6,
//     tags: ['Tom Ford', 'Brunello Cucinelli', 'Menswear', 'Luxury Fashion'],
//     content: `<p>There is a scene in every serious wardrobe conversation where two names eventually surface: Tom Ford and Brunello Cucinelli. They represent not merely two designers, but two entirely opposing philosophies of what luxury menswear is for, and who it speaks to. Understanding the difference is, in some sense, understanding yourself.</p>

// <h2>Tom Ford: The Architecture of Desire</h2>
// <p>Tom Ford dresses the version of yourself that you want the room to notice. The suits are cut with a precision that borders on severity — peak lapels, suppressed waist, a shoulder line that communicates authority before a word is spoken. The fabrics are superb: Super 130s wool from Loro Piana, silk from Como, cashmere from the finest Scottish mills. But the fabric is almost secondary to the silhouette, which is the point. Ford believes that a man's clothes should do some of his work for him.</p>

// <blockquote>"Ford dresses the man you want the room to see. Cucinelli dresses the man you are when no one is watching."</blockquote>

// <h2>Brunello Cucinelli: The Philosophy of Quiet</h2>
// <p>Cucinelli, by contrast, dresses the version of yourself that you are when no one is watching — or rather, the version that is most comfortable being watched without performing. The cashmere is from his own supply chain in Solomeo; the tailoring is Neapolitan in spirit, soft-shouldered and unconstructed. The colours are the colours of Umbrian earth: sand, smoke, sage, stone. Cucinelli's clothes make a statement by refusing to make one.</p>

// <h2>Which is Right for You?</h2>
// <p>The answer, as with all genuine style questions, is both. A Tom Ford suit for the moments that require armour. Cucinelli knitwear for the moments that permit honesty. The mistake is choosing one and believing you have chosen enough.</p>`,
//   },
//   {
//     id: '7', slug: 'zuma-dubai-food-cocktail-guide', category: 'Food & Drink',
//     title: 'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide',
//     excerpt: 'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.',
//     imageUrl: '/images/placeholder-food.jpg',
//     author: 'S. Chen', publishedAt: 'April 4, 2026', readTime: 5,
//     tags: ['Dubai', 'Japanese', 'Robatayaki', 'Fine Dining'],
//     content: `<p>There are restaurants, and then there are institutions. Zuma Dubai, which opened in the DIFC in 2008, has long since crossed that threshold. On any given evening, the dining room — designed by Noriyoshi Muramatsu with the spare elegance of a Kyoto ryokan crossed with a Manhattan loft — hosts a cross-section of international wealth that tells you more about Dubai's position in the world than any economic report.</p>

// <h2>What to Order</h2>
// <p>The menu is built around three disciplines: the main kitchen, the sushi counter, and the robata grill. The temptation is to order widely and sample everything; the wisdom, accumulated over several visits, is to resist. Focus on the robata. The black cod marinated in barley miso — a dish that has appeared on the menu since opening night and has never been removed, for good reason — remains one of the great preparations of any fish in any city.</p>

// <blockquote>"The black cod at Zuma is the kind of dish that makes you understand why Japanese cuisine is considered the world's most technically refined. It is, simply, perfect."</blockquote>

// <h2>The Bar Programme</h2>
// <p>The cocktail programme deserves its own chapter. The Zuma Negroni — a variation built on Japanese whisky rather than gin, with Campari and a house-made vermouth — is the best version of that drink available outside of a specialist bar. The sake selection is extensive and expertly advised by a team that takes evident pleasure in matching bottle to appetite.</p>

// <p>Reserve three weeks in advance for Friday dinner. Arrive early enough for a drink at the bar. Leave later than you intended.</p>`,
//   },
// ];

// // ── SM LOGO ────────────────────────────────────────────────────
// function SMLogo({ size = 32 }: { size?: number }) {
//   const g = '#C9A84C';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
//       <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={g} opacity="0.9"/>
//       <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={g} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <path d="M42 36C48 26 58 16 66 16C70 16 70 26 62 32C56 37 44 38 44 38" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
//       <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={g} transform="rotate(-30 30 46)" opacity="0.8"/>
//       <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={g} transform="rotate(-20 26 52)" opacity="0.7"/>
//       <circle cx="52" cy="12" r="1.5" fill={g}/>
//     </svg>
//   );
// }

// // ── HEADER ─────────────────────────────────────────────────────
// function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   return (
//     <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? '#1B4D45' : 'rgba(27,77,69,0.96)', backdropFilter: 'blur(8px)', transition: 'background .4s' }}>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }} />
//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
//           <SMLogo size={34} />
//           <div>
//             <div style={{ fontFamily: 'Georgia,serif', fontSize: 20, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.22em', lineHeight: 1 }}>SM</div>
//             <div style={{ fontSize: 8, color: 'rgba(201,168,76,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 2 }}>Luxury</div>
//           </div>
//         </Link>
//         <nav style={{ display: 'flex' }} className="sm-blog-nav">
//           {CATEGORIES.map(c => (
//             <Link key={c.slug} href={`/category/${c.slug}`}
//               style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', textDecoration: 'none', padding: '6px 12px', borderBottom: '1px solid transparent', transition: 'all .2s' }}
//               onMouseEnter={e => { e.currentTarget.style.color = '#DFC27A'; e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.4)'; }}
//               onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,168,76,0.6)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
//             >{c.name}</Link>
//           ))}
//         </nav>
//         <button className="sm-blog-ham" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4 }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             {open ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
//           </svg>
//         </button>
//       </div>
//       <div style={{ background: '#163D37', overflow: 'hidden', maxHeight: open ? 400 : 0, transition: 'max-height .3s ease' }}>
//         {CATEGORIES.map(c => (
//           <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setOpen(false)}
//             style={{ display: 'block', padding: '12px 24px', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
//           >{c.emoji} {c.name}</Link>
//         ))}
//       </div>
//       <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }} />
//       <style>{`
//         .sm-blog-nav { display: flex !important; }
//         .sm-blog-ham { display: none !important; }
//         @media(max-width:1024px){
//           .sm-blog-nav { display: none !important; }
//           .sm-blog-ham { display: block !important; }
//         }
//       `}</style>
//     </header>
//   );
// }

// // ── RELATED CARD ───────────────────────────────────────────────
// function RelatedCard({ post }: { post: Post }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <Link href={`/blog/${post.slug}`}
//       style={{ display: 'block', textDecoration: 'none', background: hov ? '#F0EBE0' : '#FAF7F0', transition: 'background .2s' }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//     >
//       <div style={{ position: 'relative', paddingBottom: '58%', overflow: 'hidden', background: '#E8DFD0' }}>
//         <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover', transition: 'transform .5s', transform: hov ? 'scale(1.05)' : 'scale(1)' }} sizes="33vw"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
//         <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DFC27A', background: 'rgba(27,77,69,0.88)', padding: '4px 8px' }}>{post.category}</span>
//       </div>
//       <div style={{ padding: '16px 18px 18px', borderBottom: '1px solid rgba(201,168,76,0.1)', borderLeft: '1px solid rgba(201,168,76,0.07)', borderRight: '1px solid rgba(201,168,76,0.07)' }}>
//         <div style={{ width: hov ? 32 : 18, height: 1, background: '#C9A84C', marginBottom: 10, transition: 'width .3s' }} />
//         <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 16, fontWeight: 400, color: hov ? '#1F5C52' : '#1C1C1A', lineHeight: 1.38, marginBottom: 8, transition: 'color .3s', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em' }}>{post.title}</h3>
//         <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)' }}>{post.author}</span>
//       </div>
//     </Link>
//   );
// }

// // ── MAIN BLOG DETAIL PAGE ──────────────────────────────────────
// export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = use(params);
//   const [readProgress, setReadProgress] = useState(0);

//   // Reading progress bar
//   useEffect(() => {
//     const fn = () => {
//       const el = document.documentElement;
//       const scrollTop = el.scrollTop || document.body.scrollTop;
//       const scrollHeight = el.scrollHeight - el.clientHeight;
//       setReadProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
//     };
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   // ── Replace with real API when backend ready ──
//   // const [post, setPost] = useState<Post | null>(null);
//   // useEffect(() => { fetch(`/api/posts/${slug}`).then(r => r.json()).then(setPost); }, [slug]);

//   const post = ALL_POSTS.find(p => p.slug === slug) ?? ALL_POSTS[0];
//   const catMeta = CATEGORIES.find(c => c.name === post.category);
//   const related = ALL_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
//   const moreRelated = related.length < 3 ? [...related, ...ALL_POSTS.filter(p => p.id !== post.id && p.category !== post.category).slice(0, 3 - related.length)] : related;

//   return (
//     <>
//       <Header />

//       {/* Reading progress bar */}
//       <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 100, background: 'rgba(201,168,76,0.15)' }}>
//         <div style={{ height: '100%', background: '#C9A84C', width: `${readProgress}%`, transition: 'width .1s linear' }} />
//       </div>

//       <main style={{ paddingTop: 68 }}>

//         {/* ── ARTICLE HERO ──────────────────────────────── */}
//         <section style={{ position: 'relative', height: 520, overflow: 'hidden', background: '#1B4D45' }}>
//           <Image src={post.imageUrl} alt={post.title} fill priority
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />
//           {/* Overlays */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,28,26,0.92) 0%, rgba(28,28,26,0.4) 50%, rgba(28,28,26,0.15) 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,28,26,0.3), transparent 60%)' }} />

//           <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', maxWidth: 1280, margin: '0 auto', padding: '0 48px 48px' }}>

//             {/* Breadcrumb */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>
//               <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.45)')}
//               >Home</Link>
//               <span>/</span>
//               <Link href={`/category/${catMeta?.slug ?? ''}`} style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.45)')}
//               >{post.category}</Link>
//               <span>/</span>
//               <span style={{ color: 'rgba(201,168,76,0.7)' }}>Article</span>
//             </div>

//             {/* Category badge */}
//             <span style={{ display: 'inline-block', width: 'fit-content', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#DFC27A', background: 'rgba(27,77,69,0.75)', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 14px', marginBottom: 18, backdropFilter: 'blur(4px)' }}>
//               {catMeta?.emoji} {post.category}
//             </span>

//             {/* Title */}
//             <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,5vw,54px)', fontWeight: 300, color: '#FAF7F0', lineHeight: 1.18, maxWidth: 820, marginBottom: 18, letterSpacing: '0.015em' }}>
//               {post.title}
//             </h1>

//             {/* Meta row */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)' }}>
//               <span style={{ color: '#C9A84C', fontWeight: 500 }}>By {post.author}</span>
//               <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(201,168,76,0.35)', display: 'inline-block' }} />
//               <span>{post.publishedAt}</span>
//               <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(201,168,76,0.35)', display: 'inline-block' }} />
//               <span>{post.readTime} min read</span>
//             </div>
//           </div>
//         </section>

//         {/* ── ARTICLE BODY ──────────────────────────────── */}
//         <article style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 80px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'flex-start' }} className="sm-article-grid">

//             {/* Main content */}
//             <div>
//               {/* Lead / excerpt */}
//               <p style={{
//                 fontFamily: 'Georgia,serif',
//                 fontSize: 'clamp(18px,2.2vw,24px)',
//                 fontWeight: 300, fontStyle: 'italic',
//                 color: '#1F5C52', lineHeight: 1.65,
//                 marginBottom: 40, paddingBottom: 40,
//                 borderBottom: '1px solid rgba(201,168,76,0.15)',
//                 letterSpacing: '0.01em',
//               }}>
//                 {post.excerpt}
//               </p>

//               {/* Article content */}
//               <div style={{ fontFamily: 'Georgia,serif' }}
//                 dangerouslySetInnerHTML={{ __html: post.content }}
//               />

//               {/* Tags */}
//               {post.tags && post.tags.length > 0 && (
//                 <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(201,168,76,0.12)', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
//                   <span style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(107,101,88,0.5)', marginRight: 6 }}>Tags:</span>
//                   {post.tags.map(tag => (
//                     <span key={tag} style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B6558', background: '#F0EBE0', border: '1px solid rgba(201,168,76,0.15)', padding: '5px 12px' }}>
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {/* Author card */}
//               <div style={{ marginTop: 48, padding: '24px 28px', background: '#F5F0E8', borderLeft: '3px solid #C9A84C', display: 'flex', alignItems: 'flex-start', gap: 18 }}>
//                 <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#1B4D45', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                   <span style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#C9A84C', fontWeight: 300 }}>
//                     {post.author.split(' ').map(n => n[0]).join('').slice(0,2)}
//                   </span>
//                 </div>
//                 <div>
//                   <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: 5 }}>Written by</p>
//                   <p style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 300, color: '#1C1C1A', marginBottom: 5, letterSpacing: '0.02em' }}>{post.author}</p>
//                   <p style={{ fontSize: 12, color: '#6B6558', lineHeight: 1.65, letterSpacing: '0.01em' }}>
//                     Senior contributor to SM Luxury, specialising in {post.category.toLowerCase()} and the culture of connoisseurship.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <aside>
//               <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 28 }}>

//                 {/* More in category */}
//                 <div style={{ border: '1px solid rgba(201,168,76,0.14)', padding: '20px 20px' }}>
//                   <p style={{ fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
//                     More in {post.category}
//                   </p>
//                   <div>
//                     {moreRelated.map(p => (
//                       <Link key={p.id} href={`/blog/${p.slug}`}
//                         style={{ display: 'flex', gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(201,168,76,0.08)', textDecoration: 'none' }}
//                         className="sidebar-post-link"
//                       >
//                         <div style={{ position: 'relative', width: 72, height: 56, flexShrink: 0, overflow: 'hidden', background: '#E8DFD0' }}>
//                           <Image src={p.imageUrl} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="72px"
//                             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
//                         </div>
//                         <div>
//                           <p style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 4 }}>{p.category}</p>
//                           <p style={{ fontFamily: 'Georgia,serif', fontSize: 13, color: '#1C1C1A', lineHeight: 1.38, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em' }}>{p.title}</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Newsletter */}
//                 <div style={{ background: '#1B4D45', padding: '24px 20px', textAlign: 'center' }}>
//                   <SMLogo size={32} />
//                   <p style={{ fontFamily: 'Georgia,serif', fontSize: 20, fontWeight: 300, color: '#FAF7F0', margin: '12px 0 6px', letterSpacing: '0.02em' }}>The Weekly Edit</p>
//                   <p style={{ fontSize: 11, color: 'rgba(201,168,76,0.5)', marginBottom: 16, lineHeight: 1.6, letterSpacing: '0.02em' }}>Curated stories from all categories, every Thursday.</p>
//                   <input type="email" placeholder="your@email.com"
//                     style={{ width: '100%', background: '#163D37', border: '1px solid rgba(201,168,76,0.18)', color: '#DFC27A', fontSize: 12, padding: '10px 12px', outline: 'none', fontFamily: 'inherit', marginBottom: 10, boxSizing: 'border-box' }}
//                   />
//                   <button style={{ width: '100%', background: '#C9A84C', color: '#1B4D45', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, padding: '11px', border: 'none', cursor: 'pointer', transition: 'background .2s' }}
//                     onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
//                     onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
//                   >Subscribe</button>
//                 </div>

//                 {/* Share */}
//                 <div style={{ border: '1px solid rgba(201,168,76,0.14)', padding: '16px 20px' }}>
//                   <p style={{ fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: 12 }}>Share This Story</p>
//                   <div style={{ display: 'flex', gap: 8 }}>
//                     {['Twitter', 'LinkedIn', 'Copy Link'].map(s => (
//                       <button key={s}
//                         style={{ flex: 1, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 4px', border: '1px solid rgba(201,168,76,0.2)', color: '#6B6558', background: 'transparent', cursor: 'pointer', transition: 'all .2s' }}
//                         onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#1B4D45'; e.currentTarget.style.background = '#C9A84C'; }}
//                         onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.color = '#6B6558'; e.currentTarget.style.background = 'transparent'; }}
//                       >{s}</button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </article>

//         {/* ── RELATED POSTS ─────────────────────────────── */}
//         <section style={{ background: '#F0EBE0', padding: '60px 0', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
//           <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 16 }}>
//               <div>
//                 <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 6 }}>Continue Reading</p>
//                 <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 300, color: '#1C1C1A', letterSpacing: '0.02em' }}>You May Also Enjoy</h2>
//               </div>
//               <Link href={`/category/${catMeta?.slug ?? 'cars'}`}
//                 style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: 2 }}>
//                 All {post.category} →
//               </Link>
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(201,168,76,0.08)' }} className="sm-related-grid">
//               {moreRelated.map(p => <RelatedCard key={p.id} post={p} />)}
//             </div>
//           </div>
//         </section>

//       </main>

//       {/* ── FOOTER ────────────────────────────────────── */}
//       <footer style={{ background: '#1B4D45', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
//         <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <SMLogo size={32} />
//             <span style={{ fontFamily: 'Georgia,serif', fontSize: 16, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.2em' }}>SM Luxury</span>
//           </div>
//           <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
//             {CATEGORIES.map(c => (
//               <Link key={c.slug} href={`/category/${c.slug}`}
//                 style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.42)', textDecoration: 'none', transition: 'color .2s' }}
//                 onMouseEnter={e => (e.currentTarget.style.color = '#DFC27A')}
//                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.42)')}
//               >{c.name}</Link>
//             ))}
//           </div>
//           <p style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(201,168,76,0.24)' }}>© 2026 SM Luxury. All rights reserved.</p>
//         </div>
//       </footer>

//       {/* ── Global article typography styles ── */}
//       <style>{`
//         @media(max-width:900px){
//           .sm-article-grid  { grid-template-columns: 1fr !important; }
//           .sm-related-grid  { grid-template-columns: 1fr !important; }
//         }
//         @media(max-width:600px){ .sm-related-grid { grid-template-columns: 1fr !important; } }

//         /* Article body typography */
//         div[dangerouslySetInnerHTML] p,
//         .sm-article-grid p { display: block; }

//         article p {
//           font-size: 16px;
//           line-height: 1.9;
//           color: #3a3834;
//           margin-bottom: 22px;
//           letter-spacing: 0.01em;
//           font-family: Georgia, serif;
//           font-weight: 300;
//         }
//         article h2 {
//           font-family: Georgia, serif;
//           font-size: clamp(22px, 2.5vw, 30px);
//           font-weight: 300;
//           color: #1C1C1A;
//           margin: 44px 0 18px;
//           line-height: 1.2;
//           letter-spacing: 0.02em;
//         }
//         article h3 {
//           font-family: Georgia, serif;
//           font-size: clamp(18px, 2vw, 24px);
//           font-weight: 400;
//           color: #1C1C1A;
//           margin: 36px 0 14px;
//           letter-spacing: 0.01em;
//         }
//         article blockquote {
//           border-left: 3px solid #C9A84C;
//           padding: 18px 26px;
//           margin: 36px 0;
//           font-family: Georgia, serif;
//           font-size: clamp(18px, 2vw, 22px);
//           font-style: italic;
//           color: #1F5C52;
//           line-height: 1.6;
//           letter-spacing: 0.01em;
//           background: rgba(201,168,76,0.04);
//         }
//         article strong { font-weight: 500; color: #1C1C1A; }
//         article em { font-style: italic; }
//         .sidebar-post-link:last-child { border-bottom: none !important; margin-bottom: 0 !important; padding-bottom: 0 !important; }
//       `}</style>
//     </>
//   );
// }




// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// // ─── Types ───────────────────────────────────────────────
// interface Post {
//   id: string;
//   title: string;
//   slug: string;
//   category: string;
//   excerpt: string;
//   content?: string;
//   imageUrl?: string;
//   author: string;
//   publishedAt: string;
//   readTime: number;
//   tags?: string[];
// }

// // ─── Data ────────────────────────────────────────────────
// const CATEGORIES = [
//   { name: 'Cars',        slug: 'cars',       emoji: '🚗', description: 'The finest machines on four wheels',         accentColor: '#C9A84C', heroImage: '/images/hero-cars.jpg' },
//   { name: 'Yachts',      slug: 'yachts',     emoji: '⛵', description: 'Life on the open water',                     accentColor: '#5FA8D4', heroImage: '/images/hero-yachts.jpg' },
//   { name: 'Watches',     slug: 'watches',    emoji: '⌚', description: 'Mechanical artistry on your wrist',           accentColor: '#D4B483', heroImage: '/images/hero-watches.jpg' },
//   { name: 'Style',       slug: 'style',      emoji: '👔', description: 'Dressing the modern connoisseur',             accentColor: '#C4A8D4', heroImage: '/images/hero-style.jpg' },
//   { name: 'Home',        slug: 'home',       emoji: '🏛️', description: 'Architecture and interior excellence',        accentColor: '#8DC48D', heroImage: '/images/hero-home.jpg' },
//   { name: 'Food & Drink',slug: 'food-drink', emoji: '🍾', description: 'Gastronomy and the art of drinking',          accentColor: '#D48888', heroImage: '/images/hero-food.jpg' },
//   { name: 'Travel',      slug: 'travel',     emoji: '✈️', description: "The world's most extraordinary destinations", accentColor: '#88B0D4', heroImage: '/images/hero-travel.jpg' },
// ];

// const MOCK_POSTS: Post[] = [
//   { id: '1', title: 'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12', slug: 'ferrari-laferrari-aperta-final-edition', category: 'Cars', excerpt: 'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.', content: '', author: 'Alessandro Greco', publishedAt: '2026-04-10', readTime: 8, imageUrl: '/images/placeholder-watch.jpg', tags: ['Ferrari', 'Supercars', 'V12'] },
//   { id: '2', title: 'Patek Philippe 5711: Why It Still Commands Six Figures in 2026', slug: 'patek-philippe-5711-value-2026', category: 'Watches', excerpt: "Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.", content: '', author: 'M. Laurent', publishedAt: '2026-04-08', readTime: 6, imageUrl: '/images/placeholder-watch.jpg', tags: ['Patek Philippe', 'Nautilus', 'Investment'] },
//   { id: '3', title: 'Aboard the Benetti 107: A Week in the Mediterranean', slug: 'benetti-107-mediterranean-week', category: 'Yachts', excerpt: '107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.', content: '', author: 'R. Voss', publishedAt: '2026-04-06', readTime: 10, imageUrl: '/images/placeholder-yacht.jpg', tags: ['Benetti', 'Mediterranean', 'Superyacht'] },
//   { id: '4', title: 'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide', slug: 'zuma-dubai-food-cocktail-guide', category: 'Food & Drink', excerpt: 'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.', content: '', author: 'S. Chen', publishedAt: '2026-04-04', readTime: 5, imageUrl: '/images/placeholder-food.jpg', tags: ['Dubai', 'Japanese', 'Cocktails'] },
//   { id: '5', title: 'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026', slug: 'maldives-vs-seychelles-2026', category: 'Travel', excerpt: 'Two island paradises, two entirely different philosophies. Our editors have stayed at both.', content: '', author: 'P. Black', publishedAt: '2026-03-30', readTime: 7, imageUrl: '/images/placeholder-travel.jpg', tags: ['Maldives', 'Seychelles', 'Islands'] },
//   { id: '6', title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide', slug: 'tom-ford-vs-brunello-cucinelli-style-guide', category: 'Style', excerpt: 'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?', content: '', author: 'J. White', publishedAt: '2026-03-28', readTime: 6, imageUrl: '/images/placeholder-style.jpg', tags: ['Tom Ford', 'Menswear', 'Fashion'] },
//    { id: '7', title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide', slug: 'tom-ford-vs-brunello-cucinelli-style-guide', category: 'Home', excerpt: 'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?', content: '', author: 'J. White', publishedAt: '2026-03-28', readTime: 6, imageUrl: '/images/placeholder-home.jpg', tags: ['Tom Ford', 'Menswear', 'Fashion'] },
// ];

// // ─── Header ──────────────────────────────────────────────
// function Header() {
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#C9A84C]/15 px-6 md:px-16 py-4 flex items-center justify-between">
//       <Link href="/" className="font-display text-xl font-light text-[#1C1C1A] tracking-wide">
//         SM <span className="text-[#C9A84C]">Luxury</span>
//       </Link>
//       <nav className="hidden md:flex items-center gap-8">
//         {CATEGORIES.slice(0, 5).map((cat) => (
//           <Link key={cat.slug} href={`/category/${cat.slug}`}
//             className="text-[10px] tracking-[0.2em] uppercase text-[#6B6558] hover:text-[#1B4D45] transition-colors">
//             {cat.name}
//           </Link>
//         ))}
//       </nav>
//     </header>
//   );
// }

// // ─── Footer ──────────────────────────────────────────────
// function Footer() {
//   return (
//     <footer className="bg-[#1B4D45] px-6 md:px-16 py-12 mt-0">
//       <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//         <p className="font-display text-xl font-light text-[#DFC27A]">SM Luxury</p>
//         <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/40">
//           © {new Date().getFullYear()} SM Luxury. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// // ─── BlogCard ─────────────────────────────────────────────
// function BlogCard({ post, variant = 'default' }: { post: Post; variant?: 'default' | 'compact' }) {
//   if (variant === 'compact') {
//     return (
//       <Link href={`/blog/${post.slug}`} className="flex items-start gap-3 py-3 border-b border-[#C9A84C]/10 last:border-0 group">
//         <div className="flex-1 min-w-0">
//           <p className="text-[9px] tracking-[0.15em] uppercase text-[#C9A84C]/60 mb-1">{post.category}</p>
//           <p className="text-sm font-display font-light text-[#1C1C1A] group-hover:text-[#1B4D45] transition-colors line-clamp-2 leading-snug">{post.title}</p>
//           <p className="text-[9px] text-[#6B6558]/60 mt-1 uppercase tracking-wide">{post.readTime} min read</p>
//         </div>
//       </Link>
//     );
//   }
//   return (
//     <Link href={`/blog/${post.slug}`} className="block bg-[#FAF7F0] group p-6 hover:bg-white transition-colors">
//       <div className="h-40 bg-[#1B4D45] mb-4 overflow-hidden relative flex items-center justify-center">
//         {post.imageUrl ? (
//           <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
//         ) : (
//           <span className="text-[#C9A84C]/20 font-display text-4xl font-light">{post.category[0]}</span>
//         )}
//       </div>
//       <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">{post.category}</p>
//       <h3 className="font-display text-lg font-light text-[#1C1C1A] group-hover:text-[#1B4D45] transition-colors leading-snug mb-2">{post.title}</h3>
//       <p className="text-xs text-[#6B6558] line-clamp-2 leading-relaxed">{post.excerpt}</p>
//       <p className="text-[9px] uppercase tracking-widest text-[#C9A84C]/50 mt-3">{post.readTime} min read</p>
//     </Link>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────
// export default function BlogDetailPage({ params }: { params: { slug: string } }) {
//   const post = MOCK_POSTS.find((p) => p.slug === params.slug) ?? MOCK_POSTS[0];
//   if (!post) notFound();

//   const related = MOCK_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
//   const relatedPosts = related.length > 0 ? related : MOCK_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

//   return (
//     <>
//       <Header />
//       <main>
//         {/* ── ARTICLE HERO ── */}
//         <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-[#1B4D45] mt-20">
//           {post.imageUrl ? (
//             <Image src={post.imageUrl} alt={post.title} fill priority className="object-cover object-center" quality={95} />
//           ) : (
//             <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D45] via-[#1F5C52] to-[#163D37]">
//               <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px' }} />
//             </div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/90 via-[#1C1C1A]/30 to-transparent" />
//           <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-screen-xl mx-auto w-full">
//             <div className="flex items-center gap-2 mb-5 text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/50">
//               <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
//               <span>/</span>
//               <Link href={`/category/${post.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="hover:text-[#C9A84C] transition-colors">{post.category}</Link>
//             </div>
//             <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-[#DFC27A] bg-[#1B4D45]/70 border border-[#C9A84C]/30 px-3 py-1.5 mb-5 w-fit backdrop-blur-sm">{post.category}</span>
//             <h1 className="font-display text-4xl md:text-6xl font-light text-[#FAF7F0] leading-tight max-w-4xl mb-5">{post.title}</h1>
//             <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/60">
//               <span>By {post.author}</span>
//               <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40" />
//               <span>{post.publishedAt}</span>
//               <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40" />
//               <span>{post.readTime} min read</span>
//             </div>
//           </div>
//         </section>

//         {/* ── ARTICLE BODY ── */}
//         <article className="max-w-screen-xl mx-auto px-6 py-16">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//             <div className="lg:col-span-8">
//               <p className="font-display text-2xl md:text-3xl font-light text-[#1F5C52] leading-relaxed mb-10 pb-10 border-b border-[#C9A84C]/15">{post.excerpt}</p>
//               <div className="article-prose" dangerouslySetInnerHTML={{
//                 __html: post.content || `<p>The full article content will be loaded from your backend API.</p><h2>The Details</h2><p>Your backend API will return the complete article body here.</p><blockquote>Connect your API and this placeholder disappears.</blockquote>`,
//               }} />
//               {post.tags && post.tags.length > 0 && (
//                 <div className="mt-12 pt-8 border-t border-[#C9A84C]/15 flex flex-wrap gap-2">
//                   {post.tags.map((tag) => (
//                     <span key={tag} className="text-[9px] tracking-[0.2em] uppercase text-[#6B6558] bg-[#F0EBE0] px-3 py-1.5 border border-[#C9A84C]/15">{tag}</span>
//                   ))}
//                 </div>
//               )}
//               <div className="mt-12 p-6 bg-[#F0EBE0] border-l-2 border-[#C9A84C] flex items-start gap-5">
//                 <div className="w-14 h-14 rounded-full bg-[#1B4D45] flex items-center justify-center flex-shrink-0">
//                   <span className="font-display text-xl text-[#C9A84C]">{post.author.split(' ').map((n) => n[0]).join('')}</span>
//                 </div>
//                 <div>
//                   <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">Written by</p>
//                   <p className="font-display text-xl font-light text-[#1C1C1A] mb-1">{post.author}</p>
//                   <p className="text-xs text-[#6B6558] leading-relaxed">Senior contributor to SM Luxury, specialising in {post.category.toLowerCase()} and connoisseur culture.</p>
//                 </div>
//               </div>
//             </div>
//             <aside className="lg:col-span-4">
//               <div className="sticky top-28 space-y-8">
//                 <div className="border border-[#C9A84C]/15 p-5">
//                   <p className="text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] mb-4 pb-3 border-b border-[#C9A84C]/10">More in {post.category}</p>
//                   <div>{relatedPosts.map((p) => <BlogCard key={p.id} post={p} variant="compact" />)}</div>
//                 </div>
//                 <div className="bg-[#1B4D45] p-6 text-center">
//                   <div className="w-6 h-px bg-[#C9A84C]/50 mx-auto mb-4" />
//                   <p className="font-display text-2xl font-light text-[#FAF7F0] mb-2">The Weekly Edit</p>
//                   <p className="text-xs text-[#C9A84C]/60 mb-5 leading-relaxed">Curated stories from all categories, every Thursday.</p>
//                   <input type="email" placeholder="your@email.com" className="w-full bg-[#163D37] border border-[#C9A84C]/20 text-[#DFC27A] placeholder-[#C9A84C]/30 text-xs px-3 py-2.5 mb-3 outline-none" />
//                   <button className="w-full bg-[#C9A84C] text-[#1B4D45] text-[10px] tracking-[0.2em] uppercase py-3 font-semibold hover:bg-[#DFC27A] transition-colors">Subscribe</button>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </article>

//         {/* ── RELATED POSTS ── */}
//         <section className="bg-[#F0EBE0] py-16">
//           <div className="max-w-screen-xl mx-auto px-6">
//             <div className="flex items-end justify-between mb-10 border-b border-[#C9A84C]/15 pb-5">
//               <div>
//                 <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Continue Reading</p>
//                 <h2 className="font-display text-4xl font-light text-[#1C1C1A]">You May Also Enjoy</h2>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#C9A84C]/10">
//               {relatedPosts.map((p) => <BlogCard key={p.id} post={p} variant="default" />)}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }