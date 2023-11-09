import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations";
import { statuses } from "../utils/styles";
import SliderCard from "./SliderCard";
import { WaterBottle } from "../assets/img";

const FilterSection = () => {
  const [category, setCategory] = useState("bisleri");
  const products = useSelector((state) => state.products);

  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col isolate justify-normal gap-1">
          <p className="text-2xl text-headingColor font-bold">
            Our Hot & Tasty Dishes
          </p>
          <div className="w-40 h-1.5 rounded-md bg-sky-500"></div>
        </div>
      </div>

      <div className="w-full  pt-6 flex flex-wrap items-center justify-center gap-6 py-8">
        {statuses &&
          statuses.map((data, i) => (
            <FilterCard
              data={data}
              index={i}
              category={category}
              setCategory={setCategory}
            />
          ))}
      </div>
      <div className="w-full h-1 rounded-md bg-gray-700"></div>
      <div className=" w-full flex items-center justify-center flex-wrap gap-14 mt-12">
        {products &&
          products
            .filter((data) => data.product_category === category)
            .map((data, i) => (
              <SliderCard key={data.id} data={data} index={i} />
            ))}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      onClick={() => setCategory(data.category)}
      {...staggerFadeInOut(index)}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${
        category == data.category ? "bg-sky-500" : "bg-primary"
      } hover:bg-sky-500 shadow-md flex flex-col items-center justify-center gap-4 `}
    >
      <div
        className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          category === data.category ? "bg-primary" : ""
        }`}
      >
        <img src={WaterBottle} className="w-8" alt="" />
      </div>
      <p
        className={`text-xl font-semibold ${
          category === data.category ? "text-primary" : "text-black"
        } group-hover:text-primary capitalize`}
      >
        {data.category}
      </p>
    </motion.div>
  );
};

export default FilterSection;
