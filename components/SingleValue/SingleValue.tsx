import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SingleValueProps } from './SingleValue.d';
import './SingleValue.css';
import '../../i18n/index';

const defaultTrendColorConfig: SingleValueProps['trendColorConfig'] = {
  positive: {
    background: '#46E3AF',
    text: '#272727',
  },
  negative: {
    background: '#DE1B1B',
    text: '#FFF',
  },
  zero: {
    background: '#FFF',
    text: '#272727',
  },
};

export const defaultSingleValueProps = {
  height: 200,
  textColor: '#272727',
  backgroundColor: '#FFF',
  hasTrendColors: false,
  trendColorConfig: defaultTrendColorConfig,
};

/**
 * This widget shows a single value data element, it can be positive or negative number.
 *
 * @example
 * Here's the most basic example
 * ```
 * <SingleValue data={data} />
 * ```
 *
 * @remarks
 * This widget can update their background and text color based on the value passed by. This color trend feature is disabled by default.
 *
 * In order to active the color trend feature, use the **hasTrendColors** prop.
 *
 * @example
 * Here's an example with hasTrendColors activated
 * ```
 * <SingleValue data={data} hasTrendColors />
 * ```
 *
 * You can customize the colors for this trend color feature. To modify these colors, you need to pass a custom configuration through **trendColorConfig** prop.
 *
 * By default, negative values are presented with a red background, while positive values are use a green background.
 *
 */
export const SingleValue: FC<SingleValueProps> = (props) => {
  const { t } = useTranslation();

  const {
    data,
    hasTrendColors,
    trendColorConfig,
    backgroundColor: backgroundColorFromProp,
    textColor: textColorFromProps,
    height,
  } = {
    ...defaultSingleValueProps,
    ...props,
  };

  let backgroundColor = backgroundColorFromProp;
  let textColor = textColorFromProps;

  // hasTrendColors overrides background and text colors based on trendColorConfig
  if (hasTrendColors) {
    const isZero = data === 0;
    const hasPositiveValue = data > 0;

    let trendBackgroundColor = hasPositiveValue
      ? trendColorConfig['positive']
      : trendColorConfig['negative'];

    if (isZero) trendBackgroundColor = trendColorConfig['zero'];

    backgroundColor = trendBackgroundColor.background;
    textColor = trendBackgroundColor.text;
  }

  return (
    <span className={'SingleValue'} style={{ height, backgroundColor }}>
      <span className={'dvapp-value'} style={{ color: textColor }}>
        {t('SingleValueNumber', { data })}
      </span>
    </span>
  );
};
