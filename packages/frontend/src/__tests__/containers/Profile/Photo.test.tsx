import { Suspense } from 'react';
import { mount } from 'enzyme';
import Photo from '@containers/Profile/Photo';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { setUserResponse, setUserData } from '@actions';
import { MockFile } from '../../__mocks__/makeFileMock';
import { act } from 'react-dom/test-utils';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);

    await act(async () => {
      store.dispatch<any>(
        setUserData({
          email: 'sdsoad',
          facebookLink: 'sodas',
          name: 'asdsad',
          phone: 'asdsa',
          picture: 'sdmasa',
          twitterLink: 'adasdzz',
        })
      );
      const mock = new MockFile();
      const file = mock.create('image/png');
      const comp = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Photo />
            </Suspense>
          </BrowserRouter>
        </Provider>
      );

      store.dispatch<any>(
        setUserResponse('Profile image successfully updated', 200)
      );
      store.dispatch<any>(setUserResponse('Image is required', 200));
      store.dispatch<any>(
        setUserResponse(
          'File is not supported. Only JPG, PNG and GIF files are supported',
          400
        )
      );

      comp.update();

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(expect(comp.find('img').length).toBe(1));
        }, 2100);
      });

      comp.find('button').at(0).simulate('click');

      comp.find('input').simulate('change', {
        target: { files: [file], value: 'oidsfjods\\sdoifjo.pdf' },
      });

      comp.find('button').at(1).simulate('click');

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(expect(comp.find('img').length).toBe(1));
        }, 2100);
      });

      comp.unmount();
    });
  });
});
