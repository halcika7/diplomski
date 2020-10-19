import React from 'react';
import SmallSpinner from '../Spinner/SmallSpinner';

import './Css.css';
import StatsVisibilitySensor from '../../../helpers/StatsVisibilitySensor';

const StatsWithPercentage = ({
  heading,
  heading2,
  value,
  oldValue,
  icon,
  price = null,
}: any) => {
  const percentage =
    oldValue === 0
      ? +(Math.round(((value - oldValue) / 1) * 100 + ('e+2' as unknown as number)) + 'e-2')
      : +(Math.round(((value - oldValue) / oldValue) * 100 + ('e+2' as unknown as number)) + 'e-2');

  return (
    <StatsVisibilitySensor>
      <div className="col-6 col-xl-3">
        <div className={'card-stats card card-overflow ' + icon}>
          {value || value === 0 ? (
            <div className="card-body align-items-center">
              <h5 className="mb-2">
                {heading} - {value} {price && 'KM'}
              </h5>
              <h5 className="mb-1">
                {heading2} - {oldValue} {price && 'KM'}
              </h5>
              {!isNaN(percentage) && (
                <span
                  className={
                    percentage > 0
                      ? 'text-success d-block'
                      : percentage < 0
                      ? 'text-danger d-block'
                      : 'text-info d-block'
                  }
                  style={{ fontSize: '15px', fontWeight: 900 }}
                >
                  {percentage > 0 && (
                    <i className="fas fa-long-arrow-alt-up mr-1"></i>
                  )}
                  {percentage < 0 && (
                    <i className="fas fa-long-arrow-alt-down mr-1"></i>
                  )}
                  {percentage === 0 && <i className="fas fa-minus mr-1"></i>}
                  {percentage}%
                </span>
              )}
            </div>
          ) : (
            <div className="card-body">
              <SmallSpinner />
            </div>
          )}
        </div>
      </div>
    </StatsVisibilitySensor>
  );
};

export default React.memo(StatsWithPercentage);
