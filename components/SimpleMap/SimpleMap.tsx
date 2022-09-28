import React, { FC, useState } from 'react';
import {
  ResponsiveChoropleth,
  ChoroplethProps,
  GeoProjectionType,
} from '@nivo/geo';
import { worldCountries } from './features';
import { Slider } from 'rsuite';
import { BiMinus, BiPlus } from 'react-icons/bi';
import {
  SimpleMapAxis,
  SimpleMapColorSet,
  SimpleMapDomain,
  SimpleMapProps,
} from './SimpleMap.d';
import { SimpleMapTooltip } from './SimpleMapTooltip';
import { simpleMapColorSetMapping } from './colorsMapping';
import './SimpleMap.css';
import 'rsuite/dist/rsuite.min.css';

export const defaultSimpleMapProps = {
  height: 500,
  showGrids: false,
  gridColor: '#dddddd',
  defaultZoom: 120,
  valuePrecission: 2,
  countriesBorderColor: '#152538',
  unknownDataColor: '#DDDDDD',
  mapColorSet: 'blues' as SimpleMapColorSet,
  mapProjectionType: 'mercator' as GeoProjectionType,
};

/**
 * This widget shows a Map chart from an array of value-country-code elements. This map is fully customizable.
 *
 * 🚨 IMPORTANT: country code strings must follow the [ISO-aplha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) format to work properly.
 *
 *
 * @example
 * Here's the most basic example
 * ```
 * <SimpleMap data={data} />
 * ```
 *
 * @remarks
 * You can focus on an specific area of the world by combining zooming and x-y axis movement.
 *
 * In order to achieve this, you can play with **defaultZoom** and **defaultMapTranslation** props, until you get your desired result.
 *
 * @example
 * Here's an example of a Map zooming to Europe
 * ```
 * <SimpleMap data={data} defaultZoom={600} defaultMapTranslation={{ x: 0, y: 11 }} />
 * ```
 *
 * You can also customize other visual properties such as height, grid color, unkown data color, countries border, and so on. By using the corresponding props.
 *
 * @example
 * Here's an example of a Map with custom colors
 * ```
 * <SimpleMap data={data} mapColorSet={'orange_red'} unknownDataColor={'white'} countriesBorderColor={'blue'} />
 * ```
 *
 * Also, you have access to more advance customization by exposing the underlining library *nivo/geo* through **configOverrrides** prop.
 *
 */
export const SimpleMap: FC<SimpleMapProps> = (props) => {
  const {
    data,
    mapProjectionType,
    unknownDataColor,
    height,
    showGrids,
    gridColor,
    countriesBorderColor,
    mapColorSet,
    defaultZoom,
    defaultMapTranslation,
    valuePrecission,
    configOverrrides,
  } = {
    ...defaultSimpleMapProps,
    ...props,
  };

  // ZOOM
  const [zoom, setZoom] = useState(defaultZoom);

  const ZOOM_STEP = defaultZoom / 10;
  const MAX_ZOOM_VALUE = defaultZoom * 4;
  const MIN_ZOOM_VALUE = 0;

  const increaseZoom = () => {
    let newZoom = zoom + ZOOM_STEP;
    if (newZoom > MAX_ZOOM_VALUE) {
      newZoom = MAX_ZOOM_VALUE;
    }
    setZoom(newZoom);
  };

  const decreaseZoom = () => {
    let newZoom = zoom - ZOOM_STEP;
    if (newZoom < MIN_ZOOM_VALUE) {
      newZoom = MIN_ZOOM_VALUE;
    }
    setZoom(newZoom);
  };

  // MAP TRANSLATION
  const TRANSLATION_SLIDE_STEP = 0.5;
  const TRANSLATION_SLIDE_MIN_VALUE = -12 - defaultZoom / 100;
  const TRANSLATION_SLIDE_MAX_VALUE = 12 + defaultZoom / 100;

  const [x, setX] = useState(
    defaultMapTranslation ? defaultMapTranslation.x : 0
  );
  const [y, setY] = useState(
    defaultMapTranslation ? defaultMapTranslation.y : 2
  );

  const translate = (value: number, axis: SimpleMapAxis) => {
    if (axis === SimpleMapAxis.Y) {
      setY(value);
    } else {
      setX(value);
    }
  };

  const formatSliderTooltip = (value: number | undefined) =>
    value ? Number(value.toPrecision(3)) : value;

  const legends: ChoroplethProps['legends'] = [
    {
      anchor: 'bottom-left',
      direction: 'column',
      justify: true,
      translateX: 20,
      translateY: -100,
      itemsSpacing: 0,
      itemWidth: 94,
      itemHeight: 26,
      itemDirection: 'left-to-right',
      itemTextColor: '#444444',
      itemOpacity: 0.85,
      symbolSize: 26,
      effects: [
        {
          on: 'hover',
          style: {
            itemTextColor: '#000000',
            itemOpacity: 1,
          },
        },
      ],
    },
  ];

  const domainValues = data.map((dataElement) => dataElement.value);
  const domain: SimpleMapDomain = [
    Math.min(...domainValues),
    Math.max(...domainValues),
  ];

  const mapData = data.map((dataElement) => ({
    id: dataElement.countryCode,
    value: dataElement.value,
  }));

  return (
    <div
      className={'SimpleMap'}
      style={{ height: height + 20, marginTop: '32px' }}
    >
      <div className={'dvapp-simple-map-container'}>
        <div style={{ height: '15px', width: '100%' }}>
          <Slider
            defaultValue={x}
            min={TRANSLATION_SLIDE_MIN_VALUE + 7}
            step={TRANSLATION_SLIDE_STEP}
            max={TRANSLATION_SLIDE_MAX_VALUE - 7}
            onChange={(value) => translate(value, SimpleMapAxis.X)}
            renderTooltip={formatSliderTooltip}
          />
        </div>

        <div className={'dvapp-simple-map-zoom'}>
          <BiPlus onClick={increaseZoom} />
          <BiMinus onClick={decreaseZoom} />
        </div>

        <ResponsiveChoropleth
          data={mapData}
          features={worldCountries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={simpleMapColorSetMapping[mapColorSet]}
          domain={domain}
          label="properties.name"
          valueFormat={`.${valuePrecission}s`}
          unknownColor={unknownDataColor}
          projectionType={mapProjectionType}
          projectionTranslation={[(x + 5) / 10, (y + 5) / 10]}
          projectionRotation={[0, 0, 0]}
          projectionScale={zoom}
          enableGraticule={showGrids}
          graticuleLineColor={gridColor}
          borderWidth={0.5}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          tooltip={SimpleMapTooltip as any} //NOTE: here is a type collision on ChoroplethTooltip type from @nivo/geo library
          borderColor={countriesBorderColor}
          legends={legends}
          {...configOverrrides}
        />
      </div>

      <Slider
        defaultValue={y}
        min={TRANSLATION_SLIDE_MIN_VALUE}
        step={TRANSLATION_SLIDE_STEP}
        max={TRANSLATION_SLIDE_MAX_VALUE}
        vertical
        onChange={(value) => translate(value, SimpleMapAxis.Y)}
        renderTooltip={formatSliderTooltip}
      />
    </div>
  );
};
