'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import type { DataPoint } from '@/lib/types';
import { linearTicks, timeTicks } from '@/lib/axisUtils';

export default function LineChart({ data, color = '#4cc38a' }: { data: ReadonlyArray<DataPoint>; color?: string }) {
  const points = useMemo(() => data, [data]);
  const mouseRef = useRef<{x:number;y:number}|null>(null);
  const [tooltip, setTooltip] = useState<{x:number;y:number;label:string}|null>(null);
  const { canvasRef } = useChartRenderer((ctx, canvas) => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (points.length < 2) return;
    const margin = { left: 44, right: 10, top: 8, bottom: 22 };
    const iw = Math.max(1, w - margin.left - margin.right);
    const ih = Math.max(1, h - margin.top - margin.bottom);
    const minX = points[0].timestamp;
    const maxX = points[points.length - 1].timestamp;
    let minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < points.length; i++) {
      const y = points[i].value;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const pad = (maxY - minY) * 0.08 || 1;
    minY -= pad; maxY += pad;
    const sx = (x: number) => margin.left + ((x - minX) / Math.max(1, maxX - minX)) * iw;
    const sy = (y: number) => margin.top + ih - ((y - minY) / Math.max(1e-6, maxY - minY)) * ih;

    // grid + axes
    ctx.strokeStyle = 'rgba(148,163,184,0.25)';
    ctx.fillStyle = '#9aa4b2';
    ctx.lineWidth = 1;
    // y ticks
    const yTicks = linearTicks(minY, maxY, 5);
    yTicks.forEach(t => {
      const yy = sy(t);
      ctx.beginPath();
      ctx.moveTo(margin.left, yy);
      ctx.lineTo(margin.left + iw, yy);
      ctx.stroke();
      ctx.fillText(t.toFixed(0), 4, yy + 3);
    });
    // x ticks
    const { ticks: xTicks } = timeTicks(minX, maxX, 6);
    xTicks.forEach(t => {
      const xx = sx(t);
      ctx.beginPath();
      ctx.moveTo(xx, margin.top);
      ctx.lineTo(xx, margin.top + ih);
      ctx.stroke();
    });
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    xTicks.forEach(t => ctx.fillText(new Date(t).toLocaleTimeString(), sx(t), margin.top + ih + 4));
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // data line
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(sx(points[0].timestamp), sy(points[0].value));
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      ctx.lineTo(sx(p.timestamp), sy(p.value));
    }
    ctx.stroke();

    // crosshair
    if (mouseRef.current) {
      const { x, y } = mouseRef.current;
      if (x >= margin.left && x <= margin.left + iw && y >= margin.top && y <= margin.top + ih) {
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, margin.top + ih);
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left + iw, y);
        ctx.stroke();
      }
    }
  });

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const rectOf = () => el.getBoundingClientRect();
    const onMove = (e: MouseEvent) => {
      const r = rectOf();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mouseRef.current = { x, y };
      if (points.length > 1) {
        const w = el.clientWidth, h = el.clientHeight;
        const margin = { left: 44, right: 10, top: 8, bottom: 22 };
        const iw = Math.max(1, w - margin.left - margin.right);
        const ih = Math.max(1, h - margin.top - margin.bottom);
        const minX = points[0].timestamp;
        const maxX = points[points.length - 1].timestamp;
        let minY = Infinity, maxY = -Infinity;
        for (let i = 0; i < points.length; i++) { const v = points[i].value; if (v < minY) minY = v; if (v > maxY) maxY = v; }
        const pad = (maxY - minY) * 0.08 || 1; minY -= pad; maxY += pad;
        const sx = (xv: number) => margin.left + ((xv - minX) / Math.max(1, maxX - minX)) * iw;
        const ix = (x - margin.left) / iw; // 0..1
        const ts = minX + ix * (maxX - minX);
        // nearest point by timestamp (binary search would be better; linear ok for demo)
        let closest = points[0];
        let best = Math.abs(points[0].timestamp - ts);
        for (let i = 1; i < points.length; i++) {
          const d = Math.abs(points[i].timestamp - ts);
          if (d < best) { best = d; closest = points[i]; }
        }
        const tx = sx(closest.timestamp);
        setTooltip({ x: tx + 8, y: margin.top + 8, label: `${new Date(closest.timestamp).toLocaleTimeString()}  •  ${closest.value.toFixed(2)}` });
      }
    };
    const onLeave = () => { mouseRef.current = null; setTooltip(null); };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [canvasRef, points]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
      {tooltip && (
        <div style={{ position: 'absolute', left: tooltip.x, top: tooltip.y, background: '#0b0e14', border: '1px solid #232a36', borderRadius: 6, padding: '4px 6px', fontSize: 12, color: '#e6edf3', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          {tooltip.label}
        </div>
      )}
    </div>
  );
}

