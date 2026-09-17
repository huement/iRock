export interface HudFrameOptions {
  w?: number;
  h?: number;
  seed?: number;
  pad?: number;
  strokeOuter?: string;
  strokeInner?: string;
  strokeOuterW?: number;
  strokeInnerW?: number;
  panelFill?: string;
  texDotFill?: string;
  accentFill?: string;
  accentStroke?: string;
  accentStrokeW?: number;
  glow?: boolean;
  featureFillInsetMin?: number;
  featureFillInsetMax?: number;
  triangleGapMin?: number;
  triangleGapMax?: number;
}

export function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function rng() {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function rInt(rng: () => number, a: number, b: number) {
  return Math.floor(a + rng() * (b - a + 1));
}

function rFloat(rng: () => number, a: number, b: number) {
  return a + rng() * (b - a);
}

function rPick<T>(rng: () => number, arr: T[]): T {
  return arr[rInt(rng, 0, arr.length - 1)];
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function fmt(n: number) {
  return Number(n.toFixed(2)).toString();
}

function buildTrapezoidFeature({
  edge,
  start,
  end,
  depth,
  mode,
  nestedFill,
  nestedInset,
}: {
  edge: string;
  start: number;
  end: number;
  depth: number;
  mode: 'inset' | 'outset';
  nestedFill: boolean;
  nestedInset: number;
}) {
  const isInset = mode === 'inset';
  const d = Math.max(0.1, depth);
  let p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number },
    p4: { x: number; y: number };

  if (edge === 'top') {
    const y0 = 0,
      y1 = isInset ? d : -d;
    p1 = { x: start, y: y0 };
    p2 = { x: end, y: y0 };
    p3 = { x: end - d, y: y1 };
    p4 = { x: start + d, y: y1 };
  } else if (edge === 'bottom') {
    const y0 = 0,
      y1 = isInset ? -d : d;
    p1 = { x: start, y: y0 };
    p2 = { x: end, y: y0 };
    p3 = { x: end - d, y: y1 };
    p4 = { x: start + d, y: y1 };
  } else if (edge === 'left') {
    const x0 = 0,
      x1 = isInset ? d : -d;
    p1 = { x: x0, y: start };
    p2 = { x: x0, y: end };
    p3 = { x: x1, y: end - d };
    p4 = { x: x1, y: start + d };
  } else {
    const x0 = 0,
      x1 = isInset ? -d : d;
    p1 = { x: x0, y: start };
    p2 = { x: x0, y: end };
    p3 = { x: x1, y: end - d };
    p4 = { x: x1, y: start + d };
  }

  const pathSegs = [p1, p4, p3, p2];
  let fillD: string | null = null;

  if (nestedFill && mode === 'inset') {
    const poly = [p1, p4, p3, p2];
    const gap = isInset ? nestedInset : 0;
    const outerGap = isInset ? gap + gap / 2 : 0;
    const innerGap = isInset ? gap - gap / 2 : 0;

    if (edge === 'bottom') {
      fillD = `M ${fmt(poly[0].x + outerGap)} ${fmt(poly[0].y)} L ${fmt(poly[1].x + innerGap)} ${fmt(poly[1].y + gap)} L ${fmt(poly[2].x - innerGap)} ${fmt(poly[2].y + gap)} L ${fmt(poly[3].x - outerGap)} ${fmt(poly[3].y)} Z`;
    } else if (edge === 'top') {
      fillD = `M ${fmt(poly[0].x + outerGap)} ${fmt(poly[0].y)} L ${fmt(poly[1].x + innerGap)} ${fmt(poly[1].y - gap)} L ${fmt(poly[2].x - innerGap)} ${fmt(poly[2].y - gap)} L ${fmt(poly[3].x - outerGap)} ${fmt(poly[3].y)} Z`;
    } else if (edge === 'right') {
      fillD = `M ${fmt(poly[0].x)} ${fmt(poly[0].y + outerGap)} L ${fmt(poly[1].x + gap)} ${fmt(poly[1].y + innerGap)} L ${fmt(poly[2].x + gap)} ${fmt(poly[2].y - innerGap)} L ${fmt(poly[3].x)} ${fmt(poly[3].y - outerGap)} Z`;
    } else {
      fillD = `M ${fmt(poly[0].x)} ${fmt(poly[0].y + outerGap)} L ${fmt(poly[1].x - gap)} ${fmt(poly[1].y + innerGap)} L ${fmt(poly[2].x - gap)} ${fmt(poly[2].y - innerGap)} L ${fmt(poly[3].x)} ${fmt(poly[3].y - outerGap)} Z`;
    }
  }

  return { pathSegs, fillD };
}

function buildInnerCornerTriangle(corner: string, size: number) {
  const s = Math.max(6, size);
  if (corner === 'tl') return `M 0 ${fmt(s)} L 0 0 L ${fmt(s)} 0 Z`;
  if (corner === 'tr') return `M 0 0 L ${fmt(-s)} 0 L 0 ${fmt(s)} Z`;
  if (corner === 'br') return `M 0 0 L 0 ${fmt(-s)} L ${fmt(-s)} 0 Z`;
  return `M 0 0 L ${fmt(s)} 0 L 0 ${fmt(-s)} Z`;
}

function buildOuterCornerTriangle(corner: string, size: number, gap: number) {
  const s = Math.max(10, size);
  const ng = -1 * gap;
  if (corner === 'tl')
    return `M ${fmt(-s)} ${ng} L ${ng} ${fmt(-s)} L ${fmt(-s)} ${fmt(-s)} Z`;
  if (corner === 'tr')
    return `M ${fmt(s)} ${ng} L ${gap} ${fmt(-s)} L ${fmt(s)} ${fmt(-s)} Z`;
  if (corner === 'br')
    return `M ${fmt(s)} ${gap} L ${gap} ${fmt(s)} L ${fmt(s)} ${fmt(s)} Z`;
  return `M ${fmt(-s)} ${gap} L ${ng} ${fmt(s)} L ${fmt(-s)} ${fmt(s)} Z`;
}

export function generateHudFrameSVG(options: HudFrameOptions = {}) {
  const {
    w = 800,
    h = 450,
    seed = options.seed ?? 133769,
    pad = 22,
    strokeOuter = 'rgba(0, 240, 255, 0.95)',
    strokeInner = 'rgba(0, 240, 255, 0.35)',
    strokeOuterW = 1.5,
    strokeInnerW = 3,
    panelFill = 'rgba(10, 14, 23, 0.82)',
    texDotFill = 'rgba(0, 240, 255, 0.15)',
    accentFill = 'rgba(0, 240, 255, 0.45)',
    accentStroke = 'rgba(0, 240, 255, 0.85)',
    accentStrokeW = 1,
    glow = true,
    featureFillInsetMin = 4,
    featureFillInsetMax = 4,
    triangleGapMin = 4,
    triangleGapMax = 4,
  } = options;

  // console.log(seed);
  const rng = mulberry32(seed);
  const maxChamfer = Math.floor(Math.min(w, h) * 0.4);

  const genChamfer = () => {
    if (rng() < 0.2) return 0;
    return rng() < 0.3
      ? rInt(rng, Math.floor(maxChamfer * 0.3), Math.floor(maxChamfer * 0.5))
      : rInt(rng, 16, Math.floor(maxChamfer * 0.3));
  };

  const corners = {
    tl: genChamfer(),
    tr: genChamfer(),
    br: genChamfer(),
    bl: genChamfer(),
  };
  const featureCount = rPick(rng, [1, 2, 2]);
  const edgesPool = ['top', 'bottom', 'top', 'bottom', 'left', 'right'];
  const features: any[] = [];
  const featureByEdge = new Map();

  const edgeLength = (e: string) => (e === 'top' || e === 'bottom' ? w : h);
  const edgeMargins = (e: string) => {
    if (e === 'top') return [corners.tl, corners.tr];
    if (e === 'bottom') return [corners.bl, corners.br];
    if (e === 'left') return [corners.tl, corners.bl];
    return [corners.tr, corners.br];
  };

  for (let i = 0; i < featureCount; i++) {
    const edge = rPick(rng, edgesPool);
    if (featureByEdge.has(edge)) continue;

    const mode = rng() < 0.5 ? 'inset' : 'outset';
    const L = edgeLength(edge);
    const [mA, mB] = edgeMargins(edge);
    const minStart = (mA || 0) + 16;
    const maxEnd = L - (mB || 0) - 16;
    const maxLen = Math.max(40, (maxEnd - minStart) * 0.75);
    const minLen = Math.max(48, Math.min(140, maxLen * 0.3));
    let segLen = rInt(rng, Math.floor(minLen), Math.floor(maxLen));

    const center = rFloat(rng, minStart + segLen / 2, maxEnd - segLen / 2);
    const start = center - segLen / 2;
    const end = start + segLen;
    const depth = rInt(rng, 8, 18);
    const nestedFill = rng() < 0.65;
    const nestedInset = rFloat(rng, featureFillInsetMin, featureFillInsetMax);

    const { pathSegs, fillD } = buildTrapezoidFeature({
      edge,
      start,
      end,
      depth,
      mode,
      nestedFill,
      nestedInset,
    });
    const f = {
      edge,
      mode,
      start,
      end,
      depth,
      nestedFill,
      nestedInset,
      pathSegs,
      fillD,
    };
    features.push(f);
    featureByEdge.set(edge, f);
  }

  const buildTop = () => {
    const f = featureByEdge.get('top');
    const xL = corners.tl,
      xR = w - corners.tr;
    if (!f)
      return [
        { x: xL, y: 0 },
        { x: xR, y: 0 },
      ];
    const s = clamp(f.start, xL + 4, xR - 4),
      e = clamp(f.end, s + 20, xR - 4);
    const seg = f.pathSegs.map((p: any) => ({ x: p.x, y: p.y }));
    return [
      { x: xL, y: 0 },
      { x: s, y: 0 },
      seg[1],
      seg[2],
      { x: e, y: 0 },
      { x: xR, y: 0 },
    ];
  };

  const buildRight = () => {
    const f = featureByEdge.get('right');
    const yT = corners.tr,
      yB = h - corners.br,
      x = w;
    if (!f)
      return [
        { x, y: yT },
        { x, y: yB },
      ];
    const s = clamp(f.start, yT + 4, yB - 4),
      e = clamp(f.end, s + 20, yB - 4);
    const seg = f.pathSegs.map((p: any) => ({ x: x + p.x, y: p.y }));
    return [
      { x, y: yT },
      { x, y: s },
      seg[1],
      seg[2],
      { x, y: e },
      { x, y: yB },
    ];
  };

  const buildBottom = () => {
    const f = featureByEdge.get('bottom');
    const xL = corners.bl,
      xR = w - corners.br,
      y = h;
    if (!f)
      return [
        { x: xR, y },
        { x: xL, y },
      ];
    const s = clamp(f.start, xL + 4, xR - 4),
      e = clamp(f.end, s + 20, xR - 4);
    const seg = f.pathSegs.map((p: any) => ({ x: p.x, y: y + p.y }));
    return [
      { x: xR, y },
      { x: e, y },
      seg[2],
      seg[1],
      { x: s, y },
      { x: xL, y },
    ];
  };

  const buildLeft = () => {
    const f = featureByEdge.get('left');
    const yT = corners.tl,
      yB = h - corners.bl,
      x = 0;
    if (!f)
      return [
        { x, y: yB },
        { x, y: yT },
      ];
    const s = clamp(f.start, yT + 4, yB - 4),
      e = clamp(f.end, s + 20, yB - 4);
    const seg = f.pathSegs.map((p: any) => ({ x: x + p.x, y: p.y }));
    return [
      { x, y: yB },
      { x, y: e },
      seg[2],
      seg[1],
      { x, y: s },
      { x, y: yT },
    ];
  };

  const topPts = buildTop(),
    rightPts = buildRight(),
    bottomPts = buildBottom(),
    leftPts = buildLeft();
  const outlinePts = [...topPts];
  if (corners.tr > 0) outlinePts.push({ x: w, y: corners.tr });
  for (let i = 1; i < rightPts.length; i++) outlinePts.push(rightPts[i]);
  if (corners.br > 0) outlinePts.push({ x: w - corners.br, y: h });
  for (let i = 1; i < bottomPts.length; i++) outlinePts.push(bottomPts[i]);
  if (corners.bl > 0) outlinePts.push({ x: 0, y: h - corners.bl });
  for (let i = 1; i < leftPts.length; i++) outlinePts.push(leftPts[i]);

  let outlineD =
    outlinePts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${fmt(p.x)} ${fmt(p.y)}`)
      .join(' ') + ' Z';

  const triangles: any[] = [];
  const maybeTriangle = (ck: string) => {
    const chamfer = corners[ck as keyof typeof corners];
    const gap = rInt(rng, triangleGapMin, triangleGapMax);
    if (chamfer === 0) {
      if (rng() < 0.6) {
        const d = buildInnerCornerTriangle(ck, rInt(rng, 12, 20));
        let tx = ck.includes('r') ? w - gap : gap;
        let ty = ck.includes('b') ? h - gap : gap;
        triangles.push({
          d,
          withFill: rng() < 0.7,
          transform: `translate(${fmt(tx)} ${fmt(ty)})`,
        });
      }
    } else if (rng() < 0.5) {
      const d = buildOuterCornerTriangle(ck, chamfer, gap + strokeOuterW);
      let tx = ck === 'tl' || ck === 'bl' ? chamfer : w - chamfer;
      let ty = ck === 'tl' || ck === 'tr' ? chamfer : h - chamfer;
      triangles.push({
        d,
        withFill: rng() < 0.5,
        transform: `translate(${fmt(tx)} ${fmt(ty)})`,
      });
    }
  };

  ['tl', 'tr', 'br', 'bl'].forEach(maybeTriangle);

  const trapFillsMarkup = features
    .filter((f) => f.fillD)
    .map((f) => {
      let t = '';
      if (f.edge === 'bottom') t = `translate(0 ${fmt(h)})`;
      if (f.edge === 'right') t = `translate(${fmt(w)} 0)`;
      return `<path d="${f.fillD}" ${t ? `transform="${t}"` : ''} fill="${accentFill}" stroke="${accentStroke}" stroke-width="${accentStrokeW}" vector-effect="non-scaling-stroke" opacity="0.9" />`;
    })
    .join('');

  const triMarkup = triangles
    .map(
      (t) =>
        `<path d="${t.d}" transform="${t.transform}" fill="${t.withFill ? strokeOuter : 'transparent'}" stroke="${strokeOuter}" stroke-width="${strokeOuterW}" vector-effect="non-scaling-stroke" />`
    )
    .join('');

  const dotsId = `dots_${seed}`;
  const glowId = `glow_${seed}`;
  const vbX = -pad,
    vbY = -pad,
    vbW = w + pad * 2,
    vbH = h + pad * 2;

  const svgMarkup = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" preserveAspectRatio="none" class="w-full h-full pointer-events-none absolute inset-0 overflow-visible">
  <defs>
    <pattern id="${dotsId}" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="${texDotFill}" />
    </pattern>
    ${glow ? `<filter id="${glowId}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="rgba(0,240,255,0.6)" flood-opacity="0.8" /></filter>` : ''}
  </defs>
  <g>
    <path d="${outlineD}" fill="${panelFill}" stroke="none" />
    <path d="${outlineD}" fill="url(#${dotsId})" opacity="0.75" />
    ${trapFillsMarkup}
    <path d="${outlineD}" fill="none" stroke="${strokeOuter}" stroke-width="${strokeOuterW}" vector-effect="non-scaling-stroke" ${glow ? `filter="url(#${glowId})"` : ''} />
    <path d="${outlineD}" fill="none" stroke="${strokeInner}" stroke-width="${strokeInnerW}" vector-effect="non-scaling-stroke" />
    ${triMarkup}
  </g>
</svg>`.trim();

  return { svgMarkup, outlineD };
}
