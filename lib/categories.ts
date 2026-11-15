export type ShopCategoryKey = 'all' | ProductCategoryAlias;

type ProductCategoryAlias = 'premium' | 'shopee';

export const SHOP_CATEGORIES: { key: ShopCategoryKey; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'premium', label: 'APLIKASI PREMIUM' },
  { key: 'shopee', label: 'SHOPEE' },
];

export const BLOG_CATEGORIES = [
  'CARA BELI',
  'NETWORKING',
  'CYBER SECURITY',
  'KALI LINUX',
  'LINUX',
  'MIKROTIK',
  'GPON / OLT',
  'WEB DEVELOPMENT',
  'DOCKER',
  'DEVOPS',
  'TUTORIAL',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
