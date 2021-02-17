import { useEffect, FC, ChangeEvent, useState, memo } from 'react';
import { Helmet } from 'react-helmet';
import DisabledInput from '@components/UI/Input/DisabledInput';
import ToggleSwitchButton from '@components/UI/Buttons';
import Spinner from '@components/UI/Spinner/Spinner';
import Select from '@components/UI/Select';
import { useParams } from 'react-router';
import {
  getUserToEdit,
  setUserToEdit,
  restUserResponse,
  changeUserRole,
  changeUserBlockStatus,
} from '@actions';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '@dispatch';
import { inputs } from './disabledInputs';

import Alert from '@components/UI/Alert';
import { AnyDictionary, UserRole } from '@job/common';

const redux = createSelector(
  (state: AppState) => state.user.userToEdit,
  (state: AppState) => state.user.message,
  (state: AppState) => state.user.status,
  (user, message, status) => ({ user, message, status })
);

interface Props extends AnyDictionary {
  role?: string;
}

const EditUser: FC<Props> = ({ role }) => {
  const { id } = useParams<{ id: string }>();
  const { user, message, status } = useSelector(redux);
  const dispatch = useThunkDispatch();
  const [newRole, setRole] = useState<string>('');
  const [blocked, setBlocked] = useState<boolean>(false);

  const clearResponse = () => dispatch(restUserResponse);

  const isDisabled = () => !!user && newRole === user.role;

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isDisabled()) return;

    dispatch(changeUserRole(newRole.toLowerCase() as UserRole, id));
  };

  const onChangeBlockStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.checked;
    if (newVal === user?.blocked) return;
    setBlocked(prev => !prev);
    dispatch(changeUserBlockStatus(newVal, user!._id));
  };

  useEffect(() => {
    dispatch(getUserToEdit(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(setUserToEdit(null));
      dispatch(restUserResponse);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setBlocked(user.blocked);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="card min-height-75vh">
        <div className="card-body">
          {!message && <Spinner />}
          {message && <p>{message}</p>}
        </div>
      </div>
    );
  }

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
      {message && (
        <Alert
          message={message}
          clear={clearResponse}
          className={status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      <div className="card min-height-75vh">
        <div className="card-header">
          <h5 className="title">{user.name} Profile</h5>
          <div className="row mt-4">
            <div className="col">
              <img src={user.picture} alt={user.name} />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row mt-4">
            {inputs.map(({ className, label, name }) => (
              <div className={className} key={name}>
                <DisabledInput
                  label={label}
                  name={name}
                  classes="form-control"
                  value={user[name]}
                />
              </div>
            ))}
            <div className="col-md-4 mb-2">
              <span>Facebook Link</span>
              {user.facebookLink ? (
                <a
                  href={user.facebookLink}
                  className="form-control"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.facebookLink}
                </a>
              ) : (
                <span className="form-control">No Facebook Link</span>
              )}
            </div>
            <div className="col-md-4 mb-4">
              <span>Twitter Link</span>
              {user.twitterLink ? (
                <a
                  href={user.twitterLink}
                  className="form-control"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.twitterLink}
                </a>
              ) : (
                <span className="form-control">No Twitter Link</span>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <Select
                value={newRole}
                change={setRole}
                label="Select User Role"
                option="roles"
                disabled={role !== 'admin'}
              />
            </div>
            <div className="col-md-6">
              <ToggleSwitchButton
                value={!!blocked}
                setValue={onChangeBlockStatus}
                name="Disable User"
                disabled={role !== 'admin'}
              />
            </div>
            {role === 'admin' && (
              <div className="col-12">
                <button
                  type="button"
                  className="btn-fill btn btn-primary d-block mt-4 mb-5"
                  onClick={onSubmit}
                  disabled={isDisabled()}
                >
                  Update User Role
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(EditUser);
