import { ChartOptions } from 'components/common.d';
import { v4 } from 'uuid';

export const defaultApexColumnChartOptions: Partial<ChartOptions> = {
  chart: {
    id: v4(),
    stacked: false,
    toolbar: {
      show: true,
      autoSelected: 'zoom',
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true,
    },
  },
  xaxis: {
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM dd HH:mm',
        day: 'MMM dd HH:mm',
        hour: 'HH:mm',
      },
    },
  },
  tooltip: {
    x: {
      format: 'MMM dd HH:mm',
    },
  },
  noData: { text: 'Loading .....' },
  stroke: { curve: 'straight' },
};

export const defaultTimeSerieChartOptions: Partial<ChartOptions> = {
  chart: {
    stacked: true,
    toolbar: {
      show: true,
      autoSelected: 'zoom',
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true,
    },
    type: 'bar',
    selection: {
      enabled: true,
      type: 'x',
    },
  },
  xaxis: {
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM dd HH:mm',
        day: 'MMM dd HH:mm',
        hour: 'HH:mm',
      },
      rotate: 0,
      datetimeUTC: false,
    },
    type: 'datetime',
    categories: [],
  },
  tooltip: {
    x: {
      format: 'MMM dd HH:mm',
    },
    y: {},
  },
  noData: {
    text: 'Loading .....',
  },
  stroke: {
    curve: 'straight',
  },
  colors: [
    '#D62433',
    '#1EC990',
    '#FFBF15',
    '#7A68B3',
    '#f8ae27',
    '#45BFB7',
    '#e8492a',
  ],
  fill: {
    colors: [
      '#D62433',
      '#1EC990',
      '#FFBF15',
      '#7A68B3',
      '#f8ae27',
      '#45BFB7',
      '#e8492a',
    ],
  },
  dataLabels: {
    enabled: false,
    style: {
      colors: ['#fff'],
    },
  },
  legend: {
    itemMargin: {
      horizontal: 16,
      vertical: 16,
    },
  },
  plotOptions: {
    bar: {
      distributed: false,
      horizontal: false,
    },
  },
};

export const defaultColumnChartOptions: Partial<ChartOptions> = {
  chart: {
    stacked: true,
    toolbar: {
      show: true,
      autoSelected: 'zoom',
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true,
    },
    type: 'bar',
  },
  xaxis: {
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM dd HH:mm',
        day: 'MMM dd HH:mm',
        hour: 'HH:mm',
      },
      rotate: 0,
    },
    type: 'category',
  },
  tooltip: {
    x: {
      format: 'MMM dd HH:mm',
    },
    y: {},
  },
  noData: {
    text: 'Loading .....',
  },
  stroke: {
    curve: 'straight',
  },
  colors: [
    '#D62433',
    '#1EC990',
    '#FFBF15',
    '#7A68B3',
    '#f8ae27',
    '#45BFB7',
    '#e8492a',
  ],
  fill: {
    colors: [
      '#D62433',
      '#1EC990',
      '#FFBF15',
      '#7A68B3',
      '#f8ae27',
      '#45BFB7',
      '#e8492a',
    ],
  },
  dataLabels: {
    enabled: false,
    style: {
      colors: ['#fff'],
    },
  },
  legend: {
    itemMargin: {
      horizontal: 16,
      vertical: 16,
    },
  },
  plotOptions: {
    bar: {
      distributed: true,
      horizontal: false,
    },
  },
};
