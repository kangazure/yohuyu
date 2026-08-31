import type { Project, Skill, Technology } from './types';

/** Daftar teknologi yang didalami (untuk About & TechnologyIcons) */
export const technologies: Technology[] = [
  { name: 'Linux', icon: '/images/icons/linux.svg' },
  { name: 'MikroTik', icon: '/images/icons/mikrotik.svg' },
  { name: 'Docker', icon: '/images/icons/docker.svg' },
  { name: 'Kali Linux', icon: '/images/icons/kali.svg' },
  { name: 'Wireshark', icon: '/images/icons/wireshark.svg' },
  { name: 'React', icon: '/images/icons/react.svg' },
  { name: 'Next.js', icon: '/images/icons/nextjs.svg' },
  { name: 'Node.js', icon: '/images/icons/nodejs.svg' },
  { name: 'Supabase', icon: '/images/icons/supabase.svg' },
];

/** Skill cards interaktif di homepage */
export const skills: Skill[] = [
  {
    key: 'networking',
    title: 'NETWORKING',
    description:
      'Perencanaan, konfigurasi, dan troubleshooting jaringan IP — dari subnetting dan VLAN sampai jaringan FTTH berbasis GPON.',
    items: ['IP Address', 'Subnetting', 'VLAN', 'Routing', 'GPON / OLT'],
    icon: 'wifi',
  },
  {
    key: 'cybersecurity',
    title: 'CYBER SECURITY',
    description:
      'Dasar-dasar keamanan siber: pemindaian jaringan, analisis trafik, hardening sistem, dan kesadaran keamanan.',
    items: ['Nmap', 'Wireshark', 'Hardening', 'Network Security'],
    icon: 'shield',
  },
  {
    key: 'linux',
    title: 'LINUX',
    description:
      'Administrasi sistem Linux sehari-hari: terminal, layanan, firewall, dan otomatisasi tugas.',
    items: ['Shell / CLI', 'Systemd', 'UFW / Firewall', 'Cron'],
    icon: 'terminal',
  },
  {
    key: 'webdev',
    title: 'WEB DEVELOPMENT',
    description:
      'Membangun aplikasi dan website modern dengan React & Next.js, Tailwind CSS, dan integrasi backend.',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    icon: 'code',
  },
  {
    key: 'devops',
    title: 'DEVOPS',
    description:
      'Containerisasi dan deployment: Docker, environment production, dan platform deploy seperti Dokploy.',
    items: ['Docker', 'Dokploy', 'CI / CD', 'VPS'],
    icon: 'box',
  },
  {
    key: 'monitoring',
    title: 'MONITORING',
    description:
      'Menjaga layanan tetap sehat: monitoring uptime, log, alarm, dan health check endpoint.',
    items: ['Health Check', 'Logging', 'Alert / Alarm', 'Uptime'],
    icon: 'activity',
  },
];

/** Project nyata yang pernah/sedang dikerjakan — link repo segera diupdate */
export const projects: Project[] = [
  {
    title: 'NMS ISP Fiber Monitoring',
    description:
      'Sistem monitoring jaringan ISP berbasis web: peta interaktif jalur kabel fiber (OLT → ODC → ODP → ONU), alarm otomatis, dan simulasi fault.',
    image: '/images/projects/nms.svg',
    technologies: ['Next.js', 'Leaflet', 'Supabase', 'Docker'],
    github: 'https://github.com/kangazure',
    demo: '/',
  },
  {
    title: 'RIKOARDIANTO Website v2',
    description:
      'Website ini: gabungan portfolio, online shop produk digital, dan blog teknologi dengan visual futuristic dan animasi 3D.',
    image: '/images/projects/web.svg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Three.js'],
    github: 'https://github.com/kangazure',
    demo: '/',
  },
  {
    title: 'Cybersecurity Blog',
    description:
      'Kumpulan artikel orisinal tentang networking, keamanan siber, Kali Linux, MikroTik, dan deployment — ditulis untuk berbagi praktik nyata.',
    image: '/images/projects/blog.svg',
    technologies: ['Next.js', 'MDX', 'remark'],
    github: 'https://github.com/kangazure',
    demo: '/blog',
  },
];
