import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h1" style={{ color: '#00bfff', marginBottom: '20px' }}>
        404
      </Typography>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        페이지를 찾을 수 없습니다.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        홈으로 돌아가기
      </Button>
    </Container>
  );
};

export default NotFound;