import React, { useEffect, useId, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import auth from "../../appwrite/authService";
import { logout } from "../../features/authSlice";

export default function Header() {
  const { categoriesArr } = useSelector((state) => state.category);
  const { status, userData } = useSelector((state) => state.auth);
  const { profileImageObj } = useSelector((state) => state.profileImage);
  const { cartItems } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logedOut = await auth.logOut();
    if (logedOut) {
      dispatch(logout());
      navigate("login");
    }
  };

  const calculatedTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.pSalePrice
        ? item.pSalePrice * item.pQty
        : item.pPrice * item.pQty;

      return total + price;
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    setTotal(calculatedTotal);
  }, [cartItems]);

  const navItems = [
    { name: "Home", slug: "/", active: true, id: useId() },
    { name: "About Us", slug: "about-us", active: status, id: useId() },
    { name: "Login", slug: "login", active: !status, id: useId() },
    { name: "Signup", slug: "signup", active: !status, id: useId() },
    { name: "Shop", slug: "shop", active: status, id: useId() },
  ];

  return (
    <div className="navbar bg-amber-800 fixed top-0 z-10">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent border-transparent text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-amber-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems
              .filter((item) => item.active)
              .map((item) => (
                <li key={item.id} className="bg-transparent text-white">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-white text-amber-700" : ""
                    }
                    to={item.slug}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

            <li>
              {status && (
                <details>
                  <summary className="text-white">Categories</summary>
                  <ul className="p-2 rounded-box">
                    {categoriesArr.map((category) => (
                      <li key={category.catogSlug} className="text-white">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "bg-white text-amber-700" : ""
                          }
                          to={`categories/${category.catogSlug}`}
                        >
                          {category.catogName}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          </ul>
        </div>
        <Link to="#" className=" w-36 text-xl p-2 rounded-md bg-amber-800">
          <img
            src="/logo/fulllogo_transparent_nobuffer.png"
            className="w-full"
            alt="logo"
          />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems
            .filter((item) => item.active)
            .map((item) => (
              <li key={item.id} className="bg-transparent text-white">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "bg-white text-amber-700" : ""
                  }
                  to={item.slug}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          <li tabIndex={0}>
            {status && (
              <details>
                <summary className="text-white">Categories</summary>
                <ul className="p-2 bg-amber-800 rounded-box">
                  {categoriesArr.map((category) => (
                    <li
                      key={category.catogSlug}
                      className="bg-transparent text-white"
                    >
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "bg-white text-amber-700" : ""
                        }
                        to={`categories/${category.catogSlug}`}
                      >
                        {category.catogName}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      {status && (
        <div className="navbar-end flex items-center">
          {/* Cart Section */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItems.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-white shadow-lg shadow-gray-400 z-[1] mt-3 w-52 "
            >
              <div className="card-body">
                <span className="text-lg font-bold text-amber-800">
                  {cartItems.length} Items
                </span>
                <span className="text-amber-800">
                  Subtotal: {total + total / 10}
                </span>
                <div className="card-actions">
                  <Link to="/cart" className="text-amber-800">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Avatar Section */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={profileImageObj?.URL}
                  alt="User's image"
                  className="h-32 w-32 rounded-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow-lg shadow-gray-400 text-amber-700 space-y-2 bg-white"
            >
              <li>
                <Link to="/profile">
                  <p>Hello {userData.name}</p>
                </Link>
              </li>

              <li>
                <Link to="/profile">
                  <p>Profile</p>
                </Link>
              </li>
              <li>
                <p className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
