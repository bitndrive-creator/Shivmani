export type Category =
  | 'Cars'
  | 'Yachts'
  | 'Watches'
  | 'Style'
  | 'Home'
  | 'Food & Drink'
  | 'Travel';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  publishedAt: string;
  imageUrl: string;
  featured: boolean;
  readTime: number; // minutes
  tags?: string[];
}

export interface CategoryMeta {
  name: Category;
  slug: string;
  emoji: string;
  description: string;
  heroImage?: string;
  accentColor: string;
  postCount?: number;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  perPage?: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'editor' | 'author';
}

export interface CreatePostPayload {
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  imageUrl?: string;
  featured?: boolean;
  status: 'draft' | 'published';
}
