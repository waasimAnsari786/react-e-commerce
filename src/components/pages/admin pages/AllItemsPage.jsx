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
  const { pendingOrders, completedOrders, canceledOrders } = useSelector(
    (state) => state.orders
  );

  const navigate = useNavigate();

  const getSourceArray = () => {
    if (rowCompName === "categories") return categoriesArr;
    if (rowCompName === "products") return productsArr;
    if (rowCompName === "pending-orders") return pendingOrders;
    if (rowCompName === "completed-orders") return completedOrders;
    if (rowCompName === "canceled-orders") return canceledOrders;
    return [];
  };

  const [searchResult, setSearchResult] = useState(getSourceArray);

  useEffect(() => {
    setSearchResult(getSourceArray());
  }, [
    rowCompName,
    categoriesArr,
    productsArr,
    pendingOrders,
    completedOrders,
    canceledOrders,
  ]);

  const handleSearch = (searchValue) => {
    const sourceArr = getSourceArray();
    const filteredResults = sourceArr.filter((item) =>
      item[searchKeyword]?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResult(filteredResults);
  };

  return (
    <Container>
      <SearchBar onSearch={handleSearch} rowCompName={rowCompName} />
      <div className="overflow-x-auto">
        <table className="table bg-amber-800 text-white w-full mt-5">
          <thead>
            <tr>
              {tHeadArr.map((item) => (
                <th className="text-white" key={item}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchResult.length > 0 ? (
              (rowCompName === "categories" &&
                searchResult.map((category, index) => (
                  <CategoryRow
                    key={category.$id}
                    category={category}
                    index={index}
                  />
                ))) ||
              (rowCompName === "products" &&
                searchResult.map((product, index) => (
                  <AdminProductRow
                    key={product.$id}
                    product={product}
                    index={index}
                  />
                ))) ||
              (rowCompName === "pending-orders" &&
                searchResult.map((order, index) => (
                  <PendingOrdersRow
                    key={order.$id}
                    order={order}
                    index={index}
                  />
                ))) ||
              (rowCompName === "completed-orders" &&
                searchResult.map((order, index) => (
                  <PendingOrdersRow
                    key={order.$id}
                    order={order}
                    completedOrder={true}
                    index={index}
                  />
                ))) ||
              (rowCompName === "canceled-orders" &&
                searchResult.map((order, index) => (
                  <PendingOrdersRow
                    key={order.$id}
                    order={order}
                    canceledOrder={true}
                    index={index}
                  />
                )))
            ) : (
              <tr>
                <td
                  colSpan={tHeadArr.length}
                  className="text-center text-gray-500"
                >
                  No {rowCompName} available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {rowCompName !== "pending-orders" && (
        <Button
          myClass="border-2 border-amber-800 hover:border-transparent font-semibold mt-5 lg:hidden block"
          bgColor="hover:bg-amber-800 bg-transparent"
          textColor="hover:text-white text-amber-800"
          onClick={() =>
            rowCompName === "categories"
              ? navigate("/admin/add-category")
              : rowCompName === "products"
              ? navigate("/admin/add-product")
              : rowCompName === "completed-orders"
              ? navigate("/admin/pending-orders")
              : rowCompName === "canceled-orders" &&
                navigate("/admin/pending-orders")
          }
        >
          {rowCompName === "categories"
            ? "Add New Category"
            : rowCompName === "products"
            ? "Add New Product"
            : rowCompName === "completed-orders"
            ? "Add New Order"
            : rowCompName === "canceled-orders" && "Add New Order"}
        </Button>
      )}
    </Container>
  );
}
