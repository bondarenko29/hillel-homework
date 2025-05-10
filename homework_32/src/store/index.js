import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todosReducer from './todo/todosSlice';
import swapiReducer from './swapi/swapiSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todos: todosReducer,
    swapi: swapiReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // thunk: false, бо використовуємо saga
});

sagaMiddleware.run(rootSaga);

export default store;