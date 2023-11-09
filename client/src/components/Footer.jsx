import React from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinDropIcon from "@mui/icons-material/PinDrop";

const Footer = () => {
  return (
    <div className="w-full h-full bg-sky-100  ">
      <div className="w-full h-[70px]  flex flex-col md:flex-row  items-center justify-between border-b border-sky-400"></div>
      <div className="w-full h-full flex flex-col md:flex-row  items-start md:items-center justify-evenly  text-black pl-[70px]">
        <div className="w-[200px] h-[250px] flex flex-col  items-start justify-evenly">
          <h1 className="text-3xl md:text-4xl  flex items-center justify-center gap-3 font-logo text-sky-500 tracking-wide">
            AquaExpress
          </h1>
          <h1 className="flex gap-1 text-sm">
            <EmailOutlinedIcon /> aquaexpress@gmail.com
          </h1>
          <h1 className="flex gap-1 text-sm">
            <PhoneForwardedIcon /> + 91 9382602298
          </h1>
          <div className="flex gap-3 text-sm">
            <div className="hover:bg-sky-500 rounded-full p-2 cursor-pointer duration-200  text-sm">
              <FacebookOutlinedIcon />
            </div>
            <div className="hover:bg-sky-500 rounded-full p-2 cursor-pointer duration-200  text-sm">
              <InstagramIcon />
            </div>
            <div className="hover:bg-sky-500 rounded-full p-2 cursor-pointer  duration-200 text-sm">
              <TwitterIcon />
            </div>
          </div>
        </div>
        <div className="w-[200px] h-[250px] flex flex-col  items-start   justify-evenly pl-[10px]">
          <h1 className="font-bold text-xl tracking-wide">About</h1>
          <p className="text-sm opacity-80">About Us</p>
          <p className="text-sm opacity-80">Recipe</p>
          <p className="text-sm opacity-80">Explore Menu</p>
          <p className="text-sm opacity-80">Contact</p>
        </div>
        <div className="w-[200px] h-[250px] flex flex-col  items-start   justify-evenly pl-[10px]">
          <h1 className="font-bold text-xl tracking-wide">Company</h1>
          <p className="text-sm opacity-80">Terms & Conditions</p>
          <p className="text-sm opacity-80">Privacy Policy</p>
          <p className="text-sm opacity-80">Subscribe us</p>
          <p className="text-sm opacity-80">FAQ</p>
        </div>{" "}
        <div className="w-[200px] h-[250px] flex flex-col  items-start   justify-start gap-[20px] pl-[10px] py-[28px]">
          <h1 className="font-bold text-xl tracking-wide">Location</h1>
          <p className="text-sm opacity-80">
            {" "}
            Hala battala, Barrackpore Road Barasat-700012 Kolkata{" "}
          </p>
          <p className="-mt-[10px]">
            <PinDropIcon />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
