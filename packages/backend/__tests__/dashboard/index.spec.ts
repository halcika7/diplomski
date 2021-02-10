import { request, cleanupWithDB } from '../__mocks__/index';

let token = '';

describe('Testing Dashboard controller', () => {
  afterAll(async done => {
    await cleanupWithDB();
    done();
  });

  it('should fetch administration dashboard', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'administration' });

    token = `Bearer ${res.body.accessToken}`;

    const dashboard = await request.get({
      url: 'dashboard/administration',
      token: `Bearer ${res.body.accessToken}`,
    });

    expect(dashboard.status).toEqual(200);
    done();
  });

  it('should fetch chart earning dashboard', async done => {
    const dashboard = await request.get({
      url: 'dashboard/chart/earning/day/2020/1',
      token,
    });

    expect(dashboard.status).toEqual(200);
    done();
  });

  it('should fetch chart order dashboard', async done => {
    const dashboard = await request.get({
      url: 'dashboard/chart/order/day/2020/1',
      token,
    });

    expect(dashboard.status).toEqual(200);
    done();
  });

  it('should fetch chart year earning dashboard', async done => {
    const dashboard = await request.get({
      url: 'dashboard/chart/earning/2020',
      token,
    });

    expect(dashboard.status).toEqual(200);
    done();
  });

  it('should fetch chart year order dashboard', async done => {
    const dashboard = await request.get({
      url: 'dashboard/chart/order/2020',
      token,
    });

    await request.post({ url: 'auth/logout' });

    expect(dashboard.status).toEqual(200);
    done();
  });

  it('should fetch professor dashboard', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'professor' });

    const dashboard = await request.get({
      url: 'dashboard/professor',
      token: `Bearer ${res.body.accessToken}`,
    });

    await request.post({ url: 'auth/logout' });

    expect(dashboard.status).toEqual(200);
    done();
  });

  it('should fetch admin dashboard', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'admin' });

    const dashboard = await request.get({
      url: 'dashboard/admin',
      token: `Bearer ${res.body.accessToken}`,
    });

    await request.post({ url: 'auth/logout' });

    expect(dashboard.status).toEqual(200);
    done();
  });
});
