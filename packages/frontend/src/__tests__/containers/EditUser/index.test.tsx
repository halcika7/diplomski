import { Suspense } from 'react';
import { mount } from 'enzyme';
import EditUser from '@containers/EditUser';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { setUserResponse, setUserToEdit } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <EditUser />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    comp.update();

    store.dispatch<any>(setUserResponse('message', 200));

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <EditUser />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );
    store.dispatch<any>(
      setUserToEdit({
        email: 'sdsa',
        facebookLink: 'sdasd',
        name: 'saad',
        phone: 'sdaa',
        picture: 'sada',
        twitterLink: 'asdsa',
        _id: 'asdasas',
        blocked: true,
        googleID: 'asadsa',
        role: 'professor',
      })
    );
    store.dispatch<any>(setUserResponse('message', 200));

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <EditUser role="admin" />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );
    store.dispatch<any>(
      setUserToEdit({
        email: 'sdsa',
        facebookLink: '',
        name: 'saad',
        phone: 'sdaa',
        picture: 'sada',
        twitterLink: '',
        _id: 'asdasas',
        blocked: true,
        googleID: 'asadsa',
        role: 'professor',
      })
    );
    store.dispatch<any>(setUserResponse('message', 400));

    comp.update();

    comp.unmount();
  });
});
