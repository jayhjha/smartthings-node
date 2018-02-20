import * as rp from 'request-promise';

const weatherUrl : string = 'https://api.openweathermap.org/data/2.5';
const weatherApiKey : string = String(process.env.WEATHER_API_KEY);

/**
 * Get weather of a city from OpenWeatherMap based on city name
 * @param cityName 
 */
export let getCurrentWeather = (cityName: string) => {
  const options = {
    url: `${weatherUrl}/weather`,
    qs: {
      q: cityName,
      units: 'metric',
      APPID: weatherApiKey,
    },
    json: true
  };
  return rp(options);
}
