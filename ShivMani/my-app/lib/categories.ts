// src/lib/categories.ts
import type { CategoryMeta } from '@/types';

export const CATEGORIES: CategoryMeta[] = [
  {
    name: 'Cars',
    slug: 'cars',
    emoji: '🚗',
    description: 'The finest machines on four wheels',
    accentColor: '#C9A84C',
    heroImage: '/images/hero-cars.jpg',
  },
  {
    name: 'Yachts',
    slug: 'yachts',
    emoji: '⛵',
    description: 'Life on the open water',
    accentColor: '#5FA8D4',
    heroImage: '/images/hero-yachts.jpg',
  },
  {
    name: 'Watches',
    slug: 'watches',
    emoji: '⌚',
    description: 'Mechanical artistry on your wrist',
    accentColor: '#D4B483',
    heroImage: '/images/hero-watches.jpg',
  },
  {
    name: 'Style',
    slug: 'style',
    emoji: '👔',
    description: 'Dressing the modern connoisseur',
    accentColor: '#C4A8D4',
    heroImage: '/images/hero-style.jpg',
  },
  {
    name: 'Home',
    slug: 'home',
    emoji: '🏛️',
    description: 'Architecture and interior excellence',
    accentColor: '#8DC48D',
    heroImage: '/images/hero-home.jpg',
  },
  {
    name: 'Food & Drink',
    slug: 'food-drink',
    emoji: '🍾',
    description: 'Gastronomy and the art of drinking',
    accentColor: '#D48888',
    heroImage: '/images/hero-food.jpg',
  },
  {
    name: 'Travel',
    slug: 'travel',
    emoji: '✈️',
    description: "The world's most extraordinary destinations",
    accentColor: '#88B0D4',
    heroImage: '/images/hero-travel.jpg',
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): CategoryMeta | undefined {
  return CATEGORIES.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}
