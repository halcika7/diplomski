import { logoutUser, refreshToken } from '@actions';
import { axios } from '@axios';
import { store } from '@store';
import moxios from 'moxios';

describe('Testing Contact actions', () => {
  //   const dispatch = jest.fn();

  beforeEach(() => {
    moxios.install(axios as any);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should succeed', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(refreshToken);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: {
              accessToken: 'ijoij',
              message: 'kdfpokdspfo',
            },
          })
          .then(() => {
            expect(req.url).toBe('/auth/refresh');
            done();
          });
      });
    });
  });

  it('should fail refresh token', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(refreshToken);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 401,
            response: {
              message: 'kdfpokdspfo',
            },
          })
          .then(() => {
            expect(req.url).toBe('/auth/refresh');
            done();
          });
      });
    });
  });

  it('should logout user', done => {
    moxios.withMock(() => {
      store.dispatch<any>(logoutUser);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 }).then(() => {
          expect(req.url).toBe('/auth/logout');
          done();
        });
      });
    });
  });
});
