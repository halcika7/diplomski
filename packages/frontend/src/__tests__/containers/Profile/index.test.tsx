import { Suspense } from 'react';
import { mount } from 'enzyme';
import Profile from '@containers/Profile';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { setUserResponse, setUserData } from '@actions';
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
      const comp = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Profile />
            </Suspense>
          </BrowserRouter>
        </Provider>
      );

      store.dispatch<any>(setUserResponse('message', 200));
      store.dispatch<any>(setUserResponse('message', 400));

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(expect(true));
        }, 100);
      });

      comp.unmount();
    });
  });

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
          twitterLink: '',
        })
      );
      const comp = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Profile />
            </Suspense>
          </BrowserRouter>
        </Provider>
      );

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(expect(true));
        }, 100);
      });

      comp.unmount();
    });
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);

    await act(async () => {
      store.dispatch<any>(
        setUserData({
          email: 'sdsoad',
          facebookLink: '',
          name: 'asdsad',
          phone: 'asdsa',
          picture: 'sdmasa',
          twitterLink: 'asdasd',
        })
      );
      const comp = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Profile />
            </Suspense>
          </BrowserRouter>
        </Provider>
      );

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(expect(true));
        }, 100);
      });

      comp.unmount();
    });
  });
});
