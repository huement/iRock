interface WaveBubbleOptions {
  count?: number;
  minRadius?: number;
  maxRadius?: number;
}

export function attachWaveBubbles(
  selector = 'cosmic-wave',
  options: WaveBubbleOptions = {}
) {
  // 1. Larger radii range by default (18px - 45px)
  const { count = 10, minRadius = 18, maxRadius = 45 } = options;
  const waves = document.querySelectorAll<HTMLElement>(selector);

  waves.forEach((wave) => {
    if (wave.dataset.circles !== 'true') return;

    const circleFill = wave.dataset.circlefill ?? 'fill-wave';

    const svg =
      wave.querySelector('svg') || wave.shadowRoot?.querySelector('svg');
    if (!svg || svg.querySelector('.wave-bubbles-group')) return;

    const isFacingBottom = wave.getAttribute('data-wave-face') === 'bottom';

    const viewBox = svg.getAttribute('viewBox')?.split(' ').map(Number) || [
      0, 0, 1200, 120,
    ];
    const [, , vbW, vbH] = viewBox;

    const bubblesGroup = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    bubblesGroup.classList.add('wave-bubbles-group');

    const segmentWidth = vbW / count;

    for (let i = 0; i < count; i++) {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );

      const r =
        Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius;

      // 2. Wider horizontal variance so bubbles overlap into adjacent segments
      const cx =
        segmentWidth * i +
        (Math.random() * segmentWidth * 1.5 - segmentWidth * 0.25);

      // 3. Y-positioning: Spans across the wave edge (partially in, partially out)
      let cy: number;
      if (isFacingBottom) {
        // Wave crest faces down: extends from inside the lower wave area to below the SVG edge
        cy = vbH * 0.15 + Math.random() * (vbH * 0.15);
      } else {
        // Wave crest faces up: extends from above the SVG frame down into the top wave edge
        cy = Math.random() * (vbH * 0.5) - r * 0.4;
      }

      circle.setAttribute('cx', cx.toFixed(1));
      circle.setAttribute('cy', cy.toFixed(1));
      circle.setAttribute('r', r.toString());

      // Retained original matching fill class
      circle.classList.add('wave-bubble', circleFill);

      // Random float animation parameters
      const floatDelay = (Math.random() * 3).toFixed(2);
      const floatDuration = (Math.random() * 2 + 3).toFixed(2);
      circle.style.setProperty('--float-delay', `${floatDelay}s`);
      circle.style.setProperty('--float-dur', `${floatDuration}s`);

      bubblesGroup.appendChild(circle);
    }

    svg.appendChild(bubblesGroup);
  });
}
