import { memo, FC } from 'react';

// components
import { NavLink } from 'react-router-dom';
import DropdownLink from './DropdownLink';

// hooks
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

// types
import { AppState } from '../../redux/reducers/index';

import './Sidebaricons.css';

interface Props {
  role: string;
}

const reduxProps = createSelector(
  (state: AppState) => state.user.userData.name,
  (state: AppState) => state.user.userData.picture,
  (name, picture) => ({ name, picture })
);

const Sidebar: FC<Props> = ({ role }) => {
  const { name, picture } = useSelector(reduxProps);
  return (
    <div className="sidebar" data-color="blue">
      <div className="sidebar-wrapper">
        <div className="logo">
          <NavLink to="/profile" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={picture} alt={name} />
            </div>
          </NavLink>
          <NavLink to="/profile" className="simple-text logo-normal">
            {name}
          </NavLink>
        </div>
        <ul className="nav">
          <li>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/dashboard"
              exact
            >
              <i className="tim-icons icon-chart-pie-36" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/profile"
            >
              <i className="tim-icons icon-single-02" />
              <p>User Profile</p>
            </NavLink>
          </li>
          {role !== 'admin' && role !== 'worker' && (
            <li>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/pricing"
                exact
              >
                <i className="tim-icons icon-atom" />
                <p>Pricing</p>
              </NavLink>
            </li>
          )}
          {(role === 'admin' || role === 'worker') && (
            <>
              <DropdownLink
                linkIcon="fas fa-users"
                linkName="Users"
                links={[
                  { to: '/users', linkName: 'All Users' },
                  { to: '/employees', linkName: 'Employees' },
                  { to: '/professors', linkName: 'Professors' },
                  { to: '/administration', linkName: 'Administration' },
                  { to: '/admins', linkName: 'Admins' },
                  {
                    to: '/add-user',
                    linkName: 'Add User',
                    show: role === 'admin',
                  },
                ]}
              />
              <DropdownLink
                linkIcon="fas fa-tags"
                linkName="Price"
                links={[
                  { to: '/papers', linkName: 'Paper Price' },
                  { to: '/bindings', linkName: 'Binding Price' },
                  { to: '/add-binding', linkName: 'Add Binding' },
                  { to: '/add-paper', linkName: 'Add Paper' },
                ]}
              />
              <li>
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/files"
                  exact
                >
                  <i className="far fa-file-alt" />
                  <p>Files</p>
                </NavLink>
              </li>
            </>
          )}
          <DropdownLink
            linkIcon="fas fa-box"
            linkName="Orders"
            links={[
              { to: '/all-orders', linkName: 'All Orders' },
              {
                to: '/new-orders',
                linkName: 'New Orders',
                show: role === 'worker' || role === 'admin',
              },
              { to: '/completed-orders', linkName: 'Completed Orders' },
              { to: '/pending-orders', linkName: 'Pending Orders' },
              { to: '/rejected-orders', linkName: 'Rejected Orders' },
              { to: '/unpaid-orders', linkName: 'Unpaid Orders' },
              {
                to: '/add-order',
                linkName: 'New Order',
                show: role === 'professor',
              },
            ]}
          />
        </ul>
      </div>
    </div>
  );
};

export default memo(Sidebar);
