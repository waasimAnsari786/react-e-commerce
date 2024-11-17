import React, { useState, useId } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { LogoutBtn } from "../index";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  const btns = [
    {
      name: "Add Product",
      slug: "add-product",
      active: authStatus,
      id: useId(),
    },

    {
      name: "View Products",
      slug: "products",
      active: authStatus,
      id: useId(),
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed lg:static z-20 bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 w-60 h-full`}
      >
        <div className="p-4">
          <h2 className="text-2xl mt-10 font-bold">Admin Dashboard</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {btns.map((item) => (
              <li key={item.id}>
                <NavLink to={item.slug}>{item.name}</NavLink>
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
          <h2 className="text-2xl font-bold mb-4">Welcome, Admin</h2>
          <p className="text-gray-700">
            Here you can manage all user activities, settings, and reports.
          </p>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
