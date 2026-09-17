import type { APIRoute } from 'astro';
import { generateHudFrameSVG } from '../../utils/hudGenerator';

export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const width = parseInt(url.searchParams.get('w') || '840', 10);
  const height = parseInt(url.searchParams.get('h') || '420', 10);
  const glow = url.searchParams.get('glow') === 'true';
  const seed = Math.floor(Math.random() * 999999);

  try {
    const { svgMarkup } = generateHudFrameSVG({ w: width, h: height, seed, glow });
    return new Response(svgMarkup, {
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  } catch (error) {
    return new Response('Error generating SVG',
      { status: 500 }
    );
  }
};