'use client';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

export default function CategoryStrip() {
  return (
    <section className="bg-[#1B4D45] border-y border-[#C9A84C]/20">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-4 md:grid-cols-7 divide-x divide-[#C9A84C]/15">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center justify-center py-8 px-4 hover:bg-[#163D37] transition-colors duration-300 text-center"
            >
              <span className="text-2xl mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 block">
                {cat.emoji}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#C9A84C]/60 group-hover:text-[#DFC27A] transition-colors duration-300 font-medium leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
