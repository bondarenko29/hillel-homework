import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hotelDetailsReducer from './hotelDetails/hotelDetailsSlice';
import hotelsListReducer from './hotelsList/hotelsListSlice';
import rootSaga from './rootSaga';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  saveHistoryToActions: true,
});

const appReducers = combineReducers({
  hotelDetails: hotelDetailsReducer,
  hotelsList: hotelsListReducer,
  router: routerReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['hotelDetails', 'hotelsList'],
};

const persistedReducer = persistReducer(persistConfig, appReducers);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
        ignoredPaths: ['router.location'],
      },
    }).concat(sagaMiddleware, routerMiddleware),
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export const reduxHistory = createReduxHistory(store);
