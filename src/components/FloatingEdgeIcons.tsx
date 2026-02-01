import { useEffect, useRef } from 'react';
import { floatingIcons } from '../data/floatingIcons';

export default function FloatingEdgeIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      const aboutSection = document.getElementById('contact');
      const container = containerRef.current;
      if (!aboutSection || !container) return;
      const top = aboutSection.getBoundingClientRect().top + window.scrollY;
      container.style.setProperty('--floating-icons-height', `${top}px`);
      requestAnimationFrame(() => container.classList.remove('floating-edge-icons-hidden'));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div
      className="floating-edge-icons floating-edge-icons-hidden"
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
