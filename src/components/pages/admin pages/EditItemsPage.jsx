import React, { useEffect } from "react";
import { AddCatogory, ProductForm, UpdateOrderStatus } from "../../index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findCategory } from "../../../features/catogorySlice";
import { productFilter } from "../../../features/productSlice";
import { findOrder } from "../../../features/ordersSlice";

export default function EditItemsPage({ editItem }) {
  const { slug, productId, categoryId } = useParams();
  const dispatch = useDispatch();
  const { filteredCategory } = useSelector((state) => state.category);
  const { filteredProduct } = useSelector((state) => state.product);
  const { filteredOrder } = useSelector((state) => state.orders);

  useEffect(() => {
    editItem === "category" && dispatch(findCategory(categoryId));
    editItem === "product" && dispatch(productFilter(productId));
    editItem === "order" && dispatch(findOrder(slug));
  }, []);

  if (editItem === "category") {
    return <AddCatogory catogory={filteredCategory} />;
  } else if (editItem === "product") {
    return <ProductForm product={filteredProduct} />;
  } else if (editItem === "order") {
    return <UpdateOrderStatus order={filteredOrder} />;
  }
}
