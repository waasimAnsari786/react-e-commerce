import React, { useEffect, useState } from "react";
import { MyTypoGraphy, Button } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function ProductCard({ myClass = "", product }) {
  const {
    pName,
    pShortDes,
    pStockStatus,
    pImage,
    pPrice,
    pSalePrice,
    pSlug,
    $id,
  } = product;

  const dispatch = useDispatch();
  const { preview_URL_Arr } = useSelector((state) => state.file);

  const [shortDescription, setShortDescription] = useState("");

  useEffect(() => {
    // Parse and truncate pShortDes if necessary
    let parsedDescription = parse(pShortDes)?.props.children;
    if (parsedDescription.length > 90) {
      parsedDescription = `${parsedDescription.substring(0, 90)}...`;
    }
    setShortDescription(parsedDescription);
  }, [pShortDes]);

  const calculateDiscount = (price, salePrice) => {
    if (price > 0 && salePrice > 0) {
      return Math.round(((price - salePrice) / price) * 100);
    }
    return 0;
  };

  return (
    <div
      className="w-full rounded-xl hover:shadow-gray-500 hover:shadow-xl transition-all duration-200 relative grid"
      style={{ gridTemplateRows: "40vh 40vh auto" }}
    >
      {preview_URL_Arr.some((preview) => preview.fileId === pImage) && (
        <img
          src={
            preview_URL_Arr.find((preview) => preview.fileId === pImage)?.URL ||
            ""
          }
          alt={`${pName}'s image`}
          className="w-full rounded-md row-start-1 row-end-2 h-full"
        />
      )}

      <div className="p-3 flex flex-col justify-between text-black row-start-2 row-end-3">
        <MyTypoGraphy myClass="text-2xl font-bold capitalize text-amber-700 mb-4">
          {pName}
        </MyTypoGraphy>
        {shortDescription}
        <MyTypoGraphy myClass="capitalize bg-green-700 absolute top-2 left-2 text-white rounded-md text-[0.7rem] px-2 py-1">
          {pStockStatus}
        </MyTypoGraphy>
        <div className="my-4">
          <MyTypoGraphy myClass={`${pSalePrice && "line-through"}`}>
            Price : {pPrice}
          </MyTypoGraphy>
          <MyTypoGraphy>Sale Price: {pSalePrice}</MyTypoGraphy>
          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-md px-2 py-1 text-[0.8rem]">
            -{calculateDiscount(pPrice, pSalePrice)}% OFF
          </div>
        </div>
        <Link to={`/product/${pSlug}/${$id}`}>
          <Button
            bgColor="bg-amber-800"
            myClass="hover:bg-transparent hover:border-amber-800 border-2 font-semibold w-1/2"
            textColor="hover:text-amber-800 text-white"
          >
            View Product
          </Button>
        </Link>
      </div>
    </div>
  );
}
