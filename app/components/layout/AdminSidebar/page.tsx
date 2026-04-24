'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// ── Inline SMLogoComponent ────────────────────────────────────────────────────
function SMLogoComponent({
  variant = 'gold',
  size = 'sm',
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
      <polygon
        points="32,4 52,14 60,34 52,54 32,60 12,54 4,34 12,14"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M22 24 C22 20 26 18 30 19 C34 20 36 23 34 26 C32 29 26 29 24 32 C22 35 23 39 27 40 C31 41 36 39 36 35"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
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

// ── Nav Config ────────────────────────────────────────────────────────────────
const NAV = [
  {
    label: 'Content',
    items: [
      { href: '/admin/dashboard', icon: '◈', label: 'Overview'      },
      { href: '/admin/posts',     icon: '✦', label: 'All Posts'     },
      { href: '/admin/posts/new', icon: '＋', label: 'New Post'      },
      { href: '/admin/categories',icon: '⊞', label: 'Categories'    },
      { href: '/admin/media',     icon: '⊡', label: 'Media Library' },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/admin/settings', icon: '◎', label: 'Settings' },
      { href: '/admin/users',    icon: '◉', label: 'Users'    },
    ],
  },
];

// ── Main AdminSidebar Component ───────────────────────────────────────────────
export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  function handleLogout() {
    localStorage.removeItem('sm_admin_token');
    localStorage.removeItem('sm_admin_user');
    router.push('/admin/login');
  }

  return (
    <aside className="w-56 min-h-screen bg-[#1B4D45] flex flex-col border-r border-[#C9A84C]/10 flex-shrink-0">

      {/* ── Logo ── */}
      <div className="px-5 py-6 border-b border-[#C9A84C]/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <SMLogoComponent variant="gold" size="sm" showText={false} />
          <div>
            <span className="font-display text-lg text-[#DFC27A] tracking-[0.2em] leading-none block">SM</span>
            <span className="text-[8px] text-[#C9A84C]/40 tracking-[0.25em] uppercase leading-none block mt-0.5">Admin</span>
          </div>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 py-5 px-3 space-y-6 overflow-y-auto">
        {NAV.map((section) => (
          <div key={section.label}>
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#C9A84C]/30 px-3 mb-2 font-medium">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-xs tracking-wide transition-all duration-150 rounded-sm group ${
                      active
                        ? 'bg-[#C9A84C]/15 text-[#DFC27A]'
                        : 'text-[#C9A84C]/50 hover:bg-[#C9A84C]/8 hover:text-[#C9A84C]'
                    }`}
                  >
                    <span className={`text-base w-5 text-center leading-none ${
                      active ? 'text-[#C9A84C]' : 'text-[#C9A84C]/30 group-hover:text-[#C9A84C]/60'
                    }`}>
                      {item.icon}
                    </span>
                    {item.label}
                    {active && (
                      <span className="ml-auto w-1 h-1 rounded-full bg-[#C9A84C]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer Actions ── */}
      <div className="border-t border-[#C9A84C]/10 p-3 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-xs text-[#C9A84C]/40 hover:text-[#C9A84C]/70 tracking-wide transition-colors"
        >
          <span className="text-base w-5 text-center leading-none">↗</span>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-[#C9A84C]/40 hover:text-red-400/70 tracking-wide transition-colors"
        >
          <span className="text-base w-5 text-center leading-none">⊘</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}