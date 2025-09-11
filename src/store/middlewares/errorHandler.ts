import { Middleware } from '@reduxjs/toolkit';

export const errorHandlerMiddleware: Middleware = (store) => (next) => (action) => {
  try {
    const result = next(action);
    
    // Check if the action resulted in an error state
    const state = store.getState();
    if (state.user?.error || state.wallet?.error || state.borrow?.error) {
      // You can add global error handling logic here
      // For example, showing a toast notification
      console.warn('Redux error detected:', {
        user: state.user?.error,
        wallet: state.wallet?.error,
        borrow: state.borrow?.error,
      });
    }
    
    return result;
  } catch (error) {
    console.error('Redux middleware error:', error);
    // You can dispatch an error action here if needed
    return next(action);
  }
}; 