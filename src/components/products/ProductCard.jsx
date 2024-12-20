import React from "react";
import { MyTypoGraphy } from "../index";
import { useDispatch, useSelector } from "react-redux";

export default function ProductCard({ myClass = "", product }) {
  const { pName, pShortDes, pStockStatus, pImage, pPrice, pSalePrice } =
    product;

  const dispatch = useDispatch();
  const { preview_URL_Arr } = useSelector((state) => state.file);

  const calculateDiscount = (price, salePrice) => {
    if (price > 0 && salePrice > 0) {
      return Math.round(((price - salePrice) / price) * 100);
    }
    return 0;
  };

  return (
    <div
      className={`${myClass} shadow-lg shadow-gray-500 rounded-xl relative h-[25rem] flex flex-col justify-between`}
    >
      {preview_URL_Arr.some((preview) => preview.fileId === pImage) && (
        <img
          src={
            preview_URL_Arr.find((preview) => preview.fileId === pImage)?.URL ||
            ""
          }
          alt={`${pName}'s image`}
          className="h-1/2 w-full rounded-md"
        />
      )}

      <div className="p-3 h-1/2 flex flex-col justify-between">
        <MyTypoGraphy myClass="text-2xl font-bold capitalize">
          {pName}
        </MyTypoGraphy>
        <MyTypoGraphy myClass="text-gray-600">{pShortDes}</MyTypoGraphy>
        <MyTypoGraphy myClass="capitalize absolute bg-black top-2 left-2 text-white rounded-md text-[0.7rem] px-2 py-1">
          {pStockStatus}
        </MyTypoGraphy>
        <MyTypoGraphy myClass={`text-gray-600 ${pSalePrice && "line-through"}`}>
          Price :{pPrice}
        </MyTypoGraphy>
        {pSalePrice > 0 && (
          <>
            <MyTypoGraphy myClass="text-gray-600">
              Sale Price: {pSalePrice}
            </MyTypoGraphy>
            <div className="absolute top-2 right-2 bg-red-500 text-white rounded-md px-2 py-1 text-[0.8rem]">
              -{calculateDiscount(pPrice, pSalePrice)}% OFF
            </div>
          </>
        )}
      </div>
    </div>
  );
}
