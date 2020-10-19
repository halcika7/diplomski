import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import Alert from '@components/UI/Alert';
import ToggleSwitchButton from '@components/UI/Buttons';
import Spinner from '@components/UI/Spinner/Spinner';
import Select from '@components/UI/Select';

const EditUser = (props: any) => {
  const id = new URLSearchParams(props.location.search).get('id');
  const [user, setUser] = useState<any>({});
  const [role, setRole] = useState<any>('');
  const [blocked, setBlocked] = useState<any>('');

  useEffect(() => {
    props.getUserAction(id, props.history.push);
    return () => {
      props.clearMessages();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.getUserAction(id, props.history.push);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.search]);

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
      setRole(props.user.role);
      setBlocked(props.user.blocked);
    }
  }, [props.user]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    props.editUserAction(id, role, blocked, props.history.push);
  };

  return (
    <>
      <Helmet>
        <title>Edit User</title>
        <meta name="description" content="Edit User page in Print shop app" />
        <meta
          property="og:description"
          content="Edit User page in Print shop app"
        />
      </Helmet>
      {props.editUser.successMessage && (
        <Alert
          message={props.editUser.successMessage}
          clear={props.clearMessages}
          className="success-alert"
        />
      )}
      {props.editUser.failedMessage && (
        <Alert
          message={props.editUser.failedMessage}
          clear={props.clearMessages}
        />
      )}
      {props.loading || Object.keys(user).length === 0 ? (
        <div
          className="card"
          style={{
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="card-body">
            <Spinner />
          </div>
        </div>
      ) : !props.failedMessage ? (
        <div className="card">
          <div className="card-header">
            <h5 className="title">{user.name} Profile</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-2">
                <InputWithLabel
                  label="User ID"
                  disabled
                  placeholder="ID"
                  type="text"
                  classes="form-control"
                  value={user._id ? user._id : ''}
                />
              </div>
              <div className="col-md-6 mb-2">
                <InputWithLabel
                  label="User Google ID"
                  disabled
                  placeholder="User Google ID"
                  type="text"
                  classes="form-control"
                  value={user.googleID ? user.googleID : ''}
                />
              </div>
              <div className="col-md-6 mb-2">
                <InputWithLabel
                  label="Name"
                  disabled
                  placeholder="Name"
                  type="text"
                  classes="form-control"
                  value={user.name ? user.name : ''}
                />
              </div>
              <div className="col-md-6 mb-2">
                <InputWithLabel
                  label="Email Address"
                  disabled
                  placeholder="Email Address"
                  type="email"
                  classes="form-control"
                  value={user.email ? user.email : ''}
                />
              </div>
              <div className="col-md-4 mb-2">
                <InputWithLabel
                  label="Phone Number"
                  disabled
                  placeholder="Phone Number"
                  type="tel"
                  classes="form-control"
                  value={user.phone ? user.phone : ''}
                />
              </div>
              <div className="col-md-4 mb-2">
                <label>Facebook Link</label>
                {user.facebookLink ? (
                  <a
                    href={user.facebookLink}
                    className="form-control"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.name} Facebook Link - {user.facebookLink}
                  </a>
                ) : (
                  <span className="form-control">No Facebook Link</span>
                )}
              </div>
              <div className="col-md-4 mb-2">
                <label>Twitter Link</label>
                {user.twitterLink ? (
                  <a
                    href={user.twitterLink}
                    className="form-control"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.name} Facebook Link - {user.twitterLink}
                  </a>
                ) : (
                  <span className="form-control">No Twitter Link</span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Select
                  value={role}
                  change={setRole}
                  label="Select User Role"
                  option={'roles'}
                  disabled={props.role === 'admin' ? false : true}
                />
              </div>
              <div className="col-md-6">
                <ToggleSwitchButton
                  value={blocked !== '' ? blocked : false}
                  setValue={setBlocked}
                  name="Disable User"
                  disabled={props.role === 'admin' ? false : true}
                />
              </div>
              {props.role === 'admin' && (
                <div className="col-12">
                  <button
                    type="button"
                    className="btn-fill btn btn-primary d-block mt-4 mb-5"
                    onClick={onSubmit}
                  >
                    Update User Role
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">{props.failedMessage}</div>
        </div>
      )}
    </>
  );
};

export default React.memo(EditUser
);
