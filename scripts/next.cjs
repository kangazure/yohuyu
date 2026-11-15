/**
 * Jalankan Next CLI dengan cwd = root project (build/start/dev).
 * Dipakai di environment di mana `cd` tidak tersedia — setara
 * `npm run build` / `npm start` yang dijalankan dari folder project.
 *
 * Cara pakai:
 *   node scripts/next.cjs build
 *   node scripts/next.cjs start -p 3000
 */
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const project = path.resolve(__dirname, '..');
const nextCli = path.join(project, 'node_modules', 'next', 'dist', 'bin', 'next');
const args = process.argv.slice(2);

const res = spawnSync(process.execPath, [nextCli, ...args], {
  cwd: project,
  stdio: 'inherit',
  shell: false,
});

process.exit(res.status === null ? 1 : res.status);
