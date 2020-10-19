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

const reduxProps = createSelector(
  (state: AppState) => state.user.userData.email,
  (state: AppState) => state.user.userData.facebookLink,
  (state: AppState) => state.user.userData.name,
  (state: AppState) => state.user.userData.twitterLink,
  (state: AppState) => state.user.userData.picture,
  (state: AppState) => state.user.message,
  (state: AppState) => state.user.status,
  (...props) => props
);

const Profile = () => {
  const dispatch = useThunkDispatch();
  const [email, fblink, name, twlink, picture, message, status] = useSelector(
    reduxProps
  );

  const resetReponse = () => dispatch(restUserResponse());

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
              clear={resetReponse}
              className={status === 200 ? 'alert-success' : 'alert-danger'}
            />
          )}
          <div className="card">
            <div className="card-header">
              <h5 className="title">{name} Profile</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <DisabledInput
                    label="Name"
                    placeholder="Name"
                    classes="form-control"
                    value={name}
                  />
                </div>
                <div className="col-md-6">
                  <DisabledInput
                    label="Email Address"
                    placeholder="Email Address"
                    classes="form-control"
                    value={email}
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
        <RightPart image={picture} name={name} fLink={fblink} tLink={twlink} />
      </div>
    </>
  );
};

export default React.memo(Profile);
