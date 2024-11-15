import React from "react";
import { Container, ProductCard } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AllProducts() {
  const { productsArr } = useSelector((state) => state.product);
  return (
    <>
      <Container childElemClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20">
        {productsArr.map((product) => (
          <Link to={`/product/${product.pSlug}`} key={product.$id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </Container>
    </>
  );
}
