import React, { useEffect, useMemo } from "react";
import { CartRow, Container } from "../index";
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
    <Container childElemClass="pt-28">
      <h1 className="text-2xl font-semibold mb-4 text-amber-800">
        Shopping Cart
      </h1>
      <div className="overflow-x-auto my-6">
        <table className="table bg-amber-800 text-white table-xs sm:table-lg p-3">
          <thead>
            <tr>
              <th className="text-white">Image</th>
              <th className="text-white">Name</th>
              <th className="text-white">Price</th>
              <th className="text-white">Quantity</th>
              <th className="text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <CartRow product={product} key={product.$id} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Price Calculation Table */}
      <div className="max-w-md">
        <table className="w-full bg-amber-800 text-white border-collapse border border-gray-300">
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
    </Container>
  );
};

export default AddToCart;
