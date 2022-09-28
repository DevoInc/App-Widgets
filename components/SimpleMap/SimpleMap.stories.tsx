import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultSimpleMapProps, SimpleMap } from './SimpleMap';
import { SimpleMapProps } from './SimpleMap.d';
import networkConnections from './mock/networkConnections';

const defaultProps: SimpleMapProps = {
  ...defaultSimpleMapProps,
  data: networkConnections,
};

export default {
  title: 'SimpleMap',
  component: SimpleMap,
} as ComponentMeta<typeof SimpleMap>;

const Template: ComponentStory<typeof SimpleMap> = (props) => {
  return <SimpleMap {...props} />;
};

export const Default = Template.bind({});
Default.args = { ...defaultProps };

export const ShowGrid = Template.bind({});
ShowGrid.args = {
  ...defaultProps,
  showGrids: true,
};

export const ColorVariant = Template.bind({});
ColorVariant.args = {
  ...defaultProps,
  mapColorSet: 'orange_red',
};

export const UnknownColorVariant = Template.bind({});
UnknownColorVariant.args = {
  ...defaultProps,
  mapColorSet: 'orange_red',
  unknownDataColor: 'white',
};

export const CountryLinesVariant = Template.bind({});
CountryLinesVariant.args = {
  ...defaultProps,
  mapColorSet: 'orange_red',
  unknownDataColor: 'white',
  countriesBorderColor: 'blue',
};

export const ZoomToEurope = Template.bind({});
ZoomToEurope.args = {
  ...defaultProps,
  defaultZoom: 600,
  defaultMapTranslation: { x: 0, y: 11 },
};

export const ZoomToAsia = Template.bind({});
ZoomToAsia.args = {
  ...defaultProps,
  defaultZoom: 400,
  defaultMapTranslation: { x: -6, y: 5 },
};
