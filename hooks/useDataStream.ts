'use client';
import { useEffect, useRef } from 'react';
import { generateDataBatch } from '@/lib/dataGenerator';
import type { DataPoint } from '@/lib/types';

export function useDataStream(push: (batch: DataPoint[]) => void, enabled = true, intervalMs = 100) {
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const tick = () => {
      const now = Date.now();
      const batch = generateDataBatch(200, now - intervalMs, now);
      push(batch);
      timerRef.current = window.setTimeout(tick, intervalMs);
    };
    timerRef.current = window.setTimeout(tick, intervalMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [enabled, intervalMs, push]);
}

