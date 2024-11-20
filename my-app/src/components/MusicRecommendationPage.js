import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import styled from 'styled-components';
import { useGoogleLogin } from 'react-google-login';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';


const MoodButton = styled(Button)`
  background-color: ${({ selected }) => (selected ? '#0099cc' : '#00bfff')};
  color: white;
  margin: 10px;
  width: 150px;
  height: 50px;
  font-size: 1rem;
  pointer-events: auto;
  &:hover {
    background-color: #0077aa;
    transition: background-color 0.3s ease;
  }
`;

const MusicRecommendationPage = () => {
  const [mood, setMood] = useState(null);
  const [recommendation, setRecommendation] = useState('');

  const handleMoodClick = (selectedMood) => {
    console.log('Selected Mood:', selectedMood);
    setMood(selectedMood);
    recommendMusic(selectedMood);
  };

  useEffect(() => {
    console.log('Current Mood:', mood);
  }, [mood]);

  const recommendMusic = (mood) => {
    let music;
    switch (mood) {
      case '기쁨':
        music = 'Happy Song by Artist A';
        break;
      case '슬픔':
        music = 'Sad Song by Artist B';
        break;
      case '평범함':
        music = 'Normal Song by Artist C';
        break;
      case '잔잔함':
        music = 'Calm Song by Artist D';
        break;
      default:
        music = '';
    }
    setRecommendation(music);
  };

  const { signIn, loaded } = useGoogleLogin({
    clientId: '569210729389-8og5q7d6rc06vcq48lroe1kpclp9vpik.apps.googleusercontent.com',
    onSuccess: (response) => {
      console.log('Login Success:', response);
    },
    onFailure: (response) => {
      console.log('Login Failed:', response);
    },
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  const handleRecommendClick = () => {
    console.log('Recommend based on YouTube playlist');
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '20px' }}>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
          <Typography
            variant="h6"
            style={{ flexGrow: 1, textAlign: 'center', fontFamily: 'BlackItalic', cursor: 'pointer' }}
            onClick={() => window.location.href = '/'} 
          >
            <span style={{ color: '#b0b0b0' }}>Aer</span>
            <span style={{ color: '#00bfff' }}>hythm</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
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
        <Button variant="contained" color="primary" onClick={signIn}>
          Google 계정 연동
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRecommendClick} style={{ marginLeft: '10px' }}>
          추천받기!
        </Button>
        {recommendation && (
          <Typography variant="h6" style={{ marginTop: '20px', fontSize: '1.5rem' }}>
            추천 음악: {recommendation}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default MusicRecommendationPage;