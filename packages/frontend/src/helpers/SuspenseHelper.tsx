import React, { FC, Suspense } from 'react';
import SmallSpinner from '@components/UI/Spinner/SmallSpinner';

interface Props {
  classes?: string;
}

const SuspenseHelper: FC<Props> = ({classes, children}) => (
  <Suspense
    fallback={
      <div className={classes ? classes : ''}>
        <div className="card">
          <div className="card-body">
            <SmallSpinner />
          </div>
        </div>
      </div>
    }
  >
    {children}
  </Suspense>
);

export default SuspenseHelper;
