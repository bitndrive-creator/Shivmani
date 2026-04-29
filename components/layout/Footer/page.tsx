import Link from 'next/link';

// ── Inline CATEGORIES ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Fashion',   slug: 'fashion'   },
  { name: 'Watches',   slug: 'watches'   },
  { name: 'Jewellery', slug: 'jewellery' },
  { name: 'Cars',      slug: 'cars'      },
  { name: 'Travel',    slug: 'travel'    },
  { name: 'Lifestyle', slug: 'lifestyle' },
];

// ── Inline SMLogoComponent ────────────────────────────────────────────────────
function SMLogoComponent({
  variant = 'gold',
  size = 'md',
  showText = false,
}: {
  variant?: 'gold' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}) {
  const dim   = size === 'sm' ? 32 : size === 'md' ? 48 : 64;
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

// ── Main Footer Component ─────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="bg-[#1B4D45] text-[#C9A84C]/60">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <SMLogoComponent variant="gold" size="md" showText={true} />
            <p className="mt-4 text-xs leading-relaxed text-[#C9A84C]/50 font-light tracking-wide">
              A curated journal for those who appreciate the finest things in life.
            </p>
          </div>

          {/* ── Categories ── */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]/40 mb-4 font-medium">
              Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-xs tracking-wide hover:text-[#DFC27A] transition-colors duration-200"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── About ── */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]/40 mb-4 font-medium">
              About
            </h4>
            <ul className="space-y-2 text-xs tracking-wide">
              <li><Link href="/about"     className="hover:text-[#DFC27A] transition-colors">About Us</Link></li>
              <li><Link href="/contact"   className="hover:text-[#DFC27A] transition-colors">Contact</Link></li>
              <li><Link href="/advertise" className="hover:text-[#DFC27A] transition-colors">Advertise</Link></li>
              <li><Link href="/privacy"   className="hover:text-[#DFC27A] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]/40 mb-4 font-medium">
              Subscribe
            </h4>
            <p className="text-xs mb-3 leading-relaxed text-[#C9A84C]/50">
              Curated stories, delivered weekly.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-[#163D37] border border-[#C9A84C]/20 text-[#DFC27A] placeholder-[#C9A84C]/30 text-xs px-3 py-2.5 outline-none focus:border-[#C9A84C]/50 transition-colors"
              />
              <button className="bg-[#C9A84C] text-[#1B4D45] text-[10px] tracking-[0.15em] uppercase px-4 font-semibold hover:bg-[#DFC27A] transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-6 border-t border-[#C9A84C]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.15em] text-[#C9A84C]/30">
            © 2026 SM Luxury. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Twitter', 'LinkedIn'].map((s) => (
              <Link
                key={s}
                href="#"
                className="text-[10px] tracking-[0.15em] uppercase hover:text-[#DFC27A] transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}