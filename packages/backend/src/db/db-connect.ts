import mongoose from 'mongoose';

import { LoggerFactory } from '@logger';

const logger = LoggerFactory.getLogger('db-connection');

export const connect = async (MONGO_URL: string) => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.info('Database connected', 'create-db-connection');
  } catch (err) {
    logger.error(err, 'create-db-connection');
  }
};
