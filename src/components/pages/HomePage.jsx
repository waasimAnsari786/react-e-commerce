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
          <Link className="underline" to="login">
            Login
          </Link>
        </p>
        <p>
          Don&apos;t have an account?{" "}
          <Link className="underline" to="signup">
            Signup
          </Link>
        </p>
      </div>
    );
  }
}
