import { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import { restUserResponse, updateInfo } from '@actions';
import { useThunkDispatch } from '@dispatch';
import { ProfileErrors } from '@reducers/user';

const reduxProps = createSelector(
  (state: AppState) => state.user.userData,
  (state: AppState) => state.user.profileErrors,
  (state: AppState) => state.user.status,
  (userData, profileErrors, status) => ({
    userData,
    profileErrors,
    status,
  })
);

const facebookRegex = new RegExp('http(?:s)://(?:www.)facebook.com/');
const twitterRegex = new RegExp('http(?:s)://twitter.com/');
const phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/);

type Key = 'twitterLink' | 'facebookLink' | 'phone';

const ProfileForm = () => {
  const dispatch = useThunkDispatch();
  const { userData, profileErrors, status } = useSelector(reduxProps);
  const [state, setState] = useState<ProfileErrors>({
    twitterLink: '',
    facebookLink: '',
    phone: '',
  });
  const [updating, setUpdating] = useState<boolean>(false);
  const [errors, setErrors] = useState<ProfileErrors>(profileErrors);

  const isDisabled = () => {
    const hasErrors = Object.values(errors).some(value => value !== '');
    if (
      (userData.facebookLink === state.facebookLink &&
        userData.twitterLink === state.twitterLink &&
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

    if (name === 'facebookLink') {
      const isValid = facebookRegex.test(value);
      setErrors(prev => ({
        ...prev,
        [name]: isValid ? '' : 'Facebook link is not valid.',
      }));
    }

    if (name === 'twitterLink') {
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
    setState({ ...state, [name]: value });
  };

  const resetResponse = () => dispatch(restUserResponse);

  const updateProfile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDisabled()) return;

    const info = {} as Partial<ProfileErrors>;

    Object.entries(state).forEach(([key, value]) => {
      if (value && userData[key as Key] !== value) {
        info[key as Key] = value;
      }
    });

    if (Object.keys(info).length === 0) return;

    resetResponse();
    setUpdating(true);
    dispatch(updateInfo(info));
  };

  useEffect(() => {
    if (userData.facebookLink !== undefined) {
      setState(() => ({
        twitterLink: userData.twitterLink,
        facebookLink: userData.facebookLink,
        phone: userData.phone,
      }));
    }
  }, [userData]);

  useEffect(() => {
    setErrors({ ...profileErrors });
  }, [profileErrors]);

  useEffect(() => {
    if (status) {
      setUpdating(prev => !prev);
    }
  }, [status]);

  return (
    <>
      <div className="col-md-4">
        <InputWithLabel
          label="Facebook Link"
          placeholder="Facebook Link"
          type="text"
          classes="form-control"
          onChange={changeInput}
          value={state.facebookLink}
          error={errors.facebookLink}
          name="facebookLink"
        />
      </div>
      <div className="col-md-4">
        <InputWithLabel
          label="Twitter"
          placeholder="Twitter Link"
          type="text"
          classes="form-control"
          onChange={changeInput}
          value={state.twitterLink}
          error={errors.twitterLink}
          name="twitterLink"
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
