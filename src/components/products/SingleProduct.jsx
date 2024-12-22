import React, { useEffect, useState } from "react";
import { Container, MyTypoGraphy, Button, Input } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productFilter } from "../../features/productSlice";
import {
  addToCartThunk,
  updateCartItemThunk,
} from "../../features/userAddToCartSlice";
import { addOrderThunk, updateOrderThunk } from "../../features/ordersSlice";
import { toast } from "react-toastify";

export default function SingleProduct() {
  const dispatch = useDispatch();
  const { slug, productId } = useParams();
  const [value, setValue] = useState(1);
  const [imgPreview, setImgPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productFilter(productId));
  }, [slug, dispatch, productId]);

  const calculateDiscount = (price, salePrice) => {
    if (price > 0 && salePrice > 0) {
      return Math.round(((price - salePrice) / price) * 100);
    }
    return 0;
  };

  const { filteredProduct } = useSelector((state) => state.product);
  const { preview_URL_Arr } = useSelector((state) => state.file);
  const { userData } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const {
    pName,
    pSlug,
    pImage,
    pPrice,
    pSalePrice,
    pStockStatus,
    pLongDes,
    adminId,
    pParentCategory,
    $id,
  } = filteredProduct;

  useEffect(() => {
    const img = preview_URL_Arr.find(
      (preview) => preview.fileId === pImage
    )?.URL;
    setImgPreview(img);
  }, [preview_URL_Arr, pImage]);

  const addToCart = async () => {
    const newObj = {
      pName,
      pPrice,
      pImage: imgPreview,
      userId: userData.$id,
      pQty: value,
      pSlug,
      pSalePrice,
      adminId,
      userName: userData.name,
    };

    const isProduct = cartItems.find((product) => product.pName === pName);
    if (isProduct) {
      const updatedOrder = await dispatch(
        updateOrderThunk({ $id: isProduct.orderId, ...newObj })
      ).unwrap();
      if (updatedOrder) {
        const productUpdated = await dispatch(
          updateCartItemThunk({
            $id: isProduct.$id,
            productId: $id,
            pParentCategory,
            ...newObj,
          })
        ).unwrap();
        if (productUpdated) {
          toast.success("Product has updated in your cart!");
          navigate("/cart");
        }
      }
    } else {
      const addedOrder = await dispatch(addOrderThunk(newObj)).unwrap();
      if (addedOrder) {
        const productAdded = await dispatch(
          addToCartThunk({
            orderId: addedOrder.$id,
            productId: $id,
            pParentCategory,
            ...newObj,
          })
        ).unwrap();
        if (productAdded) {
          toast.success("Product has added in your cart!");
          navigate("/cart");
        }
      }
    }
  };

  return (
    <Container childElemClass="grid grid-cols-2 w-2/3 gap-5 mt-20 border-[0.1rem] border-gray-300 rounded-xl p-2">
      {filteredProduct && (
        <>
          <div>
            <img
              src={imgPreview}
              alt={`${pName}'s image`}
              className="w-full h-96 rounded-xl"
            />
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

            <div>
              <Button
                onClick={() => {
                  setValue((prev) => (prev < 5 ? prev + 1 : prev));
                }}
              >
                +
              </Button>
              <MyTypoGraphy>{value}</MyTypoGraphy>
              <Button
                onClick={() => {
                  setValue((prev) => (prev > 1 ? prev - 1 : prev));
                }}
              >
                -
              </Button>
            </div>

            <Button onClick={addToCart}>Add to cart</Button>
          </div>
        </>
      )}
    </Container>
  );
}
