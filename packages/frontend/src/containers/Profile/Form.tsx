import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import { restUserResponse } from '@actions';
import { useThunkDispatch } from '@dispatch';
import { ProfileErrors } from '@reducers/user';

const reduxProps = createSelector(
  (state: AppState) => state.user.userData,
  (state: AppState) => state.user.profileErrors,
  (userData, profileErrors) => ({ userData, profileErrors })
);

const facebookRegex = new RegExp('http(?:s)://(?:www.)facebook.com/');
const twitterRegex = new RegExp('http(?:s)://twitter.com/');
const phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/);

const ProfileForm = () => {
  const dispatch = useThunkDispatch();
  const { userData, profileErrors } = useSelector(reduxProps);
  const [state, setSatate] = useState<ProfileErrors>({
    twitter: '',
    facebook: '',
    phone: '',
  });
  const [updating, setUpdating] = useState<boolean>(false);
  const [errors, setErrors] = useState<ProfileErrors>(profileErrors);

  const updateProfile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(restUserResponse());
    setUpdating(true);
    // props.updateProfile(id, fLink, tLink, phone, props.history.push);
  };

  const isDisabled = () => {
    const hasErrors = Object.values(errors).some(value => value !== '');
    if (
      (userData.facebookLink === state.facebook &&
        userData.twitterLink === state.twitter &&
        userData.phone === state.phone) ||
      updating ||
      hasErrors
    ) {
      return true;
    }

    return false;
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === 'facebook') {
      const isValid = facebookRegex.test(value);
      setErrors(prev => ({
        ...prev,
        [name]: isValid ? '' : 'Facebook link is not valid.',
      }));
    }

    if (name === 'twitter') {
      const isValid = twitterRegex.test(value);
      setErrors(prev => ({
        ...prev,
        [name]: isValid ? '' : 'Twitter link is not valid.',
      }));
    }

    if (name === 'phone') {
      const isValid = phoneRegex.test(value);
      setErrors(prev => ({
        ...prev,
        [name]: isValid ? '' : 'Phone number is not valid.',
      }));
    }
    setSatate(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (userData.facebookLink !== undefined) {
      setSatate({
        twitter: userData.twitterLink,
        facebook: userData.facebookLink,
        phone: userData.phone,
      });
    }
  }, [userData]);

  return (
    <>
      <div className="col-md-4">
        <InputWithLabel
          label="Facebook Link"
          placeholder="Facebook Link"
          type="text"
          classes="form-control"
          onChange={changeInput}
          value={state.facebook}
          error={errors.facebook}
          name="facebook"
        />
      </div>
      <div className="col-md-4">
        <InputWithLabel
          label="Twitter"
          placeholder="Twitter Link"
          type="text"
          classes="form-control"
          onChange={changeInput}
          value={state.twitter}
          error={errors.twitter}
          name="twitter"
        />
      </div>
      <div className="col-md-4">
        <InputWithLabel
          label="Phone Number"
          placeholder="Phone Number"
          type="tel"
          classes="form-control"
          onChange={changeInput}
          value={state.phone}
          error={errors.phone}
          name="phone"
        />
      </div>
      <div className="col-12">
        <button
          type="button"
          className="btn btn btn-primary d-block mt-4 mb-5"
          onClick={updateProfile}
          disabled={isDisabled()}
        >
          Update Info
        </button>
      </div>
    </>
  );
};

export default ProfileForm;
