/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = {
  webpack: (config, env) => {
    alias({
      ...configPaths('tsconfig.paths.json'),
    })(config);

    return config;
  },
  jest: config => {
    config.coverageThreshold = {
      global: {
        branches: 85,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    };
    config.snapshotSerializers = ['enzyme-to-json/serializer'];
    config.collectCoverageFrom = [
      '!src/service-worker.ts',
      '!src/react-app-env.d.ts',
      '!src/reportWebVitals.ts',
      '!src/serviceWorkerRegistration.ts',
      '!src/index.tsx',
      '!src/containers/Profile/**',
      '!src/containers/AddOrder/**',
      '!src/App.tsx',
      '!src/routes/**',
      '!src/library/axios.ts',
      '!src/redux/types/**',
      '!src/redux/actions/index.ts',
      '!src/redux/index.ts',
      '!src/components/Navbar/index.tsx',
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
