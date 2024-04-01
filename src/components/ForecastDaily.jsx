import React, { useState, useEffect } from 'react';
import DayPicker from './DayPicker';
import TemperatureIcon from '../assets/ForecastDaily/TemperatureIcon.png';
import UvIcon from '../assets/ForecastDaily/UvIcon.png';
import RainIcon from '../assets/ForecastDaily/RainIcon.png';
import WindIcon from '../assets/ForecastDaily/WindIcon.png';

function ForecastDaily({ forecastHourly, forecast, timezone, onDayChange }) {
  const [currentWeather, setCurrentWeather] = useState(forecast[0]);
  const [isToday, setIsToday] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [selectedDayChanceOfRain, setSelectedDayChanceOfRain] = useState(0);

  useEffect(() => {
    setCurrentWeather(forecast[0]);
    updateDateTime(timezone);

    const intervalId = setInterval(() => {
      updateDateTime(timezone);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [forecast, timezone]);

  useEffect(() => {
    setSelectedDayChanceOfRain(currentWeather.rain ? Math.round(currentWeather.rain) : 0);
  }, [currentWeather]);

  const updateDateTime = (timezone) => {
    const currentDate = new Date();
    const options = {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    };
    setCurrentDateTime(currentDate.toLocaleTimeString('en-US', options));
  };

  const onDaySelect = (selectedDay) => {
    const currentDate = new Date();
    const selectedDate = new Date(selectedDay.dt * 1000);
    setIsToday(currentDate.toDateString() === selectedDate.toDateString());
    setCurrentWeather(selectedDay);
  
    if (currentDate.toDateString() === selectedDate.toDateString()) {
      onDayChange(null);
    } else {
      onDayChange(selectedDay);
    }
  };

  const calculateChanceOfRain = () => {
    if (isToday) {
      if (!forecastHourly || forecastHourly.length === 0) {
        return 0;
      }

      const nearestHourWithRain = forecastHourly.find(hour => hour.rain && hour.rain['1h'] > 0);

      if (nearestHourWithRain) {
        return Math.round(nearestHourWithRain.pop * 100);
      } else {
        return 0;
      }
    } else {
      return selectedDayChanceOfRain;
    }
  };

  const WeatherInfo = ({ icon, label, value, unit }) => (
    <div className="flex mb-8">
      <img className="self-start mr-1 w-[25px]" src={icon} alt="" />
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xl">{value}{unit}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#DEAB4D] mountain-bg rounded-[40px] pt-9 px-1 flex flex-col w-[324px]">
      <DayPicker forecast={forecast.slice(0, 5)} onDaySelect={onDaySelect} />
      <div className="flex justify-center mb-4">
        <p className="text-lg h-[30px]">{currentDateTime}</p>
      </div>
      <div className="px-3">
        <h1 className="mb-6">AIR CONDITIONS</h1>
        <WeatherInfo label="Real Feel" value={currentWeather && Math.round(currentWeather.feels_like.day)} unit="°" icon={TemperatureIcon} />
        <WeatherInfo label="Wind" value={currentWeather && Number((currentWeather.wind_speed * 3.6).toFixed(1))} unit="km/hr" icon={WindIcon} />
        <WeatherInfo label="Chance of rain" value={calculateChanceOfRain()} unit="%" icon={RainIcon} />
        <WeatherInfo label="UV Index" value={currentWeather && Math.round(currentWeather.uvi)} icon={UvIcon} />
      </div>
    </div>
  );
}

export default ForecastDaily;