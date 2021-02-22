import 'reflect-metadata';
import { RedisService } from '@service/Redis';

import express, { urlencoded, json, Application } from 'express';

import compression from 'compression';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import helmet from 'helmet';
import hpp from 'hpp';

import { LoggerFactory, Logger } from '@logger';
import passport, { PassportService } from '@service/Passport';
import { Configuration } from '@env';
import { connect } from './configs/db-connect';

import container from './inversify/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';

import '@controller/Auth';
import '@controller/CSRF';
import '@controller/Upload';
import '@controller/User';
import '@controller/Cart';
import '@controller/Order';
import '@controller/Pricing';
import '@controller/File';
import '@controller/Dashboard';
import { errorHandle } from './middlewares/errorHandling';

const { cookie, environment, url, server, db } = Configuration.appConfig;

class App {
  private readonly app: Application;

  private readonly port = server.PORT;

  private readonly env = environment;

  private readonly logger = LoggerFactory.getLogger(App.name) as Logger;

  private server: InversifyExpressServer | null = null;

  private readonly passportService: PassportService;

  constructor() {
    this.passportService = new PassportService();
    this.app = express();

    this.setAppMiddlewares();

    connect(environment !== 'test' ? db.MONGO_URI : db.MONGO_URI_TEST);
  }

  private setAppMiddlewares(): void {
    this.app.disable('x-powered-by');
    this.app.set('trust proxy', 1);

    const RedisStore = connectRedis(session);

    const middlewares = [
      cors({ origin: url, credentials: true }),
      session({
        store: new RedisStore({ client: RedisService.client }),
        secret: cookie.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
          path: '/',
          secure: environment === 'production',
          domain:
            environment === 'production' ? '.print-shop-burch.com' : undefined,
        },
        resave: false,
        saveUninitialized: false,
        rolling: true,
        name: 'ses',
        proxy: environment === 'production',
      }),
      passport.initialize(),
      hpp(),
      helmet(),
      compression(),
      json({ limit: '50mb' }),
      urlencoded({ extended: false, limit: '1kb', parameterLimit: 10 }),
      cookieparser(),
    ];

    this.app.options(
      '*',
      cors({ origin: [url, '*'], credentials: true }) as any
    );

    this.app.use(middlewares);

    this.app.get(
      '/api/auth/google',
      passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
      })
    );

    this.app.get('/api/auth/google/callback', (req, res) =>
      this.passportService.socialCallback(req, res)
    );
  }

  public start() {
    this.server = new InversifyExpressServer(
      container,
      null,
      { rootPath: '/api' },
      this.app
    );

    this.server.setErrorConfig(app => app.use(errorHandle));

    const appConfigured = this.server.build();

    return appConfigured.listen(this.port, () => {
      console.log(
        `App is running at http://localhost:${this.port} in ${this.env} mode.`
      );
      this.logger.info(
        `App is running at http://localhost:${this.port} in ${this.env} mode.`,
        'this.app.listen'
      );
    });
  }
}

export default App;
