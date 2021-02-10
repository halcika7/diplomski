import { RedisService } from '@service/Redis';
import supertest from 'supertest';
import App from '../../src/app';

// const token =
//   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDgzMDkzMzAsImV4cCI6MTYzOTg0NTMzMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiIiwicm9sZSI6ImFkbWluIn0.OlIaqIjlM-Dls2egQnpMqOiPHk0kov-5Oms7Rsi4bVM';

export async function shutdown() {
  await new Promise<void>(resolve => {
    RedisService.client.quit(() => {
      resolve();
    });
  });
  // redis.quit() creates a thread to close the connection.
  // We wait until all threads have been run once to ensure the connection closes.
  await new Promise(resolve => setImmediate(resolve));
}

class HttpRequest {
  private static instance: HttpRequest;

  private app: any;

  private requestWithSupertest: any;

  private constructor() {
    this.app = new App().start();
    this.requestWithSupertest = supertest.agent(this.app);
  }

  close() {
    this.app.close();
    this.app = null;
    this.requestWithSupertest = undefined;
  }

  public static getInstance(): HttpRequest {
    if (!HttpRequest.instance) {
      HttpRequest.instance = new HttpRequest();
    }

    return HttpRequest.instance;
  }

  private hook(method: 'post' | 'get' | 'put' | 'patch' | 'delete') {
    return (args: { url: string; token?: string }) =>
      this.requestWithSupertest[method](`/api/${args.url}`).set(
        'Authorization',
        args.token || ''
      );
  }

  getRequest() {
    return {
      post: this.hook('post'),
      get: this.hook('get'),
      put: this.hook('put'),
      patch: this.hook('patch'),
      delete: this.hook('delete'),
    };
  }
}

export const instance = HttpRequest.getInstance();
