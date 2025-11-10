export class FpsMeter {
  private last = performance.now();
  private frames = 0;
  private fps = 0;
  tick(): number {
    const now = performance.now();
    this.frames += 1;
    if (now - this.last >= 1000) {
      this.fps = this.frames * 1000 / (now - this.last);
      this.frames = 0;
      this.last = now;
    }
    return this.fps;
  }
  get current(): number { return this.fps; }
}

export function getApproxMemoryMB(): number {
  const anyNav = globalThis.navigator as any;
  const jsHeap = (globalThis as any).performance?.memory?.usedJSHeapSize;
  if (typeof jsHeap === 'number') return jsHeap / (1024 * 1024);
  if (typeof anyNav?.deviceMemory === 'number') return anyNav.deviceMemory * 1024;
  return 0;
}

