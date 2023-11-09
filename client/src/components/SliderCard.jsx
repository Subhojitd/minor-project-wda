import React from "react";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useDispatch, useSelector } from "react-redux";
import { addNewItemToCart, getAllCartItems } from "../api";
import { alertSuccess, alertNull } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";
import { BiCart } from "react-icons/bi";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    dispatch(alertSuccess("Item added to cart"));
    addNewItemToCart(user?.user_id, data).then((res) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });
      setInterval(() => {
        dispatch(alertNull());
      }, 2000);
    });
  };

  return (
    <div className="bg-white hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative pr-4  w-full md:w-340 gap-3">
      <img
        src={data.imageURL}
        className=" rounded-l-lg w-[50%] h-40 object-cover"
        alt=""
      />
      <div className="flex flex-col gap-1 items-start justify-start w-[50%] ">
        <p className=" text-black font-semibold">{data.product_name}</p>
        <p className="text-lg font-semibold text-red-700 ">
          ₹ {parseFloat(data.product_price).toFixed(2)}
        </p>
        <p className="text-lg font-semibold text-green-600 ">
          Qty: {data.product_quantity}
        </p>

        <motion.div
          onClick={sendToCart}
          {...buttonClick}
          className="w-full text-white h-8 rounded-full bg-sky-500 flex items-center gap-2 justify-center cursor-pointer font-semibold"
        >
          Add to Cart <BiCart className="text-2xl text-white" />
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCard;
