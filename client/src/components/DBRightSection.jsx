import React from "react";
import {
  DBHeader,
  DBHome,
  DBNewItems,
  DBItems,
  DBOrders,
  DBUsers,
} from "../components";
import { Route, Routes } from "react-router-dom";

const DBRightSection = () => {
  return (
    <div className="flex flex-col bg-sky-200 p-12 flex-1 h-full">
      <DBHeader />
      <div
        className="flex flex-col flex-1 overflow-y-scroll
      scrollbar-none"
      >
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/users" element={<DBUsers />} />
          <Route path="/newitems" element={<DBNewItems />} />
          <Route path="/items" element={<DBItems />} />"
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
