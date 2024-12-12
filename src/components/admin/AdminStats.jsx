import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AdminStatsCard } from "../index";
import { FaBox } from "react-icons/fa";

export default function AdminStats() {
  const [getedProducts, setGetedProducts] = useState([]);
  const { productsArr } = useSelector((state) => state.product);
  const { userData } = useSelector((state) => state.auth);

  const filteredProducts = useMemo(() => {
    return productsArr.filter((product) => product.adminId === userData.$id);
  }, [productsArr]);

  useEffect(() => {
    setGetedProducts(filteredProducts);
  }, [productsArr]);

  return (
    <div className="stats shadow">
      <AdminStatsCard
        title="Products"
        icon={<FaBox />}
        value={getedProducts.length}
      />
    </div>
  );
}
