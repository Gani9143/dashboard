export function withHiDPICanvas(canvas: HTMLCanvasElement, devicePixelRatio = globalThis.devicePixelRatio || 1) {
  const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(cssW * devicePixelRatio));
  const h = Math.max(1, Math.floor(cssH * devicePixelRatio));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context not available');
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  return ctx;
}

export function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const { width, height } = canvas;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.restore();
}

