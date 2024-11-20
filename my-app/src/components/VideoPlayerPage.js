import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

const VideoPlayerPage = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); 
  const navigate = useNavigate();

  // 페이지가 변경될 때에도 영상 상태 유지
  const handlePlay = () => {
    // 동영상을 유지하면서 페이지 이동
    navigate('/other-page', { state: { videoUrl } });
  };

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