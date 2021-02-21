import 'reflect-metadata';

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
import { authMiddleware } from '@middleware/auth';
import { fileMiddleware } from '@middleware/fileDownload';

const { environment, url, server, db } = Configuration.appConfig;

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

    const middlewares = [
      cors({ origin: [url, '*'], credentials: true }),
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

    this.app.get(
      '/api/file/file',
      authMiddleware(),
      fileMiddleware() as any,
      (req, res) => {
        try {
          return res.download(`${__dirname}/${req!.query!.path as string}`);
        } catch (error) {
          return res.status(500).send('File does not exist');
        }
      }
    );
  }

  public start() {
    if (environment !== 'test') {
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
    }

    this.server = new InversifyExpressServer(
      container,
      null,
      { rootPath: '/api' },
      this.app
    );

    this.server.setErrorConfig(app => app.use(errorHandle));

    const appConfigured = this.server.build();

    return appConfigured.listen(this.port, () => {
      this.logger.info(
        `App is running at http://localhost:${this.port} in ${this.env} mode.`,
        'this.app.listen'
      );
    });
  }
}

export default App;
