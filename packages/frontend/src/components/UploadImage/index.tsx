/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState, ChangeEvent, FC, useEffect } from 'react';
import * as React from 'react';
import classes from './UploadImage.module.css';

const defaultImage =
  'https://cdn3.iconfinder.com/data/icons/iconic-1/32/plus_alt-256.png';

const readFile = (file: File, cb: (reader: FileReader) => void) => {
  const reader = new FileReader(); // instance of the FileReader
  reader.readAsDataURL(file); // read the local file
  reader.onloadend = function onLoad() {
    cb(reader);
  };
};

interface Props {
  image: File | undefined;
  setImage: (val: File | undefined) => void;
}

const UploadImage: FC<Props> = ({ setImage, image }): JSX.Element => {
  const img = useRef<HTMLImageElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [Image, SetImage] = useState<string>(defaultImage);

  const uploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !files.length || !window.FileReader) return;
    if (!files[0].type.match('image')) return;
    readFile(files[0], () => setImage(files[0]));
  };

  const removePicture = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    input.current!.value = '';
    img.current!.className = `${classes.default}`;
    setImage(undefined);
  };

  useEffect(() => {
    if (!image) {
      SetImage(defaultImage);
      img.current!.className = `${classes.default}`;
      input.current!.value = '';
    }
    if (image && Image === defaultImage) {
      const cb = (reader: FileReader) => {
        SetImage(reader.result as string);
        img.current!.className = `${classes.removed}`;
      };
      readFile(image, cb);
    }
  }, [image, Image]);

  return (
    <>
      <input
        type="file"
        id="file"
        name="file"
        ref={input}
        className={classes.file}
        onChange={uploadChange}
        accept="image/png,image/jpeg,image/gif,image/jpg"
        disabled={!!image}
      />
      <label className={classes.label} htmlFor="file">
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
