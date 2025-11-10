'use client';
import { useMemo } from 'react';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import type { DataPoint } from '@/lib/types';
import { linearTicks, timeTicks } from '@/lib/axisUtils';

export default function Heatmap({ data }: { data: ReadonlyArray<DataPoint> }) {
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
    const pad = (maxY - minY) * 0.08 || 1; minY -= pad; maxY += pad;
    const cols = 64, rows = 32;
    const grid: number[] = new Array(cols * rows).fill(0);
    const sxn = (x: number) => ((x - minX) / Math.max(1, maxX - minX)) * (cols - 1);
    const syn = (y: number) => ((y - minY) / Math.max(1e-6, maxY - minY)) * (rows - 1);
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const cx = Math.max(0, Math.min(cols - 1, Math.floor(sxn(p.timestamp))));
      const cy = Math.max(0, Math.min(rows - 1, rows - 1 - Math.floor(syn(p.value))));
      grid[cy * cols + cx] += 1;
    }
    const maxCount = grid.reduce((a, b) => Math.max(a, b), 1);
    const cw = iw / cols, ch = ih / rows;

    // grid + axes
    ctx.strokeStyle = 'rgba(148,163,184,0.25)';
    ctx.fillStyle = '#9aa4b2';
    ctx.lineWidth = 1;
    const yTicks = linearTicks(minY, maxY, 5);
    const sx = (x: number) => margin.left + ((x - minX) / Math.max(1, maxX - minX)) * iw;
    const sy = (y: number) => margin.top + ih - ((y - minY) / Math.max(1e-6, maxY - minY)) * ih;
    yTicks.forEach(t => { const yy = sy(t); ctx.beginPath(); ctx.moveTo(margin.left, yy); ctx.lineTo(margin.left + iw, yy); ctx.stroke(); ctx.fillText(t.toFixed(0), 4, yy + 3); });
    const { ticks: xTicks } = timeTicks(minX, maxX, 6);
    xTicks.forEach(t => { const xx = sx(t); ctx.beginPath(); ctx.moveTo(xx, margin.top); ctx.lineTo(xx, margin.top + ih); ctx.stroke(); });
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    xTicks.forEach(t => ctx.fillText(new Date(t).toLocaleTimeString(), sx(t), margin.top + ih + 4));
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';

    // heat cells
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v = grid[y * cols + x] / maxCount;
        ctx.fillStyle = `rgba(251, 113, 133, ${Math.min(1, v * 1.1)})`;
        ctx.fillRect(Math.floor(margin.left + x * cw), Math.floor(margin.top + y * ch), Math.ceil(cw) + 1, Math.ceil(ch) + 1);
      }
    }
  });
  return <canvas ref={canvasRef} />;
}

