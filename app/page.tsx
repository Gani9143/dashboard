import Link from 'next/link';

export default function Home() {
  return (
    <main className="container" style={{ display: 'grid', gap: 16 }}>
      <section className="panel" style={{ padding: 20, background: 'linear-gradient(135deg, var(--bg) 0%, var(--panel) 60%)' }}>
        <h1 className="title" style={{ fontSize: 28, marginBottom: 6 }}>
          High-Performance Real‑Time Dashboard
        </h1>
        <p className="muted" style={{ margin: 0 }}>
          10,000+ points at 60fps. Canvas + React. No chart libraries.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          <Link href="/dashboard">
            <button style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', border: 'none', fontWeight: 600 }}>Open Dashboard</button>
          </Link>
          <Link href="/api/data?size=500" target="_blank">
            <button>View Data API</button>
          </Link>
          <Link href="/about" prefetch={false}>
            <button>About Us</button>
          </Link>
        </div>
      </section>

      <section className="row">
        <div className="panel grow">
          <h3 className="title">Features</h3>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Line, Bar, Scatter, Heatmap charts</li>
            <li>Real-time updates every 100ms</li>
            <li>Axes, gridlines, crosshair tooltip</li>
            <li>Virtualized data table</li>
          </ul>
        </div>
        <div className="panel" style={{ minWidth: 280 }}>
          <h3 className="title">Quick Start</h3>
          <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Open the dashboard</li>
            <li>Use 1m/5m/1h range controls</li>
            <li>Pause/Resume streaming</li>
          </ol>
        </div>
      </section>
    </main>
  );
}

