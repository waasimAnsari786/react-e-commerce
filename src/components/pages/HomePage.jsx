import React, { useEffect } from "react";
import { Container, ProductCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { productsArr } = useSelector((state) => state.product);
  const authstatus = useSelector((state) => state.auth.status);

  if (authstatus) {
    if (productsArr && productsArr.length === 0) {
      return (
        <div className="text-center">
          <p>No products are availbale to show</p>
        </div>
      );
    } else {
      return (
        <p>
          Products availbale
          {/* <Container childElemClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20">
            {productsArr.map((product) => (
              <Link to={`/product/${product.pSlug}`} key={product.$id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </Container> */}
        </p>
      );
    }
  } else {
    return (
      <div className="text-center">
        <p>Login to view products!</p>
        <p>
          Don't have an account? <Link to="/login">Signup</Link>
        </p>
      </div>
    );
  }
}
