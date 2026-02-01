import { useEffect } from 'react';

const MOBILE_BREAKPOINT = 992;

/**
 * On mobile: clicking the caption (card-body) opens the lightbox with the image and full caption.
 * On desktop, only the image is clickable for lightbox; caption is static.
 */
export default function ProjectGridBehavior() {
  useEffect(() => {
    const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
    const grid = document.querySelector('.masonry-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.card');
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const body = card.querySelector('.card-body') as HTMLElement | null;
      const lightboxLink = card.querySelector<HTMLAnchorElement>('.lightbox-toggle');
      if (!body || !lightboxLink) return;

      body.setAttribute('role', 'button');
      body.setAttribute('tabindex', '0');
      body.setAttribute('aria-label', 'View full image and caption');

      const handleClick = (e: Event) => {
        if (!isMobile()) return;
        const target = e.target as HTMLElement;
        if (target.closest('a')) return;
        e.preventDefault();
        e.stopPropagation();
        lightboxLink.click();
      };

      const handleKeydown = (e: KeyboardEvent) => {
        if (!isMobile()) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lightboxLink.click();
        }
      };

      body.addEventListener('click', handleClick);
      body.addEventListener('keydown', handleKeydown as EventListener);
      cleanups.push(() => {
        body.removeEventListener('click', handleClick);
        body.removeEventListener('keydown', handleKeydown as EventListener);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
