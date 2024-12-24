import React from "react";
import { useDispatch } from "react-redux";
import { removeCategoryThunk } from "../../features/catogorySlice";
import { useNavigate } from "react-router-dom";
import { Button } from "../index";

const CategoryRow = ({ category, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{category.catogName}</td>
      <td className="px-4 py-2">{category.catogSlug}</td>
      <td className="px-4 py-2">{category.parentCatog || "None"}</td>
      <td className="px-4 py-2">{category.subCatogs?.join(", ") || "None"}</td>
      {category.catogName !== "Uncategorise" && (
        <td className="px-4 py-2 flex justify-center items-center my-10 gap-2">
          <Button
            myClass="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
            onClick={() =>
              navigate(
                `/admin/edit-category/${category.catogSlug}/${category.$id}`
              )
            }
          >
            Edit
          </Button>
          <Button
            myClass="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => dispatch(removeCategoryThunk(category))}
          >
            Delete
          </Button>
        </td>
      )}
    </tr>
  );
};

export default CategoryRow;
