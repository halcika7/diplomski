import React from 'react';
import { mount } from 'enzyme';

import User from '@components/DataTables/User';
import { Provider } from 'react-redux';
import { store } from '@store';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { setUserResponse } from '@actions';
import { axios } from '@axios';
import moxios from 'moxios';

describe('Testing User component', () => {
  it('should render User', async () => {
    moxios.install(axios as any);
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <User
            role="admin"
            users={[
              {
                _id: 'fkspodsf',
                blocked: false,
                email: '',
                facebookLink: '',
                name: '',
                phone: '',
                picture: '',
                role: '',
                twitterLink: '',
              },
              {
                _id: 'kfpkadpfosa',
                blocked: true,
                email: '',
                facebookLink: '',
                name: '',
                phone: '',
                picture: '',
                role: '',
                twitterLink: '',
              },
            ]}
          />
        </BrowserRouter>
      </Provider>
    );

    await act(async () => {
      component.find('button').at(3).simulate('click');
      component.update();

      component.find('button').at(3).simulate('click');

      store.dispatch(setUserResponse('knoim', 200));

      component.update();

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 2100);
      });

      component.unmount();
    });
  });

  it('should render Paper', async () => {
    moxios.install(axios as any);
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <User
            role="administration"
            users={[
              {
                _id: 'fkspodsf',
                blocked: false,
                email: '',
                facebookLink: '',
                name: '',
                phone: '',
                picture: '',
                role: '',
                twitterLink: '',
              },
              {
                _id: 'kfpkadpfosa',
                blocked: true,
                email: '',
                facebookLink: '',
                name: '',
                phone: '',
                picture: '',
                role: '',
                twitterLink: '',
              },
            ]}
          />
        </BrowserRouter>
      </Provider>
    );

    await act(async () => {
      store.dispatch(setUserResponse('knoim', 400));
      component.update();

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 2100);
      });
      component.unmount();
    });
  });
});
