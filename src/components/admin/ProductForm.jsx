import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  Input,
  MyTypoGraphy,
  Select,
  SelectCategory,
  RTE,
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
  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const registeredInputsVal = getValues();
    Object.keys(registeredInputsVal).forEach((key) => {
      setValue(key, product?.[key]); // Update each field dynamically
    });
    product && setSelectedCategories(product.pParentCategory);
  }, [product]);

  const { preview_URL_Arr } = useSelector((state) => state.file);
  const { catogNames } = useSelector((state) => state.category);
  const { productsArr } = useSelector((state) => state.product);
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
    data.pParentCategory = selectedCategories;

    if (data.pSalePrice >= data.pPrice) {
      toast.info("Product sale price must be less than product original price");
      return;
    }

    if (product) {
      const keysFromData = Object.keys(data);

      const isProduct = productsArr.some((product) => {
        return keysFromData.every((key) => {
          if (key === "pImage") {
            return true;
          }

          if (key === "pParentCategory") {
            return (
              Array.isArray(data[key]) &&
              Array.isArray(product[key]) &&
              data[key].every((val) => product[key].includes(val)) &&
              product[key].every((val) => data[key].includes(val))
            );
          } else {
            return (
              product[key]?.toString().toLowerCase() ===
              data[key]?.toString().toLowerCase()
            );
          }
        });
      });

      if (isProduct) {
        toast.error(
          "You can't update this product because it's already exists in your data."
        );
        navigate("/admin/add-product");
        return;
      }

      try {
        await toast.promise(
          (async () => {
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
              updateProductThunk({ ...product, ...data })
            ).unwrap();

            if (updatedProduct) {
              toast.success("Product updated successfully!");
              navigate("/admin/products");
            }
          })(),
          {
            pending: "Updating product...",
          }
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      const isProduct = productsArr.some(
        (product) => product.pName === data.pName
      );

      if (isProduct) {
        toast.info(
          "You can't add this product because it's already exists in your data. However, you can update it."
        );
        reset();
        return;
      }

      try {
        await toast.promise(
          (async () => {
            const fileObj = await dispatch(
              fileUploadThunk(data.pImage[0])
            ).unwrap();
            if (fileObj) {
              data.pImage = fileObj.$id;
              const createdProduct = await dispatch(
                createProductThunk({ ...data, adminId: userData.$id })
              ).unwrap();

              if (createdProduct) {
                toast.success("Product added successfully!");
                navigate("/admin/products");
              }
            }
          })(),
          {
            pending: "Adding product...",
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(productSubmit)}
        className="bg-amber-800 rounded-lg p-3 grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1"
      >
        <MyTypoGraphy myClass="text-3xl mb-5 text-white">
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

        <div className="flex gap-5 mt-5">
          <RTE
            name="pShortDes"
            label="Product Short Description :"
            control={control}
            defaultValue={getValues("pShortDes")}
          />

          <RTE
            name="pLongDes"
            label="Product Long Description :"
            control={control}
            defaultValue={getValues("pLongDes")}
          />
        </div>
        <div className="flex justify-between gap-5 mt-5">
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

        <div className="grid grid-cols-3 gap-5 mt-5">
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

          <SelectCategory
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            catogNames={catogNames}
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

        <Button
          myClass="mx-auto border-2 border-white hover:bg-transparent hover:text-white mt-5"
          bgColor="bg-white"
          textColor="text-amber-800"
        >
          {product ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Container>
  );
}
