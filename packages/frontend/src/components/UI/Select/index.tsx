import { memo, useState, useEffect, FC } from 'react';
import ReactSelect from 'react-select';
import { AnyDictionary } from '@job/common';

type SelectType = { value: string; label: string };

const options: { [key: string]: SelectType[] } = {
  roles: [
    { value: 'Worker', label: 'worker' },
    { value: 'Professor', label: 'professor' },
    { value: 'Administration', label: 'administration' },
    { value: 'Admin', label: 'admin' },
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
  control: (base: AnyDictionary, state: AnyDictionary) => ({
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

interface Props {
  label: string;
  value: string | number | boolean;
  option?: string;
  error?: string;
  disabled?: boolean;
  values?: any[];
  valuesWithoutMap?: {
    value: string | number | boolean;
    label: string | number | boolean;
  }[];
  change: (val: any) => void;
}

const Select: FC<Props> = ({
  label,
  value,
  change,
  option,
  error,
  disabled = false,
  values,
  valuesWithoutMap,
}) => {
  const [data, setData] = useState<
    { value: string | number | boolean; label: string | number | boolean }[]
  >([]);
  const defValue =
    value === '' ? { label, value: label } : { label: value, value };

  const onChange = (e: SelectType) => change(e.value);

  useEffect(() => {
    if (values) {
      const newData = values.map((value: any) => ({ value, label: value }));
      setData(newData);
    }
  }, [values]);

  useEffect(() => {
    if (valuesWithoutMap) {
      setData(valuesWithoutMap);
    }
  }, [valuesWithoutMap]);

  useEffect(() => {
    if (option) {
      setData([...options[option]]);
    }
  }, [option]);

  return (
    <>
      <span className="">{label}</span>
      <div className="mb-20">
        <ReactSelect
          options={data}
          onChange={onChange as any}
          styles={styles(value as string)}
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

export default memo(Select);
