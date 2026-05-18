'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// ── CATEGORIES (dropdown mein dikhte hain) ────────────────────
const CATEGORIES = [
  { label: 'Real Estate',         href: '/real-estate',      icon: '🏛️' },
  { label: 'Automobiles',         href: '/automobiles',       icon: '🚗' },
  { label: 'Jewellery & Watches', href: '/jewellery-watches', icon: '💎' },
  { label: 'Weddings',            href: '/weddings',          icon: '✨' },
  { label: 'Curated Partners',    href: '/curated-partners',  icon: '🤝' },
  { label: 'Hospitality',         href: '/hospitality',       icon: '🏨' },
  { label: 'Beauty',              href: '/beauty',            icon: '🌸' },
];

const CAT_HREFS = CATEGORIES.map(c => c.href);

export default function Navbar({ activeHref = '' }: { activeHref?: string }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [catOpen,    setCatOpen]    = useState(false);
  const [mobCatOpen, setMobCatOpen] = useState(false);
  const catWrapRef = useRef<HTMLDivElement>(null);

  const isCatActive = CAT_HREFS.includes(activeHref);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (catWrapRef.current && !catWrapRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <>
      <style>{`
        .ilh-hdr {
          position:fixed; top:0; left:0; right:0; z-index:100;
          background:rgba(10,10,10,0.92);
          backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          transition:background .4s,box-shadow .4s;
        }
        .ilh-hdr.scr { background:rgba(10,10,10,0.98); box-shadow:0 2px 24px rgba(0,0,0,0.5); }
        .ilh-st { height:1px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); opacity:.7; }
        .ilh-sb { height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent); }

        .ilh-bar {
          max-width:1400px; margin:0 auto; padding:0 32px; height:72px;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
        }

        /* LOGO */
        .ilh-logo { display:flex; align-items:center; gap:6px; text-decoration:none; flex-shrink:0; }
        .ilh-logo-img { position:relative; width:48px; height:48px; flex-shrink:0; }
        .ilh-logo-text { display:flex; flex-direction:column; justify-content:center; }
        .ilh-logo-t { font-family:Georgia,serif; font-size:20px; font-weight:300; color:#DFC27A; letter-spacing:.28em; text-transform:uppercase; line-height:1.1; display:block; }
        .ilh-logo-s { font-size:11px; color:#C9A84C; letter-spacing:.28em; text-transform:uppercase; margin-top:3px; display:block; font-family:Georgia,serif; }

        /* DESKTOP NAV */
        .ilh-nav { display:flex; align-items:center; }

        .ilh-nl {
          font-size:13px; letter-spacing:.12em; text-transform:uppercase;
          color:rgba(201,168,76,.6); text-decoration:none;
          padding:8px 11px; border-bottom:1px solid transparent;
          transition:color .2s,border-color .2s; white-space:nowrap; display:inline-block;
        }
        .ilh-nl:hover,.ilh-nl.act { color:#DFC27A; border-bottom-color:#C9A84C; }

        .ilh-pw {
          font-size:13px; letter-spacing:.12em; text-transform:uppercase;
          color:#C9A84C; text-decoration:none; padding:6px 14px; margin-left:6px;
          border:1px solid rgba(201,168,76,.4); transition:all .2s; white-space:nowrap;
        }
        .ilh-pw:hover,.ilh-pw.act { background:#C9A84C; color:#1A1A1A; }

        /* CAT DROPDOWN */
        .ilh-cw { position:relative; }
        .ilh-cb {
          font-size:13px; letter-spacing:.12em; text-transform:uppercase;
          color:rgba(201,168,76,.6); background:none; border:none;
          border-bottom:1px solid transparent; padding:8px 11px; cursor:pointer;
          font-family:Georgia,serif; display:flex; align-items:center; gap:5px;
          transition:color .2s; white-space:nowrap; height:72px;
        }
        .ilh-cb:hover,.ilh-cb.op,.ilh-cb.ca { color:#DFC27A; }
        .ilh-cb.ca { border-bottom-color:#C9A84C; font-weight:500; }
        .ilh-arr { transition:transform .25s; display:flex; align-items:center; }
        .ilh-cb.op .ilh-arr { transform:rotate(180deg); }

        .ilh-dd {
          position:absolute; top:calc(100% + 2px); left:50%;
          transform:translateX(-50%) translateY(-8px);
          min-width:256px; background:rgba(5,5,5,.99);
          border:1px solid rgba(201,168,76,.22);
          box-shadow:0 20px 60px rgba(0,0,0,.8);
          opacity:0; visibility:hidden;
          transition:opacity .22s,transform .22s,visibility .22s;
          z-index:200; overflow:hidden;
        }
        .ilh-dd.op { opacity:1; visibility:visible; transform:translateX(-50%) translateY(0); }
        .ilh-dg { height:2px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); }
        .ilh-db { padding:6px 0 8px; }
        .ilh-dv { height:1px; background:rgba(201,168,76,.1); margin:4px 0; }
        .ilh-di {
          display:flex; align-items:center; gap:12px; padding:11px 20px;
          font-size:13px; letter-spacing:.16em; text-transform:uppercase;
          color:rgba(201,168,76,.58); text-decoration:none;
          border-left:2px solid transparent; transition:all .18s; font-family:Georgia,serif;
        }
        .ilh-di:hover { color:#DFC27A; background:rgba(201,168,76,.07); border-left-color:rgba(201,168,76,.5); }
        .ilh-di.act { color:#DFC27A; background:rgba(201,168,76,.09); border-left-color:#C9A84C; }
        .ilh-ic { font-size:14px; width:20px; text-align:center; opacity:.85; }

        /* HAMBURGER */
        .ilh-hm {
          display:none; flex-direction:column; gap:5px;
          background:none; border:none; color:#C9A84C; cursor:pointer; padding:8px;
        }
        .ilh-hl { width:24px; height:1.5px; background:#C9A84C; transition:all .3s; transform-origin:center; display:block; border-radius:1px; }
        .ilh-hm.op .ilh-hl:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
        .ilh-hm.op .ilh-hl:nth-child(2) { opacity:0; transform:scaleX(0); }
        .ilh-hm.op .ilh-hl:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }

        /* MOBILE MENU */
        .ilh-mm { background:#070707; border-top:1px solid rgba(201,168,76,.1); max-height:0; overflow:hidden; transition:max-height .38s cubic-bezier(.4,0,.2,1); }
        .ilh-mm.op { max-height:700px; }

        .ilh-ml {
          display:flex; align-items:center; padding:15px 28px;
          font-size:14px; letter-spacing:.18em; text-transform:uppercase;
          color:rgba(201,168,76,.65); text-decoration:none;
          border-bottom:1px solid rgba(201,168,76,.07);
          transition:background .2s,color .2s; font-family:Georgia,serif;
        }
        .ilh-ml:hover { background:rgba(201,168,76,.05); color:#DFC27A; }
        .ilh-ml.act { color:#DFC27A; background:rgba(201,168,76,.05); }
        .ilh-ml.pw  { color:#C9A84C; font-weight:600; }

        .ilh-mcb {
          width:100%; display:flex; align-items:center; justify-content:space-between;
          padding:15px 28px; font-size:14px; letter-spacing:.18em; text-transform:uppercase;
          color:rgba(201,168,76,.65); background:none; border:none;
          border-bottom:1px solid rgba(201,168,76,.07);
          cursor:pointer; font-family:Georgia,serif; transition:all .2s;
        }
        .ilh-mcb:hover,.ilh-mcb.op { color:#DFC27A; background:rgba(201,168,76,.04); }
        .ilh-ma { transition:transform .25s; display:flex; }
        .ilh-mcb.op .ilh-ma { transform:rotate(180deg); }

        .ilh-sl { max-height:0; overflow:hidden; transition:max-height .3s ease; background:rgba(201,168,76,.025); }
        .ilh-sl.op { max-height:500px; }
        .ilh-si {
          display:flex; align-items:center; gap:12px; padding:12px 28px 12px 44px;
          font-size:13px; letter-spacing:.16em; text-transform:uppercase;
          color:rgba(201,168,76,.5); text-decoration:none;
          border-bottom:1px solid rgba(201,168,76,.05);
          border-left:2px solid transparent; transition:all .18s; font-family:Georgia,serif;
        }
        .ilh-si:hover { color:#DFC27A; background:rgba(201,168,76,.06); border-left-color:rgba(201,168,76,.4); }
        .ilh-si.act { color:#DFC27A; border-left-color:#C9A84C; }

        /* RESPONSIVE */
        @media(max-width:1100px){ .ilh-nav{display:none!important;} .ilh-hm{display:flex!important;} }
        @media(max-width:768px) { .ilh-bar{padding:0 20px!important;} }
        @media(max-width:480px) { .ilh-bar{padding:0 16px!important;height:64px!important;} .ilh-logo{gap:4px!important;} .ilh-logo-img{width:40px!important;height:40px!important;} .ilh-logo-t{font-size:16px!important;letter-spacing:.2em!important;} .ilh-logo-s{font-size:9px!important;letter-spacing:.2em!important;} }
      `}</style>

      <header className={`ilh-hdr${scrolled ? ' scr' : ''}`}>
        <div className="ilh-st" />

        <div className="ilh-bar">

          {/* ── LOGO ── */}
          <Link href="/" className="ilh-logo">
            <div className="ilh-logo-img">
              <Image
                src="/logos.png"
                alt="Indian Luxury House"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="ilh-logo-text">
              <span className="ilh-logo-t">Indian</span>
              <span className="ilh-logo-s">Luxury House</span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="ilh-nav">
            <Link href="/"     className={`ilh-nl${activeHref==='/'     ? ' act':''}`}>Home</Link>
            <Link href="/news" className={`ilh-nl${activeHref==='/news' ? ' act':''}`}>News</Link>

            {/* Categories Dropdown */}
            <div className="ilh-cw" ref={catWrapRef}>
              <button
                className={`ilh-cb${catOpen?' op':''}${isCatActive?' ca':''}`}
                onClick={() => setCatOpen(p => !p)}
              >
                Categories
                <span className="ilh-arr">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              <div className={`ilh-dd${catOpen?' op':''}`}>
                <div className="ilh-dg" />
                <div className="ilh-db">
                  {CATEGORIES.map(cat => (
                    <span key={cat.href}>
                      {cat.label === 'Hospitality' && <div className="ilh-dv" />}
                      <Link
                        href={cat.href}
                        onClick={() => setCatOpen(false)}
                        className={`ilh-di${activeHref===cat.href?' act':''}`}
                      >
                        <span className="ilh-ic">{cat.icon}</span>
                        {cat.label}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/partner-with-us" className={`ilh-pw${activeHref==='/partner-with-us'?' act':''}`}>
              Partner With Us
            </Link>
            <Link href="/about" className={`ilh-nl${activeHref==='/about'?' act':''}`}>About</Link>
          </nav>

          {/* ── HAMBURGER ── */}
          <button
            className={`ilh-hm${menuOpen?' op':''}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Menu"
          >
            <span className="ilh-hl" />
            <span className="ilh-hl" />
            <span className="ilh-hl" />
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        <div className={`ilh-mm${menuOpen?' op':''}`}>
          <Link href="/" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/'?' act':''}`}>Home</Link>
          <Link href="/news" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/news'?' act':''}`}>News</Link>

          {/* Categories accordion */}
          <button className={`ilh-mcb${mobCatOpen?' op':''}`} onClick={()=>setMobCatOpen(p=>!p)}>
            <span>Categories</span>
            <span className="ilh-ma">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          <div className={`ilh-sl${mobCatOpen?' op':''}`}>
            {CATEGORIES.map(cat => (
              <Link key={cat.href} href={cat.href}
                onClick={()=>{setMenuOpen(false);setMobCatOpen(false);}}
                className={`ilh-si${activeHref===cat.href?' act':''}`}
              >
                <span>{cat.icon}</span>{cat.label}
              </Link>
            ))}
          </div>

          <Link href="/partner-with-us" onClick={()=>setMenuOpen(false)} className={`ilh-ml pw${activeHref==='/partner-with-us'?' act':''}`}>Partner With Us</Link>
          <Link href="/about" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/about'?' act':''}`}>About</Link>
        </div>

        <div className="ilh-sb" />
      </header>
    </>
  );
}


// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect, useRef } from 'react';

// // ── CATEGORIES (dropdown mein dikhte hain) ────────────────────
// const CATEGORIES = [
//   { label: 'Real Estate',         href: '/real-estate',      icon: '🏛️' },
//   { label: 'Automobiles',         href: '/automobiles',       icon: '🚗' },
//   { label: 'Jewellery & Watches', href: '/jewellery-watches', icon: '💎' },
//   { label: 'Weddings',            href: '/weddings',          icon: '✨' },
//   { label: 'Curated Partners',    href: '/curated-partners',  icon: '🤝' },
//   { label: 'Hospitality',         href: '/hospitality',       icon: '🏨' },
//   { label: 'Beauty',              href: '/beauty',            icon: '🌸' },
// ];

// const CAT_HREFS = CATEGORIES.map(c => c.href);

// export default function Navbar({ activeHref = '' }: { activeHref?: string }) {
//   const [scrolled,   setScrolled]   = useState(false);
//   const [menuOpen,   setMenuOpen]   = useState(false);
//   const [catOpen,    setCatOpen]    = useState(false);
//   const [mobCatOpen, setMobCatOpen] = useState(false);
//   const catWrapRef = useRef<HTMLDivElement>(null);

//   const isCatActive = CAT_HREFS.includes(activeHref);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   useEffect(() => {
//     const fn = (e: MouseEvent) => {
//       if (catWrapRef.current && !catWrapRef.current.contains(e.target as Node)) {
//         setCatOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', fn);
//     return () => document.removeEventListener('mousedown', fn);
//   }, []);

//   return (
//     <>
//       <style>{`
//         .ilh-hdr {
//           position:fixed; top:0; left:0; right:0; z-index:100;
//           background:rgba(10,10,10,0.92);
//           backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
//           transition:background .4s,box-shadow .4s;
//         }
//         .ilh-hdr.scr { background:rgba(10,10,10,0.98); box-shadow:0 2px 24px rgba(0,0,0,0.5); }
//         .ilh-st { height:1px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); opacity:.7; }
//         .ilh-sb { height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent); }

//         .ilh-bar {
//           max-width:1400px; margin:0 auto; padding:0 32px; height:72px;
//           display:flex; align-items:center; justify-content:space-between; gap:16px;
//         }

//         /* LOGO */
//         .ilh-logo { display:flex; align-items:center; gap:6px; text-decoration:none; flex-shrink:0; }
//         .ilh-logo-img { position:relative; width:48px; height:48px; flex-shrink:0; }
//         .ilh-logo-text { display:flex; flex-direction:column; justify-content:center; }
//         .ilh-logo-t { font-family:Georgia,serif; font-size:20px; font-weight:300; color:#DFC27A; letter-spacing:.28em; text-transform:uppercase; line-height:1.1; display:block; }
//         .ilh-logo-s { font-size:7.5px; color:rgba(201,168,76,.5); letter-spacing:.22em; text-transform:uppercase; margin-top:4px; display:block; }

//         /* DESKTOP NAV */
//         .ilh-nav { display:flex; align-items:center; }

//         .ilh-nl {
//           font-size:13px; letter-spacing:.12em; text-transform:uppercase;
//           color:rgba(201,168,76,.6); text-decoration:none;
//           padding:8px 11px; border-bottom:1px solid transparent;
//           transition:color .2s,border-color .2s; white-space:nowrap; display:inline-block;
//         }
//         .ilh-nl:hover,.ilh-nl.act { color:#DFC27A; border-bottom-color:#C9A84C; }

//         .ilh-pw {
//           font-size:13px; letter-spacing:.12em; text-transform:uppercase;
//           color:#C9A84C; text-decoration:none; padding:6px 14px; margin-left:6px;
//           border:1px solid rgba(201,168,76,.4); transition:all .2s; white-space:nowrap;
//         }
//         .ilh-pw:hover,.ilh-pw.act { background:#C9A84C; color:#1A1A1A; }

//         /* CAT DROPDOWN */
//         .ilh-cw { position:relative; }
//         .ilh-cb {
//           font-size:13px; letter-spacing:.12em; text-transform:uppercase;
//           color:rgba(201,168,76,.6); background:none; border:none;
//           border-bottom:1px solid transparent; padding:8px 11px; cursor:pointer;
//           font-family:Georgia,serif; display:flex; align-items:center; gap:5px;
//           transition:color .2s; white-space:nowrap; height:72px;
//         }
//         .ilh-cb:hover,.ilh-cb.op,.ilh-cb.ca { color:#DFC27A; }
//         .ilh-cb.ca { border-bottom-color:#C9A84C; font-weight:500; }
//         .ilh-arr { transition:transform .25s; display:flex; align-items:center; }
//         .ilh-cb.op .ilh-arr { transform:rotate(180deg); }

//         .ilh-dd {
//           position:absolute; top:calc(100% + 2px); left:50%;
//           transform:translateX(-50%) translateY(-8px);
//           min-width:256px; background:rgba(5,5,5,.99);
//           border:1px solid rgba(201,168,76,.22);
//           box-shadow:0 20px 60px rgba(0,0,0,.8);
//           opacity:0; visibility:hidden;
//           transition:opacity .22s,transform .22s,visibility .22s;
//           z-index:200; overflow:hidden;
//         }
//         .ilh-dd.op { opacity:1; visibility:visible; transform:translateX(-50%) translateY(0); }
//         .ilh-dg { height:2px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); }
//         .ilh-db { padding:6px 0 8px; }
//         .ilh-dv { height:1px; background:rgba(201,168,76,.1); margin:4px 0; }
//         .ilh-di {
//           display:flex; align-items:center; gap:12px; padding:11px 20px;
//           font-size:13px; letter-spacing:.16em; text-transform:uppercase;
//           color:rgba(201,168,76,.58); text-decoration:none;
//           border-left:2px solid transparent; transition:all .18s; font-family:Georgia,serif;
//         }
//         .ilh-di:hover { color:#DFC27A; background:rgba(201,168,76,.07); border-left-color:rgba(201,168,76,.5); }
//         .ilh-di.act { color:#DFC27A; background:rgba(201,168,76,.09); border-left-color:#C9A84C; }
//         .ilh-ic { font-size:14px; width:20px; text-align:center; opacity:.85; }

//         /* HAMBURGER */
//         .ilh-hm {
//           display:none; flex-direction:column; gap:5px;
//           background:none; border:none; color:#C9A84C; cursor:pointer; padding:8px;
//         }
//         .ilh-hl { width:24px; height:1.5px; background:#C9A84C; transition:all .3s; transform-origin:center; display:block; border-radius:1px; }
//         .ilh-hm.op .ilh-hl:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
//         .ilh-hm.op .ilh-hl:nth-child(2) { opacity:0; transform:scaleX(0); }
//         .ilh-hm.op .ilh-hl:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }

//         /* MOBILE MENU */
//         .ilh-mm { background:#070707; border-top:1px solid rgba(201,168,76,.1); max-height:0; overflow:hidden; transition:max-height .38s cubic-bezier(.4,0,.2,1); }
//         .ilh-mm.op { max-height:700px; }

//         .ilh-ml {
//           display:flex; align-items:center; padding:15px 28px;
//           font-size:14px; letter-spacing:.18em; text-transform:uppercase;
//           color:rgba(201,168,76,.65); text-decoration:none;
//           border-bottom:1px solid rgba(201,168,76,.07);
//           transition:background .2s,color .2s; font-family:Georgia,serif;
//         }
//         .ilh-ml:hover { background:rgba(201,168,76,.05); color:#DFC27A; }
//         .ilh-ml.act { color:#DFC27A; background:rgba(201,168,76,.05); }
//         .ilh-ml.pw  { color:#C9A84C; font-weight:600; }

//         .ilh-mcb {
//           width:100%; display:flex; align-items:center; justify-content:space-between;
//           padding:15px 28px; font-size:14px; letter-spacing:.18em; text-transform:uppercase;
//           color:rgba(201,168,76,.65); background:none; border:none;
//           border-bottom:1px solid rgba(201,168,76,.07);
//           cursor:pointer; font-family:Georgia,serif; transition:all .2s;
//         }
//         .ilh-mcb:hover,.ilh-mcb.op { color:#DFC27A; background:rgba(201,168,76,.04); }
//         .ilh-ma { transition:transform .25s; display:flex; }
//         .ilh-mcb.op .ilh-ma { transform:rotate(180deg); }

//         .ilh-sl { max-height:0; overflow:hidden; transition:max-height .3s ease; background:rgba(201,168,76,.025); }
//         .ilh-sl.op { max-height:500px; }
//         .ilh-si {
//           display:flex; align-items:center; gap:12px; padding:12px 28px 12px 44px;
//           font-size:13px; letter-spacing:.16em; text-transform:uppercase;
//           color:rgba(201,168,76,.5); text-decoration:none;
//           border-bottom:1px solid rgba(201,168,76,.05);
//           border-left:2px solid transparent; transition:all .18s; font-family:Georgia,serif;
//         }
//         .ilh-si:hover { color:#DFC27A; background:rgba(201,168,76,.06); border-left-color:rgba(201,168,76,.4); }
//         .ilh-si.act { color:#DFC27A; border-left-color:#C9A84C; }

//         /* RESPONSIVE */
//         @media(max-width:1100px){ .ilh-nav{display:none!important;} .ilh-hm{display:flex!important;} }
//         @media(max-width:768px) { .ilh-bar{padding:0 20px!important;} }
//         @media(max-width:480px) { .ilh-bar{padding:0 16px!important;height:64px!important;} .ilh-logo{gap:4px!important;} .ilh-logo-img{width:40px!important;height:40px!important;} .ilh-logo-t{font-size:16px!important;letter-spacing:.2em!important;} .ilh-logo-s{font-size:6.5px!important;letter-spacing:.18em!important;} }
//       `}</style>

//       <header className={`ilh-hdr${scrolled ? ' scr' : ''}`}>
//         <div className="ilh-st" />

//         <div className="ilh-bar">

//           {/* ── LOGO ── */}
//           <Link href="/" className="ilh-logo">
//             <div className="ilh-logo-img">
//               <Image
//                 src="/logos.png"
//                 alt="Indian Luxury House"
//                 fill
//                 style={{ objectFit: 'contain' }}
//                 priority
//               />
//             </div>
//             <div className="ilh-logo-text">
//               <span className="ilh-logo-t">Indian</span>
//               <span className="ilh-logo-s">Luxury House</span>
//             </div>
//           </Link>

//           {/* ── DESKTOP NAV ── */}
//           <nav className="ilh-nav">
//             <Link href="/"     className={`ilh-nl${activeHref==='/'     ? ' act':''}`}>Home</Link>
//             <Link href="/news" className={`ilh-nl${activeHref==='/news' ? ' act':''}`}>News</Link>

//             {/* Categories Dropdown */}
//             <div className="ilh-cw" ref={catWrapRef}>
//               <button
//                 className={`ilh-cb${catOpen?' op':''}${isCatActive?' ca':''}`}
//                 onClick={() => setCatOpen(p => !p)}
//               >
//                 Categories
//                 <span className="ilh-arr">
//                   <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
//                     <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
//                   </svg>
//                 </span>
//               </button>

//               <div className={`ilh-dd${catOpen?' op':''}`}>
//                 <div className="ilh-dg" />
//                 <div className="ilh-db">
//                   {CATEGORIES.map(cat => (
//                     <span key={cat.href}>
//                       {cat.label === 'Hospitality' && <div className="ilh-dv" />}
//                       <Link
//                         href={cat.href}
//                         onClick={() => setCatOpen(false)}
//                         className={`ilh-di${activeHref===cat.href?' act':''}`}
//                       >
//                         <span className="ilh-ic">{cat.icon}</span>
//                         {cat.label}
//                       </Link>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <Link href="/partner-with-us" className={`ilh-pw${activeHref==='/partner-with-us'?' act':''}`}>
//               Partner With Us
//             </Link>
//             <Link href="/about" className={`ilh-nl${activeHref==='/about'?' act':''}`}>About</Link>
//           </nav>

//           {/* ── HAMBURGER ── */}
//           <button
//             className={`ilh-hm${menuOpen?' op':''}`}
//             onClick={() => setMenuOpen(p => !p)}
//             aria-label="Menu"
//           >
//             <span className="ilh-hl" />
//             <span className="ilh-hl" />
//             <span className="ilh-hl" />
//           </button>
//         </div>

//         {/* ── MOBILE MENU ── */}
//         <div className={`ilh-mm${menuOpen?' op':''}`}>
//           <Link href="/" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/'?' act':''}`}>Home</Link>
//           <Link href="/news" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/news'?' act':''}`}>News</Link>

//           {/* Categories accordion */}
//           <button className={`ilh-mcb${mobCatOpen?' op':''}`} onClick={()=>setMobCatOpen(p=>!p)}>
//             <span>Categories</span>
//             <span className="ilh-ma">
//               <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                 <path d="M2 3.5L5 6.5L8 3.5" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
//               </svg>
//             </span>
//           </button>
//           <div className={`ilh-sl${mobCatOpen?' op':''}`}>
//             {CATEGORIES.map(cat => (
//               <Link key={cat.href} href={cat.href}
//                 onClick={()=>{setMenuOpen(false);setMobCatOpen(false);}}
//                 className={`ilh-si${activeHref===cat.href?' act':''}`}
//               >
//                 <span>{cat.icon}</span>{cat.label}
//               </Link>
//             ))}
//           </div>

//           <Link href="/partner-with-us" onClick={()=>setMenuOpen(false)} className={`ilh-ml pw${activeHref==='/partner-with-us'?' act':''}`}>Partner With Us</Link>
//           <Link href="/about" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/about'?' act':''}`}>About</Link>
//         </div>

//         <div className="ilh-sb" />
//       </header>
//     </>
//   );
// }



// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect, useRef } from 'react';

// // ── CATEGORIES (dropdown mein dikhte hain) ────────────────────
// const CATEGORIES = [
//   { label: 'Real Estate',         href: '/real-estate',      icon: '🏛️' },
//   { label: 'Automobiles',         href: '/automobiles',       icon: '🚗' },
//   { label: 'Jewellery & Watches', href: '/jewellery-watches', icon: '💎' },
//   { label: 'Weddings',            href: '/weddings',          icon: '✨' },
//   { label: 'Curated Partners',    href: '/curated-partners',  icon: '🤝' },
//   { label: 'Hospitality',         href: '/hospitality',       icon: '🏨' },
//   { label: 'Beauty',              href: '/beauty',            icon: '🌸' },
// ];

// const CAT_HREFS = CATEGORIES.map(c => c.href);

// export default function Navbar({ activeHref = '' }: { activeHref?: string }) {
//   const [scrolled,   setScrolled]   = useState(false);
//   const [menuOpen,   setMenuOpen]   = useState(false);
//   const [catOpen,    setCatOpen]    = useState(false);
//   const [mobCatOpen, setMobCatOpen] = useState(false);
//   const catWrapRef = useRef<HTMLDivElement>(null);

//   const isCatActive = CAT_HREFS.includes(activeHref);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   useEffect(() => {
//     const fn = (e: MouseEvent) => {
//       if (catWrapRef.current && !catWrapRef.current.contains(e.target as Node)) {
//         setCatOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', fn);
//     return () => document.removeEventListener('mousedown', fn);
//   }, []);

//   return (
//     <>
//       <style>{`
//         .ilh-hdr {
//           position:fixed; top:0; left:0; right:0; z-index:100;
//           background:rgba(10,10,10,0.92);
//           backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
//           transition:background .4s,box-shadow .4s;
//         }
//         .ilh-hdr.scr { background:rgba(10,10,10,0.98); box-shadow:0 2px 24px rgba(0,0,0,0.5); }
//         .ilh-st { height:1px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); opacity:.7; }
//         .ilh-sb { height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent); }

//         .ilh-bar {
//           max-width:1400px; margin:0 auto; padding:0 32px; height:72px;
//           display:flex; align-items:center; justify-content:space-between; gap:16px;
//         }

//         /* LOGO */
//         .ilh-logo { display:flex; align-items:center; gap:12px; text-decoration:none; flex-shrink:0; }
//         .ilh-logo-img { position:relative; width:58px; height:58px; flex-shrink:0; }
//         .ilh-logo-t { font-family:Georgia,serif; font-size:24px; font-weight:300; color:#DFC27A; letter-spacing:.3em; text-transform:uppercase; line-height:1; display:block; }
//         .ilh-logo-s { font-size:9px; color:rgba(201,168,76,.45); letter-spacing:.4em; text-transform:uppercase; margin-top:4px; display:block; }

//         /* DESKTOP NAV */
//         .ilh-nav { display:flex; align-items:center; }

//         .ilh-nl {
//           font-size:13px; letter-spacing:.12em; text-transform:uppercase;
//           color:rgba(201,168,76,.6); text-decoration:none;
//           padding:8px 11px; border-bottom:1px solid transparent;
//           transition:color .2s,border-color .2s; white-space:nowrap; display:inline-block;
//         }
//         .ilh-nl:hover,.ilh-nl.act { color:#DFC27A; border-bottom-color:#C9A84C; }

//         .ilh-pw {
//           font-size:13px; letter-spacing:.12em; text-transform:uppercase;
//           color:#C9A84C; text-decoration:none; padding:6px 14px; margin-left:6px;
//           border:1px solid rgba(201,168,76,.4); transition:all .2s; white-space:nowrap;
//         }
//         .ilh-pw:hover,.ilh-pw.act { background:#C9A84C; color:#1A1A1A; }

//         /* CAT DROPDOWN */
//         .ilh-cw { position:relative; }
//         .ilh-cb {
//           font-size:13px; letter-spacing:.12em; text-transform:uppercase;
//           color:rgba(201,168,76,.6); background:none; border:none;
//           border-bottom:1px solid transparent; padding:8px 11px; cursor:pointer;
//           font-family:Georgia,serif; display:flex; align-items:center; gap:5px;
//           transition:color .2s; white-space:nowrap; height:72px;
//         }
//         .ilh-cb:hover,.ilh-cb.op,.ilh-cb.ca { color:#DFC27A; }
//         .ilh-cb.ca { border-bottom-color:#C9A84C; font-weight:500; }
//         .ilh-arr { transition:transform .25s; display:flex; align-items:center; }
//         .ilh-cb.op .ilh-arr { transform:rotate(180deg); }

//         .ilh-dd {
//           position:absolute; top:calc(100% + 2px); left:50%;
//           transform:translateX(-50%) translateY(-8px);
//           min-width:256px; background:rgba(5,5,5,.99);
//           border:1px solid rgba(201,168,76,.22);
//           box-shadow:0 20px 60px rgba(0,0,0,.8);
//           opacity:0; visibility:hidden;
//           transition:opacity .22s,transform .22s,visibility .22s;
//           z-index:200; overflow:hidden;
//         }
//         .ilh-dd.op { opacity:1; visibility:visible; transform:translateX(-50%) translateY(0); }
//         .ilh-dg { height:2px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); }
//         .ilh-db { padding:6px 0 8px; }
//         .ilh-dv { height:1px; background:rgba(201,168,76,.1); margin:4px 0; }
//         .ilh-di {
//           display:flex; align-items:center; gap:12px; padding:11px 20px;
//           font-size:13px; letter-spacing:.16em; text-transform:uppercase;
//           color:rgba(201,168,76,.58); text-decoration:none;
//           border-left:2px solid transparent; transition:all .18s; font-family:Georgia,serif;
//         }
//         .ilh-di:hover { color:#DFC27A; background:rgba(201,168,76,.07); border-left-color:rgba(201,168,76,.5); }
//         .ilh-di.act { color:#DFC27A; background:rgba(201,168,76,.09); border-left-color:#C9A84C; }
//         .ilh-ic { font-size:14px; width:20px; text-align:center; opacity:.85; }

//         /* HAMBURGER */
//         .ilh-hm {
//           display:none; flex-direction:column; gap:5px;
//           background:none; border:none; color:#C9A84C; cursor:pointer; padding:8px;
//         }
//         .ilh-hl { width:24px; height:1.5px; background:#C9A84C; transition:all .3s; transform-origin:center; display:block; border-radius:1px; }
//         .ilh-hm.op .ilh-hl:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
//         .ilh-hm.op .ilh-hl:nth-child(2) { opacity:0; transform:scaleX(0); }
//         .ilh-hm.op .ilh-hl:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }

//         /* MOBILE MENU */
//         .ilh-mm { background:#070707; border-top:1px solid rgba(201,168,76,.1); max-height:0; overflow:hidden; transition:max-height .38s cubic-bezier(.4,0,.2,1); }
//         .ilh-mm.op { max-height:700px; }

//         .ilh-ml {
//           display:flex; align-items:center; padding:15px 28px;
//           font-size:14px; letter-spacing:.18em; text-transform:uppercase;
//           color:rgba(201,168,76,.65); text-decoration:none;
//           border-bottom:1px solid rgba(201,168,76,.07);
//           transition:background .2s,color .2s; font-family:Georgia,serif;
//         }
//         .ilh-ml:hover { background:rgba(201,168,76,.05); color:#DFC27A; }
//         .ilh-ml.act { color:#DFC27A; background:rgba(201,168,76,.05); }
//         .ilh-ml.pw  { color:#C9A84C; font-weight:600; }

//         .ilh-mcb {
//           width:100%; display:flex; align-items:center; justify-content:space-between;
//           padding:15px 28px; font-size:14px; letter-spacing:.18em; text-transform:uppercase;
//           color:rgba(201,168,76,.65); background:none; border:none;
//           border-bottom:1px solid rgba(201,168,76,.07);
//           cursor:pointer; font-family:Georgia,serif; transition:all .2s;
//         }
//         .ilh-mcb:hover,.ilh-mcb.op { color:#DFC27A; background:rgba(201,168,76,.04); }
//         .ilh-ma { transition:transform .25s; display:flex; }
//         .ilh-mcb.op .ilh-ma { transform:rotate(180deg); }

//         .ilh-sl { max-height:0; overflow:hidden; transition:max-height .3s ease; background:rgba(201,168,76,.025); }
//         .ilh-sl.op { max-height:500px; }
//         .ilh-si {
//           display:flex; align-items:center; gap:12px; padding:12px 28px 12px 44px;
//           font-size:13px; letter-spacing:.16em; text-transform:uppercase;
//           color:rgba(201,168,76,.5); text-decoration:none;
//           border-bottom:1px solid rgba(201,168,76,.05);
//           border-left:2px solid transparent; transition:all .18s; font-family:Georgia,serif;
//         }
//         .ilh-si:hover { color:#DFC27A; background:rgba(201,168,76,.06); border-left-color:rgba(201,168,76,.4); }
//         .ilh-si.act { color:#DFC27A; border-left-color:#C9A84C; }

//         /* RESPONSIVE */
//         @media(max-width:1100px){ .ilh-nav{display:none!important;} .ilh-hm{display:flex!important;} }
//         @media(max-width:768px) { .ilh-bar{padding:0 20px!important;} }
//         @media(max-width:480px) { .ilh-bar{padding:0 16px!important;height:64px!important;} .ilh-logo-t{font-size:18px!important;letter-spacing:.2em!important;} .ilh-logo-s{font-size:7px!important;} .ilh-logo-img{width:44px!important;height:44px!important;} }
//       `}</style>

//       <header className={`ilh-hdr${scrolled ? ' scr' : ''}`}>
//         <div className="ilh-st" />

//         <div className="ilh-bar">

//           {/* ── LOGO ── */}
//           <Link href="/" className="ilh-logo">
//             <div className="ilh-logo-img">
//               <Image
//                 src="/logos.png"
//                 alt="Indian Luxury House"
//                 fill
//                 style={{ objectFit: 'contain' }}
//                 priority
//               />
//             </div>
//             <div>
//               <span className="ilh-logo-t">Indian</span>
//               <span className="ilh-logo-s">Luxury House</span>
//             </div>
//           </Link>

//           {/* ── DESKTOP NAV ── */}
//           <nav className="ilh-nav">
//             <Link href="/"     className={`ilh-nl${activeHref==='/'     ? ' act':''}`}>Home</Link>
//             <Link href="/news" className={`ilh-nl${activeHref==='/news' ? ' act':''}`}>News</Link>

//             {/* Categories Dropdown */}
//             <div className="ilh-cw" ref={catWrapRef}>
//               <button
//                 className={`ilh-cb${catOpen?' op':''}${isCatActive?' ca':''}`}
//                 onClick={() => setCatOpen(p => !p)}
//               >
//                 Categories
//                 <span className="ilh-arr">
//                   <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
//                     <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
//                   </svg>
//                 </span>
//               </button>

//               <div className={`ilh-dd${catOpen?' op':''}`}>
//                 <div className="ilh-dg" />
//                 <div className="ilh-db">
//                   {CATEGORIES.map(cat => (
//                     <span key={cat.href}>
//                       {cat.label === 'Hospitality' && <div className="ilh-dv" />}
//                       <Link
//                         href={cat.href}
//                         onClick={() => setCatOpen(false)}
//                         className={`ilh-di${activeHref===cat.href?' act':''}`}
//                       >
//                         <span className="ilh-ic">{cat.icon}</span>
//                         {cat.label}
//                       </Link>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <Link href="/partner-with-us" className={`ilh-pw${activeHref==='/partner-with-us'?' act':''}`}>
//               Partner With Us
//             </Link>
//             <Link href="/about" className={`ilh-nl${activeHref==='/about'?' act':''}`}>About</Link>
//           </nav>

//           {/* ── HAMBURGER ── */}
//           <button
//             className={`ilh-hm${menuOpen?' op':''}`}
//             onClick={() => setMenuOpen(p => !p)}
//             aria-label="Menu"
//           >
//             <span className="ilh-hl" />
//             <span className="ilh-hl" />
//             <span className="ilh-hl" />
//           </button>
//         </div>

//         {/* ── MOBILE MENU ── */}
//         <div className={`ilh-mm${menuOpen?' op':''}`}>
//           <Link href="/" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/'?' act':''}`}>Home</Link>
//           <Link href="/news" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/news'?' act':''}`}>News</Link>

//           {/* Categories accordion */}
//           <button className={`ilh-mcb${mobCatOpen?' op':''}`} onClick={()=>setMobCatOpen(p=>!p)}>
//             <span>Categories</span>
//             <span className="ilh-ma">
//               <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                 <path d="M2 3.5L5 6.5L8 3.5" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
//               </svg>
//             </span>
//           </button>
//           <div className={`ilh-sl${mobCatOpen?' op':''}`}>
//             {CATEGORIES.map(cat => (
//               <Link key={cat.href} href={cat.href}
//                 onClick={()=>{setMenuOpen(false);setMobCatOpen(false);}}
//                 className={`ilh-si${activeHref===cat.href?' act':''}`}
//               >
//                 <span>{cat.icon}</span>{cat.label}
//               </Link>
//             ))}
//           </div>

//           <Link href="/partner-with-us" onClick={()=>setMenuOpen(false)} className={`ilh-ml pw${activeHref==='/partner-with-us'?' act':''}`}>Partner With Us</Link>
//           <Link href="/about" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/about'?' act':''}`}>About</Link>
//         </div>

//         <div className="ilh-sb" />
//       </header>
//     </>
//   );
// }


// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect, useRef } from 'react';

// // ── CATEGORIES (dropdown mein dikhte hain) ────────────────────
// const CATEGORIES = [
//   { label: 'Real Estate',         href: '/real-estate',      icon: '🏛️' },
//   { label: 'Automobiles',         href: '/automobiles',       icon: '🚗' },
//   { label: 'Jewellery & Watches', href: '/jewellery-watches', icon: '💎' },
//   { label: 'Weddings',            href: '/weddings',          icon: '✨' },
//   { label: 'Curated Partners',    href: '/curated-partners',  icon: '🤝' },
//   { label: 'Hospitality',         href: '/hospitality',       icon: '🏨' },
//   { label: 'Beauty',              href: '/beauty',            icon: '🌸' },
// ];

// const CAT_HREFS = CATEGORIES.map(c => c.href);

// export default function Navbar({ activeHref = '' }: { activeHref?: string }) {
//   const [scrolled,   setScrolled]   = useState(false);
//   const [menuOpen,   setMenuOpen]   = useState(false);
//   const [catOpen,    setCatOpen]    = useState(false);
//   const [mobCatOpen, setMobCatOpen] = useState(false);
//   const catWrapRef = useRef<HTMLDivElement>(null);

//   const isCatActive = CAT_HREFS.includes(activeHref);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', fn, { passive: true });
//     return () => window.removeEventListener('scroll', fn);
//   }, []);

//   useEffect(() => {
//     const fn = (e: MouseEvent) => {
//       if (catWrapRef.current && !catWrapRef.current.contains(e.target as Node)) {
//         setCatOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', fn);
//     return () => document.removeEventListener('mousedown', fn);
//   }, []);

//   return (
//     <>
//       <style>{`
//         .ilh-hdr {
//           position:fixed; top:0; left:0; right:0; z-index:100;
//           background:rgba(10,10,10,0.92);
//           backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
//           transition:background .4s,box-shadow .4s;
//         }
//         .ilh-hdr.scr { background:rgba(10,10,10,0.98); box-shadow:0 2px 24px rgba(0,0,0,0.5); }
//         .ilh-st { height:1px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); opacity:.7; }
//         .ilh-sb { height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent); }

//         .ilh-bar {
//           max-width:1400px; margin:0 auto; padding:0 32px; height:72px;
//           display:flex; align-items:center; justify-content:space-between; gap:16px;
//         }

//         /* LOGO */
//         .ilh-logo { display:flex; align-items:center; gap:12px; text-decoration:none; flex-shrink:0; }
//         .ilh-logo-img { position:relative; width:58px; height:58px; flex-shrink:0; }
//         .ilh-logo-t { font-family:Georgia,serif; font-size:24px; font-weight:300; color:#DFC27A; letter-spacing:.3em; text-transform:uppercase; line-height:1; display:block; }
//         .ilh-logo-s { font-size:9px; color:rgba(201,168,76,.45); letter-spacing:.4em; text-transform:uppercase; margin-top:4px; display:block; }

//         /* DESKTOP NAV */
//         .ilh-nav { display:flex; align-items:center; }

//         .ilh-nl {
//           font-size:9px; letter-spacing:.12em; text-transform:uppercase;
//           color:rgba(201,168,76,.6); text-decoration:none;
//           padding:8px 11px; border-bottom:1px solid transparent;
//           transition:color .2s,border-color .2s; white-space:nowrap; display:inline-block;
//         }
//         .ilh-nl:hover,.ilh-nl.act { color:#DFC27A; border-bottom-color:#C9A84C; }

//         .ilh-pw {
//           font-size:9px; letter-spacing:.12em; text-transform:uppercase;
//           color:#C9A84C; text-decoration:none; padding:6px 14px; margin-left:6px;
//           border:1px solid rgba(201,168,76,.4); transition:all .2s; white-space:nowrap;
//         }
//         .ilh-pw:hover,.ilh-pw.act { background:#C9A84C; color:#1A1A1A; }

//         /* CAT DROPDOWN */
//         .ilh-cw { position:relative; }
//         .ilh-cb {
//           font-size:9px; letter-spacing:.12em; text-transform:uppercase;
//           color:rgba(201,168,76,.6); background:none; border:none;
//           border-bottom:1px solid transparent; padding:8px 11px; cursor:pointer;
//           font-family:Georgia,serif; display:flex; align-items:center; gap:5px;
//           transition:color .2s; white-space:nowrap; height:72px;
//         }
//         .ilh-cb:hover,.ilh-cb.op,.ilh-cb.ca { color:#DFC27A; }
//         .ilh-cb.ca { border-bottom-color:#C9A84C; font-weight:500; }
//         .ilh-arr { transition:transform .25s; display:flex; align-items:center; }
//         .ilh-cb.op .ilh-arr { transform:rotate(180deg); }

//         .ilh-dd {
//           position:absolute; top:calc(100% + 2px); left:50%;
//           transform:translateX(-50%) translateY(-8px);
//           min-width:256px; background:rgba(5,5,5,.99);
//           border:1px solid rgba(201,168,76,.22);
//           box-shadow:0 20px 60px rgba(0,0,0,.8);
//           opacity:0; visibility:hidden;
//           transition:opacity .22s,transform .22s,visibility .22s;
//           z-index:200; overflow:hidden;
//         }
//         .ilh-dd.op { opacity:1; visibility:visible; transform:translateX(-50%) translateY(0); }
//         .ilh-dg { height:2px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); }
//         .ilh-db { padding:6px 0 8px; }
//         .ilh-dv { height:1px; background:rgba(201,168,76,.1); margin:4px 0; }
//         .ilh-di {
//           display:flex; align-items:center; gap:12px; padding:11px 20px;
//           font-size:9px; letter-spacing:.16em; text-transform:uppercase;
//           color:rgba(201,168,76,.58); text-decoration:none;
//           border-left:2px solid transparent; transition:all .18s; font-family:Georgia,serif;
//         }
//         .ilh-di:hover { color:#DFC27A; background:rgba(201,168,76,.07); border-left-color:rgba(201,168,76,.5); }
//         .ilh-di.act { color:#DFC27A; background:rgba(201,168,76,.09); border-left-color:#C9A84C; }
//         .ilh-ic { font-size:14px; width:20px; text-align:center; opacity:.85; }

//         /* HAMBURGER */
//         .ilh-hm {
//           display:none; flex-direction:column; gap:5px;
//           background:none; border:none; color:#C9A84C; cursor:pointer; padding:8px;
//         }
//         .ilh-hl { width:24px; height:1.5px; background:#C9A84C; transition:all .3s; transform-origin:center; display:block; border-radius:1px; }
//         .ilh-hm.op .ilh-hl:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
//         .ilh-hm.op .ilh-hl:nth-child(2) { opacity:0; transform:scaleX(0); }
//         .ilh-hm.op .ilh-hl:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }

//         /* MOBILE MENU */
//         .ilh-mm { background:#070707; border-top:1px solid rgba(201,168,76,.1); max-height:0; overflow:hidden; transition:max-height .38s cubic-bezier(.4,0,.2,1); }
//         .ilh-mm.op { max-height:700px; }

//         .ilh-ml {
//           display:flex; align-items:center; padding:15px 28px;
//           font-size:10px; letter-spacing:.18em; text-transform:uppercase;
//           color:rgba(201,168,76,.65); text-decoration:none;
//           border-bottom:1px solid rgba(201,168,76,.07);
//           transition:background .2s,color .2s; font-family:Georgia,serif;
//         }
//         .ilh-ml:hover { background:rgba(201,168,76,.05); color:#DFC27A; }
//         .ilh-ml.act { color:#DFC27A; background:rgba(201,168,76,.05); }
//         .ilh-ml.pw  { color:#C9A84C; font-weight:600; }

//         .ilh-mcb {
//           width:100%; display:flex; align-items:center; justify-content:space-between;
//           padding:15px 28px; font-size:10px; letter-spacing:.18em; text-transform:uppercase;
//           color:rgba(201,168,76,.65); background:none; border:none;
//           border-bottom:1px solid rgba(201,168,76,.07);
//           cursor:pointer; font-family:Georgia,serif; transition:all .2s;
//         }
//         .ilh-mcb:hover,.ilh-mcb.op { color:#DFC27A; background:rgba(201,168,76,.04); }
//         .ilh-ma { transition:transform .25s; display:flex; }
//         .ilh-mcb.op .ilh-ma { transform:rotate(180deg); }

//         .ilh-sl { max-height:0; overflow:hidden; transition:max-height .3s ease; background:rgba(201,168,76,.025); }
//         .ilh-sl.op { max-height:500px; }
//         .ilh-si {
//           display:flex; align-items:center; gap:12px; padding:12px 28px 12px 44px;
//           font-size:9px; letter-spacing:.16em; text-transform:uppercase;
//           color:rgba(201,168,76,.5); text-decoration:none;
//           border-bottom:1px solid rgba(201,168,76,.05);
//           border-left:2px solid transparent; transition:all .18s; font-family:Georgia,serif;
//         }
//         .ilh-si:hover { color:#DFC27A; background:rgba(201,168,76,.06); border-left-color:rgba(201,168,76,.4); }
//         .ilh-si.act { color:#DFC27A; border-left-color:#C9A84C; }

//         /* RESPONSIVE */
//         @media(max-width:1100px){ .ilh-nav{display:none!important;} .ilh-hm{display:flex!important;} }
//         @media(max-width:768px) { .ilh-bar{padding:0 20px!important;} }
//         @media(max-width:480px) { .ilh-bar{padding:0 16px!important;height:64px!important;} .ilh-logo-t{font-size:18px!important;letter-spacing:.2em!important;} .ilh-logo-s{font-size:7px!important;} .ilh-logo-img{width:44px!important;height:44px!important;} }
//       `}</style>

//       <header className={`ilh-hdr${scrolled ? ' scr' : ''}`}>
//         <div className="ilh-st" />

//         <div className="ilh-bar">

//           {/* ── LOGO ── */}
//           <Link href="/" className="ilh-logo">
//             <div className="ilh-logo-img">
//               <Image
//                 src="/logos.png"
//                 alt="Indian Luxury House"
//                 fill
//                 style={{ objectFit: 'contain' }}
//                 priority
//               />
//             </div>
//             <div>
//               <span className="ilh-logo-t">Indian</span>
//               <span className="ilh-logo-s">Luxury House</span>
//             </div>
//           </Link>

//           {/* ── DESKTOP NAV ── */}
//           <nav className="ilh-nav">
//             <Link href="/"     className={`ilh-nl${activeHref==='/'     ? ' act':''}`}>Home</Link>
//             <Link href="/news" className={`ilh-nl${activeHref==='/news' ? ' act':''}`}>News</Link>

//             {/* Categories Dropdown */}
//             <div className="ilh-cw" ref={catWrapRef}>
//               <button
//                 className={`ilh-cb${catOpen?' op':''}${isCatActive?' ca':''}`}
//                 onClick={() => setCatOpen(p => !p)}
//               >
//                 Categories
//                 <span className="ilh-arr">
//                   <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
//                     <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
//                   </svg>
//                 </span>
//               </button>

//               <div className={`ilh-dd${catOpen?' op':''}`}>
//                 <div className="ilh-dg" />
//                 <div className="ilh-db">
//                   {CATEGORIES.map(cat => (
//                     <span key={cat.href}>
//                       {cat.label === 'Hospitality' && <div className="ilh-dv" />}
//                       <Link
//                         href={cat.href}
//                         onClick={() => setCatOpen(false)}
//                         className={`ilh-di${activeHref===cat.href?' act':''}`}
//                       >
//                         <span className="ilh-ic">{cat.icon}</span>
//                         {cat.label}
//                       </Link>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <Link href="/partner-with-us" className={`ilh-pw${activeHref==='/partner-with-us'?' act':''}`}>
//               Partner With Us
//             </Link>
//             <Link href="/about" className={`ilh-nl${activeHref==='/about'?' act':''}`}>About</Link>
//           </nav>

//           {/* ── HAMBURGER ── */}
//           <button
//             className={`ilh-hm${menuOpen?' op':''}`}
//             onClick={() => setMenuOpen(p => !p)}
//             aria-label="Menu"
//           >
//             <span className="ilh-hl" />
//             <span className="ilh-hl" />
//             <span className="ilh-hl" />
//           </button>
//         </div>

//         {/* ── MOBILE MENU ── */}
//         <div className={`ilh-mm${menuOpen?' op':''}`}>
//           <Link href="/" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/'?' act':''}`}>Home</Link>
//           <Link href="/news" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/news'?' act':''}`}>News</Link>

//           {/* Categories accordion */}
//           <button className={`ilh-mcb${mobCatOpen?' op':''}`} onClick={()=>setMobCatOpen(p=>!p)}>
//             <span>Categories</span>
//             <span className="ilh-ma">
//               <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                 <path d="M2 3.5L5 6.5L8 3.5" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
//               </svg>
//             </span>
//           </button>
//           <div className={`ilh-sl${mobCatOpen?' op':''}`}>
//             {CATEGORIES.map(cat => (
//               <Link key={cat.href} href={cat.href}
//                 onClick={()=>{setMenuOpen(false);setMobCatOpen(false);}}
//                 className={`ilh-si${activeHref===cat.href?' act':''}`}
//               >
//                 <span>{cat.icon}</span>{cat.label}
//               </Link>
//             ))}
//           </div>

//           <Link href="/partner-with-us" onClick={()=>setMenuOpen(false)} className={`ilh-ml pw${activeHref==='/partner-with-us'?' act':''}`}>Partner With Us</Link>
//           <Link href="/about" onClick={()=>setMenuOpen(false)} className={`ilh-ml${activeHref==='/about'?' act':''}`}>About</Link>
//         </div>

//         <div className="ilh-sb" />
//       </header>
//     </>
//   );
// }


// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// // ── NAV LINKS — sirf yahan change karo, sab update ho jayega ──
// export const NAV_LINKS = [
//   { label: 'Home',                href: '/'                  },
//   { label: 'News',                href: '/news'              },
//   { label: 'Real Estate',         href: '/real-estate'       },
//   { label: 'Automobiles',         href: '/automobiles'       },
//   { label: 'Jewellery & Watches', href: '/jewellery-watches' },
//   { label: 'Weddings',            href: '/weddings'          },
//   { label: 'Curated Partners',    href: '/curated-partners'  },
//   { label: 'Partner With Us',     href: '/partner-with-us'   },
//   { label: 'About',               href: '/about'             },
// ];

// // ── ILH PEACOCK LOGO ─────────────────────────────────────────
// function ILHLogo({ size = 38 }: { size?: number }) {
//   const gold    = '#C9A84C';
//   const emerald = '#2A7A6A';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-label="Indian Luxury House">
//       {/* Peacock body */}
//       <path d="M40 62C40 62 34 50 33 40C32 30 36 22 40 18C44 14 50 14 52 20C54 26 48 32 44 37C40 42 40 48 42 54C44 60 40 62 40 62Z" fill={gold} opacity="0.9"/>
//       {/* Feathers */}
//       <path d="M44 28C52 20 64 16 66 20C68 24 62 32 54 36C48 39 44 36 44 36" stroke={gold} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <path d="M42 34C50 22 62 12 68 14C72 16 68 28 60 34C54 38 42 36 42 36" stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
//       {/* Eye spots — peacock emerald */}
//       <ellipse cx="30" cy="44" rx="5" ry="2.5" fill={emerald} transform="rotate(-30 30 44)" opacity="0.8"/>
//       <ellipse cx="26" cy="50" rx="5" ry="2.5" fill={emerald} transform="rotate(-20 26 50)" opacity="0.7"/>
//       <ellipse cx="28" cy="38" rx="4.5" ry="2"  fill={emerald} transform="rotate(-45 28 38)" opacity="0.7"/>
//       {/* Dots */}
//       <circle cx="52" cy="12" r="1.5" fill={gold}/>
//       <circle cx="56" cy="10" r="1.2" fill={gold} opacity="0.8"/>
//     </svg>
//   );
// }

// // ── NAVBAR ────────────────────────────────────────────────────
// // Props:
// //   activeHref — current page href (e.g. "/real-estate"), highlights that link
// //                pass "" or undefined on homepage
// export default function Navbar({ activeHref = '' }: { activeHref?: string }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <>
//       <header style={{
//         position:       'fixed',
//         top:            0,
//         left:           0,
//         right:          0,
//         zIndex:         100,
//         background:     scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.92)',
//         backdropFilter: 'blur(12px)',
//         transition:     'background 0.4s ease',
//         boxShadow:      scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
//       }}>

//         {/* Top gold shimmer line */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.7 }} />

//         <div style={{
//           maxWidth:       1400,
//           margin:         '0 auto',
//           padding:        '0 32px',
//           height:         72,
//           display:        'flex',
//           alignItems:     'center',
//           justifyContent: 'space-between',
//           gap:            16,
//         }}>

//           {/* ── Logo ── */}
//           <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
//             <ILHLogo size={40} />
//             <div style={{ lineHeight: 1 }}>
//               <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300, color: '#DFC27A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Indian</div>
//               <div style={{ fontSize: 8, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 3 }}>Luxury House</div>
//             </div>
//           </Link>

//           {/* ── Desktop Nav ── */}
//           <nav className="ilh-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
//             {NAV_LINKS.map(link => {
//               const isActive = link.href === activeHref;
//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   style={{
//                     fontSize:        9,
//                     letterSpacing:   '0.12em',
//                     textTransform:   'uppercase',
//                     color:           isActive ? '#DFC27A' : 'rgba(201,168,76,0.6)',
//                     textDecoration:  'none',
//                     padding:         '8px 11px',
//                     borderBottom:    isActive ? '1px solid #C9A84C' : '1px solid transparent',
//                     fontWeight:      isActive ? 500 : 400,
//                     transition:      'color 0.2s, border-color 0.2s',
//                     whiteSpace:      'nowrap',
//                     // "Partner With Us" ko gold highlight
//                     ...(link.href === '/partner-with-us' && !isActive ? {
//                       color:        '#C9A84C',
//                       border:       '1px solid rgba(201,168,76,0.3)',
//                       padding:      '6px 12px',
//                       marginLeft:   4,
//                     } : {}),
//                   }}
//                   onMouseEnter={e => {
//                     if (!isActive) {
//                       e.currentTarget.style.color = '#DFC27A';
//                       e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.4)';
//                     }
//                   }}
//                   onMouseLeave={e => {
//                     if (!isActive) {
//                       e.currentTarget.style.color =
//                         link.href === '/partner-with-us' ? '#C9A84C' : 'rgba(201,168,76,0.6)';
//                       e.currentTarget.style.borderBottomColor = 'transparent';
//                     }
//                   }}
//                 >
//                   {link.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* ── Hamburger (mobile) ── */}
//           <button
//             className="ilh-nav-mobile"
//             onClick={() => setMenuOpen(prev => !prev)}
//             aria-label="Toggle menu"
//             style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 8, display: 'none' }}
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               {menuOpen
//                 ? <path d="M18 6 6 18M6 6l12 12"/>
//                 : <><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
//               }
//             </svg>
//           </button>
//         </div>

//         {/* ── Mobile Dropdown ── */}
//         <div style={{
//           background:  '#0A0A0A',
//           overflow:    'hidden',
//           maxHeight:   menuOpen ? 600 : 0,
//           transition:  'max-height 0.35s ease',
//           borderTop:   '1px solid rgba(201,168,76,0.1)',
//         }}>
//           {NAV_LINKS.map(link => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               style={{
//                 display:        'flex',
//                 alignItems:     'center',
//                 padding:        '14px 28px',
//                 fontSize:       10,
//                 letterSpacing:  '0.18em',
//                 textTransform:  'uppercase',
//                 color:          link.href === activeHref ? '#DFC27A' : 'rgba(201,168,76,0.65)',
//                 textDecoration: 'none',
//                 borderBottom:   '1px solid rgba(201,168,76,0.08)',
//                 transition:     'background 0.2s',
//                 fontWeight:     link.href === '/partner-with-us' ? 600 : 400,
//               }}
//               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//               onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>

//         {/* Bottom gold shimmer line */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
//       </header>

//       <style>{`
//         .ilh-nav-desktop { display: flex  !important; }
//         .ilh-nav-mobile  { display: none  !important; }
//         @media (max-width: 1100px) {
//           .ilh-nav-desktop { display: none  !important; }
//           .ilh-nav-mobile  { display: flex  !important; }
//         }
//       `}</style>
//     </>
//   );
// }


// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// // ── CATEGORIES — yahan sirf ek jagah change karo ──────────────
// // Agar naam badalna ho ya naya add karna ho, BAS YAHAN karo.
// // Sab pages (home, category, blog) automatically update ho jayenge.
// export const NAV_CATEGORIES = [
//   { name: 'Cars',         slug: 'cars'       },
//   { name: 'Yachts',       slug: 'yachts'     },
//   { name: 'Watches',      slug: 'watches'    },
//   { name: 'Style',        slug: 'style'      },
//   { name: 'Home',         slug: 'home'       },
//   { name: 'Food & Drink', slug: 'food-drink' },
//   { name: 'Travel',       slug: 'travel'     },
// ];

// // ── SM LOGO SVG ───────────────────────────────────────────────
// function SMLogo({ size = 38 }: { size?: number }) {
//   const g = '#C9A84C';
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-label="Indian Luxury House">
//       <path d="M42 68C42 68 36 58 34 48C32 38 36 28 40 22C44 16 50 14 52 18C54 22 50 28 46 32C42 36 40 40 42 46C44 52 50 56 48 62C46 68 42 68 42 68Z" fill={g} opacity="0.9"/>
//       <path d="M44 30C50 24 60 18 64 20C68 22 64 32 56 36C50 39 44 38 44 38" stroke={g} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
//       <path d="M42 36C48 26 58 16 66 16C70 16 70 26 62 32C56 37 44 38 44 38" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
//       <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={g} transform="rotate(-30 30 46)" opacity="0.8"/>
//       <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={g} transform="rotate(-20 26 52)" opacity="0.7"/>
//       <ellipse cx="28" cy="40" rx="4.5" ry="2"  fill={g} transform="rotate(-45 28 40)" opacity="0.7"/>
//       <circle cx="52" cy="12" r="1.5" fill={g}/>
//       <circle cx="56" cy="10" r="1.2" fill={g} opacity="0.8"/>
//     </svg>
//   );
// }

// // ── NAVBAR COMPONENT ─────────────────────────────────────────
// // Props:
// //   activeSlug — current category slug (e.g. "cars"), highlights that link
// //                pass "" or undefined on homepage / blog pages
// export default function Navbar({ activeSlug = '' }: { activeSlug?: string }) {
//   const [scrolled,  setScrolled]  = useState(false);
//   const [menuOpen,  setMenuOpen]  = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <>
//       <header style={{
//         position:       'fixed',
//         top:            0,
//         left:           0,
//         right:          0,
//         zIndex:         100,
//         background:     scrolled ? '#1B4D45' : 'rgba(27,77,69,0.96)',
//         backdropFilter: 'blur(10px)',
//         transition:     'background 0.4s ease',
//         boxShadow:      scrolled ? '0 2px 20px rgba(0,0,0,0.25)' : 'none',
//       }}>
//         {/* Top gold shimmer line */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.55 }} />

//         <div style={{
//           maxWidth:       1280,
//           margin:         '0 auto',
//           padding:        '0 32px',
//           height:         72,
//           display:        'flex',
//           alignItems:     'center',
//           justifyContent: 'space-between',
//         }}>

//           {/* ── Logo ── */}
//           <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', flexShrink:0 }}>
//             <SMLogo size={40} />
//             <div style={{ lineHeight:1 }}>
//               <div style={{ fontFamily:'Georgia,serif', fontSize:22, fontWeight:300, color:'#DFC27A', letterSpacing:'0.25em' }}>INDIAN</div>
//               <div style={{ fontSize:9, color:'rgba(201,168,76,0.5)', letterSpacing:'0.35em', textTransform:'uppercase', marginTop:3 }}>Luxury House</div>
//             </div>
//           </Link>

//           {/* ── Desktop Nav ── */}
//           <nav className="smn-desktop" style={{ display:'flex', alignItems:'center', gap:2 }}>
//             {NAV_CATEGORIES.map(c => {
//               const isActive = c.slug === activeSlug;
//               return (
//                 <Link
//                   key={c.slug}
//                   href={`/category/${c.slug}`}
//                   style={{
//                     fontSize:       10,
//                     letterSpacing:  '0.16em',
//                     textTransform:  'uppercase',
//                     color:          isActive ? '#DFC27A' : 'rgba(201,168,76,0.65)',
//                     textDecoration: 'none',
//                     padding:        '8px 14px',
//                     borderBottom:   isActive ? '1px solid #C9A84C' : '1px solid transparent',
//                     fontWeight:     isActive ? 500 : 400,
//                     transition:     'color 0.2s, border-color 0.2s',
//                   }}
//                   onMouseEnter={e => {
//                     if (!isActive) {
//                       e.currentTarget.style.color = '#DFC27A';
//                       e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.4)';
//                     }
//                   }}
//                   onMouseLeave={e => {
//                     if (!isActive) {
//                       e.currentTarget.style.color = 'rgba(201,168,76,0.65)';
//                       e.currentTarget.style.borderBottomColor = 'transparent';
//                     }
//                   }}
//                 >
//                   {c.name}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* ── Hamburger (mobile only) ── */}
//           <button
//             className="smn-mobile"
//             onClick={() => setMenuOpen(prev => !prev)}
//             aria-label="Toggle menu"
//             style={{ background:'none', border:'none', color:'#C9A84C', cursor:'pointer', padding:8 }}
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               {menuOpen
//                 ? <path d="M18 6 6 18M6 6l12 12"/>
//                 : <><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
//               }
//             </svg>
//           </button>
//         </div>

//         {/* ── Mobile dropdown ── */}
//         <div style={{
//           background:  '#163D37',
//           overflow:    'hidden',
//           maxHeight:   menuOpen ? 500 : 0,
//           transition:  'max-height 0.35s ease',
//           borderTop:   '1px solid rgba(201,168,76,0.1)',
//         }}>
//           {NAV_CATEGORIES.map(c => (
//             <Link
//               key={c.slug}
//               href={`/category/${c.slug}`}
//               onClick={() => setMenuOpen(false)}
//               style={{
//                 display:       'flex',
//                 alignItems:    'center',
//                 gap:           14,
//                 padding:       '14px 28px',
//                 fontSize:      11,
//                 letterSpacing: '0.15em',
//                 textTransform: 'uppercase',
//                 color:         c.slug === activeSlug ? '#DFC27A' : 'rgba(201,168,76,0.7)',
//                 textDecoration:'none',
//                 borderBottom:  '1px solid rgba(201,168,76,0.08)',
//                 transition:    'background 0.2s',
//               }}
//               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
//               onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//             >
//               {c.name}
//             </Link>
//           ))}
//         </div>

//         {/* Bottom gold shimmer line */}
//         <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)' }} />
//       </header>

//       {/* Responsive visibility */}
//       <style>{`
//         .smn-desktop { display: flex  !important; }
//         .smn-mobile  { display: none  !important; }
//         @media (max-width: 1024px) {
//           .smn-desktop { display: none  !important; }
//           .smn-mobile  { display: flex  !important; }
//         }
//       `}</style>
//     </>
//   );
// }