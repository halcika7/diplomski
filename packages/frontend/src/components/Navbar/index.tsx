import React, { useState } from 'react';

// components
import { Link } from 'react-router-dom';

// hooks
import { useThunkDispatch } from '../../redux/AppThunkDispatch';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

// actions
import { logoutUser as logoutAction } from '../../redux/actions';

// types
import { AppState } from '../../redux/reducers/index';

interface Props {
  role: string;
}

const reduxProps = createSelector(
  (state: AppState) => state.user.userData.name,
  (state: AppState) => state.user.userData.picture,
  (name, picture) => ({ name, picture })
);

const Navbar = ({ role }: Props) => {
  const dispatch = useThunkDispatch();
  const { name, picture } = useSelector(reduxProps);
  const [unseenNotifications] = useState(0);
  const [, setShowNotifications] = useState(false);

  const toggleSidebar = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    document.querySelector('html')?.classList.toggle('nav-open');
    e.currentTarget.classList.toggle('toggled');
  };

  const onLogout = () => dispatch(logoutAction);

  const toggleNotifications = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.classList.toggle('show');
      setShowNotifications(prev => !prev);
    }
  };

  return (
    <div
      className="navbar-light bg-white fixed-top navbar navbar-expand-lg"
      style={{ borderTop: '2px solid #1d8cf8' }}
    >
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <div className="navbar-toggle d-inline">
            <button
              className="navbar-toggler"
              type="button"
              name="sidebar toggler"
              onClick={toggleSidebar}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Link to="/" className="navbar-brand">
            Dashboard
          </Link>
        </div>
        <button
          name="navbar-toggler"
          aria-expanded="false"
          className="navbar-toggler"
          data-target="#navigation"
          data-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </button>
        <div className="collapse navbar-collapse" id="navigation">
          <ul className="ml-auto navbar-nav">
            {role !== 'admin' && (
              <li className="dropdown nav-item">
                <a
                  aria-label="Show Notifications"
                  href="/"
                  className="dropdown-toggle nav-link notification"
                  onClick={toggleNotifications}
                >
                  {unseenNotifications > 0 && (
                    <span className="number">{unseenNotifications}</span>
                  )}
                  <i className="far fa-bell" />
                  <p className="d-lg-none">Notifications</p>
                </a>
              </li>
            )}
            <li className="dropdown nav-item">
              <a
                role="button"
                aria-label="Options"
                data-toggle="dropdown"
                aria-haspopup="true"
                href="/"
                className="dropdown-toggle nav-link"
                aria-expanded="false"
              >
                <div className="photo">
                  <img alt={name} src={picture} />
                </div>
                <b className="caret d-none d-lg-block d-xl-block" />
                <p className="d-lg-none">{name}</p>
              </a>
              <ul
                tabIndex={-1}
                role="menu"
                aria-hidden="true"
                className="dropdown-navbar dropdown-menu dropdown-menu-right"
              >
                <li className="nav-link">
                  <Link
                    to={`/profile`}
                    className="nav-item dropdown-item whiteMax"
                  >
                    Profile
                  </Link>
                </li>
                <li tabIndex={-1} className="dropdown-divider whiteMax" />
                <li className="nav-link">
                  <button
                    type="button"
                    className="nav-item dropdown-item whiteMax cursor-pointer"
                    onClick={onLogout}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </li>
            <li className="separator d-lg-none" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
