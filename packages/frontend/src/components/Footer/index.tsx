import { memo } from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid">
      <div className="copyright">
        © 2019 - {new Date().getFullYear()} made with{' '}
        <i className="tim-icons icon-heart-2" /> by Haris Beslic.
      </div>
    </div>
  </footer>
);

export default memo(Footer);
