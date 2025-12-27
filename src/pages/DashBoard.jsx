import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

import Sidebar from "../component/core/DashBoard/Sidebar";
function DashBoard() {
  const [open, setOpen] = useState(true);
  const { loaading: authLoading } = useSelector((state) => state.auth);
  const { loaading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <div className="mt-20 text-white">Loading...</div>;
  }

  return (
    <div className="relative flex text-white mt-20">
      <div className="max-md:absolute z-10 h-full">
        <div
          className="md:hidden z-50 absolute duration-1000 right-0"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <GoSidebarCollapse className="text-3xl text-white" />
          ) : (
            <GoSidebarExpand className="text-3xl" />
          )}
        </div>

        <div
          className={`z-10   ${open ? "max-md:hidden h-full" : "flex h-full"} `}
        >
          <Sidebar></Sidebar>
        </div>
      </div>

      <div
        className=" absolute z-[0] left-4 top-4"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <GoSidebarCollapse className="text-3xl text-white" />
        ) : (
          <GoSidebarExpand className="text-3xl" />
        )}
      </div>
      <div className="h-full overflow-auto flex justify-center items-center w-full">
        <div className="mx-auto w-11/12 flex  items-center  py-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
