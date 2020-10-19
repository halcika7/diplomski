import { config } from 'dotenv';

config();

interface ServerConfig {
  PORT: number;
  REDIS_PORT: number;
}

interface DbConfig {
  MONGO_URI: string;
  MONGO_URI_TEST: string;
}

interface LoggingConfig {
  defaultLevel: string;
  logsPath: string;
  errorLogsPath: string;
}

interface CookieConfig {
  COOKIE_SECRET: string;
  COOKIE_KEY: string;
}

interface WebToken {
  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
  REFRESH_TOKEN_NAME: string;
  REFRESH_TOKEN_PATH: string;
}

interface Social {
  googleID: string;
  googleSecretID: string;
  googleCallBack: string;
}

interface Cloudinary {
  CLOUDINARY_CLOUD: string;
  CLOUDINARY_KEY: string;
  CLOUDINARY_SECRET: string;
}

interface AppConfig {
  appName: string;
  url: string;
  environment: string;
  db: DbConfig;
  server: ServerConfig;
  logging: LoggingConfig;
  cookie: CookieConfig;
  webToken: WebToken;
  sendgrid: string;
  social: Social;
  cloudinary: Cloudinary;
}

const {
  NODE_ENV,
  URL,
  MONGO_URI,
  MONGO_URI_TEST,
  LOGGING_DEFAULT_LEVEL,
  LOGGING_ERROR_FILE_PATH,
  LOGGING_FILE_PATH,
  PORT,
  REDIS_PORT,
  COOKIE_KEY,
  COOKIE_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_PATH,
  SEND_GRID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = process.env;

const SERVER_URL =
  NODE_ENV === 'production'
    ? 'https://polar-lake-39918.herokuapp.com/api/auth/'
    : 'http://localhost:5000/api/auth/';

export abstract class Configuration {
  static appConfig: AppConfig = {
    appName: 'backend',
    environment: NODE_ENV as string,
    url: URL as string,
    db: {
      MONGO_URI,
      MONGO_URI_TEST,
    } as DbConfig,
    logging: {
      defaultLevel: LOGGING_DEFAULT_LEVEL,
      errorLogsPath: LOGGING_ERROR_FILE_PATH,
      logsPath: LOGGING_FILE_PATH,
    } as LoggingConfig,
    server: {
      PORT: parseInt(PORT as string, 10),
      REDIS_PORT: parseInt(REDIS_PORT as string, 10),
    } as ServerConfig,
    cookie: {
      COOKIE_KEY,
      COOKIE_SECRET,
    } as CookieConfig,
    webToken: {
      ACCESS_SECRET: ACCESS_TOKEN_SECRET,
      REFRESH_SECRET: REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_NAME,
      REFRESH_TOKEN_PATH,
    } as WebToken,
    sendgrid: SEND_GRID as string,
    social: {
      googleID: GOOGLE_CLIENT_ID as string,
      googleSecretID: GOOGLE_CLIENT_SECRET as string,
      googleCallBack: `${SERVER_URL}google/callback`,
    },
    cloudinary: {
      CLOUDINARY_CLOUD,
      CLOUDINARY_KEY,
      CLOUDINARY_SECRET,
    } as Cloudinary,
  };
}
