import { getPapersBindings, uploadFile } from '@actions';
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

  it('should get papers and bindings', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getPapersBindings);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { papers: [], bindings: [] } })
          .then(() => {
            expect(req.url).toBe('/upload/binding-papers');
            done();
          });
      });
    });
  });

  it('should upload file', done => {
    moxios.withMock(() => {
      const data = new FormData();
      store.dispatch<any>(uploadFile(data));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { cart: [] } }).then(() => {
          expect(req.url).toBe('/upload/');
          done();
        });
      });
    });
  });

  it('should fail with errors --> upload file', done => {
    moxios.withMock(() => {
      const data = new FormData();
      store.dispatch<any>(uploadFile(data));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({
            status: 400,
            response: {
              errors: {
                numberOfCopies: '',
                printOption: '',
                paperOption: '',
                bindingOption: '',
                file: '',
              },
            },
          })
          .then(() => {
            expect(req.url).toBe('/upload/');
            done();
          });
      });
    });
  });

  it('should fail with err --> upload file', done => {
    moxios.withMock(() => {
      const data = new FormData();
      store.dispatch<any>(uploadFile(data));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { err: 'sajoid' } })
          .then(() => {
            expect(req.url).toBe('/upload/');
            done();
          });
      });
    });
  });
});
