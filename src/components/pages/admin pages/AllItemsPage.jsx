import React, { useCallback, useEffect, useState } from "react";
import {
  CategoryRow,
  Container,
  SearchBar,
  AdminProductRow,
} from "../../index";
import { useSelector } from "react-redux";

export default function AllItemsPage({ tHeadArr, searchKeyword, rowCompName }) {
  const { categoriesArr } = useSelector((state) => state.category);
  const { productsArr } = useSelector((state) => state.product);

  // Initialize state
  const [searchResult, setSearchResult] = useState([]);

  // Synchronize searchResult with the correct array
  useEffect(() => {
    if (rowCompName === "categories") {
      setSearchResult(categoriesArr);
    } else if (rowCompName === "products") {
      setSearchResult(productsArr);
    }
  }, [categoriesArr, productsArr, rowCompName]);

  // Handle search
  const handleSearch = useCallback(
    (data) => {
      const sourceArr =
        rowCompName === "categories" ? categoriesArr : productsArr;

      // Filter based on searchKeyword
      const filteredResults = sourceArr.filter(
        (item) =>
          item[searchKeyword]?.toLowerCase() === data.searchValue.toLowerCase()
      );
      setSearchResult(filteredResults);
    },
    [categoriesArr, productsArr, rowCompName, searchKeyword]
  );

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {tHeadArr.map((item) => (
                <td key={item}>{item}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchResult.length > 0 ? (
              rowCompName === "categories" ? (
                searchResult.map((category) => (
                  <CategoryRow key={category.$id} category={category} />
                ))
              ) : (
                searchResult.map((product) => (
                  <AdminProductRow key={product.$id} product={product} />
                ))
              )
            ) : (
              <tr>
                <td
                  colSpan={tHeadArr.length}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  No {rowCompName} available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
