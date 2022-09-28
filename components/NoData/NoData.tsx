import React from 'react';
import './NoData.css';

export type NoDataProps = {
  height?: number;
  message?: string;
};

export const defaultNoDataProps = {
  height: 200,
};

export const NoData = (props: NoDataProps) => {
  const { height, message } = { ...defaultNoDataProps, ...props };
  return (
    <span className={'dvapp-no-data'} style={{ height: height }}>
      <h3 className={'dvapp-header-variant'}>{message || 'No Data'}</h3>
    </span>
  );
};
