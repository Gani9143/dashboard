'use client';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

export default function PerformanceMonitor() {
  const { metrics } = usePerformanceMonitor();
  return (
    <div>
      <h3 className="title">Performance</h3>
      <div className="muted">FPS</div>
      <div>{metrics.fps.toFixed(0)}</div>
      <div className="muted" style={{ marginTop: 6 }}>Memory (MB)</div>
      <div>{metrics.memoryUsage ? metrics.memoryUsage.toFixed(1) : '—'}</div>
      <div className="muted" style={{ marginTop: 6 }}>Render (ms)</div>
      <div>{metrics.renderTime.toFixed(2)}</div>
      <div className="muted" style={{ marginTop: 6 }}>Data Proc (ms)</div>
      <div>{metrics.dataProcessingTime.toFixed(2)}</div>
    </div>
  );
}

