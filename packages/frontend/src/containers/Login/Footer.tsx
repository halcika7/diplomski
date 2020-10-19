import React from 'react';

import printShopImg from '@images/PRINTSHOP18.jpg';
import GoogleLoginButton from './GoogleLoginButton';

const Footer = () => (
  <div
    className="container-fluid whyus"
    style={{ borderTop: '1px solid #111' }}
  >
    <div className="container">
      <ul className="navbar-nav w-100 d-flex flex-row pr-0 pl-0 pt-5 pb-5 flex-wrap flex-md-nowrap">
        <li className="nav-item p-0">
          <a
            className="navbar-brand mr-5 ml-0 text-dark"
            href="/"
            onClick={e => e.preventDefault()}
          >
            <img
              className="mr-2 z-depth-4"
              src={printShopImg}
              alt="badge"
              height="80"
              width="80"
            />
            Print Shop
          </a>
          <div className="mt-3 mb-3">
            <i className="fas fa-map-marker-alt mr-2 text-dark"></i>
            Sarajevo, Bosnia and Herzegovina, Semira FRaste 6
          </div>
          <div className="mt-3 mb-3">
            <i className="fas fa-phone mr-2 text-dark"></i>
            +387-33-000-000
          </div>
          <div className="mt-3 mb-3">
            <i className="fas fa-envelope mr-2 text-dark"></i>
            printshop@ibu.edu.ba
          </div>
        </li>
        <li className="nav-item ml-md-auto mt-3 mt-md-0 p-0">
          <GoogleLoginButton />
        </li>
      </ul>
      <p className="text-center pt-3 pb-3">
        {' '}
        © 2019 made with <i className="tim-icons icon-heart-2" /> by Haris
        Beslic.
      </p>
    </div>
  </div>
);

export default React.memo(Footer);
