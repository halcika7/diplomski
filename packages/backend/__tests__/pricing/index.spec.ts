import { request, cleanupWithDB } from '../__mocks__/index';
import PaperModel from '@model/Paper';
import BindingModel from '@model/Binding';

let token = '';

describe('Testing Pricing controller', () => {
  afterAll(async done => {
    await cleanupWithDB();
    done();
  });

  it('should fetch papers and bindings for professor', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'professor' });

    const pricing = await request.get({
      url: 'pricing/',
      token: `Bearer ${res.body.accessToken}`,
    });

    await request.post({ url: 'auth/logout' });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should fetch papers for admin/worker', async done => {
    const res = await request
      .post({ url: 'auth/test_login' })
      .send({ role: 'admin' });

    token = `Bearer ${res.body.accessToken}`;

    const pricing = await request.get({
      url: 'pricing/papers',
      token,
    });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should fetch papers for admin/worker', async done => {
    const pricing = await request.get({
      url: 'pricing/papers',
      token,
    });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should fetch bindings for admin/worker', async done => {
    const pricing = await request.get({
      url: 'pricing/bindings',
      token,
    });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should add binding', async done => {
    const pricing = await request
      .post({
        url: 'pricing/binding',
        token,
      })
      .send({
        name: 'test',
        upTo25: 1,
        from25upTo50: 1.2,
        from50upTo100: 1.3,
        from100upTo150: 1.4,
      });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should fail to add binding', async done => {
    const pricing = await request.post({
      url: 'pricing/binding',
      token,
    });

    expect(pricing.status).toEqual(400);
    done();
  });

  it('should fail to add binding', async done => {
    const pricing = await request
      .post({
        url: 'pricing/binding',
        token,
      })
      .send({
        name: 'Soft',
        upTo25: -1,
        from25upTo50: -1,
        from50upTo100: -1,
        from100upTo150: -1,
      });

    expect(pricing.status).toEqual(400);
    done();
  });

  it('should add paper', async done => {
    const pricing = await request
      .post({
        url: 'pricing/paper',
        token,
      })
      .send({
        name: 'test',
        blackWhitePrinting: {
          upTo250: 1,
          from250upTo500: 1,
          from500upTo1000: 1,
          from1000: 1,
        },
        colorPrinting: {
          upTo250: 1,
          from250upTo500: 1,
          from500upTo1000: 1,
          from1000: 1,
        },
      });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should fail to add paper', async done => {
    const pricing = await request.post({
      url: 'pricing/paper',
      token,
    });

    expect(pricing.status).toEqual(500);
    done();
  });

  it('should fail to add paper', async done => {
    const pricing = await request
      .post({
        url: 'pricing/paper',
        token,
      })
      .send({
        name: 'A0',
        blackWhitePrinting: {
          upTo250: -1,
          from250upTo500: -1,
          from500upTo1000: -1,
          from1000: -1,
        },
        colorPrinting: {
          upTo250: -1,
          from250upTo500: -1,
          from500upTo1000: -1,
          from1000: -1,
        },
      });

    expect(pricing.status).toEqual(400);
    done();
  });

  it('should fail to add paper', async done => {
    const pricing = await request
      .post({
        url: 'pricing/paper',
        token,
      })
      .send({
        name: 'A0',
        blackWhitePrinting: {
          from250upTo500: 1,
          from500upTo1000: 1,
          from1000: 1,
        },
        colorPrinting: {
          from250upTo500: 1,
          from500upTo1000: 1,
          from1000: 1,
        },
      });

    expect(pricing.status).toEqual(400);
    done();
  });

  it('should update binding price', async done => {
    const binding = await BindingModel.findOne();
    const pricing = await request
      .patch({
        url: 'pricing/binding',
        token,
      })
      .send({
        id: binding?._id,
        value: 2.5,
        option: 'upTo25',
      });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should fail to update binding price', async done => {
    const binding = await BindingModel.findOne();
    const pricing = await request
      .patch({
        url: 'pricing/binding',
        token,
      })
      .send({
        id: binding?._id,
        value: 0,
        option: 'upTo25',
      });

    expect(pricing.status).toEqual(400);
    done();
  });

  it('should update paper price', async done => {
    const paper = await PaperModel.findOne();
    const pricing = await request
      .patch({
        url: 'pricing/paper',
        token,
      })
      .send({
        id: paper?._id,
        value: 2,
        option: 'blackWhitePrinting.upTo250',
      });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should fail to update paper price', async done => {
    const paper = await PaperModel.findOne();
    const pricing = await request
      .patch({
        url: 'pricing/paper',
        token,
      })
      .send({
        id: paper?._id,
        value: -2,
        option: 'blackWhitePrinting.upTo250',
      });

    expect(pricing.status).toEqual(400);
    done();
  });

  it('should update binding availability', async done => {
    const binding = await BindingModel.findOne();
    const pricing = await request.patch({
      url: `pricing/binding/false/${binding?._id}`,
      token,
    });

    expect(pricing.status).toEqual(200);
    done();
  });

  it('should update paper price', async done => {
    const paper = await PaperModel.findOne();
    const pricing = await request.patch({
      url: `pricing/paper/false/${paper?._id}`,
      token,
    });
    await request.post({ url: 'auth/logout' });

    expect(pricing.status).toEqual(200);
    done();
  });
});
