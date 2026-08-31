/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Generate asset placeholder (SVG) + noise PNG.
 * Jalan sekali: node scripts/generate-assets.js
 * Semua aset nantinya tinggal diganti file asli (path sama, format apa saja).
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const PUB = path.join(ROOT, 'public', 'images');

const CYAN = '#22d3ee';
const PURPLE = '#8b5cf6';
const FG = '#e8ecf4';
const MUTED = '#93a0b8';
const BG = '#0b1120';
const BG2 = '#111a2e';
const LINE = 'rgba(148,163,194,0.25)';

function ensure(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(rel, content) {
  const full = path.join(PUB, rel);
  ensure(path.dirname(full));
  fs.writeFileSync(full, content, 'utf8');
  console.log('SVG  ', rel);
}

/* ============ dasar svg ============ */

function frame(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${BG2}"/>
    <stop offset="1" stop-color="${BG}"/>
  </linearGradient>
  <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${PURPLE}" stop-opacity="0.55"/>
    <stop offset="1" stop-color="${CYAN}" stop-opacity="0.35"/>
  </linearGradient>
  <radialGradient id="orb" cx="0.5" cy="0.4" r="0.75">
    <stop offset="0" stop-color="${PURPLE}" stop-opacity="0.5"/>
    <stop offset="1" stop-color="${PURPLE}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="14" fill="none" stroke="${LINE}"/>
${inner}</svg>\n`;
}

/* ============ ikon produk (placeholder brand) ============ */

function brandIcon(letter, color) {
  return frame(128, 128, `
<rect x="16" y="16" width="96" height="96" rx="22" fill="url(#glow)" opacity="0.25"/>
<text x="64" y="84" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="${color}" text-anchor="middle">${letter}</text>`);
}

/* ============ ikon teknologi ============ */

function techIcon(label, color) {
  return frame(64, 64, `
<rect x="10" y="10" width="44" height="44" rx="10" fill="${BG2}" stroke="${LINE}"/>
<text x="32" y="40" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="${color}" text-anchor="middle">${label}</text>`);
}

/* ============ blog cover ============ */

function blogCover(title, accent) {
  return frame(1152, 630, `
<rect x="0" y="0" width="1152" height="630" fill="url(#orb)"/>
<path d="M0 330 C 220 260, 420 400, 640 330 S 1060 260, 1152 330 L1152 630 L0 630 Z" fill="${accent}" opacity="0.08"/>
<circle cx="970" cy="150" r="7" fill="${CYAN}" opacity="0.8"/>
<circle cx="1010" cy="120" r="3" fill="${PURPLE}" opacity="0.8"/>
<circle cx="160" cy="480" r="4" fill="${accent}" opacity="0.7"/>
<text x="64" y="96" font-family="monospace" font-size="20" letter-spacing="10" fill="${CYAN}">RIKOARDIANTO / BLOG</text>
<text x="64" y="280" font-family="Arial, sans-serif" font-size="76" font-weight="bold" fill="${FG}">${title}</text>
<text x="64" y="356" font-family="monospace" font-size="22" letter-spacing="6" fill="${MUTED}">NETWORKING • SECURITY • DEVOPS</text>`);
}

/* ============ project preview ============ */

function projectPreview(label, accent) {
  return frame(1280, 720, `
<rect x="0" y="0" width="1280" height="720" fill="url(#orb)"/>
<path d="M0 430 C 300 340, 520 520, 780 430 S 1100 350, 1280 420 L1280 720 L0 720 Z" fill="${accent}" opacity="0.1"/>
<text x="64" y="120" font-family="monospace" font-size="18" letter-spacing="8" fill="${CYAN}">PROJECT PREVIEW</text>
<text x="64" y="260" font-family="Arial, sans-serif" font-size="58" font-weight="bold" fill="${FG}">${label}</text>
<rect x="64" y="330" width="380" height="10" rx="5" fill="${accent}" opacity="0.8"/>
<text x="64" y="430" font-family="monospace" font-size="20" letter-spacing="4" fill="${MUTED}">PLACEHOLDER — GANTI DENGAN SCREENSHOT ASLI</text>`);
}

/* ============ profile ============ */

function profileSvg() {
  return frame(512, 512, `
<rect x="0" y="0" width="512" height="512" fill="url(#orb)"/>
<circle cx="256" cy="205" r="92" fill="none" stroke="${PURPLE}" stroke-width="4" opacity="0.9"/>
<circle cx="256" cy="205" r="84" fill="${PURPLE}" opacity="0.22"/>
<path d="M96 440 C 120 330, 392 330, 416 440" fill="none" stroke="${CYAN}" stroke-width="6" opacity="0.75" stroke-linecap="round"/>
<text x="256" y="520" font-family="monospace" font-size="24" letter-spacing="12" fill="${MUTED}" text-anchor="middle">RIKO ARDIANTO</text>
<text x="256" y="360" font-family="monospace" font-size="16" letter-spacing="6" fill="${CYAN}" text-anchor="middle">NETWORK ENGINEER</text>`);
}

/* ============ og ============ */

function ogSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>` + frame(1200, 630, `
<rect x="0" y="0" width="1200" height="630" fill="url(#orb)"/>
<path d="M0 380 C 260 300, 460 470, 700 380 S 1040 300, 1200 370 L1200 630 L0 630 Z" fill="${PURPLE}" opacity="0.12"/>
<text x="64" y="110" font-family="monospace" font-size="24" letter-spacing="12" fill="${CYAN}">RIKOARDIANTO</text>
<text x="64" y="280" font-family="Arial, sans-serif" font-size="96" font-weight="bold" fill="${FG}">RIKO ARDIANTO</text>
<text x="64" y="360" font-family="monospace" font-size="30" letter-spacing="10" fill="${PURPLE}">ONLINE SHOP • NETWORKING</text>
<text x="64" y="404" font-family="monospace" font-size="30" letter-spacing="10" fill="${PURPLE}">CYBER SECURITY</text>
<text x="64" y="500" font-family="monospace" font-size="20" letter-spacing="6" fill="${MUTED}">ALL KEBUTUHAN DIGITAL — rikoardianto.web.id</text>`);
}

/* ============ noise PNG ============ */

function crc32(buf) {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function noisePng(size = 256) {
  const raw = Buffer.alloc(size * size * 4);
  for (let i = 0; i < raw.length; i += 4) {
    const v = 150 + Math.floor(Math.random() * 105); // abu-abu terang
    raw[i] = v;
    raw[i + 1] = v;
    raw[i + 2] = v;
    raw[i + 3] = Math.floor(Math.random() * 45); // alpha rendah
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ============ daftar aset ============ */

const PRODUCT_BRANDS = [
  ['netflix', 'N', '#e50914'],
  ['noktel', 'K', '#22d3ee'],
  ['tiktok', 'T', '#ff0050'],
  ['youtube', 'Y', '#ff0000'],
  ['viu', 'V', '#ff5c39'],
  ['iqiyi', 'i', '#00be06'],
  ['wetv', 'W', '#33a4ff'],
  ['prime', 'P', '#00a8e1'],
  ['spotify', 'S', '#1db954'],
  ['canva', 'C', '#00c4cc'],
  ['capcut', 'C', '#00d1ff'],
  ['picsart', 'P', '#ffb300'],
  ['vsco', 'V', '#8b5cf6'],
  ['instagram', 'I', '#e1306c'],
  ['premium', 'P', '#8b5cf6'],
  ['shopee', 'S', '#ee4d2d'],
];

const TECH_ICONS = [
  ['linux', 'L', '#f0c040'],
  ['mikrotik', 'M', '#e0b000'],
  ['docker', 'D', '#2496ed'],
  ['kali', 'K', '#1793d1'],
  ['wireshark', 'W', '#a97bd9'],
  ['react', 'R', '#61dafb'],
  ['nextjs', 'N', '#ffffff'],
  ['nodejs', 'N', '#83cd29'],
  ['supabase', 'S', '#3ecf8e'],
];

const BLOG_COVERS = [
  ['default', 'KATEGORI', CYAN],
  ['networking', 'NETWORKING', PURPLE],
  ['security', 'CYBER SECURITY', '#f43f5e'],
  ['linux', 'LINUX', '#f0c040'],
  ['devops', 'DEVOPS', '#3ecf8e'],
  ['shop', 'SHOP & TUTORIAL', '#fb923c'],
];

const PROJECTS = [
  ['nms', 'NMS ISP FIBER', PURPLE],
  ['web', 'RIKOARDIANTO WEBSITE', CYAN],
  ['blog', 'CYBERSECURITY BLOG', '#3ecf8e'],
];

/* ============ jalankan ============ */

ensure(PUB);

write('profile/riko-ardianto.svg', profileSvg());
write('og.svg', ogSvg());

for (const [name, letter, color] of PRODUCT_BRANDS) {
  write(`products/${name}.svg`, brandIcon(letter, color));
}
for (const [name, label, color] of TECH_ICONS) {
  write(`icons/${name}.svg`, techIcon(label, color));
}
for (const [name, title, accent] of BLOG_COVERS) {
  write(`blog/${name}.svg`, blogCover(title, accent));
}
for (const [name, label, accent] of PROJECTS) {
  write(`projects/${name}.svg`, projectPreview(label, accent));
}

const noise = noisePng();
fs.writeFileSync(path.join(PUB, 'noise.png'), noise);
console.log('PNG   noise.png', noise.length, 'bytes');

// favicon (Next.js: app/icon.svg)
const favicon = frame(64, 64, `
<rect x="8" y="8" width="48" height="48" rx="12" fill="${PURPLE}" opacity="0.85"/>
<text x="32" y="42" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">R</text>`);
const appDir = path.join(ROOT, 'app');
ensure(appDir);
fs.writeFileSync(path.join(appDir, 'icon.svg'), favicon);
console.log('SVG   app/icon.svg');

console.log('\nSelesai — semua aset placeholder siap.');
