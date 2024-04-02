import React, { useState, useEffect } from "react";
import weatherData from "../utils/WeatherIcons";

function ForecastSummary({ currentWeather, selectedDay, timezone }) {
  const [forecastData, setForecastData] = useState(
    selectedDay || currentWeather
  );

  useEffect(() => {
    setForecastData(selectedDay || currentWeather);
  }, [currentWeather, selectedDay, timezone]);

  const formatDateTime = (time) => {
    const date = new Date(time * 1000);
    const weekday = date.toLocaleString("en-US", {
      weekday: "long",
      timeZone: timezone,
    });
    const day = date.toLocaleString("en-US", {
      day: "2-digit",
      timeZone: timezone,
    });
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: timezone,
    });
    const year = date.toLocaleString("en-US", {
      year: "numeric",
      timeZone: timezone,
    });
    return `${weekday} | ${day} ${month} ${year}`;
  };

  return (
    <div className="flex flex-col items-center lg:items-start justify-items-center">
      <div className="text-[24px] mb-3 lg:text-5xl capitalize lg:mb-24">
        {forecastData && forecastData.weather[0].description}
      </div>
      <div className=" flex flex-col items-center lg:items-start">
        <div>
          {forecastData && (
            <img
              className="w-[200px] lg:hidden mb-2"
              src={weatherData[forecastData.weather[0].icon].icon}
              alt=""
            />
          )}
        </div>
        <div className="text-6xl mb-2">
          {forecastData &&
            (selectedDay
              ? Math.round(forecastData.temp.day)
              : Math.round(forecastData.temp))}
          °C
        </div>

        <div className="flex text-lg">
          <div>{forecastData && formatDateTime(forecastData.dt)}</div>
        </div>
      </div>
    </div>
  );
}

export default ForecastSummary;