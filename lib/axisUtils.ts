export function niceStep(range: number, maxTicks = 10) {
  const rough = range / Math.max(1, maxTicks);
  const pow10 = Math.pow(10, Math.floor(Math.log10(rough)));
  const multiples = [1, 2, 5, 10];
  let best = pow10;
  for (const m of multiples) {
    const step = m * pow10;
    if (Math.abs(step - rough) < Math.abs(best - rough)) best = step;
  }
  return best;
}

export function linearTicks(min: number, max: number, maxTicks = 10) {
  if (!isFinite(min) || !isFinite(max)) return [] as number[];
  if (min === max) { max += 1; min -= 1; }
  const step = niceStep(max - min, maxTicks);
  const t0 = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = t0; v <= max; v += step) ticks.push(+v.toFixed(12));
  return ticks;
}

export function timeTicks(minTs: number, maxTs: number, maxTicks = 8) {
  const range = Math.max(1, maxTs - minTs);
  const candidates = [1000, 2000, 5000, 10_000, 30_000, 60_000, 5*60_000, 10*60_000, 30*60_000, 60*60_000];
  let step = candidates[0];
  for (const c of candidates) {
    const n = range / c;
    if (n <= maxTicks) { step = c; break; }
    step = c;
  }
  const t0 = Math.ceil(minTs / step) * step;
  const ticks: number[] = [];
  for (let v = t0; v <= maxTs; v += step) ticks.push(v);
  return { step, ticks };
}

