import { getCSRF } from '@actions';
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

  it('should get a cart', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getCSRF);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 }).then(() => {
          expect(req.url).toBe('/get_csrf');
          done();
        });
      });
    });
  });
});
