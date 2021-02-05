import { mount } from 'enzyme';
import { MockFile } from '../../__mocks__/makeFileMock';

import UploadFile from '@components/UI/Input/UploadFile';
import { act } from 'react-dom/test-utils';

const change = jest.fn();

describe('Testing Input component', () => {
  it('should render disabled input', () => {
    const component = mount(
      <UploadFile file={undefined} setFile={change} span error="" />
    );
    expect(component.find('input').length).toBe(1);
    expect(component.find('span').length).toBe(1);

    component.unmount();
  });

  it('should render disabled input', async () => {
    const mock = new MockFile();
    const file = mock.create('application/pdf');
    const file2 = mock.create('image/png');
    const component = mount(
      <UploadFile file={file} setFile={change} span error="" />
    );

    await act(async () => {
      component.update();

      component.find('label').at(0).simulate('click');

      component.find('input').simulate('change', {
        target: { files: [file], value: 'oidsfjods\\sdoifjo.pdf' },
      });

      component.find('input').simulate('change', {
        target: { files: [file2], value: 'oidsfjods\\sdoifjo.png' },
      });

      component.find('input').simulate('change', {
        target: { files: [file], value: 'oidsfjods\\' },
      });

      component.unmount();
    });
  });

  it('should render disabled input', async () => {
    const mock = new MockFile();
    const file = mock.create('application/pdf');
    const component = mount(
      <UploadFile file={file} setFile={change} span error="joivj" />
    );

    await act(async () => {
      component.update();

      component.find('label').at(0).simulate('click');

      component.find('input').simulate('change', {
        target: { files: undefined, value: 'oidsfjods\\' },
      });

      component.unmount();
    });
  });

  it('should render disabled input', async () => {
    const component = mount(
      <UploadFile file={undefined} span setFile={change} error="joivj" />
    );

    await act(async () => {
      component.update();

      component.find('label').at(0).simulate('click');

      component.unmount();
    });
  });
});
