export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main className="container grid" style={{ gap: 16 }}>
      <section className="panel" style={{ padding: 20 }}>
        <h1 className="title" style={{ fontSize: 26, marginBottom: 6 }}>About Us</h1>
        <p className="muted" style={{ marginTop: 0 }}>Performance-Critical Real-Time Dashboard built with Next.js 14 + TypeScript.</p>
      </section>

      <section className="row">
        <div className="panel grow">
          <h3 className="title">Project Overview</h3>
          <p className="muted">A production-grade real-time visualization app that renders 10,000+ points at 60fps using a Canvas-first rendering strategy and modern React/Next.js features.</p>
        </div>
        <div className="panel" style={{ minWidth: 280 }}>
          <h3 className="title">Quick Links</h3>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            <li><a href="/dashboard">Open Dashboard</a></li>
            <li><a href="/api/data?size=500" target="_blank">Data API (sample)</a></li>
          </ul>
        </div>
      </section>

      <section className="panel">
        <h3 className="title">Key Features</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>Multiple charts: Line, Bar, Scatter, Heatmap</li>
          <li>Real-time updates every 100ms (simulated)</li>
          <li>Axes, gridlines, crosshair tooltip for readability</li>
          <li>Virtualized DataTable for large datasets</li>
          <li>Responsive layout for desktop and tablet</li>
        </ul>
      </section>

      <section className="panel">
        <h3 className="title">Performance Targets</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>60 FPS during real-time updates with 10,000+ points</li>
          <li>&lt; 100ms response time for interactions</li>
          <li>Memory growth &lt; 1MB/hour via sliding windows</li>
        </ul>
      </section>

      <section className="panel">
        <h3 className="title">Technical Stack & Architecture</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>Next.js 14 App Router + React 18 + TypeScript</li>
          <li>Canvas for high-density rendering; DOM for controls/labels</li>
          <li>Server Component provides initial data; Client Components render charts</li>
          <li>Route handler <code>app/api/data/route.ts</code> for optional batch data</li>
          <li>Hooks: data streaming, performance monitor, virtualization</li>
        </ul>
      </section>

      <section className="panel">
        <h3 className="title">Optimization Techniques</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>RequestAnimationFrame loops decoupled from React re-renders</li>
          <li>HiDPI canvas scaling and minimal allocations in hot paths</li>
          <li>Memoized computations and pure drawing functions</li>
          <li>Sliding window data store to avoid memory leaks</li>
        </ul>
      </section>

      <section className="panel">
        <h3 className="title">How to Use</h3>
        <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>Open the Dashboard</li>
          <li>Use 1m/5m/1h to change the time range</li>
          <li>Pause/Resume streaming as needed</li>
        </ol>
      </section>

      <section className="panel">
        <h3 className="title">Deployment</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>Development: <code>npm install</code>, then <code>npm run dev</code></li>
          <li>Production: <code>npm run build</code>, then deploy (e.g., Vercel)</li>
        </ul>
      </section>
    </main>
  );
}

