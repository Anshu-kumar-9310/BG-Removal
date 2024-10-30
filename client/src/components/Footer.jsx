import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
      <img width={150} src={assets.logo} alt="" />
      <p className="flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @AnshuKumar.dev | All right reserved.
      </p>
      <div className="flex gap-1">
        <img
          width={40}
          src={assets.facebook_icon}
          alt="facebookIcon"
          className="cursor-pointer hover:scale-105 transition-all duration-500 drop-shadow-md"
        />
        <img
          width={40}
          src={assets.twitter_icon}
          alt="twitterIcon"
          className="cursor-pointer hover:scale-105 transition-all duration-500 drop-shadow-md"
        />
        <img
          width={40}
          src={assets.google_plus_icon}
          alt="googleIcon"
          className="cursor-pointer hover:scale-105 transition-all duration-500 drop-shadow-md"
        />
      </div>
    </div>
  );
};

export default Footer;
