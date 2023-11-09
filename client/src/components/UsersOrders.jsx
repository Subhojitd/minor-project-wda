import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../api";
import { Header, OrdersData } from "../components";
import { setOrders } from "../context/actions/ordersAction";
import { OrderSomething } from "../assets/img";

const UsersOrders = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    if (!orders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
        setUserOrders(data.filter((item) => item.userId === user?.user_id));
      });
    } else {
      setUserOrders(orders.filter((data) => data.userId === user?.user_id));
    }
  }, [orders]);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-gradient-to-br from-white to-[#80b4fb]">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        {userOrders?.length > 0 ? (
          <>
            {userOrders.map((item, i) => (
              <OrdersData key={i} index={i} data={item} admin={false} />
            ))}
          </>
        ) : (
          <>
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <img src={OrderSomething} className="w-[300px]" alt="" />
              <h1 className="text-[40px] text-red-600 font-bold">
                Please order something !
              </h1>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default UsersOrders;
