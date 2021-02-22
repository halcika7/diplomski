import 'reflect-metadata';

import App from './app';

const server = new App();

try {
  server.start();
} catch (error) {
  console.log('🚀 ~ file: server.ts ~ line 10 ~ error', error);
}

export default server;
