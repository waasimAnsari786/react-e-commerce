import React, { useEffect, useState } from "react";
import { Container, Button } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productFilter } from "../../features/productSlice";
import {
  addToCartThunk,
  updateCartItemThunk,
} from "../../features/userAddToCartSlice";
import { addOrderThunk, updateOrderThunk } from "../../features/ordersSlice";
import { toast } from "react-toastify";
import parse from "html-react-parser";

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

    const addOrUpdateCart = async () => {
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
        }
      }
    };

    // Using toast.promise to handle states
    toast
      .promise(
        addOrUpdateCart(),
        {
          pending: "Processing your request...",
          success: "Product has been added in your cart!",
        },
        {
          position: "top-right",
          autoClose: 3000,
        }
      )
      .then(() => navigate("/cart"));
  };

  return (
    <Container childElemClass="pt-20">
      <div className="card lg:card-side shadow-xl p-5">
        {filteredProduct && (
          <>
            <figure>
              <img
                src={imgPreview}
                alt={`${pName}'s image`}
                className="rounded-xl w-full h-auto object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-amber-700 text-2xl font-bold">
                {pName}
              </h2>

              {pLongDes && parse(pLongDes)}

              <p className={`text-gray-600 ${pSalePrice && "line-through"}`}>
                Price: {pPrice}
              </p>
              {pSalePrice > 0 && (
                <p className="text-red-500 font-semibold">
                  Sale Price: {pSalePrice} (-
                  {calculateDiscount(pPrice, pSalePrice)}% OFF)
                </p>
              )}

              <div className="flex items-center gap-2 mt-5">
                <Button
                  onClick={() => setValue((prev) => Math.max(prev - 1, 1))}
                  className="btn btn-outline btn-sm"
                >
                  -
                </Button>
                <span className="font-bold text-lg text-black">{value}</span>
                <Button
                  onClick={() => setValue((prev) => Math.min(prev + 1, 5))}
                  className="btn btn-outline btn-sm"
                >
                  +
                </Button>
              </div>

              <div className="flex items-start">
                <Button
                  onClick={addToCart}
                  bgColor="bg-amber-800"
                  myClass="hover:bg-transparent hover:border-amber-700 hover:text-amber-800 border-2 font-semibold"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
