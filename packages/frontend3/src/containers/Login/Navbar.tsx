import React from 'react';
import printShopImg from '@images/PRINTSHOP18.jpg';
import GoogleLoginButton from './GoogleLoginButton';

const Navbar = () => (
  <div
    className="container-fluid p-0"
    style={{ borderBottom: '1px solid #111', backgroundColor: '#FFFDF0' }}
  >
    <nav
      className="navbar navbar-expand-lg container"
      style={{ backgroundColor: '#FFFDF0' }}
    >
      <button
        aria-expanded="false"
        className="navbar-toggler"
        data-target="#navigation"
        data-toggle="collapse"
        type="button"
      >
        <span className="navbar-toggler-bar navbar-kebab bg-dark" />
        <span className="navbar-toggler-bar navbar-kebab bg-dark" />
        <span className="navbar-toggler-bar navbar-kebab bg-dark" />
      </button>
      <div className="collapse navbar-collapse conainer" id="navigation">
        <ul className="navbar-nav w-100">
          <li className="nav-item mr-auto mt-2 mt-lg-0">
            <a
              className="navbar-brand mr-5 ml-0 text-dark"
              href="/"
              onClick={e => e.preventDefault()}
            >
              <img
                className="mr-2 z-depth-4"
                src={printShopImg}
                alt="badge"
                height="40"
                width="40"
              />
              Print Shop
            </a>
          </li>
          <li className="nav-item ml-lg-auto mt-2 mt-lg-0">
            <GoogleLoginButton />
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default React.memo(Navbar);
