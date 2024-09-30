import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const VerificationOfTakeoverProject = () => {
  return (
    <div
      className="flex flex-col w-full text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/takeover-detail_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top left",
      }}
    >
      <div className="mx-0 mt-[80px] flex w-full max-w-[1358px] flex-col items-center justify-between px-4 pt-[36px] sm:px-[48px] md:mx-auto md:mt-[124px] md:flex-row md:items-start md:gap-0">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default VerificationOfTakeoverProject;
