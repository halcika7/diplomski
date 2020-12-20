import React, { useState, useEffect, FC, ReactNode, ElementType } from 'react';
import VizSensor from 'react-visibility-sensor';

interface Props {
  height: string;
  children: ReactNode;
}

const VisibilitySensor: FC<Props> = ({ children, height }) => {
  const [show, setShow] = useState<boolean>(false);
  const [element, setElement] = useState<ElementType | ReactNode>(
    <div
      style={{
        height,
        backgroundColor: '#E8ECE9',
        marginLeft: '-5px',
        marginRight: '-5px',
      }}
    />
  );

  useEffect(() => {
    show && setElement(children);
  }, [show, children]);

  return (
    <VizSensor partialVisibility onChange={setShow}>
      {element}
    </VizSensor>
  );
};

export default React.memo(VisibilitySensor);
