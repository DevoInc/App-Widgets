import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultSingleValueProps, SingleValue } from './SingleValue';
import { SingleValueProps } from './SingleValue.d';

const CONSOLE_LOGINS_MOCK_VALUE = 429093;
const CONSOLE_LOGINS_MOCK_NEGATIVE_VALUE = -20000;

const defaultProps: SingleValueProps = {
  ...defaultSingleValueProps,
  data: CONSOLE_LOGINS_MOCK_VALUE,
};

export default {
  title: 'SingleValue',
  component: SingleValue,
} as ComponentMeta<typeof SingleValue>;

const Template: ComponentStory<typeof SingleValue> = (props) => {
  return <SingleValue {...props} />;
};

export const Default = Template.bind({});
Default.args = { ...defaultProps };

export const PositiveTrend = Template.bind({});
PositiveTrend.args = {
  ...defaultProps,
  hasTrendColors: true,
};

export const NegativeTrend = Template.bind({});
NegativeTrend.args = {
  ...defaultProps,
  hasTrendColors: true,
  data: CONSOLE_LOGINS_MOCK_NEGATIVE_VALUE,
  textColor: 'white',
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  ...defaultProps,
  backgroundColor: '#ff00d6',
  textColor: 'white',
};
