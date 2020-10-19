import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';

const options: any = {
  roles: [
    { value: 'Worker', label: 'Worker' },
    { value: 'Professor', label: 'Professor' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Super Admin', label: 'Super Admin' },
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

const Select = ({
  label,
  value,
  change,
  option,
  error,
  disabled,
  values,
}: any) => {
  const [data, setData] = useState<any>([]);

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

  const styles = {
    control: (base: any, state: any) => ({
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
  };

  return (
    <>
      <label className="">{label}</label>
      <div className="mb-20">
        <ReactSelect
          options={data}
          onChange={(e: any) => change(e.label)}
          styles={styles}
          value={value === '' ? { label: label } : { label: value }}
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
