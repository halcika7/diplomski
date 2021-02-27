import {
  setOrderMessage,
  postOrder,
  setOrder,
  setOrders,
  getOrders,
  getOrder,
  updateOrderStatus,
} from '@actions';
import { axios } from '@axios';
import { store } from '@store';
import moxios from 'moxios';

describe('Testing Contact actions', () => {
  beforeEach(() => {
    moxios.install(axios as any);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should set order message', () => {
    store.dispatch<any>(setOrderMessage('message', 200));
    expect(store.getState().order.message).toBe('message');
    expect(store.getState().order.status).toBe(200);
  });

  it('should set orders', () => {
    store.dispatch<any>(setOrders([]));
    expect(store.getState().order.orders).toBeTruthy();
  });

  it('should post order --- success', done => {
    moxios.withMock(() => {
      store.dispatch<any>(postOrder('Personal'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: { cart: [], message: 'Order sent' },
          })
          .then(() => {
            expect(req.url).toBe('/order/');
            done();
          });
      });
    });
  });

  it('should post order --- errors', done => {
    moxios.withMock(() => {
      store.dispatch<any>(postOrder('Personal'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: { errors: { useFor: 'sjaoidpos' } },
          })
          .then(() => {
            expect(req.url).toBe('/order/');
            done();
          });
      });
    });
  });

  it('should get orders --- success', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getOrders('completed'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { orders: [] } }).then(() => {
          expect(req.url).toBe('/order/orders/completed');
          done();
        });
      });
    });
  });

  it('should get orders --- error', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getOrders('completed'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 400, response: { orders: [] } }).then(() => {
          expect(req.url).toBe('/order/orders/completed');
          done();
        });
      });
    });
  });

  it('should get order --- success', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getOrder('id'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              order: {
                documents: [],
                totalCost: 1,
                orderedBy: '',
                orderedFor: '',
                status: 'completed',
                createdAt: '',
                updatedAt: '',
              },
            },
          })
          .then(() => {
            expect(req.url).toBe('/order/id');
            done();
          });
      });
    });
  });

  it('should get order --- error', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getOrder('id'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/order/id');
            done();
          });
      });
    });
  });

  it('should update order status --- success', done => {
    store.dispatch<any>(
      setOrders([
        {
          _id: 'id',
          createdAt: '',
          orderedFor: '',
          status: 'finished',
          totalCost: 0,
        },
      ])
    );

    moxios.withMock(() => {
      store.dispatch<any>(updateOrderStatus('completed', 'id'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/order/completed/id');
            done();
          });
      });
    });
  });

  it('should update order status --- success', done => {
    store.dispatch<any>(setOrders(null));
    store.dispatch<any>(
      setOrder({
        createdAt: new Date(),
        orderedFor: '',
        status: 'finished',
        totalCost: 0,
        documents: [],
        orderedBy: '',
        updatedAt: new Date(),
      })
    );

    moxios.withMock(() => {
      store.dispatch<any>(updateOrderStatus('completed', 'id'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/order/completed/id');
            done();
          });
      });
    });
  });

  it('should update order status --- error', done => {
    store.dispatch<any>(
      setOrders([
        {
          _id: 'id',
          createdAt: '',
          orderedFor: '',
          status: 'finished',
          totalCost: 0,
        },
      ])
    );
    moxios.withMock(() => {
      store.dispatch<any>(updateOrderStatus('completed', 'id'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: { message: 'Order already has status ->' },
          })
          .then(() => {
            expect(req.url).toBe('/order/completed/id');
            done();
          });
      });
    });
  });
});
