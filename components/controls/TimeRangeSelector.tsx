'use client';
import type { ViewportWindow } from '@/lib/types';

export default function TimeRangeSelector({ value, onChange }: { value: ViewportWindow; onChange: (v: ViewportWindow) => void }) {
  const options = [
    { label: '1m', ms: 60_000 },
    { label: '5m', ms: 5 * 60_000 },
    { label: '1h', ms: 60 * 60_000 },
  ];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {options.map(o => (
        <button key={o.label} onClick={() => {
          const end = Date.now();
          onChange({ startTs: end - o.ms, endTs: end });
        }}>{o.label}</button>
      ))}
    </div>
  );
}

