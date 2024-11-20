import React from 'react';
import ReactPlayer from 'react-player';
import { useYouTube } from '../context/YouTubeContext';

const YouTubePlayer = () => {
  const { videoUrl, isPlaying } = useYouTube();

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, width: '300px', height: '200px', zIndex: 1000 }}>
      <ReactPlayer url={videoUrl} playing={isPlaying} controls={true} width="100%" height="100%" />
    </div>
  );
};

export default YouTubePlayer;
