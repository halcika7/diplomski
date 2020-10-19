import React from 'react';
import classnames from 'classnames';

const InputWithLabel = ({
  label,
  disabled,
  placeholder,
  type,
  classes,
  value,
  onChange,
  step,
  min,
  max,
  error,
  name,
}: any) => (
  <>
    <label htmlFor={placeholder}>{label}</label>
    <input
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      className={classnames(classes ? classes : '', {
        'is-invalid': error,
      })}
      value={value}
      onChange={e => onChange(e.target.value)}
      step={step}
      min={min}
      max={max}
      id={placeholder}
      name={name}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </>
);

export default InputWithLabel;
