import React from 'react';
import { GoogleLogin } from '@react-oauth/google'; 

const GoogleAuth = ({ onLoginSuccess }) => {
  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    onLoginSuccess(response.access_token);
  };

  const handleFailure = (response) => {
    console.error('Login Failed:', response);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}  // 로그인 성공 시 처리 함수
      onError={handleFailure}    // 로그인 실패 시 처리 함수
      useOneTap                 // 원탭 로그인 기능 사용 
      scope="https://www.googleapis.com/auth/youtube.readonly"  // google scope 범위
      theme="filled_blue"      
    />
  );
};

export default GoogleAuth;
