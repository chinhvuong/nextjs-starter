import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types';

// Base selectors
const selectUserState = (state: RootState) => state.user;

// Memoized selectors
export const selectCurrentUser = createSelector(
  [selectUserState],
  (user) => user.currentUser
);

export const selectIsAuthenticated = createSelector(
  [selectUserState],
  (user) => user.isAuthenticated
);

export const selectUserLoading = createSelector(
  [selectUserState],
  (user) => user.isLoading
);

export const selectUserError = createSelector(
  [selectUserState],
  (user) => user.error
);

export const selectUserProfile = createSelector(
  [selectCurrentUser],
  (user) => user ? {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  } : null
);

export const selectIsUserLoggedIn = createSelector(
  [selectIsAuthenticated, selectCurrentUser],
  (isAuthenticated, user) => isAuthenticated && user !== null
); 