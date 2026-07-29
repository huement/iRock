import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import { timeline } from '../data/portfolio';
import NoiseBackground from './NoiseBackground';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      Prism.highlightAllUnder(containerRef.current);
    }
  }, [timeline]);

  useEffect(() => {
    const timelineContainer = document.querySelector('.timeline-container');
    timelineContainerRef.current = timelineContainer as HTMLDivElement;
    if (!timelineContainer) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaX === 0) return;
      const maxScroll = timelineContainer.scrollWidth - timelineContainer.clientWidth;
      const threshold = Math.max(1, maxScroll * 0.01);
      const atLeftEdge = timelineContainer.scrollLeft <= threshold;
      if (e.deltaX < 0 && atLeftEdge) e.preventDefault();
    };

    timelineContainer.addEventListener('wheel', onWheel, { passive: false });
    return () => timelineContainer.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section
      id="timeline"
      className="content-block wave-block-top"
      style={{ position: 'relative', overflow: 'hidden' }} /* Ensures background stays contained */
    >
      {/* 1. noise canvas */}
      <NoiseBackground />

      {/* 2. content layered above the background using relative z-index */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="card-box">
          <h2 className="display-4 mb-2 cool-title">
            <i className="bx bxs-circle me-2"></i>Professional Timeline
          </h2>
          <p className="text-muted mb-5 lead fw-bold">My employment and education history displayed as psuedo-code logic. Each item uses the dominate language used at that time, clever right?</p>
        </div>
      </div>

      <div
        className="timeline-container"
        ref={containerRef}
        suppressHydrationWarning
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="timeline-wrapper">
          {timeline.map((item) => (
            <div key={item.filename} className="code-card">
              <div className="code-header">
                <div className="dot dot-r"></div>
                <div className="dot dot-y"></div>
                <div className="dot dot-g"></div>
                <span className="text-secondary ms-2 small">{item.filename}</span>
              </div>
              <pre suppressHydrationWarning>
                <code className={`language-${item.language}`}>{item.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
