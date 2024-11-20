  import axios from 'axios';

  export const fetchHoroscopeData = async (sign) => {
    try {
      const response = await axios.get(`https://zodiac-api-url.com/horoscope`, {
        params: { sign, key: process.env.REACT_APP_ZODIAC_API_KEY },
      });
      return response.data.horoscope;
    } catch (error) {
      console.error('Error fetching horoscope:', error);
      throw error;
    }
  };

  // 이건 망한 파일 