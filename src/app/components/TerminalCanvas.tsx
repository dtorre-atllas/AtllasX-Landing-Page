'use client';

import { useEffect, useRef } from 'react';

/**
 * Background canvas animation used behind dark hero and CTA sections.
 * Renders falling white mono characters reminiscent of a terminal data stream.
 *
 * Extracted from the original single-file App.tsx so every page can reuse it.
 */
export function TerminalCanvas({
  canvasId = 'terminal',
}: {
  canvasId?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = canvas.width;
    let h = canvas.height;
    let cols: Array<{ y: number; speed: number }> = [];
    const chars = '01ATLLASX→●○+-✓→#:.';
    const fontSize = 12;

    function resize() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
      w = canvas.width;
      h = canvas.height;
      const colCount = Math.floor(w / fontSize);
      cols = [];
      for (let i = 0; i < colCount; i++) {
        cols.push({
          y: Math.random() * h,
          speed: 0.3 + Math.random() * 0.7,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(10,10,10,0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        const x = i * fontSize;
        const ch = chars[Math.floor(Math.random() * chars.length)];

        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.fillText(ch, x, col.y);

        for (let t = 1; t < 8; t++) {
          ctx.fillStyle = `rgba(255,255,255,${0.15 - t * 0.018})`;
          ctx.fillText(
            chars[Math.floor(Math.random() * chars.length)],
            x,
            col.y - t * fontSize,
          );
        }

        col.y += col.speed * 1.2;
        if (col.y > h + 100) {
          col.y = -Math.random() * 200;
          col.speed = 0.3 + Math.random() * 0.7;
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id={canvasId}
      className="absolute inset-0 z-[1] opacity-50"
    />
  );
}

export default TerminalCanvas;
