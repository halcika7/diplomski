import React, { FC } from 'react';
import { NumberHelper } from '@job/common';

import './Css.css';
import StatsVisibilitySensor from '../../../helpers/StatsVisibilitySensor';

interface Props {
  heading: string;
  heading2: string;
  icon: string;
  value: number | null | undefined;
  oldValue: number | null | undefined;
  price?: boolean;
}

const StatsWithPercentage: FC<Props> = ({
  heading,
  heading2,
  value,
  oldValue,
  icon,
  price = false,
}) => {
  let percentage = '0';
  const numberHelper = new NumberHelper();

  if (value != null && oldValue != null) {
    percentage =
      oldValue === 0
        ? numberHelper.getTwoDigitNumber(((value - oldValue) / 1) * 100, 0)
        : numberHelper.getTwoDigitNumber(
            ((value - oldValue) / oldValue) * 100,
            0
          );
  }

  const intValue = parseInt(percentage, 10);

  return (
    <StatsVisibilitySensor>
      <div className="col-6 col-xl-3">
        <div className={'card-stats card card-overflow ' + icon}>
          {value != null && (
            <div className="card-body align-items-center">
              <h5 className="mb-2">
                {heading} - {value} {price && 'KM'}
              </h5>
              <h5 className="mb-1">
                {heading2} - {oldValue} {price && 'KM'}
              </h5>
              <span
                className={
                  intValue > 0
                    ? 'text-success d-block'
                    : intValue < 0
                    ? 'text-danger d-block'
                    : 'text-info d-block'
                }
                style={{ fontSize: '15px', fontWeight: 900 }}
              >
                {intValue > 0 && (
                  <i className="fas fa-long-arrow-alt-up mr-1" />
                )}
                {intValue < 0 && (
                  <i className="fas fa-long-arrow-alt-down mr-1" />
                )}
                {intValue === 0 && <i className="fas fa-minus mr-1" />}
                {percentage}%
              </span>
            </div>
          )}
        </div>
      </div>
    </StatsVisibilitySensor>
  );
};

export default React.memo(StatsWithPercentage);
