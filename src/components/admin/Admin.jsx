import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LogoutBtn, MyTypoGraphy } from "../index";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaPlus,
  FaList,
  FaHourglassHalf,
  FaCheckCircle,
  FaThLarge,
  FaTimes,
  FaBars,
} from "react-icons/fa";

import { RiArrowDropDownLine } from "react-icons/ri";

export default function AdminDashboard() {
  const { userData, status } = useSelector((state) => state.auth);
  const { profileImageObj } = useSelector((state) => state.profileImage);

  const navItems = [
    {
      name: "Dashboard",
      slug: "/admin/dashboard",
      icon: <FaTachometerAlt className="w-5 h-5" />,
    },
    {
      name: "Products",
      slug: "/admin/products",
      icon: <FaBox className="w-5 h-5" />,
      subsections: [
        {
          name: "Add Product",
          slug: "/admin/add-product",
          icon: <FaPlus className="w-4 h-4" />,
        },
        {
          name: "View Products",
          slug: "/admin/products",
          icon: <FaList className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Orders",
      slug: "/admin/pending-orders",
      icon: <FaShoppingCart className="w-5 h-5" />,
      subsections: [
        {
          name: "Pending Orders",
          slug: "/admin/pending-orders",
          icon: <FaHourglassHalf className="w-4 h-4" />,
        },
        {
          name: "Completed Orders",
          slug: "/admin/completed-orders",
          icon: <FaCheckCircle className="w-4 h-4" />,
        },
        {
          name: "Canceled Orders",
          slug: "/admin/canceled-orders",
          icon: <FaTimes className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Categories",
      slug: "/admin/categories",
      icon: <FaThLarge className="w-5 h-5" />,
      subsections: [
        {
          name: "Add New Category",
          slug: "/admin/add-category",
          icon: <FaPlus className="w-4 h-4" />,
        },
        {
          name: "View Categories",
          slug: "/admin/categories",
          icon: <FaList className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Profile",
      slug: "/profile",
      icon: <FaUserCircle className="w-5 h-5" />,
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-white">
        {/* Navbar */}
        <header className="p-2 flex justify-between items-center shadow-gray-500 shadow-md fixed top-0 w-full bg-white z-10">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-amber-800 text-white drawer-button order-3 lg:hidden"
          >
            <FaBars size={20} />
          </label>
          <div className="bg-amber-800 w-28 sm:w-32 p-3 rounded-md">
            <img
              src="/logo/fulllogo_transparent_nobuffer.png"
              className="w-full"
              alt="logo"
            />
          </div>
          <h1 className="text-xl font-semibold text-amber-700 hidden sm:block">
            User Activities
          </h1>
        </header>

        {/* Main Content */}
        <div className="p-2">
          <h2 className="text-2xl font-bold text-black mt-28">
            Welcome, <span className="text-amber-700"> {userData.name}</span>
          </h2>
          <MyTypoGraphy myClass="text-black mb-4">
            Here you can manage all your activities, settings, and reports.
          </MyTypoGraphy>

          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Profile Section */}

        <ul
          className="menu bg-amber-800 text-white min-h-full w-64
         sm:w-72 p-4"
        >
          <div className="flex flex-col mb-5">
            <NavLink to="/profile" className="flex flex-col">
              <div className="relative rounded-full mx-auto border-4 border-amber-900 overflow-hidden">
                <img
                  src={profileImageObj?.URL}
                  alt="User Profile"
                  className="w-24 h-24"
                />
              </div>
              <h2 className="text-lg text-center mt-4">
                👋 Hello, {userData.name}
              </h2>
            </NavLink>
          </div>
          {/* Navigation Items */}
          {navItems.map((item) =>
            item.subsections ? (
              <div
                className="collapse hover:bg-amber-700 transition-all duration-300 rounded-md"
                key={item.name}
              >
                <input type="checkbox" />
                <div className="collapse-title text-md">
                  <div className="flex justify-between items-center">
                    <span className="flex gap-2">
                      {item.icon}
                      {item.name}
                    </span>

                    <RiArrowDropDownLine size={30} />
                  </div>
                </div>
                <div className="collapse-content">
                  {item.subsections.map((subitem) => (
                    <NavLink
                      key={subitem.slug}
                      to={subitem.slug}
                      className={({ isActive }) =>
                        `flex items-center gap-3 pl-6 py-2 hover:bg-amber-800 transition-all duration-300 rounded-md ${
                          isActive ? "bg-amber-900" : "bg-transparent"
                        }`
                      }
                    >
                      {subitem.icon}
                      {subitem.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                to={item.slug}
                key={item.slug}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 hover:bg-amber-800 rounded-md ${
                    isActive ? "bg-amber-900" : ""
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            )
          )}
          {/* Logout Button */}
          {status && <LogoutBtn />}
        </ul>
      </div>
    </div>
  );
}
