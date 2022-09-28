/* eslint-disable react/prop-types */
import React from 'react';
import { ChoroplethTooltip } from '@nivo/geo';
import './SimpleMap.css';
import 'rsuite/dist/rsuite.min.css';
import { useTranslation } from 'react-i18next';

export const SimpleMapTooltip: ChoroplethTooltip = ({ feature }) => {
  const { t } = useTranslation();

  const hasValue = !!feature.value;

  if (!hasValue) {
    return <div style={{ display: 'none' }} />;
  }

  const isLargeValue = feature.value > 10000000;

  const parsedValue = t(`{{value, number}}`, {
    value: feature.value,
  });

  const value = isLargeValue ? `${feature.formattedValue}` : parsedValue;

  return (
    <div className={'dvapp-simple-map-tooltip'}>
      <span
        className={'dvapp-simple-map-tt-square'}
        style={{ backgroundColor: feature.color }}
      />
      <span className={'dvapp-simple-map-tt-text'}>
        {`${feature.label}: ${value}`}
      </span>
    </div>
  );
};
