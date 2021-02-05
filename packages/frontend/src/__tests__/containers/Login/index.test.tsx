import { mount } from 'enzyme';
import Login from '@containers/Login';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { axios } from '@axios';
import moxios from 'moxios';
import { authSuccess } from '@actions';
import { act } from 'react-dom/test-utils';

describe('Testing Login index', () => {
  it('should render Login container', () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history as any}>
          <Login />
        </Router>
      </Provider>
    );

    history.push('?token="jjjifsdoifjij"');
    comp.update();

    store.dispatch(authSuccess('token'));

    comp.find('.navbar-brand').at(0).simulate('click');

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history as any}>
          <Login />
        </Router>
      </Provider>
    );

    await act(async () => {
      history.push('?err="jjjifsdoifjij"');

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      comp.update();

      comp.unmount();
    });
  });
});
