import React, { useEffect, useState } from "react";
import time from "../assets/Forecast/TimeIcon.png";
import { fetchHourlyForecast } from "../services/OpenWeather.service";
import ForecastHourlyChart from "./ForecastHourlyChart";

function ForecastHourly({ latt, longi, currentWeather, selectedDay }) {
  const [temperatureData, setTemperatureData] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hourlyData = await fetchHourlyForecast(latt, longi, selectedDay);
        setTemperatureData(hourlyData);
      } catch (error) {
        console.error("Error fetching hourly weather data:", error);
      }
    };

    fetchData();
  }, [latt, longi, selectedDay]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="bg-[#DEAB4D] h-[262px] rounded-[40px]">
      <div className="flex px-8 py-3">
        {" "}
        <img className="w-[16px] self-center" src={time} alt="" />
        <p className="text-lg"> 24-hour forecast</p>
      </div>
      <ForecastHourlyChart
        temperatureData={temperatureData}
        currentWeather={currentWeather}
        isHovering={isHovering}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default ForecastHourly;