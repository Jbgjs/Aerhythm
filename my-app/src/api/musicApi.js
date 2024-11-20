 import axios from 'axios';
// music api 구간 
  export const fetchMusicRecommendations = async (mood) => {
    try {
      const response = await axios.get('/api/recommendations', { params: { mood } });
      return response.data;
    } catch (error) {
      console.error('Error fetching music recommendations:', error);
      throw error;
    }
  };