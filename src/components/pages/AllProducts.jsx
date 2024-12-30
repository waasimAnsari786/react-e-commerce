import React, { useEffect, useState } from "react";
import { Container, ProductCard, SearchBar } from "../index";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AllProducts() {
  const { productsArr } = useSelector((state) => state.product);
  const { categoriesArr } = useSelector((state) => state.category);
  const [results, setResults] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      const category = categoriesArr.find(
        (category) => category.catogSlug === slug
      );
      const categoryProductsArr = productsArr.filter((product) =>
        product.pParentCategory?.includes(category.catogName)
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
      <Container childElemClass="pt-32">
        <SearchBar onSearch={handleSearch} otherFields={!slug && true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
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
