import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryRow } from "../index";
import { getCategoriesThunk } from "../../features/catogorySlice";

const AllCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  const { categoriesArr } = useSelector((state) => state.category);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left">Category Name</th>
            <th className="px-4 py-2 border-b text-left">Category Slug</th>
            <th className="px-4 py-2 border-b text-left">Parent Category</th>
            <th className="px-4 py-2 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoriesArr.length > 0 ? (
            categoriesArr.map((category) => (
              <CategoryRow key={category.$id} category={category} />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                No categories available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllCategories;
