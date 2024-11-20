import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherReducer';
import playlistReducer from './playlistSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    playlist: playlistReducer,
    auth: authReducer,
  },
});

export default store;