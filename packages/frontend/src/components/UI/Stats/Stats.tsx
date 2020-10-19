import React from 'react';
import SmallSpinner from '../Spinner/SmallSpinner';

import './Css.css';
import StatsVisibilitySensor from '../../../helpers/StatsVisibilitySensor';

const Stats = ({ icon, heading, value, classes = null }: any) => (
  <StatsVisibilitySensor stats>
    <div className={!classes ? 'col-6 col-xl-3' : classes}>
      <div className={'card-stats card card-overflow stats ' + icon}>
        {value || value === 0 ? (
          <div className="card-body">
            <p>{heading}</p>
            <h3 className="card-title">{value}</h3>
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

export default React.memo(Stats);
