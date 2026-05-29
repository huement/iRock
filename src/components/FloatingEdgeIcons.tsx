import { useEffect, useRef, useCallback } from 'react';
import { floatingIcons } from '../data/floatingIcons';

export default function FloatingEdgeIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    isScrollingRef.current = true;
    container.classList.add('is-scrolling');

    // Clear previous timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // After scrolling stops, return to idle state
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      container.classList.remove('is-scrolling');
    }, 180); // Adjust feel here
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const contactSection = document.getElementById('contact');
      const container = containerRef.current;
      if (!contactSection || !container) return;

      const top = contactSection.getBoundingClientRect().top + window.scrollY;
      container.style.setProperty('--floating-icons-height', `${top}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleScroll]);

  return (
    <div
      className="floating-edge-icons"
      id="floatingEdgeIcons"
      aria-hidden="true"
      ref={containerRef}
    >
      {floatingIcons.map((icon, i) => (
        <i
          key={i}
          className={`bx ${icon.icon} floating-icon`}
          style={{
            ['--x' as string]: icon.x,
            ['--y' as string]: icon.y,
            ['--drift' as string]: icon.drift,
            ['--dur' as string]: icon.dur,
            ['--delay' as string]: icon.delay,
            ['--size' as string]: icon.size,
          }}
        />
      ))}
    </div>
  );
}