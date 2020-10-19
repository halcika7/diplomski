import React, { FC } from 'react';

interface Props {
  label: string;
  placeholder: string;
  classes: string;
  value: string;
}

const DisabledInput: FC<Props> = ({ label, placeholder, classes, value }) => (
  <>
    <label htmlFor={placeholder}>{label}</label>
    <div className={classes}>{value}</div>
  </>
);

export default DisabledInput;
