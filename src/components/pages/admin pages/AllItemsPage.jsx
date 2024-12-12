import React, { useCallback, useEffect, useState } from "react";
import {
  CategoryRow,
  Container,
  SearchBar,
  AdminProductRow,
  PendingOrdersRow,
} from "../../index";
import { useSelector } from "react-redux";

export default function AllItemsPage({ tHeadArr, searchKeyword, rowCompName }) {
  const { categoriesArr } = useSelector((state) => state.category);
  const { productsArr } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.orders);

  // Initialize state
  const [searchResult, setSearchResult] = useState([]);

  // Synchronize searchResult with the correct array
  useEffect(() => {
    if (rowCompName === "categories") {
      setSearchResult(categoriesArr);
    } else if (rowCompName === "products") {
      setSearchResult(productsArr);
    } else if (rowCompName === "pending-orders") {
      const pendingOrders = orders.filter(
        (order) => order.orderStatus === "Pending..."
      );
      setSearchResult(pendingOrders);
    } else if (rowCompName === "completed-orders") {
      const completedOrders = orders.filter(
        (order) => order.orderStatus === "Completed"
      );
      setSearchResult(completedOrders);
    }
  }, [categoriesArr, productsArr, rowCompName, orders]);

  // Handle search
  const handleSearch = useCallback(
    (data) => {
      const sourceArr =
        (rowCompName === "categories" && categoriesArr) ||
        (rowCompName === "products" && productsArr) ||
        (rowCompName === "pending-orders" && orders) ||
        (rowCompName === "completed-orders" && orders);

      // Filter based on searchKeyword
      const filteredResults = sourceArr.filter(
        (item) =>
          item[searchKeyword]?.toLowerCase() === data.searchValue.toLowerCase()
      );
      setSearchResult(filteredResults);
    },
    [categoriesArr, productsArr, rowCompName, searchKeyword, orders]
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
              (rowCompName === "categories" &&
                searchResult.map((category) => (
                  <CategoryRow key={category.$id} category={category} />
                ))) ||
              (rowCompName === "products" &&
                searchResult.map((product) => (
                  <AdminProductRow key={product.$id} product={product} />
                ))) ||
              (rowCompName === "pending-orders" &&
                searchResult.map((order) => (
                  <PendingOrdersRow key={order.$id} order={order} />
                ))) ||
              (rowCompName === "completed-orders" &&
                searchResult.map((order) => (
                  <PendingOrdersRow
                    key={order.$id}
                    order={order}
                    completedOrder={true}
                  />
                )))
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
