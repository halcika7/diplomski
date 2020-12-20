import React from 'react';
import { mount } from 'enzyme';

import GraphSuspense from '@components/UI/Orders/GraphSuspense';

describe('Testing GraphSuspense component', () => {
  it('should render GraphSuspense component', () => {
    const component = mount(
      <GraphSuspense>
        <div />
      </GraphSuspense>
    );

    expect(component.find('div').length).toBe(1);

    component.unmount();
  });
});
