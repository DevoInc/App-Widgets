import { ChartCurve, ChartOptions } from 'components/common.d';

//NOTE: Public types
export type ApexColumnTimeCurve = ChartCurve;
export type ApexColumnTimeSerieGraphType = 'bar' | 'line' | 'area';

export type ApexColumnSerie = {
  label: string;
  value: number;
  timestamp: number;
};

export type ApexColumnData = {
  serie: ApexColumnSerie[];
  serieLabel: string;
};

export type ApexColumnProps = {
  data: ApexColumnData[];
  height?: number;
  showToolbar?: boolean;
  colorScale?: string[];
  allowZoom?: boolean;
  timeSerieGraphType?: ApexColumnTimeSerieGraphType;
  timeSerieCurve?: ApexColumnTimeCurve;
  maxCategoriesShown?: number;
  timeSerieChartOptionsOverrides?: ChartOptions;
  columnChartOptionsOverrides?: ChartOptions;
};

//NOTE: Internal types
export type ApexColumnGraphType = 'time' | 'column';

export type TimeSerieTimeStamp = number;
export type ChartTimeSeriesData = [TimeSerieTimeStamp, number];

export type ChartColumnData = {
  x: string;
  y: number;
};
