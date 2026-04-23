import Link from 'next/link';
import Image from 'next/image';

// ── BlogPost type inline defined ─────────────────────────────────────────────
interface BlogPost {
  slug:        string;
  title:       string;
  excerpt:     string;
  category:    string;
  author:      string;
  publishedAt: string;
  readTime:    number;
  imageUrl?:   string;
}

interface BlogCardProps {
  post:     BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  if (variant === 'featured') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block relative overflow-hidden bg-[#1B4D45]">
        <div className="relative h-[480px] overflow-hidden">
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/90 via-[#1C1C1A]/30 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-5 left-5">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] bg-[#1B4D45]/80 px-3 py-1.5 backdrop-blur-sm border border-[#C9A84C]/30">
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="w-8 h-px bg-[#C9A84C] mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#FAF7F0] leading-tight mb-3 group-hover:text-[#DFC27A] transition-colors duration-300">
              {post.title}
            </h2>
            <p className="text-sm text-[#FAF7F0]/60 font-light leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/60">
              <span>{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40 inline-block" />
              <span>{post.publishedAt}</span>
              <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40 inline-block" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/blogg/${post.slug}`} className="group flex gap-4 py-4 border-b border-[#C9A84C]/10 last:border-0">
        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-[#F0EBE0]">
          {post.imageUrl && (
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" sizes="80px" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1 block">{post.category}</span>
          <h3 className="font-display text-base font-light leading-snug text-[#1C1C1A] group-hover:text-[#1F5C52] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <span className="text-[10px] text-[#6B6558] mt-1 block">{post.publishedAt}</span>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/blog/${post.slug}`} className="group block bg-cream hover:bg-cream-dark transition-colors duration-200">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#E8DFD0]" style={{ paddingBottom: '62%' }}>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        {/* Category pill overlay */}
        <div className="absolute top-3 left-3">
          <span className="text-[9px] tracking-[0.2em] uppercase text-[#DFC27A] bg-[#1B4D45]/90 px-2.5 py-1">
            {post.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 border-b border-l border-r border-[#C9A84C]/10">
        <div className="w-6 h-px bg-[#C9A84C] mb-3 transition-all duration-300 group-hover:w-10" />
        <h3 className="font-display text-xl font-light leading-snug text-[#1C1C1A] mb-2 group-hover:text-[#1F5C52] transition-colors duration-300 line-clamp-3">
          {post.title}
        </h3>
        <p className="text-xs text-[#6B6558] leading-relaxed mb-3 line-clamp-2 font-light">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-[9px] tracking-[0.15em] uppercase text-[#6B6558]/70">
          <span>{post.author}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-[#C9A84C]/40 inline-block" />
          <span>{post.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}