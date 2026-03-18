import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootReducerType = typeof rootReducer; 