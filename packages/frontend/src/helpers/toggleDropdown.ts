import { Dispatch, MouseEvent, SetStateAction } from 'react';

export const toggleDropdown = (
  e: MouseEvent<HTMLElement>,
  setToggled: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  if (e.currentTarget.classList.value === 'nav-link toggleDropdown') {
    if (!e.currentTarget.parentElement) return;
    e.currentTarget.parentElement.classList.toggle('show');
    setToggled(prev => !prev);
  } else {
    setToggled(() => true);
  }
};
