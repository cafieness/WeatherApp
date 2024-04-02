import { useState } from "react";
import LocationIcon from "../assets/Navigation/LocationIcon.png";
import UserAvatar from "../assets/Navigation/UserAvatar.png";
import WeatherIcon from "../assets/Navigation/WeatherIcon.png";
import ExploreIcon from "../assets/Navigation/ExploreIcon.png";
import SettingsIcon from "../assets/Navigation/SettingsIcon.png";

function Navigation({ rain }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`${
        rain ? "lg:bg-[#ACA0B766]" : "lg:bg-[#DEAB4D]"
      } lg:rounded-[40px] lg:mr-2 lg:py-6 lg:w-24 flex flex-col text-center relative`}
    >
      <img
        className="w-[30px] md:w-[50px] mb-6 lg:hidden"
        src={UserAvatar}
        alt=""
        onClick={toggleMenu}
      />
      <div className="hidden lg:flex flex-col items-center">
        <img className="w-[50px] mb-20" src={UserAvatar} alt="" />
        <div className="w-[50px] mb-5">
          <img src={WeatherIcon} alt="" />
          <p>weather</p>
        </div>
        <div className="w-[50px] mb-5">
          <img src={ExploreIcon} alt="" />
          <p>explore</p>
        </div>
        <div className="w-[50px] mb-5">
          <img src={LocationIcon} alt="" />
          <p>cities</p>
        </div>
        <div className="w-[50px]">
          <img src={SettingsIcon} alt="" />
          <p>settings</p>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-12 md:top-16 right-[-20px] w-[130px] bg-[#DEAB4D] rounded-lg shadow-lg z-10">
          <MenuItem icon={WeatherIcon} text="Weather" />
          <MenuItem icon={ExploreIcon} text="Explore" />
          <MenuItem icon={LocationIcon} text="Cities" />
          <MenuItem icon={SettingsIcon} text="Settings" />
        </div>
      )}
    </div>
  );
}

const MenuItem = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-[#D69E36] rounded-lg">
      <img src={icon} alt="" className="w-6 h-6" />
      <p>{text}</p>
    </div>
  );
};

export default Navigation;