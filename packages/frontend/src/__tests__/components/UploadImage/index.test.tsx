import { mount } from 'enzyme';
import { MockFile } from '../../__mocks__/makeFileMock';

import UploadImage from '@components/UploadImage';
import { act } from 'react-dom/test-utils';

const change = jest.fn();

describe('Testing Input component', () => {
  it('should render disabled input', () => {
    const component = mount(
      <UploadImage image={undefined} setImage={change} />
    );
    expect(component.find('img').length).toBe(1);
    expect(component.find('label').length).toBe(1);

    component.unmount();
  });

  it('should render disabled input', async () => {
    const mock = new MockFile();
    const file = mock.create('image/png');
    const component = mount(<UploadImage image={file} setImage={change} />);

    await act(async () => {
      component.update();

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(expect(component.find('img').length).toBe(1));
        }, 2100);
      });

      component.find('button').at(0).simulate('click');

      component.find('input').simulate('change', {
        target: { files: [file], value: 'oidsfjods\\sdoifjo.pdf' },
      });

      component.unmount();
    });
  });

  it('should render disabled input', async () => {
    const mock = new MockFile();
    const file = mock.create('fhudsihf');
    const component = mount(
      <UploadImage image={undefined} setImage={change} />
    );

    await act(async () => {
      component.find('input').simulate('change', {
        target: { files: null, value: 'oidsfjods\\sdoifjo.pdf' },
      });

      component.find('input').simulate('change', {
        target: { files: [file], value: 'oidsfjods\\sdoifjo.pdf' },
      });

      component.update();

      component.unmount();
    });
  });
});
