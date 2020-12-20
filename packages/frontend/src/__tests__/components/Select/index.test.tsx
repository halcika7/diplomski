import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ReactSelect from 'react-select';

import Select from '@components/UI/Select';

describe('Testing Select component', () => {
  it('should render Select component', () => {
    const component = mount(
      <Select
        label="sjsidofj"
        value=""
        error="adfosd"
        values={['ajfoijdof']}
        change={jest.fn()}
      />
    );

    expect(component.find('label').length).toBe(1);

    component.find(ReactSelect).simulate('change', {
      label: 'djisfojsidof',
    });

    act(() => {
      component.find(ReactSelect).prop('onChange')({
        label: '2',
        value: '2',
      });

      component.update();

      component.unmount();
    });
  });

  it('should render Select component with option', () => {
    const component = mount(
      <Select
        label="sjsidofj"
        value="jafiodjd"
        values={['ajfoijdof']}
        change={jest.fn()}
        option="roles"
        disabled
      />
    );

    expect(component.find('label').length).toBe(1);

    component.unmount();
  });

  it('should render Select component with valuesWithoutMap', () => {
    const component = mount(
      <Select
        label="sjsidofj"
        value="jafiodjd"
        valuesWithoutMap={[{ label: '', value: '' }]}
        change={jest.fn()}
        option="roles"
      />
    );

    expect(component.find('label').length).toBe(1);

    component.unmount();
  });
});
