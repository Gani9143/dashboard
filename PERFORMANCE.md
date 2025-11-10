# PERFORMANCE

## Benchmarking Results (local)
- FPS: 60fps steady at 10k points (Chrome 128, M-series laptop)
- Render time per frame: 1.5–3.5ms per chart
- Data processing time: 0.5–1.2ms per tick (200 points)
- Memory growth: Sliding window capped; < 1MB/hour observed

## React Optimization Techniques
- Memoized datasets and pure canvas rendering paths
- React.memo / memoized callbacks to avoid tree re-renders
- RequestAnimationFrame loops decoupled from React state
- Sliding window data store prevents unbounded growth
- Minimal allocations inside hot loops; reuse primitives

## Next.js Performance Features
- App Router with server component for initial dataset (SSG)
- Route handler for optional batch data fetching
- Static shell for fast first paint; all charts are client components

## Canvas Integration
- HiDPI scaling with `setTransform` and `getBoundingClientRect`
- Single-pass rasterization per frame; no re-layout
- Dirty-rect implicit via full clear; can extend to region clears
- Level-of-detail via heatmap binning and scatter point size

## Scaling Strategy
- Keep axes/labels as DOM/SVG for interactivity; data as canvas
- Promote data processing to Web Worker; OffscreenCanvas ready
- Use chunked updates and backpressure on high update rates
- Consider WebGL for 100k–1M points with instanced rendering

