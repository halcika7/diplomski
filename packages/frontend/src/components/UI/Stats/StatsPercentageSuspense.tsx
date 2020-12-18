import React, { Suspense, FC, ReactNode } from 'react';

const StatsPercentageSuspense: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <Suspense
    fallback={
      <div className="col-6 col-xl-3">
        <div className="card-stats card card-overflow">
          <div className="card-body align-items-center">
            <span
              className="mb-2 h5"
              style={{
                height: '18px',
                width: '80%',
                display: 'block',
                backgroundColor: '#E8ECE9',
              }}
            ></span>
            <span
              className="mb-1 h5"
              style={{
                height: '18px',
                width: '80%',
                display: 'block',
                backgroundColor: '#E8ECE9',
              }}
            ></span>
            <span
              style={{
                height: '22px',
                width: '30%',
                display: 'block',
                backgroundColor: '#E8ECE9',
              }}
            ></span>
          </div>
        </div>
      </div>
    }
  >
    {children}
  </Suspense>
);

export default React.memo(StatsPercentageSuspense);
