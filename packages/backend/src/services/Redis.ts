/* eslint-disable no-useless-constructor */
import redis, { RedisClient, ClientOpts } from 'redis';
import { Configuration } from '@env';

const { environment, server } = Configuration.appConfig;

export class RedisService {
  private static readonly REDIS_PORT =
    environment === 'production' ? server.REDIS_URL : 6379;

  private static readonly _client = redis.createClient(
    RedisService.REDIS_PORT as ClientOpts
  );

  private constructor() {}

  static getAsync(key: string): Promise<string> {
    return new Promise((resolve, _) =>
      this._client.get(key, (__, val) => resolve(val as any))
    );
  }

  static setex(key: string, duration: number, value: string): boolean {
    return this._client.setex(key, duration, value);
  }

  static setValue(key: string, value: string) {
    return this._client.set(key, value);
  }

  static get client(): RedisClient {
    return this._client;
  }
}
