import React, { useState, ChangeEvent, useEffect } from 'react';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import { AppState } from '@reducers';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  addPaper,
  resetPaperBindingResponse,
  resetPaperErrors,
} from '@actions';
import { useThunkDispatch } from '@dispatch';
import Alert from '@components/UI/Alert';

const InitialState = {
  name: '',
  blackWhitePrinting: {
    upTo250: 0.1,
    from250upTo500: 0.2,
    from500upTo1000: 0.3,
    from1000: 0.4,
  },
  colorPrinting: {
    upTo250: 0.1,
    from250upTo500: 0.2,
    from500upTo1000: 0.3,
    from1000: 0.4,
  },
};

const inputs: {
  name: 'upTo250' | 'from250upTo500' | 'from500upTo1000' | 'from1000';
  label: string;
  placeholder: string;
}[] = [
  {
    label: 'Up to 250 Pages',
    placeholder: 'Up to 250 Pages',
    name: 'upTo250',
  },
  {
    label: '250 - 500 Pages',
    placeholder: '250 - 500 Pages',
    name: 'from250upTo500',
  },
  {
    label: '500 - 1000 Pages',
    placeholder: '500 - 1000 Pages',
    name: 'from500upTo1000',
  },
  {
    label: '1000+ Pages',
    placeholder: '1000+ Pages',
    name: 'from1000',
  },
];

const redux = createSelector(
  (state: AppState) => state.paperBinding.paperErrors,
  (state: AppState) => state.paperBinding.message,
  (state: AppState) => state.paperBinding.status,
  (errors, message, status) => ({ errors, message, status })
);

const AddPaper = () => {
  const [state, setState] = useState(InitialState);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { errors, message, status } = useSelector(redux);
  const dispatch = useThunkDispatch();

  const clearResponse = () => dispatch(resetPaperBindingResponse);

  const inputChange = (type: 'blackWhitePrinting' | 'colorPrinting') => ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      [type]: { ...prev[type], [name]: parseFloat(value) },
    }));
  };

  const changeName = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

  const add = () => {
    if (disabled) return;
    setDisabled(true);
    dispatch(addPaper(state));
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
      dispatch(resetPaperErrors);
    };
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Add Paper</title>
        <meta name="description" content="Add Paper page in Print shop app" />
        <meta
          property="og:description"
          content="Add Paper page in Print shop app"
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
            <h2 className="title">Add Paper</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <InputWithLabel
                  label="Paper Name"
                  placeholder="Paper Name"
                  type="text"
                  classes="form-control"
                  value={state.name}
                  onChange={changeName}
                  error={errors.name}
                  name="name"
                />
              </div>
            </div>
            <h4>Black/White</h4>
            <div className="row">
              {inputs.map(input => (
                <div className="col-md-3 mb-3" key={input.name}>
                  <InputWithLabel
                    {...input}
                    classes="form-control"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={state.blackWhitePrinting[input.name]}
                    onChange={inputChange('blackWhitePrinting')}
                    error={errors.blackWhitePrinting[input.name]}
                  />
                </div>
              ))}
            </div>
            <h4>Color</h4>
            <div className="row">
              {inputs.map(input => (
                <div className="col-md-3 mb-3" key={input.name}>
                  <InputWithLabel
                    {...input}
                    classes="form-control"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={state.colorPrinting[input.name]}
                    onChange={inputChange('colorPrinting')}
                    error={errors.colorPrinting[input.name]}
                  />
                </div>
              ))}
            </div>
            <div className="row">
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

export default AddPaper;
