import React, { useEffect, useState } from "react";
import { Container, ProductCard, SearchBar } from "../index";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AllProducts() {
  const { productsArr } = useSelector((state) => state.product);
  const [results, setResults] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      const newSlug = slug.includes("-")
        ? slug
            .split("-")
            .map((str) => str.replace(str[0], str[0].toUpperCase()))
            .join(" ")
        : slug.replace(slug[0], slug[0].toUpperCase());

      const categoryProductsArr = productsArr.filter((product) =>
        product.pParentCategory?.includes(newSlug)
      );

      setCategoryProducts(categoryProductsArr);
      setResults(categoryProductsArr);
    } else {
      setResults(productsArr);
    }
  }, [slug]);

  const handleSearch = (searchValue) => {
    const products = slug ? categoryProducts : productsArr;

    const filteredProducts = products.filter(
      (product) =>
        product.pName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.pParentCategory?.includes(searchValue)
    );

    setResults(filteredProducts);
  };

  return (
    <>
      <Container childElemClass="pt-20">
        <SearchBar onSearch={handleSearch} otherFields={!slug && true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20">
          {results.length > 0 ? (
            results.map((product) => (
              <ProductCard product={product} key={product.$id} />
            ))
          ) : (
            <p>No products are available to show</p>
          )}
        </div>
      </Container>
    </>
  );
}
