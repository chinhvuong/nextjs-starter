import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './types';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure
} from './userSlice';
import { LoginPayload, RegisterPayload, UpdateProfilePayload } from './types';

// Login thunk
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginPayload, { dispatch }) => {
    dispatch(loginStart());
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual API call
      const user = {
        id: '1',
        email: credentials.email,
        username: credentials.email.split('@')[0],
        avatar: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: RegisterPayload, { dispatch }) => {
    dispatch(registerStart());
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual API call
      const user = {
        id: '1',
        email: userData.email,
        username: userData.username,
        avatar: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      dispatch(registerSuccess(user));
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(registerFailure(errorMessage));
      throw error;
    }
  }
);

// Update profile thunk
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: UpdateProfilePayload, { dispatch, getState }) => {
    dispatch(updateProfileStart());
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get current user from state and update
      const state = getState() as { user: { currentUser: unknown } };
      const currentUser = state.user.currentUser;
      
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = {
        ...currentUser,
        ...profileData,
        updatedAt: new Date(),
      } as User;
      
      dispatch(updateProfileSuccess(updatedUser));
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      dispatch(updateProfileFailure(errorMessage));
      throw error;
    }
  }
); 