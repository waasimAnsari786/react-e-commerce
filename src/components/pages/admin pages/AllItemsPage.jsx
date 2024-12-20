import React, { useEffect, useState } from "react";
import {
  CategoryRow,
  Container,
  SearchBar,
  AdminProductRow,
  PendingOrdersRow,
  Button,
} from "../../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AllItemsPage({ tHeadArr, searchKeyword, rowCompName }) {
  const { categoriesArr } = useSelector((state) => state.category);
  const { productsArr } = useSelector((state) => state.product);
  const { pendingOrders } = useSelector((state) => state.orders);
  const { completedOrders } = useSelector((state) => state.orders);

  const navigate = useNavigate();

  // Centralized function to derive source array
  const getSourceArray = () => {
    if (rowCompName === "categories") return categoriesArr;
    if (rowCompName === "products") return productsArr;
    if (rowCompName === "pending-orders") return pendingOrders;
    if (rowCompName === "completed-orders") return completedOrders;
    return [];
  };

  const [searchResult, setSearchResult] = useState(getSourceArray);

  useEffect(() => {
    // Update search result immediately when rowCompName changes
    setSearchResult(getSourceArray());
  }, [rowCompName, categoriesArr, productsArr, pendingOrders, completedOrders]);

  const handleSearch = (searchValue) => {
    const sourceArr = getSourceArray();
    const filteredResults = sourceArr.filter((item) =>
      item[searchKeyword]?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResult(filteredResults);
  };

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
        {rowCompName !== "pending-orders" && (
          <Button
            myClass="lg:hidden block"
            onClick={() =>
              rowCompName === "categories"
                ? navigate("/admin/add-category")
                : rowCompName === "products"
                ? navigate("/admin/add-product")
                : rowCompName === "completed-orders" &&
                  navigate("/admin/pending-orders")
            }
          >
            {rowCompName === "categories"
              ? "Add New Category"
              : rowCompName === "products"
              ? "Add New Product"
              : rowCompName === "completed-orders" && "Add New Order"}
          </Button>
        )}
      </div>
    </Container>
  );
}
