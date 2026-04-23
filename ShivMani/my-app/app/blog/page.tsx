'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────
interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags?: string[];
}

// ─── Data ────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Cars',        slug: 'cars',       emoji: '🚗', description: 'The finest machines on four wheels',         accentColor: '#C9A84C', heroImage: '/images/hero-cars.jpg' },
  { name: 'Yachts',      slug: 'yachts',     emoji: '⛵', description: 'Life on the open water',                     accentColor: '#5FA8D4', heroImage: '/images/hero-yachts.jpg' },
  { name: 'Watches',     slug: 'watches',    emoji: '⌚', description: 'Mechanical artistry on your wrist',           accentColor: '#D4B483', heroImage: '/images/hero-watches.jpg' },
  { name: 'Style',       slug: 'style',      emoji: '👔', description: 'Dressing the modern connoisseur',             accentColor: '#C4A8D4', heroImage: '/images/hero-style.jpg' },
  { name: 'Home',        slug: 'home',       emoji: '🏛️', description: 'Architecture and interior excellence',        accentColor: '#8DC48D', heroImage: '/images/hero-home.jpg' },
  { name: 'Food & Restaurant',slug: 'food-drink', emoji: '🍾', description: 'Gastronomy and the art of drinking',          accentColor: '#D48888', heroImage: '/images/hero-food.jpg' },
  { name: 'Travel',      slug: 'travel',     emoji: '✈️', description: "The world's most extraordinary destinations", accentColor: '#88B0D4', heroImage: '/images/hero-travel.jpg' },
];

const MOCK_POSTS: Post[] = [
  { id: '1', title: 'Ferrari LaFerrari Aperta Final Edition: The Last Naturally Aspirated V12', slug: 'ferrari-laferrari-aperta-final-edition', category: 'Cars', excerpt: 'There are fast cars, there are beautiful cars, and then there is this — a machine so singular in purpose it transcends mere transportation.', content: '', author: 'Alessandro Greco', publishedAt: '2026-04-10', readTime: 8, imageUrl: '/images/placeholder-watch.jpg', tags: ['Ferrari', 'Supercars', 'V12'] },
  { id: '2', title: 'Patek Philippe 5711: Why It Still Commands Six Figures in 2026', slug: 'patek-philippe-5711-value-2026', category: 'Watches', excerpt: "Discontinued, yet more coveted than ever. The Nautilus 5711 remains the watch market's most enduring paradox.", content: '', author: 'M. Laurent', publishedAt: '2026-04-08', readTime: 6, imageUrl: '/images/placeholder-watch.jpg', tags: ['Patek Philippe', 'Nautilus', 'Investment'] },
  { id: '3', title: 'Aboard the Benetti 107: A Week in the Mediterranean', slug: 'benetti-107-mediterranean-week', category: 'Yachts', excerpt: '107 feet. 5 staterooms. One ocean. The Benetti Classic Supreme redefines what a holiday can mean.', content: '', author: 'R. Voss', publishedAt: '2026-04-06', readTime: 10, imageUrl: '/images/placeholder-yacht.jpg', tags: ['Benetti', 'Mediterranean', 'Superyacht'] },
  { id: '4', title: 'Inside Zuma Dubai: The Ultimate Food & Cocktail Guide', slug: 'zuma-dubai-food-cocktail-guide', category: 'Food &  Restaurant', excerpt: 'Contemporary Japanese robatayaki in the heart of the Dubai International Financial Centre.', content: '', author: 'S. Chen', publishedAt: '2026-04-04', readTime: 5, imageUrl: '/images/placeholder-food.jpg', tags: ['Dubai', 'Japanese', 'Cocktails'] },
  { id: '5', title: 'Maldives vs Seychelles: Where the Discerning Traveller Should Go in 2026', slug: 'maldives-vs-seychelles-2026', category: 'Travel', excerpt: 'Two island paradises, two entirely different philosophies. Our editors have stayed at both.', content: '', author: 'P. Black', publishedAt: '2026-03-30', readTime: 7, imageUrl: '/images/placeholder-travel.jpg', tags: ['Maldives', 'Seychelles', 'Islands'] },
  { id: '6', title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide', slug: 'tom-ford-vs-brunello-cucinelli-style-guide', category: 'Style', excerpt: 'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?', content: '', author: 'J. White', publishedAt: '2026-03-28', readTime: 6, imageUrl: '/images/placeholder-style.jpg', tags: ['Tom Ford', 'Menswear', 'Fashion'] },
   { id: '7', title: 'Tom Ford vs Brunello Cucinelli: The Definitive Style Guide', slug: 'tom-ford-vs-brunello-cucinelli-style-guide', category: 'Home', excerpt: 'Two titans of menswear, two completely opposing visions of luxury. Which house speaks to your wardrobe?', content: '', author: 'J. White', publishedAt: '2026-03-28', readTime: 6, imageUrl: '/images/placeholder-home.jpg', tags: ['Tom Ford', 'Menswear', 'Fashion'] },
];

// ─── Header ──────────────────────────────────────────────
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#C9A84C]/15 px-6 md:px-16 py-4 flex items-center justify-between">
      <Link href="/" className="font-display text-xl font-light text-[#1C1C1A] tracking-wide">
        SM <span className="text-[#C9A84C]">Luxury</span>
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
    <footer className="bg-[#1B4D45] px-6 md:px-16 py-12 mt-0">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl font-light text-[#DFC27A]">SM Luxury</p>
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
export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = MOCK_POSTS.find((p) => p.slug === params.slug) ?? MOCK_POSTS[0];
  if (!post) notFound();

  const related = MOCK_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const relatedPosts = related.length > 0 ? related : MOCK_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* ── ARTICLE HERO ── */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-[#1B4D45] mt-20">
          {post.imageUrl ? (
            <Image src={post.imageUrl} alt={post.title} fill priority className="object-cover object-center" quality={95} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D45] via-[#1F5C52] to-[#163D37]">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px' }} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/90 via-[#1C1C1A]/30 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-screen-xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-5 text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/50">
              <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/category/${post.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="hover:text-[#C9A84C] transition-colors">{post.category}</Link>
            </div>
            <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-[#DFC27A] bg-[#1B4D45]/70 border border-[#C9A84C]/30 px-3 py-1.5 mb-5 w-fit backdrop-blur-sm">{post.category}</span>
            <h1 className="font-display text-4xl md:text-6xl font-light text-[#FAF7F0] leading-tight max-w-4xl mb-5">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/60">
              <span>By {post.author}</span>
              <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40" />
              <span>{post.publishedAt}</span>
              <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </section>

        {/* ── ARTICLE BODY ── */}
        <article className="max-w-screen-xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="font-display text-2xl md:text-3xl font-light text-[#1F5C52] leading-relaxed mb-10 pb-10 border-b border-[#C9A84C]/15">{post.excerpt}</p>
              <div className="article-prose" dangerouslySetInnerHTML={{
                __html: post.content || `<p>The full article content will be loaded from your backend API.</p><h2>The Details</h2><p>Your backend API will return the complete article body here.</p><blockquote>Connect your API and this placeholder disappears.</blockquote>`,
              }} />
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#C9A84C]/15 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[9px] tracking-[0.2em] uppercase text-[#6B6558] bg-[#F0EBE0] px-3 py-1.5 border border-[#C9A84C]/15">{tag}</span>
                  ))}
                </div>
              )}
              <div className="mt-12 p-6 bg-[#F0EBE0] border-l-2 border-[#C9A84C] flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#1B4D45] flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl text-[#C9A84C]">{post.author.split(' ').map((n) => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">Written by</p>
                  <p className="font-display text-xl font-light text-[#1C1C1A] mb-1">{post.author}</p>
                  <p className="text-xs text-[#6B6558] leading-relaxed">Senior contributor to SM Luxury, specialising in {post.category.toLowerCase()} and connoisseur culture.</p>
                </div>
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div className="border border-[#C9A84C]/15 p-5">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] mb-4 pb-3 border-b border-[#C9A84C]/10">More in {post.category}</p>
                  <div>{relatedPosts.map((p) => <BlogCard key={p.id} post={p} variant="compact" />)}</div>
                </div>
                <div className="bg-[#1B4D45] p-6 text-center">
                  <div className="w-6 h-px bg-[#C9A84C]/50 mx-auto mb-4" />
                  <p className="font-display text-2xl font-light text-[#FAF7F0] mb-2">The Weekly Edit</p>
                  <p className="text-xs text-[#C9A84C]/60 mb-5 leading-relaxed">Curated stories from all categories, every Thursday.</p>
                  <input type="email" placeholder="your@email.com" className="w-full bg-[#163D37] border border-[#C9A84C]/20 text-[#DFC27A] placeholder-[#C9A84C]/30 text-xs px-3 py-2.5 mb-3 outline-none" />
                  <button className="w-full bg-[#C9A84C] text-[#1B4D45] text-[10px] tracking-[0.2em] uppercase py-3 font-semibold hover:bg-[#DFC27A] transition-colors">Subscribe</button>
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* ── RELATED POSTS ── */}
        <section className="bg-[#F0EBE0] py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10 border-b border-[#C9A84C]/15 pb-5">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Continue Reading</p>
                <h2 className="font-display text-4xl font-light text-[#1C1C1A]">You May Also Enjoy</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#C9A84C]/10">
              {relatedPosts.map((p) => <BlogCard key={p.id} post={p} variant="default" />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


// 'use client';
// import type { Metadata } from 'next';
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

// // ─── Mock Data ───────────────────────────────────────────
// const MOCK_POSTS: Post[] = [
//   {
//     id: '1',
//     title: 'The Future of AI',
//     slug: 'future-of-ai',
//     category: 'Technology',
//     excerpt: 'Exploring what lies ahead in the world of artificial intelligence and machine learning.',
//     content: '<p>Full article content here...</p><h2>The Details</h2><p>More content...</p>',
//     imageUrl: '',
//     author: 'John Smith',
//     publishedAt: '2024-01-01',
//     readTime: 5,
//     tags: ['AI', 'Technology', 'Future'],
//   },
//   {
//     id: '2',
//     title: 'Best Travel Spots 2024',
//     slug: 'best-travel-spots',
//     category: 'Travel',
//     excerpt: 'Top destinations to visit this year for an unforgettable experience.',
//     content: '<p>Travel content here...</p>',
//     imageUrl: '',
//     author: 'Sara Khan',
//     publishedAt: '2024-01-05',
//     readTime: 7,
//     tags: ['Travel', 'Destinations', '2024'],
//   },
//   {
//     id: '3',
//     title: 'Healthy Morning Routines',
//     slug: 'healthy-morning',
//     category: 'Lifestyle',
//     excerpt: 'Start your day right with these proven morning habits for a healthier life.',
//     content: '<p>Lifestyle content here...</p>',
//     imageUrl: '',
//     author: 'Priya Mehta',
//     publishedAt: '2024-01-10',
//     readTime: 4,
//     tags: ['Health', 'Morning', 'Routine'],
//   },
//   {
//     id: '4',
//     title: 'Startup Funding 101',
//     slug: 'startup-funding',
//     category: 'Business',
//     excerpt: 'How to raise capital and navigate the world of startup investment.',
//     content: '<p>Business content here...</p>',
//     imageUrl: '',
//     author: 'Arjun Verma',
//     publishedAt: '2024-01-12',
//     readTime: 6,
//     tags: ['Startup', 'Funding', 'Business'],
//   },
//   {
//     id: '5',
//     title: 'Modern Web Development',
//     slug: 'modern-web-dev',
//     category: 'Technology',
//     excerpt: 'Tools and frameworks shaping the future of the modern web.',
//     content: '<p>Web dev content here...</p>',
//     imageUrl: '',
//     author: 'John Smith',
//     publishedAt: '2024-01-15',
//     readTime: 8,
//     tags: ['Web', 'Development', 'React'],
//   },
//   {
//     id: '6',
//     title: 'Street Food Around the World',
//     slug: 'street-food',
//     category: 'Food',
//     excerpt: 'A culinary world tour through the most iconic street food cultures.',
//     content: '<p>Food content here...</p>',
//     imageUrl: '',
//     author: 'Meera Joshi',
//     publishedAt: '2024-01-18',
//     readTime: 5,
//     tags: ['Food', 'Travel', 'Culture'],
//   },
// ];

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

// export default function BlogDetailPage({ params }: Props) {
//   // Replace with: const post = await getPostBySlug(params.slug);
//   const post = MOCK_POSTS.find((p) => p.slug === params.slug) ?? MOCK_POSTS[0];
//   if (!post) notFound();

//   const related = MOCK_POSTS.filter(
//     (p) => p.id !== post.id && p.category === post.category
//   ).slice(0, 3);

//   const allOther = MOCK_POSTS.filter((p) => p.id !== post.id).slice(0, 3);
//   const relatedPosts = related.length > 0 ? related : allOther;

//   return (
//     <>
//       <Header />
//       <main>
//         {/* ── ARTICLE HERO ── */}
//         <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-[#1B4D45] mt-20">
//           {post.imageUrl && (
//             <Image
//               src={post.imageUrl}
//               alt={post.title}
//               fill
//               priority
//               className="object-cover object-center"
//               quality={95}
//             />
//           )}
//           {!post.imageUrl && (
//             <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D45] via-[#1F5C52] to-[#163D37]">
//               <div
//                 className="absolute inset-0 opacity-5"
//                 style={{
//                   backgroundImage:
//                     'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)',
//                   backgroundSize: '28px 28px',
//                 }}
//               />
//             </div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/90 via-[#1C1C1A]/30 to-transparent" />

//           {/* Content */}
//           <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-screen-xl mx-auto w-full">
//             {/* Breadcrumb */}
//             <div className="flex items-center gap-2 mb-5 text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/50">
//               <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
//               <span>/</span>
//               <Link
//                 href={`/category/${post.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
//                 className="hover:text-[#C9A84C] transition-colors"
//               >
//                 {post.category}
//               </Link>
//             </div>

//             {/* Category badge */}
//             <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-[#DFC27A] bg-[#1B4D45]/70 border border-[#C9A84C]/30 px-3 py-1.5 mb-5 w-fit backdrop-blur-sm">
//               {post.category}
//             </span>

//             {/* Title */}
//             <h1 className="font-display text-4xl md:text-6xl font-light text-[#FAF7F0] leading-tight max-w-4xl mb-5">
//               {post.title}
//             </h1>

//             {/* Meta */}
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
//             {/* Main content */}
//             <div className="lg:col-span-8">
//               {/* Lead paragraph */}
//               <p className="font-display text-2xl md:text-3xl font-light text-[#1F5C52] leading-relaxed mb-10 pb-10 border-b border-[#C9A84C]/15">
//                 {post.excerpt}
//               </p>

//               {/* Article content */}
//               <div
//                 className="article-prose"
//                 dangerouslySetInnerHTML={{
//                   __html: post.content ||
//                     `<p>The full article content will be loaded from your backend API. This is where the rich editorial content will appear — formatted beautifully with the typography and spacing defined in your global styles.</p>
//                     <h2>The Details</h2>
//                     <p>Your backend API will return the complete article body here. The <code>getPostBySlug()</code> function in <code>src/lib/api.ts</code> handles this request — just set your <code>NEXT_PUBLIC_API_URL</code> environment variable and you're live.</p>
//                     <blockquote>Connect your API and this placeholder disappears, replaced by your actual editorial content.</blockquote>
//                     <h3>What's Next</h3>
//                     <p>Once your backend is connected, every article will render its full content here — including headers, pull quotes, images, and all rich formatting your editors produce.</p>`,
//                 }}
//               />

//               {/* Tags */}
//               {post.tags && post.tags.length > 0 && (
//                 <div className="mt-12 pt-8 border-t border-[#C9A84C]/15 flex flex-wrap gap-2">
//                   {post.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="text-[9px] tracking-[0.2em] uppercase text-[#6B6558] bg-[#F0EBE0] px-3 py-1.5 border border-[#C9A84C]/15"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {/* Author card */}
//               <div className="mt-12 p-6 bg-[#F0EBE0] border-l-2 border-[#C9A84C] flex items-start gap-5">
//                 <div className="w-14 h-14 rounded-full bg-[#1B4D45] flex items-center justify-center flex-shrink-0">
//                   <span className="font-display text-xl text-[#C9A84C]">
//                     {post.author.split(' ').map((n) => n[0]).join('')}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">Written by</p>
//                   <p className="font-display text-xl font-light text-[#1C1C1A] mb-1">{post.author}</p>
//                   <p className="text-xs text-[#6B6558] leading-relaxed">
//                     Senior contributor to SM Luxury, specialising in {post.category.toLowerCase()} and connoisseur culture.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <aside className="lg:col-span-4">
//               <div className="sticky top-28 space-y-8">
//                 {/* More in category */}
//                 <div className="border border-[#C9A84C]/15 p-5">
//                   <p className="text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] mb-4 pb-3 border-b border-[#C9A84C]/10">
//                     More in {post.category}
//                   </p>
//                   <div>
//                     {relatedPosts.map((p) => (
//                       <BlogCard key={p.id} post={p} variant="compact" />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Newsletter */}
//                 <div className="bg-[#1B4D45] p-6 text-center">
//                   <div className="w-6 h-px bg-[#C9A84C]/50 mx-auto mb-4" />
//                   <p className="font-display text-2xl font-light text-[#FAF7F0] mb-2">
//                     The Weekly Edit
//                   </p>
//                   <p className="text-xs text-[#C9A84C]/60 mb-5 leading-relaxed">
//                     Curated stories from all categories, every Thursday.
//                   </p>
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     className="w-full bg-[#163D37] border border-[#C9A84C]/20 text-[#DFC27A] placeholder-[#C9A84C]/30 text-xs px-3 py-2.5 mb-3 outline-none"
//                   />
//                   <button className="w-full bg-[#C9A84C] text-[#1B4D45] text-[10px] tracking-[0.2em] uppercase py-3 font-semibold hover:bg-[#DFC27A] transition-colors">
//                     Subscribe
//                   </button>
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
//               {relatedPosts.map((p) => (
//                 <BlogCard key={p.id} post={p} variant="default" />
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }