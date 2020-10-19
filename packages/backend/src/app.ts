import { RedisService } from '@service/Redis';

import express, {
  Response,
  Request,
  NextFunction,
  urlencoded,
  json,
  Application,
} from 'express';

import compression from 'compression';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import session from 'express-session';
import connectRedis from 'connect-redis';
import helmet from 'helmet';
import hpp from 'hpp';

import { LoggerFactory, Logger } from '@logger';
import passport, { PassportService } from '@service/Passport';
import { Configuration } from '@env';
import { connect } from './configs/db-connect';

import container from './inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';

import '@controller/Auth';
import '@controller/CSRF';
import '@controller/Upload';
import '@controller/User';
import '@controller/Cart';
import '@controller/Order';
import '@controller/Pricing';
import '@controller/File';
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
    this.setCsrf();

    connect(db.MONGO_URI);
  }

  private setAppMiddlewares(): void {
    this.app.disable('x-powered-by');

    const RedisStore = connectRedis(session);

    this.app.use([
      session({
        store: new RedisStore({ client: RedisService.client }),
        secret: cookie.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
          path: '/',
          secure: environment === 'production',
        },
        resave: false,
        saveUninitialized: false,
        rolling: true,
        name: 'ses',
        proxy: environment === 'production',
      }),
      csrf({ cookie: false }),
      passport.initialize(),
      hpp(),
      helmet(),
      compression(),
      json({ limit: '1kb' }),
      urlencoded({ extended: false, limit: '1kb', parameterLimit: 10 }),
      cors({ origin: url, credentials: true }),
      cookieparser(),
    ]);

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

  private setCsrf() {
    this.app.all('*', (req: Request, res: Response, next) => {
      res.cookie('_csrf', req.csrfToken(), { sameSite: true });
      return next();
    });
  }

  public start(): void {
    // eslint-disable-next-line max-params
    this.app.use(
      (err: Error | any, __: Request, res: Response, next: NextFunction) => {
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        return res.status(403).json({
          message:
            'Someone tempered this request. CSRF token was not provided.',
        });
      }
    );

    this.server = new InversifyExpressServer(
      container,
      null,
      { rootPath: '/api' },
      this.app
    );

    this.server.setErrorConfig(app =>
      app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
        errorHandle(err, req, res, next)
      )
    );

    const appConfigured = this.server.build();

    appConfigured.listen(this.port, () => {
      this.logger.info(
        `App is running at http://localhost:${this.port} in ${this.env} mode.`,
        'this.app.listen'
      );
    });
  }
}

export default App;
