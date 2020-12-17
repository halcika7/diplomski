import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { toggleDropdown } from '../../helpers/toggleDropdown';

interface Props {
  linkName: string;
  linkIcon: string;
  links: { linkName: string; show?: boolean; to: string }[];
}

const DropdownLink: FC<Props> = ({ linkName, linkIcon, links }) => {
  const [toggled, setToggled] = useState<boolean>(true);

  return (
    <li
      className={
        toggled ? 'dropdown dropdown-sidebar' : 'dropdown dropdown-sidebar show'
      }
    >
      <Link
        className="nav-link toggleDropdown"
        onClick={e => toggleDropdown(e, setToggled)}
        to="nothing"
        style={{ display: 'flex' }}
      >
        <i className={linkIcon} />
        <p>{linkName}</p>
        <i className="fas fa-angle-down" />
      </Link>
      <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
        {links.map(
          link =>
            link.show !== false && (
              <Link key={link.linkName} className="dropdown-item" to={link.to}>
                {link.linkName}
              </Link>
            )
        )}
      </div>
    </li>
  );
};

export default React.memo(DropdownLink);
