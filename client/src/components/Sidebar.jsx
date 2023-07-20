import React, { useState } from "react";
import { FaBars, FaRegChartBar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { SiCoursera } from "react-icons/si";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { MdOutlineQuiz } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/teacher/home",
      name: "Profile",
      icon: <CgProfile />,
    },
    {
      path: "/teacher/create",
      name: "Add Course",
      icon: <SiCoursera />,
    },
    {
      path: "/teacher/courses",
      name: "View All-Course",
      icon: <HiMiniViewfinderCircle />,
    },
    {
      path: "/teacher/analytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/teacher/quiz",
      name: "Add Quiz",
      icon: <MdOutlineQuiz />,
    },

    {
      path: "/logout",
      name: "Logout",
      icon: <LuLogOut />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
