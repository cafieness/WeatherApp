import LocationIcon from "../assets/Navigation/LocationIcon.png";
import UserAvatar from "../assets/Navigation/UserAvatar.png";
import WeatherIcon from "../assets/Navigation/WeatherIcon.png";
import ExploreIcon from "../assets/Navigation/ExploreIcon.png";
import SettingsIcon from "../assets/Navigation/SettingsIcon.png";
function Navigation() {
  return (
    <div className="bg-[#DEAB4D] rounded-[40px] mr-8 py-6 w-24 flex flex-col items-center">
    <img className="w-[50px] mb-24" src={UserAvatar} alt="" />
    <div className="w-[50px] mb-6">
      <img src={WeatherIcon} alt="" />
      <p>weather</p>
    </div>
    <div className="w-[50px] mb-6">
      <img src={ExploreIcon} alt="" />
      <p>explore</p>
    </div>
    <div className="w-[50px] mb-6">
      <img src={LocationIcon} alt="" />
      <p>cities</p>
    </div>
    <div className="w-[50px]">
      <img src={SettingsIcon} alt="" />
      <p>settings</p>
    </div>
  </div>
  )
}

export default Navigation