import React, { createContext, useState, useContext } from 'react';

const YouTubeContext = createContext();

export const useYouTube = () => {
  return useContext(YouTubeContext);
};

export const VideoProvider = ({ children }) => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <YouTubeContext.Provider value={{ videoUrl, setVideoUrl, isPlaying, setIsPlaying }}>
      {children}
    </YouTubeContext.Provider>
  );
};
