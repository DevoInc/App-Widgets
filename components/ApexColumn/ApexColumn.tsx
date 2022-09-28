import React, { useState, FC, useMemo } from 'react';
import ApexChart from 'react-apexcharts';
import { v4 } from 'uuid';
import * as utils from '../utils';
import { NoData } from '../NoData';
import './ApexColumn.css';
import { useTranslation } from 'react-i18next';
import {
  ApexColumnGraphType,
  ApexColumnProps,
  ChartColumnData,
  ChartTimeSeriesData,
} from './ApexColumn.d';
import { ChartOptions } from 'components/common.d';
import {
  defaultApexColumnChartOptions,
  defaultColumnChartOptions,
  defaultTimeSerieChartOptions,
} from './chartOptions';

export const defaultApexColumnProps: Omit<
  ApexColumnProps,
  'data' | 'height'
> & { height: number } = {
  height: 300,
  showToolbar: true,
  colorScale: [
    '#D62433',
    '#1EC990',
    '#FFBF15',
    '#7A68B3',
    '#f8ae27',
    '#45BFB7',
    '#e8492a',
  ],
  allowZoom: true,
  timeSerieGraphType: 'bar',
  timeSerieCurve: 'straight',
};

/**
 * This multi-widget shows two charts into one. A time-series chart, as well as a column chart with the aggregated values.
 *
 * Moreover, you can accomodate more than one chart at the same time. Meaning, you could aggregate different time-series chart in the same widget by switching through tabs.
 *
 * It gets its data from an array of value-label-timestamp elements. These charts are fully customizable.
 *
 *
 * @example
 * Here's the most basic example
 * ```
 * <ApexColumn data={data} />
 * ```
 *
 * @remarks
 * You can change how to visualize the time-series charts.
 *
 * By default, it shows elements as columns, but this can be changed to lines or areas through **timeSerieGraphType** prop.
 *
 * Also, you can update how the elements from these lines or areas connect with each other.
 *
 * To achieve this, you can play with **timeSerieCurve** prop until you get your desired result.
 *
 * @example
 * Here's an example of a line chart using a step lines to connect its values
 * ```
 * <ApexColumn data={data} timeSerieGraphType={'line'} timeSerieCurve={'stepline'} />
 * ```
 *
 * You can also customize other visual properties such as height, color scale color, allowZoom, showToolbar and so on. By using the corresponding props.
 *
 * Also, you have access to more advance customization by exposing the underlining library *apexcharts* through **timeSerieChartOptionsOverrides** and **columnChartOptionsOverrides** props.
 *
 */
export const ApexColumn: FC<ApexColumnProps> = (props) => {
  const { t } = useTranslation();

  const {
    data,
    showToolbar,
    allowZoom,
    colorScale,
    timeSerieCurve,
    height,
    timeSerieGraphType,
    maxCategoriesShown: maxCategoriesShownProp,
    timeSerieChartOptionsOverrides,
    columnChartOptionsOverrides,
  } = {
    ...defaultApexColumnProps,
    ...props,
  };

  const chartOptionsFromProps: Partial<ChartOptions> = {
    chart: {
      stacked: true,
      toolbar: { show: showToolbar },
      zoom: { enabled: allowZoom },
      type: timeSerieGraphType,
    },
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
      enabled: false,
      style: {
        colors: ['#fff'],
      },
    },
    stroke: { curve: timeSerieCurve },
    xaxis: {
      labels: { rotate: 0 },
    },
    legend: {
      itemMargin: {
        horizontal: 16,
        vertical: 16,
      },
    },
  };

  const commonChartOptions = utils.deepMerge(
    defaultApexColumnChartOptions,
    chartOptionsFromProps
  ) as ChartOptions;

  const categories = useMemo(() => {
    return data.map((dataElement) => dataElement.serieLabel);
  }, [JSON.stringify(data)]);

  const defaultCategory = categories[0];
  const hasManyCategories = categories.length > 1;
  const maxCategoriesShown = maxCategoriesShownProp || 5;

  const [category, setCategory] = useState(defaultCategory);

  const graphTypes: ApexColumnGraphType[] = ['time', 'column'];
  const [graphType, setGraphType] = useState<ApexColumnGraphType>(
    graphTypes[0]
  );

  const timeSeriesMemo = useMemo(() => {
    return categories.reduce((acc, category) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const categoryData = data.find(
        (dataElement) => dataElement.serieLabel === category
      )!;

      const categoryLabels = [
        ...new Set(
          categoryData.serie.map((serieElement) => serieElement.label)
        ),
      ];

      const series = categoryLabels.map((label) => {
        const data: ChartTimeSeriesData[] = categoryData.serie
          .filter((serieElement) => serieElement.label === label)
          .map((serieElement) => [serieElement.timestamp, serieElement.value]);

        return {
          name: label,
          data,
        };
      });

      return { ...acc, [category]: series };
    }, []) as unknown as Record<string, ApexAxisChartSeries>;
  }, [categories, JSON.stringify(data)]);

  const columnsMemo = useMemo(() => {
    return categories.reduce((acc, category) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const categoryData = data.find(
        (dataElement) => dataElement.serieLabel === category
      )!;

      const categoryLabels = [
        ...new Set(
          categoryData.serie.map((serieElement) => serieElement.label)
        ),
      ];

      const columns: ChartColumnData[] = categoryLabels.map((label) => ({
        x: label,
        y: categoryData.serie.reduce((acc, serieElement) => {
          if (serieElement.label === label) {
            return acc + serieElement.value;
          }
          return acc;
        }, 0),
      }));

      return { ...acc, [category]: [{ data: columns }] };
    }, []) as unknown as Record<string, ApexAxisChartSeries>;
  }, [categories, JSON.stringify(data)]);

  const timeSerieChartOptions = utils.deepMerge(
    defaultTimeSerieChartOptions,
    commonChartOptions,
    timeSerieChartOptionsOverrides
  ) as ChartOptions;

  const columnsChartOptions = utils.deepMerge(
    defaultColumnChartOptions,
    commonChartOptions,
    columnChartOptionsOverrides
  ) as ChartOptions;

  if (!data.length) return <NoData />;

  return (
    <div style={{ height: height + 15 }} className={'ApexColumn'}>
      {hasManyCategories && (
        <div style={{ height: '50px' }} className={'btn-row'}>
          {categories.slice(0, maxCategoriesShown).map((categoryElement) => {
            return (
              <span
                key={v4()}
                className={`category-btn ${
                  categoryElement === category ? 'selected' : ''
                }`}
                onClick={() => setCategory(categoryElement)}
              >
                <p style={{ textTransform: 'capitalize' }}>{categoryElement}</p>
              </span>
            );
          })}
        </div>
      )}

      <div className={'chart-row-column'} style={{ height: height - 100 }}>
        {timeSeriesMemo[category].length > 0 && graphType === 'time' && (
          <ApexChart
            key={`${v4()}`}
            options={timeSerieChartOptions}
            series={timeSeriesMemo[category]}
            type={timeSerieGraphType}
            height={height - 120}
          />
        )}

        {columnsMemo[category].length > 0 && graphType === 'column' && (
          <ApexChart
            key={`${v4()}`}
            options={columnsChartOptions}
            series={columnsMemo[category]}
            type={'bar'}
            height={height - 120}
          />
        )}
      </div>

      <div
        style={{ height: '50px', paddingBottom: '15px' }}
        className={'btn-row category'}
      >
        {graphTypes.map((type) => {
          return (
            <span
              className={`subset-btn ${graphType === type ? 'selected' : ''}`}
              key={v4()}
              onClick={() => setGraphType(type)}
            >
              <p style={{ textTransform: 'capitalize' }}>{type}</p>
              <span className={'vertical-sep'} />
            </span>
          );
        })}
      </div>
    </div>
  );
};
