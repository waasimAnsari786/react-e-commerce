import React, { useId } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MyTypoGraphy } from "../index";
import { ImProfile } from "react-icons/im";

export default function Footer() {
  const { userData, status } = useSelector((state) => state.auth);
  const { categoriesArr } = useSelector((state) => state.category);
  const navItems = [
    { name: "Home", slug: "/", active: true, id: useId() },
    { name: "About Us", slug: "about-us", active: status, id: useId() },
    { name: "Login", slug: "login", active: !status, id: useId() },
    { name: "Signup", slug: "signup", active: !status, id: useId() },
    { name: "Shop", slug: "shop", active: status, id: useId() },
  ];
  return (
    userData &&
    userData.userRole !== "Admin" && (
      <>
        <footer className="footer bg-amber-800 text-white mt-20 p-10">
          <aside>
            <Link to="#" className="w-52 p-2 rounded-md bg-amber-800">
              <img
                src="/logo/fulllogo_transparent_nobuffer.png"
                className="w-full"
                alt="logo"
              />
            </Link>
            <p>
              At DualCart, we bring quality and convenience together. <br />
              Your satisfaction is our priority.
            </p>
          </aside>
          <nav>
            <h6 className="font-bold text-lg uppercase text-white">
              Quick Links
            </h6>
            {navItems.map(
              (item) =>
                item.active && (
                  <NavLink
                    className={({ isActive }) => (isActive ? "underline" : "")}
                    key={item.id}
                    to={item.slug}
                  >
                    {item.name}
                  </NavLink>
                )
            )}
          </nav>
          <nav>
            <h6 className="font-bold text-lg uppercase text-white">
              Categories
            </h6>
            {categoriesArr.map((category) => (
              <NavLink
                className={({ isActive }) => (isActive ? "underline" : "")}
                key={category.$id}
                to={`categories/${category.catogSlug}`}
              >
                {category.catogName}
              </NavLink>
            ))}
          </nav>
          <nav>
            <h6 className="font-bold text-lg uppercase text-white">
              Social Media Links
            </h6>
            <Link
              target="_blank"
              to="https://github.com/waasimAnsari786"
              className="flex gap-2"
            >
              <FaGithub size={25} />
              <p>GitHub</p>
            </Link>
            <Link
              target="_blank"
              to="https://www.linkedin.com/in/waasim-ansari-39741b28b/"
              className="flex gap-2"
            >
              <FaLinkedin size={25} />
              <p>LinkedIn</p>
            </Link>
            <Link
              target="_blank"
              to="https://waasim-portfolio-2.netlify.app/"
              className="flex gap-2"
            >
              <ImProfile size={25} />
              <p>Portfolio</p>
            </Link>
          </nav>
        </footer>
        <MyTypoGraphy myClass="bg-amber-800 text-center text-white border-t-2 border-white py-4">
          @Copyright all rights reserved | This store is designed by{" "}
          <Link
            to="https://waasim-portfolio-2.netlify.app/"
            className="underline"
            target="_blank"
          >
            Waasim Ansari
          </Link>
        </MyTypoGraphy>
      </>
    )
  );
}
