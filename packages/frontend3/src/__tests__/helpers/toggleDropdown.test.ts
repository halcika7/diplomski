import { MouseEvent } from 'react';
import { toggleDropdown } from '../../helpers/toggleDropdown';

describe('Testing truncText helper', () => {
  it('test toggle', () => {
    toggleDropdown(
      ({
        currentTarget: { classList: { value: 'kops' } },
        preventDefault: jest.fn,
      } as unknown) as MouseEvent<HTMLElement>,
      jest.fn
    );

    toggleDropdown(
      ({
        currentTarget: {
          classList: { value: 'nav-link toggleDropdown' },
          parentElement: null,
        },
        preventDefault: jest.fn,
      } as unknown) as MouseEvent<HTMLElement>,
      jest.fn
    );

    toggleDropdown(
      ({
        currentTarget: {
          classList: { value: 'nav-link toggleDropdown' },
          parentElement: { classList: { toggle: jest.fn } },
        },
        preventDefault: jest.fn,
      } as unknown) as MouseEvent<HTMLElement>,
      jest.fn
    );
  });
});
