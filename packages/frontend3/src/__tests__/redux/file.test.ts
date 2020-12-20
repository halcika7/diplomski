import { getFiles } from '@actions';
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
      store.dispatch<any>(getFiles);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { files: [] } }).then(() => {
          expect(req.url).toBe('/file/');
          done();
        });
      });
    });
  });
});
