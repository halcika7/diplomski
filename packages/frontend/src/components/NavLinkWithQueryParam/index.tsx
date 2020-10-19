import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  activeClassName: string;
  children: ReactNode;
  className: string;
  to: string;
}

export const NavLinkWithQueryParam: FC<Props> = ({
  activeClassName,
  children,
  className,
  to,
}) => (
  <NavLink
    isActive={(_, { pathname }) => pathname === to.split('?')[0]}
    to={to}
    activeClassName={activeClassName}
    children={children}
    className={className}
  />
);
