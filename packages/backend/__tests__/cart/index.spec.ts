import { request, cleanupWithDB } from '../__mocks__/index';
import CartModel from '@model/Cart';

let token = '';
describe('Testing Cart controller', () => {
  beforeAll(async () => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'professor' });

    token = `Bearer ${res.body.accessToken}`;
  });

  afterAll(async done => {
    await request.post({ url: 'auth/logout' });
    await cleanupWithDB();
    done();
  });

  it('should fetch cart', async done => {
    const res = await request.get({ url: 'cart/', token });
    expect(res.status).toEqual(200);
    done();
  });

  it('should fail to delete item from cart', async done => {
    const res = await request.delete({ url: 'cart/1', token });
    expect(res.status).toEqual(500);
    done();
  });

  it('should delete cart', async done => {
    const res = await request.delete({ url: 'cart/', token });
    await CartModel.deleteMany({});
    expect(res.status).toEqual(200);
    done();
  });
});
