import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // standalone: output siap-produksi (dipakai Dockerfile multi-stage)
  output: 'standalone',
};

export default nextConfig;
