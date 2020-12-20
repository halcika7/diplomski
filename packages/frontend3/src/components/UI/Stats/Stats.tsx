import React, { FC } from 'react';

import './Css.css';
import StatsVisibilitySensor from '../../../helpers/StatsVisibilitySensor';

interface Props {
  icon: string;
  classes?: string;
  heading: string;
  value: number | string | null | undefined;
}

const Stats: FC<Props> = ({ icon, heading, value, classes = null }) => (
  <StatsVisibilitySensor stats>
    <div className={!classes ? 'col-6 col-xl-3' : classes}>
      <div className={'card-stats card card-overflow stats ' + icon}>
        {(value || value === 0) && (
          <div className="card-body">
            <p>{heading}</p>
            <h3 className="card-title">{value}</h3>
          </div>
        )}
      </div>
    </div>
  </StatsVisibilitySensor>
);

export default React.memo(Stats);
