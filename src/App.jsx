import React, { useState, useEffect } from "react";
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
  const {
    currentWeather,
    forecast,
    handleOnSearchChange,
    forecastHourly,
    latt,
    longi,
    timezone,
  } = useWeatherData();

  const [selectedDayData, setSelectedDayData] = useState(null);
  const [isRaining, setIsRaining] = useState(false);

  const handleDaySelect = (day) => {
    setSelectedDayData(day);
  };

  useEffect(() => {
    if (currentWeather && currentWeather.weather[0].main === "Rain") {
      setIsRaining(true);
    } else {
      setIsRaining(false);
    }
  }, [currentWeather]);

  return (
    <div className={` ${isRaining ? 'rainy-background' : 'bg-[#D69E36]'} text-white overflow-hidden font-inter h-screen  min-h-[932px]  lg:flex justify-center`}>
      <div className="pt-10 lg:pb-8 max-w-[1440px]">
        <div className="px-8 lg:px-0 lg:flex lg:justify-between lg:pl-8 lg:mb-4">
          <div className="xl:pl-16 lg:mt-4">
            <div className="flex justify-between mb-12 lg:mb-0">
              <Search onSearchChange={handleOnSearchChange} />
              <div className="block lg:hidden">
                <Navigation rain={isRaining} />
              </div>
            </div>
            <ForecastSummary
              currentWeather={selectedDayData || currentWeather}
              selectedDay={selectedDayData}
              timezone={timezone}
            />{" "}
          </div>
          <div className="xl:pr-32 hidden lg:block">
            {(selectedDayData || currentWeather) && (
              <img
                className="w-[320px] h-[320px]"
                src={
                  weatherData[
                    (selectedDayData || currentWeather).weather[0].icon
                  ].icon
                }
                alt=""
              />
            )}
          </div>
        </div>
        <div>
        <div className="xl:hidden mb-6">
            {forecast && (
              <ForecastDaily
                forecastHourly={forecastHourly}
                forecast={forecast}
                timezone={timezone}
                onDayChange={handleDaySelect}
                rain={isRaining}
              />
            )}
          </div>
        <div className="flex justify-center items-center xl:items-start flex-col lg:flex-row">
          
          <div className="hidden lg:block">
            <Navigation rain={isRaining} />
          </div>
          <div className="xl:mr-2">
            <div className="hidden lg:block">
              <Activities rain={isRaining} />
            </div>
            <div>
            {forecastHourly && (
              <ForecastHourly
                latt={latt}
                longi={longi}
                currentWeather={currentWeather}
                selectedDay={selectedDayData}
                rain={isRaining}
              />
            )}
            </div>

          </div>
          <div className="hidden xl:block">
            {forecast && (
              <ForecastDaily
                forecastHourly={forecastHourly}
                forecast={forecast}
                timezone={timezone}
                onDayChange={handleDaySelect}
                rain={isRaining}
              />
            )}
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}

export default App;
