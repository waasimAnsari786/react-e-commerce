import React from "react";
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

  const calculateDiscount = (price, salePrice) => {
    if (price > 0 && salePrice > 0) {
      return Math.round(((price - salePrice) / price) * 100);
    }
    return 0;
  };

  return (
    <div className="w-full h-[25rem] rounded-xl hover:shadow-gray-500 hover:shadow-xl hover:translate-y-3 transition-all duration-100">
      {/* Parent Container */}
      <div
        className={`${myClass} relative h-full flex flex-col justify-between `}
      >
        {preview_URL_Arr.some((preview) => preview.fileId === pImage) && (
          <img
            src={
              preview_URL_Arr.find((preview) => preview.fileId === pImage)
                ?.URL || ""
            }
            alt={`${pName}'s image`}
            className="h-1/2 w-full rounded-md"
          />
        )}

        <div className="p-3 h-1/2 flex flex-col justify-between text-black">
          <MyTypoGraphy myClass="text-2xl font-bold capitalize text-amber-700">
            {pName}
          </MyTypoGraphy>
          {parse(pShortDes)}
          <MyTypoGraphy myClass="capitalize bg-green-700 absolute top-2 left-2 text-white rounded-md text-[0.7rem] px-2 py-1">
            {pStockStatus}
          </MyTypoGraphy>
          <MyTypoGraphy myClass={`${pSalePrice && "line-through"}`}>
            Price :{pPrice}
          </MyTypoGraphy>
          {pSalePrice > 0 && (
            <>
              <MyTypoGraphy myClass="">Sale Price: {pSalePrice}</MyTypoGraphy>
              <div className="absolute top-2 right-2 bg-red-500 text-white rounded-md px-2 py-1 text-[0.8rem]">
                -{calculateDiscount(pPrice, pSalePrice)}% OFF
              </div>
            </>
          )}
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
    </div>
  );
}
