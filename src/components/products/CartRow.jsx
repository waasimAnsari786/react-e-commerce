import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button, MyTypoGraphy } from "../index";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  removeFromCartThunk,
  updateCartItemThunk,
} from "../../features/userAddToCartSlice";
import { NavLink } from "react-router-dom";

const CartRow = ({ product }) => {
  const { pImage, pName, pPrice, pQty, $id, pSlug } = product;
  const dispatch = useDispatch();

  const [value, setValue] = useState(pQty);

  const updateCart = (product) => {
    let { pQty, $id, pName, pPrice, pImage } = product;
    if (value !== pQty) {
      dispatch(
        updateCartItemThunk({ pQty: value, pName, pPrice, pImage, $id })
      );
    }
  };

  return (
    <tr className="border border-gray-300 p-2 ">
      <td>
        <NavLink to={`/product/${pSlug}`}>
          <img
            src={pImage}
            alt={pName}
            className="w-16 h-16 object-cover rounded"
          />
        </NavLink>
      </td>
      <td>{pName}</td>
      <td>Rs : {pPrice}</td>
      <td>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setValue((prev) => (prev < 5 ? prev + 1 : prev));
            }}
          >
            +
          </Button>
          <MyTypoGraphy>{value !== pQty ? value : pQty}</MyTypoGraphy>
          <Button
            onClick={() => {
              setValue((prev) => (prev > 1 ? prev - 1 : prev));
            }}
          >
            -
          </Button>
        </div>
      </td>
      <td>
        <Button onClick={() => dispatch(removeFromCartThunk($id))}>
          <AiOutlineClose
            size={20}
            className="text-red-500 hover:text-red-700"
          />
        </Button>
        <Button onClick={() => updateCart(product)}>
          <CiEdit size={20} className="text-green-500 hover:text-green-700" />
        </Button>
      </td>
    </tr>
  );
};

export default CartRow;
