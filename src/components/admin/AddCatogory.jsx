import React, { useCallback, useEffect, useMemo } from "react";
import { Button, Container, Input, MyTypoGraphy, Select } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCategoryThunk,
  getCategoriesThunk,
  updateCategoryThunk,
} from "../../features/catogorySlice";

export default function AddCatogory({ catogory }) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      catogName: catogory?.catogName || "",
      catogSlug: catogory?.catogSlug || "",
      parentCatog: catogory?.parentCatog || "",
    },
  });

  const userData = useSelector((state) => state.auth.userData);
  const { categoriesArr } = useSelector((state) => state.category);

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

  const catogorySubmit = async (data) => {
    if (catogory) {
      const updatedCategory = await dispatch(
        updateCategoryThunk({ ...catogory, updatedObj: data })
      ).unwrap();
      if (updatedCategory) {
        toast.success("Category updated successfully!");
        navigate(`/category/${updatedCategory[0].catogSlug}`);
      }
    } else {
      const createdCategory = await dispatch(
        addCategoryThunk({ ...data, userId: userData.$id })
      ).unwrap();
      if (createdCategory) {
        toast.success("Category added successfully!");
      }
    }
  };

  const filteredNames = useMemo(() => {
    return categoriesArr.map((curObj) => curObj.catogName);
  }, [categoriesArr]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  return (
    <Container childElemClass="pt-20">
      <form onSubmit={handleSubmit(catogorySubmit)}>
        <MyTypoGraphy myClass="text-3xl mb-5 capitalize">
          {catogory ? "Update catogory" : "Add catogory"}
        </MyTypoGraphy>
        <div className="flex justify-between gap-5">
          <Input
            {...register("catogName", {
              required: "Catogory name/title is required",
            })}
            placeholder="Catogory Name"
            error={errors.catogName && errors.catogName.message}
            inpClass="w-full"
            label="Catogory Name :"
          />

          <Input
            {...register("catogSlug")}
            label="Catogory Slug :"
            placeholder="Catogory Slug"
            readOnly
            error={errors.catogSlug && errors.catogSlug.message}
            inpClass="w-full"
          />

          <Select
            options={filteredNames}
            label="Parent Catogory :"
            {...register("parentCatog")}
          />
        </div>

        <Button myClass="mt-6">{catogory ? "Update" : "Submit"}</Button>
      </form>
    </Container>
  );
}
