import React, { useEffect, useMemo } from "react";
import { CartRow } from "../index";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const calculateTotalPrice = useMemo(() => {
    return (
      cartItems.length > 0 &&
      cartItems
        .map((obj) =>
          obj.pSalePrice ? obj.pSalePrice * obj.pQty : obj.pPrice * obj.pQty
        )
        .reduce((currVal, accum) => currVal + accum)
    );
  }, [cartItems]);

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
            <CartRow product={product} key={product.$id} />
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
                Rs: {calculateTotalPrice && calculateTotalPrice.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Tax (10%)</td>
              <td className="border border-gray-300 p-2">
                Rs:{" "}
                {calculateTotalPrice && (calculateTotalPrice * 0.1).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">Total</td>
              <td className="border border-gray-300 p-2 font-bold">
                Rs:{" "}
                {calculateTotalPrice && (calculateTotalPrice * 1.1).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddToCart;
