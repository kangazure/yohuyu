'use client';

import { useEffect } from 'react';

/**
 * Menuangkan HTML statis hasil markdown, lalu menambahkan tombol
 * copY pada tiap blok kode (mutasi DOM yang React tidak kelola —
 * aman karena konten dirender via dangerouslySetInnerHTML).
 */
export function CodeEnhancer({ html }: { html: string }) {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>('[data-post-content] pre');
    blocks.forEach((pre) => {
      // skip yang sudah di-enhance
      if (pre.dataset.enhanced === 'true') return;
      pre.dataset.enhanced = 'true';
      pre.classList.add('relative');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'code-copy-btn absolute right-3 top-3 z-10 rounded-md border border-line bg-void/80 px-2 py-1 font-mono text-[10px] tracking-widest text-faint backdrop-blur transition-colors hover:border-neon/60 hover:text-neon';
      btn.textContent = 'COPY';

      const code = pre.querySelector('code');
      btn.addEventListener('click', async () => {
        const raw = code?.textContent ?? '';
        try {
          await navigator.clipboard.writeText(raw);
          btn.textContent = 'COPIED ✓';
          btn.classList.add('text-neon');
        } catch {
          btn.textContent = 'FAILED';
        }
        setTimeout(() => {
          btn.textContent = 'COPY';
          btn.classList.remove('text-neon');
        }, 1800);
      });

      pre.appendChild(btn);
    });
    return () => {
      blocks.forEach((pre) => {
        const btn = pre.querySelector('.code-copy-btn');
        if (btn) btn.remove();
        delete pre.dataset.enhanced;
      });
    };
  }, [html]);

  return (
    <div
      data-post-content
      className="post-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
