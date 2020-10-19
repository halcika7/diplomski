import mongoose from 'mongoose';

import { LoggerFactory, Logger } from '@logger';

const logger = LoggerFactory.getLogger('db-connection') as Logger;

export const connect = async (MONGO_URI: string) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    logger.info('Database connected', 'create-db-connection');
  } catch (err) {
    logger.error(err, 'create-db-connection');
  }
};
