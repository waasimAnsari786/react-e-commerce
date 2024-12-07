import React from "react";
import { Button, Input } from "../index";
import { useForm } from "react-hook-form";

export default function SearchBar({ onSearch }) {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <Input
        {...register("searchValue")}
        label="Search Products"
        placeholder="Search..."
      />
      <Button>Search</Button>
    </form>
  );
}
