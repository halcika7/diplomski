import { Suspense } from 'react';
import { mount } from 'enzyme';
import AddOrder from '@containers/AddOrder';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { MockFile } from '../../__mocks__/makeFileMock';
import UploadFile from '@components/UI/Input/UploadFile';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <AddOrder />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );
    const mock = new MockFile();
    const file = mock.create('application/pdf');

    comp
      .find(UploadFile)
      .find('input')
      .simulate('change', {
        target: { files: [file], value: 'oidsfjods\\sdoifjo.pdf' },
      });

    comp.find('button').simulate('click');

    comp.update();

    comp.unmount();
  });
});
