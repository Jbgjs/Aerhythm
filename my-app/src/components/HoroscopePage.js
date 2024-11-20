import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Button, Select, MenuItem } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';

const StyledBox = styled.div`
  background-color: #00bfff;
  color: white;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #0099cc;
    transform: translateY(-5px);
  }
`;

const getYouTubeVideos = async (query) => {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${query}&type=video&part=snippet`
  );
  console.log("YouTube API Response:", response.data); // API 응답 확인
  return response.data.items;
};

const getWeather = async (city) => {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );
  return response.data;
};

const HoroscopePage = () => {
  const [weather, setWeather] = useState(null);
  const [mood, setMood] = useState("happy");
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [city, setCity] = useState("Seoul");

  const cities = ['Seoul', 'Incheon', 'Daejeon', 'Chungnam', 'Busan', 'Gyeonggi-do', 'Gangwon-do', 'Jeolla-do', 'Gyeongsang-do'];

  const getSearchQuery = () => {
    if (weather && mood) {
      let query = `${weather.weather[0].description} ${mood} music`; // 날씨 상태를 사용
      return query;
    }
    return "music";
  };

  const fetchWeatherAndSongs = async () => {
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
      console.log("Weather Data:", weatherData); // 날씨 데이터 확인

      const query = getSearchQuery();
      const videos = await getYouTubeVideos(query);
      console.log("YouTube Videos:", videos); // 유튜브 데이터 확인

      if (videos.length > 0) {
        setSong(videos[0].snippet);
        setVideoId(videos[0].id.videoId);
      } else {
        console.log("No videos found for the search query.");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stopSong = () => {
    setIsPlaying(false);
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center', fontFamily: 'BlackItalic' }}>
            <span style={{ color: '#b0b0b0' }}>Aer</span>
            <span style={{ color: '#00bfff' }}>hythm</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          날씨와 기분에 맞는 노래 추천
        </Typography>
      </div>
      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ padding: '20px 20px' }}>
        <Grid item xs={12} sm={6}>
          <StyledBox>
            <Typography variant="h6">기분 선택</Typography>
            <Select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              style={{ width: '100%', marginTop: '10px' }}
            >
              <MenuItem value="happy">기쁨</MenuItem>
              <MenuItem value="sad">슬픔</MenuItem>
              <MenuItem value="neutral">평범함</MenuItem>
              <MenuItem value="calm">잔잔함</MenuItem>
            </Select>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledBox>
            <Typography variant="h6">도시 선택</Typography>
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '100%', marginTop: '10px' }}
            >
              {cities.map((cityName, index) => (
                <MenuItem key={index} value={cityName}>
                  {cityName}
                </MenuItem>
              ))}
            </Select>
          </StyledBox>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={fetchWeatherAndSongs}>
            추천받기
          </Button>
        </Grid>
      </Grid>
      {weather && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h6">현재 날씨: {weather.weather[0].description}</Typography>
          <Typography variant="h6">온도: {weather.main.temp}°C</Typography>
        </div>
      )}
      {song && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h6">{song.title}</Typography>
          <Typography variant="body1">{song.description}</Typography>
          <div>
            <Button onClick={togglePlay} variant="contained" color="primary" style={{ marginRight: '10px' }}>
              {isPlaying ? "일시정지" : "재생"}
            </Button>
            <Button onClick={stopSong} variant="contained" color="secondary">
              정지
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoroscopePage;
