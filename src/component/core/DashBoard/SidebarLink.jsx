import React from "react";
import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from "react-router-dom";
function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute left-0 top-0 w-[0.2rem] h-full bg-yellow-5 ${
          matchRoute(link.path) ? "bg-opacity-100" : "bg-opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        <Icon className="text-[18px]" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}

export default SidebarLink;
