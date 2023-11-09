import React from "react";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { DeliveryTruck } from "../assets/img";
const DBLeftSection = () => {
  return (
    <div className="h-full pt-12 flex flex-col  bg-white backdrop-blur-md  shadow-md min-w-210 w-300 gap-3">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <h1 className="text-3xl md:text-4xl  flex items-center justify-center gap-3 font-logo text-sky-500 tracking-wide">
          AquaExpress
        </h1>
        <div className="-ml-3">
          <img src={DeliveryTruck} className="w-8" alt="" />
        </div>
      </NavLink>
      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-200 border-l-8 border-blue-500`
              : isNotActiveStyles
          }
          to={"/dashboard/home"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-200 border-l-8 border-blue-500`
              : isNotActiveStyles
          }
          to={"/dashboard/orders"}
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-200 border-l-8 border-blue-500`
              : isNotActiveStyles
          }
          to={"/dashboard/items"}
        >
          Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-200 border-l-8 border-blue-500`
              : isNotActiveStyles
          }
          to={"/dashboard/newitems"}
        >
          Add New Item
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-200 border-l-8 border-blue-500`
              : isNotActiveStyles
          }
          to={"/dashboard/users"}
        >
          Users
        </NavLink>
      </ul>
    </div>
  );
};

export default DBLeftSection;
