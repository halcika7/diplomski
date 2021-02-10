import { request, cleanupWithDB } from '../__mocks__/index';
import UserModel from '@model/User';
import { promisify } from 'util';
import { readFile } from 'fs';

const read = promisify(readFile);

describe('Testing User controller', () => {
  let token = '';

  beforeAll(async () => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'admin' });

    token = `Bearer ${res.body.accessToken}`;
  });

  afterAll(async done => {
    await request.post({ url: 'auth/logout' });
    await cleanupWithDB();
    done();
  });

  it('should fetch user data', async done => {
    const res = await request.get({
      url: 'user/',
      token,
    });

    expect(res.status).toEqual(200);
    done();
  });

  it('should update user role', async done => {
    const user = await UserModel.findOne();
    const res = await request.patch({
      url: `user/professor/${user?._id}`,
      token,
    });

    await request.patch({
      url: `user/admin/${user?._id}`,
      token,
    });

    expect(res.status).toEqual(200);
    done();
  });

  it('should update user block status', async done => {
    const user = await UserModel.findOne();
    const res = await request.patch({
      url: `user/status/true/${user?._id}`,
      token,
    });

    await request.patch({
      url: `user/status/false/${user?._id}`,
      token,
    });

    expect(res.status).toEqual(200);
    done();
  });

  it('should get users by role', async done => {
    const res = await request.get({
      url: `user/professor`,
      token,
    });

    expect(res.status).toEqual(200);
    done();
  });

  it('should get users by role', async done => {
    const res = await request.get({
      url: `user/all`,
      token,
    });

    expect(res.status).toEqual(200);
    done();
  });

  it('should get user by id', async done => {
    const user = await UserModel.findOne();
    const res = await request.get({
      url: `user/edit/${user?._id}`,
      token,
    });

    expect(res.status).toEqual(200);
    done();
  });

  it('should fail to get user by id', async done => {
    const res = await request.get({
      url: `user/edit/23123123`,
      token,
    });

    expect(res.status).toEqual(404);
    done();
  });

  it('should add new user', async done => {
    const res = await request
      .post({ url: `user/add`, token })
      .send({ role: 'admin', email: 'emmail@gmail.com' });

    expect(res.status).toEqual(200);
    done();
  });

  it('should update personal info', async done => {
    const res = await request
      .patch({ url: `user/`, token })
      .send({ facebookLink: 'https://www.facebook.com/' });

    expect(res.status).toEqual(200);
    done();
  });

  it('should fail to update photo', async done => {
    const res = await request.post({ url: `user/picture`, token });

    expect(res.status).toEqual(400);
    done();
  });

  it('should fail to update photo', async done => {
    const data = Buffer.from('/Users/harisbeslic/Desktop/halc.jpg');

    const res = await request
      .post({ url: `user/picture`, token })
      .attach('image', data, 'custom_file_name.jpeg');

    expect(res.status).toEqual(400);
    done();
  });

  it('should update photo', async done => {
    const data = await read('/Users/harisbeslic/Desktop/halc.jpg');

    const res = await request
      .post({ url: `user/picture`, token })
      .attach('image', data, 'custom_file_name.jpeg');

    expect(res.status).toEqual(200);
    done();
  });
});
