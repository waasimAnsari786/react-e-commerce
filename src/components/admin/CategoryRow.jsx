import React from "react";
import { useDispatch } from "react-redux";
import { removeCategoryThunk } from "../../features/catogorySlice";
import { useNavigate } from "react-router-dom";

const CategoryRow = ({ category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{category.catogName}</td>
      <td className="px-4 py-2">{category.catogSlug}</td>
      <td className="px-4 py-2">{category.parentCatog || "None"}</td>
      <td className="px-4 py-2">{category.subCatogs.join(", ") || "None"}</td>
      <td className="px-4 py-2 text-center">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
          onClick={() => navigate(`/admin/edit-category/${category.catogSlug}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => dispatch(removeCategoryThunk(category))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;