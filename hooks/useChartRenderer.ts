'use client';
import { useCallback, useEffect, useRef } from 'react';
import { withHiDPICanvas, clearCanvas } from '@/lib/canvasUtils';

export function useChartRenderer(renderFrame: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = withHiDPICanvas(canvas);
    clearCanvas(ctx, canvas);
    renderFrame(ctx, canvas);
    rafRef.current = requestAnimationFrame(loop);
  }, [renderFrame]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [loop]);

  return { canvasRef } as const;
}

