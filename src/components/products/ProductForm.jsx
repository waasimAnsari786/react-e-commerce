import React, { useCallback, useEffect } from "react";
import {
  Button,
  Container,
  Input,
  MyTypoGraphy,
  Select,
  TextArea,
} from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUploadThunk, fileUploadThunk } from "../../features/fileSlice";
import {
  createProductThunk,
  updateProductThunk,
} from "../../features/productSlice";

export default function ProductForm({ product }) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pName: product?.pName || "",
      pShortDes: product?.pShortDes || "",
      pLongDes: product?.pLongDes || "",
      pSlug: product?.pSlug || "",
      pStockStatus: product?.pStockStatus || "In stock",
      pImage: product?.pImage || "",
      pPrice: product?.pPrice || "",
      pSalePrice: product?.pSalePrice || "",
      pCatog: product?.pCatog || "",
    },
  });

  const { preview_URL_Arr } = useSelector((state) => state.file);
  const { catogNames } = useSelector((state) => state.category);
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback(
    (value) => {
      let transformedVal = value
        .trim()
        .toLowerCase()
        .replace(/[\s]+|[\W_]+/g, "-");
      return transformedVal;
    },
    [watch]
  );

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "pName") {
        setValue("pSlug", slugTransform(value.pName), {
          shouldValidate: true,
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productSubmit = async (data) => {
    data.pPrice = Number(data.pPrice);
    data.pSalePrice = Number(data.pSalePrice);

    if (product) {
      if (typeof data.pImage === "object") {
        const fileObj = await dispatch(
          fileUploadThunk(data.pImage[0])
        ).unwrap();
        if (fileObj) {
          data.pImage = fileObj.$id;
          dispatch(deleteUploadThunk(product.pImage));
        }
      }
      const updatedProduct = await dispatch(
        updateProductThunk({ docID: product.$id, updatedObj: data })
      ).unwrap();
      if (updatedProduct) {
        toast.success("Product updated successfully!");
        navigate(`/product/${updatedProduct[0].pSlug}`);
      }
    } else {
      const fileObj = await dispatch(fileUploadThunk(data.pImage[0])).unwrap();
      if (fileObj) {
        data.pImage = fileObj.$id;
        const createdProduct = await dispatch(
          createProductThunk({ ...data, userId: userData.$id })
        ).unwrap();
        if (createdProduct) {
          toast.success("Product added successfully!");
          navigate(`/product/${createdProduct.pSlug}`);
        }
      }
    }
  };

  return (
    <Container childElemClass="pt-10">
      <form onSubmit={handleSubmit(productSubmit)}>
        <MyTypoGraphy myClass="text-3xl mb-5">
          {product ? "Update Product" : "Add Product"}
        </MyTypoGraphy>
        <div className="flex justify-between gap-5">
          <Input
            {...register("pName", {
              required: "Product name/title is required",
            })}
            placeholder="Product Title"
            error={errors.pName && errors.pName.message}
            inpClass="w-full"
            label="Product Title :"
          />

          <Input
            {...register("pSlug")}
            label="Product Slug :"
            placeholder="Product Slug"
            readOnly
            error={errors.pSlug && errors.pSlug.message}
            inpClass="w-full"
          />
        </div>

        <div className="flex gap-5">
          <TextArea
            placeholder="Product Short Description"
            label="Product Short Description :"
            {...register("pShortDes", {
              required: "Product short description is required",
            })}
          />
          <TextArea
            placeholder="Product Long Description"
            label="Product Long Description :"
            {...register("pLongDes", {
              required: "Product long description is required",
            })}
          />
          {/* <RTE
            name="shortDescription"
            label="Short Description"
            control={control}
            defaultValue={getValues("shortDescription")}
          />

          <RTE
            name="longDescription"
            label="Long Description"
            control={control}
            defaultValue={getValues("longDescription")}
          /> */}
        </div>
        <div className="flex justify-between gap-5 mt-10">
          <Input
            {...register("pPrice", {
              required: "Product price is required",
            })}
            label="Product Price :"
            type="number"
            error={errors.pPrice && errors.pPrice.message}
            inpClass="w-full"
          />

          <Input
            {...register("pSalePrice")}
            label="Product Sale Price :"
            type="number"
            error={errors.pSalePrice && errors.pSalePrice.message}
            inpClass="w-full"
          />
        </div>

        <div className="flex justify-between gap-5 mt-10">
          <Input
            {...register("pImage", {
              required: !product ? "Product image is required" : false,
            })}
            label="Product Image :"
            type="file"
            error={errors.pImage && errors.pImage.message}
            inpClass="w-full"
          />

          <Select
            options={["In stock", "Out of stock"]}
            label="Product Status :"
            {...register("pStockStatus", {
              required: "Product status is required",
            })}
            error={errors.pStockStatus && errors.pStockStatus.message}
          />

          <Select
            options={catogNames}
            label="Catogory :"
            {...register("pCatog")}
          />
        </div>

        {product &&
          preview_URL_Arr.some(
            (preview) => preview.fileId === product.pImage
          ) && (
            <img
              src={
                preview_URL_Arr.find(
                  (preview) => preview.fileId === product.pImage
                )?.URL || ""
              }
              alt={`${product.pName}'s image`}
              className="rounded-lg w-96 h-64 mt-4"
            />
          )}

        <Button myClass="mt-6">{product ? "Update" : "Submit"}</Button>
      </form>
    </Container>
  );
}
