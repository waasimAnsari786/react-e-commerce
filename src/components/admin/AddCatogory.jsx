import React, { useCallback, useEffect } from "react";
import { Button, Container, Input, MyTypoGraphy, Select } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCategoryThunk,
  updateCategoryThunk,
} from "../../features/catogorySlice";

export default function AddCategory({ category }) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const registeredInputsVal = getValues();
    Object.keys(registeredInputsVal).forEach((key) => {
      setValue(key, category?.[key]); // Update each field dynamically
    });
  }, [category]);

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
      if (name === "catogName") {
        setValue("catogSlug", slugTransform(value.catogName), {
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

  const categorySubmit = async (data) => {
    const action = category
      ? updateCategoryThunk({
          oldData: category,
          newData: data,
        })
      : addCategoryThunk({ ...data, userId: userData.$id });

    await toast.promise(
      dispatch(action).unwrap(),
      {
        pending: category
          ? "Updating category, please wait..."
          : "Adding category, please wait...",
        success: category
          ? "Category updated successfully!"
          : "Category added successfully!",
      },
      { position: "top-right" }
    );

    navigate("/admin/categories");
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(categorySubmit)}
        className="bg-amber-800 rounded-lg p-3 grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1"
      >
        <MyTypoGraphy myClass="text-3xl text-white mb-5 capitalize text-black">
          {category ? "Update Category" : "Add Category"}
        </MyTypoGraphy>
        <div className="grid grid-cols-3 gap-5">
          <Input
            {...register("catogName", {
              required: "Category name/title is required",
            })}
            placeholder="Category Name"
            error={errors.catogName && errors.catogName.message}
            inpClass="w-full"
            label="Category Name :"
          />

          <Input
            {...register("catogSlug")}
            label="Category Slug :"
            placeholder="Category Slug"
            readOnly
            error={errors.catogSlug && errors.catogSlug.message}
            inpClass="w-full"
          />
          <Select
            options={catogNames.filter((name) => name !== "Uncategorise")}
            label="Select Parent Category :"
            {...register("parentCatog")}
          />
        </div>

        <Button
          myClass="mx-auto mt-5 border-2 border-white hover:bg-transparent hover:text-white"
          bgColor="bg-white"
          textColor="text-amber-800"
        >
          {category ? "Update Category" : "Add Category"}
        </Button>
      </form>
    </Container>
  );
}
