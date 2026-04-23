'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ── Inline CATEGORIES (pehle CATEGORIES import tha) ──────────────────────────
const CATEGORIES = [
  { name: 'Fashion',     slug: 'fashion'     },
  { name: 'Watches',     slug: 'watches'     },
  { name: 'Jewellery',   slug: 'jewellery'   },
  { name: 'Cars',        slug: 'cars'        },
  { name: 'Travel',      slug: 'travel'      },
  { name: 'Lifestyle',   slug: 'lifestyle'   },
];

// ── Inline SMLogoComponent (pehle import tha) ─────────────────────────────────
function SMLogoComponent({
  variant = 'gold',
  size = 'sm',
  showText = false,
}: {
  variant?: 'gold' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}) {
  const dim = size === 'sm' ? 32 : size === 'md' ? 48 : 64;
  const color = variant === 'gold' ? '#C9A84C' : '#FFFFFF';

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer octagon border */}
      <polygon
        points="32,4 52,14 60,34 52,54 32,60 12,54 4,34 12,14"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      {/* S letter */}
      <path
        d="M22 24 C22 20 26 18 30 19 C34 20 36 23 34 26 C32 29 26 29 24 32 C22 35 23 39 27 40 C31 41 36 39 36 35"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* M letter */}
      <path
        d="M38 40 L38 22 L44 32 L50 22 L50 40"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {showText && (
        <text
          x="32"
          y="58"
          textAnchor="middle"
          fill={color}
          fontSize="6"
          fontFamily="serif"
          letterSpacing="3"
        >
          LUXURY
        </text>
      )}
    </svg>
  );
}

// ── Main Header Component ─────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname                    = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = CATEGORIES.map((c) => ({
    label: c.name,
    href:  `/category/${c.slug}`,
  }));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1B4D45] shadow-lg shadow-black/20'
          : 'bg-[#1B4D45]/95 backdrop-blur-sm'
      }`}
    >
      {/* Top thin gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group">
            <SMLogoComponent variant="gold" size="sm" showText={false} />
            <div>
              <span className="font-display text-[#DFC27A] text-2xl font-light tracking-[0.25em] leading-none block">
                SM
              </span>
              <span className="text-[9px] text-[#C9A84C]/60 tracking-[0.3em] uppercase font-body leading-none block mt-0.5">
                Luxury
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-body font-medium
                    transition-colors duration-200 group
                    ${active ? 'text-[#DFC27A]' : 'text-[#C9A84C]/70 hover:text-[#DFC27A]'}
                  `}
                >
                  {item.label}
                  <span
                    className={`
                      absolute bottom-0 left-4 right-4 h-px bg-[#C9A84C] origin-left transition-transform duration-300
                      ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Right Side Icons ── */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              aria-label="Search"
              className="text-[#C9A84C]/60 hover:text-[#DFC27A] transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-[#C9A84C]/80 hover:text-[#DFC27A] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileOpen ? (
                  <path d="M18 6 6 18M6 6l12 12"/>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-96' : 'max-h-0'
        } bg-[#163D37] border-t border-[#C9A84C]/20`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="block px-6 py-3 text-[11px] tracking-[0.15em] uppercase text-[#C9A84C]/70 hover:text-[#DFC27A] hover:bg-[#1B4D45] transition-colors border-b border-[#C9A84C]/10"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Bottom thin gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
    </header>
  );
}