import React, { useMemo } from "react";
import { Button, Container, MyTypoGraphy, Select } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateOrderThunk } from "../../features/ordersSlice";
import { removeFromCartThunk } from "../../features/userAddToCartSlice";

export default function UpdateOrderStatus({ order }) {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const completedCart = useMemo(() => {
    return cartItems.find(
      (cartItem) =>
        cartItem.pName === order.pName && cartItem.userId === order.userId
    );
  });

  const {
    pName,
    pSlug,
    pPrice,
    pSalePrice,
    pImage,
    pQty,
    userName,
    adminId,
    userId,
    $id,
  } = order;

  const orderStatusSubmit = async (data) => {
    if (data.orderStatus === "Pending...") {
      toast.error('The order status must be "Completed" or "Canceled" ');
      return;
    }

    const updatedOrder = await toast.promise(
      dispatch(
        updateOrderThunk({
          pName,
          pPrice,
          pImage,
          userId,
          pQty,
          pSlug,
          pSalePrice,
          adminId,
          userName,
          orderStatus: data.orderStatus,
          $id,
          completionDate: new Date(),
        })
      ).unwrap(),
      {
        pending: "Updating order status...",
      }
    );

    if (updatedOrder && updatedOrder.orderStatus === "Completed") {
      toast.success("Order has been completed!");
      navigate("/admin/completed-orders");
      dispatch(removeFromCartThunk({ $id: completedCart.$id }));
    } else if (updatedOrder && updatedOrder.orderStatus === "Canceled") {
      toast.info("Order has been canceled.");
      navigate("/admin/canceled-orders");
      dispatch(removeFromCartThunk({ $id: completedCart.$id }));
    }
  };

  return (
    <Container childElemClass="pt-20">
      <form onSubmit={handleSubmit(orderStatusSubmit)}>
        <MyTypoGraphy myClass="text-3xl mb-5 capitalize text-black">
          Update Order Status
        </MyTypoGraphy>
        <div>
          <Select
            options={["Pending...", "Completed", "Canceled"]}
            {...register("orderStatus", { required: true })}
          />
        </div>

        <Button myClass="mt-6">Update Order Status</Button>
      </form>
    </Container>
  );
}
