import { useEffect, useRef } from 'react';
import type p5 from 'p5';

// Vertex Shader: Pass-through transform converting 3D mesh vertices into 2D screen space
const pgVert = `
precision highp float;

attribute vec3 aPosition;        // 3D coordinates of the mesh vertices
uniform mat4 uModelViewMatrix;   // Positions/orients object relative to camera
uniform mat4 uProjectionMatrix;  // Applies perspective or orthographic camera projection

void main(void) {
  // Convert 3D position vector into a 4D homogeneous coordinate for matrix multiplication
  vec4 positionVec4 = vec4(aPosition, 1.0);
  
  // Transform object-space coordinates directly to normalized screen space
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`;

// Fragment Shader: Custom procedural Perlin noise generator with posterized contour banding
const pgFrag = `
precision highp float;
#define PI 3.141592653589793

// Color palette definitions
uniform vec3 uColor1;   // Primary highlight color (highest noise peaks)
uniform vec3 uColor2;   // Midtone fill color
uniform vec3 uColor3;   // Base background color (lowest noise valleys)
uniform vec3 uStroke;   // Accent line color used for borders and diagonal hatching

uniform float uSeed;    // Random seed to produce unique noise variations
uniform float uTime;    // Time scalar used to animate and drift the noise pattern

// Deterministic 2D hash function: generates pseudo-random float [0.0, 1.0] from grid coordinates
float rand2D(vec2 _p) {
	return fract(sin(dot(_p.xy ,vec2(12.9898,78.233))) * uSeed);
}

// Generates a random unit gradient vector at grid corner _p1 and calculates 
// the dot product against vector offset _p2 (distance from corner to pixel)
float grad(vec2 _p1, vec2 _p2) {
	// Map pseudo-random value to angle [0, 2PI]
	float theta = 2.0 * PI * rand2D(_p1);
	
	// Create normalized 2D direction vector
	vec2 v1 = vec2(cos(theta), sin(theta)) / sqrt(2.0);
	vec2 v2 = _p2 - _p1;
	
	// Compute directional projection (gradient influence)
	return dot(v1, v2);
}

// Standard 2D Perlin Noise pass
float perlin(vec2 _p, float _size) {
	vec2 uv = _p / _size; // Scale world coordinates to grid units
	
	// S-curve Hermite interpolation (3x^2 - 2x^3) to smooth grid boundary transitions
	float xf = smoothstep(0.0, 1.0, fract(uv.x));
	float yf = smoothstep(0.0, 1.0, fract(uv.y));
	
	// Locate integer lattice coordinates for the 4 surrounding grid corners
	float x0 = floor(uv.x);
	float x1 = floor(uv.x) + 1.0;
	float y0 = floor(uv.y);
	float y1 = floor(uv.y) + 1.0;

	// Bilinearly interpolate gradient influences along X axis
	float n1 = mix(grad(vec2(x0, y0), uv), grad(vec2(x1, y0), uv), xf);
	float n2 = mix(grad(vec2(x0, y1), uv), grad(vec2(x1, y1), uv), xf);

	// Interpolate along Y axis and re-map output range from [-1, 1] to [0, 1]
	return (mix(n1, n2, yf) + 1.0) / 2.0;
}

// Fractal Brownian Motion (fBm): Layers multiple octaves of noise for natural detail
float octavePerlin(vec2 _p, float _size, float persistence) {
	float total = 0.0;
	float max = 0.0;
	float size = _size;
	float amplitude = 1.0;
	const int octaves = 10;

	// Sum 10 detailed layers, doubling frequency and shrinking influence per pass
	for (int i = 0; i < octaves; i++) {
		total += amplitude * perlin(_p, size);
		max += amplitude;      // Track total theoretical max to normalize output later
		size /= 2.0;           // High-frequency detail scaling (lacunarity = 2.0)
		amplitude *= persistence; // Low persistence (0.2) makes fine detail subtle
	}

	return total / max; // Normalized final value [0.0, 1.0]
}

void main(void) {
	// Sample animated noise based on screen pixel coordinates + vertical time drift
	float amp = octavePerlin(gl_FragCoord.xy + vec2(0.0, uTime), 100.0, 0.2);

	// Quantize continuous noise scalar into discrete topographical color bands
	if (amp > 0.535) {
		// Region 1: Highest elevation solid highlight
		gl_FragColor = vec4(uColor1, 1.0);
	} else if (amp > 0.53) {
		// Region 1 Edge: 0.005 band width contour line
		gl_FragColor = vec4(uStroke, 1.0);
	} else if (amp > 0.47) {
		// Region 2: Midtone region with animated 45-degree single-hatch stripe pattern
		gl_FragColor = vec4(uColor2, 1.0);
		if (mod(floor((gl_FragCoord.x+gl_FragCoord.y+uTime) / 2.0), 8.0) == 0.0) gl_FragColor = vec4(uStroke, 1.0);
	} else if (amp > 0.465) {
		// Region 2 Edge: 0.005 band width contour line
		gl_FragColor = vec4(uStroke, 1.0);
	} else {
		// Region 3: Lowland background region with denser double-hatch stripe pattern
		gl_FragColor = vec4(uColor3, 1.0);
		if (mod(floor((gl_FragCoord.x+gl_FragCoord.y+uTime) / 2.0), 8.0) == 0.0 || mod(floor((gl_FragCoord.x+gl_FragCoord.y+uTime) / 2.0), 8.0) == 4.0) gl_FragColor = vec4(uStroke, 1.0);
	}
}
`;

export default function NoiseBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: p5 | null = null;

    // Dynamically import p5 runtime client-side only
    import('p5').then((p5Module) => {
      const P5 = p5Module.default;

      if (!containerRef.current) return;

      const sketch = (p: p5) => {
        let noiseShader: p5.Shader;

        p.setup = () => {
          const w = containerRef.current?.clientWidth || p.windowWidth;
          const h = containerRef.current?.clientHeight || p.windowHeight;

          p.createCanvas(w, h, p.WEBGL);
          p.pixelDensity(1);

          noiseShader = p.createShader(pgVert, pgFrag);
          p.shader(noiseShader);

          const hexToRgb = (hex: string) => {
            const cleanHex = hex.replace('#', '');
            const num = parseInt(cleanHex, 16);
            return [
              ((num >> 16) & 255) / 255,
              ((num >> 8) & 255) / 255,
              (num & 255) / 255,
            ];
          };

          noiseShader.setUniform('uColor1', hexToRgb('#136b7d'));
          noiseShader.setUniform('uColor2', hexToRgb('#802851'));
          noiseShader.setUniform('uColor3', hexToRgb('#401c6c'));
          noiseShader.setUniform('uStroke', hexToRgb('#0f234d'));
          noiseShader.setUniform('uSeed', p.random(10000, 100000));
        };

        p.draw = () => {
          noiseShader.setUniform('uTime', p.millis() / 30.0);
          p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
        };

        p.windowResized = () => {
          if (!containerRef.current) return;
          p.resizeCanvas(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
          );
        };
      };

      p5Instance = new P5(sketch, containerRef.current);
    });

    return () => {
      p5Instance?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
