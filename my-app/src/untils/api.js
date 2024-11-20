import axios from 'axios';

   export const fetchWeatherData = async (region) => {
     try {
       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
         params: {
           q: region,
           appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
           units: 'metric',
         },
       });
       return response.data;
     } catch (error) {
       console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
       throw error;
     }
   };

  //  export const fetchHoroscopeData = async (sign) => {
  //    try {
  //      const response = await axios.get(`https://zodiac-api-url.com/horoscope`, {
  //        params: { sign, key: process.env.REACT_APP_ZODIAC_API_KEY },
  //      });
  //      return response.data.horoscope;
  //    } catch (error) {
  //      console.error('Error fetching horoscope:', error.response ? error.response.data : error.message);
  //      throw error;
  //    }
  //  };