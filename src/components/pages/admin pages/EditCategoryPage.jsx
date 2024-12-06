import React, { useEffect } from "react";
import { AddCatogory } from "../../index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findCategory } from "../../../features/catogorySlice";

export default function EditCategoryPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { filteredCategory } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(findCategory(slug));
  }, []);

  return <AddCatogory catogory={filteredCategory} />;
}
