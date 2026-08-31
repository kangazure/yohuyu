export type ProductCategory = 'premium' | 'shopee';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  /** path logo di /logos/ */
  logo: string;
  /** nama paket, mis. "1 Profil • 1 User" */
  package: string;
  /** masa berlaku, mis. "1 Month" */
  duration: string;
  price: number;
  description: string;
  badge?: string;
  /** link beli spesifik; jika kosong memakai fallback config (WA / Shopee) */
  purchaseUrl?: string;
}

export interface Technology {
  name: string;
  /** path ikon di /logos/ */
  icon: string;
}

export interface Skill {
  key: string;
  title: string;
  description: string;
  items: string[];
  /** key nama ikon lucide yang dipakai di UI */
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  updatedAt: string;
  author: string;
  cover: string;
  readingTime: string;
}
