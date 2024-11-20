import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, IconButton } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addVideoToPlaylist } from '../redux/playlistSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/cloud.png'; 

const MoodButton = styled(Button)`
  background-color: #ff6f61;
  color: white;
  margin: 10px;
  width: 150px;
  height: 50px;
  font-size: 1rem;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #e55b50;
    transform: translateY(-3px);
  }
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecommendationPage = ({ isLoggedIn }) => {
  const [mood, setMood] = useState(null);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchYouTubeVideos = useCallback(async (mood) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const query = `${mood} music`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      console.log('YouTube API Response:', response.data);
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    }
  }, []);

  const handleMoodClick = useCallback(async (selectedMood) => {
    console.log('Selected Mood:', selectedMood);
    setMood(selectedMood);
    await fetchYouTubeVideos(selectedMood);
  }, [fetchYouTubeVideos]);

  const handleVideoClick = useCallback((video) => {
    console.log('Playing video:', video.id.videoId);
    dispatch(addVideoToPlaylist({
      title: video.snippet.title,
      videoId: video.id.videoId,
    }));
  }, [dispatch]);

  const handleMoodSelection = useCallback((selectedMood) => {
    setMood(selectedMood);
    localStorage.setItem('selectedMood', selectedMood);
  }, []);

  return (
    <div style={{ background: 'linear-gradient(to bottom, #fbc2eb, #a6c1ee)', minHeight: '100vh', paddingTop: '64px' }}>
      <AppBar position="fixed" style={{ backgroundColor: '#333', zIndex: 1300 }}>
        <Toolbar style={{ width: '100%' }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate(-1)} 
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
          <Typography
            variant="h6"
            style={{ flexGrow: 1, textAlign: 'center', fontFamily: 'BlackItalic', cursor: 'pointer', marginRight: '20px' }}
            onClick={() => window.location.href = '/'} 
          >
            <span style={{ color: '#b0b0b0' }}>Aer</span>
            <span style={{ color: '#ff6f61' }}>hythm</span>
          </Typography>
          <Button color="inherit" style={{ whiteSpace: 'nowrap' }}>Login</Button>
        </Toolbar>
      </AppBar>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
          오늘의 기분은 어떠신가요?
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          {['기쁨', '슬픔', '평범함', '잔잔함'].map((moodOption) => (
            <Grid item key={moodOption}>
              <MoodButton
                onClick={() => handleMoodClick(moodOption)}
                selected={mood === moodOption}
              >
                {moodOption}
              </MoodButton>
            </Grid>
          ))}
        </Grid>
        {videos.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <Typography variant="h6" style={{ fontSize: '1.5rem', color: '#333' }}>
              추천 음악 비디오:
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {videos.map((video) => (
                <Grid item key={video.id.videoId}>
                  <VideoContainer>
                    <iframe
                      width="300"
                      height="200"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.snippet.title}
                      onClick={() => handleVideoClick(video)}
                    ></iframe>
                    <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '10px', color: '#555' }}>
                      {video.snippet.title}
                    </Typography>
                  </VideoContainer>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;