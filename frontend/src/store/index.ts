import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modelReducer from './slices/modelSlice';
import productReducer from './slices/productSlice';
import productDetailReducer from './slices/productDetailSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import otherUserReducer from './slices/otherUserSlice';

const rootReducer = combineReducers({
    modelReducer,
    productReducer,
    productDetailReducer,
    authReducer,
    userReducer,
    otherUserReducer,
});

export const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
