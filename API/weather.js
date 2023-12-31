import { apiKey } from "../constants";

const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}`;
const locationsEndpointByCordins = (params) =>
  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${params.coordinates}&aqi=no`; 
const locationsEndpointBycityName= (params) =>
  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${params.cityName}&aqi=no`;
  // https://api.weatherapi.com/v1/current.json?key=970c4547e9644675851205201232509&q=casablanca&aqi=no

const apiCall = async (endpoint) => {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

export const fetchWeatherForecast = (params) => {
  let forecastUrl = forecastEndpoint(params);

  return apiCall(forecastUrl);
};

export const fetchLocationsCity = (params) => {
  let locationsUrl = locationsEndpointBycityName(params);
  return apiCall(locationsUrl);
};
export const fetchLocationsCordins = (params) => {
  let locationsUrl = locationsEndpointByCordins(params);
  return apiCall(locationsUrl);
};
