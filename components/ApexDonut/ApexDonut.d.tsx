import { ChartOptions } from 'components/common.d';

export type ApexDonutData = {
  label: string;
  value: number;
};

export type ApexDonutProps = {
  data: ApexDonutData[];
  height?: number;
  donutSpacePercentage?: number;
  legendWidth?: number;
  colorScale?: string[];
  chartOptionsOverrides?: Partial<ChartOptions>;
};
