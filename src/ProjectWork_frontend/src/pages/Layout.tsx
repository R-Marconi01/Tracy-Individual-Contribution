import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="bg-slate-200 w-full ">
      <div className="mx-0 md:mx-20 bg-slate-400 text-white">
        <Navbar />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;