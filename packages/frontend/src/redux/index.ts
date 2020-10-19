/* eslint-disable no-unused-expressions */
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer
import { rootReducer } from './reducers';

// logger
// import { appLoggerMiddleware } from './logger';

const bindMiddleware = () => {
  const middlewares: Middleware[] = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    // middlewares.push(appLoggerMiddleware);
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  return applyMiddleware(...middlewares);
};

export const store = createStore(
  rootReducer,
  compose(
    bindMiddleware(),
    compose
  )
);
