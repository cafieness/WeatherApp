import React, { useState, useRef, useEffect } from "react";
import { fetchCityInformation } from "../services/OpenWeather.service.js";
import { AsyncPaginate } from "react-select-async-paginate";
import LocationIcon from "../assets/Navigation/LocationIcon.png";
import ArrowIcon from "../assets/Search/ArrowIcon.png";

const Search = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const searchRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setSelectedCity(storedCity);
      setSearchInput(storedCity);
      onSearchChange({ value: localStorage.getItem("selectedCityCoords") });
    } else {
      setSelectedCity("New York City, US");
      setSearchInput("New York City, US");
      onSearchChange({ value: "40.7128 -74.0060" });
    }
  }, [onSearchChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (selectedSuggestion) => {
    setSearchInput(selectedSuggestion.label);
    setSelectedCity(selectedSuggestion.label);
    localStorage.setItem("selectedCity", selectedSuggestion.label);
    localStorage.setItem("selectedCityCoords", selectedSuggestion.value);
    onSearchChange(selectedSuggestion);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setShowSearchOptions(!showSearchOptions);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setShowSearchOptions(false);
    }
  };

  return (
    <div className="relative">
      {!showSearchOptions && (
        <div
          className="flex h-8 mb-8 cursor-pointer"
          onClick={(event) => handleButtonClick(event)}
        >
          <img className="self-start w-[26px]" src={LocationIcon} alt="" />
          <div className="text-xl md:text-2xl mr-2 md:mr-0 md:mb-8">
             {selectedCity} 
          </div>
          <img
            className="rotate-90 mt-[6px] md:rotate-0 self-start w-[8px] md:mt-1"
            src={ArrowIcon}
            alt=""
          />
        </div>
      )}

      {showSearchOptions && (
        <div ref={searchRef} className="mb-8 h-8 cursor-pointer">
          <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={300}
            value={searchInput}
            onChange={handleSearchChange}
            loadOptions={fetchCityInformation}
            styles={customStyles}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "40px",
    border: 0,
    boxShadow: "none",
    cursor: "text",
    padding: "0 0 0 10px",
    width: "230px",
    fontSize: "16px",
    "@media (max-width: 768px)": {
      width: "180px",
      fontSize: "14px",
    },
    "@media (max-width: 1024px)": {
      width: "220px",
      fontSize: "16px",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#DEAB4D" : null,
    color: "black",
    fontSize: "14px",
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided, state) => ({
    ...provided,
    width: "230px",
    "@media (max-width: 768px)": {
      width: "180px",
    },
    "@media (max-width: 1024px)": {
      width: "220px",
      fontSize: "16px",
    },
  }),
};

export default Search;