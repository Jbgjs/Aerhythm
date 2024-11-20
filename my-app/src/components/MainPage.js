import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, Button } from '@mui/material';
import styled from 'styled-components';
import logo from '../assets/images/146763.png';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/authSlice';

const Box = styled.div`
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #ffffff;
  border: none;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-10px);
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const GradientText = styled(Typography)`
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Montserrat, sans-serif';
`;

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const loginHandler = useGoogleLogin({
    onSuccess: useCallback((tokenResponse) => {
      console.log('Login Success:', tokenResponse);
      dispatch(login());
    }, [dispatch]),
    onError: useCallback(() => console.log('Login Failed'), []),
  });

  const handleLogout = useCallback(() => {
    dispatch(logout());
    console.log('Logged out');
  }, [dispatch]);

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#2c3e50', fontFamily: 'Montserrat, sans-serif' }}>
      <AppBar position="static" style={{ backgroundColor: '#ff7e5f', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Toolbar>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ height: '40px', marginRight: '20px', cursor: 'pointer' }} 
            onClick={() => handleNavigate('/not-found')}
          />
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', color: '#ffffff' }}>
            <span style={{ color: '#ffecd2' }}>Aer</span>
            <span style={{ color: '#fcb69f' }}>hythm</span>
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout} style={{ marginLeft: 'auto', color: '#ffffff', fontWeight: 'bold' }}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={loginHandler} style={{ marginLeft: 'auto', color: '#ffffff', fontWeight: 'bold' }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ padding: '60px 20px', textAlign: 'center', marginTop: '-40px' }}>
        <GradientText variant="h4" gutterBottom>
          Aerhythm은 사용자의 현 날씨, 기분을 맞춰 음악을 추천해주는 사이트 입니다!!
        </GradientText>
      </div>
      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ padding: '20px 20px', marginTop: '-100px' }}>
        <Grid item xs={12} sm={12}>
          <Box onClick={() => handleNavigate('/weather')}>
            <Icon>🌤️</Icon>
            <Typography variant="h6" style={{ color: '#ffffff', fontWeight: 'bold' }}>날씨 정보 페이지</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box onClick={() => handleNavigate('/recommendation')}>
            <Icon>🎵</Icon>
            <Typography variant="h6" style={{ color: '#ffffff', fontWeight: 'bold' }}>오늘의 추천 음악</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box onClick={() => handleNavigate('/playlist')}>
            <Icon>📊</Icon>
            <Typography variant="h6" style={{ color: '#ffffff', fontWeight: 'bold' }}>음악 기록 & 감정 분석 페이지</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box onClick={() => handleNavigate('/memo')}>
            <Icon>📝</Icon>
            <Typography variant="h6" style={{ color: '#ffffff', fontWeight: 'bold' }}>메모장</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
