import { mount } from 'enzyme';

import Order from '@components/DataTables/Order';
import Table from '@components/DataTables';
import { Provider } from 'react-redux';
import { store } from '@store';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Order component', () => {
  it('should render Order', () => {
    const component = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Order
            data={[
              {
                _id: 'sfiodf',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'completed',
                totalCost: 5,
              },
              {
                _id: 'joijoi',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'rejeted',
                totalCost: 5,
              },
              {
                _id: 'jpojpiojo',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'approved',
                totalCost: 5,
              },
              {
                _id: 'xcvxcvcxv',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'finished',
                totalCost: 5,
              },
            ]}
            updateStatus={jest.fn()}
            role="worker"
          />
        </Provider>
      </BrowserRouter>
    );

    act(() => {
      component.find(Table).find('tbody tr td').at(1).simulate('click');

      component.update();

      component.unmount();
    });
  });

  it('should render Order', () => {
    const component = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Order
            data={[
              {
                _id: 'sfiodf',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'completed',
                totalCost: 5,
              },
              {
                _id: 'joijoi',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'rejeted',
                totalCost: 5,
              },
              {
                _id: 'jpojpiojo',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'approved',
                totalCost: 5,
              },
              {
                _id: 'xcxvcxvcxxxv',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'finished',
                totalCost: 5,
              },
            ]}
            updateStatus={jest.fn()}
            role="admin"
          />
        </Provider>
      </BrowserRouter>
    );

    act(() => {
      component.find(Table).find('tbody tr td').at(1).simulate('click');

      component.update();

      component.unmount();
    });
  });

  it('should render Order', () => {
    const component = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Order
            data={[
              {
                _id: 'sfiodf',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'completed',
                totalCost: 5,
              },
              {
                _id: 'joijoi',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'pending',
                totalCost: 5,
              },
              {
                _id: 'jpojpiojo',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'approved',
                totalCost: 5,
              },
              {
                _id: 'vcxvcxv',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'finished',
                totalCost: 5,
              },
              {
                _id: 'dkfpodkspf',
                createdAt: 'nfoijfod',
                orderedFor: 'fijwdijfo',
                status: 'rejected',
                totalCost: 5,
              },
            ]}
            updateStatus={jest.fn()}
            role="administration"
          />
        </Provider>
      </BrowserRouter>
    );

    act(() => {
      component.find(Table).find('tbody tr td').at(1).simulate('click');

      component.update();

      component.unmount();
    });
  });
});
