import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating'; // required by prism-php
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import { timeline } from '../data/portfolio';

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
    <section id="timeline" className="content-block wave-block-top">
      <div className="container">
        <h2 className="display-4 mb-2 cool-title">
          <i className="bx bxs-circle me-2"></i>Professional Timeline
        </h2>
        <p className="text-muted mb-5">Employment history parsed as valid logic.</p>
      </div>

      <div className="timeline-container" ref={containerRef} suppressHydrationWarning>
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
