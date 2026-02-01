import { useEffect, useRef } from 'react';
import p5 from 'p5';

const FRACTAL_COOLDOWN_MS = 5000;

function correctRotation(deg: number): number {
  if (deg > 360) return deg - 360;
  if (deg < 0) return deg + 360;
  return deg;
}

export default function FractalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const lastPastHalfwayRef = useRef<boolean | null>(null);
  const lastTriggerRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sketch = (p: p5) => {
      let hue: number;
      let bgHue: p5.Vector;
      let circleHue: p5.Vector;
      let initialSize: number;

      function getCircleHue() {
        if (bgHue) {
          circleHue = p.createVector(
            correctRotation(bgHue.x + p.random(100, 120)),
            70,
            80
          );
        }
      }

      function fractal(x: number, y: number, d: number, i: number) {
        if (!circleHue || typeof circleHue.x === 'undefined') return;
        p.fill(
          correctRotation(circleHue.x + p.random(-20, 20)),
          circleHue.y,
          circleHue.z + p.random(-20, 20)
        );
        p.noStroke();
        p.ellipse(x, y, d, d);
        if (d > 4) {
          const mix = 100;
          fractal(x + d + p.random(-2 * mix, mix) / i, y + p.random(-mix, mix) / i, d / i, i);
          fractal(x - d + p.random(-mix, mix) / i, y + p.random(-mix, mix) / i, d / i, i);
        }
      }

      function draw() {
        if (!bgHue || !circleHue) return;
        p.clear();
        p.background(bgHue.x, bgHue.y, bgHue.z);
        const base = initialSize * 0.85;
        fractal(p.width / 2, p.height * 0.22, p.random(base, initialSize), 1.5);
        fractal(p.width / 2, p.height * 0.5, p.random(base, initialSize), 1.5);
        fractal(p.width / 2, p.height * 0.78, p.random(base, initialSize), 1.5);
      }

      p.setup = () => {
        const w = container.offsetWidth || window.innerWidth;
        const h = container.offsetHeight || window.innerHeight;
        p.createCanvas(w, h).parent(container);
        p.colorMode(p.HSB);

        hue = p.random(0, 360);
        bgHue = p.createVector(correctRotation(hue), 50, 10);
        getCircleHue();
        initialSize = Math.max(p.width, p.height) / 3;

        p.noLoop();
        draw();

        const fractalUpdateHandler = () => {
          hue = p.random(0, 360);
          bgHue = p.createVector(correctRotation(hue), 50, 10);
          getCircleHue();
          p.redraw();
        };
        window.addEventListener('fractalUpdateColors', fractalUpdateHandler);
        (window as unknown as { __fractalRemoveUpdateListener?: () => void }).__fractalRemoveUpdateListener = () =>
          window.removeEventListener('fractalUpdateColors', fractalUpdateHandler);
      };

      p.draw = draw;

      p.mousePressed = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          hue = p.random(0, 360);
          bgHue = p.createVector(correctRotation(hue), 50, 10);
          getCircleHue();
          p.redraw();
        }
      };

    };

    const p5Instance = new p5(sketch, container);
    p5InstanceRef.current = p5Instance;

    const checkFractalScrollTrigger = () => {
      const workSection = document.getElementById('work');
      if (!workSection) return;
      const rect = workSection.getBoundingClientRect();
      const sectionMidpoint = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const pastHalfway = sectionMidpoint <= viewportCenter;
      if (
        lastPastHalfwayRef.current !== null &&
        pastHalfway !== lastPastHalfwayRef.current
      ) {
        if (Date.now() - lastTriggerRef.current >= FRACTAL_COOLDOWN_MS) {
          window.dispatchEvent(new CustomEvent('fractalUpdateColors'));
          lastTriggerRef.current = Date.now();
        }
      }
      lastPastHalfwayRef.current = pastHalfway;
    };

    const onScroll = () => checkFractalScrollTrigger();
    const onResize = () => {
      if (!containerRef.current || !p5InstanceRef.current) return;
      const w = containerRef.current.offsetWidth || window.innerWidth;
      const h = containerRef.current.offsetHeight || window.innerHeight;
      p5InstanceRef.current.resizeCanvas(w, h);
      p5InstanceRef.current.redraw();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    checkFractalScrollTrigger();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      (window as unknown as { __fractalRemoveUpdateListener?: () => void }).__fractalRemoveUpdateListener?.();
      p5Instance.remove();
      p5InstanceRef.current = null;
    };
  }, []);

  return <div id="fractalCanvas" ref={containerRef} />;
}
