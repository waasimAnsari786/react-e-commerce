import React, { useState } from "react";
import { CartRow } from "../index";
import { useSelector } from "react-redux";

const AddToCart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate total price
  // const totalPrice = cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product) => (
            <CartRow key={product.$id} product={product} />
          ))}
        </tbody>
      </table>

      {/* Price Calculation Table */}
      <div className="max-w-md">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Subtotal</td>
              <td className="border border-gray-300 p-2">
                {/* ${totalPrice.toFixed(2)} */}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Tax (10%)</td>
              <td className="border border-gray-300 p-2">
                {/* ${(totalPrice * 0.1).toFixed(2)} */}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">Total</td>
              <td className="border border-gray-300 p-2 font-bold">
                {/* ${(totalPrice * 1.1).toFixed(2)} */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddToCart;
