import React, { FC } from 'react';

interface Props {
  label: string;
  name: string;
  classes: string;
  value: string | undefined;
}

const DisabledInput: FC<Props> = ({ label, name, classes, value }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <div className={classes}>{value}</div>
  </>
);

export default DisabledInput;
