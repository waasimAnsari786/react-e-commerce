import React, { forwardRef, useEffect, useId } from "react";
import { toast } from "react-toastify";

const Input = forwardRef(
  (
    {
      type = "text",
      inpClass = "",
      label,
      icon = "",
      error,
      parentDiv = "bg-white p-4 rounded-lg my-3 shadow-md shadow-gray-500",
      ...props
    },
    ref
  ) => {
    const id = useId();
    useEffect(() => {
      error && toast.error(error);
    }, [error]);

    return (
      <div
        className={
          (type === "radio" && "flex justify-between") ||
          (type === "checkbox" &&
            "flex flex-row-reverse justify-end items-center my-2 gap-2") ||
          "w-full"
        }
      >
        <label htmlFor={id}>{label}</label>
        <div className={`flex items-center justify-between ${parentDiv}`}>
          <input
            type={type}
            className={`w-2/3 text-black ${inpClass} bg-transparent outline-none focus:outline-none`}
            {...props}
            id={id}
            ref={ref}
          />
          {icon}
        </div>
      </div>
    );
  }
);

export default Input;
