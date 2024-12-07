import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { CategoryRow, Container, SearchBar } from "../index";

const AllCategories = () => {
  let { categoriesArr } = useSelector((state) => state.category);
  const [searchResult, setSearchResult] = useState(categoriesArr);

  const handleSearch = useCallback((data) => {
    setSearchResult((prevArr) =>
      prevArr.filter((catog) => catog.catogName === data.searchValue)
    );
  }, []);

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">Category Name</th>
              <th className="px-4 py-2 border-b text-left">Category Slug</th>
              <th className="px-4 py-2 border-b text-left">Parent Category</th>
              <th className="px-4 py-2 border-b text-left">Subcategories</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.length > 0 ? (
              searchResult.map((category) => (
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
    </Container>
  );
};

export default AllCategories;
