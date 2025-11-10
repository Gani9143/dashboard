# About Us — Performance Dashboard (Next.js 14 + TypeScript)

This project is a high-performance real-time dashboard that renders 10,000+ data points at 60fps using a Canvas-first approach and modern React/Next.js patterns. No chart libraries are used.

## Project Details
- Multiple charts: Line, Bar, Scatter, Heatmap
- Real-time updates every 100ms (simulated)
- Interactive controls: pause/resume, time range (1m/5m/1h)
- Axes, gridlines, crosshair tooltip for readability
- Virtualized DataTable for large datasets
- Performance panel (FPS, memory, timings)
- Responsive layout

## Technical Stack
- Next.js 14 App Router, React 18, TypeScript
- Canvas for high-density rendering, DOM/SVG for labels/controls
- Server Component for initial data; Client Components for charts
- Route handler: `app/api/data/route.ts` (optional data endpoint)

## Performance Targets
- 60 FPS at 10k+ points, real-time updates without jank
- < 100ms interaction latency
- Memory growth < 1MB/hour via sliding data window

## Optimization Techniques
- rAF loops decoupled from React state; memoized render inputs
- HiDPI canvas scaling; minimal allocations in hot paths
- Sliding window data storage to avoid leaks
- React memoization (`useMemo`, `useCallback`, `React.memo`)

## Development
```bash
npm install
npm run dev
# open http://localhost:3000/dashboard
```

## Build & Deploy
```bash
npm run build
npm start
```
Deploy easily on Vercel.

## Screenshots
Add screenshots to `public/` and embed here.

