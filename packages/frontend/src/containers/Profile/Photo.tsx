import { useState, useEffect, MouseEvent } from 'react';
import UploadImage from '@components/UploadImage';
import { updateProfilePicture, restUserResponse } from '@actions';
import { useThunkDispatch } from '@dispatch';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import Alert from '@components/UI/Alert';

const reduxProps = createSelector(
  (state: AppState) => state.user.message,
  message => message
);

const PhotoUpload = () => {
  const dispatch = useThunkDispatch();
  const [image, setImage] = useState<File>();
  const [updating, setUpdating] = useState<boolean>(false);
  const message = useSelector(reduxProps);
  const [frontMessage, setFrontMessage] = useState<string>('');

  const onFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUpdating(prev => !prev);
    setFrontMessage('');
    dispatch(restUserResponse);

    const formData = new FormData();
    formData.append('image', (image as unknown) as string);
    dispatch(updateProfilePicture(formData));
  };

  const clear = () => setFrontMessage('');

  useEffect(() => {
    if (message === 'Profile image successfully updated') {
      setImage(undefined);
      setUpdating(prev => !prev);
    } else if (
      message ===
        'File is not supported. Only JPG, PNG and GIF files are supported' ||
      message === 'Image is required'
    ) {
      setFrontMessage(message);
      setUpdating(prev => !prev);
    }
  }, [message]);

  return (
    <div className="col-12">
      {frontMessage && (
        <Alert clear={clear} message={frontMessage} className="alert-danger" />
      )}
      <span className="d-block w-100 mb-3">Change Profile Picture</span>
      <UploadImage
        setImage={setImage}
        image={image}
        setMessage={setFrontMessage}
      />
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
