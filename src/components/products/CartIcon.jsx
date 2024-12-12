import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CartIcon() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <NavLink to="/cart">
      <div className="relative flex items-center">
        {/* Cart Icon */}
        <FiShoppingCart size={28} className="text-gray-700" />

        {/* Cart Count */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      </div>
    </NavLink>
  );
}
