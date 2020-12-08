import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';

type SelectType = { value: string; label: string };

const options: { [key: string]: SelectType[] } = {
  roles: [
    { value: 'Worker', label: 'worker' },
    { value: 'Professor', label: 'professor' },
    { value: 'Administration', label: 'administration' },
    { value: 'Super Admin', label: 'admin' },
  ],
  print: [
    { value: 'Color', label: 'Color' },
    { value: 'Black/White', label: 'Black/White' },
  ],
  use: [
    { value: 'Personal', label: 'Personal' },
    { value: 'University', label: 'University' },
  ],
};

const styles = (value: string) => ({
  control: (base: Record<string, any>, state: Record<string, any>) => ({
    ...base,
    backgroundColor: 'transparent',
    color: '#111',
    borderColor: state.isFocused || value ? '#e14eca' : '#2b3553',
    boxShadow: '0',
    transition:
      'color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out',
    '&:hover': {
      borderColor: state.isFocused || value ? '#e14eca' : '#2b3553',
      boxShadow: '0',
    },
  }),
});

const Select = ({
  label,
  value,
  change,
  option,
  error,
  disabled,
  values,
}: any) => {
  const [data, setData] = useState<{ value: string; label: string }[]>([]);
  const defValue =
    value === '' ? { label, value: label } : { label: value, value };

  const onChange = (e: SelectType) => change(e.label);

  useEffect(() => {
    if (values) {
      const newData = values.map((value: any) => ({ value, label: value }));
      setData(newData);
    }
  }, [values]);

  useEffect(() => {
    if (option) {
      setData([...options[option]]);
    }
  }, [option]);

  return (
    <>
      <label className="">{label}</label>
      <div className="mb-20">
        <ReactSelect
          options={data}
          onChange={onChange as any}
          styles={styles(value)}
          value={defValue}
          required
          className={error ? 'is-invalid' : disabled ? 'disabled' : ''}
          isDisabled={disabled}
        />
      </div>
      {error && <div className="options-error">{error}</div>}
    </>
  );
};

export default React.memo(Select);
