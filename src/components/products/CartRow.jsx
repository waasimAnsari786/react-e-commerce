import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button, MyTypoGraphy } from "../index";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  removeFromCartThunk,
  updateCartItemThunk,
} from "../../features/userAddToCartSlice";
import { Link } from "react-router-dom";

const CartRow = ({ product }) => {
  let { pImage, pName, pPrice, pQty, $id, pSlug, pSalePrice } = product;
  const dispatch = useDispatch();

  const [value, setValue] = useState(pQty);

  useEffect(() => {
    setValue(pQty);
  }, [pQty]);

  return (
    <tr className="border border-gray-300 p-2 ">
      <td>
        <Link to={`/product/${pSlug}`}>
          <img
            src={pImage}
            alt={pName}
            className="w-16 h-16 object-cover rounded"
          />
        </Link>
      </td>
      <td>{pName}</td>
      <td>
        {pSalePrice ? (
          <div className=" flex space-x-4">
            <MyTypoGraphy myClass="line-through">Rs: {pPrice}</MyTypoGraphy>
            <MyTypoGraphy>Rs: {pSalePrice}</MyTypoGraphy>
          </div>
        ) : (
          <MyTypoGraphy>Rs: {pPrice}</MyTypoGraphy>
        )}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setValue((prev) => (prev < 5 ? prev + 1 : prev));
            }}
          >
            +
          </Button>
          <MyTypoGraphy>{value}</MyTypoGraphy>
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
        <Button onClick={() => dispatch(removeFromCartThunk(product))}>
          <AiOutlineClose
            size={20}
            className="text-red-500 hover:text-red-700"
          />
        </Button>
        <Button
          onClick={() =>
            dispatch(
              updateCartItemThunk({
                pQty: value,
                pName,
                pPrice,
                pImage,
                $id,
                userId: product.userId,
              })
            )
          }
        >
          <CiEdit size={20} className="text-green-500 hover:text-green-700" />
        </Button>
      </td>
    </tr>
  );
};

export default CartRow;
