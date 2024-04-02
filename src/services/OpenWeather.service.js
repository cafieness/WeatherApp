import { useState, useCallback } from "react";

export const WEATHER_API_KEY = "89a2173d9e7a8557d64eab9d8889aaea";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/3.0";
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "57c60a2d84mshde47ad14dfdb2b6p11da25jsn88b6583bc9f4",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const fetchCityInformation = (inputValue) => {
  return fetch(
    `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
    geoApiOptions
  )
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    });
};
export const fetchHourlyForecast = async (lat, lon, selectedDay) => {
  try {
    const apiKey = WEATHER_API_KEY;

    let dateToFetch = new Date();
    let endDate = new Date();

    if (selectedDay) {
      dateToFetch = new Date(selectedDay.dt * 1000);
      endDate = new Date(dateToFetch.getTime() + 24 * 60 * 60 * 1000);
    }

    const dateString = dateToFetch.toISOString().slice(0, 10);
    const endDateString = endDate.toISOString().slice(0, 10);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    const filteredData = data.list.filter(
      (item) => item.dt_txt >= dateString && item.dt_txt < endDateString
    );

    if (!selectedDay && filteredData.length < 8) {
      const tomorrowData = data.list.filter(
        (item) => item.dt_txt >= endDateString
      );
      filteredData.push(...tomorrowData.slice(0, 8 - filteredData.length));
    }

    const hourlyData = filteredData.map((item) => ({
      timestamp: item.dt * 1000,
      time: new Date(item.dt * 1000),
      temperature: item.main.temp,
      windSpeed: item.wind.speed,
      icon: item.weather[0].icon,
    }));

    return hourlyData;
  } catch (error) {
    console.error("Error fetching hourly weather data:", error);
    throw error;
  }
};
function useWeatherData() {
  const [weatherData, setWeatherData] = useState(null);
  const [prevCoords, setPrevCoords] = useState({ lat: null, lon: null });

  const fetchWeatherData = useCallback((lat, lon) => {
    fetch(
      `${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(({ current, daily, hourly, timezone }) => {
        setWeatherData({
          currentWeather: current,
          forecast: daily,
          forecastHourly: hourly,
          timezone,
          latt: lat,
          longi: lon,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    if (lat !== prevCoords.lat || lon !== prevCoords.lon) {
      setPrevCoords({ lat, lon });
      fetchWeatherData(lat, lon);
    }
  };

  return {
    currentWeather: weatherData?.currentWeather,
    forecast: weatherData?.forecast,
    forecastHourly: weatherData?.forecastHourly,
    handleOnSearchChange,
    latt: weatherData?.latt,
    longi: weatherData?.longi,
    timezone: weatherData?.timezone,
  };
}

export default useWeatherData;