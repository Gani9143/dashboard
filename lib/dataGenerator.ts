import type { DataPoint } from './types';

const categories = ['alpha', 'beta', 'gamma', 'delta'];

export function generateInitialDataset(size: number): DataPoint[] {
  const now = Date.now();
  return generateDataBatch(size, now - size * 100, now);
}

export function generateDataBatch(size: number, startTs: number, endTs: number): DataPoint[] {
  const result: DataPoint[] = [];
  const span = Math.max(1, endTs - startTs);
  for (let i = 0; i < size; i++) {
    const t = startTs + Math.floor((i / size) * span);
    const value = 50 + 30 * Math.sin(t / 600) + 15 * Math.cos(t / 1200) + gaussianNoise(5);
    result.push({ timestamp: t, value, category: categories[i % categories.length] });
  }
  return result;
}

export function gaussianNoise(stddev: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * stddev;
}

