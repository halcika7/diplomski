import React, { useRef, useState, ChangeEvent } from 'react';
import { useEffect } from 'react';
import classes from './UploadImage.module.css';

const defaultImage =
  'https://cdn3.iconfinder.com/data/icons/iconic-1/32/plus_alt-256.png';

const readFile = (file: File, cb: (reader: FileReader) => void) => {
  const reader = new FileReader(); // instance of the FileReader
  reader.readAsDataURL(file); // read the local file
  reader.onloadend = function () {
    cb(reader);
  };
};

const UploadImage = ({ setImage, image }: any) => {
  const img = useRef<any>();
  const input = useRef<any>();
  const [Image, SetImage] = useState<string>(defaultImage);

  const uploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !files.length || !window.FileReader) return;
    if (!files[0].type.match('image')) return;
    readFile(files[0], () => setImage(() => files[0]));
  };

  const removePicture = (e: any) => {
    e.preventDefault();
    input.current.value = '';
    img.current.classList = `${classes.default}`;
    setImage(undefined);
  };

  useEffect(() => {
    if (!image && Image !== defaultImage) {
      SetImage(defaultImage);
      img.current.classList = `${classes.default}`;
      input.current.value = '';
    }
    if (image && Image === defaultImage) {
      const cb = (reader: FileReader) => {
        SetImage(reader.result as string);
        img.current.classList = `${classes.removed}`;
      };
      readFile(image, cb);
    }
  }, [image, Image]);

  return (
    <>
      <input
        type="file"
        id="file1"
        ref={input}
        className={classes.file}
        onChange={uploadChange}
        accept="image/png,image/jpeg,image/gif,image/jpg"
      />
      <label htmlFor="file1" className={classes.label}>
        <img
          ref={img}
          src={Image}
          className={classes.default}
          alt="upload"
          height="100"
          width="100"
        />
        <button type="button" onClick={removePicture}>
          X
        </button>
      </label>
    </>
  );
};

export default React.memo(UploadImage);
