import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import memoReducer from '../features/memo/memoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    memos: memoReducer,    
  },
});
