import { getCart, removeDocument, clearCart } from '@actions';
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

  it('should get a cart', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(getCart);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { cart: [] } }).then(() => {
          expect(req.url).toBe('/cart/');
          done();
        });
      });
    });
  });

  it('should remove document', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(removeDocument('1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { cart: [] } }).then(() => {
          expect(req.url).toBe('/cart/1');
          done();
        });
      });
    });
  });

  it('should clear cart', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(clearCart);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { cart: [] } }).then(() => {
          expect(req.url).toBe('/cart/');
          done();
        });
      });
    });
  });
});
