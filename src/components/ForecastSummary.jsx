import React, { useState, useEffect } from "react";

function ForecastSummary({ currentWeather, selectedDay, timezone }) {
  const [weatherData, setWeatherData] = useState(selectedDay || currentWeather);

  useEffect(() => {
    setWeatherData(selectedDay || currentWeather);
  }, [currentWeather, selectedDay, timezone]); // Включаем timezone в зависимости

  const formatDateTime = (time) => {
    const date = new Date(time * 1000);
    const weekday = date.toLocaleString("en-US", { weekday: "long", timeZone: timezone });
    const day = date.toLocaleString("en-US", { day: "2-digit", timeZone: timezone });
    const month = date.toLocaleString("en-US", { month: "short", timeZone: timezone });
    const year = date.toLocaleString("en-US", { year: "numeric", timeZone: timezone });
    return `${weekday} | ${day} ${month} ${year}`;
  };

  return (
    <div className="flex flex-col justify-items-center">
      <div className="text-5xl capitalize mb-24">
        {weatherData && weatherData.weather[0].description}
      </div>
      <div className="h-2/5 flex flex-col justify-end">
        <div className="text-6xl">
          {weatherData && (selectedDay ? Math.round(weatherData.temp.day) : Math.round(weatherData.temp))}°C
        </div>
        <div className="flex text-lg">
          <div>
            {weatherData && formatDateTime(weatherData.dt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForecastSummary;