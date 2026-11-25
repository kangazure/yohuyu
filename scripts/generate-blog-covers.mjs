#!/usr/bin/env node
/**
 * Generate unique SVG cover images for every blog article.
 * Each image is themed to match its content topic.
 */
import fs from 'fs';
import path from 'path';

const BLOG_DIR = 'C:/Users/rikoa/Downloads/yohuyu-main/yohuyu-main/content/blog';
const IMG_DIR = 'C:/Users/rikoa/Downloads/yohuyu-main/yohuyu-main/public/images/blog';

// W=1152 H=630 — Open Graph standard
const W = 1152, H = 630;

// ─── helpers ────────────────────────────────────────────────────────────────
function svgEl(tag, attrs, children) {
  const attrStr = Object.entries(attrs || {}).map(([k,v]) => `${k}="${v}"`).join(' ');
  const body = children ? `\n${children}\n` : '';
  return `<${tag} ${attrStr}${body ? '>' + body + '</' + tag + '>' : '/>'}`;
}

function line(x1,y1,x2,y2,color='rgba(148,163,194,0.04)',width=1) {
  return svgEl('line',{x1,y1,x2,y2,stroke:color,'stroke-width':width});
}

function rect(x,y,w,h,fill,rx=0,stroke=null) {
  const a={x,y,width:w,height:h,fill,rx}; if(stroke)a.stroke=stroke;
  return svgEl('rect',a);
}

function circle(cx,cy,r,fill) {
  return svgEl('circle',{cx,cy,r,fill});
}

function text_(x,y,content,size=24,fill='#e8ecf4',extra={}) {
  const a={x,y,'font-size':size,'font-family':'system-ui,sans-serif',fill,...extra};
  return svgEl('text',a,content);
}

function mono(x,y,content,size=18,fill='#22d3ee') {
  return text_(x,y,content,size,fill,{
    'font-family':'monospace','letter-spacing':'0.03em'
  });
}

// ─── background template ────────────────────────────────────────────────────
function bg(accent = '#8b5cf6') {
  return [
    `<defs>`,
      `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">`,
        `<stop offset="0%" stop-color="#0d1525"/>`,
        `<stop offset="100%" stop-color="#070d1a"/>`,
      `</linearGradient>`,
      `<radialGradient id="glow" cx="70%" cy="35%" r="65%">`,
        `<stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>`,
        `<stop offset="100%" stop-color="${accent}" stop-opacity="0"/>`,
      `</radialGradient>`,
    `</defs>`,
    rect(0,0,W,H,'url(#bg)'),
    rect(0,0,W,H,'url(#glow)'),
    // subtle grid
    ...Array.from({length:13},(_,i)=>line(i*88+8,0,i*88+8,H,'rgba(148,163,194,0.03)',1)),
    ...Array.from({length:8},(_,i)=>line(0,i*80+40,W,i*80+40,'rgba(148,163,194,0.03)',1)),
    rect(0.5,0.5,W-1,H-1,'none','rgba(148,163,194,0.1)',1),
  ].join('\n');
}

// ─── article definitions ────────────────────────────────────────────────────
const articles = [
  {
    slug:'cara-beli-produk-digital',
    title:'Cara Beli Produk Digital',
    subtitle:'Panduan Belanja Aman Online',
    accent:'#fb923c',
    draw: (ctx) => {
      const {svg}=ctx;
      // shopping bag
      svg(rect(440,170,272,210,'rgba(251,146,60,0.1)','rgba(251,146,60,0.35)',2));
      svg(rect(460,170,232,36,'rgba(251,146,60,0.08)'));
      svg(svgEl('path',{d:'M500,170 Q500,130 576,130 Q652,130 652,170',fill:'none',stroke:'rgba(251,146,60,0.45)','stroke-width':3}));
      svg(text_(576,300,'✓','68','rgba(251,146,60,0.85)',{
        'font-family':'monospace','font-weight':'bold'
      }));
      // floating product cards
      [[200,190,110,70],[800,220,90,55],[240,430,80,50],[820,400,100,60]].forEach(([x,y,w,h],i)=>{
        svg(rect(x,y,w,h,'rgba(251,146,60,0.06)','rgba(251,146,60,0.2)',1));
      });
      // trust badges
      ['SSL SECURE','ORIGINAL','GARANSI'].forEach((t,i)=>svg(mono(200+i*280,520,t,12,'rgba(251,146,60,0.45)')));
    }
  },
  {
    slug:'cyber-security-dasar',
    title:'Cyber Security',
    subtitle:'Untuk Pemula',
    accent:'#f43f5e',
    draw: (ctx) => {
      const {svg}=ctx;
      // shield
      svg(svgEl('path',{d:'M576,130 L680,185 L680,305 C680,395 576,460 576,460 C576,460 472,395 472,305 L472,185 Z',fill:'rgba(244,63,94,0.09)','stroke':'rgba(244,63,94,0.5)',strokeWidth:2}));
      svg(svgEl('path',{d:'M576,170 L655,210 L655,298 C655,365 576,420 576,420 C576,420 497,365 497,298 L497,210 Z',fill:'rgba(244,63,94,0.05)','stroke':'rgba(244,63,94,0.25)',strokeWidth:1}));
      // lock
      svg(rect(556,265,40,34,'rgba(244,63,94,0.22)','rgba(244,63,94,0.5)',1.5));
      svg(svgEl('path',{d:'M560,265 L560,252 C560,243 592,243 592,252 L592,265',fill:'none',stroke:'rgba(244,63,94,0.5)',strokeWidth:2}));
      svg(circle(576,283,4,'rgba(244,63,94,0.8)'));
      // CIA triad
      ['CONFIDENTIALITY','INTEGRITY','AVAILABILITY'].forEach((t,i)=>{
        svg(mono(180+i*310,520,'['+t+']',11,'rgba(244,63,94,0.4)'));
      });
      // binary rain
      for(let i=0;i<10;i++) svg(mono(140+i*45,170+Math.random()*60,String(Math.round(Math.random())),11,'rgba(244,63,94,0.12)'));
      for(let i=0;i<7;i++) svg(mono(840+i*50,190+Math.random()*80,String(Math.round(Math.random())),11,'rgba(244,63,94,0.12)'));
    }
  },
  {
    slug:'dasar-jaringan-komputer',
    title:'Dasar Jaringan',
    subtitle:'Komputer untuk Pemula',
    accent:'#22d3ee',
    draw: (ctx) => {
      const {svg}=ctx;
      // central hub
      svg(circle(576,300,44,'rgba(34,211,238,0.12)','rgba(34,211,238,0.45)',2));
      svg(text_(576,308,'HUB','18','rgba(34,211,238,0.9)',{'font-family':'monospace','font-weight':'bold'}));
      // connected nodes
      const nodes=[[280,170,'PC'],[870,170,'SW'],[280,430,'RT'],[870,430,'SR'],[420,510,'CL'],[730,510,'CL']];
      nodes.forEach(([cx,cy,label])=>{
        svg(circle(cx,cy,24,'rgba(34,211,238,0.1)','rgba(34,211,238,0.35)',1.5));
        svg(text_(cx,cy+7,label,'10','rgba(34,211,238,0.65)',{'font-family':'monospace'}));
        svg(line(576,300,cx,cy,'rgba(34,211,238,0.18)',1));
      });
      svg(mono(180,570,'OSI MODEL • TCP/IP • TOPOLOGY • PERANGKAT JARINGAN','11','rgba(34,211,238,0.3)'));
    }
  },
  {
    slug:'deploy-nextjs-dokploy',
    title:'Deploy Next.js',
    subtitle:'di Dokploy',
    accent:'#3ecf8e',
    draw: (ctx) => {
      const {svg}=ctx;
      // server rack units
      [200,270,340].forEach((y,i)=>{
        svg(rect(430,y,292,52,'rgba(62,207,142,0.07)','rgba(62,207,142,0.28)',1));
        svg(circle(455,y+26,6,'rgba(62,207,142,0.7)'));
        svg(rect(475,y+16,55,5,'rgba(62,207,142,0.2)'));
        svg(rect(475,y+26,35,5,'rgba(62,207,142,0.15)'));
        svg(circle(660,y+16,4,i===0?'rgba(62,207,142,0.9)':'rgba(62,207,142,0.35)'));
        svg(circle(676,y+16,4,'rgba(34,211,238,0.5)'));
      });
      // deploy arrow
      svg(svgEl('path',{d:'M576,530 L576,470 M556,490 L576,470 L596,490',fill:'none',stroke:'rgba(62,207,142,0.55)',strokeWidth:2}));
      svg(text_(576,550,'DEPLOYED ✓','16','rgba(62,207,142,0.8)',{'font-family':'monospace','font-weight':'bold'}));
      // tags
      ['DOCKER','VPS','HTTPS AUTO'].forEach((t,i)=>svg(mono(200+i*260,140,t,11,'rgba(62,207,142,0.35)')));
    }
  },
  {
    slug:'docker-dasar',
    title:'Docker',
    subtitle:'untuk Pemula',
    accent:'#3b82f6',
    draw: (ctx) => {
      const {svg}=ctx;
      const symbols=['⎈','⬡','⏣','⎔','⌘'];
      const boxes=[[370,180,105,75],[500,160,105,75],[630,190,105,75],[420,300,105,75],[560,280,105,75]];
      boxes.forEach(([x,y,w,h],i)=>{
        svg(rect(x,y,w,h,'rgba(59,130,246,0.09)','rgba(59,130,246,0.38)',1.5));
        svg(rect(x+8,y+8,w-16,h-16,'rgba(59,130,246,0.05)'));
        svg(text_(x+w/2,y+h/2+6,symbols[i]||'⬡','22','rgba(59,130,246,0.55)',{'font-family':'monospace'}));
      });
      // dock surface + waves
      svg(rect(300,395,550,10,'rgba(59,130,246,0.18)'));
      for(let i=0;i<14;i++){
        const wx=310+i*38, wy=415+Math.sin(i*0.8)*5;
        svg(svgEl('path',{d:`M${wx},${wy} Q${wx+10},${wy-5} ${wx+20},${wy} T${wx+40},${wy}`,fill:'none',stroke:'rgba(59,130,246,0.12)',strokeWidth:1.5}));
      }
      svg(mono(180,530,'IMAGE • CONTAINER • DOCKERFILE • COMPOSE','11','rgba(59,130,246,0.35)'));
    }
  },
  {
    slug:'gpon',
    title:'GPON',
    subtitle:'Teknologi Fiber Rumah',
    accent:'#a78bfa',
    draw: (ctx) => {
      const {svg}=ctx;
      // OLT unit at top
      svg(rect(490,110,172,50,'rgba(167,139,250,0.1)','rgba(167,139,250,0.45)',1.5));
      svg(text_(576,140,'OLT','16','rgba(167,139,250,0.9)',{'font-family':'monospace','font-weight':'bold'}));
      // splitter
      svg(rect(516,230,120,36,'rgba(167,139,250,0.08)','rgba(167,139,250,0.35)',1));
      svg(text_(576,252,'SPLITTER 1:32','12','rgba(167,139,250,0.75)',{'font-family':'monospace'}));
      // fiber lines to ONUs
      const onus=[[300,390],[440,390],[576,390],[712,390],[850,390]];
      onus.forEach(([cx,cy],i)=>{
        svg(svgEl('path',{
          d:`M576,266 Q${cx},${310+i*8} ${cx},${cy}`,
          fill:'none',stroke:`rgba(167,139,250,${0.12+i*0.04})`,strokeWidth:1.5
        }));
        svg(rect(cx-38,cy,76,40,'rgba(167,139,250,0.08)','rgba(167,139,250,0.3)',1));
        svg(text_(cx,cy+25,'ONU','10','rgba(167,139,250,0.65)',{'font-family':'monospace'}));
        // house icon below
        svg(svgEl('path',{d:`M${cx-12},${cy+42} L${cx},${cy+54} L${cx+12},${cy+42} Z`,fill:'rgba(167,139,250,0.12)',stroke:'rgba(167,139,250,0.25)',strokeWidth:1}));
      });
      svg(mono(180,560,'POINT-TO-MULTIPOINT • 2.5 Gbps DOWN • ITU-T G.984','10','rgba(167,139,250,0.3)'));
    }
  },
  {
    slug:'ip-address',
    title:'IP Address',
    subtitle:'Pengertian & Jenisnya',
    accent:'#06b6d4',
    draw: (ctx) => {
      const {svg}=ctx;
      const data=[
        {ip:'192.168.1.1',label:'PRIVATE',class:'Class C',x:180,y:180},
        {ip:'10.0.0.1',label:'PRIVATE',class:'Class A',x:420,y:180},
        {ip:'172.16.0.1',label:'PRIVATE',class:'Class B',x:660,y:180},
        {ip:'8.8.8.8',label:'PUBLIC',class:'—',x:900,y:180},
      ];
      data.forEach(({ip,label,class:c,x,y})=>{
        svg(mono(x,y,ip,18,'rgba(6,182,212,0.75)',{'font-family':'monospace','font-weight':'bold'}));
        svg(mono(x,y+26,label+' • '+c,10,'rgba(6,182,212,0.35)',{'font-family':'monospace'}));
        svg(circle(x+10,y+52,4,'rgba(6,182,212,0.5)'));
      });
      // connecting line
      svg(line(190,260,1010,260,'rgba(6,182,212,0.12)',1));
      // IPv6
      svg(mono(280,340,'2001:0db8:85a3::8a2e:0370:7334','15','rgba(6,182,212,0.5)',{'font-family':'monospace'}));
      svg(mono(280,370,'IPv6 · 128-bit address space','11','rgba(6,182,212,0.3)'));
      // CIDR
      svg(mono(200,460,'255.255.255.0   →   /24','16','rgba(6,182,212,0.55)',{'font-family':'monospace','font-weight':'bold'}));
      svg(mono(200,490,'Subnet Mask · CIDR · Broadcast','11','rgba(6,182,212,0.3)'));
    }
  },
  {
    slug:'kali-linux',
    title:'Kali Linux',
    subtitle:'Toolkit Keamanan',
    accent:'#00ff88',
    draw: (ctx) => {
      const {svg}=ctx;
      // terminal window
      svg(rect(270,130,612,370,'rgba(0,0,0,0.5)','rgba(0,255,136,0.25)',1.5));
      // titlebar
      svg(rect(270,130,612,30,'rgba(0,255,136,0.07)'));
      svg(circle(290,145,6,'rgba(239,68,68,0.8)'));
      svg(circle(310,145,6,'rgba(234,179,8,0.8)'));
      svg(circle(330,145,6,'rgba(34,197,94,0.8)'));
      svg(mono(380,145,'root@kali:~#','12','rgba(0,255,136,0.5)',{'font-family':'monospace'}));
      // commands
      const cmds=[
        ['$ nmap -sV 192.168.1.0/24','Scanning...  [3 OPEN ports found]'],
        ['$ sqlmap -u "http://target" --batch','SQL injection verified ✓'],
        ['$ hashcat -m 0 hashes.txt rockyou.txt','Cracking...  ██████████ 100%'],
        ['$ wireshark -i wlan0 monitor','Capture active — 1.2k pps'],
        ['$ john --wordlist=/usr/share/hash','Password cracked: admin123'],
      ];
      cmds.forEach(([cmd,out],i)=>{
        const y=195+i*52;
        svg(mono(290,y,cmd,11,'rgba(0,255,136,0.85)',{'font-family':'monospace'}));
        svg(mono(310,y+20,out,10,'rgba(0,255,136,0.35)',{'font-family':'monospace'}));
      });
      // cursor
      svg(rect(600,455,8,14,'rgba(0,255,136,0.6)'));
      svg(mono(290,520,'PENETRATION TESTING • SECURITY ASSESSMENT','10','rgba(0,255,136,0.25)',{'font-family':'monospace'}));
    }
  },
  {
    slug:'linux-networking-dasar',
    title:'Linux Networking',
    subtitle:'Perintah Wajib Dikuasai',
    accent:'#fbbf24',
    draw: (ctx) => {
      const {svg}=ctx;
      // terminal
      svg(rect(250,120,652,410,'rgba(0,0,0,0.45)','rgba(251,191,36,0.22)',1.5));
      svg(rect(250,120,652,28,'rgba(251,191,36,0.06)'));
      svg(circle(270,134,6,'rgba(239,68,68,0.8)'));
      svg(circle(290,134,6,'rgba(234,179,8,0.8)'));
      svg(circle(310,134,6,'rgba(34,197,94,0.8)'));
      svg(mono(370,134,'user@linux:~$','12','rgba(251,191,36,0.5)',{'font-family':'monospace'}));
      const cmds=[
        ['$ ip addr show','eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>\n    inet 192.168.1.10/24 brd 192.168.1.255'],
        ['$ ss -tuln | grep LISTEN','tcp  LISTEN  0  128  0.0.0.0:22  *:*'],
        ['$ route -n','Kernel IP routing table\n    0.0.0.0         192.168.1.1  0.0.0.0'],
        ['$ resolvectl status','DNS Servers: 8.8.8.8\n                  1.1.1.1'],
        ['$ ping -c 4 google.com','64 bytes from google.com: icmp_seq=1 ttl=116 time=14.2 ms'],
        ['$ iptables -L -n','Chain INPUT (policy ACCEPT)\ntarget     prot opt source               destination'],
      ];
      cmds.forEach(([cmd,out],i)=>{
        const y=178+i*60;
        svg(mono(270,y,cmd,11,'rgba(251,191,36,0.8)',{'font-family':'monospace'}));
        out.split('\n').forEach((l,j)=>{
          svg(mono(290,y+18+j*15,l,9,'rgba(251,191,36,0.3)',{'font-family':'monospace'}));
        });
      });
      svg(mono(270,545,'ip • ss • route • resolvectl • iptables • ping','10','rgba(251,191,36,0.25)',{'font-family':'monospace'}));
    }
  },
  {
    slug:'mikrotik-dasar',
    title:'MikroTik',
    subtitle:'RouterBoard & RouterOS',
    accent:'#f97316',
    draw: (ctx) => {
      const {svg}=ctx;
      // routerboard chassis
      svg(rect(410,130,332,290,'rgba(249,115,22,0.07)','rgba(249,115,22,0.38)',2));
      // antennas
      svg(rect(460,70,16,60,'rgba(249,115,22,0.18)','rgba(249,115,22,0.35)',1));
      svg(rect(520,60,16,70,'rgba(249,115,22,0.18)','rgba(249,115,22,0.35)',1));
      svg(rect(580,70,16,60,'rgba(249,115,22,0.18)','rgba(249,115,22,0.35)',1));
      // LED indicators
      [430,460,490,520,550,580,610].forEach((x,i)=>{
        svg(circle(x,165,5,i<5?'rgba(34,197,94,0.75)':'rgba(249,115,22,0.4)'));
      });
      // port labels
      svg(mono(440,210,'ETHERNET SWITCH','12','rgba(249,115,22,0.5)',{'font-family':'monospace'}));
      svg(mono(440,235,'PWR SYS ETH1-8 LAN','10','rgba(249,115,22,0.35)',{'font-family':'monospace'}));
      // WAN port
      svg(rect(440,280,260,30,'rgba(249,115,22,0.08)','rgba(249,115,22,0.25)',1));
      svg(mono(455,298,'SFP WAN PORT','11','rgba(249,115,22,0.5)',{'font-family':'monospace'}));
      // Winbox
      svg(rect(180,470,180,50,'rgba(249,115,22,0.07)','rgba(249,115,22,0.28)',1));
      svg(text_(270,500,'Winbox GUI','15','rgba(249,115,22,0.7)',{'font-family':'monospace','font-weight':'bold'}));
      svg(mono(180,545,'DHCP • NAT • PPPoE • BANDWIDTH MONITOR • QUEUE','10','rgba(249,115,22,0.28)',{'font-family':'monospace'}));
      // cables from router
      svg(svgEl('path',{d:'M576,420 Q576,460 520,470',fill:'none',stroke:'rgba(249,115,22,0.2)',strokeWidth:1.5}));
      svg(svgEl('path',{d:'M576,420 Q576,460 640,470',fill:'none',stroke:'rgba(249,115,22,0.2)',strokeWidth:1.5}));
    }
  },
  {
    slug:'nmap-dasar',
    title:'Nmap',
    subtitle:'Network Discovery & Port Scan',
    accent:'#ef4444',
    draw: (ctx) => {
      const {svg}=ctx;
      // radar rings
      [60,120,180,240,300].forEach((r,i)=>{
        svg(circle(576,310,r,'none',`rgba(239,68,68,${0.06+i*0.02})`,i===4?1.2:0.4));
      });
      // sweep sector
      svg(svgEl('path',{d:'M576,310 L780,180 A240,240 0 0,0 720,440 Z',fill:'rgba(239,68,68,0.05)'}));
      svg(svgEl('line',{x1:576,y1:310,x2:760,y2:200,stroke:'rgba(239,68,68,0.5)',strokeWidth:1.5}));
      // detected hosts
      [[400,200],[700,230],[380,400],[720,420],[500,150],[650,460],[300,300]].forEach(([cx,cy],i)=>{
        svg(circle(cx,cy,4,'rgba(239,68,68,0.7)'));
        svg(circle(cx,cy,10,'none','rgba(239,68,68,0.15)',0.8));
      });
      // scan results panel
      svg(rect(180,490,400,80,'rgba(0,0,0,0.4)','rgba(239,68,68,0.2)',1));
      svg(mono(200,510,'Nmap scan report for 192.168.1.1','12','rgba(239,68,68,0.7)',{'font-family':'monospace'}));
      svg(mono(200,532,'PORT     STATE  SERVICE','11','rgba(239,68,68,0.4)',{'font-family':'monospace'}));
      svg(mono(200,550,'22/tcp   open   ssh','11','rgba(34,197,94,0.6)',{'font-family':'monospace'}));
      svg(mono(200,566,'80/tcp   open   http','11','rgba(34,197,94,0.6)',{'font-family':'monospace'}));
      // version info
      svg(mono(640,490,'nmap -sV -sC 192.168.1.0/24','12','rgba(239,68,68,0.5)',{'font-family':'monospace'}));
      svg(mono(640,515,'SYN SCAN • VERSION DETECTION','10','rgba(239,68,68,0.3)',{'font-family':'monospace'}));
    }
  },
  {
    slug:'olt',
    title:'OLT',
    subtitle:'Otak Jaringan Fiber Optik',
    accent:'#6366f1',
    draw: (ctx) => {
      const {svg}=ctx;
      // OLT chassis
      svg(rect(370,130,412,370,'rgba(99,102,241,0.07)','rgba(99,102,241,0.38)',2));
      // line card slots
      [170,230,290,350,410,470].forEach((y,i)=>{
        svg(rect(390,y,372,38,'rgba(99,102,241,0.06)','rgba(99,102,241,0.2)',0.8));
        // SFP cages
        for(let p=0;p<8;p++){
          const px=405+p*42;
          svg(rect(px,y+8,32,20,'rgba(99,102,241,0.12)','rgba(99,102,241,0.3)',0.5));
          const up=i<3&&p<5;
          svg(circle(px+16,y+18,3,up?'rgba(34,197,94,0.8)':'rgba(99,102,241,0.25)'));
        }
        svg(mono(730,y+12,'XPON-'+String(i+1),'10','rgba(99,102,241,0.4)',{'font-family':'monospace'}));
      });
      // management module
      svg(rect(390,520,160,50,'rgba(99,102,241,0.1)','rgba(99,102,241,0.3)',1));
      svg(text_(470,548,'MGMT','13','rgba(99,102,241,0.7)',{'font-family':'monospace','font-weight':'bold'}));
      // fan tray
      svg(rect(620,520,130,50,'rgba(99,102,241,0.05)','rgba(99,102,241,0.2)',0.8));
      svg(mono(640,548,'FAN TRAY','11','rgba(99,102,241,0.35)',{'font-family':'monospace'}));
      // GPON ports label
      svg(mono(390,590,'GPON: ONUs registered via OMCI • Range registration','10','rgba(99,102,241,0.3)',{'font-family':'monospace'}));
    }
  },
  {
    slug:'subnetting',
    title:'Subnetting',
    subtitle:'Studi Kasus Praktis',
    accent:'#8b5cf6',
    draw: (ctx) => {
      const {svg}=ctx;
      // original network
      svg(mono(180,160,'192.168.1.0','20','rgba(139,92,246,0.8)',{'font-family':'monospace','font-weight':'bold'}));
      svg(mono(180,188,'/24  →  256 addresses  →  254 usable hosts','12','rgba(139,92,246,0.4)',{'font-family':'monospace'}));
      // splitting arrows
      svg(svgEl('path',{d:'M350,190 Q400,230 350,270',fill:'none',stroke:'rgba(139,92,246,0.3)',strokeWidth:1.5}));
      svg(svgEl('path',{d:'M350,190 Q400,230 450,270',fill:'none',stroke:'rgba(139,92,246,0.3)',strokeWidth:1.5}));
      // subnet 1
      svg(rect(180,280,240,100,'rgba(139,92,246,0.07)','rgba(139,92,246,0.3)',1));
      svg(mono(200,300,'Subnet 1','14','rgba(139,92,246,0.7)',{'font-family':'monospace','font-weight':'bold'}));
      svg(mono(200,325,'192.168.1.0/26','12','rgba(139,92,246,0.5)',{'font-family':'monospace'}));
      svg(mono(200,348,'Range: .0 – .63  Hosts: 62','10','rgba(139,92,246,0.35)',{'font-family':'monospace'}));
      svg(mono(200,368,'Broadcast: 192.168.1.63','10','rgba(139,92,246,0.3)',{'font-family':'monospace'}));
      // subnet 2
      svg(rect(480,280,240,100,'rgba(139,92,246,0.07)','rgba(139,92,246,0.3)',1));
      svg(mono(500,300,'Subnet 2','14','rgba(139,92,246,0.7)',{'font-family':'monospace','font-weight':'bold'}));
      svg(mono(500,325,'192.168.1.64/26','12','rgba(139,92,246,0.5)',{'font-family':'monospace'}));
      svg(mono(500,348,'Range: .64 – .127  Hosts: 62','10','rgba(139,92,246,0.35)',{'font-family':'monospace'}));
      svg(mono(500,368,'Broadcast: 192.168.1.127','10','rgba(139,92,246,0.3)',{'font-family':'monospace'}));
      // formula
      svg(rect(180,420,790,70,'rgba(139,92,246,0.05)','rgba(139,92,246,0.18)',1));
      svg(mono(200,445,'Rumus:  2^(32 - prefix)  =  total host addresses','14','rgba(139,92,246,0.6)',{'font-family':'monospace'}));
      svg(mono(200,472,'Contoh: /26  →  2^6  =  64 addresses  →  62 usable hosts','11','rgba(139,92,246,0.35)',{'font-family':'monospace'}));
      // decimal to binary hint
      svg(mono(180,520,'255.255.255.192  =  11111111.11111111.11111111.11000000','10','rgba(139,92,246,0.25)',{'font-family':'monospace'}));
    }
  },
  {
    slug:'vlan',
    title:'VLAN',
    subtitle:'Memisahkan Jaringan Tanpa Kabel Baru',
    accent:'#818cf8',
    draw: (ctx) => {
      const {svg}=ctx;
      // switch in center
      svg(rect(490,260,172,60,'rgba(99,102,241,0.12)','rgba(99,102,241,0.45)',2));
      svg(text_(576,295,'L2 SWITCH','14','rgba(99,102,241,0.9)',{'font-family':'monospace','font-weight':'bold'}));
      // VLAN groups
      const vlans=[
        {id:'VLAN 10',label:'IT Department',color:'rgba(99,102,241,0.6)',x:230,y:140},
        {id:'VLAN 20',label:'Guest WiFi',color:'rgba(244,114,182,0.6)',x:800,y:140},
        {id:'VLAN 30',label:'IP Camera',color:'rgba(52,211,153,0.6)',x:230,y:440},
        {id:'VLAN 40',label:'IoT Devices',color:'rgba(251,191,36,0.6)',x:800,y:440},
      ];
      vlans.forEach(({id,label,color,x,y})=>{
        svg(rect(x-90,y-35,180,70,'rgba(15,23,42,0.6)',color.replace('0.6','0.15'),1));
        svg(mono(x,y-10,id,12,color,{'font-family':'monospace','font-weight':'bold'}));
        svg(mono(x,y+14,label,10,'rgba(148,163,194,0.5)',{'font-family':'monospace'}));
        // connection to switch
        const sx=x<576?490:662, sy=290;
        svg(svgEl('path',{
          d:`M${x},${y+(y<300?-35:35)} Q${x<576?x:sx},${300} ${sx},${sy}`,
          fill:'none',stroke:color.replace('0.6','0.25'),'strokeWidth':1.5,'strokeDasharray':'4,3'
        }));
      });
      // 802.1Q tag visualization
      svg(rect(340,520,472,50,'rgba(99,102,241,0.07)','rgba(99,102,241,0.25)',1));
      svg(mono(360,540,'802.1Q TAG  |  PRI:000  VID:0010  EtherType:0x8100  DMAC:SMAC','11','rgba(99,102,241,0.5)',{'font-family':'monospace'}));
    }
  },
  {
    slug:'web-development-dasar',
    title:'Web Development',
    subtitle:'HTML → CSS → JS → Framework Modern',
    accent:'#d946ef',
    draw: (ctx) => {
      const {svg}=ctx;
      // code brackets framing the scene
      svg(text_(300,180,'<','48','rgba(217,70,239,0.2)',{'font-family':'monospace','font-weight':'bold'}));
      svg(text_(820,180,'/>','48','rgba(217,70,239,0.2)',{'font-family':'monospace','font-weight':'bold'}));
      // tech stack badges
      const stacks=[
        {label:'HTML5',x:300,y:260,c:'rgba(239,68,68,0.7)'},
        {label:'CSS3',x:460,y:260,c:'rgba(59,130,246,0.7)'},
        {label:'JavaScript',x:640,y:260,c:'rgba(251,191,36,0.7)'},
        {label:'React',x:300,y:330,c:'rgba(6,182,212,0.7)'},
        {label:'Next.js',x:480,y:330,c:'rgba(255,255,255,0.7)'},
        {label:'Tailwind',x:660,y:330,c:'rgba(14,165,233,0.7)'},
        {label:'TypeScript',x:340,y:400,c:'rgba(49,130,206,0.7)'},
        {label:'Node.js',x:560,y:400,c:'rgba(34,197,94,0.7)'},
      ];
      stacks.forEach(({label,x,y,c})=>{
        svg(rect(x,y,120,40,'rgba(255,255,255,0.03)',c,1));
        svg(text_(x+60,y+25,label,12,c,{'font-family':'monospace','font-weight':'bold'}));
      });
      // flow arrows
      svg(svgEl('path',{d:'M420,280 L455,280',fill:'none',stroke:'rgba(217,70,239,0.25)',strokeWidth:1.5}));
      svg(svgEl('path',{d:'M580,280 L635,280',fill:'none',stroke:'rgba(217,70,239,0.25)',strokeWidth:1.5}));
      svg(svgEl('path',{d:'M420,350 L470,350',fill:'none',stroke:'rgba(217,70,239,0.25)',strokeWidth:1.5}));
      // pathway note
      svg(mono(200,480,'LEARNING PATH: HTML → CSS → JavaScript → Framework → Deployment','11','rgba(217,70,239,0.3)',{'font-family':'monospace'}));
      svg(mono(200,510,'FRONTEND  •  BACKEND  •  FULLSTACK  •  DEVOPS','10','rgba(217,70,239,0.25)',{'font-family':'monospace'}));
    }
  },
  {
    slug:'wireshark-dasar',
    title:'Wireshark',
    subtitle:'Analisis Packet Traffic Jaringan',
    accent:'#f43f5e',
    draw: (ctx) => {
      const {svg}=ctx;
      // protocol table (like Wireshark main pane)
      const cols=['No.','Time','Source','Destination','Protocol','Length','Info'];
      const rows=[
        ['1','0.000000','192.168.1.10','192.168.1.1','TCP','68','[SYN] Seq=0 Win=64240'],
        ['2','0.000120','192.168.1.1','192.168.1.10','TCP','68','[SYN, ACK] Seq=0 Ack=1'],
        ['3','0.000200','192.168.1.10','192.168.1.1','TCP','52','[ACK] Seq=1 Ack=1'],
        ['4','0.001500','192.168.1.10','93.184.216.34','HTTP','600','GET /index.html HTTP/1.1'],
        ['5','0.012000','93.184.216.34','192.168.1.10','HTTP','1400','Text/html  200 OK'],
        ['6','0.015000','192.168.1.10','8.8.8.8','DNS','72','Standard query A www.example.com'],
      ];
      // header row
      svg(rect(180,140,792,28,'rgba(244,63,94,0.1)'));
      cols.forEach((c,i)=>{
        const cx=195+i*127;
        svg(mono(cx,158,c,10,'rgba(244,63,94,0.6)',{'font-family':'monospace','font-weight':'bold'}));
      });
      // data rows
      rows.forEach((row,i)=>{
        const y=182+i*38;
        svg(rect(180,y,792,34,i%2===0?'rgba(244,63,94,0.02)':'none'));
        row.forEach((cell,j)=>{
          const cx=195+j*127;
          const color=j===4?'rgba(34,211,238,0.6)':j===0?'rgba(244,63,94,0.7)':'rgba(148,163,194,0.5)';
          svg(mono(cx,y+22,cell,9,color,{'font-family':'monospace'}));
        });
      });
      // filter bar
      svg(rect(180,470,792,28,'rgba(0,0,0,0.5)','rgba(244,63,94,0.2)',1));
      svg(mono(200,488,'Display Filter:  tcp.port == 80 && ip.addr == 192.168.1.10','11','rgba(244,63,94,0.5)',{'font-family':'monospace'}));
      // stats bar
      svg(mono(180,530,'6 packets captured  •  3 distinct protocols  •  0 errors','10','rgba(244,63,94,0.25)',{'font-family':'monospace'}));
    }
  },
];

// ─── generate each SVG ──────────────────────────────────────────────────────
articles.forEach(a => {
  let svgContent = '';
  const ctx = { svg: el => { svgContent += el + '\n'; } };

  svgContent += bg(a.accent);
  a.draw(ctx);

  // watermark
  svgContent += mono(64, H-24, 'RIKOARDIANTO.ID', 10, 'rgba(148,163,194,0.18)', {'font-family':'monospace'});
  svgContent += mono(W-64, H-24, '1152×630 • COVER IMAGE', 10, 'rgba(148,163,194,0.18)', {
    'font-family':'monospace', 'text-anchor':'end'
  });

  const outFile = path.join(IMG_DIR, a.slug + '.svg');
  const outStr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '">\n' + svgContent + '</svg>';
  fs.writeFileSync(outFile, outStr, 'utf8');
  console.log('  ✓  public/images/blog/' + a.slug + '.svg  (' + outStr.length + ' bytes)');
});

// ─── update MDX frontmatter cover paths ─────────────────────────────────────
let updated = 0;
fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx')).forEach(fname => {
  const slug = fname.replace(/\.mdx$/, '');
  const art = articles.find(a => a.slug === slug);
  if (!art) return;

  const fp = path.join(BLOG_DIR, fname);
  let raw = fs.readFileSync(fp, 'utf8');
  const oldCover = raw.match(/^cover:\s*"[^"]+"$/m);
  if (!oldCover) return;

  const newCover = `cover: "/images/blog/${art.slug}.svg"`;
  raw = raw.replace(oldCover[0], newCover);
  fs.writeFileSync(fp, raw, 'utf8');
  updated++;
  console.log(`  ~  content/blog/${fname}  →  ${newCover}`);
});

console.log(`\n✅ Done. Generated ${articles.length} unique covers, updated ${updated} MDX files.`);
