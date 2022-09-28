import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ApexColumn, defaultApexColumnProps } from './ApexColumn';
import { ApexColumnProps } from './ApexColumn.d';
import severityName from './mock/severityName';
import urlEvents from './mock/urlEvents';

const defaultProps: ApexColumnProps = {
  ...defaultApexColumnProps,
  data: severityName,
};

export default {
  title: 'ApexColumn',
  component: ApexColumn,
} as ComponentMeta<typeof ApexColumn>;

const Template: ComponentStory<typeof ApexColumn> = (props) => {
  return <ApexColumn {...props} />;
};

export const Default = Template.bind({});
Default.args = { ...defaultProps };

export const TimeSeriesArea = Template.bind({});
TimeSeriesArea.args = { ...defaultProps, timeSerieGraphType: 'area' };

export const TimeSeriesAreaSmooth = Template.bind({});
TimeSeriesAreaSmooth.args = {
  ...defaultProps,
  timeSerieGraphType: 'area',
  timeSerieCurve: 'smooth',
};

export const TimeSeriesAreaStepLine = Template.bind({});
TimeSeriesAreaStepLine.args = {
  ...defaultProps,
  timeSerieGraphType: 'area',
  timeSerieCurve: 'stepline',
};

export const TimeSeriesLine = Template.bind({});
TimeSeriesLine.args = { ...defaultProps, timeSerieGraphType: 'line' };

export const TimeSeriesLineSmooth = Template.bind({});
TimeSeriesLineSmooth.args = {
  ...defaultProps,
  timeSerieGraphType: 'line',
  timeSerieCurve: 'smooth',
};

export const TimeSeriesLineStepLine = Template.bind({});
TimeSeriesLineStepLine.args = {
  ...defaultProps,
  timeSerieGraphType: 'line',
  timeSerieCurve: 'stepline',
};

export const MultipleCategories = Template.bind({});
MultipleCategories.args = {
  ...defaultProps,
  data: urlEvents,
};

export const MultipleCategoriesLines = Template.bind({});
MultipleCategoriesLines.args = {
  ...defaultProps,
  timeSerieGraphType: 'line',
  data: urlEvents,
};

export const MultipleCategoriesArea = Template.bind({});
MultipleCategoriesArea.args = {
  ...defaultProps,
  timeSerieGraphType: 'area',
  data: urlEvents,
};
