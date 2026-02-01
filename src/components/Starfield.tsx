import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BASE_SPEED = 0.6;
const MAX_SPEED = 1.2;
const LINE_THRESHOLD = 0.78;
const STRETCH_FACTOR = 12;
const NUM_STARS = 6000;
const RANGE = 300;

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const starLinesRef = useRef<THREE.LineSegments | null>(null);
  const pointGeoRef = useRef<THREE.BufferGeometry | null>(null);
  const lineGeoRef = useRef<THREE.BufferGeometry | null>(null);
  const starPositionsRef = useRef<Float32Array>(new Float32Array(NUM_STARS * 3));
  const currentSpeedRef = useRef(BASE_SPEED);
  const targetSpeedRef = useRef(BASE_SPEED);
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

    const starPositions = new Float32Array(NUM_STARS * 3);
    for (let i = 0; i < NUM_STARS * 3; i++) {
      starPositions[i] = Math.random() * (RANGE * 2) - RANGE;
    }
    starPositionsRef.current = starPositions;

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(starPositions.slice(), 3));
    pointGeoRef.current = pointGeo;

    const sprite = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png'
    );
    const stars = new THREE.Points(
      pointGeo,
      new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite,
        transparent: true,
      })
    );
    scene.add(stars);
    starsRef.current = stars;

    const linePositions = new Float32Array(NUM_STARS * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeoRef.current = lineGeo;

    const starLines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.9 })
    );
    starLines.visible = false;
    scene.add(starLines);
    starLinesRef.current = starLines;

    function animate() {
      const currentSpeed = currentSpeedRef.current;
      const targetSpeed = targetSpeedRef.current;
      const starPositions = starPositionsRef.current;
      const pointGeo = pointGeoRef.current;
      const lineGeo = lineGeoRef.current;

      currentSpeedRef.current += (targetSpeed - currentSpeed) * 0.1;
      targetSpeedRef.current += (BASE_SPEED - targetSpeed) * 0.05;
      targetSpeedRef.current = Math.min(targetSpeedRef.current, MAX_SPEED);

      const nextSpeed = currentSpeedRef.current;

      for (let i = 0; i < NUM_STARS; i++) {
        const i3 = i * 3;
        starPositions[i3 + 1] -= nextSpeed;
        if (starPositions[i3 + 1] < -RANGE) starPositions[i3 + 1] = RANGE;
      }

      const showLines = nextSpeed > LINE_THRESHOLD;
      if (starsRef.current) starsRef.current.visible = !showLines;
      if (starLinesRef.current) starLinesRef.current.visible = showLines;

      if (showLines && lineGeo && pointGeo) {
        const streakLength = Math.min(nextSpeed * STRETCH_FACTOR, 80);
        const linePos = lineGeo.attributes.position?.array as Float32Array;
        if (linePos) {
          for (let i = 0; i < NUM_STARS; i++) {
            const i3 = i * 3;
            const i6 = i * 6;
            const x = starPositions[i3];
            const y = starPositions[i3 + 1];
            const z = starPositions[i3 + 2];
            linePos[i6] = x;
            linePos[i6 + 1] = y;
            linePos[i6 + 2] = z;
            linePos[i6 + 3] = x;
            linePos[i6 + 4] = y - streakLength;
            linePos[i6 + 5] = z;
          }
          lineGeo.attributes.position.needsUpdate = true;
        }
      } else if (pointGeo) {
        pointGeo.attributes.position.array.set(starPositions);
        pointGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    }

    animate();

    const onScroll = () => {
      const newScrollY = window.scrollY;
      const scrollDelta = newScrollY - lastScrollYRef.current;
      if (scrollDelta > 0) {
        targetSpeedRef.current = Math.min(BASE_SPEED + scrollDelta * 0.25, MAX_SPEED);
      } else if (scrollDelta < 0) {
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
      pointGeoRef.current?.dispose();
      lineGeoRef.current?.dispose();
      starsRef.current = null;
      starLinesRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  return <canvas id="starfield-canvas" ref={canvasRef} aria-hidden="true" />;
}
