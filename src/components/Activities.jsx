import HeartImg from "../assets/Activities/HeartImg.png";
import ActivityImg01 from "../assets/Activities/ActivityImg01.png";
import ActivityImg02 from "../assets/Activities/ActivityImg02.png";
import ActivityImg03 from "../assets/Activities/ActivityImg03.png";
import ActivityImg04 from "../assets/Activities/ActivityImg04.png";

function Activities() {
  return (
    <div className="bg-[#DEAB4D] rounded-[40px] px-8 pt-5 pb-10 mb-8">
      <div className="flex mb-10">
        <img className="w-[30px] mr-2" src={HeartImg} alt="" />
        <p className="text-2xl">Activities in your area</p>
      </div>
      <div className="flex justify-center gap-6 ">
        <div>
          <img src={ActivityImg01} alt="" />
          <p>2km away</p>
        </div>
        <div>
          <img src={ActivityImg02} alt="" />
          <p>1.5km away</p>
        </div>
        <div>
          <img src={ActivityImg03} alt="" />
          <p>3km away</p>
        </div>
        <div>
          <img src={ActivityImg04} alt="" />
          <p>500m away</p>
        </div>
      </div>
    </div>
  );
}

export default Activities;
