import axios from 'axios';
// weather api 구간
export const fetchWeatherData = async (region) => {
  try {
    console.log('Fetching weather data for region:', region); 
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: region, 
        appid: process.env.REACT_APP_OPENWEATHER_API_KEY, 
        units: 'metric',
        lang: 'kr' 
      },
    });
    console.log('Weather data received:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};