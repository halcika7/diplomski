import { request, cleanupWithDB } from '../__mocks__/index';

describe('Testing File controller', () => {
  afterAll(async done => {
    await cleanupWithDB();
    done();
  });

  it('should fetch files', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'admin' });

    const dashboard = await request.get({
      url: 'file/',
      token: `Bearer ${res.body.accessToken}`,
    });

    await request.post({ url: 'auth/logout' });

    expect(dashboard.status).toEqual(200);
    done();
  });
});
