import React from "react";
import { useSelector } from "react-redux";
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
      return <p>Products availbale</p>;
    }
  } else {
    return (
      <div className="text-center">
        <p>
          Login to view products!{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </p>
        <p>
          Don't have an account?{" "}
          <Link className="underline" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    );
  }
}
