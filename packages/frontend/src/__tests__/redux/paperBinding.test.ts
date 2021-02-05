import {
  addBinding,
  addPaper,
  updatePaperBindingAvailability,
  setPaperBindings,
  updatePaperBindingPrice,
  getPaperBindings,
  getPapers,
  getBindings,
  resetBindingErrors,
  resetPaperErrors,
} from '@actions';
import { axios } from '@axios';
import { store } from '@store';
import moxios from 'moxios';

const paper = {
  blackWhitePrinting: {
    from1000: 1,
    from250upTo500: 2,
    from500upTo1000: 1,
    upTo250: 1,
  },
  colorPrinting: {
    from1000: 1,
    from250upTo500: 1,
    from500upTo1000: 1,
    upTo250: 1,
  },
  name: 'sandao',
};

const papers = [{ ...paper, _id: '1', available: true }];

const binding = {
  from100upTo150: 1,
  from25upTo50: 1,
  from50upTo100: 1,
  name: 'asxs',
  upTo25: 1,
};

const bindings = [{ ...binding, _id: '1', available: true }];

describe('Testing Contact actions', () => {
  beforeEach(() => {
    moxios.install(axios as any);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('papers and bindings', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getPaperBindings);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { papers, bindings } })
          .then(() => {
            expect(req.url).toBe('/pricing/');
            done();
          });
      });
    });
  });

  it('bindings', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getBindings);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { bindings } }).then(() => {
          expect(req.url).toBe('/pricing/bindings');
          done();
        });
      });
    });
  });

  it('papers', done => {
    moxios.withMock(() => {
      store.dispatch<any>(getPapers);
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: { papers } }).then(() => {
          expect(req.url).toBe('/pricing/papers');
          done();
        });
      });
    });
  });

  it('should add paper', done => {
    moxios.withMock(() => {
      store.dispatch<any>(addPaper(paper));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/paper');
            store.dispatch<any>(resetBindingErrors);
            store.dispatch<any>(resetPaperErrors);
            done();
          });
      });
    });
  });

  it('should add paper --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(addPaper(paper));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/paper');
            done();
          });
      });
    });
  });

  it('should add binding', done => {
    moxios.withMock(() => {
      store.dispatch<any>(addBinding(binding));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/binding');
            done();
          });
      });
    });
  });

  it('should add binding --> fail', done => {
    moxios.withMock(() => {
      store.dispatch<any>(addBinding(binding));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/binding');
            done();
          });
      });
    });
  });

  it('should updatePaperBindingAvailability binding', done => {
    store.dispatch(setPaperBindings({ papers, bindings }));
    moxios.withMock(() => {
      store.dispatch<any>(
        updatePaperBindingAvailability('binding', '1', false)
      );
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/binding/false/1');
            done();
          });
      });
    });
  });

  it('should updatePaperBindingAvailability binding --> fail', done => {
    store.dispatch(setPaperBindings({ papers, bindings }));
    moxios.withMock(() => {
      store.dispatch<any>(
        updatePaperBindingAvailability('binding', '1', false)
      );
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/binding/false/1');
            done();
          });
      });
    });
  });

  it('should updatePaperBindingAvailability binding', done => {
    store.dispatch(setPaperBindings({ papers, bindings }));
    moxios.withMock(() => {
      store.dispatch<any>(updatePaperBindingAvailability('paper', '1', false));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/paper/false/1');
            done();
          });
      });
    });
  });

  it('should updatePaperBindingAvailability paper --> fail', done => {
    store.dispatch(setPaperBindings({ papers, bindings }));
    moxios.withMock(() => {
      store.dispatch<any>(updatePaperBindingAvailability('paper', '1', false));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 400, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/paper/false/1');
            done();
          });
      });
    });
  });

  it('should updatePaperBindingPrice', done => {
    store.dispatch(setPaperBindings({ papers, bindings }));
    moxios.withMock(() => {
      store.dispatch<any>(
        updatePaperBindingPrice('paper', { id: '1', option: '', value: 1 })
      );
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req
          .respondWith({ status: 200, response: { message: 'message' } })
          .then(() => {
            expect(req.url).toBe('/pricing/paper');
            done();
          });
      });
    });
  });
});
