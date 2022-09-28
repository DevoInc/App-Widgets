import { ChartOptions } from 'components/common.d';

export type ApexPieData = {
  label: string;
  value: number;
};

export type ApexPieProps = {
  data: ApexPieData[];
  height?: number;
  legend_width?: number;
  colorScale?: string[];
  chartOptionsOverrides?: ChartOptions;
};
