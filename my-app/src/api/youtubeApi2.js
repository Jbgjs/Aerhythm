import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const fetchLikedVideos = async (accessToken) => {
  const url = 'https://www.googleapis.com/youtube/v3/videos';
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        part: 'snippet,contentDetails',
        myRating: 'like',
        maxResults: 10,
        key: API_KEY,
      },
    });
    return response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching liked videos:', error);
    return [];
  }
};

export const getPlaylists = async (accessToken) => {
  const url = 'https://www.googleapis.com/youtube/v3/playlists';
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        part: 'snippet,contentDetails',
        mine: true,
        maxResults: 10,
        key: API_KEY,
      },
    });
    return response.data.items.map((item) => ({
      title: item.snippet.title,
      playlistId: item.id,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

export const searchVideosByMood = async (mood) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: mood,
        type: 'video',
        key: API_KEY,
      },
    });
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching videos by mood:', error);
    return [];
  }
};
