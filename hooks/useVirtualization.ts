'use client';
import { useMemo } from 'react';

export interface VirtualRow {
  index: number;
  start: number;
  size: number;
}

export function useVirtualization({
  total,
  containerHeight,
  rowHeight,
  scrollTop,
  overscan = 6,
}: {
  total: number;
  containerHeight: number;
  rowHeight: number;
  scrollTop: number;
  overscan?: number;
}) {
  return useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const endIndex = Math.min(total - 1, Math.ceil((scrollTop + containerHeight) / rowHeight) + overscan);
    const items: VirtualRow[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push({ index: i, start: i * rowHeight, size: rowHeight });
    }
    const totalHeight = total * rowHeight;
    return { items, totalHeight };
  }, [containerHeight, overscan, rowHeight, scrollTop, total]);
}

