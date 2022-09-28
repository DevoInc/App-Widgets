import { ChoroplethProps, GeoProjectionType } from '@nivo/geo';

//NOTE: Public types
export type SimpleMapColorSet =
  | 'brown_blueGreen'
  | 'blue_green'
  | 'blue_purple'
  | 'green_blue'
  | 'orange_red'
  | 'purpleRed_green'
  | 'pink_yellowGreen'
  | 'purple_blue'
  | 'purple_blue_green'
  | 'purple_orange'
  | 'purple_red'
  | 'red_blue'
  | 'red_grey'
  | 'red_purple'
  | 'red_yellow_blue'
  | 'red_yellow_green'
  | 'yellow_green'
  | 'yellow_green_blue'
  | 'yellow_orange_brown'
  | 'yellow_orange_red'
  | 'blues'
  | 'greens'
  | 'greys'
  | 'nivo'
  | 'oranges'
  | 'purples'
  | 'reds'
  | 'spectral';

export type SimpleMapTranslationValues = { x: number; y: number };

export type SimpleMapData = {
  countryCode: string; //NOTE: must be ISO-aplha-3 country codes
  value: number;
};

export type SimpleMapProps = {
  data: SimpleMapData[];
  height?: number;
  defaultZoom?: number;
  mapProjectionType?: GeoProjectionType;
  defaultMapTranslation?: SimpleMapTranslationValues;
  showGrids?: boolean;
  valuePrecission?: number;
  unknownDataColor?: string;
  gridColor?: string;
  countriesBorderColor?: string;
  mapColorSet?: SimpleMapColorSet;
  configOverrrides?: ChoroplethProps;
};

//NOTE: Internal types
export enum SimpleMapAxis {
  X = 'x',
  Y = 'y',
}

type MinValue = number;
type MaxValue = number;
export type SimpleMapDomain = [MinValue, MaxValue];

export type SimpleMapDataAlertsType = Record<
  string,
  Record<string, string | number>
>[];
