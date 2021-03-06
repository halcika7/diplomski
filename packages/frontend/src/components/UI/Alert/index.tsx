import { memo, FC } from 'react';

interface Props {
  message: string;
  clear: () => void;
  className?: string;
}

const Alert: FC<Props> = ({ message, clear, className = 'alert-danger' }) => (
  <div
    className={`alert ${className} alert-dismissible fade show`}
    role="alert"
  >
    {message}
    <button type="button" className="close" onClick={clear}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

export default memo(Alert);
