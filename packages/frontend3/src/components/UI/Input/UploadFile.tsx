import React, { useRef, useEffect, ChangeEvent, FC } from 'react';
import './UploadFile.css';

interface Props {
  error: string;
  span?: boolean;
  file: File | undefined;
  setFile: (val: File) => void;
}

const UploadFile: FC<Props> = ({ setFile, error, span, file }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const check = (e: ChangeEvent<HTMLInputElement>) => {
    let input = inputRef.current!;
    let label = input.nextElementSibling!,
      labelVal = label.innerHTML;
    if (!e.target || !e.target.files) return;
    let file = e.target.files[0];
    let err = null;
    const types = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
    ];
    if (types.every(type => file.type !== type)) {
      err = 'file not supported';
      spanRef.current!.innerText = err;
    }

    if (err) {
      input.blur();
      return;
    }

    const fileName = e.target.value.split('\\').pop();

    if (fileName) spanRef.current!.innerText = fileName;
    else label.innerHTML = labelVal;

    setFile(file);
  };

  useEffect(() => {
    if (error) {
      spanRef.current!.innerText = error;
    }
  }, [error]);

  useEffect(() => {
    if (span || !file) {
      spanRef.current!.innerText = '';
    }
  }, [span, file]);

  return (
    <div className="box mb-4">
      <input
        ref={inputRef}
        type="file"
        name="file-6"
        id="file-6"
        className={
          error ? 'inputfile inputfile-5 invalid' : 'inputfile inputfile-5'
        }
        onChange={check}
        accept=".docx,.pdf
                                ,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
      />
      <label htmlFor="file-6">
        <figure>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="17"
            viewBox="0 0 20 17"
          >
            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
          </svg>
        </figure>{' '}
      </label>
      <span ref={spanRef} className={error ? 'options-error' : ''} />
    </div>
  );
};

export default UploadFile;
