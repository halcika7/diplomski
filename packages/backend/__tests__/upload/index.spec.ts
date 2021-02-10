import { request, cleanupWithDB } from '../__mocks__/index';
import { promisify } from 'util';
import { readFile } from 'fs';

const read = promisify(readFile);

describe('Testing Upload controller', () => {
  let token = '';

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

  it('should fetch binding papers', async done => {
    const res = await request.get({ url: 'upload/binding-papers', token });

    expect(res.status).toEqual(200);
    done();
  });

  it('should upload file', async done => {
    const data = await read('/Users/harisbeslic/Desktop/halc.pdf');

    const res = await request
      .post({ url: `upload/`, token })
      .attach('file', data, 'custom_file_name.pdf')
      .field('print', 'Color')
      .field('paper', 'A0')
      .field('copies', 1)
      .field('binding', 'Wire');

    expect(res.status).toEqual(200);
    done();
  });

  it('should delete file', async done => {
    const cart = await request.get({ url: 'cart/', token });

    const id = cart.body.cart.documents[0]._id;

    const res = await request.delete({ url: `cart/${id}`, token });

    expect(res.status).toEqual(200);
    done();
  });

  it('should fail to upload file', async done => {
    const data = await read('/Users/harisbeslic/Desktop/halc.pdf');

    const res = await request
      .post({ url: `upload/`, token })
      .attach('file', data, 'custom_file_name.pdf')
      .field('print', 'Color')
      .field('paper', '')
      .field('copies', 1)
      .field('binding', '');

    expect(res.status).toEqual(400);
    done();
  });

  it('should fail to upload file', async done => {
    const data = Buffer.from('../__mocks__/halc.pdf');

    const res = await request
      .post({ url: `upload/`, token })
      .attach('file', data, 'custom_file_name.pdf')
      .field('print', 'Color')
      .field('paper', 'A0')
      .field('copies', 1)
      .field('binding', 'Wire');

    expect(res.status).toEqual(400);
    done();
  });
});
