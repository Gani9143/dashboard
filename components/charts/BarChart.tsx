'use client';
import { useMemo } from 'react';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import type { DataPoint } from '@/lib/types';
import { linearTicks, timeTicks } from '@/lib/axisUtils';

export default function BarChart({ data, color = '#3b82f6' }: { data: ReadonlyArray<DataPoint>; color?: string }) {
  const points = useMemo(() => data, [data]);
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
    const pad = (maxY - minY) * 0.1 || 1; minY = Math.min(minY - pad, 0); maxY += pad;
    const sx = (x: number) => margin.left + ((x - minX) / Math.max(1, maxX - minX)) * iw;
    const sy = (y: number) => margin.top + ih - ((y - minY) / Math.max(1e-6, maxY - minY)) * ih;

    // grid + axes
    ctx.strokeStyle = 'rgba(148,163,184,0.25)';
    ctx.fillStyle = '#9aa4b2';
    ctx.lineWidth = 1;
    const yTicks = linearTicks(minY, maxY, 5);
    yTicks.forEach(t => {
      const yy = sy(t);
      ctx.beginPath();
      ctx.moveTo(margin.left, yy);
      ctx.lineTo(margin.left + iw, yy);
      ctx.stroke();
      ctx.fillText(t.toFixed(0), 4, yy + 3);
    });
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
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';

    // bars
    const barW = Math.max(1, iw / points.length);
    ctx.fillStyle = color;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const x = sx(p.timestamp) - barW/2;
      const y = sy(p.value);
      ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(barW), Math.max(1, margin.top + ih - Math.floor(y)));
    }
  });
  return <canvas ref={canvasRef} />;
}

