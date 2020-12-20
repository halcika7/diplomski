import React, { useState, ChangeEvent, useEffect } from 'react';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import { AppState } from '@reducers/index';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  addBinding,
  resetPaperBindingResponse,
  resetBindingErrors,
} from '@actions';
import { useThunkDispatch } from '@dispatch';
import Alert from '@components/UI/Alert';

const InitialState = {
  name: '',
  upTo25: 0.01,
  from25upTo50: 0.02,
  from50upTo100: 0.03,
  from100upTo150: 0.04,
};

const inputs: {
  name: 'upTo25' | 'from25upTo50' | 'from50upTo100' | 'from100upTo150';
  label: string;
  placeholder: string;
}[] = [
  {
    label: 'Up to 25 Pages',
    placeholder: 'Up to 25 Pages',
    name: 'upTo25',
  },
  {
    label: '25 - 50 Pages',
    placeholder: '25 - 50 Pages',
    name: 'from25upTo50',
  },
  {
    label: '50 - 100 Pages',
    placeholder: '50 - 100 Pages',
    name: 'from50upTo100',
  },
  {
    label: '100 - 150 Pages',
    placeholder: '100 - 150 Pages',
    name: 'from100upTo150',
  },
];

const redux = createSelector(
  (state: AppState) => state.paperBinding.bindingErrors,
  (state: AppState) => state.paperBinding.message,
  (state: AppState) => state.paperBinding.status,
  (errors, message, status) => ({ errors, message, status })
);

const AddBinding = () => {
  const [state, setState] = useState(InitialState);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { errors, message, status } = useSelector(redux);
  const dispatch = useThunkDispatch();

  const clearResponse = () => dispatch(resetPaperBindingResponse);

  const inputChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      [name]: name === 'name' ? value : parseFloat(value),
    }));
  };

  const add = () => {
    if (disabled) return;
    setDisabled(true);
    dispatch(addBinding(state));
  };

  useEffect(() => {
    if (status === 200) {
      setState(InitialState);
    }
  }, [status]);

  useEffect(() => {
    setDisabled(false);
  }, [status, errors]);

  useEffect(() => {
    return () => {
      dispatch(resetPaperBindingResponse);
      dispatch(resetBindingErrors);
    };
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Add Binding</title>
        <meta name="description" content="Add Binding page in Print shop app" />
        <meta
          property="og:description"
          content="Add Binding page in Print shop app"
        />
      </Helmet>
      {message && (
        <Alert
          message={message}
          clear={clearResponse}
          className={status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      <div className="row">
        <div className="col-12 card min-height-75vh">
          <div className="card-header">
            <h2 className="title">Add Binding</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <InputWithLabel
                  label="Binding Name"
                  placeholder="Binding Name"
                  type="text"
                  classes="form-control"
                  value={state.name}
                  onChange={inputChange}
                  error={errors.name}
                  name="name"
                />
              </div>
            </div>
            <div className="row">
              {inputs.map(input => (
                <div className="col-md-3 mb-3" key={input.name}>
                  <InputWithLabel
                    {...input}
                    classes="form-control"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={state[input.name]}
                    onChange={inputChange}
                    error={errors[input.name]}
                  />
                </div>
              ))}
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={add}
                  disabled={disabled}
                >
                  Add Binding
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBinding;
