import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import OrdersData from "./OrdersData";

const DBOrders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!orders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full gap-3">
      {orders ? (
        <>
          {orders.map((item, i) => (
            <OrdersData key={i} data={item} index={i} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-[72px] text-textColor font-bold">No Data</h1>
        </>
      )}
    </div>
  );
};

export default DBOrders;
