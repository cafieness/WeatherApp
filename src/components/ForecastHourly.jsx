import React, { useEffect, useState } from "react";
import time from "../assets/Forecast/TimeIcon.png";
import { fetchHourlyForecast } from "../services/OpenWeather.service";
import ForecastHourlyChart from "./ForecastHourlyChart";

function ForecastHourly({ latt, longi, currentWeather, selectedDay, rain }) {
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
    <div className={` ${rain ? "bg-[#ACA0B766]" : "bg-[#DEAB4D]"} flex flex-col items-center lg:block h-[295px] lg:h-[262px] mx-6 lg:mx-0 rounded-[15px] lg:rounded-[40px]`}>
      <div className="flex self-start px-4 lg:px-8 py-3">
        {" "}
        <img className="w-[16px] self-center" src={time} alt="" />
        <p className="text-md lg:text-lg"> 24-hour forecast</p>
      </div>
      <div className="self-start">
      <ForecastHourlyChart
        temperatureData={temperatureData}
        currentWeather={currentWeather}
        isHovering={isHovering}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      </div>
      
      <div className={`${rain ? "bg-[#FFAA0F]" : "bg-[#EACA8F]"} text-center text-sm rounded-full w-[225px] py-2 lg:hidden`}>
        5-day forecast
      </div>
    </div>
  );
}

export default ForecastHourly;