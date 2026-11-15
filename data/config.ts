/**
 * Konfigurasi global website.
 * Semua nilai yang perlu diganti user berada di satu tempat ini.
 * Ganti placeholder (YOUR_*) lewat .env.local atau file ini.
 */
export const siteConfig = {
  name: 'RIKOARDIANTO',
  brand: 'RIKO ARDIANTO',
  tagline: 'ALL KEBUTUHAN DIGITAL',
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rikoardianto.web.id',
  description:
    'Online shop produk digital, blog teknologi networking & cybersecurity, dan personal portfolio Riko Ardianto.',
  /**
   * URL toko Shopee — placeholder sampai link asli diberikan.
   * Jangan diisi asal: ganti melalui .env.local (NEXT_PUBLIC_SHOPEE_URL).
   */
  shopeeUrl: process.env.NEXT_PUBLIC_SHOPEE_URL ?? 'YOUR_SHOPEE_URL',
  /** URL toko utama (tombol SHOP NOW / collshp) — ganti lewat NEXT_PUBLIC_SHOP_URL */
  shopUrl:
    process.env.NEXT_PUBLIC_SHOP_URL ??
    'https://collshp.com/warung_sosmed',
  /**
   * URL WhatsApp order — placeholder sampai nomor asli diberikan.
   * Ganti melalui .env.local (NEXT_PUBLIC_WHATSAPP_URL).
   */
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    'https://wa.me/6287781974170',
  email: 'YOUR_EMAIL', // placeholder — ganti saat email resmi tersedia
  socials: {
    instagram: 'https://instagram.com/skuyyy_y7',
    github: 'https://github.com/kangazure',
    whatsapp: 'https://wa.me/6287781974170',
    tiktok: 'https://tiktok.com/@warung_sosmed',
  },
  navigation: [
    { href: '/', label: 'HOME' },
    { href: '/shop', label: 'SHOP' },
    { href: '/blog', label: 'BLOG' },
    { href: '/kontak', label: 'KONTAK' },
  ],
} as const;

/** Kata-kata berputar di hero (typing animation) */
export const HERO_WORDS = [
  'DIGITAL PRODUCTS',
  'NETWORKING',
  'CYBER SECURITY',
  'LINUX',
  'MIKROTIK',
  'WEB DEVELOPMENT',
];

/** Identitas singkat (dipakai About & Kontak) */
export const HERO_ROLES = [
  'Network Engineer',
  'Cybersecurity Enthusiast',
  'Linux',
  'MikroTik',
  'Web Developer',
  'Digital Products',
];

export const SECURE_CONNECT_BUILD = 'SECURE • CONNECT • BUILD';
