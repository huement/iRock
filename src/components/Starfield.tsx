import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BASE_SPEED = 0.5;
const MAX_SPEED = 3.2;
const LINE_THRESHOLD = 0.85;
const STRETCH_FACTOR = 28;
const NUM_STARS = 5000;
const RANGE = 300;

// Generates a soft glowing star sprite in memory (No network fetch delay!)
function createStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(210, 230, 255, 0.8)');
  gradient.addColorStop(0.6, 'rgba(150, 180, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const starLinesRef = useRef<THREE.LineSegments | null>(null);

  const starPositionsRef = useRef<Float32Array>(new Float32Array(NUM_STARS * 3));
  const currentSpeedRef = useRef(BASE_SPEED);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // === 1. Uniform Star Distribution ===
    const starPositions = new Float32Array(NUM_STARS * 3);
    for (let i = 0; i < NUM_STARS; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * RANGE * 2;     // X
      starPositions[i3 + 1] = (Math.random() - 0.5) * RANGE * 2; // Y
      starPositions[i3 + 2] = (Math.random() - 0.5) * RANGE * 2; // Z
    }
    starPositionsRef.current = starPositions;

    // === 2. Points (Star) Setup ===
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starTexture = createStarTexture();

    const stars = new THREE.Points(
      pointGeo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.2,
        map: starTexture,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      })
    );
    // FIX 1: Disable frustum culling so stars never vanish when moving!
    stars.frustumCulled = false;
    scene.add(stars);
    starsRef.current = stars;

    // === 3. Line (Hyperspace Streak) Setup ===
    const linePositions = new Float32Array(NUM_STARS * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const starLines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0xd0e0ff,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      })
    );
    // FIX 2: Disable frustum culling for warp lines
    starLines.frustumCulled = false;
    starLines.visible = false;
    scene.add(starLines);
    starLinesRef.current = starLines;

    let lastTime = performance.now();

    function animate(now: number) {
      // Delta time normalized to 60fps
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth momentum decay
      scrollVelocityRef.current *= 0.91;
      if (scrollVelocityRef.current < 0.001) scrollVelocityRef.current = 0;

      const targetSpeed = Math.min(BASE_SPEED + scrollVelocityRef.current, MAX_SPEED);

      // Smooth framerate-independent speed lerp
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * Math.min(delta * 12, 1);
      const speed = currentSpeedRef.current;

      const positions = starPositionsRef.current;

      // Move stars & re-randomize wrapped stars for infinite density
      for (let i = 0; i < NUM_STARS; i++) {
        const i3 = i * 3;
        positions[i3 + 1] -= speed * 60 * delta;

        // Wrap star back to top when it falls past bottom
        if (positions[i3 + 1] < -RANGE) {
          positions[i3 + 1] = RANGE;
          // Re-randomize X and Z slightly so star field always stays dynamic
          positions[i3] = (Math.random() - 0.5) * RANGE * 2;
          positions[i3 + 2] = (Math.random() - 0.5) * RANGE * 2;
        }
      }

      const isStreaking = speed > LINE_THRESHOLD;

      if (starsRef.current) starsRef.current.visible = !isStreaking;
      if (starLinesRef.current) starLinesRef.current.visible = isStreaking;

      if (isStreaking && starLinesRef.current) {
        const streakLength = Math.min((speed - BASE_SPEED) * STRETCH_FACTOR + 4, 110);
        const linePos = starLinesRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < NUM_STARS; i++) {
          const i3 = i * 3;
          const i6 = i * 6;
          const x = positions[i3];
          const y = positions[i3 + 1];
          const z = positions[i3 + 2];

          linePos[i6] = x;
          linePos[i6 + 1] = y;
          linePos[i6 + 2] = z;
          linePos[i6 + 3] = x;
          linePos[i6 + 4] = y - streakLength;
          linePos[i6 + 5] = z;
        }
        starLinesRef.current.geometry.attributes.position.needsUpdate = true;
      } else if (starsRef.current) {
        const pointGeo = starsRef.current.geometry;
        (pointGeo.attributes.position.array as Float32Array).set(positions);
        pointGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    // === Scroll Handler with Smooth Momentum ===
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);

      if (scrollDelta > 0) {
        scrollVelocityRef.current += scrollDelta * 0.04;
      }

      lastScrollYRef.current = currentScrollY;
    };

    const onResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    lastScrollYRef.current = window.scrollY;

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      starTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="starfield-canvas" ref={canvasRef} aria-hidden="true" />;
}
