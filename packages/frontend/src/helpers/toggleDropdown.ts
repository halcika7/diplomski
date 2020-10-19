import { Dispatch, MouseEvent, SetStateAction } from 'react';

export const toggleDropdown = (
  e: MouseEvent<HTMLElement>,
  setToggled: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  const { parentElement } = e.currentTarget;
  if (e.currentTarget.classList.value === 'nav-link toggleDropdown') {
    if (!parentElement) return;
    parentElement.classList.toggle('show');
    setToggled(prev => !prev);
  } else {
    setToggled(() => true);
  }
};
