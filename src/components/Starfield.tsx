import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BASE_SPEED = 0.6;
const MAX_SPEED = 1.8;
const LINE_THRESHOLD = 0.85;
const STRETCH_FACTOR = 18;
const NUM_STARS = 6000;
const RANGE = 300;

const MIN_HYPERSPACE_TIME = 3000; // 3 seconds minimum

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
  const targetSpeedRef = useRef(BASE_SPEED);

  const hyperspaceEndTimeRef = useRef(0); // timestamp when we must turn off hyperspace
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
    rendererRef.current = renderer;

    // === Stars Setup ===
    const starPositions = new Float32Array(NUM_STARS * 3);
    for (let i = 0; i < NUM_STARS * 3; i++) {
      starPositions[i] = Math.random() * (RANGE * 2) - RANGE;
    }
    starPositionsRef.current = starPositions;

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(starPositions.slice(), 3));

    const sprite = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png'
    );

    const stars = new THREE.Points(
      pointGeo,
      new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.8,
        map: sprite,
        transparent: true,
        depthTest: false,
      })
    );
    scene.add(stars);
    starsRef.current = stars;

    // === Lines Setup ===
    const linePositions = new Float32Array(NUM_STARS * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const starLines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.85,
      })
    );
    starLines.visible = false;
    scene.add(starLines);
    starLinesRef.current = starLines;

    let lastTime = Date.now();

    function animate() {
      const now = Date.now();
      const delta = (now - lastTime) / 16; // normalize roughly to 60fps
      lastTime = now;

      const currentSpeed = currentSpeedRef.current;
      let targetSpeed = targetSpeedRef.current;

      // Smooth speed interpolation
      currentSpeedRef.current += (targetSpeed - currentSpeed) * 0.12;

      // Natural decay
      targetSpeedRef.current += (BASE_SPEED - targetSpeed) * 0.04;

      const speed = currentSpeedRef.current;

      // === Hyperspace Timer Logic ===
      const isInHyperspace = now < hyperspaceEndTimeRef.current || speed > LINE_THRESHOLD;

      if (speed > LINE_THRESHOLD && hyperspaceEndTimeRef.current < now) {
        hyperspaceEndTimeRef.current = now + MIN_HYPERSPACE_TIME;
      }

      // Move stars
      const positions = starPositionsRef.current;
      for (let i = 0; i < NUM_STARS; i++) {
        const i3 = i * 3;
        positions[i3 + 1] -= speed * delta;
        if (positions[i3 + 1] < -RANGE) positions[i3 + 1] = RANGE;
      }

      const showLines = isInHyperspace;

      if (starsRef.current) starsRef.current.visible = !showLines;
      if (starLinesRef.current) starLinesRef.current.visible = showLines;

      if (showLines) {
        const streakLength = Math.min(speed * STRETCH_FACTOR, 95);
        const linePos = starLinesRef.current!.geometry.attributes.position.array as Float32Array;

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
        starLinesRef.current!.geometry.attributes.position.needsUpdate = true;
      } else {
        const pointGeo = starsRef.current!.geometry;
        pointGeo.attributes.position.array.set(positions);
        pointGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    }

    animate();

    // === Scroll Handler ===
    const onScroll = () => {
      const newScrollY = window.scrollY;
      const scrollDelta = newScrollY - lastScrollYRef.current;

      if (scrollDelta > 12) {
        targetSpeedRef.current = Math.min(BASE_SPEED + scrollDelta * 0.22, MAX_SPEED);
      } else if (scrollDelta < -5) {
        targetSpeedRef.current = BASE_SPEED;
      }

      lastScrollYRef.current = newScrollY;
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
      renderer.dispose();
    };
  }, []);

  return <canvas id="starfield-canvas" ref={canvasRef} aria-hidden="true" />;
}