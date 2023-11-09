import React from "react";
import { motion } from "framer-motion";
import { Delivery, WaterBottle } from "../assets/img";
import { buttonClick } from "../animations";
const Home = () => {
  const scrollToOffset = () => {
    // Calculate the offset from the top of the page where you want to scroll to
    const offset = 600; // Adjust this value as needed

    // Scroll to the calculated offset with smooth behavior
    window.scroll({
      top: window.scrollY + offset,
      behavior: "smooth",
    });
  };
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6 ">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-sky-100 rounded-full">
          <p className="text-lg font-semibold text-sky-500">Free Delivery</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img
              src={Delivery}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[40px] text-headingColor md:text-[60px] font-sans font-extrabold tracking-wider">
          You will get the best quality water in{" "}
          <span className="text-sky-500 font-logo ">AquaExpress</span>
        </p>

        <p className="text-textColor text-lg">
          {" "}
          In the fast-paced, ever-evolving landscape of food delivery, we
          proudly present to you "FoodyBong Eats," a game-changing food delivery
          app, effortlessly. In this brief, we will outline the core features,
          the target audience, and the unique selling points that set Lorem
          Ipsum Eats apart in the competitive world of food delivery.
        </p>
        <motion.button
          {...buttonClick}
          onClick={scrollToOffset}
          className="bg-gradient-to-bl from-sky-400 to-sky-600 px-4 py-2 rounded-xl
         text-white text-base font-semibold"
        >
          Order Now
        </motion.button>
      </div>
      <div className="flex items-start justify-end">
        <img src={WaterBottle} alt="" />
      </div>
    </motion.div>
  );
};

export default Home;
