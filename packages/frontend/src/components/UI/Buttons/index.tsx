import React, { FC } from 'react';

import classes from './index.module.css';

interface Props {
  name: string;
  value: boolean;
  setValue: (fn: (val: boolean) => void) => void;
  disabled: boolean;
}


const ToggleSwitchButton: FC<Props> = ({ name, value, disabled, setValue }) => (
  <>
    <label className="d-block">{name}</label>
    <label className={classes.toggleCheck + ' text-white'}>
      <input
        className={classes.toggleCheckbox}
        type="checkbox"
        checked={value}
        onChange={() => setValue(prev => !prev)}
        disabled={disabled}
      />
      <span className={classes.toggleCheckText} />
    </label>
  </>
);

export default ToggleSwitchButton;
