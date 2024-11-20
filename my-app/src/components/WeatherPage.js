import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchWeatherData } from '../api/weatherApi';
import { AppBar, Toolbar, Typography, Button, Grid, Autocomplete, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';
import cloudIcon from '../assets/images/cloud.png'; 
import { GoogleLogin } from '@react-oauth/google';

const WeatherPage = ({ isLoggedIn }) => {
  const [region, setRegion] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate(); 

  const regions = ['Seoul', 'Incheon', 'Daejeon', 'Chungnam', 'Busan', 'Gyeonggi-do', 'Gangwon-do', 'Jeolla-do', 'Gyeongsang-do'];

  const handleRegionChange = useCallback((event, value) => {
    setRegion(value);
  }, []);

  const fetchWeather = useCallback(async () => {
    if (!region) return;
    try {
      const data = await fetchWeatherData(region); 
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [region]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)', minHeight: '100vh', paddingTop: '64px', color: '#2c3e50', fontFamily: 'Montserrat, sans-serif' }}>
      <AppBar position="fixed" style={{ backgroundColor: '#4a90e2', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', color: '#ffffff' }}>
            <span style={{ color: '#b2dfdb' }}>Aer</span>
            <span style={{ color: '#ffffff' }}>hythm</span>
          </Typography>
          {!isLoggedIn && (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log("로그인 성공", credentialResponse);
              }}
              onError={() => {
                console.log('로그인 실패');
              }}
            />
          )}
        </Toolbar>
      </AppBar>
      <div style={{ padding: '40px 20px', textAlign: 'center', marginTop: '-10px', marginRight: '120px' }}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#004d40', fontFamily: 'Roboto, sans-serif' }}>
          날씨를 알려드립니다!
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
          <Grid item>
            <Autocomplete
              options={regions}
              value={region}
              onChange={handleRegionChange}
              style={{ width: 550 }}
              renderInput={(params) => <TextField {...params} label="지역을 선택해주세요" variant="outlined" />}
            />
          </Grid>
          <Grid item>
            <Button onClick={fetchWeather} style={{ backgroundColor: '#4a90e2', color: 'white', transition: 'background-color 0.3s', '&:hover': { backgroundColor: '#357ABD' } }}>
              날씨 확인
            </Button>
          </Grid>
        </Grid>
        {weatherData && (
          <div style={{ marginTop: '40px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', maxWidth: '600px', margin: '0 auto' }}>
            <img src={cloudIcon} alt="Cloud Icon" style={{ width: '100px', marginBottom: '10px' }} />
            <Typography variant="h6" style={{ fontSize: '1.5rem', color: '#00796b' }}>{weatherData.name}의 날씨</Typography>
            <Typography style={{ fontSize: '1.5rem', color: '#00796b' }}>온도: {weatherData.main.temp}°C</Typography>
            <Typography style={{ fontSize: '1.5rem', color: '#00796b' }}>날씨: {weatherData.weather[0].description}</Typography>
            <Typography style={{ marginTop: '10px', fontSize: '1.5rem', color: '#00796b' }}>오늘의 날씨 입니다!</Typography> 
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;