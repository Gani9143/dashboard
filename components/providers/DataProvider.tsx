'use client';
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { DataPoint, ViewportWindow } from '@/lib/types';

interface DataContextValue {
  data: ReadonlyArray<DataPoint>;
  pushBatch: (batch: DataPoint[]) => void;
  window: ViewportWindow;
  setWindow: (w: ViewportWindow) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ initialData, children }: { initialData: DataPoint[]; children: React.ReactNode }) {
  const [windowState, setWindowState] = useState<ViewportWindow>(() => {
    if (initialData.length === 0) {
      const now = Date.now();
      return { startTs: now - 60_000, endTs: now };
    }
    const startTs = initialData[0].timestamp;
    const endTs = initialData[initialData.length - 1].timestamp;
    return { startTs, endTs };
  });

  const dataRef = useRef<DataPoint[]>([...initialData]);
  const [, setVersion] = useState(0);

  const pushBatch = useCallback((batch: DataPoint[]) => {
    // Sliding window to prevent unbounded growth
    const maxPoints = 120_000; // ~100 minutes @ 20Hz
    dataRef.current.push(...batch);
    if (dataRef.current.length > maxPoints) {
      dataRef.current.splice(0, dataRef.current.length - maxPoints);
    }
    setVersion(v => (v + 1) & 0xffff);
  }, []);

  const value = useMemo<DataContextValue>(() => ({
    data: dataRef.current,
    pushBatch,
    window: windowState,
    setWindow: setWindowState,
  }), [pushBatch, windowState]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useDataContext must be used within DataProvider');
  return ctx;
}

