import React, { useState, useId } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { LogoutBtn } from "../index";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaCog,
  FaPlus,
  FaList,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({}); // Tracks open submenus
  const authStatus = useSelector((state) => state.auth.status);
  const { userData } = useSelector((state) => state.auth);

  const navItems = [
    {
      name: "Dashboard",
      slug: "dashboard",
      icon: <FaTachometerAlt className="w-5 h-5" />,
    },
    {
      name: "Products",
      slug: "products",
      icon: <FaBox className="w-5 h-5" />,
      subsections: [
        {
          name: "Add Product",
          slug: "add-product",
          icon: <FaPlus className="w-4 h-4" />,
        },
        {
          name: "View Products",
          slug: "view-products",
          icon: <FaList className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Orders",
      slug: "orders",
      icon: <FaShoppingCart className="w-5 h-5" />,
      subsections: [
        {
          name: "Pending Orders",
          slug: "pending-orders",
          icon: <FaHourglassHalf className="w-4 h-4" />,
        },
        {
          name: "Completed Orders",
          slug: "completed-orders",
          icon: <FaCheckCircle className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Settings",
      slug: "settings",
      icon: <FaCog className="w-5 h-5" />,
    },
  ];

  const toggleSubmenu = (slug) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed lg:static z-20 bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 w-60 h-full`}
      >
        {/* Profile Section */}
        <div className="p-6 text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="User Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
          />
          <h2 className="text-lg mt-4">👋 Hello, {userData.name}</h2>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={useId()} className="relative">
                <div
                  onClick={() => item.subsections && toggleSubmenu(item.slug)}
                  className={`flex items-center justify-between  hover:bg-gray-700 ${
                    openSubmenus[item.slug] ? "bg-gray-700" : ""
                  }`}
                >
                  <NavLink
                    onClick={() => item.subsections && toggleSubmenu(item.slug)}
                    to={item.slug}
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 h-full w-full ${
                        isActive ? "bg-gray-700 text-white" : ""
                      }`
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                  {item.subsections && (
                    <button
                      className={`transition-transform transform ${
                        openSubmenus[item.slug] ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <RiArrowDropDownLine size={30} />
                    </button>
                  )}
                </div>
                {item.subsections && (
                  <div
                    className={` mt-2 overflow-hidden transition-all ${
                      openSubmenus[item.slug] ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    {item.subsections.map((subitem) => (
                      <NavLink
                        key={useId()}
                        to={subitem.slug}
                        className={({ isActive }) =>
                          `flex items-center gap-3 hover:bg-gray-700 pl-16 py-2 ${
                            isActive ? "bg-gray-700 text-white" : ""
                          }`
                        }
                      >
                        {subitem.icon}
                        {subitem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {authStatus && <LogoutBtn />}
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`lg:hidden ${
              isSidebarOpen ? "text-white" : "text-gray-800"
            } p-2 z-30`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">User Activities</h1>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {userData.name}</h2>
          <p className="text-gray-700">
            Here you can manage all user activities, settings, and reports.
          </p>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
