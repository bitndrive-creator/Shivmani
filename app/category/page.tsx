'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────
interface Category {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  accentColor: string;
  heroImage: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags?: string[];
}

// ─── Data ────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  { name: 'Cars',        slug: 'cars',       emoji: '🚗', description: 'The finest machines on four wheels',         accentColor: '#C9A84C', heroImage: '/images/hero-cars.jpg' },
  { name: 'Yachts',      slug: 'yachts',     emoji: '⛵', description: 'Life on the open water',                     accentColor: '#5FA8D4', heroImage: '/images/hero-yachts.jpg' },
  { name: 'Watches',     slug: 'watches',    emoji: '⌚', description: 'Mechanical artistry on your wrist',           accentColor: '#D4B483', heroImage: '/images/hero-watches.jpg' },
  { name: 'Style',       slug: 'style',      emoji: '👔', description: 'Dressing the modern connoisseur',             accentColor: '#C4A8D4', heroImage: '/images/hero-style.jpg' },
  { name: 'Home',        slug: 'home',       emoji: '🏛️', description: 'Architecture and interior excellence',        accentColor: '#8DC48D', heroImage: '/images/hero-home.jpg' },
  { name: 'Food & Drink',slug: 'food-drink', emoji: '🍾', description: 'Gastronomy and the art of drinking',          accentColor: '#D48888', heroImage: '/images/hero-food.jpg' },
  { name: 'Travel',      slug: 'travel',     emoji: '✈️', description: "The world's most extraordinary destinations", accentColor: '#88B0D4', heroImage: '/images/hero-travel.jpg' },
];

const MOCK_POSTS: Post[] = [
  { id: '1', title: 'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12', slug: 'ferrari-laferrari-aperta-final-edition', category: 'Cars', excerpt: 'There are fast cars, there are beautiful cars, and then there is this.', author: 'Alessandro Greco', publishedAt: '2026-04-10', readTime: 8, imageUrl: '/images/placeholder-car.jpg', tags: ['Ferrari', 'Supercars'] },
  { id: '2', title: 'Patek Philippe 5711: Why It Still Commands Six Figures in 2026', slug: 'patek-philippe-5711-value-2026', category: 'Watches', excerpt: "Discontinued, yet more coveted than ever.", author: 'M. Laurent', publishedAt: '2026-04-08', readTime: 6, imageUrl: '/images/placeholder-watch.jpg', tags: ['Patek', 'Watches'] },
  { id: '3', title: 'Aboard the Benetti 107: A Week in the Mediterranean', slug: 'benetti-107-mediterranean-week', category: 'Yachts', excerpt: '107 feet. 5 staterooms. One ocean.', author: 'R. Voss', publishedAt: '2026-04-06', readTime: 10, imageUrl: '/images/placeholder-yacht.jpg', tags: ['Yachts', 'Mediterranean'] },
  { id: '4', title: 'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide', slug: 'zuma-dubai-food-cocktail-guide', category: 'Food & Drink', excerpt: 'Contemporary Japanese robatayaki in the heart of Dubai.', author: 'S. Chen', publishedAt: '2026-04-04', readTime: 5, imageUrl: '/images/placeholder-food.jpg', tags: ['Food', 'Dubai'] },
  { id: '5', title: 'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026', slug: 'maldives-vs-seychelles-2026', category: 'Travel', excerpt: 'Two island paradises, two entirely different philosophies.', author: 'P. Black', publishedAt: '2026-03-30', readTime: 7, imageUrl: '/images/placeholder-travel.jpg', tags: ['Travel', 'Islands'] },
  { id: '6', title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide', slug: 'tom-ford-vs-brunello-cucinelli-style-guide', category: 'Style', excerpt: 'Two titans of menswear, two completely opposing visions of luxury.', author: 'J. White', publishedAt: '2026-03-28', readTime: 6, imageUrl: '/images/placeholder-style.jpg', tags: ['Style', 'Fashion'] },
];

// ─── Header ──────────────────────────────────────────────
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#C9A84C]/15 px-6 md:px-16 py-4 flex items-center justify-between">
      <Link href="/" className="font-display text-xl font-light text-[#1C1C1A] tracking-wide">
        INDIAN<span className="text-[#C9A84C]">Luxury House</span>
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {CATEGORIES.slice(0, 5).map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`}
            className="text-[10px] tracking-[0.2em] uppercase text-[#6B6558] hover:text-[#1B4D45] transition-colors">
            {cat.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1B4D45] px-6 md:px-16 py-12">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl font-light text-[#DFC27A]">INDIAN Luxury House</p>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/40">
          © {new Date().getFullYear()} SM Luxury. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── BlogCard ─────────────────────────────────────────────
function BlogCard({ post, variant = 'default' }: { post: Post; variant?: 'default' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="flex items-start gap-3 py-3 border-b border-[#C9A84C]/10 last:border-0 group">
        <div className="flex-1 min-w-0">
          <p className="text-[9px] tracking-[0.15em] uppercase text-[#C9A84C]/60 mb-1">{post.category}</p>
          <p className="text-sm font-display font-light text-[#1C1C1A] group-hover:text-[#1B4D45] transition-colors line-clamp-2 leading-snug">{post.title}</p>
          <p className="text-[9px] text-[#6B6558]/60 mt-1 uppercase tracking-wide">{post.readTime} min read</p>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/blog/${post.slug}`} className="block bg-[#FAF7F0] group p-6 hover:bg-white transition-colors">
      <div className="h-40 bg-[#1B4D45] mb-4 overflow-hidden relative flex items-center justify-center">
        {post.imageUrl ? (
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
        ) : (
          <span className="text-[#C9A84C]/20 font-display text-4xl font-light">{post.category[0]}</span>
        )}
      </div>
      <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">{post.category}</p>
      <h3 className="font-display text-lg font-light text-[#1C1C1A] group-hover:text-[#1B4D45] transition-colors leading-snug mb-2">{post.title}</h3>
      <p className="text-xs text-[#6B6558] line-clamp-2 leading-relaxed">{post.excerpt}</p>
      <p className="text-[9px] uppercase tracking-widest text-[#C9A84C]/50 mt-3">{post.readTime} min read</p>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const posts = MOCK_POSTS.filter((p) =>
    p.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])
  );

  return (
    <>
      <Header />
      <main>
        {/* ── CATEGORY HERO ── */}
        <section className="relative h-72 md:h-96 overflow-hidden bg-[#1B4D45] mt-20">
          {cat.heroImage ? (
            <Image src={cat.heroImage} alt={cat.name} fill className="object-cover object-center" priority />
          ) : (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1B4D45, #163D37)' }}>
              <div className="absolute inset-0 flex items-center justify-center text-[12rem] opacity-5">{cat.emoji}</div>
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/80 via-transparent to-[#1C1C1A]/20" />
          <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-10">
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]/60 mb-2">Category</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-[#FAF7F0] leading-none mb-2">{cat.name}</h1>
            <p className="text-sm text-[#FAF7F0]/50 font-light tracking-wide">{cat.description}</p>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="bg-[#1B4D45]/95 border-b border-[#C9A84C]/15 sticky top-20 z-30">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex items-center gap-0 overflow-x-auto">
              {['All', 'Latest', 'Most Read', "Editors' Pick", 'Reviews', 'Guides'].map((f, i) => (
                <button key={f} className={`text-[10px] tracking-[0.15em] uppercase px-5 py-4 border-r border-[#C9A84C]/10 whitespace-nowrap transition-colors duration-200 ${i === 0 ? 'text-[#DFC27A] border-b-2 border-b-[#C9A84C]' : 'text-[#C9A84C]/50 hover:text-[#C9A84C]'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── POSTS GRID ── */}
        <section className="max-w-screen-xl mx-auto px-6 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl font-light text-[#6B6558] mb-3">No posts yet</p>
              <p className="text-sm text-[#6B6558]/60">Check back soon — we publish weekly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#C9A84C]/10">
              {posts.map((p) => <BlogCard key={p.id} post={p} variant="default" />)}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}


// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// // ─── Types ───────────────────────────────────────────────
// interface Category {
//   slug: string;
//   name: string;
//   emoji: string;
//   description: string;
//   heroImage?: string;
// }

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
// const CATEGORIES: Category[] = [
//   { slug: 'technology', name: 'Technology', emoji: '💻', description: 'Latest in tech & innovation' },
//   { slug: 'lifestyle',  name: 'Lifestyle',  emoji: '🌿', description: 'Wellness, home & living'     },
//   { slug: 'travel',     name: 'Travel',     emoji: '✈️', description: 'Destinations & adventures'   },
//   { slug: 'food',       name: 'Food & Drink',emoji: '🍽️',description: 'Recipes & culinary culture'  },
//   { slug: 'business',   name: 'Business',   emoji: '📈', description: 'Entrepreneurship & finance'  },
//   { slug: 'culture',    name: 'Culture',    emoji: '🎨', description: 'Arts, film & society'        },
// ];

// const MOCK_POSTS: Post[] = [
//   { id: '1', title: 'The Future of AI',              category: 'Technology', slug: 'future-of-ai',      excerpt: 'Exploring what lies ahead in artificial intelligence.', author: 'John Smith',  publishedAt: '2024-01-01', readTime: 5, tags: ['AI', 'Technology'] },
//   { id: '2', title: 'Best Travel Spots 2024',        category: 'Travel',     slug: 'best-travel-spots', excerpt: 'Top destinations to visit this year.',                  author: 'Sara Khan',   publishedAt: '2024-01-05', readTime: 7, tags: ['Travel'] },
//   { id: '3', title: 'Healthy Morning Routines',      category: 'Lifestyle',  slug: 'healthy-morning',   excerpt: 'Start your day right with these proven habits.',        author: 'Priya Mehta', publishedAt: '2024-01-10', readTime: 4, tags: ['Health'] },
//   { id: '4', title: 'Startup Funding 101',           category: 'Business',   slug: 'startup-funding',   excerpt: 'How to raise capital and navigate investment.',          author: 'Arjun Verma', publishedAt: '2024-01-12', readTime: 6, tags: ['Startup'] },
//   { id: '5', title: 'Modern Web Development',        category: 'Technology', slug: 'modern-web-dev',    excerpt: 'Tools and frameworks shaping the modern web.',           author: 'John Smith',  publishedAt: '2024-01-15', readTime: 8, tags: ['Web'] },
//   { id: '6', title: 'Street Food Around the World',  category: 'Food',       slug: 'street-food',       excerpt: 'A culinary world tour through iconic street food.',      author: 'Meera Joshi', publishedAt: '2024-01-18', readTime: 5, tags: ['Food'] },
// ];

// // ─── Helper ──────────────────────────────────────────────
// function getCategoryBySlug(slug: string): Category | undefined {
//   return CATEGORIES.find((c) => c.slug === slug);
// }

// // ─── Header (inline) ─────────────────────────────────────
// function Header() {
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#C9A84C]/15 px-6 md:px-16 py-4 flex items-center justify-between">
//       <Link href="/" className="font-display text-xl font-light text-[#1C1C1A] tracking-wide">
//         SM <span className="text-[#C9A84C]">Luxury</span>
//       </Link>
//       <nav className="hidden md:flex items-center gap-8">
//         {['Technology', 'Travel', 'Lifestyle', 'Business', 'Food'].map((cat) => (
//           <Link
//             key={cat}
//             href={`/category/${cat.toLowerCase()}`}
//             className="text-[10px] tracking-[0.2em] uppercase text-[#6B6558] hover:text-[#1B4D45] transition-colors"
//           >
//             {cat}
//           </Link>
//         ))}
//       </nav>
//     </header>
//   );
// }

// // ─── Footer (inline) ─────────────────────────────────────
// function Footer() {
//   return (
//     <footer className="bg-[#1B4D45] px-6 md:px-16 py-12">
//       <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//         <p className="font-display text-xl font-light text-[#DFC27A]">SM Luxury</p>
//         <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/40">
//           © {new Date().getFullYear()} SM Luxury. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// // ─── BlogCard (inline) ───────────────────────────────────
// function BlogCard({ post, variant = 'default' }: { post: Post; variant?: 'default' | 'compact' }) {
//   if (variant === 'compact') {
//     return (
//       <Link href={`/blog/${post.slug}`} className="flex items-start gap-3 py-3 border-b border-[#C9A84C]/10 last:border-0 group">
//         <div className="flex-1 min-w-0">
//           <p className="text-[9px] tracking-[0.15em] uppercase text-[#C9A84C]/60 mb-1">{post.category}</p>
//           <p className="text-sm font-display font-light text-[#1C1C1A] group-hover:text-[#1B4D45] transition-colors line-clamp-2 leading-snug">
//             {post.title}
//           </p>
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
//           <span className="text-[#C9A84C]/20 font-display text-4xl font-light">
//             {post.category[0]}
//           </span>
//         )}
//       </div>
//       <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">{post.category}</p>
//       <h3 className="font-display text-lg font-light text-[#1C1C1A] group-hover:text-[#1B4D45] transition-colors leading-snug mb-2">
//         {post.title}
//       </h3>
//       <p className="text-xs text-[#6B6558] line-clamp-2 leading-relaxed">{post.excerpt}</p>
//       <p className="text-[9px] uppercase tracking-widest text-[#C9A84C]/50 mt-3">{post.readTime} min read</p>
//     </Link>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────
// interface Props {
//   params: { slug: string };
// }

// export default function CategoryPage({ params }: Props) {
//   const cat = getCategoryBySlug(params.slug);
//   if (!cat) notFound();

//   // When backend ready, replace with:
//   // const { data: posts } = await getPostsByCategory(params.slug);
//   const posts = MOCK_POSTS.filter(
//     (p) => p.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])
//   );

//   return (
//     <>
//       <Header />
//       <main>
//         {/* ── CATEGORY HERO ── */}
//         <section className="relative h-72 md:h-96 overflow-hidden bg-[#1B4D45] mt-20">
//           {cat.heroImage ? (
//             <Image
//               src={cat.heroImage}
//               alt={cat.name}
//               fill
//               className="object-cover object-center"
//               priority
//             />
//           ) : (
//             <div
//               className="absolute inset-0"
//               style={{ background: 'linear-gradient(135deg, #1B4D45, #163D37)' }}
//             >
//               <div className="absolute inset-0 flex items-center justify-center text-[12rem] opacity-5">
//                 {cat.emoji}
//               </div>
//               <div
//                 className="absolute inset-0 opacity-5"
//                 style={{
//                   backgroundImage:
//                     'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
//                   backgroundSize: '24px 24px',
//                 }}
//               />
//             </div>
//           )}

//           <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/80 via-transparent to-[#1C1C1A]/20" />

//           <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-10">
//             <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]/60 mb-2">Category</p>
//             <h1 className="font-display text-5xl md:text-7xl font-light text-[#FAF7F0] leading-none mb-2">
//               {cat.name}
//             </h1>
//             <p className="text-sm text-[#FAF7F0]/50 font-light tracking-wide">{cat.description}</p>
//           </div>
//         </section>

//         {/* ── FILTER BAR ── */}
//         <div className="bg-[#1B4D45]/95 border-b border-[#C9A84C]/15 sticky top-20 z-30">
//           <div className="max-w-screen-xl mx-auto px-6">
//             <div className="flex items-center gap-0 overflow-x-auto">
//               {['All', 'Latest', 'Most Read', "Editors' Pick", 'Reviews', 'Guides'].map((f, i) => (
//                 <button
//                   key={f}
//                   className={`text-[10px] tracking-[0.15em] uppercase px-5 py-4 border-r border-[#C9A84C]/10 whitespace-nowrap transition-colors duration-200 ${
//                     i === 0
//                       ? 'text-[#DFC27A] border-b-2 border-b-[#C9A84C]'
//                       : 'text-[#C9A84C]/50 hover:text-[#C9A84C]'
//                   }`}
//                 >
//                   {f}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── POSTS GRID ── */}
//         <section className="max-w-screen-xl mx-auto px-6 py-16">
//           {posts.length === 0 ? (
//             <div className="text-center py-24">
//               <p className="font-display text-3xl font-light text-[#6B6558] mb-3">No posts yet</p>
//               <p className="text-sm text-[#6B6558]/60">Check back soon — we publish weekly.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#C9A84C]/10">
//               {posts.map((p) => (
//                 <BlogCard key={p.id} post={p} variant="default" />
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }