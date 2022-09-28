export type TrendColorPair = {
  background: string;
  text: string;
};

export type TrendColorConfig = {
  positive: TrendColorPair;
  negative: TrendColorPair;
  zero: TrendColorPair;
};

export type SingleValueProps = {
  data: number;
  height?: number;
  trendColorConfig?: TrendColorConfig;
  backgroundColor?: string;
  textColor?: string;
  hasTrendColors?: boolean;
};
