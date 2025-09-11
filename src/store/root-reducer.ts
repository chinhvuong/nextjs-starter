import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import walletReducer from './slices/wallet/walletSlice';
import borrowReducer from './slices/borrow/borrowSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  borrow: borrowReducer,
});

export type RootReducerType = typeof rootReducer; 