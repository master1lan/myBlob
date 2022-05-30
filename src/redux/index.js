import {  applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import rootReducer from './reducers';

export function initializeStore(initialState){
  // 创建一个 Saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // 使用 applyMiddleware 将 middleware 连接至 Store
  const store = configureStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  // 运行并监控各个action
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store
}
