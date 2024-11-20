import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import MainPage from './components/MainPage.js';
import RecommendationPage from './components/RecommendationPage.js';
import WeatherPage from './components/WeatherPage.js';
import Memo from './components/Memo.js';
import HoroscopePage from './components/HoroscopePage.js';
import PlaylistHistory from './components/PlaylistHistory.js';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { VideoProvider } from './context/YouTubeContext.js';
import YouTubePlayer from './components/YouTubePlayer.js';
import NotFound from './components/NotFound.jsx';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <VideoProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/recommendation" element={<RecommendationPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/memo" element={<Memo />} />
              <Route path="/horoscope" element={<HoroscopePage />} />
              <Route path="/playlist" element={<PlaylistHistory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <YouTubePlayer />
          </VideoProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
