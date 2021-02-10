import { request, cleanupWithDB } from '../__mocks__/index';
import { promisify } from 'util';
import { readFile } from 'fs';
import { Order } from '@job/common';

const read = promisify(readFile);

let token = '';
jest.setTimeout(30000);

describe('Testing Order controller', () => {
  afterAll(async done => {
    await cleanupWithDB();
    done();
  });

  it('should make an order for personal', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'professor' });

    token = `Bearer ${res.body.accessToken}`;

    const data = await read('/Users/harisbeslic/Desktop/halc.pdf');

    await request
      .post({ url: `upload/`, token })
      .attach('file', data, 'custom_file_name.pdf')
      .field('print', 'Color')
      .field('paper', 'A0')
      .field('copies', 1)
      .field('binding', 'Wire');

    const order = await request
      .post({
        url: 'order/',
        token,
      })
      .send({ orderedFor: 'Personal' });

    expect(order.status).toEqual(200);
    done();
  });

  it('should make an order for university', async done => {
    const data = await read('/Users/harisbeslic/Desktop/halc.pdf');

    await request
      .post({ url: `upload/`, token })
      .attach('file', data, 'custom_file_name.pdf')
      .field('print', 'Color')
      .field('paper', 'A0')
      .field('copies', 1)
      .field('binding', 'Wire');

    const order = await request
      .post({
        url: 'order/',
        token,
      })
      .send({ orderedFor: 'University' });

    expect(order.status).toEqual(200);
    done();
  });

  it('should get all orders and order by id', async done => {
    const res = await request.get({
      url: 'order/orders/all',
      token,
    });

    const id = res.body.orders[0]._id;

    const order = await request.get({
      url: `order/${id}`,
      token,
    });

    expect(res.status).toEqual(200);
    expect(order.status).toEqual(200);
    done();
  });

  it('should catch error to get order', async done => {
    const order = await request.get({
      url: `order/1`,
      token,
    });

    expect(order.status).toEqual(400);
    done();
  });

  it('should fail to get order', async done => {
    const order = await request.get({
      url: `order/5fcfaf93edf737b18dfec112`,
      token,
    });

    expect(order.status).toEqual(400);
    done();
  });

  it('should get other types of orders', async done => {
    const [a, s, d, f, g] = await Promise.all([
      request.get({
        url: 'order/orders/completed',
        token,
      }),
      request.get({
        url: 'order/orders/pending',
        token,
      }),
      request.get({
        url: 'order/orders/rejected',
        token,
      }),
      request.get({
        url: 'order/orders/approved',
        token,
      }),
      request.get({
        url: 'order/orders/finished',
        token,
      }),
    ]);

    expect(a.status).toEqual(200);
    expect(s.status).toEqual(200);
    expect(d.status).toEqual(200);
    expect(f.status).toEqual(200);
    expect(g.status).toEqual(200);
    done();
  });

  it('testing changing order status', async done => {
    const data = await read('/Users/harisbeslic/Desktop/halc.pdf');
    const orderTypes = ['Personal', 'University', 'Personal'];

    let i = 0;
    for await (const t of orderTypes) {
      await request
        .post({ url: `upload/`, token })
        .attach('file', data, `custom_file_name-${i}.pdf`)
        .field('print', 'Color')
        .field('paper', 'A0')
        .field('copies', 1)
        .field('binding', 'Wire');
      await request
        .post({
          url: 'order/',
          token,
        })
        .send({ orderedFor: t });
      i += 1;
    }

    const res = await request.get({
      url: 'order/orders/all',
      token,
    });

    await request.post({ url: 'auth/logout' });

    const uni = res.body.orders.filter(
      (val: Order) => val.orderedFor === 'University'
    );

    let tok = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'administration' });

    const approved = await request.patch({
      url: `order/approved/${uni[0]._id}`,
      token: `Bearer ${tok.body.accessToken}`,
    });

    expect(approved.status).toEqual(200);

    await request.post({ url: 'auth/logout' });

    tok = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'worker' });

    const personal = res.body.orders.filter(
      (val: Order) => val.orderedFor === 'Personal'
    );

    const rejected = await request.patch({
      url: `order/rejected/${personal[0]._id}`,
      token: `Bearer ${tok.body.accessToken}`,
    });

    expect(rejected.status).toEqual(200);

    const finished = await request.patch({
      url: `order/finished/${personal[1]._id}`,
      token: `Bearer ${tok.body.accessToken}`,
    });

    expect(finished.status).toEqual(200);

    const completed = await request.patch({
      url: `order/completed/${personal[1]._id}`,
      token: `Bearer ${tok.body.accessToken}`,
    });

    expect(completed.status).toEqual(200);

    await request.post({ url: 'auth/logout' });

    expect(res.status).toEqual(200);
    done();
  });
});
