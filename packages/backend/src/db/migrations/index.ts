import 'reflect-metadata';
import { binding } from './binding';
import { user } from './user';
import { paper } from './paper';
import { file } from './file';
import { Configuration } from '@env';
import { connect } from '../db-connect';
import mongoose from 'mongoose';

const { environment, db } = Configuration.appConfig;

const migrate = async () => {
  try {
    const url = environment === 'test' ? db.MONGO_URL_TEST : db.MONGO_URL;
    await connect(url);

    if (environment === 'dev' || environment === 'test') {
      await Promise.all([
        mongoose.connection.db.dropDatabase(),
        binding(),
        user(),
        paper(),
        file(),
      ]);
    } else {
      await Promise.all([binding(), user(), paper(), file()]);
    }

    setTimeout(() => {
      process.exit();
    }, 7000);
  } catch (error) {
    setTimeout(() => {
      process.exit();
    }, 7000);
  }
};

migrate();
