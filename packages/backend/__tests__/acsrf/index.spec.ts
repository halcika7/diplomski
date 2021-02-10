import { request, cleanupWithDB } from '../__mocks__';

describe('Testing csrf controller', () => {
  afterAll(async done => {
    await cleanupWithDB();
    done();
  });

  it('should set csrf token', async done => {
    const res = await request.get({ url: 'get_csrf' });
    expect(res.status).toEqual(200);
    done();
  });
});
