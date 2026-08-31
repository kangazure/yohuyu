# RIKOARDIANTO v2 — Arsitektur Project

> **Konsep:** Personal Portfolio + Online Shop + Technology Blog + Edukasi Cybersecurity/Networking
> **Visual:** Futuristic, Cyber Technology, Networking, Cybersecurity, Premium Digital Store, 3D Parallax, Immersive Animation
> **Tahap ini:** arsitektur saja — TANPA implementasi UI.

---

## 1. Stack & Versi (dependency plan)

Cek versi dari npm registry (2026-08-31).

### Dependencies (runtime)
| Package | Versi | Catatan |
|---|---|---|
| `next` | `16.3.3` | App Router, pin exact |
| `react` | `19.2.8` | |
| `react-dom` | `19.2.8` | |
| `motion` | `13.1.1` | Pengganti framer-motion (import `motion/react`) |
| `three` | `0.185.1` | 3D NetworkScene |
| `@react-three/fiber` | `9.7.0` | React 19-ready |
| `@react-three/drei` | `10.7.8` | Helper R3F |
| `next-themes` | `0.4.6` | Dark/light mode |
| `lucide-react` | `1.37.0` | Icon |
| `gray-matter` | `4.0.3` | Parse front-matter MDX |
| `remark` | `15.0.1` | Pipeline markdown |
| `remark-html` | `16.0.1` | MD → HTML (tanpa peerDeps, aman) |
| `clsx` | `2.1.1` | Helper cn() |
| `tailwind-merge` | `3.6.0` | Helper cn() |

### DevDependencies
| Package | Versi | Catatan |
|---|---|---|
| `typescript` | `5.9.3` | **Bukan 7.0.2** — TS7 terlalu baru, hindari gesekan ekosistem Next/SWC |
| `@types/node` | `26.4.0` | |
| `@types/react` | `19.2.18` | |
| `@types/react-dom` | `19.2.5` | |
| `@types/three` | `0.185.4` | |
| `tailwindcss` | `4.3.3` | Tata letak + @theme |
| `@tailwindcss/postcss` | `4.3.3` | PostCSS v4 |
| `eslint` | `10.9.1` | |
| `eslint-config-next` | `16.3.3` | Harus sama dengan major next |

### Tidak diperlukan (jangan ditambah tanpa alasan)
- Storybook, Redux/Zustand, React Query, Shadcn, recharts, emotion — semua bisa pakai fitur bawaan + Motion.
- `@tailwindcss/typography` — opsional; styling artikel cukup CSS manual di globals agar typography premium custom.

---

## 2. Struktur Folder

```
rikoardianto-v2/
├── app/               → routing, layout, halaman (App Router)
├── components/        → UI, dipisah per domain
├── data/              → data murni (produk, config, teknologi) — tanpa JSX
├── lib/               → logika server/client (blog pipeline, utils, animasi, kategori)
├── content/           → artikel blog (MDX)
├── public/            → asset statis (semua gambar di public/images/…)
└── styles/            → (opsional) CSS module cadangan; utama tetap app/globals.css
```

---

## 3. File Structure

```
rikoardianto-v2/
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── .gitignore
├── .env.example
├── .dockerignore
├── Dockerfile                       (nanti, saat deploy)
├── README.md
│
├── app/
│   ├── layout.tsx                   → root: font, ThemeProvider, Navbar, Footer, metadata
│   ├── page.tsx                     → home
│   ├── globals.css                  → @import "tailwindcss" + @theme (design tokens)
│   ├── not-found.tsx                → custom 404
│   ├── error.tsx                    → error boundary
│   ├── loading.tsx                  → loading global (opsional)
│   ├── shop/
│   │   ├── page.tsx                 → /shop (ALL + filter + search)
│   │   ├── premium/page.tsx         → /shop/premium
│   │   ├── shopee/page.tsx          → /shop/shopee
│   │   └── [slug]/page.tsx          → /shop/[slug]
│   ├── blog/
│   │   ├── page.tsx                 → /blog (list + search + filter kategori)
│   │   └── [slug]/page.tsx          → /blog/[slug]
│   ├── kontak/
│   │   └── page.tsx                 → /kontak
│   └── api/
│       └── health/route.ts          → /api/health (health check deploy)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               → desktop + toggle theme
│   │   ├── MobileMenu.tsx           → drawer mobile
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── ParallaxBackground.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilter.tsx
│   │   ├── ProductSearch.tsx
│   │   └── ProductDetail.tsx
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   ├── BlogGrid.tsx
│   │   ├── BlogSearch.tsx
│   │   ├── BlogFilter.tsx
│   │   ├── BlogContent.tsx
│   │   ├── TableOfContents.tsx
│   │   └── ReadingProgress.tsx
│   ├── three/                        → satu-satunya yang pakai R3F
│   │   ├── NetworkScene.tsx
│   │   ├── NetworkNode.tsx
│   │   └── NetworkConnection.tsx
│   ├── ui/
│   │   ├── ScrollReveal.tsx
│   │   ├── TiltCard.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── FloatingElement.tsx
│   │   ├── TypingText.tsx
│   │   └── TechnologyIcons.tsx
│   └── sections/                     → CTA banner, chip kategori, dsb. (ditambah saat perlu)
│
├── data/
│   ├── types.ts                      → Product, ProductCategory, BlogPost, dsb.
│   ├── config.ts                     → nama brand, sosmed, navigasi, metadata, harga dasar
│   ├── products.ts                   → master data produk + getProductBySlug()/getProductsByCategory()
│   └── technologies.ts               → daftar teknologi buat Skills + TechnologyIcons
│
├── lib/
│   ├── utils.ts                      → cn() (clsx + tailwind-merge)
│   ├── blog.ts                       → server-only: getAllPosts, getPostBySlug, render HTML, ekstrak heading
│   ├── animations.ts                 → easing presets + variants (fadeUp, stagger, dsb.)
│   └── categories.ts                 → SHOP_CATEGORIES + BLOG_CATEGORIES (satu sumber kebenaran)
│
├── content/
│   └── blog/
│       ├── nmap-network-discovery.mdx
│       └── …(artikel baru)
│
├── public/
│   └── images/
│       ├── profile/                  → foto/avatar Riko
│       ├── hero/                     → visual hero (webp/svg)
│       ├── products/                 → foto produk
│       ├── applications/             → preview/screenshot aplikasi premium
│       ├── blog/                     → cover artikel
│       ├── background/               → texture/noise
│       └── icons/                    → logo teknologi + brand (svg)
│
└── styles/                           → cadangan CSS module (opsional)
```

---

## 4. Route Structure

| Route | Tipe | Fungsi |
|---|---|---|
| `/` | SSR/CSR | Home: Hero 3D → About → Skills → Projects → produk unggulan → blog terbaru → CTA |
| `/shop` | SSG + client filter | Semua produk; kategori ALL/APLIKASI PREMIUM/SHOPEE + search (searchParams) |
| `/shop/premium` | SSG | Produk filter `category: 'premium'` |
| `/shop/shopee` | SSG | Produk filter `category: 'shopee'` |
| `/shop/[slug]` | SSG (`generateStaticParams`) | Detail produk + CTA beli (purchaseUrl) |
| `/blog` | SSG | List artikel + search + filter 10 kategori (searchParams) |
| `/blog/[slug]` | SSG | Artikel MDX + ToC + ReadingProgress + metadata artikel |
| `/kontak` | SSG | Kontak: sosmed, WA, form (opsional) |
| `/api/health` | Route handler | `{status:'ok'}` buat health check Docker/Dokploy |
| `not-found` / `error` / `loading` | Framework | 404 custom, error boundary, loading state |

Aturan routing:
- `/shop/premium` & `/shop/shopee` adalah halaman nyata (SEO), tapi memakai `ProductGrid` + `ProductFilter` yang sama dengan `/shop` — beda hanya data awal.
- Semua halaman list pakai `searchParams` → komponen filter tetap **sharable** antar route.
- `/shop/[slug]` & `/blog/[slug]` full SSG biar hemat resource dan cepat di VPS.

---

## 5. Component Architecture

### Client vs Server (aturan baku)
- **Server komponen (default):** rendering data, SEO, daftar (grid/card tanpa interaksi), Footer, teknologi.
- **Client komponen:** semua yang butuh `useState`/event/animasi pointer — Navbar, MobileMenu, filter, search, tilt, magnet, scroll effect, typing, TOC, reading progress, contact form.
- **3D:** client-only, di-load dengan `next/dynamic(..., { ssr: false })` + `<Suspense>` — hanya di home. Halaman lain tidak dibebani.

### Hierarki
```
RootLayout
├── ThemeProvider (next-themes)
├── InteractiveBackground / ParallaxBackground
├── Navbar ── MobileMenu (client, di < md)
└── Page
    Home:         Hero ── TypingText, MagneticButton, FloatingElement
                              └── ParallaxBackground ── NetworkScene (dynamic 3D)
                                NetworkScene ── NetworkNode × n, NetworkConnection × m
                  About, Skills ── TechnologyIcons, Projects
    Shop:         ProductGrid ── ProductCard ── TiltCard
                  ProductFilter (chips kategori), ProductSearch (input debounce)
                  ProductDetail (data by slug + CTA MagneticButton → purchaseUrl)
    Blog:         BlogGrid ── BlogCard, BlogSearch, BlogFilter (chips 10 kategori)
                  BlogContent (render HTML artikel), TableOfContents (scrollspy),
                  ReadingProgress (progress bar atas)
    Contact:      Contact ── MagneticButton/WA
    Footer (server): navigasi + sosmed
```

### Tanggung jawab per komponen (ringkas)
| Komponen | Client? | Fungsi |
|---|---|---|
| `Navbar` | ✅ | Fixed, efek scroll, toggle theme, active link (usePathname) |
| `MobileMenu` | ✅ | Drawer fullscreen, AnimatePresence |
| `Hero` | ✅ | Layout hero, TypingText, CTA |
| `TypingText` | ✅ | Siklus ketik/hapus, prop `texts` + `textColors` |
| `ParallaxBackground` | ✅ | Layer parallax (useScroll/useTransform per depth), host NetworkScene |
| `NetworkScene` | ✅ | Canvas R3F, data node + koneksi, adaptif kualitas, fallback non-WebGL |
| `NetworkNode` | ✅ | Sphere + ring glow, hover scale |
| `NetworkConnection` | ✅ | Garis kurva antar node, opacity by jarak |
| `About` / `Skills` / `Projects` | ⬜ | Section statis home |
| `TechnologyIcons` | ⬜ | Grid logo dari `data/technologies.ts` |
| `ProductCard` | ⬜* | Kartu produk (data-driven) — *bungkus TiltCard utk interaksi |
| `ProductGrid` | ⬜ | Grid responsif |
| `ProductFilter` | ✅ | Chips kategori → update searchParams |
| `ProductSearch` | ✅ | Input + debounce |
| `ProductDetail` | ✅ | Detail + CTA beli |
| `BlogCard` / `BlogGrid` | ⬜ | Kartu/list artikel |
| `BlogSearch` / `BlogFilter` | ✅ | Filter + search (searchParams) |
| `BlogContent` | ⬜ | Render HTML artikel (server, dari lib/blog) |
| `TableOfContents` | ✅ | Daftar heading + scrollspy highlight |
| `ReadingProgress` | ✅ | Progress scroll (fixed top) |
| `Contact` | ✅ | Sosmed/form |
| `Footer` | ⬜ | Navigasi + sosmed + copyright |
| `ScrollReveal` | ✅ | Wrapper whileInView fade-up (prop: delay, y, once) |
| `TiltCard` | ✅ | 3D tilt pointer (spring), disabled saat touch/reduced-motion |
| `MagneticButton` | ✅ | Magnet hover, dipakai CTA |
| `FloatingElement` | ✅ | Loop float halus (y ±, durasi via prop) |

---

## 6. Data Architecture

Semua data di `data/`, **tanpa JSX dan tanpa import next** — aman dipakai server & client.

### data/types.ts
```ts
export type ProductCategory = 'premium' | 'shopee';

export interface Product {
  id: string;
  slug: string;          // URL: /shop/<slug>
  name: string;
  category: ProductCategory;
  logo: string;          // /logos/<file>
  package: string;       // nama paket, mis. "Paket Lengkap 1 Bulan"
  duration: string;      // mis. "30 hari"
  price: number;         // IDR
  description: string;
  badge?: string;        // "BEST SELLER" | "NEW" | "LIMITED"
  purchaseUrl: string;   // link beli (Shopee/WA) — satu sumber biar gampang diganti
}
```

### data/config.ts
```ts
export const siteConfig = {
  name: 'RIKO ARDIANTO',
  tagline: 'Cyber Security • Networking • Technology',
  url: 'https://…',                      // ganti saat deploy
  socials: { instagram, whatsapp, github, tiktok, shopee },
  navigation: [ /, /shop, /blog, /kontak ],
  openGraph: { … },
};
```

### data/products.ts
- `products: Product[]` — master data.
- `getProductBySlug(slug)`, `getProductsByCategory(cat)`.
- UI **tidak pernah** hardcode produk; kategori & harga ganti cukup di satu file.

### lib/categories.ts
```ts
export const SHOP_CATEGORIES = [
  { key: 'all',     label: 'ALL' },
  { key: 'premium', label: 'APLIKASI PREMIUM' },
  { key: 'shopee',  label: 'SHOPEE' },
];
export const BLOG_CATEGORIES = [
  'CARA BELI', 'NETWORKING', 'CYBER SECURITY', 'KALI LINUX', 'LINUX',
  'MIKROTIK', 'GPON / OLT', 'WEB DEVELOPMENT', 'DOCKER', 'DEVOPS', 'TUTORIAL',
];
```

---

## 7. Blog Architecture

- Lokasi: `content/blog/*.mdx` (front-matter + markdown).
- `lib/blog.ts` (server-only):
  - `getAllPosts()` — fs + gray-matter → meta terurut tanggal.
  - `getPostBySlug(slug)` — baca file → `remark().use(html)` → HTML string + headings[] (h2/h3 punya id slugified buat ToC).
  - `getCategoriesWithCount()` — buat chips filter.
- Halaman `/blog` dan `/blog/[slug]` SSG via `generateStaticParams`; `generateMetadata` di [slug] buat SEO.
- Front-matter setiap artikel:

```mdx
---
title: "Judul"
slug: "nmap-network-discovery"
description: "Ringkasan 1-2 kalimat"
category: "NETWORKING"
tags: ["nmap", "security"]
date: "2026-08-31"
updatedAt: "2026-08-31"
author: "Riko Ardianto"
cover: "/images/blog/<file>.webp"
readingTime: "5 min"
---
konten markdown…
```

---

## 8. Image Architecture

```
public/images/
├── profile/        foto/avatar Riko (webp)
├── hero/           visual hero, texture pendukung (webp/svg)
├── products/       foto produk (webp)
├── applications/   preview aplikasi premium (webp)
├── blog/           cover artikel (+ default.webp sebagai fallback)
├── background/     noise/texture
└── icons/          logo brand & teknologi (svg)
```

Aturan:
- Semua via path relatif `/images/…` — **tanpa base64**.
- SVG untuk icon/logo; **webp** untuk foto/cover; PNG hanya kalau butuh transparan.
- Nama kebab-case deskriptif (`hero-main.webp`).
- Cover blog fallback `default.webp` biar artikel baru tidak pernah broken image.

---

## 9. Animation Architecture

### Sistem reusable (2D — Motion)
| Sistem | Cara kerja |
|---|---|
| `lib/animations.ts` | Easing preset (`[0.16,1,0.3,1]`), variants `fadeUp` / `scaleIn` / `stagger` — satu sumber |
| `ScrollReveal` | `whileInView` + `viewport={{ once: true }}`, prop `delay`, `y`, custom variant |
| `TiltCard` | `useMotionValue` + `useSpring` → rotateX/rotateY by pointer; mati di touch & reduced-motion |
| `MagneticButton` | Translate mendekat ke kursor dalam radius, spring balik |
| `FloatingElement` | Loop `animate y: [0, -8, 0]` durasi via prop |
| `TypingText` | State interval ketik → pause → hapus → ganti kata |

### Parallax
`ParallaxBackground`: `useScroll` + `useTransform` per layer dengan `depth` (0.2–0.8); positioning fixed; layer 2D + slot opsional host `NetworkScene` (3D).

### 3D — R3F (`components/three/`)
- **NetworkScene**: satu `<Canvas>` (dpr `min(2, devicePixelRatio)`), fog + kamera statis; data node & koneksi dari array state; **quality tier** (mobile: 8 node/dpr 1, desktop: 16 node); **fallback statis** saat WebGL tidak tersedia (deteksi `WebGLRenderingContext` + error boundary) → gradient cyber tetap kelihatan premium.
- **NetworkNode**: sphere + ring glow, hover scale, pakai `useReducedMotion` buat matiin pulse.
- **NetworkConnection**: kurva (quadratic bezier) antar node, opacity by jarak, render via `<Line>` drei.
- Loading: `next/dynamic ssr:false` + Suspense fallback.

### Aturan global
- Semua animasi hormati `prefers-reduced-motion` (Motion `useReducedMotion` + CSS media query).
- 3D hanya di home; framerate jaga lewat `dpr` & jumlah node.
- Tidak ada library animasi tambahan — Motion + CSS sudah cukup.

---

## 10. Penjelasan Singkat Fungsi Folder

| Folder | Fungsi |
|---|---|
| `app/` | Routing & halaman App Router: layout, metadata, file route-state (not-found/error/loading), CSS global |
| `components/` | Semua UI, dikelompokkan per domain: `layout`, `home`, `shop`, `blog`, `three`, `ui` |
| `data/` | Data murni tanpa JSX: produk, config, teknologi, type — single source of truth |
| `lib/` | Logika: blog pipeline (server-only), utils `cn()`, preset animasi, daftar kategori |
| `content/` | Artikel blog MDX (konten terpisah dari kode UI) |
| `public/` | Asset statis: semua gambar (profile/hero/products/applications/blog/background/icons) |
| `styles/` | Cadangan CSS module — default pakai `app/globals.css` + `@theme` (Tailwind v4) |

---

*Arsitektur selesai. Implementasi UI menunggu instruksi berikutnya.*
