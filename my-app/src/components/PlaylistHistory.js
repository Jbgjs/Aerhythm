import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { fetchLikedVideos, getPlaylists, searchVideosByMood } from '../api/youtubeApi2';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../assets/images/cloud.png';
import { useYouTube } from '../context/YouTubeContext';

const PlaylistHistory = () => {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [moodSong, setMoodSong] = useState(null);
  const [moodMessage, setMoodMessage] = useState('');
  const navigate = useNavigate();
  const { setVideoUrl, setIsPlaying } = useYouTube();

  const handleLoginSuccess = useCallback(async (accessToken) => {
    console.log('Login successful, access token:', accessToken);
    const likedVideos = await fetchLikedVideos(accessToken);
    console.log('Fetched liked videos:', likedVideos);
    setVideos(likedVideos);

    const userPlaylists = await getPlaylists(accessToken);
    console.log('Fetched playlists:', userPlaylists);
    setPlaylists(userPlaylists);
  }, []);

  const handleRefreshRecommendations = useCallback(async () => {
    const mood = localStorage.getItem('selectedMood');
    if (mood) {
      const videos = await searchVideosByMood(mood) || [];
      setRecommendedVideos(videos);
    }
  }, []);

  useEffect(() => {
    const mood = localStorage.getItem('selectedMood');
    if (mood) {
      searchVideosByMood(mood).then((videos) => {
        setRecommendedVideos(videos || []);
      });
    }
  }, []);

  const handleMoodClick = useCallback(async (mood) => {
    localStorage.setItem('selectedMood', mood);
    const videos = await searchVideosByMood(mood) || [];
    if (Array.isArray(videos) && videos.length > 0) {
      const song = videos[0];
      setMoodSong(song);
      setMoodMessage(`지금은 ${mood} 감정을 느끼고 계시군요. 이 노래를 들으시면 좋을 것 같습니다!`);
      setVideoUrl(`https://www.youtube.com/watch?v=${song.id.videoId}`);
      setIsPlaying(true);
    } else {
      console.log('No videos found for this mood.');
    }
  }, [setVideoUrl, setIsPlaying]);

  const handleVideoClick = useCallback((video) => {
    setVideoUrl(`https://www.youtube.com/watch?v=${video.id.videoId}`);
    setIsPlaying(true);
  }, [setVideoUrl, setIsPlaying]);

  return (
    <div style={styles.container}>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <img src={logo} alt="Logo" style={styles.logo} />
          <Typography variant="h6" style={styles.title}>
            <span style={{ color: '#333333' }}>Aer</span>
            <span style={{ color: '#ffffff' }}>hythm</span>
          </Typography>
          <div style={styles.authContainer}>
            <GoogleAuth onLoginSuccess={handleLoginSuccess} />
          </div>
        </Toolbar>
      </AppBar>

      <div style={styles.content}>
        <h1 style={styles.pageTitle}>음악 기록 & 감정 분석</h1>

        <div style={styles.buttonContainer}>
          {['기쁨', '슬픔', '평범함', '잔잔함'].map((mood) => (
            <button key={mood} style={styles.moodButton} onClick={() => handleMoodClick(mood)}>
              {mood}
            </button>
          ))}
        </div>

        {moodSong && (
          <div style={styles.recommendation}>
            <h2>추천 노래</h2>
            <img src={moodSong.snippet.thumbnails.default.url} alt={moodSong.snippet.title} style={styles.thumbnail} />
            <div>
              <h3>{moodSong.snippet.title}</h3>
              <p>{moodMessage}</p>
            </div>
          </div>
        )}

        {videos.length > 0 ? (
          <ul style={styles.list}>
            {videos.map((video) => (
              <li key={video.id.videoId} style={styles.listItem}>
                <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} style={styles.thumbnail} />
                <div>
                  <h3>{video.snippet.title}</h3>
                  <small>{new Date(video.snippet.publishedAt).toLocaleDateString()} 업로드</small>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aerhythm만의 특별한 기능입니다!</p>
        )}

        <h2>추천 영상</h2>
        <button style={styles.refreshButton} onClick={handleRefreshRecommendations}>다시 추천받기</button>
        <ul style={styles.list}>
          {recommendedVideos.map((video) => (
            <li key={video.id.videoId} style={styles.listItem} onClick={() => handleVideoClick(video)}>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} style={styles.thumbnail} />
              <div>
                <h3>{video.snippet.title}</h3>
                <small>{new Date(video.snippet.publishedAt).toLocaleDateString()} 업로드</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',
    minHeight: '100vh',
    color: '#333333',
    fontFamily: 'Roboto, sans-serif',
  },
  appBar: {
    backgroundColor: '#ff6f61',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    height: '40px',
    marginRight: '20px',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  pageTitle: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '30px',
    fontSize: '2rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  moodButton: {
    margin: '0 10px',
    padding: '12px 24px',
    backgroundColor: '#ffffff',
    color: '#333333',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  moodButtonHover: {
    backgroundColor: '#fcb69f',
    transform: 'scale(1.05)',
  },
  recommendation: {
    marginTop: '30px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  thumbnail: {
    width: '120px',
    height: '90px',
    marginRight: '20px',
    borderRadius: '5px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '20px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
  },
  refreshButton: {
    display: 'block',
    margin: '30px auto',
    padding: '12px 24px',
    backgroundColor: '#fcb69f',
    color: '#ffffff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  refreshButtonHover: {
    backgroundColor: '#fcb69f',
    transform: 'scale(1.05)',
  },
  authContainer: {
    marginLeft: 'auto',
  },
};

export default PlaylistHistory;
