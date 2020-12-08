import React, { useState, ChangeEvent, useEffect } from 'react';
import Select from '@components/UI/Select';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import { useThunkDispatch } from '@dispatch';
import { addUser, resetAddUserErrors, restUserResponse } from '@actions';
import { Helmet } from 'react-helmet';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import Alert from '@components/UI/Alert';

const redux = createSelector(
  (state: AppState) => state.user.addUserErrors,
  (state: AppState) => state.user.message,
  (state: AppState) => state.user.status,
  (errors, message, status) => ({ errors, message, status })
);

const AddUser = () => {
  const { errors, message, status } = useSelector(redux);
  const [role, setRole] = useState<string>('professor');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useThunkDispatch();

  const inputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
  };

  const clearMessage = () => dispatch(restUserResponse);

  const add = () => {
    if (disabled) return;
    clearMessage();
    setDisabled(true);
    dispatch(addUser({ role, email }));
  };


  useEffect(() => {
    return () => {
      dispatch(restUserResponse);
      dispatch(resetAddUserErrors);
    };
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      setDisabled(false);
    }

    if(status === 200) {
      setEmail('')
      setRole('professor')
    }
  }, [status]);

  return (
    <>
      <Helmet>
        <title>Add User</title>
        <meta
          name="description"
          content="Add User page in Print Shop Web App"
        />
        <meta
          property="og:description"
          content="Add User page in Print Shop Web App"
        />
      </Helmet>
      {message && (
        <Alert
          message={message}
          clear={clearMessage}
          className={status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      <div className="row">
        <div className="col-12">
          <div className="card min-height-75vh">
            <div className="card-header">
              <h5 className="title">Add new Order</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <InputWithLabel
                    label="User Email"
                    placeholder="User Email"
                    type="email"
                    classes="form-control"
                    value={email}
                    onChange={inputChange}
                    error={errors.email}
                    name="email"
                  />
                </div>
                <div className="col-lg-4 mb-3">
                  <Select
                    value={role}
                    change={setRole}
                    label="Select User Role"
                    option={'roles'}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={add}
                    disabled={disabled}
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
