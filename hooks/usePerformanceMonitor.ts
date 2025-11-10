'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FpsMeter, getApproxMemoryMB } from '@/lib/performanceUtils';
import type { PerformanceMetrics } from '@/lib/types';

export function usePerformanceMonitor() {
  const fpsMeter = useMemo(() => new FpsMeter(), []);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({ fps: 0, memoryUsage: 0, renderTime: 0, dataProcessingTime: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      const fps = fpsMeter.tick();
      setMetrics(prev => ({ ...prev, fps, memoryUsage: getApproxMemoryMB() }));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [fpsMeter]);

  return { metrics, setRenderTime: (ms: number) => setMetrics(m => ({ ...m, renderTime: ms })), setDataProcessingTime: (ms: number) => setMetrics(m => ({ ...m, dataProcessingTime: ms })) };
}

