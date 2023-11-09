import React from "react";
import { motion } from "framer-motion";
import { buttonClick, staggerFadeInOut } from "../animations";
import { getAllOrders, updateOrderSts } from "../api";
import { useDispatch } from "react-redux";
import { setOrders } from "../context/actions/ordersAction";
const OrdersData = ({ index, data, admin }) => {
  const dispatch = useDispatch();

  const handleClick = (orderId, sts) => {
    updateOrderSts(orderId, sts).then((response) => {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };
  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col isolate justify-normal px-3 py-2 border relative border-gray-300 bg-textColor drop-shadow-md rounded-md gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-black font-semibold ">Orders</h1>

        <div className="flex items-center gap-4">
          <p className="flex icon gap-1  text-black ">
            Total :{" "}
            <span className="text-lg font-semibold text-red-500">
              ₹{data?.total}
            </span>
          </p>

          <p className="px-2 py-[2px] text-sm text-black font-semibold capitalize rounded-md bg-emerald-400 drop-shadow-md">
            {data?.status}
          </p>

          <p
            className={`text-base  font-semibold  shadow-md capitalize border border-gray-300 px-2 py-[2px] rounded-md 
          ${
            (data?.sts === "preparing" && "bg-orange-500") ||
            (data?.sts === "cancelled" && "bg-red-500") ||
            (data?.sts === "delivered" && "bg-emerald-500")
          }`}
          >
            {data?.sts}
          </p>
          {admin && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-semibold text-black">Mark As</p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "preparing")}
                className={`text-orange-500 hover:bg-orange-400 hover:text-white  text-base font-semibold  capitalize border border-orange-500  px-2 py-[2px]  rounded-md cursor-pointer`}
              >
                Preparing
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "cancelled")}
                className={`text-red-500 hover:bg-red-400 hover:text-white text-base font-semibold  capitalize border border-red-500 px-2 py-[2px]  rounded-md cursor-pointer`}
              >
                Cancelled
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "delivered")}
                className={`text-emerald-500 hover:bg-emerald-400 hover:text-white text-base font-semibold   capitalize border border-emerald-500 px-2 py-[2px]  rounded-md cursor-pointer`}
              >
                Delivered
              </motion.p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-start flex-wrap w-full">
        <div className="flex items-center justify-center gap-4">
          {data?.items &&
            data?.items?.map((item, j) => (
              <motion.div
                {...staggerFadeInOut(j)}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.imageURL}
                  className="w-24 h-24 object-contain"
                  alt=""
                />

                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-black capitalize">
                    {item.product_name}
                  </p>
                  <div className="flex items-start justify-center gap-2">
                    <p className="text-sm text-black">Qty : {item.quantity}</p>
                    <p className="flex text-sm icon gap-1 text-black">
                      ₹{parseFloat(item.product_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        <div className="flex items-start justify-start flex-col gap-2 px-6  ml-auto w-full md:w-460">
          <h1 className="text-lg text-black font-semibold">
            {" "}
            {data.shipping_details.name}
          </h1>

          <p className="text-base text-black -mt-2">
            {data.customer && data.customer.email}{" "}
            {data.customer && data.customer.phone}
          </p>

          <p className="text-base text-black -mt-2">
            {data.shipping_details.address.line1}{" "}
            {data.shipping_details.address.line2}
            {data.shipping_details.address.country}
            {data.shipping_details.address.state} -
            {data.shipping_details.address.postal_code}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersData;
