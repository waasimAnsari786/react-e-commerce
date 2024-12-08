import React, { useEffect } from "react";
import { AddCatogory, ProductForm } from "../../index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findCategory } from "../../../features/catogorySlice";
import { productFilter } from "../../../features/productSlice";

export default function EditItemsPage({ editItem }) {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { filteredCategory } = useSelector((state) => state.category);
  const { filteredProduct } = useSelector((state) => state.product);

  useEffect(() => {
    editItem === "category" && dispatch(findCategory(slug));
    editItem === "product" && dispatch(productFilter(slug));
  }, []);

  if (editItem === "category") {
    return <AddCatogory catogory={filteredCategory} />;
  } else if (editItem === "product") {
    return <ProductForm product={filteredProduct} />;
  }
}
