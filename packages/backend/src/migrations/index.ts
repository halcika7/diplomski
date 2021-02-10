import 'reflect-metadata';
import { binding } from './binding';
import { user } from './user';
import { paper } from './paper';
import { cart } from './cart';
import { file } from './file';
import { Configuration } from '@env';
import { connect } from '@config/db-connect';
import mongoose from 'mongoose';

const { environment, db } = Configuration.appConfig;

const migrate = async () => {
  try {
    const url = environment === 'test' ? db.MONGO_URI_TEST : db.MONGO_URI;
    await connect(url);
    await Promise.all([
      mongoose.connection.db.dropDatabase(),
      binding(),
      user(),
      paper(),
    ]);
    await Promise.all([cart(), file()]);

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
