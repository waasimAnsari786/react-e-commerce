import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button, MyTypoGraphy } from "../index";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeFromCartThunk } from "../../features/userAddToCartSlice";

const CartRow = ({ product }) => {
  const { pImage, pName, pPrice, pQty, $id } = product;
  const dispatch = useDispatch();

  const [value, setValue] = useState(1);

  return (
    <tr>
      <td>
        <img
          src={pImage}
          alt={pName}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td>{pName}</td>
      <td>Rs : {pPrice}</td>
      <td>
        <div className="flex items-center gap-2">
          <Button>+</Button>
          <MyTypoGraphy>{pQty}</MyTypoGraphy>
          <Button>-</Button>
        </div>
      </td>
      <td>
        <Button onClick={() => dispatch(removeFromCartThunk($id))}>
          <AiOutlineClose
            size={20}
            className="text-red-500 hover:text-red-700"
          />
        </Button>
        <Button onClick={() => removeItem(id)}>
          <CiEdit size={20} className="text-green-500 hover:text-green-700" />
        </Button>
      </td>
    </tr>
  );
};

export default CartRow;
