import React, { useState, useEffect,MouseEvent } from 'react';
import UploadImage from '@components/UploadImage/UploadImage';
import { updateProfilePicture, restUserResponse } from '@actions';
import { useThunkDispatch } from '@dispatch';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';

const reduxProps = createSelector(
  (state: AppState) => state.user.message,
  message => message
);

const PhotoUpload = () => {
  const dispatch = useThunkDispatch();
  const [image, setImage] = useState<File>();
  const [updating, setUpdating] = useState<boolean>(false);
  const message = useSelector(reduxProps);

  const onFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUpdating(prev => !prev);
    dispatch(restUserResponse);

    const formData = new FormData();
    formData.append('image', image as unknown as string);
    dispatch(updateProfilePicture(formData));
  };

  useEffect(() => {
    if (message === 'Profile image successfully updated') {
      setImage(undefined);
      setUpdating(prev => !prev);
    } else if (
      message ===
        'File is not supported. Only JPG, PNG and GIF files are supported' ||
      message === 'Image is required'
    ) {
      setUpdating(prev => !prev);
    }
  }, [message]);

  return (
    <div className="col-12">
      <label className="d-block w-100 mb-3">Change Profile Picture</label>
      <UploadImage setImage={setImage} image={image} />
      <button
        type="button"
        className="btn btn btn-primary d-block mt-3 mb-3"
        onClick={onFormSubmit}
        disabled={updating || !image}
      >
        Update Picture
      </button>
    </div>
  );
};

export default PhotoUpload;
