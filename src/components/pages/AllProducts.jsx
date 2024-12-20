import React, { useState } from "react";
import { Container, ProductCard, SearchBar } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AllProducts() {
  const { productsArr } = useSelector((state) => state.product);
  const [results, setResults] = useState(productsArr);

  const handleSearch = (searchValue) => {
    const products = productsArr;
    const filteredProducts = products.filter(
      (product) =>
        product.pName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.pParentCategory?.includes(searchValue)
    );
    setResults(filteredProducts);
  };

  return (
    <>
      <Container>
        <SearchBar onSearch={handleSearch} otherFields={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                to={`/product/${product.pSlug}/${product.$id}`}
                key={product.$id}
              >
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p>No products are available to show</p>
          )}
        </div>
      </Container>
    </>
  );
}
