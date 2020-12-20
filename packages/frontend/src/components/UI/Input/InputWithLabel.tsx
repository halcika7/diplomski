import { FC, ChangeEvent } from 'react';
import classnames from 'classnames';

interface Props {
  label: string;
  placeholder: string;
  type: 'text' | 'password' | 'number' | 'tel' | 'email';
  classes?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  step?: string;
  min?: string;
  max?: string;
  error?: string;
  name: string;
  disabled?: boolean;
}

const InputWithLabel: FC<Props> = ({
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
}) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      className={classnames(classes || '', {
        'is-invalid': error,
      })}
      value={value}
      onChange={onChange}
      step={step}
      min={min}
      max={max}
      id={name}
      name={name}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </>
);

export default InputWithLabel;
