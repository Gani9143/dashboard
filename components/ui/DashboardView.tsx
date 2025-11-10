'use client';
import { useMemo, useRef, useState } from 'react';
import { useDataContext } from '@/components/providers/DataProvider';
import { useDataStream } from '@/hooks/useDataStream';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ScatterPlot from '@/components/charts/ScatterPlot';
import Heatmap from '@/components/charts/Heatmap';
import FilterPanel from '@/components/controls/FilterPanel';
import TimeRangeSelector from '@/components/controls/TimeRangeSelector';

export default function DashboardView() {
  const { data, pushBatch, window, setWindow } = useDataContext();
  const [enabled, setEnabled] = useState(true);
  useDataStream(pushBatch, enabled, 100);

  const filtered = useMemo(() => data.filter(d => d.timestamp >= window.startTs && d.timestamp <= window.endTs), [data, window.endTs, window.startTs]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="row">
        <div className="panel grow">
          <h2 className="title">Controls</h2>
          <div className="controls">
            <button onClick={() => setEnabled(v => !v)}>{enabled ? 'Pause' : 'Resume'}</button>
            <FilterPanel />
            <TimeRangeSelector value={window} onChange={setWindow} />
          </div>
        </div>
        <div className="panel" style={{ minWidth: 260 }}>
          <PerformanceMonitor />
        </div>
      </div>

      <div ref={containerRef} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="panel" style={{ height: 300 }}>
          <h3 className="title">Line Chart</h3>
          <div className="legend">
            <span className="legend-item"><span className="legend-swatch" style={{ background: '#4cc38a' }}></span>value</span>
          </div>
          <div style={{ height: 260 }}>
            <LineChart data={filtered} color="#4cc38a" />
          </div>
        </div>
        <div className="panel" style={{ height: 300 }}>
          <h3 className="title">Bar Chart</h3>
          <div className="legend">
            <span className="legend-item"><span className="legend-swatch" style={{ background: '#3b82f6' }}></span>value</span>
          </div>
          <div style={{ height: 260 }}>
            <BarChart data={filtered} color="#3b82f6" />
          </div>
        </div>
        <div className="panel" style={{ height: 300 }}>
          <h3 className="title">Scatter Plot</h3>
          <div className="legend">
            <span className="legend-item"><span className="legend-swatch" style={{ background: '#eab308' }}></span>value</span>
          </div>
          <div style={{ height: 260 }}>
            <ScatterPlot data={filtered} color="#eab308" />
          </div>
        </div>
        <div className="panel" style={{ height: 300 }}>
          <h3 className="title">Heatmap</h3>
          <div className="legend">
            <span className="legend-item"><span className="legend-swatch" style={{ background: '#3b82f6' }}></span>density</span>
          </div>
          <div style={{ height: 260 }}>
            <Heatmap data={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}

