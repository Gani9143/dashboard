export type ChartType = 'line' | 'bar' | 'scatter' | 'heatmap';

export interface DataPoint {
  timestamp: number;
  value: number;
  category: string;
  metadata?: Record<string, unknown>;
}

export interface ChartConfig {
  type: ChartType;
  dataKey: string;
  color: string;
  visible: boolean;
}

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  dataProcessingTime: number;
}

export interface ViewportWindow {
  startTs: number;
  endTs: number;
}

