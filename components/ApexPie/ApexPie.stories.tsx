import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ApexPie, defaultApexPieProps } from './ApexPie';
import { ApexPieProps } from './ApexPie.d';
import userCounts from './mock/userCounts';

const defaultProps: ApexPieProps = {
  ...defaultApexPieProps,
  data: userCounts,
};

export default {
  title: 'ApexPie',
  component: ApexPie,
} as ComponentMeta<typeof ApexPie>;

const Template: ComponentStory<typeof ApexPie> = (props) => {
  return <ApexPie {...props} />;
};

export const Default = Template.bind({});
Default.args = { ...defaultProps };
