/* eslint-disable no-useless-constructor */
import redis, { RedisClient } from 'redis';

export class RedisService {
  private static readonly REDIS_PORT =
    process.env.NODE_ENV === 'production'
      ? parseInt(process.env.REDIS_PORT as string, 10)
      : 6379;

  private static readonly _client = redis.createClient(RedisService.REDIS_PORT);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getAsync(key: string): Promise<string> {
    return new Promise((resolve, _) =>
      this._client.get(key, (__, val) => resolve(val as any))
    );
  }

  static setex(key: string, duration: number, value: string): boolean {
    return this._client.setex(key, duration, value);
  }

  static get client(): RedisClient {
    return this._client;
  }
}
