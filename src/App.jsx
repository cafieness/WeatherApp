import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import ForecastDaily from "./components/ForecastDaily";
import ForecastHourly from "./components/ForecastHourly";
import Activities from "./components/Activities";
import Navigation from "./components/Navigation";
import useWeatherData from "./services/OpenWeather.service";
import ForecastSummary from "./components/ForecastSummary";
import weatherData from "./utils/WeatherIcons";

function App() {
  const { currentWeather, forecast, handleOnSearchChange, forecastHourly, latt, longi, timezone } = useWeatherData();

  const [selectedDayData, setSelectedDayData] = useState(null);

  const handleDaySelect = (day) => {
    setSelectedDayData(day);
  };
  return (
    <div className="bg-[#D69E36] text-white font-inter">
      <div className="mx-4 py-8 ">
        <div className="flex mx-auto justify-between h-2/6 pl-8 mb-6">
          <div className="pl-32 pt-4">
            <Search onSearchChange={handleOnSearchChange} />
            <ForecastSummary currentWeather={selectedDayData || currentWeather} selectedDay={selectedDayData} timezone={timezone} /> {/* Передаем timezone в ForecastSummary */}
          </div>
          <div className="pr-32">
            {(selectedDayData || currentWeather) && (
              <img className="w-[320px] h-[320px]" src={weatherData[(selectedDayData || currentWeather).weather[0].icon].icon} alt="" />
            )}
          </div>
        </div>
        <div className="flex h-4/6 justify-center">
          <Navigation />
          <div className="w-[884px] mr-6">
            <Activities />
           {forecastHourly && <ForecastHourly latt={latt} longi={longi} currentWeather={currentWeather} selectedDay={selectedDayData} />}
            </div>
          {forecast && (
            <ForecastDaily
              forecastHourly={forecastHourly}
              forecast={forecast}
              timezone={timezone}
              onDayChange={handleDaySelect} // Передаем функцию обратно в ForecastDaily
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;