import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counterSlice';
import todoReducer from './features/todoSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import {persistStore} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['todos', 'counter'],
}

const rootReduser = combineReducers({
    todos: todoReducer,
    counter: counterReducer,
})


const persistedReducer = persistReducer(persistConfig, rootReduser);

export const store = configureStore({
    reducer: persistedReducer,
})
export const persistor = persistStore(store)