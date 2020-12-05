import React, { Suspense, FC , ReactNode} from 'react';

interface Props {
  classes?: string;
  children: ReactNode;
}

const StatsSuspense: FC<Props> = ({ children, classes }) => (
  <Suspense
    fallback={
      <div className={!classes ? 'col-6 col-xl-3' : classes}>
        <div className="card-stats card card-overflow stats">
          <div className="card-body">
            <p
              className=""
              style={{
                height: '21px',
                width: '80%',
                backgroundColor: '#E8ECE9',
              }}
            ></p>
            <span
              className="card-title h3"
              style={{
                height: '32px',
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

export default React.memo(StatsSuspense);
