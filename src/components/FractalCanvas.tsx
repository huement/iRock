import { useEffect, useRef } from "react";
import p5 from "p5";

function correctRotation(deg: number): number {
  if (deg > 360) return deg % 360;
  if (deg < 0) return (deg % 360) + 360;
  return deg;
}

export default function FractalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const lastStepRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sketch = (p: p5) => {
      let bgHue: p5.Vector;
      let circleHue: p5.Vector;

      function updateColorVectors(h: number) {
        const normHue = correctRotation(h);
        bgHue = p.createVector(normHue, 50, 10);
        circleHue = p.createVector(correctRotation(normHue + 110), 75, 85);
      }

      function fractal(x: number, y: number, d: number, i: number) {
        if (!circleHue || typeof circleHue.x === "undefined") return;

        p.fill(
          correctRotation(circleHue.x + p.random(-25, 25)),
          circleHue.y + p.random(-15, 15),
          circleHue.z + p.random(-15, 15),
        );
        p.noStroke();
        p.ellipse(x, y, d, d);

        // Increased cutoff threshold from d > 3 to d > 14 to draw ~80% fewer circles
        if (d > 14) {
          const mix = 100;
          const xSpread = p.random(-1.3 * mix, 1.3 * mix) / i;
          const ySpread = p.random(-1.3 * mix, 1.3 * mix) / i;

          fractal(x + d * 0.6 + xSpread, y + ySpread, d / i, i);
          fractal(x - d * 0.6 + xSpread, y + ySpread, d / i, i);
        }
      }

      function drawCanvas() {
        if (!bgHue || !circleHue) return;
        p.clear();
        p.background(bgHue.x, bgHue.y, bgHue.z);

        const baseSize = Math.max(p.width, p.height) * 0.32;

        // 3 Staggered origin points for cleaner distribution
        const origins = [
          { x: p.width * 0.22, y: p.height * 0.28 },
          { x: p.width * 0.78, y: p.height * 0.5 },
          { x: p.width * 0.25, y: p.height * 0.78 },
        ];

        origins.forEach((point) => {
          const size = p.random(baseSize * 0.85, baseSize * 1.1);
          fractal(point.x, point.y, size, 1.55); // Slightly faster decay factor (1.55)
        });
      }

      p.setup = () => {
        const w = container.offsetWidth || window.innerWidth;
        const h = container.offsetHeight || window.innerHeight;
        p.createCanvas(w, h).parent(container);
        p.colorMode(p.HSB);
        p.noLoop(); // Keep rendering off to preserve CPU/GPU

        updateColorVectors(0);
        drawCanvas();

        const fractalUpdateHandler = (e: Event) => {
          const customEv = e as CustomEvent<{ targetHue?: number }>;
          const newHue = customEv.detail?.targetHue ?? p.random(0, 360);
          updateColorVectors(newHue);
          p.redraw();
        };

        window.addEventListener("fractalUpdateColors", fractalUpdateHandler);
        (
          window as unknown as { __fractalRemoveUpdateListener?: () => void }
        ).__fractalRemoveUpdateListener = () =>
          window.removeEventListener(
            "fractalUpdateColors",
            fractalUpdateHandler,
          );
      };

      p.draw = drawCanvas;

      p.mousePressed = () => {
        if (
          p.mouseX > 0 &&
          p.mouseX < p.width &&
          p.mouseY > 0 &&
          p.mouseY < p.height
        ) {
          updateColorVectors(p.random(0, 360));
          p.redraw();
        }
      };
    };

    const p5Instance = new p5(sketch, container);
    p5InstanceRef.current = p5Instance;

    const checkFractalScrollTrigger = () => {
      const workSection = document.getElementById("work");
      if (!workSection) return;

      const rect = workSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > windowHeight) return;

      const totalRange = rect.height + windowHeight;
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / totalRange),
      );

      // Reduced to 4 trigger steps across the scroll distance for less frequent updates
      const STEPS = 4;
      const currentStep = Math.floor(progress * STEPS);

      if (lastStepRef.current !== currentStep) {
        lastStepRef.current = currentStep;
        const targetHue = (currentStep / STEPS) * 360;

        window.dispatchEvent(
          new CustomEvent("fractalUpdateColors", { detail: { targetHue } }),
        );
      }
    };

    const onScroll = () => checkFractalScrollTrigger();
    const onResize = () => {
      if (!containerRef.current || !p5InstanceRef.current) return;
      const w = containerRef.current.offsetWidth || window.innerWidth;
      const h = containerRef.current.offsetHeight || window.innerHeight;
      p5InstanceRef.current.resizeCanvas(w, h);
      p5InstanceRef.current.redraw();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    checkFractalScrollTrigger();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      (
        window as unknown as { __fractalRemoveUpdateListener?: () => void }
      ).__fractalRemoveUpdateListener?.();
      p5Instance.remove();
      p5InstanceRef.current = null;
    };
  }, []);

  return <div id="fractalCanvas" ref={containerRef} />;
}
