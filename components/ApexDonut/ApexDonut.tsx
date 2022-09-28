import React, { FC } from 'react';
import Chart from 'react-apexcharts';
import * as utils from '../utils';
import { fullColorPalette } from '../utils/colorPalettes';
import './ApexDonut.css';
import { NoData } from '../NoData';
import { useTranslation } from 'react-i18next';
import { ApexDonutProps } from './ApexDonut.d';
import { ChartOptions } from 'components/common.d';

const defaultApexDonutChartOptions: ChartOptions = {
  chart: {
    type: 'donut',
    height: '100%',
  },
  dataLabels: {
    enabled: false,
    style: {
      colors: ['#fff'],
    },
  },
  legend: {
    horizontalAlign: 'left',
    floating: false,
    width: 150,
    position: 'left',
  },
};

export const defaultApexDonutProps = {
  height: 250,
  donutSpacePercentage: 75,
  legendWidth: 150,
  colorScale: fullColorPalette,
};

/**
 * This widget shows a Donut chart from an array of value-label elements. Its size and donut form can be customizable.
 *
 *
 * @example
 * Here's the most basic example
 * ```
 * <ApexDonut data={data} />
 * ```
 *
 * @remarks
 * This donut chart could become fat of thin depending on the percentage you pass through **donutSpacePercentage** prop.
 *
 * The bigger this percentage, the thinner the donut will be. Max value: 98, Min value: 0.
 *
 * @example
 * Here's an example of a thin Donut widget
 * ```
 * <ApexDonut data={data} donutSpacePercentage={90} />
 * ```
 *
 * You can also customize other visual properties such as legend, size height and colors throug the corresponding props.
 *
 * Also, you have access to more advance customization by exposing the underlining library *apexcharts* through **chartOptionsOverrides** prop.
 *
 */
export const ApexDonut: FC<ApexDonutProps> = (props) => {
  const { t } = useTranslation();

  const {
    data,
    colorScale,
    height,
    donutSpacePercentage,
    legendWidth,
    chartOptionsOverrides,
  } = {
    ...defaultApexDonutProps,
    ...props,
  };

  const labels = data.map((data) => data.label);
  const series = data.map((data) => data.value);

  const charOptionsFromProps: Partial<ChartOptions> = {
    colors: colorScale,
    fill: { colors: colorScale },
    tooltip: {
      y: {
        formatter: (val) => {
          return t(`{{val, number}}`, { val });
        },
      },
    },
    dataLabels: {
      style: {
        colors: colorScale,
      },
    },
    markers: {
      colors: colorScale,
    },
    plotOptions: {
      pie: {
        donut: {
          size: `${donutSpacePercentage}%`,
        },
      },
    },
    legend: {
      height: height - 5,
      width: legendWidth,
    },
    labels,
  };

  const chartOptions = utils.deepMerge(
    defaultApexDonutChartOptions,
    charOptionsFromProps,
    chartOptionsOverrides || {}
  ) as ChartOptions;

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      {series.length > 0 ? (
        <Chart
          className={'ApexDonut'}
          type={'donut'}
          height={'100%'}
          series={series}
          options={chartOptions}
        />
      ) : (
        <NoData height={height} />
      )}
    </div>
  );
};
