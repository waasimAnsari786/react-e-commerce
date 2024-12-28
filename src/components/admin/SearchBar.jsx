import React, { useEffect } from "react";
import { Input, MyTypoGraphy, Select } from "../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function SearchBar({
  onSearch,
  otherFields = false,
  rowCompName,
}) {
  const { register, watch } = useForm();
  const { catogNames } = useSelector((state) => state.category);

  // Trigger onSearch whenever searchValue changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "searchValue") {
        onSearch(value.searchValue);
      } else if (name === "searchCatogs") {
        onSearch(value.searchCatogs);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onSearch]);

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Input
        labelClass="text-amber-700"
        {...register("searchValue")}
        label={
          rowCompName
            ? "Search " +
              (rowCompName.includes("-")
                ? rowCompName
                    .split("-")
                    .map((elem) => elem.replace(elem[0], elem[0].toUpperCase()))
                    .join(" ")
                : rowCompName.replace(
                    rowCompName[0],
                    rowCompName[0].toUpperCase()
                  ))
            : "Search Products"
        }
        placeholder="Search..."
      />
      {otherFields && (
        <Select
          {...register("searchCatogs")}
          label="Search By Categories"
          options={catogNames}
          labelClass="text-amber-700"
        />
      )}
    </form>
  );
}
