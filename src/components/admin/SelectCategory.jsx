import React from "react";
import { MyTypoGraphy, Input } from "../index";

export default function SelectCategory({
  selectedCategories,
  setSelectedCategories,
  catogNames,
}) {
  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((cat) => cat !== category) // Remove if already selected
          : [...prev, category] // Add if not selected
    );
  };

  return (
    <div>
      <MyTypoGraphy>Select Parent Category :</MyTypoGraphy>
      {catogNames?.map((category) => (
        <Input
          type="checkbox"
          value={category}
          checked={selectedCategories.includes(category)}
          onChange={() => handleCategoryChange(category)}
          label={category}
          parentDiv=""
          inpClass="w-4 h-4"
          key={category}
        />
      ))}
    </div>
  );
}
