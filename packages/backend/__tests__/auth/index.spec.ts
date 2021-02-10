import { request, cleanupWithDB } from '../__mocks__/index';

describe('Testing Auth controller', () => {
  afterAll(async done => {
    await cleanupWithDB();
    done();
  });

  it('should login success', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'admin' });
    expect(res.status).toEqual(200);
    done();
  });

  it('should refresh success', async done => {
    const res = await request.get({ url: 'auth/refresh' });
    expect(res.status).toEqual(200);
    done();
  });

  it('should logout success', async done => {
    const logout = await request.post({ url: 'auth/logout' });
    expect(logout.status).toEqual(200);
    done();
  });

  it('should refresh failed', async done => {
    const res = await request.get({ url: 'auth/refresh' });
    expect(res.status).toEqual(401);
    done();
  });

  it('should login failed', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'aspokod' });
    expect(res.status).toEqual(400);
    done();
  });

  it('should fail to fetch a cart without token', async done => {
    const res = await request.get({ url: 'cart/' });
    expect(res.status).toEqual(401);
    done();
  });

  it('should fail to fetch a cart for admin', async done => {
    const tok = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'admin' });
    const res = await request.get({
      url: 'cart/',
      token: `Bearer ${tok.body.accessToken}`,
    });
    await request.post({ url: 'auth/logout' });
    expect(res.status).toEqual(401);
    done();
  });

  it('should catch error', async done => {
    const res = await request.get({
      url: 'cart/',
      token: `Bearer dfsdfd`,
    });
    expect(res.status).toEqual(401);
    done();
  });
});
