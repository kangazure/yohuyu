/**
 * Generate logo resmi brand ke public/logos/*.svg.
 * Sumber: simple-icons (glyph resmi) via CDN; warna brand dari file.
 * Semua brand yang tidak punya glyph resmi di simple-icons memakai
 * wordmark fallback (WeTV, Prime Video) — digenerate di sini.
 *
 * Cara pakai:
 *   node scripts/generate-logos.mjs
 */
import { writeFile, readFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'logos');

/** slug simple-icons → nama file output (+ override warna bila perlu) */
const BRANDS = [
  ['netflix', 'netflix'],
  ['youtube', 'youtube'],
  ['spotify', 'spotify'],
  ['tiktok', 'tiktok', '#ffffff'], // glyph asli hitam — putih supaya terlihat di tile gelap
  ['canva', 'canva'],
  ['capcut', 'capcut', '#ffffff'], // glyph asli hitam
  ['instagram', 'instagram'],
  ['viu', 'viu'],
  ['iqiyi', 'iqiyi'],
  ['youku', 'youku'],
  ['bilibili', 'bstation', '#00a1d6'],
  ['picsart', 'picsart'],
  ['vsco', 'vsco', '#ffffff'],
  ['shopee', 'shopee'],
  ['mikrotik', 'mikrotik', '#ff4d00'], // glyph simple-icons abu-abu — pakai merah khas MikroTik
  ['linux', 'linux'],
  ['kalilinux', 'kali'],
  ['docker', 'docker'],
  ['github', 'github', '#ffffff'],
  ['react', 'react'],
  ['nextdotjs', 'nextjs', '#ffffff'],
  ['typescript', 'typescript'],
  ['nodedotjs', 'nodejs'],
  ['php', 'php'],
  ['laravel', 'laravel'],
  ['wireshark', 'wireshark'],
  ['supabase', 'supabase'],
];

/** warna merek utama bila fallback/glyph tak punya warna */
const BRAND_COLOR = {
  wetv: '#00a7ff',
  primevideo: '#00a8e1',
  noktel: '#22d3ee',
};

/** brand yang tidak ada di simple-icons → ambil logo resmi dari Wikimedia */
const WIKI_BRANDS = [
  ['canva', 'Canva_logo.svg', '#00c4cc'],
  // CapCut_logo.svg di Wikimedia isinya PNG embed yang terpotong (tidak valid) —
  // fallback ke wordmark resmi "CapCut".
  ['capcut', null, '#ffffff'],
  ['viu', 'Viu_logo.svg', '#ff7733'],
  ['iqiyi', 'https://cdn.worldvectorlogo.com/logos/iqiyi-1.svg', '#00be06'],
  ['youku', 'https://cdn.worldvectorlogo.com/logos/youku.svg', '#00a0e9'],
];

const WIKI_CACHE = new Map();

const UA =
  'mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

async function fetchWikimedia(name) {
  if (WIKI_CACHE.has(name)) return WIKI_CACHE.get(name);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      // resolve redirect manual → URL file asli di upload.wikimedia.org
      const isDirect = name.startsWith('http');
      const head = isDirect
        ? { status: 301, headers: { get: () => name.split('?')[0] } }
        : await fetch(`https://en.wikipedia.org/wiki/Special:Redirect/file/${name}`, {
            headers: { 'user-agent': UA },
            redirect: 'manual',
          });
      const loc = head.headers.get('location') ?? '';
      const target = isDirect || loc.startsWith('http') ? loc.split('?')[0] : `https:${loc.split('?')[0]}`;
      const res = await fetch(target, { headers: { 'user-agent': UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const svg = await res.text();
      if (!svg.includes('<svg')) throw new Error('svg tidak valid');
      // viewBox tidak selalu ada — fallback ke atribut width/height
      const vbm = svg.match(/viewBox="([^"]*)"/);
      const [x, y, w, h] = vbm
        ? vbm[1].split(/[\s,]+/).map(Number)
        : [0, 0, Number(svg.match(/width="(\d+(?:\.\d+)?)"/)?.[1] ?? 0), Number(svg.match(/height="(\d+(?:\.\d+)?)"/)?.[1] ?? 0)];
      if (!w || !h || w <= 0 || h <= 0) throw new Error('ukuran tidak valid');
      // ambil seluruh isi <svg> (tanpa tag svg luar)
      const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/i, '').replace(/<\/svg>[\s\S]*$/i, '');
      const result = { inner, x, y, w, h };
      WIKI_CACHE.set(name, result);
      return result;
    } catch (err) {
      if (attempt === 2) {
        WIKI_CACHE.set(name, null);
        return null;
      }
      await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
    }
  }
  return null;
}

/** bungkus konten svg asing ke dalam tile 128px dengan skala otomatis (preserve multi-path & warna) */
function embedSvg({ inner, x, y, w, h, color, title }) {
  const scale = 68 / Math.max(w, h);
  const tx = (128 - w * scale) / 2 - x * scale;
  const ty = (128 - h * scale) / 2 - y * scale;
  const clean = normalizeInner(inner);
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#171f38"/>
      <stop offset="1" stop-color="#0b1120"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.38" r="0.75">
      <stop offset="0" stop-color="${color}" stop-opacity="0.3"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#bg)"/>
  <rect width="128" height="128" rx="28" fill="url(#halo)"/>
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(3)})">
${clean}
  </g>
</svg>
`;
}

const CACHE = new Map();

async function fetchGlyph(slug) {
  if (CACHE.has(slug)) return CACHE.get(slug);
  const url = `https://cdn.simpleicons.org/${slug}`;
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'rikoardianto-logo-gen' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const svg = await res.text();
    // ambil path d dan warna fill
    const d = svg.match(/<path[^>]*\sd="([^"]*)"/)?.[1];
    const fill = svg.match(/<svg[^>]*fill="([^"]*)"/)?.[1] ?? null;
    if (!d) throw new Error('path tidak ditemukan');
    const result = { d, fill };
    CACHE.set(slug, result);
    return result;
  } catch (err) {
    CACHE.set(slug, null);
    return null;
  }
}

/** warna gelap → putih biar tetap terlihat di tile gelap */
function safeColor(fill, override, brand) {
  const color = override ?? fill ?? BRAND_COLOR[brand] ?? '#ffffff';
  const dark = ['#000000', '#0f0f0f', '#111111', '#293239'];
  return dark.includes(color.toLowerCase()) ? '#ffffff' : color;
}

/** hilangkan atribut namespace lama & seragamkan href (SVG2) — mencegah referensi putus di <img> */
function normalizeInner(inner) {
  return inner
    .replace(/\sxlink:href=/g, ' href=')
    .replace(/\sxmlns\S*="[^"]*"/g, '');
}

function tileSvg({ d, color, title }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#171f38"/>
      <stop offset="1" stop-color="#0b1120"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.38" r="0.75">
      <stop offset="0" stop-color="${color}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#bg)"/>
  <rect width="128" height="128" rx="28" fill="url(#halo)"/>
  <g transform="translate(28 28) scale(3)">
    <path d="${d}" fill="${color}"/>
  </g>
</svg>
`;
}

function wordmarkSvg({ text, color, sub }) {
  const size = text.length > 5 ? 30 : 36;
  const subLine = sub
    ? `<text x="64" y="84" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="4" text-anchor="middle" fill="${color}" opacity="0.75">${sub}</text>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="${text}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#171f38"/>
      <stop offset="1" stop-color="#0b1120"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.38" r="0.75">
      <stop offset="0" stop-color="${color}" stop-opacity="0.3"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#bg)"/>
  <rect width="128" height="128" rx="28" fill="url(#halo)"/>
  <text x="64" y="58" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="800" letter-spacing="1" text-anchor="middle" fill="${color}">${text}</text>
  ${subLine}
</svg>
`;
}

async function main() {
  const results = [];
  for (const [slug, name, override] of BRANDS) {
    const glyph = await fetchGlyph(slug);
    const file = join(OUT_DIR, `${name}.svg`);
    if (glyph) {
      const color = safeColor(glyph.fill, override, name);
      await writeFile(file, tileSvg({ d: glyph.d, color, title: slug }));
      results.push(`ok    ${name}.svg  (${color})`);
    } else {
      results.push(`FAIL  ${name}.svg  (${slug} tidak tersedia)`);
    }
  }

  // brand dengan glyph resmi dari Wikimedia (canva, capcut, viu, iqiyi, youku)
  for (const [name, file, tint] of WIKI_BRANDS) {
    if (!file) {
      // tanpa sumber glyph valid → wordmark resmi
      await writeFile(join(OUT_DIR, `${name}.svg`), wordmarkSvg({ text: name === 'capcut' ? 'CapCut' : name, color: tint }));
      results.push(`ok    ${name}.svg  (wordmark resmi — sumber PNG rusak)`);
    } else {
      const svg = await fetchWikimedia(file);
      if (svg) {
        await writeFile(join(OUT_DIR, `${name}.svg`), embedSvg({ ...svg, color: tint, title: name }));
        results.push(`ok    ${name}.svg  (wikimedia ${file})`);
      } else {
        results.push(`FAIL  ${name}.svg  (wikimedia ${file} tidak tersedia)`);
      }
    }
    // jeda ringan biar tidak kena rate-limit
    await new Promise((r) => setTimeout(r, 1500));
  }

  // brand tanpa glyph simple-icons → wordmark resmi
  await writeFile(
    join(OUT_DIR, 'wetv.svg'),
    wordmarkSvg({ text: 'WeTV', color: BRAND_COLOR.wetv })
  );
  await writeFile(
    join(OUT_DIR, 'prime-video.svg'),
    wordmarkSvg({ text: 'prime', sub: 'video', color: BRAND_COLOR.primevideo })
  );
  results.push('ok    wetv.svg  (wordmark)');
  results.push('ok    prime-video.svg  (wordmark)');

  // noktel bukan brand nyata — pertahankan asset lama apa adanya
  try {
    await copyFile(join(ROOT, 'public', 'images', 'products', 'noktel.svg'), join(OUT_DIR, 'noktel.svg'));
    results.push('ok    noktel.svg  (copied from images/products)');
  } catch {
    results.push('FAIL  noktel.svg  (source tidak ada)');
  }

  console.log(results.join('\n'));

  // cek file hasil
  const { readdir } = await import('node:fs/promises');
  const files = await readdir(OUT_DIR);
  console.log(`\n${files.length} file di public/logos/`);
}

// buat folder kalau belum ada
import { mkdir } from 'node:fs/promises';
await mkdir(OUT_DIR, { recursive: true });
await main().catch((e) => {
  console.error(e);
  process.exit(1);
});
