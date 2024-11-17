import React, { useEffect } from "react";
import { Container, MyTypoGraphy } from "../index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productFilter } from "../../features/productSlice";

export default function SingleProduct() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(productFilter(slug));
  }, [slug, dispatch]);

  const calculateDiscount = (price, salePrice) => {
    if (price > 0 && salePrice > 0) {
      return Math.round(((price - salePrice) / price) * 100);
    }
    return 0;
  };

  const { filteredProduct } = useSelector((state) => state.product);
  const { preview_URL_Arr } = useSelector((state) => state.file);

  const { pName, pSlug, pImage, pPrice, pSalePrice, pStockStatus, pLongDes } =
    filteredProduct;

  return (
    <Container childElemClass="grid grid-cols-2 w-2/3 gap-5 mt-20 border-[0.1rem] border-gray-300 rounded-xl p-2">
      {filteredProduct && (
        <>
          <div>
            {preview_URL_Arr.some((preview) => preview.fileId === pImage) && (
              <img
                src={
                  preview_URL_Arr.find((preview) => preview.fileId === pImage)
                    ?.URL || ""
                }
                alt={`${pName}'s image`}
                className="w-full h-96 rounded-xl"
              />
            )}
          </div>
          <div className="relative">
            <MyTypoGraphy myClass="text-2xl font-bold capitalize">
              {pName}
            </MyTypoGraphy>
            <MyTypoGraphy myClass="capitalize absolute bg-black top-2 right-2 text-white rounded-md text-[0.7rem] px-2 py-1">
              {pStockStatus}
            </MyTypoGraphy>
            <MyTypoGraphy myClass="text-gray-600">{pLongDes}</MyTypoGraphy>

            <MyTypoGraphy
              myClass={`text-gray-600 ${pSalePrice && "line-through"}`}
            >
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
        </>
      )}
    </Container>
  );
}
