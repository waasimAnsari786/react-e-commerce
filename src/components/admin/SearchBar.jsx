import React, { useEffect } from "react";
import { Input } from "../index";
import { useForm } from "react-hook-form";

export default function SearchBar({ onSearch }) {
  const { register, watch } = useForm();

  // Trigger onSearch whenever searchValue changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "searchValue") {
        onSearch(value.searchValue);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onSearch]);

  return (
    <form>
      <Input
        {...register("searchValue")}
        label="Search Products"
        placeholder="Search..."
      />
    </form>
  );
}
