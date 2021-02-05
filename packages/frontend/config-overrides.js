/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
// const { alias, configPaths } = require('react-app-rewire-alias');
const path = require('path');

module.exports = {
  resolve: config => {
    config.alias = {
      ...config.alias,
      '@axios': path.resolve(__dirname, 'src/library/axios'),
      '@decode': path.resolve(__dirname, 'src/library/decode'),
      '@actions': path.resolve(__dirname, 'src/redux/actions/index'),
      '@images/*': path.resolve(__dirname, 'src/assets/img/*'),
      '@components/*': path.resolve(__dirname, 'src/components/*'),
      '@containers/*': path.resolve(__dirname, 'src/containers/*'),
      '@reducers/*': path.resolve(__dirname, 'src/redux/reducers/*'),
      '@dispatch': path.resolve(__dirname, 'src/redux/AppThunkDispatch'),
      '@store': path.resolve(__dirname, 'src/redux/index'),
    };
    return config;
  },
  jest: config => {
    config.snapshotSerializers = ['enzyme-to-json/serializer'];
    config.collectCoverageFrom = [
      '!src/service-worker.ts',
      '!src/react-app-env.d.ts',
      '!src/reportWebVitals.ts',
      '!src/serviceWorkerRegistration.ts',
      '!src/index.tsx',
      '!src/routes/**',
      '!src/library/axios.ts',
      '!src/redux/types/**',
      '!src/redux/actions/index.ts',
      '!src/redux/index.ts',
    ];
    config.testPathIgnorePatterns = ['/node_modules/', '__mocks__'];
    config.transformIgnorePatterns = ['/node_modules/'];
    config.testMatch = ['**/src/**/*.test.{ts,tsx}'];
    config.moduleNameMapper = {
      '\\.(css|jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>src/__tests__/__mocks__/fileMock.ts',
    };

    return config;
  },
};
