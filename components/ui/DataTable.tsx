'use client';
import { useEffect, useRef, useState } from 'react';
import { useVirtualization } from '@/hooks/useVirtualization';
import type { DataPoint } from '@/lib/types';

export default function DataTable({ data }: { data: ReadonlyArray<DataPoint> }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [height, setHeight] = useState(300);
  const rowHeight = 24;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setScrollTop(el.scrollTop);
    const ro = new ResizeObserver(() => setHeight(el.clientHeight));
    el.addEventListener('scroll', onScroll);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', onScroll); ro.disconnect(); };
  }, []);

  const { items, totalHeight } = useVirtualization({ total: data.length, containerHeight: height, rowHeight, scrollTop, overscan: 8 });

  return (
    <div className="panel" style={{ height: 320, overflow: 'auto' }} ref={containerRef}>
      <div style={{ position: 'relative', height: totalHeight }}>
        {items.map(({ index, start }) => {
          const d = data[index];
          return (
            <div key={index} className="data-row" style={{ position: 'absolute', top: start, left: 0, right: 0, height: rowHeight, display: 'flex', gap: 8, padding: '0 8px' }}>
              <div style={{ width: 160 }} className="muted">{new Date(d.timestamp).toLocaleTimeString()}</div>
              <div style={{ width: 100 }}>{d.value.toFixed(2)}</div>
              <div style={{ flex: 1 }} className="muted">{d.category}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

