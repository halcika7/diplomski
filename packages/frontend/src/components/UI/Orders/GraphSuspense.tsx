import React, { Suspense, FC, ReactNode } from 'react';

const GraphSuspense: FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense
    fallback={
      <div className="col-xl-6">
        <div className="card">
          <span
            className="mt-3 mb-3 ml-3 uppercase"
            style={{
              display: 'block',
              height: '20px',
              width: '70%',
              backgroundColor: '#E8ECE9',
            }}
          ></span>
          <div
            className="card-body"
            style={{
              height: '350px',
              paddingTop: '0',
              width: '100%',
              backgroundColor: '#E8ECE9',
            }}
          ></div>
        </div>
      </div>
    }
  >
    {children}
  </Suspense>
);

export default React.memo(GraphSuspense);
