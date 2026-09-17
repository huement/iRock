import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-typescript';
import { timeline } from '../data/portfolio';
import NoiseBackground from './NoiseBackground';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Converts vertical scroll wheel events into horizontal track movement
  useEffect(() => {
    if (containerRef.current) {
      Prism.highlightAllUnder(containerRef.current);
    }

    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        const isScrollingDown = e.deltaY > 0;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;

        // 1px threshold accounts for subpixel rendering variations
        const isAtEnd = el.scrollLeft >= maxScrollLeft - 1;
        const isAtStart = el.scrollLeft <= 0;

        // Prevent default vertical scroll only if horizontal distance remains
        if ((isScrollingDown && !isAtEnd) || (!isScrollingDown && !isAtStart)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section
      id="timeline"
      className="relative z-10 bg-slate-950/80 pt-16 pb-24 sm:pt-20 sm:pb-[150px] overflow-hidden"
    >
      {/* Background Noise Layer */}
      <NoiseBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Giant Bleed Typography Header */}
        <div className="relative flex flex-col items-center justify-center text-center mt-24 sm:mt-[150px]">
          <div className="giant-bleed-text" aria-hidden="true">
            <span>MY</span>
            <span className="stroke-text">HISTORY</span>
          </div>

          {/* Floating HUD Detail Box */}
          <div className="relative -mt-16 sm:-mt-20 md:-mt-28 max-w-2xl w-full bg-slate-900/90 backdrop-blur-xl border border-cyan-500/40 rounded-xl p-4 sm:p-6 shadow-[0_0_30px_rgba(0,240,255,0.15)] text-left font-mono z-4">
            <div className="flex items-center gap-2 mb-2 text-xs tracking-widest uppercase text-cyan-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_#ff0055]"></span>
              <span>// SYSTEM_LOG :: CAREER_TIMELINE</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-cyan-300 font-bold uppercase">
                Employment
              </strong>{' '}
              and{' '}
              <strong className="text-cyan-300 font-bold uppercase">
                education
              </strong>{' '}
              history expressed as pseudo-code using the primary stack from each
              era.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroller Track */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto pb-8 pt-4 px-2 sm:px-8 cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-slate-950 relative z-10"
      >
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 min-w-max mx-auto px-4"
        >
          {timeline.map((item) => (
            <div
              key={item.filename}
              className="w-[300px] sm:w-[420px] md:w-[480px] bg-slate-900/95 border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] flex flex-col"
            >
              {/* Code Card Window Header */}
              <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 bg-slate-950/90 border-b border-slate-800 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm inline-block"></span>
                </div>
                <span className="text-cyan-400/80 font-semibold">
                  {item.filename}
                </span>
              </div>

              {/* Prism Syntax Highlighted Code */}
              <div className="p-3 sm:p-4 overflow-x-auto bg-slate-950/50 flex-grow font-mono text-xs sm:text-sm">
                <pre
                  className="!bg-transparent !m-0 !p-0"
                  suppressHydrationWarning
                >
                  <code className={`language-${item.language}`}>
                    {item.code}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
