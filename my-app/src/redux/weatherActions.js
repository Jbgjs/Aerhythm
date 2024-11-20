import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
  } from './weatherActionTypes';
  import { fetchWeatherData } from '../api/weatherApi';
  
  export const fetchWeatherRequest = () => ({
    type: FETCH_WEATHER_REQUEST,
  });
  
  export const fetchWeatherSuccess = (data) => ({
    type: FETCH_WEATHER_SUCCESS,
    payload: data,
  });
  
  export const fetchWeatherFailure = (error) => ({
    type: FETCH_WEATHER_FAILURE,
    payload: error,
  });
  
  export const fetchWeather = (region) => async (dispatch) => {
    dispatch(fetchWeatherRequest());
    try {
      const data = await fetchWeatherData(region);
      dispatch(fetchWeatherSuccess(data));
    } catch (error) {
      dispatch(fetchWeatherFailure(error.message));
    }
  };