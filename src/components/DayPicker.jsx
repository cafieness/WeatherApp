import React, { useState } from "react";
import ArrowIconRain from "../assets/Forecast/ArrowIcon.svg";
import ArrowIconDay from "../assets/Forecast/ArrowIcon.png";
import WeatherIcons from "../utils/WeatherIcons";

function DayPicker({ forecast, onDaySelect, rain }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const handleSelectDay = (index) => {
    setSelectedDayIndex(index);
    onDaySelect(forecast[index]);
  };

  const handleArrowClick = (direction) => {
    let newIndex;
    const visibleItems = 5;

    if (direction === "left" && selectedDayIndex > 0) {
      newIndex = selectedDayIndex - 1;
    } else if (
      direction === "right" &&
      selectedDayIndex < forecast.length - 1
    ) {
      newIndex = selectedDayIndex + 1;
    } else {
      return;
    }

    if (
      (direction === "left" && newIndex >= 0) ||
      (direction === "right" && newIndex <= visibleItems)
    ) {
      setSelectedDayIndex(newIndex);
      onDaySelect(forecast[newIndex]);
    }
  };

  const renderForecastItem = (day, index) => {
    const isSelected = index === selectedDayIndex;
    const opacity = isSelected ? 1 : 0.5;
    return (
      <div
        key={index}
        className={`forecast-item cursor-pointer ${
          isSelected ? "selected" : ""
        }`}
        onClick={() => handleSelectDay(index)}
        style={{ opacity }}
      >
        <p className="text-lg">{getDayName(day.dt).toUpperCase()}</p>
        <img
          className="w-[24px]"
          src={WeatherIcons[day.weather[0].icon].icon}
          alt=""
        />
      </div>
    );
  };

  const renderForecast = () => {
    let startIndex = selectedDayIndex - 2;
    let endIndex = selectedDayIndex + 2;

    if (startIndex < 0) {
      endIndex -= startIndex;
      startIndex = 0;
    } else if (endIndex >= forecast.length) {
      startIndex -= endIndex - forecast.length + 1;
      endIndex = forecast.length - 1;
    }

    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push(renderForecastItem(forecast[i], i));
    }

    if (items.length < 5) {
      const emptySlots = 5 - items.length;
      for (let i = 0; i < emptySlots; i++) {
        items.unshift(
          <div key={`empty-${i}`} className="forecast-item empty">
            <p className="text-lg">---</p>
            <img className="w-[24px]" src="" alt="" />
          </div>
        );
      }
    }

    return items;
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  return (
    <div className=" day-selector-container flex justify-center mb-3 xl:mb-6 overflow-hidden h-[60px]">
      <img
        className="scale-x-[-1] self-start mr-3 mt-2 cursor-pointer"
        src={rain ? ArrowIconRain : ArrowIconDay}
        alt=""
        onClick={() => handleArrowClick("left")}
      />
      <div className="flex gap-[10px] items-center">{renderForecast()}</div>
      <img
        className="self-start ml-1 mt-2 cursor-pointer"
        src={rain ? ArrowIconRain : ArrowIconDay}
        alt=""
        onClick={() => handleArrowClick("right")}
      />
    </div>
  );
}

export default DayPicker;
