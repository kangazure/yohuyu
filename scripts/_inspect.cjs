const fs = require('fs');
const s = fs.readFileSync('public/logos/youku.svg', 'utf8');
for (const tag of ['style', 'text', 'tspan', 'font', 'image', 'linearGradient', 'radialGradient', 'clipPath', 'mask', 'path']) {
  const re = new RegExp('<' + tag + '[ >]', 'g');
  console.log(tag, (s.match(re) || []).length);
}
// cari blok terbesar antara dua tag
const lines = s.split('\n');
let max = 0, maxLine = 0;
lines.forEach((l, i) => { if (l.length > max) { max = l.length; maxLine = i; } });
console.log('longest line:', max, 'bytes at line', maxLine);
console.log('sample:', lines[maxLine].slice(0, 200));
