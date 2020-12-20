import { memo, useState, useEffect, FC, ReactElement, ReactNode } from 'react';
import VizSensor from 'react-visibility-sensor';

interface Props {
  stats?: boolean;
  children: ReactNode;
}

const elem1 = (
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
        />
        <span
          className="mb-1 h5"
          style={{
            height: '18px',
            width: '80%',
            display: 'block',
            backgroundColor: '#E8ECE9',
          }}
        />
        <span
          style={{
            height: '22px',
            width: '30%',
            display: 'block',
            backgroundColor: '#E8ECE9',
          }}
        />
      </div>
    </div>
  </div>
);

const elem2 = (
  <div className="col-6 col-xl-3">
    <div className="card-stats card card-overflow stats">
      <div className="card-body">
        <p
          className=""
          style={{
            height: '21px',
            width: '80%',
            backgroundColor: '#E8ECE9',
          }}
        />
        <span
          className="card-title h3"
          style={{
            height: '32px',
            width: '30%',
            display: 'block',
            backgroundColor: '#E8ECE9',
          }}
        />
      </div>
    </div>
  </div>
);

const StatsVisibilitySensor: FC<Props> = ({ children, stats = false }) => {
  const [show, setShow] = useState<boolean>(false);
  const [element, setElement] = useState<ReactElement | ReactNode>();

  useEffect(() => {
    if (stats) {
      setElement(elem2);
    } else {
      setElement(elem1);
    }
  }, [stats]);

  useEffect(() => {
    show && setElement(children);
  }, [show, children]);

  return (
    <VizSensor partialVisibility onChange={setShow}>
      {element}
    </VizSensor>
  );
};

export default memo(StatsVisibilitySensor);
