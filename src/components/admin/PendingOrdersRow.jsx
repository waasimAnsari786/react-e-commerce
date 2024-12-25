import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../index";

export default function PendingOrdersRow({
  index,
  order,
  completedOrder = false,
  canceledOrder = false,
}) {
  const {
    pName,
    pSlug,
    pPrice,
    pSalePrice,
    pImage,
    pQty,
    userName,
    $id,
    orderStatus,
  } = order;

  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">
        <img
          src={pImage}
          alt={`${pName}'s image`}
          className="h-1/2 w-full rounded-md"
        />
      </td>
      <td className="px-4 py-2">{pName}</td>
      <td className="px-4 py-2">{pSlug}</td>
      <td className="px-4 py-2">{pQty}</td>
      <td className="px-4 py-2">{pPrice}</td>
      <td className="px-4 py-2">{pSalePrice}</td>
      <td className="px-4 py-2">
        <span
          className={`p-1 rounded-md ${
            orderStatus === "Pending..."
              ? "bg-orange-500"
              : orderStatus === "Completed"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {orderStatus}
        </span>
      </td>
      <td className="px-4 py-2">{userName}</td>
      <td className="px-4 py-2 flex justify-center items-center my-10 gap-2">
        {!completedOrder && !canceledOrder && (
          <Button
            myClass="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
            onClick={() => navigate(`/admin/edit-orders/${$id}`)}
          >
            Edit
          </Button>
        )}
      </td>
    </tr>
  );
}
