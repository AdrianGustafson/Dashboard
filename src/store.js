import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { promiseMiddleware, localStorageMiddleware } from './middleware';

import reducers from './reducers';

const configureStore = () => {

  const store = createStore(
    reducers,
    applyMiddleware(
      logger,
      promiseMiddleware,
      localStorageMiddleware
    )
  );

  return store;
}

export default configureStore
