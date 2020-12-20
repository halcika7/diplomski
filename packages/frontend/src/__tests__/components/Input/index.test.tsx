import { mount } from 'enzyme';
import { MockFile } from '../../__mocks__/makeFileMock';

import DisabledInput from '@components/UI/Input/DisabledInput';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import UploadFile from '@components/UI/Input/UploadFile';

const change = jest.fn();

describe('Testing Input component', () => {
  it('should render disabled input', () => {
    const component = mount(
      <DisabledInput label="njjn" name="name" classes="lg" value="" />
    );

    expect(component.find('div').length).toBe(1);
    expect(component.find('label').length).toBe(1);

    component.unmount();
  });

  it('should render input with label with classes', () => {
    const component = mount(
      <InputWithLabel
        label="njjn"
        name="name"
        classes="lg"
        value=""
        type="email"
        onChange={change}
        error="ojsdof"
        placeholder="ojsdof"
      />
    );

    expect(component.find('div').length).toBe(1);
    expect(component.find('label').length).toBe(1);
    expect(component.find('input').length).toBe(1);

    component.unmount();
  });

  it('should render input with label without classes', () => {
    const component = mount(
      <InputWithLabel
        label="njjn"
        name="name"
        value=""
        type="email"
        onChange={change}
        error="ojsdof"
        placeholder="ojsdof"
      />
    );

    expect(component.find('div').length).toBe(1);
    expect(component.find('label').length).toBe(1);
    expect(component.find('input').length).toBe(1);

    component.unmount();
  });

  it('should render upload file component', () => {
    const component = mount(
      <UploadFile error="ojsdof" setFile={change} file={undefined} />
    );

    expect(component.find('div').length).toBe(1);
    expect(component.find('label').length).toBe(1);
    expect(component.find('input').length).toBe(1);

    component.unmount();
  });

  it('should render upload file component with file', () => {
    const mock = new MockFile();
    const file = mock.create('application/pdf');
    const component = mount(
      <UploadFile error="ojsdof" setFile={change} file={file} />
    );

    expect(component.find('div').length).toBe(1);
    expect(component.find('label').length).toBe(1);
    expect(component.find('input').length).toBe(1);

    component.find('input').simulate('change', {
      target: { files: [file], value: 'oidsfjods\\sdoifjo.pdf' },
    });

    component.update();
    component.find('input').at(0).simulate('focus');
    component.find('input').at(0).simulate('blur');

    component.unmount();
  });

  it('should render upload file component with file', () => {
    const mock = new MockFile();
    const file = mock.create('');
    const component = mount(
      <UploadFile error="" setFile={change} file={undefined} />
    );

    expect(component.find('div').length).toBe(1);
    expect(component.find('label').length).toBe(1);
    expect(component.find('input').length).toBe(1);

    component
      .find('input')
      .simulate('change', { target: { files: [file], value: '' } });

    component.unmount();
  });

  it('should render upload file component with file', () => {
    const mock = new MockFile();
    const file = mock.create('application/pdf');
    const component = mount(
      <UploadFile error="" setFile={change} file={undefined} />
    );

    expect(component.find('div').length).toBe(1);
    expect(component.find('label').length).toBe(1);
    expect(component.find('input').length).toBe(1);

    component
      .find('input')
      .simulate('change', { target: { files: [file], value: '' } });

    component.unmount();
  });

  it('should render upload file component with file', () => {
    const component = mount(
      <UploadFile error="ojsdof" setFile={change} file={undefined} />
    );

    expect(component.find('div').length).toBe(1);
    expect(component.find('label').length).toBe(1);
    expect(component.find('input').length).toBe(1);

    component.find('input').simulate('change', {
      target: null,
    });

    component.update();
    component.find('input').at(0).simulate('focus');
    component.find('input').at(0).simulate('blur');

    component.unmount();
  });
});
