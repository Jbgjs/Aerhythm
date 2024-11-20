import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from './playlistSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    auth: authReducer,
  },
});

export default store;