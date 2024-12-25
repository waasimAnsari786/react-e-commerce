// // import React from "react";
// // import { useSelector } from "react-redux";
// // import { Link } from "react-router-dom";

// // export default function HomePage() {
// //   const { productsArr } = useSelector((state) => state.product);
// //   const authstatus = useSelector((state) => state.auth.status);

// //   if (authstatus) {
// //     if (productsArr && productsArr.length === 0) {
// //       return (
// //         <div className="text-center">
// //           <p>No products are availbale to show</p>
// //         </div>
// //       );
// //     } else {
// //       return (
// //         <>
// //           <div
// //             className="hero min-h-screen bg-amber-800"
// //             style={{
// //               backgroundBlendMode: "multiply",
// //               backgroundImage:
// //                 "url(https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww)",
// //             }}
// //           >
// //             <div className="hero-overlay bg-opacity-60"></div>
// //             <div className="hero-content text-neutral-content text-center">
// //               <div className="max-w-md">
// //                 <h1 className="text-5xl font-bold capitalize text-white">
// //                   Shop the Latest Trends
// //                 </h1>
// //                 <p className="my-8">
// //                   Discover a curated collection of fashion, accessories, and
// //                   essentials designed to keep you stylish and ahead of the
// //                   trends. Explore unbeatable deals, premium quality, and the
// //                   latest arrivals—all in one place. Your perfect find is just a
// //                   click away!
// //                 </p>
// //                 <Link
// //                   to="shop"
// //                   className="bg-white rounded-md p-2 text-amber-700 transition-all duration-300 hover:bg-transparent border-2 border-white hover:text-white"
// //                 >
// //                   Shop Now
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>

// //         </>
// //       );
// //     }
// //   } else {
// //     return (
// //       <div className="text-center">
// //         <p>
// //           Login to view products!{" "}
// //           <Link className="underline" to="/login">
// //             Login
// //           </Link>
// //         </p>
// //         <p>
// //           Don't have an account?{" "}
// //           <Link className="underline" to="/signup">
// //             Signup
// //           </Link>
// //         </p>
// //       </div>
// //     );
// //   }
// // }

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { NavLink, Outlet } from "react-router-dom";
// import { LogoutBtn } from "../index";
// import {
//   FaTachometerAlt,
//   FaBox,
//   FaShoppingCart,
//   FaCog,
//   FaPlus,
//   FaList,
//   FaHourglassHalf,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { RiArrowDropDownLine } from "react-icons/ri";

// export default function AdminDashboard() {
//   const { userData, status } = useSelector((state) => state.auth);
//   const { profileImageObj } = useSelector((state) => state.profileImage);

//   const navItems = [
//     {
//       name: "Dashboard",
//       slug: "/admin/dashboard",
//       icon: <FaTachometerAlt className="w-5 h-5" />,
//     },
//     {
//       name: "Products",
//       slug: "/admin/products",
//       icon: <FaBox className="w-5 h-5" />,
//       subsections: [
//         {
//           name: "Add Product",
//           slug: "/admin/add-product",
//           icon: <FaPlus className="w-4 h-4" />,
//         },
//         {
//           name: "View Products",
//           slug: "/admin/products",
//           icon: <FaList className="w-4 h-4" />,
//         },
//       ],
//     },
//     {
//       name: "Orders",
//       slug: "/admin/pending-orders",
//       icon: <FaShoppingCart className="w-5 h-5" />,
//       subsections: [
//         {
//           name: "Pending Orders",
//           slug: "/admin/pending-orders",
//           icon: <FaHourglassHalf className="w-4 h-4" />,
//         },
//         {
//           name: "Completed Orders",
//           slug: "/admin/completed-orders",
//           icon: <FaCheckCircle className="w-4 h-4" />,
//         },
//         {
//           name: "Canceled Orders",
//           slug: "/admin/canceled-orders",
//           icon: <FaCheckCircle className="w-4 h-4" />,
//         },
//       ],
//     },
//     {
//       name: "Categories",
//       slug: "/admin/categories",
//       icon: <FaShoppingCart className="w-5 h-5" />,
//       subsections: [
//         {
//           name: "Add New Category",
//           slug: "/admin/add-category",
//           icon: <FaHourglassHalf className="w-4 h-4" />,
//         },
//         {
//           name: "View Categories",
//           slug: "/admin/categories",
//           icon: <FaCheckCircle className="w-4 h-4" />,
//         },
//       ],
//     },
//     {
//       name: "Settings",
//       slug: "settings",
//       icon: <FaCog className="w-5 h-5" />,
//     },
//   ];

//   return (
//     <div className="drawer lg:drawer-open">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content flex flex-col">
//         {/* Navbar */}
//         <header className="bg-white shadow p-4 flex justify-between items-center">
//           <label
//             htmlFor="my-drawer-2"
//             className="btn btn-primary drawer-button lg:hidden"
//           >
//             Open drawer
//           </label>
//           <h1 className="text-xl font-semibold">User Activities</h1>
//         </header>

//         {/* Main Content */}
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Welcome, {userData.name}</h2>
//           <p className="text-gray-700">
//             Here you can manage all user activities, settings, and reports.
//           </p>

//           <Outlet />
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div className="drawer-side">
//         <label
//           htmlFor="my-drawer-2"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//           {/* Profile Section */}
//           <li className="mb-4 text-center">
//             <NavLink to="/profile">
//               <img
//                 src={profileImageObj?.URL}
//                 alt="User Profile"
//                 className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
//               />
//               <h2 className="text-lg mt-4">👋 Hello, {userData.name}</h2>
//             </NavLink>
//           </li>

//           {/* Navigation Items */}
//           {navItems.map((item) => (
//             <li key={item.slug} className="my-2">
//               <div>
//                 <NavLink
//                   to={item.slug}
//                   className={({ isActive }) =>
//                     `flex items-center gap-4 py-3 ${isActive ? "bg-gray-700 text-white" : ""}`
//                   }
//                 >
//                   {item.icon}
//                   {item.name}
//                 </NavLink>
//                 {item.subsections && (
//                   <div className="collapse bg-indigo-800 my-2 hover:bg-indigo-950 transition-all duration-300">
//                     <input type="checkbox" />
//                     <div className="collapse-title text-md">
//                       <div className="flex justify-between items-center">
//                         {item.name}
//                         <RiArrowDropDownLine size={30} />
//                       </div>
//                     </div>
//                     <div className="collapse-content">
//                       {item.subsections.map((subitem) => (
//                         <NavLink
//                           key={subitem.slug}
//                           to={subitem.slug}
//                           className={({ isActive }) =>
//                             `flex items-center gap-3 pl-6 py-2 hover:bg-gray-700 ${
//                               isActive ? "bg-gray-700 text-white" : ""
//                             }`
//                           }
//                         >
//                           {subitem.icon}
//                           {subitem.name}
//                         </NavLink>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}

//           {/* Logout Button */}
//           {status && <LogoutBtn />}
//         </ul>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, ProductCard } from "../index";

export default function HomePage() {
  const { productsArr } = useSelector((state) => state.product);
  const authstatus = useSelector((state) => state.auth.status);

  if (authstatus) {
    if (productsArr && productsArr.length === 0) {
      return (
        <div className="text-center">
          <p>No products are available to show</p>
        </div>
      );
    } else {
      return (
        <>
          <div
            className="hero min-h-screen bg-amber-800"
            style={{
              backgroundBlendMode: "multiply",
              backgroundImage:
                "url(https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold capitalize text-white">
                  Shop the Latest Trends
                </h1>
                <p className="my-8">
                  Discover a curated collection of fashion, accessories, and
                  essentials designed to keep you stylish and ahead of the
                  trends. Explore unbeatable deals, premium quality, and the
                  latest arrivals—all in one place. Your perfect find is just a
                  click away!
                </p>
                <Link
                  to="shop"
                  className="bg-white rounded-md p-2 text-amber-700 transition-all duration-300 hover:bg-transparent border-2 border-white hover:text-white"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Products Section */}

          <Container childElemClass="pt-20">
            <h2 className="text-3xl font-bold text-black text-center">
              Featured <span className="text-amber-700">Products</span>
            </h2>
            <p className="text-gray-600 mt-2 mb-8 text-center">
              Handpicked selections just for you
            </p>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {productsArr.map((product, i) =>
                i < 3 ? (
                  <ProductCard
                    key={i}
                    product={
                      productsArr[
                        Math.floor(Math.random() * productsArr.length)
                      ]
                    }
                  />
                ) : null
              )}
            </div>
          </Container>
        </>
      );
    }
  } else {
    return (
      <div className="text-center">
        <p>
          Login to view products!{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </p>
        <p>
          Don&apos;t have an account?{" "}
          <Link className="underline" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    );
  }
}
