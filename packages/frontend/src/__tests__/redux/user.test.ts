import {
  addUser,
  changeUserBlockStatus,
  changeUserRole,
  getUserData,
  getUsers,
  getUserToEdit,
  updateInfo,
  updateProfilePicture,
  setUsers,
  setUserToEdit,
} from '@actions';
import { axios } from '@axios';
import { store } from '@store';
import moxios from 'moxios';

const formData = new FormData();

describe('Testing Contact actions', () => {
  beforeEach(() => {
    moxios.install(axios as any);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should add user', done => {
    moxios.withMock(() => {
      store.dispatch<any>(addUser({ email: 'sdsad', role: 'admin' }));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/user/add');
            done();
          });
      });
    });
  });

  it('should add user --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(addUser({ email: 'sdsad', role: 'admin' }));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: { errors: { email: 'invalid' } },
          })
          .then(() => {
            expect(req.url).toBe('/user/add');
            done();
          });
      });
    });
  });

  it('should change user blocked status', done => {
    moxios.withMock(() => {
      store.dispatch<any>(changeUserBlockStatus(false, '1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/user/status/false/1');
            done();
          });
      });
    });
  });

  it('should change user blocked status', done => {
    moxios.withMock(() => {
      store.dispatch<any>(
        setUsers([
          {
            _id: '1',
            blocked: true,
            email: '',
            facebookLink: '',
            name: '',
            phone: '',
            picture: '',
            role: '',
            twitterLink: '',
          },
        ])
      );
      store.dispatch<any>(changeUserBlockStatus(false, '1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/user/status/false/1');
            done();
          });
      });
    });
  });

  it('should change user blocked status', done => {
    store.dispatch<any>(
      setUserToEdit({
        _id: '1',
        blocked: true,
        email: '',
        facebookLink: '',
        name: '',
        phone: '',
        picture: '',
        role: '',
        twitterLink: '',
        googleID: '2',
      })
    );
    moxios.withMock(() => {
      store.dispatch<any>(changeUserBlockStatus(false, '1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/user/status/false/1');
            done();
          });
      });
    });
  });

  it('should change user blocked status --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(changeUserBlockStatus(false, '1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/user/status/false/1');
            done();
          });
      });
    });
  });

  it('should change user role', done => {
    moxios.withMock(() => {
      store.dispatch<any>(changeUserRole('admin', '1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/user/admin/1');
            done();
          });
      });
    });
  });

  it('should change user role --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(changeUserRole('admin', '1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/user/admin/1');
            done();
          });
      });
    });
  });

  it('should change user to edit', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getUserToEdit('1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: { message: 'message', user: {} },
          })
          .then(() => {
            expect(req.url).toBe('/user/edit/1');
            done();
          });
      });
    });
  });

  it('should change user to edit --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getUserToEdit('1'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: { message: 'message', user: {} },
          })
          .then(() => {
            expect(req.url).toBe('/user/edit/1');
            done();
          });
      });
    });
  });

  it('should get Users', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getUsers('all'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: { message: 'message', users: [] },
          })
          .then(() => {
            expect(req.url).toBe('/user/all');
            done();
          });
      });
    });
  });

  it('should update user info', done => {
    moxios.withMock(() => {
      store.dispatch<any>(updateInfo({ facebookLink: 'link' }));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/user/');
            done();
          });
      });
    });
  });

  it('should update user info --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(updateInfo({ facebookLink: 'link' }));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: { message: 'message', errors: {} },
          })
          .then(() => {
            expect(req.url).toBe('/user/');
            done();
          });
      });
    });
  });

  it('should update user info --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(updateInfo({ facebookLink: 'link' }));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 400, response: { errors: {} } }).then(() => {
          expect(req.url).toBe('/user/');
          done();
        });
      });
    });
  });

  it('should update user photo', done => {
    moxios.withMock(() => {
      store.dispatch<any>(updateProfilePicture(formData));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { url: 'url' } }).then(() => {
          expect(req.url).toBe('/user/picture');
          done();
        });
      });
    });
  });

  it('should update user photo --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(updateProfilePicture(formData));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { error: 'error' } })
          .then(() => {
            expect(req.url).toBe('/user/picture');
            done();
          });
      });
    });
  });

  it('should get User data', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getUserData);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 200,
            response: { userData: {} },
          })
          .then(() => {
            expect(req.url).toBe('/user/');
            done();
          });
      });
    });
  });
});
