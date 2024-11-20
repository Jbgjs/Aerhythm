import React, { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

const VideoPlayerPage = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); 
  const navigate = useNavigate();

  const handlePlay = useCallback(() => {
    // 동영상을 유지하면서 페이지 이동
    navigate('/other-page', { state: { videoUrl } });
  }, [navigate, videoUrl]);

  useEffect(() => {
    const state = window.history.state;
    if (state && state.videoUrl) {
      setVideoUrl(state.videoUrl);
    }
  }, []);

  return (
    <div>
      <ReactPlayer url={videoUrl} playing={true} controls={true} />
      <button onClick={handlePlay}>다른 페이지로 이동</button>
    </div>
  );
};

export default VideoPlayerPage;