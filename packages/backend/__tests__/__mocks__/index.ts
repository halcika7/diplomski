import { shutdown, instance } from './utils';
import mongoose from 'mongoose';

export const request = instance.getRequest();

export const cleanup = async () => {
  instance.close();
  await shutdown();
};

export const cleanupWithDB = async () =>
  Promise.all([cleanup(), mongoose.connection.close()]);
