import { useEffect, useRef } from 'react';

/**
 * Attaches behavior to the hobbies carousel rendered by HobbiesCarousel.astro:
 * - Carousel thumb active state sync (on slide events and thumbnail click)
 * - Mobile overlay expand/collapse
 * - Scroll reveal animation trigger
 * (Lightbox is handled by LightboxBehavior for all .lightbox-toggle.)
 */
export default function HobbiesBehavior() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const hobbySection = document.getElementById('hobbies');
    const hobbyCarousel = document.getElementById('hobbyCarousel');
    const hobbyThumbs = document.getElementById('hobbyThumbnails');
    if (!hobbySection || !hobbyCarousel || !hobbyThumbs) return;

    // ---------------------------------------------------------------------------
    // 1. Scroll Reveal Observer
    // ---------------------------------------------------------------------------
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        // Forces the element to be at least 150px up inside the viewport before triggering
        rootMargin: '0px 0px -150px 0px',
        threshold: 0.25, // Requires 25% of the element to be visible
      }
    );

    const revealElements = hobbySection.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => revealObserver.observe(el));

    // ---------------------------------------------------------------------------
    // 2. Carousel & Thumbnail Logic
    // ---------------------------------------------------------------------------
    const inner = hobbyCarousel.querySelector('.carousel-inner');
    if (!inner) return;

    const getThumbBtns = (): HTMLButtonElement[] =>
      Array.from(
        hobbyThumbs.querySelectorAll<HTMLButtonElement>(
          'button[data-bs-slide-to]'
        )
      );

    const getActiveIndex = (): number => {
      const active = inner.querySelector('.carousel-item.active');
      if (!active) return 0;
      return Array.from(inner.querySelectorAll('.carousel-item')).indexOf(
        active
      );
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
    observer.observe(inner, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true,
    });

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

    // ---------------------------------------------------------------------------
    // 3. Mobile Overlays
    // ---------------------------------------------------------------------------
    const overlays = hobbySection.querySelectorAll('.hobby-overlay');
    const cleanupOverlays: (() => void)[] = [];

    overlays.forEach((overlay) => {
      const hint = overlay.querySelector('.hobby-overlay-tap-hint');
      const toggleExpanded = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const expanded = overlay.classList.toggle('expanded');
        overlay.setAttribute('aria-expanded', String(expanded));
        if (hint)
          hint.textContent = expanded ? 'Tap to collapse' : 'Tap to expand';
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

    // ---------------------------------------------------------------------------
    // Cleanup
    // ---------------------------------------------------------------------------
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      revealObserver.disconnect();
      observer.disconnect();
      hobbyCarousel.removeEventListener('slide.bs.carousel', onSlide);
      hobbyCarousel.removeEventListener('slid.bs.carousel', onSlide);
      thumbCleanups.forEach((fn) => fn());
      cleanupOverlays.forEach((fn) => fn());
    };
  }, []);

  return null;
}
