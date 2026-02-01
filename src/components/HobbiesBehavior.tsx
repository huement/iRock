import { useEffect, useRef } from 'react';

/**
 * Attaches behavior to the hobbies carousel rendered by HobbiesCarousel.astro:
 * - Carousel thumb active state sync (on slide events and thumbnail click)
 * - Mobile overlay expand/collapse
 * (Lightbox is handled by LightboxBehavior for all .lightbox-toggle.)
 */
export default function HobbiesBehavior() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const hobbySection = document.getElementById('hobbies');
    const hobbyCarousel = document.getElementById('hobbyCarousel');
    const hobbyThumbs = document.getElementById('hobbyThumbnails');
    if (!hobbySection || !hobbyCarousel || !hobbyThumbs) return;

    const inner = hobbyCarousel.querySelector('.carousel-inner');
    if (!inner) return;

    const getThumbBtns = (): HTMLButtonElement[] =>
      Array.from(hobbyThumbs.querySelectorAll<HTMLButtonElement>('button[data-bs-slide-to]'));

    const getActiveIndex = (): number => {
      const active = inner.querySelector('.carousel-item.active');
      if (!active) return 0;
      return Array.from(inner.querySelectorAll('.carousel-item')).indexOf(active);
    };

    const syncThumbActive = (index: number) => {
      const thumbBtns = getThumbBtns();
      thumbBtns.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
        btn.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    };

    const syncFromDom = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        syncThumbActive(getActiveIndex());
      });
    };

    const onSlide = () => {
      hobbyCarousel.querySelectorAll('.hobby-overlay').forEach((el) => {
        el.classList.remove('expanded');
        el.setAttribute('aria-expanded', 'false');
        const hint = el.querySelector('.hobby-overlay-tap-hint');
        if (hint) hint.textContent = 'Tap to expand';
      });
      syncFromDom();
    };

    hobbyCarousel.addEventListener('slide.bs.carousel', onSlide);
    hobbyCarousel.addEventListener('slid.bs.carousel', onSlide);

    const observer = new MutationObserver(() => syncFromDom());
    observer.observe(inner, { attributes: true, attributeFilter: ['class'], subtree: true });

    const thumbCleanups: (() => void)[] = [];
    getThumbBtns().forEach((btn, i) => {
      const onClick = () => {
        syncThumbActive(i);
        setTimeout(syncFromDom, 150);
      };
      btn.addEventListener('click', onClick);
      thumbCleanups.push(() => btn.removeEventListener('click', onClick));
    });

    syncFromDom();

    const overlays = hobbySection.querySelectorAll('.hobby-overlay');
    const cleanupOverlays: (() => void)[] = [];

    overlays.forEach((overlay) => {
      const hint = overlay.querySelector('.hobby-overlay-tap-hint');
      const toggleExpanded = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const expanded = overlay.classList.toggle('expanded');
        overlay.setAttribute('aria-expanded', String(expanded));
        if (hint) hint.textContent = expanded ? 'Tap to collapse' : 'Tap to expand';
      };
      const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') toggleExpanded(e);
      };
      overlay.addEventListener('click', toggleExpanded);
      overlay.addEventListener('keydown', onKeydown as EventListener);
      cleanupOverlays.push(() => {
        overlay.removeEventListener('click', toggleExpanded);
        overlay.removeEventListener('keydown', onKeydown as EventListener);
      });
    });

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      hobbyCarousel.removeEventListener('slide.bs.carousel', onSlide);
      hobbyCarousel.removeEventListener('slid.bs.carousel', onSlide);
      thumbCleanups.forEach((fn) => fn());
      cleanupOverlays.forEach((fn) => fn());
    };
  }, []);

  return null;
}
