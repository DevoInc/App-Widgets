import React, { FC } from 'react';
import Chart from 'react-apexcharts';
import * as utils from '../utils';
import { fullColorPalette } from '../utils/colorPalettes';
import './ApexPie.css';
import { NoData } from '../NoData';
import { useTranslation } from 'react-i18next';
import { ApexPieProps } from './ApexPie.d';
import { ChartOptions } from 'components/common.d';

const defaultApexPieChartOptions = {
  chart: {
    type: 'pie',
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

export const defaultApexPieProps = {
  height: 250,
  legend_width: 150,
  colorScale: fullColorPalette,
};

/**
 * This widget shows a Pie chart from an array of value-label elements. Its size can be customizable.
 *
 *
 * @example
 * Here's the most basic example
 * ```
 * <ApexPie data={data} />
 * ```
 *
 * @remarks
 * You can also customize other visual properties such as legend, size height and colors throug the corresponding props.
 *
 * Also, you have access to more advance customization by exposing the underlining library *apexcharts* through **chartOptionsOverrides** prop.
 *
 */
export const ApexPie: FC<ApexPieProps> = (props) => {
  const { t } = useTranslation();

  const { data, colorScale, height, legend_width, chartOptionsOverrides } = {
    ...defaultApexPieProps,
    ...props,
  };

  const labels = data.map((data) => data.label);
  const series = data.map((data) => data.value);

  const chartOptionsFromProps: Partial<ChartOptions> = {
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
    legend: {
      height: height - 15,
      width: legend_width,
    },
    labels,
  };

  const chartOptions = utils.deepMerge(
    defaultApexPieChartOptions,
    chartOptionsFromProps,
    chartOptionsOverrides || {}
  ) as ChartOptions;

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      {series.length > 0 ? (
        <Chart
          className={'ApexPie'}
          type={'pie'}
          series={series}
          options={chartOptions}
          height={'100%'}
        />
      ) : (
        <NoData height={height} />
      )}
    </div>
  );
};
