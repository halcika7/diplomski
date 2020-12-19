import {
  getDashboard,
  updateChartEarningByMonth,
  updateChartEarningByMonths,
  updateChartOrdersByMonth,
  updateChartOrdersByMonths,
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

  it('should get a dashboard', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(getDashboard('admin'));
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: {} }).then(() => {
          expect(req.url).toBe('/dashboard/admin');
          done();
        });
      });
    });
  });

  it('should fire updateChartEarningByMonths', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(
        updateChartEarningByMonths(2020, { orderedFor: null, status: null })
      );
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: {} }).then(() => {
          expect(req.url).toBe('/dashboard/chart/earning/2020');
          done();
        });
      });
    });
  });

  it('should fire updateChartEarningByMonth', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(
        updateChartEarningByMonth(2020, 1, { orderedFor: null, status: null })
      );
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: {} }).then(() => {
          expect(req.url).toBe('/dashboard/chart/earning/day/2020/1');
          done();
        });
      });
    });
  });

  it('should fire updateChartOrdersByMonths', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(
        updateChartOrdersByMonths(2020, { orderedFor: null, status: null })
      );
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: {} }).then(() => {
          expect(req.url).toBe('/dashboard/chart/order/2020');
          done();
        });
      });
    });
  });

  it('should fire updateChartOrdersByMonth', async done => {
    moxios.withMock(() => {
      store.dispatch<any>(
        updateChartOrdersByMonth(2020, 1, { orderedFor: null, status: null })
      );
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({ status: 200, response: {} }).then(() => {
          expect(req.url).toBe('/dashboard/chart/order/day/2020/1');
          done();
        });
      });
    });
  });
});
