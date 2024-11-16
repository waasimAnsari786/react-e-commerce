import React, { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LogoutBtn } from "../index";
import auth from "../../appwrite/authService";
import { login } from "../../features/authSlice";
import { getProductsThunk } from "../../features/productSlice";
import userRole from "../../appwrite/userRoleService";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const getedUser = await auth.getCurrentUser();
    if (getedUser) {
      dispatch(login(getedUser));
      dispatch(getProductsThunk());
      const getedUserRole = await userRole.getUserRole(userData.email);
      if (getedUserRole && getedUserRole.documents[0].role === "Admin") {
        navigate("/admin");
      } else if (getedUserRole && getedUserRole.documents[0].role === "Buyer") {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [authStatus]);

  const navItems = [
    { name: "Home", slug: "/", active: true, id: useId() },
    { name: "Login", slug: "/login", active: !authStatus, id: useId() },
    { name: "Signup", slug: "/signup", active: !authStatus, id: useId() },
    {
      name: "Add Product",
      slug: "/add-product",
      active: authStatus,
      id: useId(),
    },
    { name: "Products", slug: "/products", active: authStatus, id: useId() },
  ];

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Navbar Title</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.id}>
                    <NavLink to={item.slug}>{item.name}</NavLink>
                  </li>
                ) : null
              )}
              {authStatus && <LogoutBtn />}
            </ul>
          </div>
        </div>
        {/* Page content here */}
        Content
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.id}>
                <NavLink to={item.slug}>{item.name}</NavLink>
              </li>
            ) : null
          )}
          {authStatus && <LogoutBtn />}
        </ul>
      </div>
    </div>
  );
}
