import React, { useEffect, useState } from "react";
import { Button, MyTypoGraphy } from "../index";
import { useDispatch } from "react-redux";
import {
  removeFromCartThunk,
  updateCartItemThunk,
} from "../../features/userAddToCartSlice";
import { Link } from "react-router-dom";
import { updateOrderThunk } from "../../features/ordersSlice";
import { toast } from "react-toastify";

const CartRow = ({ product }) => {
  const {
    pName,
    pPrice,
    pImage,
    userId,
    pQty,
    pSlug,
    pSalePrice,
    adminId,
    userName,
    pParentCategory,
    $id,
    orderId,
    productId,
  } = product;
  const dispatch = useDispatch();

  const [value, setValue] = useState(pQty);

  useEffect(() => {
    setValue(pQty);
  }, [pQty]);

  const updateOrderAndCart = async () => {
    await toast.promise(
      (async () => {
        const updatedOrder = await dispatch(
          updateOrderThunk({
           
            pName,
            pPrice,
            pImage,
            userId,
            pQty: value,
            pSlug,
            pSalePrice,
            adminId,
            userName,
            $id: orderId,
          })
        ).unwrap();

        const updatedCart = await dispatch(
          updateCartItemThunk({
            pName,
            pPrice,
            pImage,
            userId,
            pQty: value,
            pSlug,
            pSalePrice,
            adminId,
            userName,
            pParentCategory,
            $id,
            orderId,
          })
        ).unwrap();

        return { updatedOrder, updatedCart };
      })(),
      {
        pending: "Updating your cart...",
        success: "Product updated in your cart!",
        error: "Failed to update the cart. Please try again.",
      }
    );
  };

  const removeProductFromCart = async () => {
    await toast.promise(
      (async () => {
        const updatedOrder = await dispatch(
          updateOrderThunk({
            pName,
            pPrice,
            pImage,
            userId,
            pQty: value,
            pSlug,
            pSalePrice,
            adminId,
            userName,
            $id: orderId,
            orderStatus: "Canceled",
          })
        ).unwrap();

        const deletedCart = await dispatch(
          removeFromCartThunk(product)
        ).unwrap();

        return { updatedOrder, deletedCart };
      })(),
      {
        pending: "Removing product from your cart...",
        success: "Product removed from your cart!",
        error: "Failed to remove the product. Please try again.",
      }
    );
  };

  return (
    <tr className="border-none">
      <td>
        <Link to={`/product/${pSlug}/${productId}`}>
          <img src={pImage} alt={pName} className="h-28 rounded-md" />
        </Link>
      </td>
      <td>{pName}</td>
      {pSalePrice ? (
        <td>
          <div className="flex gap-2">
            <MyTypoGraphy myClass="line-through">Rs: {pPrice}</MyTypoGraphy>
            <MyTypoGraphy>Rs: {pSalePrice}</MyTypoGraphy>
          </div>
        </td>
      ) : (
        <td>
          <MyTypoGraphy>Rs: {pPrice}</MyTypoGraphy>
        </td>
      )}
      <td>
        <div className="flex items-center gap-2 my-10">
          <Button
            bgColor="bg-white"
            textColor="text-black"
            onClick={() => {
              setValue((prev) => (prev < 5 ? prev + 1 : prev));
            }}
          >
            +
          </Button>
          <MyTypoGraphy>{value}</MyTypoGraphy>
          <Button
            bgColor="bg-white"
            textColor="text-black"
            onClick={() => {
              setValue((prev) => (prev > 1 ? prev - 1 : prev));
            }}
          >
            -
          </Button>
        </div>
      </td>
      <td>
        <div className="flex gap-2">
          <Button
            onClick={removeProductFromCart}
            bgColor="bg-red-500 hover:bg-red-700"
            padding="p-1"
          >
            Delete
          </Button>

          <Button
            onClick={updateOrderAndCart}
            bgColor="bg-green-500 hover:bg-green-700"
            padding="p-1"
          >
            Update
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default CartRow;
