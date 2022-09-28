import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ApexDonut, defaultApexDonutProps } from './ApexDonut';
import { ApexDonutProps } from './ApexDonut.d';
import userCounts from './mock/userCounts';

const defaultProps: ApexDonutProps = {
  ...defaultApexDonutProps,
  data: userCounts,
};

export default {
  title: 'ApexDonut',
  component: ApexDonut,
} as ComponentMeta<typeof ApexDonut>;

const Template: ComponentStory<typeof ApexDonut> = (props) => {
  return <ApexDonut {...props} />;
};

export const Default = Template.bind({});
Default.args = { ...defaultProps };

export const FatDonut = Template.bind({});
FatDonut.args = { ...defaultProps, donutSpacePercentage: 30 };

export const ThinDonut = Template.bind({});
ThinDonut.args = { ...defaultProps, donutSpacePercentage: 90 };
