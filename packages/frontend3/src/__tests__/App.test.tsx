import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { store } from '@store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { authSuccess } from '@actions';

describe('Testing App', () => {
  it('should render App component', () => {
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    store.dispatch(authSuccess('token'));

    comp.update();

    comp.unmount();
  });
});
