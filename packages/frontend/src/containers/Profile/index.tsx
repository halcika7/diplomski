import React from 'react';
import { Helmet } from 'react-helmet';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import RightPart from './RightPart';
import { restUserResponse } from '@actions';
import { useThunkDispatch } from '@dispatch';
import Alert from '@components/UI/Alert';
import PhotoUpload from './Photo';
import ProfileForm from './Form';
import DisabledInput from '@components/UI/Input/DisabledInput';
import { useEffect } from 'react';

const reduxProps = createSelector(
  (state: AppState) => state.user.userData,
  (state: AppState) => state.user.message,
  (state: AppState) => state.user.status,
  (...props) => props
);

const Profile = () => {
  const dispatch = useThunkDispatch();
  const [user, message, status] = useSelector(reduxProps);

  const resetResponse = () => dispatch(restUserResponse());

  useEffect(() => {
    return () => {
      dispatch(restUserResponse());
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile page in Print shop app" />
        <meta
          property="og:description"
          content="Profile page in Print shop app"
        />
      </Helmet>
      <div className="row">
        <div className="col-md-8">
          {message && (
            <Alert
              message={message}
              clear={resetResponse}
              className={status === 200 ? 'alert-success' : 'alert-danger'}
            />
          )}
          <div className="card">
            <div className="card-header">
              <h5 className="title">{user.name} Profile</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <DisabledInput
                    label="Name"
                    name="Name"
                    classes="form-control"
                    value={user.name}
                  />
                </div>
                <div className="col-md-6">
                  <DisabledInput
                    label="Email Address"
                    name="Email Address"
                    classes="form-control"
                    value={user.email}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <ProfileForm />
                <PhotoUpload />
              </div>
            </div>
          </div>
        </div>
        <RightPart
          image={user.picture}
          name={user.name}
          fLink={user.facebookLink}
          tLink={user.twitterLink}
        />
      </div>
    </>
  );
};

export default React.memo(Profile);
