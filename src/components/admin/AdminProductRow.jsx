import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProductThunk } from "../../features/productSlice";
import { Button } from "../index";

export default function AdminProductRow({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { preview_URL_Arr } = useSelector((state) => state.file);
  const {
    pName,
    pSlug,
    pParentCategory,
    pStockStatus,
    pPrice,
    pSalePrice,
    pImage,
    $id,
  } = product;

  return (
    <tr className="border-b">
      <td className="px-4 py-2">
        <img
          src={
            preview_URL_Arr.find((preview) => preview.fileId === pImage)?.URL ||
            ""
          }
          alt={`${pName}'s image`}
          className="h-1/2 w-full rounded-md"
        />
      </td>
      <td className="px-4 py-2">{pName}</td>
      <td className="px-4 py-2">{pSlug}</td>
      <td className="px-4 py-2">{pParentCategory.join(", ") || "None"}</td>
      <td className="px-4 py-2">{pPrice}</td>
      <td className="px-4 py-2">{pSalePrice}</td>
      <td className="px-4 py-2">{pStockStatus}</td>
      <td className="px-4 py-2 text-center">
        <Button
          myClass="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
          onClick={() => navigate(`/admin/edit-product/${pSlug}`)}
        >
          Edit
        </Button>
        <Button
          myClass="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => dispatch(deleteProductThunk(product))}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
